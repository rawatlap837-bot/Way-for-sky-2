// WayForSky registration form - Google Apps Script
// Saves every form submission as a new row in your Google Sheet,
// then sends a WhatsApp template message through Chatverse.
//
// Setup:
//   1. Project Settings > Script Properties > add CHATVERSE_API_KEY
//   2. Project Settings > Script Properties > add META_ACCESS_TOKEN
//   3. Deploy > New deployment > Web app (Execute as: Me, Access: Anyone)
//   4. After ANY edit: Deploy > Manage deployments > pencil > Version: New version > Deploy

/* ---------- Config ---------- */

const SHEET_ID = "1dmtvmr21OIPImAihD5xNsyVi15eAmHygJXl8WbmKDmE";
const SHEET_NAME = "Registrations";
const TIMEZONE = "Asia/Kolkata";
const SCRIPT_VERSION = "v7";

const META_PIXEL_ID = "2129040214417001";
const META_GRAPH_VERSION = "v21.0";

const CHATVERSE_TEMPLATE_URL =
  "https://api.chatverse.io/v1/whatsapp/templates/whatsapp_lp/send";
const CHATVERSE_TEMPLATE_LANGUAGE = "en_US";

// The sheet columns, in order. COLUMN_COUNT is derived from this list,
// so the header row and the saved rows can never go out of sync again.
const HEADERS = [
  "Submitted At",
  "Name",
  "Mobile Number",
  "Email Address",
  "City",
  "Current Education",
  "Preferred Counselling Date & Time",
  "WhatsApp Status",
];
const COLUMN_COUNT = HEADERS.length;
const WHATSAPP_STATUS_COLUMN = HEADERS.indexOf("WhatsApp Status") + 1;

const EDUCATION_OPTIONS = [
  "12th pass",
  "Currently in 12th",
  "Graduate",
  "Other",
];

/* ---------- Receives the form data from the website ---------- */

function doPost(event) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const data = event && event.parameter ? event.parameter : {};

    const fullName = clean(data.fullName, 80);
    const email = clean(data.email, 100);
    const city = clean(data.city, 60);
    const education = clean(data.education, 80);
    const counsellingTime = clean(data.counsellingTime, 40);
    const mobile = String(data.mobile || "").replace(/\D/g, "");

    if (!fullName || !email || !city || !education || !counsellingTime) {
      throw new Error("Missing required fields");
    }
    if (EDUCATION_OPTIONS.indexOf(education) === -1) {
      throw new Error("Invalid current education option");
    }
    if (!/^\d{10}$/.test(mobile)) {
      throw new Error("Invalid mobile number");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid email address");
    }

    const sheet = getOrCreateSheet();
    const row = sheet.getLastRow() + 1;

    const values = [
      Utilities.formatDate(new Date(), TIMEZONE, "dd MMM yyyy, hh:mm a"),
      fullName,
      mobile,
      email,
      city,
      education,
      counsellingTime,
      "WhatsApp Pending",
    ];

    if (values.length !== COLUMN_COUNT) {
      throw new Error(
        "Row has " +
          values.length +
          " values but the sheet expects " +
          COLUMN_COUNT,
      );
    }

    // Plain text format so Google Sheets never changes the values
    // (for example turning 9876543210 into a number, or a date into a date).
    const range = sheet.getRange(row, 1, 1, COLUMN_COUNT);
    range.setNumberFormat("@");
    range.setValues([values]);

    // The registration is saved. WhatsApp / Meta CAPI failures must not fail the form.
    const whatsapp = trySendWhatsApp(sheet, row, mobile);
    const metaCapi = trySendMetaCapiLead(
      email,
      mobile,
      city,
      clean(data.eventId, 80),
    );

    return jsonResponse({ success: true, whatsapp: whatsapp, metaCapi: metaCapi });
  } catch (error) {
    Logger.log("Registration failed: " + error.message);
    return jsonResponse({ success: false, message: error.message });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

/* ---------- Open the /exec link in the browser to check the live version ---------- */

function doGet() {
  return jsonResponse({
    success: true,
    message: "WayForSky registration endpoint is active",
    version: SCRIPT_VERSION,
    columns: COLUMN_COUNT,
  });
}

/* ---------- TEST: select "testSubmit" and click Run ----------
   Adds one fake row to the sheet so you can check everything works.
   Note: this also sends a real WhatsApp message to the fake number. */
function testSubmit() {
  const result = doPost({
    parameter: {
      fullName: "Test Student",
      mobile: "9876543210",
      email: "test@example.com",
      city: "Delhi",
      education: "12th pass",
      counsellingTime: "25 Nov 2026, 10:30 am",
    },
  });
  Logger.log(result.getContent());
}

/* ---------- TEST: select "testWhatsApp" and click Run ----------
   Sends one test WhatsApp message. Put your own number below first. */
function testWhatsApp() {
  const testMobile = "9876543210"; // Replace with your WhatsApp number
  try {
    const result = sendWhatsAppMessage(testMobile);
    Logger.log("Test message accepted: " + JSON.stringify(result));
  } catch (error) {
    Logger.log("Test message failed: " + error.message);
  }
}

/* ---------- TEST: select "testMetaCapi" and click Run ----------
   Sends one test Lead event to Meta Conversions API. */
function testMetaCapi() {
  const result = trySendMetaCapiLead(
    "test@example.com",
    "9876543210",
    "Delhi",
    "test_" + Date.now(),
  );
  Logger.log("Meta CAPI test result: " + JSON.stringify(result));
}

/* ---------- Helpers ---------- */

// Trims the text, limits its length and removes a leading = + - @
// (so the sheet never treats user text as a formula).
function clean(value, maxLength) {
  return String(value || "")
    .trim()
    .replace(/^[=+\-@]+/, "")
    .slice(0, maxLength);
}

// Opens the sheet, creates it if missing, and makes sure the header row exists.
function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);

  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet
      .getRange(1, 1, 1, COLUMN_COUNT)
      .setValues([HEADERS])
      .setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/* ---------- WhatsApp Messaging ---------- */

// Sends the message and writes the outcome into the WhatsApp Status column.
// Never throws, so the caller can always report the registration as saved.
function trySendWhatsApp(sheet, row, mobile) {
  const statusCell = sheet.getRange(row, WHATSAPP_STATUS_COLUMN);

  try {
    const result = sendWhatsAppMessage(mobile);
    statusCell.setValue("WhatsApp Sent");
    return { sent: true, message: "Sent", result: result };
  } catch (error) {
    Logger.log("WhatsApp message failed: " + error.message);
    statusCell.setValue("WhatsApp Failed: " + error.message.slice(0, 200));
    return { sent: false, message: error.message };
  }
}

function sendWhatsAppMessage(mobile) {
  const apiKey =
    PropertiesService.getScriptProperties().getProperty("CHATVERSE_API_KEY");
  if (!apiKey) {
    throw new Error("CHATVERSE_API_KEY is missing from Script Properties");
  }

  const digits = String(mobile).replace(/\D/g, "");
  const recipient = digits.length === 10 ? "91" + digits : digits;

  const response = UrlFetchApp.fetch(CHATVERSE_TEMPLATE_URL, {
    method: "post",
    muteHttpExceptions: true,
    contentType: "application/json",
    headers: { Authorization: "Bearer " + apiKey },
    payload: JSON.stringify({
      to: recipient,
      language: CHATVERSE_TEMPLATE_LANGUAGE,
    }),
  });

  const status = response.getResponseCode();
  const body = response.getContentText();
  Logger.log("Chatverse HTTP " + status + ": " + body);

  if (status < 200 || status >= 300) {
    throw new Error("Chatverse HTTP " + status + ": " + body);
  }

  try {
    return JSON.parse(body);
  } catch (error) {
    throw new Error("Chatverse returned invalid JSON (HTTP " + status + ")");
  }
}

/* ---------- Meta Conversions API ---------- */

function sha256Hex(value) {
  const bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    String(value || "").trim().toLowerCase(),
    Utilities.Charset.UTF_8,
  );
  return bytes
    .map(function (b) {
      const v = (b < 0 ? b + 256 : b).toString(16);
      return v.length === 1 ? "0" + v : v;
    })
    .join("");
}

function trySendMetaCapiLead(email, mobile, city, eventId) {
  const accessToken =
    PropertiesService.getScriptProperties().getProperty("META_ACCESS_TOKEN");
  if (!accessToken) {
    return { sent: false, message: "META_ACCESS_TOKEN not configured" };
  }

  try {
    const digits = String(mobile || "").replace(/\D/g, "");
    const phone = digits.length === 10 ? "91" + digits : digits;

    const eventPayload = {
      event_name: "Lead",
      event_time: Math.floor(Date.now() / 1000),
      action_source: "website",
      user_data: {
        em: [sha256Hex(email)],
        ph: [sha256Hex(phone)],
        ct: [sha256Hex(city)],
      },
      custom_data: {
        content_name: "WayForSky Scholarship Registration",
        currency: "INR",
        value: 7999,
      },
    };

    if (eventId) {
      eventPayload.event_id = eventId;
    }

    const url =
      "https://graph.facebook.com/" +
      META_GRAPH_VERSION +
      "/" +
      META_PIXEL_ID +
      "/events?access_token=" +
      encodeURIComponent(accessToken);

    const response = UrlFetchApp.fetch(url, {
      method: "post",
      muteHttpExceptions: true,
      contentType: "application/json",
      payload: JSON.stringify({ data: [eventPayload] }),
    });

    const status = response.getResponseCode();
    const body = response.getContentText();
    Logger.log("Meta CAPI HTTP " + status + ": " + body);

    if (status < 200 || status >= 300) {
      return { sent: false, message: "Meta CAPI HTTP " + status };
    }

    return { sent: true };
  } catch (error) {
    Logger.log("Meta CAPI failed: " + error.message);
    return { sent: false, message: error.message };
  }
}

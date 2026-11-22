// WayForSky registration form - Google Apps Script
// Saves every form submission as a new row in your Google Sheet.

const SHEET_ID = "1dmtvmr21OIPImAihD5xNsyVi15eAmHygJXl8WbmKDmE";
const SHEET_NAME = "Registrations";
const TIMEZONE = "Asia/Kolkata";
const SCRIPT_VERSION = "v3";

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

    if (!/^\d{10}$/.test(mobile)) {
      throw new Error("Invalid mobile number");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid email address");
    }

    const sheet = getOrCreateSheet();
    const row = sheet.getLastRow() + 1;

    // Keep everything as plain text so Google Sheets does not change the values
    sheet.getRange(row, 1, 1, 7).setNumberFormat("@");
    sheet
      .getRange(row, 1, 1, 7)
      .setValues([
        [
          Utilities.formatDate(new Date(), TIMEZONE, "dd MMM yyyy, hh:mm a"),
          fullName,
          mobile,
          email,
          city,
          education,
          counsellingTime,
        ],
      ]);

    return jsonResponse({ success: true });
  } catch (error) {
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
    sheetId: SHEET_ID.slice(0, 6),
  });
}

/* ---------- TEST: select "testSubmit" and click Run ----------
   Adds one fake row to the sheet so you can check everything works.
   Delete the test row afterwards. */
function testSubmit() {
  const fakeEvent = {
    parameter: {
      fullName: "Test Student",
      mobile: "9876543210",
      email: "test@example.com",
      city: "Delhi",
      education: "12th Pass",
      counsellingTime: "25 Nov 2026, 10:30 am",
    },
  };

  const result = doPost(fakeEvent);
  Logger.log(result.getContent());
}

/* ---------- Helpers ---------- */

// Trims the text, limits its length and removes a leading = + - @
// (so the sheet never treats user text as a formula)
function clean(value, maxLength) {
  return String(value || "")
    .trim()
    .replace(/^[=+\-@]+/, "")
    .slice(0, maxLength);
}

function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);

  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Submitted At",
      "Name",
      "Mobile Number",
      "Email Address",
      "City",
      "Current Education",
      "Preferred Counselling Date & Time",
    ]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

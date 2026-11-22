// Google Apps Script for the WayForSky registration form
// 1. Open https://script.google.com and create a new project.
// 2. Replace the code with this file.
// 3. Set SHEET_ID to your Google Sheet ID (from its URL).
// 4. Deploy: Deploy > New deployment > Web app
//    Execute as: Me
//    Who has access: Anyone
// 5. Copy the Web app URL into VITE_GOOGLE_SHEETS_WEB_APP_URL.

const SHEET_ID = "YOUR_GOOGLE_SHEET_ID";
const SHEET_NAME = "Registrations";

function doPost(event) {
  try {
    const sheet = getOrCreateSheet();
    const data = event.parameter;

    const requiredFields = [
      "fullName",
      "mobile",
      "email",
      "city",
      "education",
      "counsellingTime",
    ];
    for (const field of requiredFields) {
      if (!data[field] || String(data[field]).trim() === "") {
        throw new Error("Missing required field: " + field);
      }
    }

    if (!/^\d{10}$/.test(String(data.mobile))) {
      throw new Error("Invalid mobile number");
    }

    sheet.appendRow([
      new Date(),
      data.fullName,
      data.mobile,
      data.email,
      data.city,
      data.education,
      data.counsellingTime,
    ]);

    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse({ success: false, message: error.message });
  }
}

function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

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
  }

  return sheet;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

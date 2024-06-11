const SS = SpreadsheetApp.getActiveSpreadsheet();
const SPREADSHEET_ID = SS.getSheetByName("template").getRange("B1").getDisplayValue()
const FOLDER_ID = SS.getSheetByName("template").getRange("B2").getDisplayValue()

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Dũng Mori')
    .addItem('Gửi Form', 'createSpreadsheetCopiesAndSendEmails')
    .addToUi();
}
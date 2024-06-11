const SS = SpreadsheetApp.getActiveSpreadsheet();
const SSID = SS.getId();

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Dũng Mori')
    .addItem('Submit Form', 'createAndOpenCopy')
    .addToUi();
}

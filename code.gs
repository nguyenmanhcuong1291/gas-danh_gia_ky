function createAndOpenCopy() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert(
    'Xác nhận gửi form',
    'Sau khi gửi form sẽ không thể thực hiện chỉnh sửa.\nBạn có chắc chắn gửi form không?',
    ui.ButtonSet.YES_NO
  );

  // Check lựa chọn gửi form.
  if (response == ui.Button.YES) {
    // User clicked "yes".
    showLoadingDialog();
  } else {
    // User clicked "no".
    ui.alert('Đã hủy gửi form.');
  }
}
//show hộp thoại loading
function showLoadingDialog() {
  var htmlOutput = HtmlService.createHtmlOutputFromFile('dialog').setWidth(250).setHeight(80);
  SpreadsheetApp.getUi().showModelessDialog(htmlOutput, 'Loading');
  
  // Start the async operation
  copyFileAndUpdatePermissions();
}
//tạo file copy
function copyFileAndUpdatePermissions() {
  var originalFile = DriveApp.getFileById(SSID);
  var copiedFile = originalFile.makeCopy();
  var copiedFileId = copiedFile.getId();
  var copiedFileUrl = "https://docs.google.com/spreadsheets/d/" + copiedFileId;

  // console.log(copiedFileUrl)

  
  showSuccessDialog(copiedFileUrl);
  updateAllPermissionsToReader();
}

//update tk edit thành view
function updateAllPermissionsToReader() {
  var currentUserEmail = Session.getActiveUser().getEmail();
  var drive = Drive.Permissions;
  var permissionsResponse = drive.list(SSID);
  var permissions = permissionsResponse.permissions;

  for (var i = 0; i < permissions.length; i++) {
    var permission = permissions[i];
    if (permission.role === 'writer' && permission.emailAddress !== currentUserEmail) {
      var resource = {
        'role': 'reader'
      };
      drive.update(resource, SSID, permission.id);
    }
  }
}

//show hộp thoại hoàn thành
function showSuccessDialog(copiedFileUrl) {

  // console.log("copiedFileUrl: " + copiedFileUrl);
  
  var html = HtmlService.createHtmlOutputFromFile('success').setWidth(250).setHeight(80);
  html.addMetaTag('viewport', 'width=device-width, initial-scale=1');

  // thay url file copy vào html
  html.append('<script>document.getElementById("link").href = "' + copiedFileUrl + '";</script>');


  SpreadsheetApp.getUi().showModalDialog(html, 'Đã nộp form thành công');
}

// function showSuccessDialog(copiedFileUrl) {
//   console.log("copiedFileUrl: " + copiedFileUrl);
//   var htmlOutput = HtmlService.createHtmlOutput(
//     '<p>Bản sao đã được tạo thành công. Bạn có thể mở bản sao mới tại đây: <a href="' + copiedFileUrl + '" target="_blank">Link</a></p>'
//   ).setWidth(250).setHeight(80);

//   // Hiển thị hộp thoại tùy chỉnh với liên kết rút gọn
//   SpreadsheetApp.getUi().showModalDialog(htmlOutput, "Đã nộp form thành công");
// }

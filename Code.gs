function createSpreadsheetCopiesAndSendEmails() {
  var sourceSheet = SS.getSheetByName("dsns");
  var dataRange = sourceSheet.getRange("A2:D" + sourceSheet.getLastRow());
  var data = dataRange.getValues();

  var destinationFolder = DriveApp.getFolderById(FOLDER_ID);

  for (var i = 0; i < data.length; i++) {
    var name = data[i][0];
    var email = data[i][1];
    var link = data[i][2];
    var status = data[i][3];
    var newSpreadsheetname = name + " đánh giá kỳ T1-T6/2024"

    if (!name || !email){
        sourceSheet.getRange("D" + (i + 2)).setValue("Điền họ tên và email");
    }

    else if (!link) {
        var templateSpreadsheet = DriveApp.getFileById(SPREADSHEET_ID);
        var newSpreadsheet = templateSpreadsheet.makeCopy(newSpreadsheetname, destinationFolder);
        newSpreadsheet.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.EDIT);
        newSpreadsheet.addEditor(email);
        var newSpreadsheetUrl = newSpreadsheet.getUrl();
        sourceSheet.getRange("C" + (i + 2)).setValue(newSpreadsheetUrl);

        var subject = "Quan trọng: Điền form đánh giá kỳ T1-T6/2024";
        var body = "Dear " + name + ",<br><br>Vui lòng điền bản tự đánh giá kỳ vào form tại đường link bên dưới:<br><a href=\"" + newSpreadsheetUrl + "\">Link</a><br><br>Deadline: 14-06-2024<br><br>Trân trọng.";
        
        GmailApp.sendEmail(email, subject, "", 
                
            {htmlBody: body,
            name: "Đặng Phương Thảo",
            });

        sourceSheet.getRange("D" + (i + 2)).setValue("Done");
      }
      // Cập nhật dữ liệu trên sheet ngay sau mỗi vòng lặp
    SpreadsheetApp.flush();
    
  }
}
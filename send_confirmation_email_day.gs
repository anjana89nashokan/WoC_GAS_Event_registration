function myFunction() {
  /* Get values entered by filling the form */
  const form = FormApp.getActiveForm();
  const email = form.getItems()[3];
  var formResponses = form.getResponses();

  for (var formResponse of formResponses){
    const email_address = formResponse.getResponseForItem(email).getResponse();
    if (email == null){
      console.log(email)
    }
    
  }
}




//   // var ss = SpreadsheetApp.getActiveSpreadsheet()
//   // var sheet1=ss.getSheetByName('Sheet1');
//   // var sheet2=ss.getSheetByName('Sheet2');
//   // var subject = sheet2.getRange(2,1).getValue();
//   // var n=sheet1.getLastRow();
//   // for (var i = 2; i < n+1 ; i++ ) {
//   //   var emailAddress = sheet1.getRange(i,2).getValue();
//   //   var name=sheet1.getRange(i,1).getValue();
//   //   var ServiceAcquired=sheet1.getRange(i,3).getValue();
//   //   var message = sheet2.getRange(2,2).getValue();
//   //   message=message.replace("<name>",name).replace("<service>",ServiceAcquired);
//   //   MailApp.sendEmail(emailAddress, subject, message);
//   // }
  
// }
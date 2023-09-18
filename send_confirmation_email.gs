function onSubmit(e) {
  /* Get values entered by filling the form */
  const form = FormApp.getActiveForm();
  //const email_address = form.getItems()[3];

  var itemResponses = e.response.getItemResponses();
  var email_address = itemResponses[3].getResponse();
  if (email_address == null){
    return;
  }


  var confirmMsg = 'Your registration for the Christmas Toy Giveaway has been received successfully';
  form.setConfirmationMessage(confirmMsg);

  Logger.log("Message: %s", confirmMsg);
  MailApp.sendEmail({
    to: email_address,
    subject: "Thanks for registering!!",
    body: confirmMsg});
}
//Use this script to create a dropdown field for the states in USA in a Google Form
function create_USA_states_dropdown() {
  const ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1vgcox_IG6Y4Dq_BRWnCW6eT54nfTFNNtZjo3AmR0Dks/edit#gid=0');
  const sheet1 = ss.getSheetByName('States_in_USA');
  const usa_state_range = sheet1.getDataRange();
  var list_states = usa_state_range.getValues();
  
  var form = FormApp.getActiveForm();
  
  var usa_state_item = form.addListItem();
  usa_state_item.setTitle('State').setChoiceValues(list_states);
}
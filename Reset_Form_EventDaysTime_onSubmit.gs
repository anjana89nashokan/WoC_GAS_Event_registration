function update_dropdown(){
  var form = FormApp.getActiveForm();
  
  const setupv = get_setup_values();

  const day_index = setupv.day_index; //Field item in the form
  const time_index = setupv.time_index;
  const event_days = setupv.event_days;
  const start = setupv.start, end = setupv.end, slot_dur = setupv.slot_dur;
  const max_limit = setupv.max_limit;

  
  const time_slot_choices = create_time_slots(start, end, slot_dur);

  var available = [];
  for (var i = 0; i < max_limit; i++){
    available.push(new Array(time_slot_choices[0].length).fill(max_limit));
  }

  const selected_day_item = form.getItems()[day_index]; 
  const selected_time_item = [];
  for (var i = 0; i < event_days.length; i++){
    selected_time_item[i] = form.getItems()[time_index[i]];
  }

  var formResponses = form.getResponses();

  for (var formResponse of formResponses){
    const DayResponse = formResponse.getResponseForItem(selected_day_item);
    selected_day = DayResponse.getResponse();
    var day = 1;
    for(var i = 0; i <event_days.length; i++){
      if (selected_day == event_days[i]){
        day = i;
      }
    }
    
    var TimeResponse = formResponse.getResponseForItem(selected_time_item[day]);
    selected_time = TimeResponse.getResponse();
    
    // if (day == 1){
    //   console.log(selected_time);
    //   console.log("time_slot_choices : %s", time_slot_choices[day]);
    // }
    var ind = time_slot_choices[day].indexOf(selected_time.substring(0, 8));
    available[day][ind]--;
    
    //console.log("%s -- %s ..day %s..ind %s... %s",selected_day, selected_time, day, ind, available[day][ind]);
    
    if (available[day][ind] == 0){
      reset_time_choices(time_slot_choices, available, day, form, day_index, time_index, event_days);
    }
  }
}

// Reset the time slots listed for each day depending on the available capacity------------------------------------//
function reset_time_choices(time_slot_choices, available, day, form, day_index, time_index, event_days){
  
  selected_time_item = form.getItems()[time_index[day]];
  var time_item = selected_time_item.asListItem();

  choice = [];

  for (var i=0; i < time_slot_choices[0].length; i++){
    if (available[day][i] !=0){
      choice.push(String(time_slot_choices[day][i]));
    } 
  }
  console.log("after checking availability: %s", choice.length);
  if (choice.length != 0){
    time_item.setChoiceValues(choice);
  }
  else{
    time_item.setTitle('All time slots for the selected days are filled. Please go back to choose a different date!').setChoices([time_item.createChoice('Click Back button to choose a different date')]);

    // remove day if all the time slots for the day is filled.
  
    choice = [];
    for (var i = 0; i < event_days.length; i++){
      for (var j=0; j <time_slot_choices[0].length; j++){
        if (available[i][j] !=0){
          choice.push(event_days[i]);
          break;
        }
      }
    }
    const selected_day_item = form.getItems()[day_index];
    var day_item = selected_day_item.asMultipleChoiceItem();
    day_item.setChoiceValues(choice);

        // Set the conditional navigation based on the selected date ------------------------------------//
    var choice_list = [], page = [];
    var j = 0;
    for (var i = 0; i < event_days.length; i++){
      page[i] = form.getItems()[time_index[i]-1].asPageBreakItem();
      if (event_days[i] == choice[j]){
        choice_list.push(day_item.createChoice(event_days[i], page[i]));
        j++;
      }
    }
    if (choice_list != null){
      day_item.setChoices(choice_list);
    }
    else{
      day_item.setTitle('No more slots available! Do you wish to be in waitlist?').setChoices([day_item.createChoice('Yes'), day_item.createChoice('No')])
    }
    return;
  } 
}
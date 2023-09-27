function get_setup_values(){

    //The day_index and time_index values needd to be upated if the field order in the form is modified.
  const day_index = 14; //Field item in the form
  // indexes of the sections of individual event day with their available time slots
  const time_index = [16, 18, 20];  
  const event_days = ['December 14th 2023', 'December 15th 2023', 'December 16th 2023'];  
  
    // 10 am to 7 pm and each slot of 15 minutes.
  const start = 10;
  const end = 12;
  const slot_dur = 60;

    // max_limit is 2 registrations in each 15 minutes slot
  const max_limit = 2;
  const setupv = new setup_values(day_index, time_index, event_days, start, end, slot_dur, max_limit)
  return setupv
}


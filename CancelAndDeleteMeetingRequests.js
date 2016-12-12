function CancelAndDeleteMeetingRequests() {
  // Nb. Dates are weird, some are 0-based (array), others aren't...
  var fromDate = new Date(2016,11,23,0,0,0); // 22/12/2016
  var toDate = new Date(2017,0,28,0,0,0); // 27/01/2017
  var calendarName = ''; // TODO: Enter calendar name here

  // Write out calendar names, useful for setting the calendarName variable above
  var calendars = CalendarApp.getAllCalendars();
    for (var i=0; i<calendars.length; ++i) {
      Logger.log(calendars[i].getName());
    }
  
  var calendar = CalendarApp.getCalendarsByName(calendarName)[0];
  var events = calendar.getEvents(fromDate, toDate);
  for(var i=0; i<events.length;i++){
    var ev = events[i];
    if (ev.isAllDayEvent() === false) { // I don't want to cancel all day events
      Logger.log(ev.getStartTime() + ' ' + ev.getTitle()); // Show event time and name in log
      ev.setMyStatus(CalendarApp.GuestStatus.NO); // Set my status as no (not attending the event)
      ev.deleteEvent(); // Kill, kill, kill...
    }
  }
}

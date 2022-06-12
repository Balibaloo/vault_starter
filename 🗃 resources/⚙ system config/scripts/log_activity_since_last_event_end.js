const vp = require(app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\vault_paths.js")()

module.exports = async (args) => {
  const gcal = await require(vp.script_path('google_cal'))(args);

  let events = await gcal.get_events_today();

  // let accepted_events = events.filter(el => {
  //   !el.attendees || 
  //   !el.attendees.some(person => person.self && person.responseStatus === "declined")
  // })


  let rightNow = moment();
  let ended_events = events.filter(ev => moment(ev.end.dateTime).isBefore(rightNow))
  let sorted_by_end_time = ended_events.sort((a, b) => moment(a.end.dateTime).diff(moment(b.end.dateTime)));
  let activity_start_time = moment(sorted_by_end_time[sorted_by_end_time.length - 1].end.dateTime)
  console.log("activity start", activity_start_time.format());

  let rnd_to_15 = x => Math.floor((x + (15 / 2)) / 15) * 15;

  // if right now is less than 15 min from the end of the last event  
  if (rightNow.diff(activity_start_time) < 15 * 60 * 1000)
    rightNow.set("minute", rnd_to_15(rightNow.minutes() + 15));
  else
    rightNow.set("minute", rnd_to_15(rightNow.minutes()));

  console.log(args);
  args.variables.VALUE = 'lllll';
}
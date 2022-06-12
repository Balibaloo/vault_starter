const vp = require(app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\vault_paths.js")()
const projects = require(vp.script_path('projects'))();
module.exports = async (args) => {
  const gcal = await require(vp.script_path('google_cal'))(args);

  // file
  let file_path = args.app.workspace.lastOpenFiles[0];
  let file_name = file_path.split("/").slice(-1)[0];

  let event_title = "";
  let cal = "primary"

  let proj_prefix = projects.get_file_project_short_name(args, file_path);
  if (proj_prefix) {
    event_title += proj_prefix.toUpperCase() + ' ';
    cal = await gcal.get_work_calendar_id();
  } else {
    event_title += "📝";
  }

  // get file pomodoros
  let event_duration = 60; // default
  let file = app.vault.getAbstractFileByPath(file_path);
  let file_contents = await args.app.vault.cachedRead(file);

  let file_pomodoros_match = file_contents.match(/pomodoros\s*:\s*(\d+)/);
  if (file_pomodoros_match && file_pomodoros_match[1]){
    let duration = parseInt(file_pomodoros_match[1])*30;
    if (duration) event_duration = duration;
  }


  event_title += file_name.split(".")[0];

  let eventBody = `
  obsidian://open?vault=_the_bridge&file=${encodeURIComponent(file_path)}
  `

  gcal.create_event(
    calendarID = cal,
    eventDetails = {
      summary: event_title,
      description: eventBody,
      startDateTime: moment().startOf('hour').format(),
      durationMin: event_duration,
    }
  );
}
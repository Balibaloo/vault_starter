const vp = require(app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\vault_paths.js")()
const projects = require(vp.script_path('projects'))();

module.exports = async (args) => {
  const gcal = await require(vp.script_path('google_cal'))(args);
  // file
  let file_path = args.app.workspace.lastOpenFiles[0];

  // console.log(args.app.vault.fileMap[file_path]);
  // console.log(args.app);

  evs = await gcal.get_current_events(await gcal.get_work_calendar_id());
  evs = evs.concat(await gcal.get_current_events("primary"));
  evs = evs.filter(ev => ev?.start?.dateTime);
  console.log('evs:', evs);

  for (ev of evs) {
    description = ev.description;
    let matches = description?.match(/obsidian:\/\/open\?vault=_the_bridge&(amp;)?file=(.*(\.md)?)/)
    if (!matches) {
      console.log("no obsidian links", description);
      continue;
    }

    let abstract_file_path = decodeURIComponent(matches[2]);

    let leaf;
    if (args.app.workspace.getActiveFile() == null) {
      leaf = args.app.workspace.activeLeaf;
    } else {
      leaf = args.app.workspace.splitLeafOrActive();
    }

    let file = args.app.vault.getAbstractFileByPath(abstract_file_path);
    if (!file) new Notice("Error: current event file missing");
    await leaf.openFile(file);
    args.app.workspace.setActiveLeaf(leaf, true, true);
  }


  // let file_title = projects.get_file_project_short_name(args,file_path).toUpperCase() + " " + file_path.split("/").slice(-1);
  // let eventBody = `obsidian://open?vault=_the_bridge&file=${encodeURIComponent(file_path)}

  // some more description, idk`
  // gcal.create_event(
  //   calendarID="tosep6ajfhaf3oh8cn9f7d5cfo@group.calendar.google.com",
  //   eventDetails={
  //     summary:file_title,
  //     description:eventBody,
  //     startDateTime:moment("2022-03-06").add(12,'H').format(),
  //     durationMin: 30
  //   }
  // );
}
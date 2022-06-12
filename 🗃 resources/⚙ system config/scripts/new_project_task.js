var path = require('path');
const vp = require(app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\vault_paths.js")()
const projects = require(vp.script_path('projects'))();
const efforts = require(vp.script_path('effort'))();

module.exports = async (args) => {
  const gcal = await require(vp.script_path('google_cal'))(args);
  const { app: { vault: { adapter: v_adapter } } } = args;
  const { quickAddApi: { inputPrompt } } = args;
  const nl_dates = args.app.plugins.plugins["nldates-obsidian"];

  // make sure we have a project directory
  if (!args.variables.curr_proj_dir)
    if (!await projects.get_user_choice_project_dir(args))
      return null;

  // get task title
  if (!args.variables.task_title)
    args.variables.task_title = await inputPrompt("task title", "task title");
  if (!args.variables.task_title) return;


  // get a valid date using natural language dates
  let date_string = null;
  while (!args.variables.deadline?.isValid) {
    date_string = await inputPrompt("due date", "natural language");
    if (date_string == undefined)
      return;

    try {
      args.variables.deadline = nl_dates.parseDate(date_string).moment;
    } catch {
      args.variables.deadline = null;
    }
  }

  // get a valid task priority
  while (args.variables.priority == NaN || args.variables.priority == null ||
    args.variables.priority < 0 || args.variables.priority > 10) {

    let priority_string = await inputPrompt("task priority", "0-10, 5 default");
    if (priority_string === "") {
      args.variables.priority = 5;
      break;
    }

    if (!priority_string)
      return null; // return if user escapes


    args.variables.priority = parseInt(priority_string);
  }

  if (!args.variables.effort)
    await efforts.getEffort(args);
  if (!args.variables.effort) return;

  // get template contents
  let template_path = vp.join(vp.resources_config_templates, "project task template.md");
  let template_file = args.app.vault.getAbstractFileByPath(template_path);
  let template_contents = await args.app.vault.cachedRead(template_file);

  // format template with variables
  args.variables.deadline_formatted = args.variables.deadline.format("YYYY-MM-DD")
  let formatted_text = template_contents.replaceAll(/\{\{(.*)\}\}/g, (match, p1) => {
    return args.variables[p1] || p1
  });

  let new_task_path = path.join(
    v_adapter.basePath,
    args.variables.curr_proj_dir,
    args.variables.task_title + ".md",
  )

  await v_adapter.fsPromises.writeFile(new_task_path, formatted_text);


  // open new pane
  let new_task_abstract_path = vp.join(args.variables.curr_proj_dir, args.variables.task_title);
  if (!args.variables.headless) {
    let leaf = args.app.workspace.splitActiveLeaf();
    let file = args.app.vault.getAbstractFileByPath(new_task_abstract_path);
    await leaf.openFile(file);
    args.app.workspace.setActiveLeaf(leaf, true, true);
  }


  //create event for task
  let eventBody = `obsidian://open?vault=_the_bridge&file=${encodeURIComponent(new_task_abstract_path)}`

  gcal.create_event(
    calendarID = await gcal.get_work_calendar_id(),
    eventDetails = {
      summary: projects.get_file_project_short_name(args, new_task_abstract_path).toUpperCase() + " " + args.variables.task_title,
      description: eventBody,
      startDateTime: moment(args.variables.deadline).format(),
      durationMin: 30 * args.variables.effort
    }
  );

}
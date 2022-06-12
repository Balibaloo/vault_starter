var path = require('path');
const vp = require(app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\vault_paths.js")()
const proj = require(vp.script_path('projects'))();
const efforts = require(vp.script_path('effort'))();


module.exports = async (args) => {
  const { app: { vault: { adapter: v_adapter } } } = args;
  const { quickAddApi: { inputPrompt } } = args;
  const nl_dates = args.app.plugins.plugins["nldates-obsidian"];

  // make sure we have a project directory
  if (!args.variables.curr_proj_dir)
    if (!await proj.get_user_choice_project_dir(args))
      return;

  // get task title
  let task_title = await inputPrompt("task title", "task title");
  if (!task_title) return;

  // get a valid date using natural language dates
  let date_string = null;
  while (!args.variables.deadline) {
    date_string = await inputPrompt("due date", "natural language");
    console.log(date_string);

    try {
      args.variables.deadline = nl_dates.parseDate(date_string).moment.format("YYYY-MM-DD");
    } catch {
      args.variables.deadline = null;
    }
  }

  // get a valid release date using natural language dates
  date_string = null;
  while (!args.variables.released) {
    date_string = await inputPrompt("release date", "natural language");

    try {
      args.variables.released = nl_dates.parseDate(date_string).moment.format("YYYY-MM-DD");
    } catch {
      args.variables.released = null;
    }
  }

  // get a valid task percent
  while (args.variables.percent == NaN || args.variables.percent == null ||
    args.variables.percent < 0 || args.variables.percent > 100) {

    let percent_string = await inputPrompt("task percent of project grade", "0-100 without % sign");

    if (!percent_string)
      return null; // return if user escapes


    args.variables.percent = parseInt(percent_string);
  }

  await efforts.getEffort(args);
  if (!args.variables.effort) return;

  // get template contents
  let template_path = vp.join(vp.resources_config_templates, "graded task template.md");
  let template_file = args.app.vault.getAbstractFileByPath(template_path);
  let template_contents = await args.app.vault.cachedRead(template_file);

  // format template with variables
  let formatted_text = template_contents.replaceAll(/\{\{(.*)\}\}/g, (match, p1) => {
    return args.variables[p1] || p1
  });

  let new_task_path = path.join(
    v_adapter.basePath,
    args.variables.curr_proj_dir,
    task_title + ".md",
  )

  await v_adapter.fsPromises.writeFile(new_task_path, formatted_text);

  // open new pane
  let leaf = args.app.workspace.splitActiveLeaf();
  let new_task_abstract_path = vp.join(args.variables.curr_proj_dir, task_title + ".md");
  let file = args.app.vault.getAbstractFileByPath(new_task_abstract_path);
  await leaf.openFile(file);
  args.app.workspace.setActiveLeaf(leaf, true, true);
}


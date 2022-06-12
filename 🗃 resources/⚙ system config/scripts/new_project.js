const vp = require(app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\vault_paths.js")()
const projects = require(vp.script_path('projects'))();
var path = require('path');


module.exports = async (args) => {
  const { quickAddApi: { inputPrompt } } = args;
  const { app: { vault: { adapter: v_adapter } } } = args;

  let project_title = await inputPrompt("project title", "project title");
  if (!project_title) return;

  // get new project directory
  let projects_dir = args.app.vault.fileMap[vp.projects];

  let chosen_project_group = await projects.get_sub_dir_choice(args, projects_dir);
  let new_project_dir = path.join(
    v_adapter.basePath,
    vp.projects,
    chosen_project_group,
    project_title
  );

  // create project directory
  await v_adapter.fsPromises.mkdir(new_project_dir);


  // get project file path
  let new_project_file_path = path.join(
    new_project_dir,
    vp.projects_prefix + project_title + ".md");

  // create project file with template
  await v_adapter.fsPromises.writeFile(new_project_file_path, "<% tp.file.include('[[project template]]')%>");

  // open new pane
  let leaf = args.app.workspace.splitActiveLeaf();
  let file = args.app.vault.getAbstractFileByPath(new_project_file_path);
  await leaf.openFile(file);
  args.app.workspace.setActiveLeaf(leaf, true, true);
}
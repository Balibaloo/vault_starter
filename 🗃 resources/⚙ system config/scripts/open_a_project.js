const vp = require(app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\vault_paths.js")()
const projects = require(vp.script_path('projects'))();

module.exports = async (args) => {
  await projects.get_user_choice_project_dir(args);

  let leaf = args.app.workspace.splitActiveLeaf();
  let project_file_path = args.variables.proj_file_path + ".md";
  let file = args.app.vault.getAbstractFileByPath(project_file_path);
  await leaf.openFile(file);
  args.app.workspace.setActiveLeaf(leaf, true, true);
}
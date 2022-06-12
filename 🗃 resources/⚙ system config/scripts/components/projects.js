const vp = require(app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\vault_paths.js")()

const get_sub_dir_choice = async (args, dir, show_current_dir = false) => {
  let project_group_paths = dir_to_sub_dirs(dir);

  if (show_current_dir)
    project_group_paths.push(dir.name);

  return await args.quickAddApi.suggester(str => str, project_group_paths);
}

const dir_to_sub_dirs = (dir) => {
  // since projects are directories, filter out any non directory files 
  let project_group_dirs = dir.children.filter(el => !el.extension);

  return project_group_dirs.map(el => el.name.replace('\\', '/'));
}

const set_project_directory = (args, new_path) => {
  args.variables.curr_proj_dir = new_path;

  // store the current project file variable
  args.variables.proj_file_path = vp.join(
    new_path,
    vp.projects_prefix + new_path.split('/').slice(-1),
  );

  console.log("new project file", args.variables.proj_file_path);
}

const get_user_choice_project_dir = async (args) => {

  // get all project categories
  let projects_dir = args.app.vault.fileMap[vp.projects];
  let project_categories_choices = dir_to_sub_dirs(projects_dir);

  // if user is in a project, add the current project as the first option
  let curr_proj_dir;
  if (curr_proj_dir = get_curr_project_dir(args)) {
    project_categories_choices.unshift(curr_proj_dir);
  }

  // user choses project category
  let user_category_choice = await args.quickAddApi.suggester(str => str, project_categories_choices);

  // if user cancels
  if (!user_category_choice) return null;

  // if user chose the current project
  if (user_category_choice == curr_proj_dir) {
    // set it as the active project for the rest of the macro and return it
    set_project_directory(args, curr_proj_dir);
    return args.variables.curr_proj_dir;
  }

  // try get project in chosen category
  let category_dir = args.app.vault.fileMap[vp.join(vp.projects, user_category_choice)];
  let user_project_choice = await get_sub_dir_choice(args, category_dir);
  if (!user_project_choice) return null;

  console.log("choice", vp.projects,
    user_category_choice,
    user_project_choice);
  set_project_directory(
    args,
    vp.join(
      vp.projects,
      user_category_choice,
      user_project_choice,
    )
  )

  return args.variables.curr_proj_dir;
}

const get_file_project_dir = (args, file = null) => {
  if (file === null)
    return null;

  if (!file.startsWith(vp.projects))
    return null;

  // if current file is not in a project
  if (file.split('/').length <= 2)
    return null;

  return file.split('/').slice(0, 3).join('/');
}

const get_file_project_short_name = (args, file = null) => {
  console.log(file);
  let project_dir = get_file_project_dir(args, file);
  console.log(project_dir);
  if (project_dir === null) return null;

  let short_code = project_dir.split('/').slice(-1)[0] // get dir name
    .split(" ").filter(el => ["and", "a"].indexOf(el.toLowerCase()) == -1) // filter non significant words
    .map(el => el.slice(0, 1)) // get first characters of significant words
    .join(''); // join them into one code
  console.log(short_code);
  return short_code;
}

const get_curr_project_dir = (args) => {
  return get_file_project_dir(args, args.app.workspace.lastOpenFiles[0]);
}

const get_all_project_tlds = (args) => {
  let projects_dir = app.vault.fileMap[vp.projects];
  return projects_dir.children.filter(el => !el.extension);
}


module.exports = (args) => {

  return {
    get_sub_dir_choice,
    get_user_choice_project_dir,
    get_file_project_dir,
    get_file_project_short_name,
    get_curr_project_dir,
    get_all_project_tlds,
    dir_to_sub_dirs,
  }
}
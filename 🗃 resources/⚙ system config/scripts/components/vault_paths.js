var path = require('path');

/* joins and replaces backslashes with forward slashes */
let join = (...args) => {
  return path.join(...args).replace(/\\/g, "/");
}



module.exports = () => {
  const abs_rt = app.vault.adapter.basePath;

  const areas = "🕸 areas of responsibility";
  const areas_system = join(areas, "⛰️ operating system");
  const areas_system_feature_tracking = join(areas_system, "Feature Tracking")
  const areas_system_changes = join(areas_system_feature_tracking, "✔ changes");
  const areas_system_use_cases = join(areas_system_feature_tracking, "⚡ use cases");

  const resources = "🗃 resources";
  const resources_logs = join(resources, "🗄 logs");
  const resources_config = join(resources, "⚙ system config");
  const resources_config_templates = join(resources_config, "templates");
  const resources_config_scripts = join(resources_config, "scripts");

  const projects_prefix = "🏗 ";
  const projects = projects_prefix + "projects";
  const project_uni = join(projects, "🎓 uni");


  const periodic = join(resources_logs, "⌛ periodic");
  const periodic_daily = join(periodic, "daily");
  const periodic_weekly = join(periodic, "weekly");
  const dreams = join(resources_logs, "🖋 journaling", "dreams");

  let script_path = (component_name) => {
    return join(abs_rt, resources_config_scripts, "components", component_name);
  }

  return {
    abs_rt,

    join,
    script_path,
    areas,
    areas_system,
    areas_system_changes,
    areas_system_use_cases,

    projects, projects_prefix,
    project_uni,

    resources,
    resources_config,
    resources_config_templates,
    resources_config_scripts,

    resources_logs,
    periodic, periodic_daily, periodic_weekly,
    dreams,
  }
}
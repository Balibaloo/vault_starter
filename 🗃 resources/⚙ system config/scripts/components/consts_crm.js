const vp = require(app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\vault_paths.js")()

let change_types = {
  "🌱": '🌱 new use case',
  "🌿": '🌿 use case change',
}

let template_dict = {
  "🌱": vp.join(vp.resources_config_templates, "use case template.md"),
  "🌿": vp.join(vp.resources_config_templates, "use case change template.md"),
}

let path_dict = {
  "🌱": vp.areas_system_use_cases,
  "🌿": vp.areas_system_changes,
}



let change_statuses = {
  "⚪": "⚪ not doing",
  "🟢": "🟢 started",
  "⚫": "⚫ done",
}


module.exports = () => {
  return {
    template_dict,
    path_dict,
    change_types,
    change_statuses,
  }
}

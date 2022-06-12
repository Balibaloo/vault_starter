const vp = require(app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\vault_paths.js")()
const path = require("path");

module.exports = async (args) => {
  const { app: { vault: { adapter: v_adapter } } } = args;
  const { quickAddApi: { inputPrompt, wideInputPrompt } } = args;
  console.log(args);
  //instance.settings.inputPrompt === "multi-line"
  // get dream title
  let dream_title = await inputPrompt("dream title", "dream title");
  if (!dream_title) return;


  let dream = await wideInputPrompt("", "");
  if (!dream) return;
  args.variables.dream = dream;

  // get template contents
  let template_path = vp.join(vp.resources_config_templates, "dream.md");
  let template_file = args.app.vault.getAbstractFileByPath(template_path);
  let template_contents = await args.app.vault.cachedRead(template_file);

  // format template with variables
  let formatted_text = template_contents.replaceAll(/\{\{(.*)\}\}/g, (match, p1) => {
    return args.variables[p1] || p1
  });

  let new_file_path = path.join(
    v_adapter.basePath,
    vp.dreams,
    dream_title + ".md",
  )

  await v_adapter.fsPromises.writeFile(new_file_path, formatted_text);

}

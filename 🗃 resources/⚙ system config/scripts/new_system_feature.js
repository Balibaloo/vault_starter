const vp = require(app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\vault_paths.js")()
const crm = require(vp.script_path("consts_crm"))();

async function createFileWithInput(args, filePath, fileContent) {
  const dirMatch = filePath.match(/(.*)[\/\\]/);
  let dirName = "";
  if (dirMatch) dirName = dirMatch[1];

  if (await args.app.vault.adapter.exists(dirName)) {
    return await args.app.vault.create(filePath, fileContent);
  } else {
    if (await args.app.vault.adapter.exists(filePath))
      return await args.app.vault.modify(filePath, fileContent);
    await createFolder(dirName);
    return await args.app.vault.create(filePath, fileContent)
  }
}


module.exports = async (args) => {
  const { quickAddApi: { inputPrompt, suggester } } = args;

  args.variables.title = await inputPrompt("change name", "change name");
  if (!args.variables.title) return;

  // user choses change type
  args.variables.type = await suggester(key => crm.change_types[key], Object.keys(crm.change_types));
  if (!args.variables.type) return;

  args.variables.status = Object.keys(crm.change_statuses)[0];


  // get template contents
  let template_path = crm.template_dict[args.variables.type];
  let template_file = args.app.vault.getAbstractFileByPath(template_path);
  let template_contents = await args.app.vault.cachedRead(template_file);

  // format template with variables
  let formatted_text = template_contents.replaceAll(/\{\{(.*)\}\}/g, (match, p1) => {
    return args.variables[p1] || p1
  });


  // write to active file
  // this.app.workspace.getActiveFile()

  // try {
  //   const activeView = args.app.workspace.getActiveViewOfType(MarkdownView);

  //   if (!activeView) {
  //       log.logError(`unable to append '${formatted_text}' to current line.`);
  //       return;
  //   }

  //   activeView.editor.replaceSelection(formatted_text);
  // } catch {
  //   log.logError(`unable to append '${formatted_text}' to current line.`);
  // }



  // write it to file
  // create file
  let new_file_path = await vp.join(crm.path_dict[args.variables.type], args.variables.title + ".md");
  createFileWithInput(args, new_file_path, formatted_text);




  // open new file in new pane
  console.log(new_file_path);
  let leaf = args.app.workspace.splitActiveLeaf();
  let file = args.app.vault.getAbstractFileByPath(new_file_path);
  await leaf.openFile(file);
  args.app.workspace.setActiveLeaf(leaf, true, true);
}
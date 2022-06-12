const vp = require(app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\vault_paths.js")()
const projects = require(vp.script_path('projects'))();


module.exports = async (args) => {
  
  let utf16 = string => {
    let exp = Array.from(string).map(chr => `${chr.charAt(0).toLowerCase()}${chr.charAt(1).toLowerCase()}`).join('');
    console.log(exp);
    return exp;
  }

  let file_path = args.app.workspace.lastOpenFiles[0];
  let file_name = file_path.split("/").slice(-1)[0];

  let file = app.vault.getAbstractFileByPath(file_path);
  let file_contents = await args.app.vault.cachedRead(file);

  let match = file_contents.match(`(([${utf16("🌠🪐")}])\s*\/\s*([🍃🌱🌲⛺]))`);
  
  console.log(match)

  for (let i = match.index-1; i<match.index+4; i++){
    console.log(file_contents[i].charCodeAt(0));
  }
  // console.log(`${ file_contents[match.index-1] }${ file_contents[match.index] }` );
  
}

const vp = require(app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\vault_paths.js")()
const new_task = require(vp.script_path("../new_project_task"));
const projects = require(vp.script_path("projects"))();

module.exports = async (args) => {
  const { quickAddApi: { inputPrompt } } = args;

  // get a valid week number
  while (args.variables.week_number == NaN || args.variables.week_number == null ||
    args.variables.week_number < 0) {

    let week_num_string = await inputPrompt("week_number", "0<");

    if (!week_num_string)
      return null; // return if user escapes

    args.variables.week_number = parseInt(week_num_string);
  }


  let project_alg_path = vp.join(vp.project_uni, "Algorithms 2");
  let project_ai_path = vp.join(vp.project_uni, "Artificial Intelligence");
  let project_cdc_path = vp.join(vp.project_uni, "Compiler Design and Construction");
  let project_flfa_path = vp.join(vp.project_uni, "Formal Languages and Finite Automata");
  let project_net_path = vp.join(vp.project_uni, "Networks");


  let defaults = {
    "priority": 5,
    "effort": 2,
    "headless": true,
  }

  let weekStart = moment().startOf("week");
  let mon = moment(weekStart).add(1, "d");
  let tue = moment(weekStart).add(2, "d");
  let wed = moment(weekStart).add(3, "d");
  let thu = moment(weekStart).add(4, "d");
  let fri = moment(weekStart).add(5, "d");


  let wn = args.variables.week_number;
  let tasks = [
    { "task_title": `L ${wn} ${(wn * 2) - 1}`, "deadline": mon, "curr_proj_dir": project_net_path },
    { "task_title": `L ${wn} ${(wn * 2) - 1}`, "deadline": mon, "curr_proj_dir": project_alg_path },
    { "task_title": `L ${wn} ${(wn * 2) - 1}`, "deadline": mon, "curr_proj_dir": project_ai_path },
    { "task_title": `L ${wn} ${(wn * 2)}`, "deadline": tue, "curr_proj_dir": project_net_path },
    { "task_title": `L ${wn} ${(wn * 2)}`, "deadline": tue, "curr_proj_dir": project_alg_path },
    { "task_title": `L ${wn} ${(wn * 2)}`, "deadline": thu, "curr_proj_dir": project_ai_path },
    { "task_title": `L ${wn}`, "deadline": thu, "curr_proj_dir": project_flfa_path },
    { "task_title": `S ${(wn * 2) - 1}`, "deadline": fri, "curr_proj_dir": project_cdc_path },
    { "task_title": `S ${(wn * 2)}`, "deadline": fri, "curr_proj_dir": project_cdc_path },
  ]

  let args_variables_copy = { ...args.variables };

  for (task of tasks) {
    args.variables = Object.assign(args_variables_copy, defaults, task);
    console.log(args.variables);
    await new_task(args);
  }
}

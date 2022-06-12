
const efforts = {
  1 :"1 30min",
  2 :"2 1 hr",
  3 :"3 1:30 hr",
  4 :"4 2:00 hrs",
  5 :"5 2:30 hrs",
  8 :"8 4 hrs",
  13 :"13 7:30 hrs",
  21 :"21 10:30 hrs",
  34 :"34 17:30 hrs"
}

let getEffort = async (args) => {
  const { quickAddApi: { suggester } } = args;
  args.variables.effort = await suggester(key => efforts[key], Object.keys(efforts));
}


module.exports = () => {
  return {
    efforts,
    getEffort
  }
}

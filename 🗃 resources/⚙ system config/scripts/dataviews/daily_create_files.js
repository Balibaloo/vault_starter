module.exports = (dv, date) => {
  dv.table(["file", "deadline", "tasks"],
    dv.pages()
    .filter(el => el.created &&
      moment(`${el.created}`).isSame(date, "day") &&
      !el.file.path.includes("🗄 logs")
    ).map(el => [
      el.file.link,
      el.deadline ? moment(el.deadline).format("YY-MM-DD") : '_',
      el.file.tasks.map(tsk => tsk.text)
    ])
  );
}
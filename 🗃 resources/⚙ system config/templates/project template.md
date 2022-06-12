---
tv: 0.0.0
tags:
- 🏗
deadline:
created: <% tp.file.creation_date(format="YYYY-MM-DD") %>
---
# tasks
## outstanding
```dataviewjs
const projects = require(dv.app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\projects.js")()
dv.table(["file","p|t", "deadline", "tasks"],
	dv.pages("#✔️")
		.filter(el => 
			el.file.tags.indexOf("#✔️/🏗") !== -1 &&
			el.file.path.includes( projects.get_file_project_dir(null,"<%tp.file.path(true)%>")) &&
			el.file.tasks.some(tsk => !tsk.fullyCompleted)
		)
		.sort(el => {	
			return el.deadline
		})
		.map( el => {
		return [
			el.file.link, 
			`${el.priority}|${el.pomodoros}`,
			moment(`${el.deadline?.year}-${el.deadline?.month}-${el.deadline?.day}`)
			.format("YYYY-MM-DD"),
			el.file.tasks.filter(tsk => !tsk.completed).map(tsk => tsk.text)]})
);
```
## completed
```dataviewjs
const projects = require(dv.app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\projects.js")()
dv.table(["file","p|t", "deadline", "tasks"],
	dv.pages("#✔️")
		.filter(el => 
			el.file.tags.indexOf("#✔️/🏗") !== -1 &&
			el.file.path.includes( projects.get_file_project_dir(null,"<%tp.file.path(true)%>")) &&
			el.file.tasks.every(tsk => tsk.fullyCompleted)
		)
		.sort(el => {	
			return el.deadline
		})
		.map( el => {
		return [
			el.file.link, 
			`${el.priority}|${el.pomodoros}`,
			moment(`${el.deadline?.year}-${el.deadline?.month}-${el.deadline?.day}`)
			.format("YYYY-MM-DD"),
			el.file.tasks.filter(tsk => !tsk.completed).map(tsk => tsk.text)]})
);
```


# <% tp.file.title.substr(tp.file.title.indexOf(' ')+1)%>
## people
- [[Roman Kubiv | me]]

## about

```dataviewjs
let weekly = dv.page(moment().format("YYYY-[W]ww"));
let lectures_start = moment("2022-1-24");
// let week_num = parseInt(moment().subtract(lectures_start).format("w"));
let week_num = parseInt(moment().format("w"));

if (!weekly){
	dv.header(3,"no weekly found for week " + week_num);
} else {
	let backlog = weekly.file.tasks
			.filter(tsk => 
					tsk.header.subpath === 'week tasks' &&
					!tsk.fullyCompleted &&
					!tsk.parent
			);
	dv.header(1, "Week " + week_num);
	if (backlog.length != 0){
		dv.taskList(backlog);
	}
}
```
```dataviewjs
dv.header(1,moment().format('dddd'));
```

`="[[🗃 resources/🗄 logs/🖋 journaling/daily/" + dateformat(date(today), "yyyy-MM-dd") + "-journal | Daily Journal ]]"`

```dataviewjs
const vp = require(dv.app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\vault_paths.js")()
let daily = dv.page(`${vp.periodic_daily}/${moment().format("YYYY-MM-DD")}`);

if (!daily){
	dv.header(5,'daily file not found')

} else {
	dv.taskList(
		daily.file.tasks
			.filter(tsk => 
				tsk.header.subpath === 'big tasks' &&
				!tsk.fullyCompleted &&
				!tsk.parent
			)
		);
	
	dv.taskList(
		daily.file.tasks
			.filter(tsk => 
				tsk.header.subpath === 'log' &&
				!tsk.fullyCompleted &&
				!tsk.parent
			)
		);
	dv.taskList(
		daily.file.tasks
			.filter(tsk => 
				tsk.header.subpath === 'dailies' &&
				!tsk.completed &&
				!tsk.parent
			)
		);
}

```

























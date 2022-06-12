
- [ ] upkeep look at [[technical debt]]

- [ ] create a .config folder for each project
	- store task templates
	- config file
		- task calendar to be added to
		- task colour

why? this is a system to keep track of system functionality related tasks and to keep track of the current functionality of the system. This is not intended to track the state of the code that achieves this functionality but merely a browsable, readable, networked view of the current system functionality.

# [[⚡ Use Cases MOC]]

- [ ] Plugin tasks:
	- [ ] learning and other maintenance per plugin
## tasks
```dataviewjs
let tasks = dv.pages("#crm/🌱").concat(dv.pages("#crm/🌿"))
		.filter(el => 
			el.file.tasks.some(tsk => !tsk.fullyCompleted)
			);

dv.table(["tasks"],tasks.map(el=>[
	el.file.link, 
	el.file.tasks.filter(tsk => !tsk.fullyCompleted).map(tsk => tsk.text)
	])
);
```

## new use cases
```dataviewjs
const vp = require(dv.app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\vault_paths.js")()
const crm = require(vp.script_path("consts_crm"))();

let changes = dv.pages("#crm/🌱").concat(dv.pages("#crm/🌿"))
	.filter(f => 
				f.file.path.contains(vp.areas_system) &&
				f["change-status"] !== '⚫'
	);

for (let group of changes.groupBy(f => f.file.tags.filter(t=>t.startsWith("#crm/"))[0])){
	let type = group.key.slice(5);
	dv.table([crm.change_types[type]||"uncategorised"+"s", "status"],
		group.rows
			.sort(f=> -Object.keys(crm.change_statuses).indexOf(f["change-status"]))
			.map(f=>[f.file.link, f["change-status"]])
	)
}
```



## Completed
```dataviewjs
const vp = require(dv.app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\vault_paths.js")()
const crm = require(vp.script_path("consts_crm"))();

let changes = dv.pages("#crm/🌱").concat(dv.pages("#crm/🌿"))
	.filter(f => 
				f.file.path.contains(vp.areas_system) &&
				f["change-status"] === '⚫'
	);

for (let group of changes.groupBy(f => f.file.tags.filter(t=>t.startsWith("#crm/"))[0])){
	let type = group.key.slice(5);
	dv.table([crm.change_types[type]+"s"],
		group.rows
			.sort(f=> -Object.keys(crm.change_statuses).indexOf(f["change-status"]))
			.map(f=>[f.file.link])
	)
}
```








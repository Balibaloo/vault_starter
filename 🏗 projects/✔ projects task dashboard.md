# 🏗 projects
```dataviewjs
const projects = require(dv.app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\projects.js")()

for (let dir of projects.get_all_project_tlds()){
	if (dir.children.length === 0) continue;
	
	dv.table([dir.name],dv.pages(`#🏗 and "${dir.path}"`).map(el => [el.file.link]))
}
```

<br>
# ✔️ tasks
```dataviewjs
const projects = require(dv.app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\projects.js")()

let tasks = dv.pages("#✔️/🏗")
		.filter(el => 
			el.file.path.startsWith("🏗 projects/") &&
			el.file.name != "✔ Project Tasks" &&
			el.file.tasks.some(tsk => !tsk.fullyCompleted)&&moment(`${el.deadline?.year}-${el.deadline?.month}-${el.deadline?.day}`).isAfter(moment().subtract(1, 'd')) &&moment(`${el.released?.year}-${el.released?.month}-${el.released?.day}`).isBefore(moment().add(1, 'd')) &&
			el.percentage_t
			);

let project_groups = tasks.groupBy(t=>projects.get_file_project_short_name(null,t.file.path));

let out = [];
let group_count = [];
project_groups.forEach(group=>{
	out.push([]);
})

project_groups.forEach((group,ind)=>{
	let acc = 0;

	group.rows?.sort(el => {
				let redCounter = 0;
				el.file.name.match(/[-]{0,1}[\d]*/g)
				  ?.filter(el=>el)
				  ?.map(el=>Math.abs(el))
				  .forEach((el, ind) => {redCounter+=el*(100**(1-ind))} )
		
				return -el.priority * 10_0000_00_00_0000 +parseInt(moment(`${el.deadline?.year}-${el.deadline?.month}-${el.deadline?.day}`).format("YYYYMMDD"))* 10000 +(redCounter?redCounter:0);
			}).forEach(el => {
		if (!out[acc]) out[acc] = []; 
		out[acc][ind] = el.file.link;
		acc++;
	})

	group_count[ind] = acc;
})
if (out.length != 0)
	dv.header("active graded", 2);
dv.table([...project_groups.map(g => g.key)],
		 [group_count,...out]
	);
```
```dataviewjs
const projects = require(dv.app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\projects.js")()


let tasks = dv.pages("#✔️/🏗")
		.filter(el => 
			el.file.path.startsWith("🏗 projects/") &&
			el.file.name != "✔ Project Tasks" &&
			el.file.tasks.filter(tsk => tsk.header.subpath === "tasks")
				.some(tsk => !tsk.fullyCompleted) &&
			moment(`${el.deadline?.year}-${el.deadline?.month}-${el.deadline?.day}`).isBefore(moment().subtract(1, 'd'))
			);

let project_groups = tasks.groupBy(t=>projects.get_file_project_short_name(null,t.file.path));

let out = [];
let group_count = [];
project_groups.forEach(group=>{
	out.push([]);
})

project_groups.forEach((group,ind)=>{
	let acc = 0;

	group.rows?.sort(el => {
				let redCounter = 0;
				el.file.name.match(/[-]{0,1}[\d]*/g)
				  ?.filter(el=>el)
				  ?.map(el=>Math.abs(el))
				  .forEach((el, ind) => {redCounter+=el*(100**(1-ind))} )
		
				return -el.priority * 10_0000_00_00_0000 +parseInt(moment(`${el.deadline?.year}-${el.deadline?.month}-${el.deadline?.day}`).format("YYYYMMDD"))* 10000 +(redCounter?redCounter:0);
			}).forEach(el => {
		if (!out[acc]) out[acc] = []; 
		out[acc][ind] = `${el.file.link}(${el.file.tasks.filter(ts=>!ts.completed).length})`;
		acc++;
	})

	group_count[ind] = acc;
})

if (out.length != 0)
	dv.header(2, "overdue")

dv.table([...project_groups.map(g => g.key)],
		 [group_count,...out]
	);
```
```dataview
TABLE sum(rows.pomodoros) as "Total Pomodoros", sum(rows.pomodoros)/2 as "Est Hours" 
FROM #✔️
WHERE  
	!contains(file.tags,"#✔️/learning") AND
	startswith(file.path,"🏗 projects/") AND
	any(map(file.tasks, (tsk) => !tsk.fullyCompleted))
GROUP BY priority
SORT priority DESC
```

---
## schedule
```dataviewjs
const projects = require(dv.app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\components\\projects.js")()


let priority_style = (priority) => {
	let logistic_transform = (1/(1+2.7182^(1.1*priority-5.5)))*255;
	return `<span style="color:rgb(${255-logistic_transform},${logistic_transform},0);">${priority}</span>`
}

let tasks = dv.pages("#✔️/🏗")
		.filter(el => 
			el.file.path.startsWith("🏗 projects/") &&
			el.file.name != "✔ Project Tasks" &&
			el.file.tasks.some(tsk => !tsk.completed)
			);


let today_seen = false;
for (let group of tasks.groupBy(t=>t.deadline)){
	let day = moment(`${group.key.year}-${group.key.month}-${group.key.day}`);
	//let day_formated ="<span "+ (day.isSame(moment(),"day")?"style='background:red'":"") + ">" + day.format("MM-DD") + '</span>';

	let day_formated = day.format("MM-DD ")

	if (day.isSame(moment(),"day")){
		today_seen = true;
	}
	if (!today_seen && day.isAfter(moment())){
		dv.header(5,"today "+moment().format("MM-DD")+" 👈");
		today_seen = true;
	}
	
	dv.table(["🏗"+(day.isSame(moment(),"day")?"👈":""), day_formated,"p|t", "tasks"],
			group.rows?.sort(el => {
				let redCounter = 0;
				el.file.name.match(/[-]{0,1}[\d]*/g)
				  ?.filter(el=>el)
				  ?.map(el=>Math.abs(el))
				  .forEach((el, ind) => {redCounter+=el*(100**(1-ind))} )
		
				return -el.priority * 10_0000_00_00_0000 +parseInt(moment(`${el.deadline?.year}-${el.deadline?.month}-${el.deadline?.day}`).format("YYYYMMDD"))* 10000 +(redCounter?redCounter:0);
			})
			.map( el => {
					let redCounter = 0;
				el.file.name.match(/[-]{0,1}[\d]*/g)?.filter(el=>el)?.map(el=>Math.abs(el)).forEach((el, ind) => {redCounter+=el*(100**(1-ind))})
			return [projects.get_file_project_short_name(null, el.file.path),
			el.file.link , `${priority_style(el.priority)}|${el.pomodoros}`, el.file.tasks.filter(tsk => !tsk.completed && tsk.header.subpath === 'tasks').map(tsk => tsk.text)]})
	);
} 
```
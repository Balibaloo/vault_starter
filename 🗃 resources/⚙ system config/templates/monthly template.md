---
tv: 0.0.3
---

# <%moment(tp.file.title).format("YYYY MMMM") %>
# review
how are all your projects going?

<%*
// insert all project categories as h2
// and all active projects as h3
let projects = tp.user.projects(tp);
for (let dir of projects.get_all_project_tlds()){
	let dir_projects = projects.dir_to_sub_dirs(dir);
	if (!(dir_projects.length != 0)) continue;
	tR += "##  " + dir.name + "\n";
	for (project of dir_projects){
		tR += "### " + project + "\n";
		tR += "\n";		
	}
}
%>

# backlog
### must do

### should do

### could do



# completed this month
``` dataviewjs
let dailies_in_month = dv.pages("#⌛/daily")
	.filter(f => f.file.name.match(/^<%tp.file.title%>-\d\d$/));

dailies_in_month = dailies_in_month.sort(e=>e.file.name, 'asc');

dv.table(["day", "big tasks"], dailies_in_month.map(f => {
	let day_display = `${f.file.link} ${moment(f.file.name).day() === 0 ? "☀" : ""}`;
	let out = [];
	for (let t of f.file.tasks)
		if ( t.header.subpath === 'big tasks')
			out.push(t.text)
	
	return [day_display, out];
	}).filter(day => day[1].length != 0)
)
```

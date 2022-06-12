---
tv: 0.1.0
tags:
- ⌛/weekly
---
Weeklies [[🗃 resources/🗄 logs/⌛ periodic/weekly/<% moment( tp.file.title ).subtract(1,"w").format("YYYY-[W]ww") %> | <<< ]] [[🗃 resources/🗄 logs/⌛ periodic/weekly/<% moment( tp.file.title ).add(1,"w").format("YYYY-[W]ww") %> | >>>]]
Dailies <% tp.user.periodic(tp).weekly_day_links(moment( tp.file.title ),1,1) %>

---
### ![[🗃 resources/🗄 logs/⌛ periodic/weekly/<% moment( tp.file.title ).subtract(1,"w").format("YYYY-[W]ww") %>#📌key takeaways| previous week takeaways and plans]]
# <%tp.file.title%>

## plan
what individual action items are you going to tackle?

```dataviewjs
let monthly = dv.page(moment("<%tp.file.title%>").format("YYYY-MM"));
let backlog = monthly.file.tasks
		.filter(tsk => 
				tsk.header.subpath === 'backlog' &&
				!tsk.fullyCompleted
		);
if (backlog.length != 0){
	dv.taskList(backlog);
}
```

#### week tasks
- [ ] import from last week

##### shopping list


#### <%moment(tp.file.title).startOf("week").format("dddd Do") %>
!<%tp.user.periodic(tp).toDailyLink(moment(tp.file.title).startOf("week"),"no-header" ,null,"#big tasks")%>

#### <% moment(tp.file.title).startOf("week").add(1,"d").format("dddd Do")%>
!<%tp.user.periodic(tp).toDailyLink(moment(tp.file.title).startOf("week").add(1,"d"),"no-header",null,"#big tasks")%>

#### <% moment(tp.file.title).startOf("week").add(2,"d").format("dddd Do")%>
!<%tp.user.periodic(tp).toDailyLink(moment(tp.file.title).startOf("week").add(2,"d"),"no-header",null,"#big tasks")%>

#### <% moment(tp.file.title).startOf("week").add(3,"d").format("dddd Do")%>
!<%tp.user.periodic(tp).toDailyLink(moment(tp.file.title).startOf("week").add(3,"d"),"no-header",null,"#big tasks")%>

#### <% moment(tp.file.title).startOf("week").add(4,"d").format("dddd Do")%>
!<%tp.user.periodic(tp).toDailyLink(moment(tp.file.title).startOf("week").add(4,"d"),"no-header",null,"#big tasks")%>

#### <% moment(tp.file.title).startOf("week").add(5,"d").format("dddd Do")%>
!<%tp.user.periodic(tp).toDailyLink(moment(tp.file.title).startOf("week").add(5,"d"),"no-header",null,"#big tasks")%>

#### <% moment(tp.file.title).startOf("week").add(6,"d").format("dddd Do")%>
!<%tp.user.periodic(tp).toDailyLink(moment(tp.file.title).startOf("week").add(6,"d"),"no-header",null,"#big tasks")%>

## journal

### weekly review

#### issues, sources of friction

### the good

### 📌key takeaways
- example


<%*
// <%+ moment().format("dddd") === "<%moment(tp.file.title).startOf("week").add(6,"d").format("dddd")%>" ? "👈" : "" %>































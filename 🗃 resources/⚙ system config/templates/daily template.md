---
tv: 0.1.19
tags:
  - ⌛/daily
---
[[🗃 resources/🗄 logs/⌛ periodic/weekly/<% moment( tp.file.title ).format("YYYY-[W]ww") %> | ___^^^___ ]]
[[🗃 resources/🗄 logs/⌛ periodic/daily/<% moment( tp.file.title ).subtract(1,"d").format("YYYY-MM-DD") %> | <<<]] [[🗃 resources/🗄 logs/⌛ periodic/daily/<% moment( tp.file.title ).add(1,"d").format("YYYY-MM-DD") %>  | >>>]]
[[ 🗃 resources/🗄 logs/🖋 journaling/daily/<%tp.file.title%>-journal | journal]]
___

# <% moment( tp.file.title ).format("dddd [the] Do [of] MMMM YYYY") %>
## daily reminders:

![[☯ wisdom#^v96d0jq]]
![[☯ wisdom#^0b5137|LARGE]]


# tasks
## big tasks
<%*
// weekly tasks
if (moment(tp.file.title).day()
 === moment(tp.file.title).startOf("week").add(6,'d').day())
	tR += "- [ ] weekly review\n";
%>

## log
<%*
if (moment(tp.file.title).day() === moment().startOf("week").day()){
	tR += `- [ ] populate weekly note from monthly note\n`;
}
%>


## dailies
- [ ] wake up
	- [ ] drink 1L water
	- [ ] focus eyes
	- [ ] morning snack
	- [ ] stretch
	- [ ] morning CBD
- [ ] hygiene
	- [ ] shower
		- [ ] wash hair
	- [ ] vitamins
	- [ ] floss
	- [ ] brush teeth
	- [ ] mouthwash
	- [ ] facewash
	- [ ] shave
- [ ] boot past
	- [ ] yesterdays note
	- [ ] check keep
	- [ ] update calendar
	- [ ] workbench
	- [ ] 30 second inbox check
- [ ] boot present
	- [ ] priority Gmail
	- [ ] outlook
	- [ ] teams work scan
	- [ ] PWC Gmail
- [ ] exercise
	- [ ] arms and back
		- [ ] push ups
		- [ ] rows
	- [ ] legs
		- [ ] squats
		- [ ] run
	- [ ] core
		- [ ] frog crunches
		- [ ] Russian twists
- [ ] stretch
	- [ ] thigh leg raises
	- [ ] arm hold neck tilt
	- [ ] roll to toe touch
	- [ ] shoulder roll
- [ ] lunch
- [ ] dinner
- [ ] slow down, meditate
- [ ] Duolingo
- [ ] sporadic tidying
- [ ] go for walk
- [ ] read a page
- [ ] daily news
- [ ] shutdown
	- [ ] evening CBD
	- [ ] floss
	- [ ] brush teeth
	- [ ] facewash
	- [ ] mouthwash
	- [ ] went to bed before 12

## created today:
```dataviewjs
let daily_create_files = require(dv.app.vault.adapter.basePath + "\\🗃 resources\\⚙ system config\\scripts\\dataviews\\daily_create_files.js");

daily_create_files(dv,"<% tp.file.title %>"); 
```













































































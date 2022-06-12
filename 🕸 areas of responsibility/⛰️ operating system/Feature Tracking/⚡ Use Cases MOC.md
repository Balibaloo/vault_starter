```dataviewjs
let outLinks = dv.current().file.outlinks;
let useCases = dv.pages("#crm/🌱")
		.filter(el => outLinks.indexOf(el.file.link) == -1 &&
			el["change-status"] === '⚫' &&
			el.file.path.startsWith("🕸 areas of responsibility/"))
let changes = dv.pages("#crm/🌿")
		.filter(el => outLinks.indexOf(el.file.link) == -1 &&
			el["change-status"] === '⚫' &&
			el.file.path.startsWith("🕸 areas of responsibility/"))
if (useCases.length != 0){
	dv.table(["Uncategorised complete use cases"],
			 [[useCases.map(t=>t.file.link)]]
	);
}
if (changes.length != 0){
	dv.table(["Uncategorised complete use case changes"],
			 [[changes.map(t=>t.file.link)]]
	);
}
```

# [[✔ CRM Dashboard]]
- [[create changes and use cases]]
- [[view system functionality and change requests]]

# periodic notes


## daily
For context here are some [[thoughts on daily tasks]].
You can [[Create a daily note]] with a template that contains:
- [[log daily habbits in daily note|daily habits tracking]].
- [[view all files created on the day of the daily note|a dynamic list of all files created on that day]]
- a linked [[daily journal]] note.
	- you can also use the [[quick capture to daily journal|quick capture to daily journal macro]]

You can [[navigate from daily note to next and prev days|navigate to the previous and next days]] and also [[navigate to weekly note from daily note|to the weekly note]] for that day.

## weekly
You can [[create a weekly note]] with a template that contains:
- [[view main tasks for each day of the week|a view of the main tasks for each day in the week]]

You can [[navigate from weekly to prev and next week]] as well as to [[navigate to days in the week from weekly note|each day within the week, with one day overlap]]

also we can use a hard coded macro to programmatically [[create weekly tasks|create any set list of tasks for the current week]] 

## monthly
You can [[create a monthly note]] with a template.
The template contains a [[monthly progress report area for all active projects]]

## quarterly
[[create a quarterly note]]

## yearly
You can [[create a yearly note]] with a template

# Projects
You can [[create a project]] and then [[view all tasks for a project|view all tasks for that project]] as well as [[view all tasks for all projects]].

## Tasks
For context here are some [[thoughts obsidian and google cal|thoughts on obsidian and google calendar]].

### project tasks
We can [[create project task|create ungraded project tasks]] (or [[create graded project task|graded tasks]]) for any project by simply [[select a project|selecting a project]] and entering task information. note if the current file is in a project directory, that [[show project of current file first when selecting a project|file's project will be shown first when selecting a project]].
This will automatically [[create calendar event for project task|create a calendar event for the task]].
This can also be triggered manually to [[create event for current file|create an event for any current file]].
These events all contain a link in the description which when visited with a browser will open the page in obsidian and also allows us to use a macro to [[open all notes linked in current gcal events]]. 

> [!info]+ Non-Project Tasks
> The majority of the tasks I do are part of the: 
> ### [[periodic non-project task system]]


# calendar
First let the user [[authenticate with google calendar]] 
Any [[project file events placed in work calendar]] or otherwise in the primary calendar.
Any time that we try to create an event on the work calendar [[let user choose to cache work calendar id]].


# note taking
You can quick [[capture a concept into a note]] or
quick [[capture a source into a note]]

the [[source note status determines note link colour]] and so does
[[concept note status determines note link colour]]


# recipes
You can [[create a recipe]] which will create a file with a template in the recipe folder.

# other

## embedding
I've added some aliases to style the presentation of embeds
| alias     | function                                                    |
| --------- | ----------------------------------------------------------- |
| LARGE     | increase font size to 1.5em                                 |
| no-header | remove first header in embed (for when you embed a heading) |

















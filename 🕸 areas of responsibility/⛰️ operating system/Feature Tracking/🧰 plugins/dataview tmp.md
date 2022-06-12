




filter task by heading:
```js
tsk.header.subpath === 'header'
```

# new features upgrading from 0.4.22 to 0.5.33
- queries now look over all sub tasks?
- multiline tasks????
- navigate to task in task view on click

## dataview js 
- native task grouping
- file.tasks now contains all subtasks aswell
	- filter them by `file.tasks.where(task => !task.parent)`
- dv.tasklist now properly nests and de duplicates tasks
- for grouping already grouped data, use data.groupIn

---
tv: 1.0.0
created: 2022-04-02
change-status: ⚫
tags:
  - crm/🌱
---

# value proposal
upload all system functionality to a repository

# impacted use cases
- none

# relevant plugins
- none

# TODOs
- [x] make all paths relative
- [x] Create repo
- [x] gitignore all files except
	- [x] plugins
	- [x] system config
		- [x] templates
		- [x] scripts
	- [x] css
	- [x] hotkeys
	- [x] other settings
	- [x] [[✔ projects task dashboard]]
	- [x] my change management system
	- [x] the entire wiki
	- [x] all people
- [x] ignore
	- [x] secret keys
	- [x] cached files

# notes
you cant gitignore keep any folders that have no files
but there is a convention to upload a .gitkeep file to keep the dir


---
ok so we can use submodules
i need a plugin to test this

files to keep:
- community-plugins
- within each plugin
	- any other files
files to ignore
- within plugin
	- main.js
	- styles.css

submodules wont work because plugins arent repositories

im loking at some way to trigger a fetch for plugins
hoping that it wont overwrite the files aready in the plugin folder

dont know how to do that yet

one issue is script and template paths, i need to
- [x] convert all paths to app relative ones


----
things i want to share
- plugins
- [x] system config
- [x] folder structure
- [x] wiki, minus gitignore is done
- area: operating system

things i want to keep separate
- [x] all other resources
- all other areas
- projects and archives



---
i cant really imagine what this system would look like once it has been deployed

so i would do some work on my personal computer,
- wiki
- templates
push the changes to github, they would be auto pulled
and i would see them reflected in my work laptop
and vice versa

----
final attempt
im going to use the [[sync options#third option]] to sync files
so first i want to create a repo to back up only functionality

- [x] set up features git exclude (ignore)
- [x] set up [[bare repo]] on B drive
- [x] set up git sync obsidian plugin to backup to B drive [[bare repo]]
- [x] set up repo for features
- [x] push features to feature repo

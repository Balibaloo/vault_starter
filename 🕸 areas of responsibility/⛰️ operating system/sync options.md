


# options for sync
- github
	+ pros
		+ free
		+ works on work laptop
	+ cons
		- sync conflicts
		- public
- google drive
	- pros
		- free
	- cons
		- doesent work on work
		- sync conflicts
- obsidian sync
	- pros
		- maybe works well
		- probably works on works laptop
	- cons
		- expensive

## file history
one of the issues with file history is that it uses the absolute path of your vault to keep track of the changes
so if you rename a parent folder or move it, ALL OF YOUR FILE HISTORY IS GONE. G O N E

This means that you cant rely on it at all.
which defeats the purpose of using simple tools so i think im just going to have to go with creating a repo.

Il probably host the repo on my own machine.

# third option
ok we can use git and set up two repos for one directory
[stack overflow post](https://stackoverflow.com/questions/436125/two-git-repositories-in-one-directory)

that way we can have a public repo that contains all of my setup and maybe some extra documentation and welcome material
and a private repo that i can host myself that will contain all of my personal files

then i can use scripts to auto push changes

# my choice
[[upload all system functionality to a repository]]
- use the [[#third option]]

create a second repo to store everything else

create a script that will automatically sync the repo on an interval

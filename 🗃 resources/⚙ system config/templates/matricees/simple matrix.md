<%*
	let link = tp.file.selection();
	let match = link.match(/.*(\d+)[xX](\d+)\s*(\w)?.*/m);

	if (match){
		let rows = +match[1];
		let cols = +match[2];
		let fill = match[3];
		
		tR += tp.user.matrix(rows, cols, fill);
	} else {
		tR += "Error: format is: (num_rows)[xX](num_cols)\s*(fill_character)";
	}
	%>

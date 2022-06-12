<%*
	let link = tp.file.selection();
	let match = link.match(/.*(\d+)[xX](\d+).*/m);

	if (match){
		let rows = +match[1];
		let cols = +match[2];
		
		tR += tp.user.lower_matrix(rows, cols);
	} else {
		tR += "Error: format is: (num_rows)[xX](num_cols)";
	}
	%>

<%*
	let link = tp.file.selection();
	let match = link.match(/.*(\d+)[xX](\d+).*/m);

	if (match){
		let rows = +match[1];
		let cols = +match[2];

		tR += tp.user.matrix(rows, cols) + "\n";
		tR += tp.user.matrix(rows, 1, "x") + "\n";
		tR += "=\n";
		tR += tp.user.matrix(rows, 1) + "\n";		
	} else {
		tR += "Error: format is: (num_rows)[xX](num_cols)";
	}
%>

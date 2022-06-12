<%*
	let link = tp.file.selection();
	let match = link.match(/.*(\d+)[xX](\d+).*/m);

	if (match){
		let rows = +match[1];
		let cols = +match[2];
		
		tR += "#### $A\\vec{x} = \\vec{b}$\n";
		tR += "$$\n";
		tR += tp.user.matrix(rows, cols) + "\n";
		tR += tp.user.matrix(rows, 1, "x") + "\n";
		tR += "=\n";
		tR += tp.user.matrix(rows, 1) + "\n";
		tR += "$$\n";
		
		tR += "#### $A = LU$\n"
		tR += "$$\n";
		tR += tp.user.matrix(rows, cols) + "\n";
		tR += "=\n";
		tR += tp.user.lower_matrix(rows, cols) + "\n";
		tR += tp.user.upper_matrix(rows, cols) + "\n";
		tR += "$$\n";
		
		tR += "$$\n";
		tR += "L =\n";
		tR += tp.user.lower_matrix(rows, cols) + "\n";
		tR += ",U =\n"
		tR += tp.user.upper_matrix(rows, cols) + "\n";
		tR += "$$\n";
		
		tR += "#### $L\\vec{z} = \\vec{b}$\n";
		tR += "$$\n";
		tR += tp.user.lower_matrix(rows, cols) + "\n";
		tR += tp.user.matrix(rows, 1, "z") + "\n";
		tR += "=\n";
		tR += tp.user.matrix(rows, 1) + "\n";
		tR += "$$\n";
		
		
		tR += "#### $U\\vec{x}=\\vec{z}$\n";
		tR += "$$\n";
		tR += tp.user.upper_matrix(rows, cols) + "\n";
		tR += tp.user.matrix(rows, 1, "x") + "\n";
		tR += "=\n";
		tR += tp.user.matrix(rows, 1, "z") + "\n";
		tR += "$$\n";
		
		tR += "$$\n";
		tR += "x =\n";
		tR += tp.user.matrix(rows, 1, "x") + "\n";
		tR += "$$\n";
	} else {
		tR += "Error: format is: (num_rows)[xX](num_cols)";
	}
	%>

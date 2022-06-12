let x = function(height=0, width=0) {
	let tR = "";
	try {
		if (height != 0 && width != 0){
			tR += "\\begin{pmatrix}\n";
	
			for (let i=0; i<height; i++){
				for (let j=0; j<width; j++){
					if (j < i){
						tR += "0";
					} else {
						tR += "u_{" + (i+1) + "" + (j+1) + "}";
					}
					tR += (j != width-1 ? " & " : " ");
				}
				tR += "\\\\\n"
				}
					tR += "\\end{pmatrix}"
				} else {
					tR += "error";
				}
	} catch (err){
		tR += err;
	}

	return tR;
}

module.exports = x; 
let x = function(height=0, width=0, fill="") {
	let tR = "";
	try {
		if (height != 0 && width != 0){
			tR += "\\begin{pmatrix}\n";

			let counter = 0;

			for (let i=0; i<height; i++){
				for (let j=0; j<width; j++){
					if (fill == ""){
						tR += counter++
					} else {
						if (height == 1){
							tR += fill + "_{" + (j+1) + "}";

						} else if (width == 1){
							tR += fill + "_{" + (i+1) + "}";

						} else {
							tR += fill + "_{" + (i+1) + "" + (j+1) + "}";
						}
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
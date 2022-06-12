<%*
const link = tp.file.selection(); // user selects a link or an embed

let matches = link.match(/\[\[(.*)\]\]/gm);

if (matches) {
	tR += matches
	.map(val => val.replace(/[\!\[\]]/g,''))
	.map(val => `
\`\`\`ad-note
title: ${val}
![[${val}]]
\`\`\`
`).join("\n")
} else {
	tR += link
}
%>
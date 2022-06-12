module.exports = (tp) => {
  return console.log(tp);
  const doc = this.app.workspace.activeLeaf.view.sourceMode.cmEditor.doc
  const cursorPos = doc.getCursor()
  const lineText = doc.getLine(cursorPos.line).trim()
  const regex = /^(?<pre>[-+*\d\.\s]*\[[x|\s]*\]\s*)(?<text>.*)$/i
  const match = regex.exec(lineText)
  if (match) {
      const ch = match.groups.pre.length
      doc.setCursor(cursorPos.line, ch)
  }
}
function saveAliexpressShoppingsHistory() {
  const shoppingAli = 'COMPRAS ALI'
  const aliHistory = 'HISTORICO COMPRAS ALI'
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
  const abaShoppingAli = sheet.getSheetByName(shoppingAli)
  const abaHistoricoComprasAli = sheet.getSheetByName(aliHistory)
  let shoppingAliRows = abaShoppingAli.getDataRange().getValues()
  let historyRows = abaHistoricoComprasAli.getDataRange().getValues()

  shoppingAliRows.shift()
  historyRows.shift()

  const historyCodes = historyRows.map(row => row[0])
  const shoppingAliCodes = shoppingAliRows.map(row => row[0])
  const newRowsCodes = shoppingAliCodes.filter(code => !historyCodes.includes(code));
  const newRows = shoppingAliRows.filter(row => newRowsCodes.includes(row[0]))

  newRows.every(row => abaHistoricoComprasAli.appendRow(row))
}

function generateHex() {
  return new Date().getTime().toString(16).toUpperCase()
}

function generateTimestampCode(sheet, event) {
  const currentRow = event.range.getRow()
  const codeColumnNumber = 1
  const codeColumn = sheet.getRange(currentRow, codeColumnNumber)

  if(codeColumn.getValue() !== '') return
  if(event.range.getColumn() !== codeColumnNumber) codeColumn.setValue(generateHex())
}

function onEdit(e) {
  if(e === undefined) return

  const shoppingAli = 'COMPRAS ALI'
  const currentSheet = e.source.getActiveSheet()

  switch(currentSheet.getName()) {
    case shoppingAli:
      generateTimestampCode(currentSheet, e)
    default: return
  }
}

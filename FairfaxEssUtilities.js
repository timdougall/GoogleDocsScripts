/* 
 * The Fairfax Employee Self Service system exports duplicate data
 * for all staff. This is because it captures every position change
 * and salary update as a new row. This *hacky* script takes the
 * export, removes duplicates and sanitises some of the fields.
 */
function sanitiseEssExport() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Sheet that the export is saved to
  var sheet = spreadsheet.getSheetByName('StaffExport-20160212');

  // Sheet that the sanitised information will be saved to
  var date = new Date();
  var datestring = date.getFullYear() + (date.getMonth() +1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1) + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
  var newSheet = spreadsheet.insertSheet('Staff-' + datestring);
  
  var range = sheet.getRange("A:T");
  var values = range.getValues();
  var newValues = [];
  newValues.push(values[0]);

  // Loop through rows and compare current row with previous row
  for (row = 1, rows = values.length; row < rows; row++) {

    var value = values[row][0];
    
    if (value != '') {
      if ((row + 1) <= rows) {
        var lastValue = values[row - 1][0];
        
        if (value != lastValue) {
          var salary = values[row][15] + values[row + 1][15];
          newValues.push(values[row]);
        }
      }
    }
  }

  // Save sanitised data to a new sheet
  var newRange = newSheet.getRange(1, 1, newValues.length, newValues[0].length);
  newRange.setValues(newValues);
}

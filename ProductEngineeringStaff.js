function removeRedundantRows() {

  var date = new Date();
  var datestring = date.getFullYear() + (date.getMonth() +1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1) + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('StaffExport-20160212');
  var newSheet = spreadsheet.insertSheet('Staff-' + datestring);
  var range = sheet.getRange("A:T");
  var values = range.getValues();
  var newValues = [];
  newValues.push(values[0]);
 
  for (row = 1, rows = values.length; row < rows; row++) {

    var value = values[row][0];
    
    if (value != '') {
      //Logger.log(value);
      
      if ((row + 1) <= rows) {
        var lastValue = values[row + -1][0];
        var nextValue = values[row + 1][0];
        
        if (value != lastValue) {
          var salary = values[row][15] + values[row + 1][15];
          var salary = values[row][15] + values[row + 1][15];
          newValues.push(values[row]);
        }
        
        /*if (value == nextValue) {
          values[row + 1][values[row + 1].length -1] = 'duplicate';
          if (value != lastValue) {
            var salary = values[row][15] + values[row + 1][15];
            values[row][values[row].length -2] = salary; 
          }
        }*/
      }
    }
  }

  var newRange = newSheet.getRange(1, 1, newValues.length, newValues[0].length);
  newRange.setValues(newValues);
}

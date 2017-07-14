# node-ss2json
Convert Google Spreadsheet contents to JSON.

## install
```
% npm install ss2json
```

## help
```
% ss2json --help

  Usage: ss2json [options]


  Options:

    -j, --json [JSON_FILE_PATH]  JSON path for Google's authentication
    -i, --id [SHEET_NAME]        Google Spreadsheet ID
    -n, --name [SHEET_NAME]      Sheet name in Google Spreadsheet
    -h, --help                   output usage information
```

## Sample to use
```javascript
ss2json = require('ss2json')

ss2json.convert({
  jsonPath: 'JSON path for Google\'s authentication',
  spreadsheetId: 'Google Spreadsheet ID',
  sheetName: 'Sheet name in Google Spreadsheet'
}).then((data) => {
  console.log(data)
}).catch((err) => {
  console.error(err)
})
```

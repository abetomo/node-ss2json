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

	--help, -h
		Displays help information about this script
		'ss2json -h' or 'ss2json --help'

	--json, -j
		JSON path for Google's authentication
		--json=JSON_FILE_PATH or -j JSON_FILE_PATH

	--id, -i
		Google Spreadsheet ID
		--id=SPREADSHEET_ID or -i SPREADSHEET_ID

	--name, -n
		Sheet name in Google Spreadsheet
		--name=SHEET_NAME or -n SHEET_NAME
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

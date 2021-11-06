# node-ss2json

[![npm version](https://badge.fury.io/js/ss2json.svg)](https://badge.fury.io/js/ss2json)
![Test](https://github.com/abetomo/node-ss2json/workflows/Test/badge.svg)

Convert Google Spreadsheet contents to JSON.
Also update Google spreadsheet from JSON data.

## install
```
% npm install ss2json
```

## help
```
% ss2json --help
Usage: ss2json [options] [command]

Options:
  -V, --version     output the version number
  -h, --help        output usage information

Commands:
  get [options]
  update [options]
```

### get
```
% ss2json get --help
Usage: get [options]

Options:
  -a, --auth [AUTH_JSON_FILE_PATH]  JSON path for Google's authentication
  -i, --id [SPREADSHEET_ID]         Google Spreadsheet ID
  -n, --name [SHEET_NAME]           Sheet name in Google Spreadsheet
  -h, --help
```

### update
```
% ss2json update --help
Usage: ss2json update [options]

Options:
  -a, --auth [AUTH_JSON_FILE_PATH]  JSON path for Google's authentication
  -i, --id [SPREADSHEET_ID]         Google Spreadsheet ID
  -n, --name [SHEET_NAME]           Sheet name in Google Spreadsheet
  -d, --data [DATA_JSON_FILE_PATH]  JSON file path for update data
  --autoAddSheet                    Add when there was no sheet.
  -h, --help                        output usage information
```

## Command example

Get the data from the spreadsheet and write it to `data.json`.

```
% ss2json get \
    -a AUTH_JSON_FILE_PATH \
    -i SPREADSHEET_ID \
    -n SHEET_NAME > ./data.json
```

You can also edit `data.json` to update the spreadsheet.

```
% ss2json update \
    -a AUTH_JSON_FILE_PATH \
    -i SPREADSHEET_ID \
    -n SHEET_NAME \
    -d ./data.json
```

## Usage example of Node.js API
### get
```javascript
const ss2json = new (require('ss2json'))()

ss2json.convert({
  authJsonPath: 'JSON path for Google\'s authentication',
  spreadsheetId: 'Google Spreadsheet ID',
  sheetName: 'Sheet name in Google Spreadsheet'
}).then((data) => {
  console.log(data)
}).catch((err) => {
  console.error(err)
})
```

### update
```javascript
const ss2json = new (require('ss2json'))()

ss2json.update({
  authJsonPath: 'JSON path for Google\'s authentication',
  spreadsheetId: 'Google Spreadsheet ID',
  sheetName: 'Sheet name in Google Spreadsheet',
  values: [
    // 'Update data'
    {  key1: 'value1', key2: 'value2' },
    {  key1: 'value3', key2: 'value4' },
    ...
  ],
  autoAdd: true // If true, the sheet will be added automatically if it doesn't exist.
}).then((result) => {
  console.log(result)
})
```

## `AUTH_JSON_FILE_PATH` / `authJsonPath`

Use GCP service account credentials. You first need to create a service account, download its json key.

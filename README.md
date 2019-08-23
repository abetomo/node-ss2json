# node-ss2json

[![npm version](https://badge.fury.io/js/ss2json.svg)](https://badge.fury.io/js/ss2json)
[![Build Status](https://travis-ci.org/abetomo/node-ss2json.svg?branch=master)](https://travis-ci.org/abetomo/node-ss2json)

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
Usage: update [options]

Options:
  -a, --auth [AUTH_JSON_FILE_PATH]  JSON path for Google's authentication
  -i, --id [SPREADSHEET_ID]         Google Spreadsheet ID
  -n, --name [SHEET_NAME]           Sheet name in Google Spreadsheet
  -d, --data [DATA_JSON_FILE_PATH]  JSON file path for update data
  -h, --help
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
  ]
}).then((result) => {
  console.log(result)
})
```

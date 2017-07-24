# node-ss2json

[![Build Status](https://travis-ci.org/abetomo/node-ss2json.svg?branch=master)](https://travis-ci.org/abetomo/node-ss2json)
[![Build status](https://ci.appveyor.com/api/projects/status/ss6t664ub3v6lfds/branch/master?svg=true)](https://ci.appveyor.com/project/abetomo/node-ss2json/branch/master)

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

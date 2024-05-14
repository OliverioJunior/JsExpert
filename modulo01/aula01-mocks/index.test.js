const File = require("./src/file");
const { error } = require("./src/constants");
const assert = require("assert");
;(async ()=>{
    {
       const filePath = "./mock/emptyFile-invalid.csv" 
       const expected = new Error(error.FILE_LENGHT_ERROR_MESSAGE);
       const result = File.csvToJSON((filePath));
       await assert.rejects(result, expected);
    }
    {
       const filePath = "./mock/invalid-header.csv" 
       const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
       const result = File.csvToJSON((filePath));
       await assert.rejects(result, expected);
    }
    {
       const filePath = "./mock/fiveitems-invalid.csv" 
       const expected = new Error(error.FILE_LENGHT_ERROR_MESSAGE);
       const result = File.csvToJSON((filePath));
       await assert.rejects(result, expected);
    }
    {
       const filePath = "./mock/treeItems-valid.csv" 
       const expected = [ {
        "id": 1,
        "name": "Alice Johnson",
        "profession": "Software Engineer",
        "age": 28
      },
      {
        "id": 2,
        "name": "Bob Smith",
        "profession": "Graphic Designer",
        "age": 34
      }]
       const result = await File.csvToJSON((filePath));
       assert.deepEqual(result, expected);
    }
})()
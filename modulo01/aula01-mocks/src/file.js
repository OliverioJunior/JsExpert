const { readFile } = require("fs/promises")
const { error } = require("./constants")
const DEFAULT_OPTIONS = {
   max_lines: 3,
   fields: ["id","name", "profession", "age"]   
}
class File {
   static async csvToJSON(filePath){
      const content = await readFile(filePath, "utf-8")
      const validation = this.isValid(content)
      if(!validation.valid) throw new Error(validation.error)
      const result = this.parseCSVToJson(content)
      return result
   }

   static isValid(csvString, options = DEFAULT_OPTIONS){
      
     const [ header, ...fileWithOutHeader ] = csvString.split(/\r?\n/)
     const isHeaderValid = header === options.fields.join(',')
     if(!isHeaderValid){
      return {
         error: error.FILE_FIELDS_ERROR_MESSAGE,
         valid: false
      }
     }
     if(!fileWithOutHeader.length || fileWithOutHeader.length > options.max_lines) {
      return {
         error: error.FILE_LENGHT_ERROR_MESSAGE,
         valid: false
      }
     }
     return { valid: true }
   
   }
   static parseCSVToJson(csvString){
      const lines = csvString.split(/\r?\n/)
      const firstLine = lines.shift()
      const header = firstLine.split(',')
      const users = lines.map(line => {
         const columns = line.split(',')
         let user = {}
         for(const index in columns){
            user[header[index]] = columns[index].trim()
         }
         return user
      })
      return users
   }  
}

module.exports = File
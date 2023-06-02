const formidable = require('formidable');
const fs = require('fs');
const { join } = require('path');



const newPath = join(__dirname,'../../','uploads') ;
// console.log('newPath :>> ', newPath);
const uploadFile = (req, res) => {
  
  const form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    console.log('{err, fields, files} :>> ', {err, fields, files});
    const oldPath = files.file.filepath;
    fs.rename(oldPath, join(newPath, files.file.originalFilename) , function (err) {
      if (err) throw err;
      res.send('File uploaded and moved!');
    });
  });
};

module.exports = { uploadFile };
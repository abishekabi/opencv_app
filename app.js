const express = require('express')
const twig = require("twig")

var multer  =   require('multer');

var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });

var upload = multer({ storage : storage}).single('uploadImage')
const app = express()
const port = 3000

app.set('view engine', 'twig')

app.get('/', function(req, res){
    res.render('index.twig')
})


// app.get('/uploadImage', function(req, res){
//     console.log("Uploading Image");


// })
app.post('/uploadImage',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});


app.listen(port, () => console.log(`App listening on port ${port}!`))
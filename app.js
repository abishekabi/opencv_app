const express = require('express')
const twig = require("twig")

var multer  =   require('multer');

function a(){
  console.log("Aaaaaaaa");
}
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

const cv = require('opencv4nodejs');

function opencv_conversion(req, res){
  const fileName = res.file.filename
  // 
  const originalImage = cv.imread(fileName);
  const grayImage = originalImage.bgrToGray();

  // save image
  cv.imwrite(res.file.path + "_greyscale", grayImage);
  
  // send file to browser

  // var readStream = fileSystem.createReadStream(res.file.path + "_greyscale");
  // // We replaced all the event handlers with a simple call to readStream.pipe()
  // readStream.pipe(response);
  res.render('image_out.twig', { 
    converted_img: fs.readFileSync(res.file.path + "_greyscale")}
     )

  // cv.imshow('Grey Image', grayImage);
  // cv.imshow('Original Image', originalImage);

}

app.post('/uploadImage',function(req,res){
  upload(req,res,function(err) {
      if(err) {
          return res.end("Error uploading file.");
      }
     //opencv_conversion      
      opencv_conversion(req, res);
      //res.end("File is uploaded");
  });
});



app.listen(port, () => console.log(`App listening on port ${port}!`))
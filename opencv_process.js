const cv = require('opencv4nodejs');
const originalImage = cv.imread('C:/Users/N/Desktop/Test.jpg');
const grayImage = originalImage.bgrToGray();

cv.imshow('Grey Image', grayImage);
cv.imshow('Original Image', originalImage);
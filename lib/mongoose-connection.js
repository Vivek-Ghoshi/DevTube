const mongoose = require('mongoose');
const ImageKit = require('imagekit');
const multer = require('multer');
const axios = require('axios');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
require('dotenv').config();

const db_URI = process.env.CONNECTION;

mongoose.connect(db_URI,{
    useFindAndModify:false,
    useCreateIndex:true
})
.then(function(){
    console.log('connected to mongoose')
})
.catch(function(error){
         console.log(error.message)
});

const db  = mongoose.connection;

const imageKit = new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

const videoUploadCloudinary = cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary:videoUploadCloudinary,
    params:{
        folder: "DevStream-Videos",
        resource_type: "video",
        allowed_formats: ['mp4','mov','avi']
    },
})

const upload = multer({storage:storage});




module.exports = {db , upload, videoUploadCloudinary, imageKit};
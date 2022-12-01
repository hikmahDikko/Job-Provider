const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const multer = require("multer");

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_USER_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const multerStorage = multer.diskStorage({});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  }
};

const uploadImage = multer({
    storage : multerStorage,
    fileFilter : multerFilter
});

exports.uploadProfileImage = uploadImage.single("profileImage");

exports.resizeImage = async (req, res, next) => {
    if (req.file) {
        let profileImage;

        const user = await User.findById(req.params.id);

        if (!user) {
          return res.status(400).json({
            status: "fail",
            message: `There is no user with the ID ${req.params.id}`,
          });
        }
    
        const result = await cloudinary.uploader.upload(req.file.path, {
                public_id : `${user._id}_profileImage`,
                width : 2000,
                height : 1500
            }).catch((err) => console.log(err)); 

  
        profileImage = result.url;
        req.body.profileImage = profileImage;
      }
  
    next();
  };

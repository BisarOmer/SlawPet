module.exports = function (app) {

  const AccountController = require("./Controller/AccountController");
  const AdoptionController = require("./Controller/AdoptionController");
  const OrgController = require("./Controller/OrgController");
  const CommentController = require("./Controller/CommmetnController");
  const authToken = require("./Config/AuthToken");


  // define multer storage configuration  
  const multer = require('multer');
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './images');
    },
    filename: function (req, file, callback) {
      const ext = file.originalname.split('.')[1];
      const name=file.fieldname + '-' + Date.now() + "." + ext
      req.photo=name
      callback(null, name);
    }
  });
  const upload = multer({ 
    storage: storage ,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });


  //Account
  app.post("/register", AccountController.create)
  app.post("/signin", AccountController.signin)
  app.get("/me", authToken.authToken, AccountController.me)
  app.get("/me/org", authToken.authToken,AccountController.meOrg)
  app.put("/update", authToken.authToken, AccountController.update)
  app.put("/updatepassword",authToken.authToken,AccountController.updatepassword)
  app.put("/updateAddress",authToken.authToken,AccountController.updateaddress)

  //retrive rouutes
  app.get("/organization", AccountController.getAllOrg)
  app.get("/organization/:id", AccountController.findByid)
  app.get("/organization/searchName/:name", AccountController.findByName)

  //route for uploading photo
  app.post('/upload/Profile', authToken.authToken, upload.single('photo'), AccountController.upload);
  app.post('/upload/Certification', authToken.authToken, upload.single('photo'), AccountController.upload);
  app.post('/upload/Donate', authToken.authToken, upload.single('photo'), AccountController.upload);
  app.post('/upload/AdoptionImage', authToken.authToken, upload.single('photo'), AccountController.upload);

  //organization
  app.get("/organization/about/:id", OrgController.about);
  app.get("/organization/donate/:id", OrgController.donate);

  //Adobtion
  app.post("/adoption", authToken.authToken, AdoptionController.create)
  app.get("/myAdoptions",authToken.authToken,AdoptionController.myAdoptions)
  app.post("/myAdoptions/Adoption_id",authToken.authToken, AdoptionController.myAdoptionsByID)

  app.get("/adoption", AdoptionController.allAdobtion)
  app.get("/adoption/bycity/:city", AdoptionController.adobtoinBycity)
  app.get("/adoption/bypet/:pet", AdoptionController.adobtoinBypet)
  app.get("/adoption/byPetandCity/:city-:pet", AdoptionController.adobtoinBypetandCity)
  app.get("/adoption/byorg/:org_id", AdoptionController.adobtoinByorg)
  app.get("/adoption/byid/:id", AdoptionController.adobtionByid)

  app.post("/count", AdoptionController.count)
  app.post("/countAdopted", AdoptionController.countAdopted)


  
  //ask
  app.post("/ask",authToken.authToken,AdoptionController.ask)
  app.post("/organization/adobted",authToken.authToken,OrgController.adopted)
  app.post("/organization/viewAsk",authToken.authToken,OrgController.viewAsk)
  app.post("/give",authToken.authToken,OrgController.give)
  app.post("/cancel",authToken.authToken,OrgController.cancel)

  //delete adoption
  app.delete("/adoption/delete",authToken.authToken,AdoptionController.deleteAdoption)

  //comment
  app.post("/comment",authToken.authToken, CommentController.postComment);
  app.get("/comment/:adoption_id", CommentController.getCommentByAdoption);
  app.delete("/comment/",authToken.authToken, CommentController.deleteComment);

};
const express = require("express");
const routes = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Business = require("./models/Business");
const Evaluation = require("./models/Evaluation");
const Category = require("./models/Category");

const UserController = require("./controllers/UserController");
const BusinessController = require("./controllers/BusinessController");
const EvaluationController = require("./controllers/EvaluationController");
const SessionController = require("./controllers/SessionController");
const CategoryController = require("./controllers/CategoryController");

const authenticationMiddleware = require("./middlewares/authentication");
const authorizationMiddleware = require("./middlewares/authorization");
routes.put("/evaluation/:id", EvaluationController.update);
routes.post("/evaluation", EvaluationController.store);
routes.post("/users", UserController.store);
routes.get("/category", CategoryController.list);
routes.get("/category/:_id", CategoryController.index);
routes.get("/evaluation/:_id", EvaluationController.index);
routes.post("/session", SessionController.store);
routes.get("/business", BusinessController.list)
routes.get("/evaluation", EvaluationController.list);
routes.get("/business/:_id", BusinessController.index);
routes.get("/business/evaluation/:_id", BusinessController.indexEvaluation);

routes.use(authenticationMiddleware);

routes.delete("/business/:id", authorizationMiddleware, BusinessController.destroy);
routes.put("/business/:id", authorizationMiddleware, BusinessController.update);

const DIR = './src/uploads';

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, DIR);
   },
   filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuidv4() + '-' + fileName)
   }
});

const upload = multer({
   storage: storage,
   fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/svg" || file.mimetype == "image/jpeg") {
         cb(null, true);
      } else {
         cb(null, false);
         return cb(new Error('Only .png, .svg and .jpeg format allowed!'));
      }
   }
});
routes.post("/category", CategoryController.store);
/*

routes.post('/business', upload.single('profileImg'), async (req, res, next) => {
   const business = await Business.create(req.body);
   await Category.updateOne({ _id: business.category }, { $push: { business: category._id } });
   const evaluation = await Evaluation.update(
      { _id: req.body.evaluation },
      { $push: { businesses: business._id } }
   );

   // console.log(evaluation);
   // console.log(category;
   return res.json(business);
}
)*/
routes.post("/business", authorizationMiddleware, BusinessController.store);
routes.delete("/category:id", authorizationMiddleware, CategoryController.destroy);

routes.delete("/users/:id", UserController.destroy);
routes.put("/users/:id", UserController.update);
routes.get("/users", UserController.list);

routes.delete("/evaluation/:id", EvaluationController.destroy);


module.exports = routes;
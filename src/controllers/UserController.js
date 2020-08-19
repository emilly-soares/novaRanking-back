User = require("../models/User");
module.exports = {

   async store(req, res) {
      if (await User.findOne({ email: req.body.email })) {
         return res.status(400).json({ error: "User already exists" });
      }
      const user = await User.create(req.body);
      return res.json(user);
   },

   async list(req, res) {
      const users = await User.find({}).populate("evaluation");
      return res.json(users);
   },

   async index(req, res) {
      const user = await User.findOne({ email: req.params.email });
      if (!user) {
         return res.status(400).json({ error: "User not found" });
      }
      return res.json(user);
   },

   async update(req, res) {
      const user = await User.findByEmailAndUpdate(req.params.email, req.body, { new: true });
      return res.json(user);
   },

   async destroy(req, res) {
      await User.deleteOne({ _id: req.params.id });
      return res.json({ message: "Deleted User" });
   }

};
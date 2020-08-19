const Evaluation = require("../models/Evaluation");
const Business = require("../models/Business")
const User = require("../models/User");

module.exports = {

   async store(req, res) {
      const evaluation = await Evaluation.create(req.body);
      await User.updateOne({ _id: evaluation.user }, { $push: { evaluation: evaluation._id } });
      await Business.updateOne({ _id: evaluation.business }, { $push: { evaluation: evaluation._id } });
      return res.json(evaluation);
   },

   async index(req, res) {
      const evaluation = await Evaluation.find({ _id: req.params });

      return res.json(evaluation);
   },

   async list(req, res) {
      const evaluation = await Evaluation.find().populate("user").populate("business");

      return res.json(evaluation);
   },

   async destroy(req, res) {
      await Evaluation.deleteOne({ _id: req.params.id });
      return res.json({ message: "Deleted Evaluation" });
   },
   async update(req, res) {
      const evaluation = await Evaluation.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(evaluation);
   },

}
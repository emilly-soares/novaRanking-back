const Business = require("../models/Business");
const Category = require("../models/Category");

module.exports = {
   async store(req, res) {
      if (await Business.findOne({ name: req.body.name })) {
         return res.status(400).json({ error: "BUSINESS already exists" });
      }
      const business = await Business.create(req.body);
      const category = await Category.updateMany(
         { _id: req.body.category },
         { $push: { businesses: business._id } }
      );

      console.log(category);

      return res.json(business);
   },
   async Ranking(req, res) {
      const business = await Business.findByIdAndUpdate(req.params.id, req.body, { nota: req.body.nota });
      return res.json(business);
   },

   async index(req, res) {

      const business = await Business.find({ category: req.params }).sort({ nota: -1 });

      return res.json(business);

   },
   async indexEvaluation(req, res) {

      const business = await Business.find({ _id: req.params }).populate("category").populate("evaluation");

      return res.json(business);

   },
   async indexEvaluations(req, res) {

      const b = await Business.find({ _id: req.params }).populate("category").populate("evaluation");
      return res.json(business);

   },
   async list(req, res) {
      const business = await Business.find().populate("category");
      return res.json(business);
   },

   async destroy(req, res) {
      await Business.deleteOne({ _id: req.params.id });
      return res.json({ message: "Deleted business" });
   },

   async update(req, res) {
      const business = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(business);
   },

}
const Category = require("../models/Category");

module.exports = {
   async store(req, res) {
      if (await Category.findOne({ type: req.body.type })) {
         return res.status(400).json({ error: "CATEGORY already exists" });
      }
      const category = await Category.create(req.body);
      return res.json(category);
   },
   async index(req, res) {
      const categoryId = req.params.id;
      const category = await Category.findOne({ _id: categoryId }).populate("business");

      return res.json(category);
   },

   async list(req, res) {
      const category = await Category.find().populate("business");

      return res.json(category);
   },

   async destroy(req, res) {
      await Category.deleteOne({ _id: req.params.id });
      return res.json({ message: "Deleted Category" });
   },
   async update(req, res) {
      const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(category);
   },

}
const { Schema, model } = require("mongoose");

const CategorySchema = new Schema(

   {
      type: {
         type: String,
         required: true
      },

      profileImg: {
         type: String
      },

      business: [
         {
            type: Schema.Types.ObjectId,
            ref: "Business"
         }
      ]

   },

   {
      timestamps: true
   }
);


module.exports = model("Category", CategorySchema);
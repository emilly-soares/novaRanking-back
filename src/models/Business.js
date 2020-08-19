const { Schema, model } = require("mongoose");

const BusinessSchema = new Schema(

   {
      name: {
         type: String,
         required: true
      },

      operation: {
         type: String,
         required: true,
      },
      address: {
         type: String,
         required: true
      },

      profileImg: {
         type: String
      },

      category: {
         type: Schema.Types.ObjectId,
         ref: "Category",
         required: true
      },
      evaluation: [
         {
            type: Schema.Types.ObjectId,
            ref: "Evaluation"
         }
      ]

   },

   {
      timestamps: true
   }

);

module.exports = model("Business", BusinessSchema);

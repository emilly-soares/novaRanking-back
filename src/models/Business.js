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
      resultEvaluation: {
         type: String
      },
      category: {
         type: Schema.Types.ObjectId,
         ref: "Category",
         required: true
      },
      nota: {
         type: Number
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

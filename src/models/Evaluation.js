const { Schema, model } = require("mongoose");

const EvaluationSchema = new Schema(

   {
      attendance: {
         type: String,
         required: true
      },

      price: {
         type: String,
         required: true
      },

      organization: {
         type: String,
         required: true
      },

      place: {
         type: String,
         required: true
      },

      user: {
         type: Schema.Types.ObjectId,
         ref: "User"
      },

      business: {
         type: Schema.Types.ObjectId,
         ref: "Business"
      }

   },

   {
      timestamps: true
   }
);

module.exports = model("Evaluation", EvaluationSchema);
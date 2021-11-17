const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//1. Instrucciones: Adaptar el modelo a GEOJson
const placesSchema = new Schema({
  name: String,
    type: {
      type: String,
      required: true,
      enum: ["cofee shop", "bookstore"]
    },
    location: {
      type: {
        type: String
      },
      coordinates: [Number]
    }
  }, 
  {
      timestamps: true,

});

// placeSchema.index({ location: '2dsphere' });


module.exports = mongoose.model('Places', placesSchema);

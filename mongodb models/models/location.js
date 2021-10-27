const locationSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true,
        trim: true,
    },
    longitude: {
        type: Number,
        required: true,
        trim: true,
    },
    elevation: {
        type: Number,
        required: true,
        trim: true,
    }
  },
  {collection : 'location-list'});

  const Comment = mongoose.model("Location", locationSchema);

  module.exports = Location;
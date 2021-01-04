const mongoose = require('mongoose');
const slugify = require('slugify');
/* const User = require('../usersModel'); */

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '{name:{type:String,required:true}}'],
      unique: true,
      trim: true,
      minlength: [10, 'Tour name must be at least 10 characters'],
      maxlength: [40, 'tour name cannot be greater than 40 characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, '{duration: {type:Number,required:true}}'],
    },
    VIPTour: {
      type: Boolean,
      default: false,
    },
    maxGroupSize: {
      type: Number,
      required: [true, '{maxGroupSize: {type:Number,required: true}}'],
    },
    difficulty: {
      type: String,
      required: [true, '{difficulty: {type: String, required: true}}'],
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: 'Difficulty must be one of easy, medium, hard',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [0, 'Rating must be greater than 0'],
      max: [5, 'rating must be less than 5'],
      //setter fn to round val
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, '{price:{type:Number,required:true}}'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // validators that use the this keyword only work on document create not document update.
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below the regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, '{summary: {type: Number,required: true}}'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'imageCover:{type:String, required: true}'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    startLocation: {
      //MongoDB uses special kind of data for Geolocation data, its called GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: {
          values: ['Point'],
          message: 'Geo Type can only be a point',
        },
      },
      // logitude then latitude
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: {
            values: ['Point'],
            message: 'Geo Type can only be a point',
          },
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// Index -> we need this to do geo spacial queries on MongoDB. 2dsphere an earth-like space.
tourSchema.index({ startLocation: '2dsphere' });
// !VIRTUAL PROPERTIES
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration ? (this.duration / 7).toFixed(1) : undefined;
});

// virtual populate (parent referencing)
tourSchema.virtual('reviews', {
  ref: 'Review',
  /* name of ID field of foreign model*/
  foreignField: 'tour',
  /* name of ID field in current model*/
  localField: '_id',
});

// !MONGO MIDDLEWARE
// Document middleware runs b4 .save() & .create() !.insertMany() !findOne&Update
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
//IMPLEMENT EMBEDDING GUIDES INTO TOURS ON TOUR.CREATE() (would need to do so aswell on tour.update()). When user (that is a guide or lead guide) is updated, we would need to find each tour they are a guide of and update the values there aswell
/* tourSchema.pre('save', async function (next) {
  const guidesPromises = this.guides.map(async (id) => await User.findById(id));
  this.guides = await Promise.all(guidesPromises);

  next();
}); */

// QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
  this.find({ VIPTour: { $ne: true } });
  this.startingTime = Date.now();
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt -passwordResetExpires -passwordResetToken',
  });
  next();
});

// AGREGATION MIDDLEWARE
/* tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { VIPTour: { $ne: true } } });
  next();
}); */

// Indexes

tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });

// !Create Model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

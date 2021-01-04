const mongoose = require('mongoose');
const Tour = require('../toursModel');

// create review model
/* 
raview: String,
rating: Number,
createAt: Date (current time stamp),
ref to Tour:
ref to user:
*/
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Please provide the review text'],
      trim: true,
      minlength: [20, 'review must be at least 20 characters'],
      maxlength: [1500, 'review may not be more than 1500 characters'],
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// INDEXES, make it so one user can only create one review for EACH tour
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

/* METHODS */
// static methods are available on the model, so Review.calcAverageRatings();
reviewSchema.statics.calcAverageRatings = async function (tourId) {
  // this points to model. this = Review
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRatings: { $sum: 1 },
        averageRating: { $avg: '$rating' },
      },
    },
  ]);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRatings,
      ratingsAverage: stats[0].averageRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};
/* POST SAVE MIDDLE WARE CALLS UPPER FUNCTION */
reviewSchema.post('save', function () {
  // this points to last saved document
  // this.constructor points to Review
  this.constructor.calcAverageRatings(this.tour);
});
/* PRE FIND QUERY MIDDLEWARE */
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

// !CALC AVERAGE RATING ON REVIEW UPDATE
// Problem -> reviews are updated by findByIdAndUpdate && findByIdAndDelete. So we only have query middleware which do not give access to current document (only the query).
reviewSchema.pre(/^findOneAnd/, async function (next) {
  //this === current query. We can get around this by executing the query and that will give us the document.
  this.r = await this.findOne();
});
// WE PASS DATA FROM PRE MIDDLEWARE TO POST MIDDLEWARE BY ADDING IT TO THE THIS OBJECT.
reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRatings(this.r.tour);
});

///////
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

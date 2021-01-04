const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const emailV = require('email-validator');
/* Tokens */
const createToken = require('../../utilities/tokens/createToken');
const hashToken = require('../../utilities/tokens/hashToken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'please enter your email'],
    unique: [true, 'An account already exists with that email'],
    trim: true,
    lowercase: true,
    validate: {
      validator: emailV.validate,
      message: 'Please provide a valid email',
    },
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    default: 'user',
    enum: {
      values: ['user', 'guide', 'lead-guide', 'admin'],
      message: 'Please provide a valid role, valid roles include: user, admin',
    },
  },
  password: {
    type: String,
    required: [true, 'plese provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please provide a password'],
    validate: {
      // only works on CREATE & SAVE
      validator: function (val) {
        return this.password === val;
      },
      message: 'Passwords are not the same.',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Pre save middleware to encrypt passwords
userSchema.pre('save', async function (next) {
  // exit fn if password not modified
  if (!this.isModified('password')) return next();

  //hash password w/ cost = 12, using bcryptjs
  this.password = await bcrypt.hash(this.password, 12);

  // this is so password confirm is not kept in database.
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  // if password changed set passwordChanged to now. put a delay to avoid bugs. This will ensure token will always be created after the password was changed
  this.passwordChangedAt = Date.now() - 10000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to current query
  this.find({ active: { $ne: false } });
  next();
});
// ! METHODS
userSchema.methods.correctPassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  // if password has changed
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return changedTimestamp > JWTTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const token = createToken();
  this.passwordResetToken = hashToken(token);
  // set password reset expiration to 10m after current time.
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return token;
};

// create model
const User = mongoose.model('User', userSchema);

module.exports = User;

/* 
schema with 5 fields

name

email


photo (string)


password


paswordConfirm
*/

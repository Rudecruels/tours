const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    maxlength: [20, 'name is less than or equal 20 '],
    minlength: [3, 'name greater than or equal 3'],
  },
  email: {
    type: String,
    required: [true, 'user must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  confirmPassword : {
    type: String,
    required: true,
    //this only works for create and save
    validate: function(el){
      return el === this.password
    },
    message:"password not same"
  },
});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password,12)

  this.confirmPassword = undefined
  next()
})

const User = mongoose.model('User', userSchema);
module.exports = User;

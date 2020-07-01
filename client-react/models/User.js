const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema } = mongoose

const userSchema = Schema({
  role: {
    type: String,
    required: false
  },
  admin: {
    type: Boolean,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: false
  },
  last_name: {
    type: String,
    required: false
  },
  job_title: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  county: {
    type: String,
    required: false
  },
  district: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: false
  }
})

userSchema.statics.signUp = async function (email, password, role, admin) {
  const user = new this()
  user.email = email
  user.role = role
  user.admin = admin
  user.hashPassword(password)
  user.first_name = null
  user.last_name = null
  user.job_title = null
  user.city = null
  user.county = null
  user.district = null
  user.status = null
  await user.save()
  return user
}

userSchema.methods.hashPassword = function (plainText) {
  this.password = bcrypt.hashSync(plainText, 4)
}

userSchema.methods.sanitize = function () {
  return {
    ...this._doc,
    password: undefined
  }
}

userSchema.methods.comparePassword = function (plainText) {
  return bcrypt.compareSync(plainText, this.password)
}

// // UPDATE THIS MONDAY
// userSchema.statics.profileUpdate = async function (
//   Fname,
//   Lname,
//   job_title,
//   city,
//   county,
//   district,
//   email,
//   role,
//   admin,
//   password) {
//   const user = this()
//   user.first_name = Fname
//   user.last_name = Lname
//   user.job_title = job_title
//   user.city = city
//   user.county = county
//   user.district = district
//   user.email = email
//   user.role = role
//   user.admin = admin
//   user.password = password
//   await user.save()
//   return user
// }

const User = mongoose.model('User', userSchema)

module.exports = User

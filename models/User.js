// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ['Admin','user'], default: 'user' }
// });

// module.exports = mongoose.model('User', UserSchema);


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'customer', 'admin'], // Ensure 'admin' is included here
    default: 'user',
    required: true,
  },
  // other fields as needed
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  githubId: {
  type: String,
  unique: true,
  sparse: true,
},
  avatar: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isProfileComplete: {
  type: Boolean,
  default: false,
},
// add this field inside userSchema
totalScore: {
  type: Number,
  default: 0,
},
firstName: {
  type: String,
  default: '',
},
lastName: {
  type: String,
  default: '',
},
  unlockedTiers: {
    type: [String],
    enum: ['Easy', 'Medium', 'Hard'],
    default: ['Easy'],
  },
  solvedProblems: [{
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem',
    },
    solvedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  stats: {
    easySolved: { type: Number, default: 0 },
    mediumSolved: { type: Number, default: 0 },
    hardSolved: { type: Number, default: 0 },
    totalSubmissions: { type: Number, default: 0 },
    acceptedSubmissions: { type: Number, default: 0 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function() {
  if (!this.isModified('password') || !this.password) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(password) {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.canAccessDifficulty = function(difficulty) {
  return this.unlockedTiers.includes(difficulty);
};

module.exports = mongoose.model('User', userSchema);
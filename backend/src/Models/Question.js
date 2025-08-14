const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  isCorrect: {
    type: Boolean,
    default: false
  }
});

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  options: {
    type: [optionSchema],
    required: true,
    validate: {
      validator: function(options) {
        return options.length === 4;
      },
      message: 'Question must have exactly 4 options'
    }
  }
}, {
  timestamps: true
});

// Validate that exactly one option is correct
questionSchema.pre('save', function(next) {
  const correctCount = this.options.filter(option => option.isCorrect).length;
  if (correctCount !== 1) {
    return next(new Error('Question must have exactly one correct answer'));
  }
  next();
});

module.exports = mongoose.model('Question', questionSchema);
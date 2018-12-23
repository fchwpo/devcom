const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Profile Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: { //@fchwpo.sv
    type: String,
    required: true,
    max: 40
  },
  company: { // Company they are currently working in or they also can be student
    type: String
  },
  website: { // Company Wbesite or their own website
    type: String
  },
  location: { // Current Location of the user if they want to share
    type: String
  },
  status: { // Select dropdown with opt: Dveloper, Student, Jr. Dev, Sr. Dev and son-on
    type: String,
    required: true
  },
  skills: { // * It will be array of strings
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubUsername: { // We will integrate github repo
    type: String
  },
  experience: [{
    title: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String
    },
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date
    },
    currentlyWorking: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    }
  }],
  education: [{
    school: {
      type: String,
      required: true
    },
    degree: {
      type: String,
      required: true
    },
    fieldOfStudy: {
      type: String,
      required: true
    },
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date
    },
    currentlyStudying: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    }
  }],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
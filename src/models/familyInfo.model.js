const mongoose = require('mongoose');

const familyInfoSchema = new mongoose.Schema({
  user_email: {
    type: String,
    unique: true,
  },
  number_of_relatives: Number,
  relatives: [
    {
      relation: String,
      name: String,
      birthday: Date,
      gender: String,
    },
  ],
  number_of_childrens: Number,
  childrens: [
    {
      birthday: Date,
      gender: String,
      study_at_home: Boolean,
    },
  ],
  location: {
    municipality: String,
    department: String,
    country: String,
    postal_code: String,
  },
  sports: [String],
});

const model = mongoose.model('FamilyInfo', familyInfoSchema);

module.exports = model;

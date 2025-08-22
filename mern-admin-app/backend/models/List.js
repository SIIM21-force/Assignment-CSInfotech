const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    required: true,
  },
  items: [
    {
      firstName: String,
      phone: String,
      notes: String,
    },
  ],
});

module.exports = mongoose.model('List', ListSchema);

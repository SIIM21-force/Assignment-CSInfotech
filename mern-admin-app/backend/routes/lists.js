const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const List = require('../models/List');
const Agent = require('../models/Agent');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        const agents = await Agent.find();
        console.log('Agents:', agents);
        if (agents.length === 0) {
          return res.status(400).json({ msg: 'No agents found' });
        }

        const itemsPerAgent = Math.floor(results.length / agents.length);
        const remainingItems = results.length % agents.length;

        let currentItem = 0;
        for (let i = 0; i < agents.length; i++) {
          const agent = agents[i];
          const listItems = [];
          const itemsToAssign = itemsPerAgent + (i < remainingItems ? 1 : 0);

          for (let j = 0; j < itemsToAssign; j++) {
            listItems.push(results[currentItem]);
            currentItem++;
          }

          let list = await List.findOne({ agent: agent._id });
          if (list) {
            list.items.push(...listItems);
            await list.save();
          } else {
            list = new List({
              agent: agent._id,
              items: listItems,
            });
            await list.save();
          }
        }

        fs.unlinkSync(req.file.path);
        res.json({ msg: 'List distributed successfully' });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    });
});

router.get('/', async (req, res) => {
  try {
    const lists = await List.find().populate('agent', ['name']);
    res.json(lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

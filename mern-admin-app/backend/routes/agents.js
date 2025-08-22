const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');

router.post('/', async (req, res) => {
  const { name, email, mobileNumber, password } = req.body;

  try {
    let agent = await Agent.findOne({ email });

    if (agent) {
      return res.status(400).json({ msg: 'Agent already exists' });
    }

    agent = new Agent({
      name,
      email,
      mobileNumber,
      password,
    });

    await agent.save();

    res.json(agent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

const {Plan}  = require('../models/index');


module.exports = async (req, res) => {
    try {
      const allPlans = await Plan.findAll();
      res.status(200).json(allPlans);
    } catch (error) {
      console.error('Error fetching plans:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
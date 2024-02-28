const {Plan, Purchase} = require("../models/index");

module.exports = async (req, res) => {
    const { planId } = req.body;
    const { userId } = req.user;
  
    try {
      const plan = await Plan.findByPk(planId);
  
      if (!plan) {
        return res.status(404).json({ error: 'Plan not found' });
      }
  
      const newPurchase = await Purchase.create({
        userId: userId,
      });

      await newPurchase.setPlans([plan]);
  
      return res.status(201).json({ message: 'Purchase successful', purchase: newPurchase });
    } catch (error) {
      console.error('Error during purchase:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
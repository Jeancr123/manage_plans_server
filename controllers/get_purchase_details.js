const {User, Purchase, Plan} = require("../models/index");

module.exports = async (req, res) => {
    const { purchaseId } = req.params;
    const { userId } = req.user;
  
    try {
      const purchase = await Purchase.findOne({
        where: { id: purchaseId, userId: userId },
        include: [
          { model: User, attributes: ['email'] },
          { model: Plan, as: 'plans', attributes: ['id', 'name', 'steps'] },
        ],
      });
  
      if (!purchase) {
        return res.status(404).json({ error: 'Purchase not found for the logged-in user' });
      }
  
      return res.status(200).json({ purchasedPlan: purchase });
    } catch (error) {
      console.error('Error fetching purchased plan details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
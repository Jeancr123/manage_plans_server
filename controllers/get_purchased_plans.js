const { User, Purchase, Plan } = require("../models/index");

module.exports = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Purchase,
          as: 'purchases',
          include: [            
            {
            model: Plan,
            as: 'plans',
          },], 
        },
      ],
    });

    if (!user || !user.dataValues.purchases) {
      return res.status(404).json({ error: 'User not found or no purchases' });
    }

    const userPurchases = user.dataValues.purchases;
    const plans = userPurchases.reduce((allPlans, purchase) => {
      if (purchase.dataValues.plans) {
        allPlans.push(...purchase.dataValues.plans);
      }
      return allPlans;
    }, []);

    return res.status(200).json({ plans: plans });
  } catch (error) {
    console.error('Error fetching purchased plans details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

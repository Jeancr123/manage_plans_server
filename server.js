require('dotenv').config();
const express = require('express')
const cors = require('cors');
const authenticateUser = require('./utils/auth_check')
const getPurchase = require('./controllers/get_purchase_details')
const purchasePlan = require('./controllers/purchase_plan')
const getPlans = require('./controllers/get_plans')
const login = require('./controllers/login')
const getPurchasedPlans = require('./controllers/get_purchased_plans')
const seedAndSync = require('./controllers/seed_and_sync')


const port = process.env.PORT || 8000;

const app = express()

app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
    res.json({'message': 'OK'})
});

app.post('/seed_and_sync', seedAndSync)
app.post('/login', login)
app.get('/plans', getPlans);
app.get('/get_purchased_plans', authenticateUser, getPurchasedPlans);
app.post('/purchase', authenticateUser, purchasePlan)
app.get('/get_purchase/:purchaseId',  authenticateUser, getPurchase)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});

app.post('/healthz', (req, res) => {
    res.status(200).json({ message: 'OK' });
})
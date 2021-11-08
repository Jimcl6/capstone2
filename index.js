const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/User')
const productRoutes = require('./routes/Product')
const orderRoutes = require('./routes/Order')

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const dbName = 'capstone2'
const dbUser = 'admin';
const dbPass = 'admin';

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.3zkqs.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true

});

let db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error"));
db.once('open', () => console.log('Connected to MongoDB Atlas.'));

/* port listener */
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.listen(port, () => console.log(`Server is running at localhost ${port}`));
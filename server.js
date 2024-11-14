const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paypalRoutes = require('./routes/paypal');
const contactRoutes = require('./routes/contactRoutes');
const usersRouter = require('./routes/users');
const paymentRoutes = require('./routes/payments');

const path = require('path');
const { payments } = require('@paypal/checkout-server-sdk');
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 
app.use('/', authRoutes);
app.use('/api/users', usersRouter);
app.use('/api/products', productRoutes); 
app.use('/api/order', orderRoutes); // Order routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/paypal', paypalRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api', paymentRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const paypalRoutes = require('./routes/paypal');
//  const contactRoutes = require('./routes/contactRoutes');
// const path = require('path');
// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/', authRoutes);
// app.use('/api/products', productRoutes); 
// app.use('/api/order', orderRoutes); // Order routes
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api/paypal', paypalRoutes);
//  app.use('/api/contacts', contactRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Something went wrong!' });
// });

// const PORT = process.env.PORT || 5002;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

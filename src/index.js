const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const auth = require('./middleware/auth');

const authRoutes = require('./routes/auth/auth');
const userRoutes = require('./routes/user/user');
const todosRoutes = require('./routes/totos/todos');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/', authRoutes);
app.use('/user', auth, userRoutes);
app.use('/todo', auth, todosRoutes);

app.listen(process.env.PORT, () => {
    console.log(`App listenting on http://localhost:${process.env.PORT}`);
});

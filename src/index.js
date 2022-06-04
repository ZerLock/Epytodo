const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const auth = require('./middleware/auth');

const authRoutes = require('./routes/auth/auth');
const { userRouter, usersRouter } = require('./routes/user/user');
const todosRoutes = require('./routes/todos/todos');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use(express.json({
    verify: (req, res, buf, encoding) => {
        try {
            JSON.parse(buf);
        } catch (error) {
            res.status(400).json({ msg: 'Bad parameter' });
        }
    }
}));

app.use('/', authRoutes);
app.use('/user', auth, userRouter);
app.use('/users', auth, usersRouter);
app.use('/todos', auth, todosRoutes);

app.use("*", (req, res) => res.status(404).json({ msg: 'Not Found' }));

app.listen(process.env.PORT ?? '3000', () => {
    console.log(`App listenting on http://localhost:${process.env.PORT ?? 3000}`);
});

import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = 'mi_clave_secreta';
const users = [];

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = users.find(u => u.email === email);
    if (existingUser) return res.status(400).json({ message: 'Usuario ya registrado' });
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ name, email, password: hashedPassword });
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Usuario registrado', token });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Contraseña incorrecta' });
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login exitoso', token });
});

// Ruta temporal: ver todos los usuarios (solo para desarrollo)
app.get('/users', (req, res) => {
    res.json(users);
});

app.listen(3000, () => console.log('Servidor en puerto 3000'));

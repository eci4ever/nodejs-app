// Dependencies
import fs from "fs";
import https from "https";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "./user.js";
import { get } from "http";

const app = express();

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/lms.adteckulim.gov.my/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/lms.adteckulim.gov.my/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/lms.adteckulim.gov.my/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const __dirname = import.meta.dirname;

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke');
});

app.use(bodyParser.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// User routes
app.get('/users', async (req, res) => {
	  const users = await getAllUsers();
  res.json(users);
});

// Get user by id
app.get('/users/:id', async (req, res) => {
  const user = await getUserById(req.params.id);
  res.json(user);
});

// Create a new user
app.post('/users', async (req, res) => {
	const { name, email, password } = req.body;
	const userId = await createUser(name, email, password);
	const user = await getUserById(userId);
	res.json(user);
});

// Update user
app.put('/users/:id', async (req, res) => {
	const { name, email, password } = req.body;
	const updated = await updateUser(req.params.id, name, email, password);
	const user = await getUserById(req.params.id);
	res.json(user);
});

// Delete user
app.delete('/users/:id', async (req, res) => {
	const deleted = await deleteUser(req.params.id);
	res.json(deleted);
});

// Starting https servers
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});

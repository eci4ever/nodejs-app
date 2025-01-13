// Dependencies
const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require('path');

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

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Starting both http & https servers
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});

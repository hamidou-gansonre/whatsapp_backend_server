
const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();
const port = 3000; // You can use any port

// Agora Credentials
const appId = 'ee4da67b6d1749f3a43f5159a3935d66';
const appCertificate = '76ee93df68a0429baa1c6c880c4480e9';


app.get('/get_token', (req, res) => {
    const channelName = req.query.channelName;
    if (!channelName) {
        return res.status(400).json({ 'error': 'channelName is required' });
    }

    // Token expiration time
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // Assign a role to the user
    const role = RtcRole.PUBLISHER;

    const token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, 0, role, privilegeExpiredTs);

    res.json({ 'token': token });
});

app.listen(port, () => {
    console.log(`Agora token server running on http://localhost:${port}`);
});
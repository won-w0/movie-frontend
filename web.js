const express = require('express');
const axios = require('axios');
const app = express();
const port = 80;

app.get('/', async (req, res) => {
    try {
        // App 서버의 Private IP로 데이터를 요청함
        const response = await axios.get('http://10.0.11.134:8080/api/data');
        
        res.send(`
            <div style="text-align:center; margin-top:50px; font-family: sans-serif;">
                <h1 style="color: #232f3e;">AWS 2-Tier Architecture Test</h1>
                <div style="border: 2px solid #ff9900; padding: 20px; display: inline-block; border-radius: 10px;">
                    <h2>Response from App Server:</h2>
                    <p style="font-size: 1.5em; color: #0073bb;"><strong>${response.data.message}</strong></p>
                    <p>Raw Data: ${JSON.stringify(response.data.data)}</p>
                </div>
                <p style="margin-top: 20px; color: #666;">Connected via Private Network (NAT Gateway/DNS enabled)</p>
            </div>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('App 서버와 통신 실패! 보안 그룹(SG) 8080 포트가 열려있는지 확인해.');
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Web server is running at http://0.0.0.0:${port}`);
});

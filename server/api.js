const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser'); //追加

const app = express();

app.use(cors());
app.use(bodyParser.json()); // 追加
app.use('/', express.static(path.join(__dirname, '../public')));

app.post('/api/subsidies', async (req, res) => { // getからpostに変更
    try {
        const keyword = encodeURIComponent(req.body.keyword);
        const response = await axios.get(`https://api.jgrants-portal.go.jp/exp/v1/public/subsidies?keyword=${keyword}&sort=created_date&order=DESC&acceptance=1`);
        res.send(response.data);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send('Error occurred while fetching data');
    }
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

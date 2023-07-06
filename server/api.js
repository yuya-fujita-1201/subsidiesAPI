const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/subsidies', async (req, res) => {
    try {
        const response = await axios.get('https://api.jgrants-portal.go.jp/exp/v1/public/subsidies');
        res.send(response.data);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send('Error occurred while fetching data');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

const express = require('express');
const bodyParser = require('body-parser');
const scrapeRoutes = require('./routes/scrape');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const app = express();

app.use(bodyParser.json());
app.use('/api', scrapeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

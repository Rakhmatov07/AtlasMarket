require("dotenv/config");
const express = require("express");
const fileUpload = require('express-fileupload');
const router = require("./routes");
const cookie = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(fileUpload());
app.use(cookie());
app.use('/api', router);
app.use(express.static(`${process.cwd()}/uploads`));




app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
global["__basedir"] = __dirname;

const express = require('express')
const app = express()
const port = 3000;

const router = require("./src/routes/all.routes").router;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/", router);

const hazelCache = require("./src/utils/hazelCache");



Promise.all([hazelCache.initializeClient()])
    .then(startApp)
    .catch(error => {
        console.log("error while starting express app ", error);
        throw new Error(error);
    });


function startApp() {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}
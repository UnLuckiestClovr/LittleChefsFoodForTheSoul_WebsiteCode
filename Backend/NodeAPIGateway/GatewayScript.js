const express = require('express');
const httpProxy = require('http-proxy');

const app = express()
const proxy = httpProxy.createProxyServer({});  

const USERAPIHOST = 'localhost';
const USERAPIPORT = '';

app.all('/userapi/*', (req,res) => {
    // Extract Path After Gateway Prefix
    const reroutePath = req.originalUrl.replace('/userapi/','/');

    // Set new Target URL
    const targetURL = 'http://' + USERAPIHOST + ':' + USERAPIPORT + reroutePath;

    //Proxy to Backend Service
    proxy.web(req, res, { target: targetURL })
})


const port = 15000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
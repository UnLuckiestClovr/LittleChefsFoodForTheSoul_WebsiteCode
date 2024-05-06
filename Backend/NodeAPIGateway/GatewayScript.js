const express = require('express');
const httpProxy = require('http-proxy');
const { Eureka } = require('eureka-js-client');
const { registerWithEureka } = require('./eureka-helper');

const app = express()
const proxy = httpProxy.createProxyServer({});  

// Host & Port for Each Service
const USERAPIHOST = 'localhost';
const USERAPIPORT = 15011;
const RECIPEAPIHOST = 'localhost';
const RECIPEAPIPORT = 15012;
const BASKETAPIHOST = 'localhost';
const BASKETAPIPORT = 15013;
const ORDERAPIHOST = 'localhost';
const ORDERAPIPORT = 15014;

registerWithEureka('Node-Gateway', 'localhost', 15010);
// registerWithEureka('User-Service-API', USERAPIHOST, USERAPIPORT);
// registerWithEureka('Recipe-Service-API', RECIPEAPIHOST, RECIPEAPIPORT);
// registerWithEureka('Basket-Service-API', BASKETAPIHOST, BASKETAPIPORT);
// registerWithEureka('Order-Service-API', ORDERAPIHOST, ORDERAPIPORT);

app.all('/userapi/*', (req,res) => {
    

    // Extract Path After Gateway Prefix
    const reroutePath = req.originalUrl.replace('/userapi/','/');

    // Set new Target URL
    const targetURL = 'http://' + USERAPIHOST + ':' + USERAPIPORT + reroutePath;

    //Proxy to Backend Service
    proxy.web(req, res, { target: targetURL })
})

proxy.on('error', (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error');
});

const port = 15010;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
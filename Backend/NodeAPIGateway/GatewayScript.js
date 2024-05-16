const express = require('express');
const httpProxy = require('http-proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { Eureka } = require('eureka-js-client');
const eurekahelper = require('./eureka-helper');

const app = express()
const proxy = httpProxy.createProxyServer({});

// Eureka Setup
const eurekaHost = 'LittleChefsEureka';
const eurekaPort = 8761;
const ipAddr = '172.0.0.1';

const eurekaClient = new Eureka({
    instance: {
        app: 'LittleChefsGateway',
        hostName: 'localhost',
        ipAddr: ipAddr,
        port: {
            '$': 15010,
            '@enabled': 'true',
        },
        vipAddress: 'LittleChefsGateway',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
    },
    //retry 10 times for 3 minute 20 seconds.
    eureka: {
        host: eurekaHost,
        port: eurekaPort,
        servicePath: '/eureka/apps/',
        maxRetries: 10,
        requestRetryDelay: 2000,
    },
});

eurekaClient.logger.level('debug')

eurekaClient.start( error => {
    console.log(error || "Service Registered: LittleChefsGateway")
});

function exitHandler(options, exitCode) {
    if (options.cleanup) {
    }
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) {
        client.stop();
    }
}

eurekaClient.on('deregistered', () => {
    process.exit();
    console.log('after deregistered');
})

eurekaClient.on('started', () => {
    console.log("Eureka Host: " + eurekaHost);
})

process.on('SIGINT', exitHandler.bind(null, {exit:true}));


// Initialize Eureka client
eurekaClient.start(error => {
    if (error) {
        console.log('Error registering with Eureka:', error);
    } else {
        console.log('Registered with Eureka successfully');
    }
});


// Internal Port for Each Service
//const USERAPIPORT = 15011;
// const RECIPEAPIPORT = 15012;
// const BASKETAPIPORT = 15013;
// const ORDERAPIPORT = 15014;

// Proxy middleware for '/recipeapi/*' route
app.all('/recipeapi/*', async (req, res) => {
    try {
    const userBackendInstances = await eurekaClient.getInstancesByAppId('RecipeAPI');

    console.log("Number of Services: " + userBackendInstances.length)

    if (userBackendInstances.length > 0) {
        const randIndex = Math.floor(Math.random() * userBackendInstances.length)

        console.log("Random Index : " + randIndex)

        const chosenBackend = userBackendInstances[randIndex];

        const reroutePath = req.originalUrl.replace('/recipeapi/', '/');

        // Set new Target URL
        const targetURL = 'http://' + chosenBackend.hostName + ':' + chosenBackend.port.$ + reroutePath;

        console.log("[Target URL]" + targetURL)

        // Proxy to Backend Service
        const proxyMiddleware = createProxyMiddleware({
        target: targetURL,
        changeOrigin: true,
        onProxyReq(proxyReq, req, res) {
            console.log('Proxying request:', req.method, req.originalUrl);
        },
        onProxyRes(proxyRes, req, res) {
            // Modify response from target server if needed
        },
        onError(err, req, res) {
            console.error('Proxy Error:', err);
            res.status(500).send('Proxy Error');
        }
        });
        proxyMiddleware(req, res);
    } else {
        res.status(500).json({ error: 'No backend services available' });
    }
    } catch (error) {
    console.error('Error fetching backend services from Eureka:', error);
    res.status(500).json({ error: 'Error fetching backend services from Eureka' });
    }
});


// Proxy middleware for '/userapi/*' route
app.all('/userapi/*', async (req, res) => {
    try {
    const userBackendInstances = await eurekaClient.getInstancesByAppId('RecipeAPI');

    if (userBackendInstances.length > 0) {
        const randIndex = Math.floor(Math.random() * userBackendInstances.length);
        const chosenBackend = userBackendInstances[randIndex];

        const reroutePath = req.originalUrl.replace('/userapi/', '/');

        // Construct the target URL using the correct properties
        const targetURL = `http://${chosenBackend.hostName}:${chosenBackend.port.$}${reroutePath}`;

        console.log("[Target URL] " + targetURL);

        // Proxy to Backend Service
        const proxyMiddleware = createProxyMiddleware({
        target: targetURL,
        changeOrigin: true,
        onProxyReq(proxyReq, req, res) {
            console.log('Proxying request:', req.method, req.originalUrl);
        },
        onProxyRes(proxyRes, req, res) {
            // Modify response from target server if needed
        },
        onError(err, req, res) {
            console.error('Proxy Error:', err);
            res.status(500).send('Proxy Error');
        }
        });
        proxyMiddleware(req, res);
    } else {
        res.status(500).json({ error: 'No backend services available' });
    }
    } catch (error) {
    console.error('Error fetching backend services from Eureka:', error);
    res.status(500).json({ error: 'Error fetching backend services from Eureka' });
    }
});

proxy.on('error', (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error');
});

const port = 15010;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
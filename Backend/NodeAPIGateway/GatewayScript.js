const express = require('express');
const httpProxy = require('http-proxy');
const { Eureka } = require('eureka-js-client');
const eurekahelper = require('./eureka-helper');

const app = express()
const proxy = httpProxy.createProxyServer({});

// Eureka Setup
const eurekaHost = (process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || '127.0.0.1');
const eurekaPort = 15000;
const ipAddr = '172.0.0.1';

const client = new Eureka({
    instance: {
        app: LittleChefsGateway,
        hostName: 'localhost',
        ipAddr: ipAddr,
        port: {
            '$': 15010,
            '@enabled': 'true',
        },
        vipAddress: LittleChefsGateway,
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

client.logger.level('debug')

client.start( error => {
    console.log(error || "Service Registered: " + serviceHost)
});

function exitHandler(options, exitCode) {
    if (options.cleanup) {
    }
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) {
        client.stop();
    }
}

client.on('deregistered', () => {
    process.exit();
    console.log('after deregistered');
})

client.on('started', () => {
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

app.all('/recipeapi/*', (req,res) => {
    const userBackendInstances = client.getInstancesByAppId('RecipeAPI')

    if (userBackendInstances.length > 0) {
        const { host, port } = userBackendInstances[Math.floor(Math.random() * userBackendInstances.length)];

        const reroutePath = req.originalUrl.replace('/recipeapi/','/');

        // Set new Target URL
        const targetURL = 'http://' + host + ':' + port + reroutePath;

        //Proxy to Backend Service
        proxy.web(req, res, { target: targetURL })
    }
    else {
        res.status(500).json({ error: 'Issues Connecting to Backend Registered Services' });
    }
})

app.all('/userapi/*', (req,res) => {
    const userBackendInstances = client.getInstancesByAppId('UserAPI')

    if (userBackendInstances.length > 0) {
        const { host, port } = userBackendInstances[0];

        const reroutePath = req.originalUrl.replace('/userapi/','/');

        // Set new Target URL
        const targetURL = 'http://' + host + ':' + port + reroutePath;

        //Proxy to Backend Service
        proxy.web(req, res, { target: targetURL })
    }
    else {
        res.status(500).json({ error: 'Issues Connecting to Backend Registered Services' });
    }
})

proxy.on('error', (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error');
});

const port = 15010;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
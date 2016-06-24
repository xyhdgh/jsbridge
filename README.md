#jsbridge

JSBridge for jsvascript

- request format: `protocol://host:port/url[params]`
    - eg: `jsbridge://kjc/{"type":"action","name":"share","callback":"callback_1466131023000"}`
    - eg: (supposed) `jsbridge://kjc/action/share?callback=callback_1466131023000&title=title`
- params
    - `protocol`:
        - customize protocol name
        - cannot use protocols like `http` `https` `ftp` etc.
    - `host` & `port` & `url`
        - for dispatch
        - `host` and `port` can be empty
    - `params`
        - data you want to send
        - can be key-value string like original url

## Readme

This is a very-base realization of JSBridge.

It is mainly for pages embedded in native app to communicate with their host by breaking `webview`;

## Description

The package provides two methods, `invoke` for javascript and `callback` for native app.

The Communication only could be called up in javascript,and then native app can reply sth. with callback.

(Calling up in native app would support in the next version);

## Usage
- Javascript side
```js
// node environment (webpack or es6)
const JSBridge = require('jsbridge').init('jsbridge','localhost');

JSBridge.invoke('action',{key: value},(params) => { console.log(params) });


// original javascript
// <script src='node_modules/jsbridge/dist/index.js'></script>

JSBridge.invoke('action',{key: value},(params) => { console.log(params) });
```
## API methods

- init(protocol,hostname,port,isjson)
    - init url preferences(try not to call it again, it would cover globally)
    - if `isjson` is true, all params would padding by json-object instead of `key-value`
- invoke(url,params,callback)
    - call up a communication with native app
- callback(callbackname,params)
    - callback a function pass by `invoke`
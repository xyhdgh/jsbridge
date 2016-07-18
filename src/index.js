/**
 * Creator: yeliex
 * Project: rkjsbridge
 * Description:
 */

((env) => {

  let baseUrl = '';
  let isJson = false;


  const callbackStack = {};

  const invoke = function invoke(url, params, callback) {
    if (!baseUrl) {
      throw `jsbridge must be initialized at least once`;
    }

    const callbackname = `callback_${Date.parse(new Date())}`;

    callbackStack[callbackname] = callback;

    params.callback = callbackname;

    const reqUrl = `${baseUrl}${url}${isJson ? `/${JSON.stringify(params)}` : `?${Object.keys(params).map((key)=> {
      return `${key}=${params[key]}`;
    }).join('&')}`}`.replace(/\/{1,}/g,'/').replace(/:\//g,'://');

    let request = document.createElement('IFRAME');
    request.setAttribute("src", reqUrl);
    document.documentElement.appendChild(request);
    request.parentNode.removeChild(request);
    request = null;

    return true;
  };

  const callback = function (callbackName, params) {
    try {
      params = JSON.parse(params);
    }
    catch (e) {
      console.warn(`JSBridge callback params should be JSON object with stringify \n returns ${typeof params} \n ${params}`)
    }

    // do callback
    if (!callbackStack || !callbackStack[callbackName]) {
      throw `cannot find callback function ${callbackName} in ${Object.keys(callbackStack)}`;
    }
    try {
      callbackStack[callbackName](params);
    } catch (e) {
      console.error(e);
    }
    finally {
      delete callbackStack[callbackName];
    }
    return true;
  };

  const init = function (protocol = 'jsbridge', hostname, port, json = false) {
    if (port && !Number.isInteger(Number(port))) {
      throw 'port must be number';
    }

    baseUrl = `${protocol.replace(/:|\//g, '')}://${hostname}${hostname && port ? `:${port}/` : '/'}`;
    isJson = json;

    return {
      invoke, callback
    };
  };

  const that = {
    init,
    callback,
    invoke
  };

  if (typeof env.module === 'object') {
    module.exports = init;
  }

  env.JSBridge = that;
})(window || this);

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) =>
  function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])((fn = 0))), res;
    } catch (e) {
      throw ((err = [e]), e);
    }
  };
var __commonJS = (cb, mod) =>
  function __require() {
    try {
      return (
        mod ||
          (0, cb[__getOwnPropNames(cb)[0]])(
            (mod = { exports: {} }).exports,
            mod
          ),
        mod.exports
      );
    } catch (e) {
      throw ((mod = 0), e);
    }
  };
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, "default", { value: mod, enumerable: true })
      : target,
    mod
  )
);
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/operations/envVariableUtility.ts
var envVariableUtility_exports = {};
__export(envVariableUtility_exports, {
  EnvTreeUtility: () => EnvTreeUtility,
  getVariableMap: () => getVariableMap,
  isEmpty: () => isEmpty,
  isObject: () => isObject,
  isPredefinedVariable: () => isPredefinedVariable,
});
function isPredefinedVariable(variable) {
  let predefinedVarPrefix = [
    "runner.",
    "azure_http_user_agent",
    "common.",
    "system.",
  ];
  for (let varPrefix of predefinedVarPrefix) {
    if (variable.toLowerCase().startsWith(varPrefix)) {
      return true;
    }
  }
  return false;
}
function getVariableMap() {
  let variableMap = /* @__PURE__ */ new Map();
  let variables = process.env;
  Object.keys(variables).forEach((key) => {
    if (!isPredefinedVariable(key)) {
      variableMap.set(key, variables[key]);
    }
  });
  return variableMap;
}
function isEmpty(object) {
  if (object == null || object == "") return true;
  return false;
}
function isObject(object) {
  if (object == null || object == "" || typeof object != "object") {
    return false;
  }
  return true;
}
var EnvTreeUtility;
var init_envVariableUtility = __esm({
  "src/operations/envVariableUtility.ts"() {
    EnvTreeUtility = class _EnvTreeUtility {
      constructor() {
        this.envVarTree = null;
      }
      static getEnvVarTree() {
        let util = new _EnvTreeUtility();
        if (!util.envVarTree) {
          util.envVarTree = util.createEnvTree(getVariableMap());
        }
        return util.envVarTree;
      }
      createEnvTree(envVariables) {
        let envVarTree = {
          value: null,
          isEnd: false,
          child: {
            __proto__: null,
          },
        };
        for (let [key, value] of envVariables.entries()) {
          let envVarTreeIterator = envVarTree;
          let envVariableNameArray = key.split(".");
          for (let variableName of envVariableNameArray) {
            if (
              envVarTreeIterator.child[variableName] === void 0 ||
              typeof envVarTreeIterator.child[variableName] === "function"
            ) {
              envVarTreeIterator.child[variableName] = {
                value: null,
                isEnd: false,
                child: {},
              };
            }
            envVarTreeIterator = envVarTreeIterator.child[variableName];
          }
          envVarTreeIterator.isEnd = true;
          envVarTreeIterator.value = value;
        }
        return envVarTree;
      }
      checkEnvTreePath(jsonObjectKey, index, jsonObjectKeyLength, envVarTree) {
        if (index == jsonObjectKeyLength) {
          return envVarTree;
        }
        if (
          envVarTree.child[jsonObjectKey[index]] === void 0 ||
          typeof envVarTree.child[jsonObjectKey[index]] === "function"
        ) {
          return void 0;
        }
        return this.checkEnvTreePath(
          jsonObjectKey,
          index + 1,
          jsonObjectKeyLength,
          envVarTree.child[jsonObjectKey[index]]
        );
      }
    };
  },
});

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS({
  "node_modules/@actions/core/lib/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toCommandProperties = exports2.toCommandValue = void 0;
    function toCommandValue(input) {
      if (input === null || input === void 0) {
        return "";
      } else if (typeof input === "string" || input instanceof String) {
        return input;
      }
      return JSON.stringify(input);
    }
    exports2.toCommandValue = toCommandValue;
    function toCommandProperties(annotationProperties) {
      if (!Object.keys(annotationProperties).length) {
        return {};
      }
      return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn,
      };
    }
    exports2.toCommandProperties = toCommandProperties;
  },
});

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS({
  "node_modules/@actions/core/lib/command.js"(exports2) {
    "use strict";
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            var desc = Object.getOwnPropertyDescriptor(m, k);
            if (
              !desc ||
              ("get" in desc
                ? !m.__esModule
                : desc.writable || desc.configurable)
            ) {
              desc = {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              };
            }
            Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.issue = exports2.issueCommand = void 0;
    var os2 = __importStar(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command, properties, message) {
      const cmd = new Command(command, properties, message);
      process.stdout.write(cmd.toString() + os2.EOL);
    }
    exports2.issueCommand = issueCommand;
    function issue(name, message = "") {
      issueCommand(name, {}, message);
    }
    exports2.issue = issue;
    var CMD_STRING = "::";
    var Command = class {
      constructor(command, properties, message) {
        if (!command) {
          command = "missing.command";
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
      }
      toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
          cmdStr += " ";
          let first = true;
          for (const key in this.properties) {
            if (this.properties.hasOwnProperty(key)) {
              const val = this.properties[key];
              if (val) {
                if (first) {
                  first = false;
                } else {
                  cmdStr += ",";
                }
                cmdStr += `${key}=${escapeProperty(val)}`;
              }
            }
          }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
      }
    };
    function escapeData(s) {
      return (0, utils_1.toCommandValue)(s)
        .replace(/%/g, "%25")
        .replace(/\r/g, "%0D")
        .replace(/\n/g, "%0A");
    }
    function escapeProperty(s) {
      return (0, utils_1.toCommandValue)(s)
        .replace(/%/g, "%25")
        .replace(/\r/g, "%0D")
        .replace(/\n/g, "%0A")
        .replace(/:/g, "%3A")
        .replace(/,/g, "%2C");
    }
  },
});

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS({
  "node_modules/@actions/core/lib/file-command.js"(exports2) {
    "use strict";
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            var desc = Object.getOwnPropertyDescriptor(m, k);
            if (
              !desc ||
              ("get" in desc
                ? !m.__esModule
                : desc.writable || desc.configurable)
            ) {
              desc = {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              };
            }
            Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.prepareKeyValueMessage = exports2.issueFileCommand = void 0;
    var crypto = __importStar(require("crypto"));
    var fs3 = __importStar(require("fs"));
    var os2 = __importStar(require("os"));
    var utils_1 = require_utils();
    function issueFileCommand(command, message) {
      const filePath = process.env[`GITHUB_${command}`];
      if (!filePath) {
        throw new Error(
          `Unable to find environment variable for file command ${command}`
        );
      }
      if (!fs3.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
      }
      fs3.appendFileSync(
        filePath,
        `${(0, utils_1.toCommandValue)(message)}${os2.EOL}`,
        {
          encoding: "utf8",
        }
      );
    }
    exports2.issueFileCommand = issueFileCommand;
    function prepareKeyValueMessage(key, value) {
      const delimiter = `ghadelimiter_${crypto.randomUUID()}`;
      const convertedValue = (0, utils_1.toCommandValue)(value);
      if (key.includes(delimiter)) {
        throw new Error(
          `Unexpected input: name should not contain the delimiter "${delimiter}"`
        );
      }
      if (convertedValue.includes(delimiter)) {
        throw new Error(
          `Unexpected input: value should not contain the delimiter "${delimiter}"`
        );
      }
      return `${key}<<${delimiter}${os2.EOL}${convertedValue}${os2.EOL}${delimiter}`;
    }
    exports2.prepareKeyValueMessage = prepareKeyValueMessage;
  },
});

// node_modules/@actions/http-client/lib/proxy.js
var require_proxy = __commonJS({
  "node_modules/@actions/http-client/lib/proxy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.checkBypass = exports2.getProxyUrl = void 0;
    function getProxyUrl(reqUrl) {
      const usingSsl = reqUrl.protocol === "https:";
      if (checkBypass(reqUrl)) {
        return void 0;
      }
      const proxyVar = (() => {
        if (usingSsl) {
          return process.env["https_proxy"] || process.env["HTTPS_PROXY"];
        } else {
          return process.env["http_proxy"] || process.env["HTTP_PROXY"];
        }
      })();
      if (proxyVar) {
        return new URL(proxyVar);
      } else {
        return void 0;
      }
    }
    exports2.getProxyUrl = getProxyUrl;
    function checkBypass(reqUrl) {
      if (!reqUrl.hostname) {
        return false;
      }
      const noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
      if (!noProxy) {
        return false;
      }
      let reqPort;
      if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
      } else if (reqUrl.protocol === "http:") {
        reqPort = 80;
      } else if (reqUrl.protocol === "https:") {
        reqPort = 443;
      }
      const upperReqHosts = [reqUrl.hostname.toUpperCase()];
      if (typeof reqPort === "number") {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
      }
      for (const upperNoProxyItem of noProxy
        .split(",")
        .map((x) => x.trim().toUpperCase())
        .filter((x) => x)) {
        if (upperReqHosts.some((x) => x === upperNoProxyItem)) {
          return true;
        }
      }
      return false;
    }
    exports2.checkBypass = checkBypass;
  },
});

// node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS({
  "node_modules/tunnel/lib/tunnel.js"(exports2) {
    "use strict";
    var net = require("net");
    var tls = require("tls");
    var http = require("http");
    var https = require("https");
    var events = require("events");
    var assert = require("assert");
    var util = require("util");
    exports2.httpOverHttp = httpOverHttp;
    exports2.httpsOverHttp = httpsOverHttp;
    exports2.httpOverHttps = httpOverHttps;
    exports2.httpsOverHttps = httpsOverHttps;
    function httpOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      return agent;
    }
    function httpsOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function httpOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      return agent;
    }
    function httpsOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function TunnelingAgent(options) {
      var self = this;
      self.options = options || {};
      self.proxyOptions = self.options.proxy || {};
      self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
      self.requests = [];
      self.sockets = [];
      self.on("free", function onFree(socket, host, port, localAddress) {
        var options2 = toOptions(host, port, localAddress);
        for (var i = 0, len = self.requests.length; i < len; ++i) {
          var pending = self.requests[i];
          if (
            pending.host === options2.host &&
            pending.port === options2.port
          ) {
            self.requests.splice(i, 1);
            pending.request.onSocket(socket);
            return;
          }
        }
        socket.destroy();
        self.removeSocket(socket);
      });
    }
    util.inherits(TunnelingAgent, events.EventEmitter);
    TunnelingAgent.prototype.addRequest = function addRequest(
      req,
      host,
      port,
      localAddress
    ) {
      var self = this;
      var options = mergeOptions(
        { request: req },
        self.options,
        toOptions(host, port, localAddress)
      );
      if (self.sockets.length >= this.maxSockets) {
        self.requests.push(options);
        return;
      }
      self.createSocket(options, function (socket) {
        socket.on("free", onFree);
        socket.on("close", onCloseOrRemove);
        socket.on("agentRemove", onCloseOrRemove);
        req.onSocket(socket);
        function onFree() {
          self.emit("free", socket, options);
        }
        function onCloseOrRemove(err) {
          self.removeSocket(socket);
          socket.removeListener("free", onFree);
          socket.removeListener("close", onCloseOrRemove);
          socket.removeListener("agentRemove", onCloseOrRemove);
        }
      });
    };
    TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
      var self = this;
      var placeholder = {};
      self.sockets.push(placeholder);
      var connectOptions = mergeOptions({}, self.proxyOptions, {
        method: "CONNECT",
        path: options.host + ":" + options.port,
        agent: false,
        headers: {
          host: options.host + ":" + options.port,
        },
      });
      if (options.localAddress) {
        connectOptions.localAddress = options.localAddress;
      }
      if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {};
        connectOptions.headers["Proxy-Authorization"] =
          "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
      }
      debug("making CONNECT request");
      var connectReq = self.request(connectOptions);
      connectReq.useChunkedEncodingByDefault = false;
      connectReq.once("response", onResponse);
      connectReq.once("upgrade", onUpgrade);
      connectReq.once("connect", onConnect);
      connectReq.once("error", onError);
      connectReq.end();
      function onResponse(res) {
        res.upgrade = true;
      }
      function onUpgrade(res, socket, head) {
        process.nextTick(function () {
          onConnect(res, socket, head);
        });
      }
      function onConnect(res, socket, head) {
        connectReq.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode !== 200) {
          debug(
            "tunneling socket could not be established, statusCode=%d",
            res.statusCode
          );
          socket.destroy();
          var error = new Error(
            "tunneling socket could not be established, statusCode=" +
              res.statusCode
          );
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self.removeSocket(placeholder);
          return;
        }
        if (head.length > 0) {
          debug("got illegal response body from proxy");
          socket.destroy();
          var error = new Error("got illegal response body from proxy");
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self.removeSocket(placeholder);
          return;
        }
        debug("tunneling connection has established");
        self.sockets[self.sockets.indexOf(placeholder)] = socket;
        return cb(socket);
      }
      function onError(cause) {
        connectReq.removeAllListeners();
        debug(
          "tunneling socket could not be established, cause=%s\n",
          cause.message,
          cause.stack
        );
        var error = new Error(
          "tunneling socket could not be established, cause=" + cause.message
        );
        error.code = "ECONNRESET";
        options.request.emit("error", error);
        self.removeSocket(placeholder);
      }
    };
    TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
      var pos = this.sockets.indexOf(socket);
      if (pos === -1) {
        return;
      }
      this.sockets.splice(pos, 1);
      var pending = this.requests.shift();
      if (pending) {
        this.createSocket(pending, function (socket2) {
          pending.request.onSocket(socket2);
        });
      }
    };
    function createSecureSocket(options, cb) {
      var self = this;
      TunnelingAgent.prototype.createSocket.call(
        self,
        options,
        function (socket) {
          var hostHeader = options.request.getHeader("host");
          var tlsOptions = mergeOptions({}, self.options, {
            socket,
            servername: hostHeader
              ? hostHeader.replace(/:.*$/, "")
              : options.host,
          });
          var secureSocket = tls.connect(0, tlsOptions);
          self.sockets[self.sockets.indexOf(socket)] = secureSocket;
          cb(secureSocket);
        }
      );
    }
    function toOptions(host, port, localAddress) {
      if (typeof host === "string") {
        return {
          host,
          port,
          localAddress,
        };
      }
      return host;
    }
    function mergeOptions(target) {
      for (var i = 1, len = arguments.length; i < len; ++i) {
        var overrides = arguments[i];
        if (typeof overrides === "object") {
          var keys = Object.keys(overrides);
          for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
            var k = keys[j];
            if (overrides[k] !== void 0) {
              target[k] = overrides[k];
            }
          }
        }
      }
      return target;
    }
    var debug;
    if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
      debug = function () {
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === "string") {
          args[0] = "TUNNEL: " + args[0];
        } else {
          args.unshift("TUNNEL:");
        }
        console.error.apply(console, args);
      };
    } else {
      debug = function () {};
    }
    exports2.debug = debug;
  },
});

// node_modules/tunnel/index.js
var require_tunnel2 = __commonJS({
  "node_modules/tunnel/index.js"(exports2, module2) {
    module2.exports = require_tunnel();
  },
});

// node_modules/@actions/http-client/lib/index.js
var require_lib = __commonJS({
  "node_modules/@actions/http-client/lib/index.js"(exports2) {
    "use strict";
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    var __awaiter =
      (exports2 && exports2.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done
              ? resolve(result.value)
              : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.HttpClient =
      exports2.isHttps =
      exports2.HttpClientResponse =
      exports2.HttpClientError =
      exports2.getProxyUrl =
      exports2.MediaTypes =
      exports2.Headers =
      exports2.HttpCodes =
        void 0;
    var http = __importStar(require("http"));
    var https = __importStar(require("https"));
    var pm = __importStar(require_proxy());
    var tunnel = __importStar(require_tunnel2());
    var HttpCodes;
    (function (HttpCodes2) {
      HttpCodes2[(HttpCodes2["OK"] = 200)] = "OK";
      HttpCodes2[(HttpCodes2["MultipleChoices"] = 300)] = "MultipleChoices";
      HttpCodes2[(HttpCodes2["MovedPermanently"] = 301)] = "MovedPermanently";
      HttpCodes2[(HttpCodes2["ResourceMoved"] = 302)] = "ResourceMoved";
      HttpCodes2[(HttpCodes2["SeeOther"] = 303)] = "SeeOther";
      HttpCodes2[(HttpCodes2["NotModified"] = 304)] = "NotModified";
      HttpCodes2[(HttpCodes2["UseProxy"] = 305)] = "UseProxy";
      HttpCodes2[(HttpCodes2["SwitchProxy"] = 306)] = "SwitchProxy";
      HttpCodes2[(HttpCodes2["TemporaryRedirect"] = 307)] = "TemporaryRedirect";
      HttpCodes2[(HttpCodes2["PermanentRedirect"] = 308)] = "PermanentRedirect";
      HttpCodes2[(HttpCodes2["BadRequest"] = 400)] = "BadRequest";
      HttpCodes2[(HttpCodes2["Unauthorized"] = 401)] = "Unauthorized";
      HttpCodes2[(HttpCodes2["PaymentRequired"] = 402)] = "PaymentRequired";
      HttpCodes2[(HttpCodes2["Forbidden"] = 403)] = "Forbidden";
      HttpCodes2[(HttpCodes2["NotFound"] = 404)] = "NotFound";
      HttpCodes2[(HttpCodes2["MethodNotAllowed"] = 405)] = "MethodNotAllowed";
      HttpCodes2[(HttpCodes2["NotAcceptable"] = 406)] = "NotAcceptable";
      HttpCodes2[(HttpCodes2["ProxyAuthenticationRequired"] = 407)] =
        "ProxyAuthenticationRequired";
      HttpCodes2[(HttpCodes2["RequestTimeout"] = 408)] = "RequestTimeout";
      HttpCodes2[(HttpCodes2["Conflict"] = 409)] = "Conflict";
      HttpCodes2[(HttpCodes2["Gone"] = 410)] = "Gone";
      HttpCodes2[(HttpCodes2["TooManyRequests"] = 429)] = "TooManyRequests";
      HttpCodes2[(HttpCodes2["InternalServerError"] = 500)] =
        "InternalServerError";
      HttpCodes2[(HttpCodes2["NotImplemented"] = 501)] = "NotImplemented";
      HttpCodes2[(HttpCodes2["BadGateway"] = 502)] = "BadGateway";
      HttpCodes2[(HttpCodes2["ServiceUnavailable"] = 503)] =
        "ServiceUnavailable";
      HttpCodes2[(HttpCodes2["GatewayTimeout"] = 504)] = "GatewayTimeout";
    })((HttpCodes = exports2.HttpCodes || (exports2.HttpCodes = {})));
    var Headers;
    (function (Headers2) {
      Headers2["Accept"] = "accept";
      Headers2["ContentType"] = "content-type";
    })((Headers = exports2.Headers || (exports2.Headers = {})));
    var MediaTypes;
    (function (MediaTypes2) {
      MediaTypes2["ApplicationJson"] = "application/json";
    })((MediaTypes = exports2.MediaTypes || (exports2.MediaTypes = {})));
    function getProxyUrl(serverUrl) {
      const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
      return proxyUrl ? proxyUrl.href : "";
    }
    exports2.getProxyUrl = getProxyUrl;
    var HttpRedirectCodes = [
      HttpCodes.MovedPermanently,
      HttpCodes.ResourceMoved,
      HttpCodes.SeeOther,
      HttpCodes.TemporaryRedirect,
      HttpCodes.PermanentRedirect,
    ];
    var HttpResponseRetryCodes = [
      HttpCodes.BadGateway,
      HttpCodes.ServiceUnavailable,
      HttpCodes.GatewayTimeout,
    ];
    var RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
    var ExponentialBackoffCeiling = 10;
    var ExponentialBackoffTimeSlice = 5;
    var HttpClientError = class _HttpClientError extends Error {
      constructor(message, statusCode) {
        super(message);
        this.name = "HttpClientError";
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, _HttpClientError.prototype);
      }
    };
    exports2.HttpClientError = HttpClientError;
    var HttpClientResponse = class {
      constructor(message) {
        this.message = message;
      }
      readBody() {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve) =>
            __awaiter(this, void 0, void 0, function* () {
              let output = Buffer.alloc(0);
              this.message.on("data", (chunk) => {
                output = Buffer.concat([output, chunk]);
              });
              this.message.on("end", () => {
                resolve(output.toString());
              });
            })
          );
        });
      }
    };
    exports2.HttpClientResponse = HttpClientResponse;
    function isHttps(requestUrl) {
      const parsedUrl = new URL(requestUrl);
      return parsedUrl.protocol === "https:";
    }
    exports2.isHttps = isHttps;
    var HttpClient = class {
      constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
          if (requestOptions.ignoreSslError != null) {
            this._ignoreSslError = requestOptions.ignoreSslError;
          }
          this._socketTimeout = requestOptions.socketTimeout;
          if (requestOptions.allowRedirects != null) {
            this._allowRedirects = requestOptions.allowRedirects;
          }
          if (requestOptions.allowRedirectDowngrade != null) {
            this._allowRedirectDowngrade =
              requestOptions.allowRedirectDowngrade;
          }
          if (requestOptions.maxRedirects != null) {
            this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
          }
          if (requestOptions.keepAlive != null) {
            this._keepAlive = requestOptions.keepAlive;
          }
          if (requestOptions.allowRetries != null) {
            this._allowRetries = requestOptions.allowRetries;
          }
          if (requestOptions.maxRetries != null) {
            this._maxRetries = requestOptions.maxRetries;
          }
        }
      }
      options(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request(
            "OPTIONS",
            requestUrl,
            null,
            additionalHeaders || {}
          );
        });
      }
      get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("GET", requestUrl, null, additionalHeaders || {});
        });
      }
      del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request(
            "DELETE",
            requestUrl,
            null,
            additionalHeaders || {}
          );
        });
      }
      post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request(
            "POST",
            requestUrl,
            data,
            additionalHeaders || {}
          );
        });
      }
      patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request(
            "PATCH",
            requestUrl,
            data,
            additionalHeaders || {}
          );
        });
      }
      put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("PUT", requestUrl, data, additionalHeaders || {});
        });
      }
      head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request(
            "HEAD",
            requestUrl,
            null,
            additionalHeaders || {}
          );
        });
      }
      sendStream(verb, requestUrl, stream, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request(verb, requestUrl, stream, additionalHeaders);
        });
      }
      /**
       * Gets a typed object from an endpoint
       * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
       */
      getJson(requestUrl, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(
            additionalHeaders,
            Headers.Accept,
            MediaTypes.ApplicationJson
          );
          const res = yield this.get(requestUrl, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      postJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(
            additionalHeaders,
            Headers.Accept,
            MediaTypes.ApplicationJson
          );
          additionalHeaders[Headers.ContentType] =
            this._getExistingOrDefaultHeader(
              additionalHeaders,
              Headers.ContentType,
              MediaTypes.ApplicationJson
            );
          const res = yield this.post(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      putJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(
            additionalHeaders,
            Headers.Accept,
            MediaTypes.ApplicationJson
          );
          additionalHeaders[Headers.ContentType] =
            this._getExistingOrDefaultHeader(
              additionalHeaders,
              Headers.ContentType,
              MediaTypes.ApplicationJson
            );
          const res = yield this.put(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      patchJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(
            additionalHeaders,
            Headers.Accept,
            MediaTypes.ApplicationJson
          );
          additionalHeaders[Headers.ContentType] =
            this._getExistingOrDefaultHeader(
              additionalHeaders,
              Headers.ContentType,
              MediaTypes.ApplicationJson
            );
          const res = yield this.patch(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      /**
       * Makes a raw http request.
       * All other methods such as get, post, patch, and request ultimately call this.
       * Prefer get, del, post and patch
       */
      request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
          if (this._disposed) {
            throw new Error("Client has already been disposed.");
          }
          const parsedUrl = new URL(requestUrl);
          let info = this._prepareRequest(verb, parsedUrl, headers);
          const maxTries =
            this._allowRetries && RetryableHttpVerbs.includes(verb)
              ? this._maxRetries + 1
              : 1;
          let numTries = 0;
          let response;
          do {
            response = yield this.requestRaw(info, data);
            if (
              response &&
              response.message &&
              response.message.statusCode === HttpCodes.Unauthorized
            ) {
              let authenticationHandler;
              for (const handler of this.handlers) {
                if (handler.canHandleAuthentication(response)) {
                  authenticationHandler = handler;
                  break;
                }
              }
              if (authenticationHandler) {
                return authenticationHandler.handleAuthentication(
                  this,
                  info,
                  data
                );
              } else {
                return response;
              }
            }
            let redirectsRemaining = this._maxRedirects;
            while (
              response.message.statusCode &&
              HttpRedirectCodes.includes(response.message.statusCode) &&
              this._allowRedirects &&
              redirectsRemaining > 0
            ) {
              const redirectUrl = response.message.headers["location"];
              if (!redirectUrl) {
                break;
              }
              const parsedRedirectUrl = new URL(redirectUrl);
              if (
                parsedUrl.protocol === "https:" &&
                parsedUrl.protocol !== parsedRedirectUrl.protocol &&
                !this._allowRedirectDowngrade
              ) {
                throw new Error(
                  "Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true."
                );
              }
              yield response.readBody();
              if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                for (const header in headers) {
                  if (header.toLowerCase() === "authorization") {
                    delete headers[header];
                  }
                }
              }
              info = this._prepareRequest(verb, parsedRedirectUrl, headers);
              response = yield this.requestRaw(info, data);
              redirectsRemaining--;
            }
            if (
              !response.message.statusCode ||
              !HttpResponseRetryCodes.includes(response.message.statusCode)
            ) {
              return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
              yield response.readBody();
              yield this._performExponentialBackoff(numTries);
            }
          } while (numTries < maxTries);
          return response;
        });
      }
      /**
       * Needs to be called if keepAlive is set to true in request options.
       */
      dispose() {
        if (this._agent) {
          this._agent.destroy();
        }
        this._disposed = true;
      }
      /**
       * Raw request.
       * @param info
       * @param data
       */
      requestRaw(info, data) {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve, reject) => {
            function callbackForResult(err, res) {
              if (err) {
                reject(err);
              } else if (!res) {
                reject(new Error("Unknown error"));
              } else {
                resolve(res);
              }
            }
            this.requestRawWithCallback(info, data, callbackForResult);
          });
        });
      }
      /**
       * Raw request with callback.
       * @param info
       * @param data
       * @param onResult
       */
      requestRawWithCallback(info, data, onResult) {
        if (typeof data === "string") {
          if (!info.options.headers) {
            info.options.headers = {};
          }
          info.options.headers["Content-Length"] = Buffer.byteLength(
            data,
            "utf8"
          );
        }
        let callbackCalled = false;
        function handleResult(err, res) {
          if (!callbackCalled) {
            callbackCalled = true;
            onResult(err, res);
          }
        }
        const req = info.httpModule.request(info.options, (msg) => {
          const res = new HttpClientResponse(msg);
          handleResult(void 0, res);
        });
        let socket;
        req.on("socket", (sock) => {
          socket = sock;
        });
        req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
          if (socket) {
            socket.end();
          }
          handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on("error", function (err) {
          handleResult(err);
        });
        if (data && typeof data === "string") {
          req.write(data, "utf8");
        }
        if (data && typeof data !== "string") {
          data.on("close", function () {
            req.end();
          });
          data.pipe(req);
        } else {
          req.end();
        }
      }
      /**
       * Gets an http agent. This function is useful when you need an http agent that handles
       * routing through a proxy server - depending upon the url and proxy environment variables.
       * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
       */
      getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
      }
      _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === "https:";
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
          ? parseInt(info.parsedUrl.port)
          : defaultPort;
        info.options.path =
          (info.parsedUrl.pathname || "") + (info.parsedUrl.search || "");
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
          info.options.headers["user-agent"] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        if (this.handlers) {
          for (const handler of this.handlers) {
            handler.prepareRequest(info.options);
          }
        }
        return info;
      }
      _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) {
          return Object.assign(
            {},
            lowercaseKeys(this.requestOptions.headers),
            lowercaseKeys(headers || {})
          );
        }
        return lowercaseKeys(headers || {});
      }
      _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
          clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
      }
      _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
          agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
          agent = this._agent;
        }
        if (agent) {
          return agent;
        }
        const usingSsl = parsedUrl.protocol === "https:";
        let maxSockets = 100;
        if (this.requestOptions) {
          maxSockets =
            this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (proxyUrl && proxyUrl.hostname) {
          const agentOptions = {
            maxSockets,
            keepAlive: this._keepAlive,
            proxy: Object.assign(
              Object.assign(
                {},
                (proxyUrl.username || proxyUrl.password) && {
                  proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`,
                }
              ),
              { host: proxyUrl.hostname, port: proxyUrl.port }
            ),
          };
          let tunnelAgent;
          const overHttps = proxyUrl.protocol === "https:";
          if (usingSsl) {
            tunnelAgent = overHttps
              ? tunnel.httpsOverHttps
              : tunnel.httpsOverHttp;
          } else {
            tunnelAgent = overHttps
              ? tunnel.httpOverHttps
              : tunnel.httpOverHttp;
          }
          agent = tunnelAgent(agentOptions);
          this._proxyAgent = agent;
        }
        if (this._keepAlive && !agent) {
          const options = { keepAlive: this._keepAlive, maxSockets };
          agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
          this._agent = agent;
        }
        if (!agent) {
          agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
          agent.options = Object.assign(agent.options || {}, {
            rejectUnauthorized: false,
          });
        }
        return agent;
      }
      _performExponentialBackoff(retryNumber) {
        return __awaiter(this, void 0, void 0, function* () {
          retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
          const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
          return new Promise((resolve) => setTimeout(() => resolve(), ms));
        });
      }
      _processResponse(res, options) {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve, reject) =>
            __awaiter(this, void 0, void 0, function* () {
              const statusCode = res.message.statusCode || 0;
              const response = {
                statusCode,
                result: null,
                headers: {},
              };
              if (statusCode === HttpCodes.NotFound) {
                resolve(response);
              }
              function dateTimeDeserializer(key, value) {
                if (typeof value === "string") {
                  const a = new Date(value);
                  if (!isNaN(a.valueOf())) {
                    return a;
                  }
                }
                return value;
              }
              let obj;
              let contents;
              try {
                contents = yield res.readBody();
                if (contents && contents.length > 0) {
                  if (options && options.deserializeDates) {
                    obj = JSON.parse(contents, dateTimeDeserializer);
                  } else {
                    obj = JSON.parse(contents);
                  }
                  response.result = obj;
                }
                response.headers = res.message.headers;
              } catch (err) {}
              if (statusCode > 299) {
                let msg;
                if (obj && obj.message) {
                  msg = obj.message;
                } else if (contents && contents.length > 0) {
                  msg = contents;
                } else {
                  msg = `Failed request: (${statusCode})`;
                }
                const err = new HttpClientError(msg, statusCode);
                err.result = response.result;
                reject(err);
              } else {
                resolve(response);
              }
            })
          );
        });
      }
    };
    exports2.HttpClient = HttpClient;
    var lowercaseKeys = (obj) =>
      Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
  },
});

// node_modules/@actions/http-client/lib/auth.js
var require_auth = __commonJS({
  "node_modules/@actions/http-client/lib/auth.js"(exports2) {
    "use strict";
    var __awaiter =
      (exports2 && exports2.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done
              ? resolve(result.value)
              : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PersonalAccessTokenCredentialHandler =
      exports2.BearerCredentialHandler =
      exports2.BasicCredentialHandler =
        void 0;
    var BasicCredentialHandler = class {
      constructor(username, password) {
        this.username = username;
        this.password = password;
      }
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Basic ${Buffer.from(
          `${this.username}:${this.password}`
        ).toString("base64")}`;
      }
      // This handler cannot handle 401
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports2.BasicCredentialHandler = BasicCredentialHandler;
    var BearerCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      // currently implements pre-authorization
      // TODO: support preAuth = false where it hooks on 401
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Bearer ${this.token}`;
      }
      // This handler cannot handle 401
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports2.BearerCredentialHandler = BearerCredentialHandler;
    var PersonalAccessTokenCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      // currently implements pre-authorization
      // TODO: support preAuth = false where it hooks on 401
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Basic ${Buffer.from(
          `PAT:${this.token}`
        ).toString("base64")}`;
      }
      // This handler cannot handle 401
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports2.PersonalAccessTokenCredentialHandler =
      PersonalAccessTokenCredentialHandler;
  },
});

// node_modules/@actions/core/lib/oidc-utils.js
var require_oidc_utils = __commonJS({
  "node_modules/@actions/core/lib/oidc-utils.js"(exports2) {
    "use strict";
    var __awaiter =
      (exports2 && exports2.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done
              ? resolve(result.value)
              : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OidcClient = void 0;
    var http_client_1 = require_lib();
    var auth_1 = require_auth();
    var core_1 = require_core();
    var OidcClient = class _OidcClient {
      static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
          allowRetries: allowRetry,
          maxRetries: maxRetry,
        };
        return new http_client_1.HttpClient(
          "actions/oidc-client",
          [new auth_1.BearerCredentialHandler(_OidcClient.getRequestToken())],
          requestOptions
        );
      }
      static getRequestToken() {
        const token = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];
        if (!token) {
          throw new Error(
            "Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable"
          );
        }
        return token;
      }
      static getIDTokenUrl() {
        const runtimeUrl = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];
        if (!runtimeUrl) {
          throw new Error(
            "Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable"
          );
        }
        return runtimeUrl;
      }
      static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
          const httpclient = _OidcClient.createHttpClient();
          const res = yield httpclient.getJson(id_token_url).catch((error) => {
            throw new Error(`Failed to get ID Token. 
 
        Error Code : ${error.statusCode}
 
        Error Message: ${error.message}`);
          });
          const id_token =
            (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
          if (!id_token) {
            throw new Error("Response json body do not have ID Token field");
          }
          return id_token;
        });
      }
      static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            let id_token_url = _OidcClient.getIDTokenUrl();
            if (audience) {
              const encodedAudience = encodeURIComponent(audience);
              id_token_url = `${id_token_url}&audience=${encodedAudience}`;
            }
            (0, core_1.debug)(`ID token url is ${id_token_url}`);
            const id_token = yield _OidcClient.getCall(id_token_url);
            (0, core_1.setSecret)(id_token);
            return id_token;
          } catch (error) {
            throw new Error(`Error message: ${error.message}`);
          }
        });
      }
    };
    exports2.OidcClient = OidcClient;
  },
});

// node_modules/@actions/core/lib/summary.js
var require_summary = __commonJS({
  "node_modules/@actions/core/lib/summary.js"(exports2) {
    "use strict";
    var __awaiter =
      (exports2 && exports2.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done
              ? resolve(result.value)
              : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.summary =
      exports2.markdownSummary =
      exports2.SUMMARY_DOCS_URL =
      exports2.SUMMARY_ENV_VAR =
        void 0;
    var os_1 = require("os");
    var fs_1 = require("fs");
    var { access, appendFile, writeFile } = fs_1.promises;
    exports2.SUMMARY_ENV_VAR = "GITHUB_STEP_SUMMARY";
    exports2.SUMMARY_DOCS_URL =
      "https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";
    var Summary = class {
      constructor() {
        this._buffer = "";
      }
      /**
       * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
       * Also checks r/w permissions.
       *
       * @returns step summary file path
       */
      filePath() {
        return __awaiter(this, void 0, void 0, function* () {
          if (this._filePath) {
            return this._filePath;
          }
          const pathFromEnv = process.env[exports2.SUMMARY_ENV_VAR];
          if (!pathFromEnv) {
            throw new Error(
              `Unable to find environment variable for $${exports2.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`
            );
          }
          try {
            yield access(
              pathFromEnv,
              fs_1.constants.R_OK | fs_1.constants.W_OK
            );
          } catch (_a) {
            throw new Error(
              `Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`
            );
          }
          this._filePath = pathFromEnv;
          return this._filePath;
        });
      }
      /**
       * Wraps content in an HTML tag, adding any HTML attributes
       *
       * @param {string} tag HTML tag to wrap
       * @param {string | null} content content within the tag
       * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
       *
       * @returns {string} content wrapped in HTML element
       */
      wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs)
          .map(([key, value]) => ` ${key}="${value}"`)
          .join("");
        if (!content) {
          return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
      }
      /**
       * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
       *
       * @param {SummaryWriteOptions} [options] (optional) options for write operation
       *
       * @returns {Promise<Summary>} summary instance
       */
      write(options) {
        return __awaiter(this, void 0, void 0, function* () {
          const overwrite = !!(options === null || options === void 0
            ? void 0
            : options.overwrite);
          const filePath = yield this.filePath();
          const writeFunc = overwrite ? writeFile : appendFile;
          yield writeFunc(filePath, this._buffer, { encoding: "utf8" });
          return this.emptyBuffer();
        });
      }
      /**
       * Clears the summary buffer and wipes the summary file
       *
       * @returns {Summary} summary instance
       */
      clear() {
        return __awaiter(this, void 0, void 0, function* () {
          return this.emptyBuffer().write({ overwrite: true });
        });
      }
      /**
       * Returns the current summary buffer as a string
       *
       * @returns {string} string of summary buffer
       */
      stringify() {
        return this._buffer;
      }
      /**
       * If the summary buffer is empty
       *
       * @returns {boolen} true if the buffer is empty
       */
      isEmptyBuffer() {
        return this._buffer.length === 0;
      }
      /**
       * Resets the summary buffer without writing to summary file
       *
       * @returns {Summary} summary instance
       */
      emptyBuffer() {
        this._buffer = "";
        return this;
      }
      /**
       * Adds raw text to the summary buffer
       *
       * @param {string} text content to add
       * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
       *
       * @returns {Summary} summary instance
       */
      addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
      }
      /**
       * Adds the operating system-specific end-of-line marker to the buffer
       *
       * @returns {Summary} summary instance
       */
      addEOL() {
        return this.addRaw(os_1.EOL);
      }
      /**
       * Adds an HTML codeblock to the summary buffer
       *
       * @param {string} code content to render within fenced code block
       * @param {string} lang (optional) language to syntax highlight code
       *
       * @returns {Summary} summary instance
       */
      addCodeBlock(code, lang) {
        const attrs = Object.assign({}, lang && { lang });
        const element = this.wrap("pre", this.wrap("code", code), attrs);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML list to the summary buffer
       *
       * @param {string[]} items list of items to render
       * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
       *
       * @returns {Summary} summary instance
       */
      addList(items, ordered = false) {
        const tag = ordered ? "ol" : "ul";
        const listItems = items.map((item) => this.wrap("li", item)).join("");
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML table to the summary buffer
       *
       * @param {SummaryTableCell[]} rows table rows
       *
       * @returns {Summary} summary instance
       */
      addTable(rows) {
        const tableBody = rows
          .map((row) => {
            const cells = row
              .map((cell) => {
                if (typeof cell === "string") {
                  return this.wrap("td", cell);
                }
                const { header, data, colspan, rowspan } = cell;
                const tag = header ? "th" : "td";
                const attrs = Object.assign(
                  Object.assign({}, colspan && { colspan }),
                  rowspan && { rowspan }
                );
                return this.wrap(tag, data, attrs);
              })
              .join("");
            return this.wrap("tr", cells);
          })
          .join("");
        const element = this.wrap("table", tableBody);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds a collapsable HTML details element to the summary buffer
       *
       * @param {string} label text for the closed state
       * @param {string} content collapsable content
       *
       * @returns {Summary} summary instance
       */
      addDetails(label, content) {
        const element = this.wrap(
          "details",
          this.wrap("summary", label) + content
        );
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML image tag to the summary buffer
       *
       * @param {string} src path to the image you to embed
       * @param {string} alt text description of the image
       * @param {SummaryImageOptions} options (optional) addition image attributes
       *
       * @returns {Summary} summary instance
       */
      addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(
          Object.assign({}, width && { width }),
          height && { height }
        );
        const element = this.wrap(
          "img",
          null,
          Object.assign({ src, alt }, attrs)
        );
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML section heading element
       *
       * @param {string} text heading text
       * @param {number | string} [level=1] (optional) the heading level, default: 1
       *
       * @returns {Summary} summary instance
       */
      addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag)
          ? tag
          : "h1";
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML thematic break (<hr>) to the summary buffer
       *
       * @returns {Summary} summary instance
       */
      addSeparator() {
        const element = this.wrap("hr", null);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML line break (<br>) to the summary buffer
       *
       * @returns {Summary} summary instance
       */
      addBreak() {
        const element = this.wrap("br", null);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML blockquote to the summary buffer
       *
       * @param {string} text quote text
       * @param {string} cite (optional) citation url
       *
       * @returns {Summary} summary instance
       */
      addQuote(text, cite) {
        const attrs = Object.assign({}, cite && { cite });
        const element = this.wrap("blockquote", text, attrs);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML anchor tag to the summary buffer
       *
       * @param {string} text link text/content
       * @param {string} href hyperlink
       *
       * @returns {Summary} summary instance
       */
      addLink(text, href) {
        const element = this.wrap("a", text, { href });
        return this.addRaw(element).addEOL();
      }
    };
    var _summary = new Summary();
    exports2.markdownSummary = _summary;
    exports2.summary = _summary;
  },
});

// node_modules/@actions/core/lib/path-utils.js
var require_path_utils = __commonJS({
  "node_modules/@actions/core/lib/path-utils.js"(exports2) {
    "use strict";
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            var desc = Object.getOwnPropertyDescriptor(m, k);
            if (
              !desc ||
              ("get" in desc
                ? !m.__esModule
                : desc.writable || desc.configurable)
            ) {
              desc = {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              };
            }
            Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toPlatformPath =
      exports2.toWin32Path =
      exports2.toPosixPath =
        void 0;
    var path2 = __importStar(require("path"));
    function toPosixPath(pth) {
      return pth.replace(/[\\]/g, "/");
    }
    exports2.toPosixPath = toPosixPath;
    function toWin32Path(pth) {
      return pth.replace(/[/]/g, "\\");
    }
    exports2.toWin32Path = toWin32Path;
    function toPlatformPath(pth) {
      return pth.replace(/[/\\]/g, path2.sep);
    }
    exports2.toPlatformPath = toPlatformPath;
  },
});

// node_modules/@actions/io/lib/io-util.js
var require_io_util = __commonJS({
  "node_modules/@actions/io/lib/io-util.js"(exports2) {
    "use strict";
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    var __awaiter =
      (exports2 && exports2.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done
              ? resolve(result.value)
              : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getCmdPath =
      exports2.tryGetExecutablePath =
      exports2.isRooted =
      exports2.isDirectory =
      exports2.exists =
      exports2.READONLY =
      exports2.UV_FS_O_EXLOCK =
      exports2.IS_WINDOWS =
      exports2.unlink =
      exports2.symlink =
      exports2.stat =
      exports2.rmdir =
      exports2.rm =
      exports2.rename =
      exports2.readlink =
      exports2.readdir =
      exports2.open =
      exports2.mkdir =
      exports2.lstat =
      exports2.copyFile =
      exports2.chmod =
        void 0;
    var fs3 = __importStar(require("fs"));
    var path2 = __importStar(require("path"));
    (_a = fs3.promises),
      (exports2.chmod = _a.chmod),
      (exports2.copyFile = _a.copyFile),
      (exports2.lstat = _a.lstat),
      (exports2.mkdir = _a.mkdir),
      (exports2.open = _a.open),
      (exports2.readdir = _a.readdir),
      (exports2.readlink = _a.readlink),
      (exports2.rename = _a.rename),
      (exports2.rm = _a.rm),
      (exports2.rmdir = _a.rmdir),
      (exports2.stat = _a.stat),
      (exports2.symlink = _a.symlink),
      (exports2.unlink = _a.unlink);
    exports2.IS_WINDOWS = process.platform === "win32";
    exports2.UV_FS_O_EXLOCK = 268435456;
    exports2.READONLY = fs3.constants.O_RDONLY;
    function exists(fsPath) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          yield exports2.stat(fsPath);
        } catch (err) {
          if (err.code === "ENOENT") {
            return false;
          }
          throw err;
        }
        return true;
      });
    }
    exports2.exists = exists;
    function isDirectory(fsPath, useStat = false) {
      return __awaiter(this, void 0, void 0, function* () {
        const stats = useStat
          ? yield exports2.stat(fsPath)
          : yield exports2.lstat(fsPath);
        return stats.isDirectory();
      });
    }
    exports2.isDirectory = isDirectory;
    function isRooted2(p) {
      p = normalizeSeparators2(p);
      if (!p) {
        throw new Error('isRooted() parameter "p" cannot be empty');
      }
      if (exports2.IS_WINDOWS) {
        return p.startsWith("\\") || /^[A-Z]:/i.test(p);
      }
      return p.startsWith("/");
    }
    exports2.isRooted = isRooted2;
    function tryGetExecutablePath(filePath, extensions) {
      return __awaiter(this, void 0, void 0, function* () {
        let stats = void 0;
        try {
          stats = yield exports2.stat(filePath);
        } catch (err) {
          if (err.code !== "ENOENT") {
            console.log(
              `Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`
            );
          }
        }
        if (stats && stats.isFile()) {
          if (exports2.IS_WINDOWS) {
            const upperExt = path2.extname(filePath).toUpperCase();
            if (
              extensions.some((validExt) => validExt.toUpperCase() === upperExt)
            ) {
              return filePath;
            }
          } else {
            if (isUnixExecutable(stats)) {
              return filePath;
            }
          }
        }
        const originalFilePath = filePath;
        for (const extension of extensions) {
          filePath = originalFilePath + extension;
          stats = void 0;
          try {
            stats = yield exports2.stat(filePath);
          } catch (err) {
            if (err.code !== "ENOENT") {
              console.log(
                `Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`
              );
            }
          }
          if (stats && stats.isFile()) {
            if (exports2.IS_WINDOWS) {
              try {
                const directory = path2.dirname(filePath);
                const upperName = path2.basename(filePath).toUpperCase();
                for (const actualName of yield exports2.readdir(directory)) {
                  if (upperName === actualName.toUpperCase()) {
                    filePath = path2.join(directory, actualName);
                    break;
                  }
                }
              } catch (err) {
                console.log(
                  `Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`
                );
              }
              return filePath;
            } else {
              if (isUnixExecutable(stats)) {
                return filePath;
              }
            }
          }
        }
        return "";
      });
    }
    exports2.tryGetExecutablePath = tryGetExecutablePath;
    function normalizeSeparators2(p) {
      p = p || "";
      if (exports2.IS_WINDOWS) {
        p = p.replace(/\//g, "\\");
        return p.replace(/\\\\+/g, "\\");
      }
      return p.replace(/\/\/+/g, "/");
    }
    function isUnixExecutable(stats) {
      return (
        (stats.mode & 1) > 0 ||
        ((stats.mode & 8) > 0 && stats.gid === process.getgid()) ||
        ((stats.mode & 64) > 0 && stats.uid === process.getuid())
      );
    }
    function getCmdPath() {
      var _a2;
      return (_a2 = process.env["COMSPEC"]) !== null && _a2 !== void 0
        ? _a2
        : `cmd.exe`;
    }
    exports2.getCmdPath = getCmdPath;
  },
});

// node_modules/@actions/io/lib/io.js
var require_io = __commonJS({
  "node_modules/@actions/io/lib/io.js"(exports2) {
    "use strict";
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    var __awaiter =
      (exports2 && exports2.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done
              ? resolve(result.value)
              : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.findInPath =
      exports2.which =
      exports2.mkdirP =
      exports2.rmRF =
      exports2.mv =
      exports2.cp =
        void 0;
    var assert_1 = require("assert");
    var path2 = __importStar(require("path"));
    var ioUtil = __importStar(require_io_util());
    function cp(source, dest, options = {}) {
      return __awaiter(this, void 0, void 0, function* () {
        const { force, recursive, copySourceDirectory } =
          readCopyOptions(options);
        const destStat = (yield ioUtil.exists(dest))
          ? yield ioUtil.stat(dest)
          : null;
        if (destStat && destStat.isFile() && !force) {
          return;
        }
        const newDest =
          destStat && destStat.isDirectory() && copySourceDirectory
            ? path2.join(dest, path2.basename(source))
            : dest;
        if (!(yield ioUtil.exists(source))) {
          throw new Error(`no such file or directory: ${source}`);
        }
        const sourceStat = yield ioUtil.stat(source);
        if (sourceStat.isDirectory()) {
          if (!recursive) {
            throw new Error(
              `Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`
            );
          } else {
            yield cpDirRecursive(source, newDest, 0, force);
          }
        } else {
          if (path2.relative(source, newDest) === "") {
            throw new Error(`'${newDest}' and '${source}' are the same file`);
          }
          yield copyFile(source, newDest, force);
        }
      });
    }
    exports2.cp = cp;
    function mv(source, dest, options = {}) {
      return __awaiter(this, void 0, void 0, function* () {
        if (yield ioUtil.exists(dest)) {
          let destExists = true;
          if (yield ioUtil.isDirectory(dest)) {
            dest = path2.join(dest, path2.basename(source));
            destExists = yield ioUtil.exists(dest);
          }
          if (destExists) {
            if (options.force == null || options.force) {
              yield rmRF(dest);
            } else {
              throw new Error("Destination already exists");
            }
          }
        }
        yield mkdirP(path2.dirname(dest));
        yield ioUtil.rename(source, dest);
      });
    }
    exports2.mv = mv;
    function rmRF(inputPath) {
      return __awaiter(this, void 0, void 0, function* () {
        if (ioUtil.IS_WINDOWS) {
          if (/[*"<>|]/.test(inputPath)) {
            throw new Error(
              'File path must not contain `*`, `"`, `<`, `>` or `|` on Windows'
            );
          }
        }
        try {
          yield ioUtil.rm(inputPath, {
            force: true,
            maxRetries: 3,
            recursive: true,
            retryDelay: 300,
          });
        } catch (err) {
          throw new Error(`File was unable to be removed ${err}`);
        }
      });
    }
    exports2.rmRF = rmRF;
    function mkdirP(fsPath) {
      return __awaiter(this, void 0, void 0, function* () {
        assert_1.ok(fsPath, "a path argument must be provided");
        yield ioUtil.mkdir(fsPath, { recursive: true });
      });
    }
    exports2.mkdirP = mkdirP;
    function which(tool, check) {
      return __awaiter(this, void 0, void 0, function* () {
        if (!tool) {
          throw new Error("parameter 'tool' is required");
        }
        if (check) {
          const result = yield which(tool, false);
          if (!result) {
            if (ioUtil.IS_WINDOWS) {
              throw new Error(
                `Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`
              );
            } else {
              throw new Error(
                `Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`
              );
            }
          }
          return result;
        }
        const matches = yield findInPath(tool);
        if (matches && matches.length > 0) {
          return matches[0];
        }
        return "";
      });
    }
    exports2.which = which;
    function findInPath(tool) {
      return __awaiter(this, void 0, void 0, function* () {
        if (!tool) {
          throw new Error("parameter 'tool' is required");
        }
        const extensions = [];
        if (ioUtil.IS_WINDOWS && process.env["PATHEXT"]) {
          for (const extension of process.env["PATHEXT"].split(
            path2.delimiter
          )) {
            if (extension) {
              extensions.push(extension);
            }
          }
        }
        if (ioUtil.isRooted(tool)) {
          const filePath = yield ioUtil.tryGetExecutablePath(tool, extensions);
          if (filePath) {
            return [filePath];
          }
          return [];
        }
        if (tool.includes(path2.sep)) {
          return [];
        }
        const directories = [];
        if (process.env.PATH) {
          for (const p of process.env.PATH.split(path2.delimiter)) {
            if (p) {
              directories.push(p);
            }
          }
        }
        const matches = [];
        for (const directory of directories) {
          const filePath = yield ioUtil.tryGetExecutablePath(
            path2.join(directory, tool),
            extensions
          );
          if (filePath) {
            matches.push(filePath);
          }
        }
        return matches;
      });
    }
    exports2.findInPath = findInPath;
    function readCopyOptions(options) {
      const force = options.force == null ? true : options.force;
      const recursive = Boolean(options.recursive);
      const copySourceDirectory =
        options.copySourceDirectory == null
          ? true
          : Boolean(options.copySourceDirectory);
      return { force, recursive, copySourceDirectory };
    }
    function cpDirRecursive(sourceDir, destDir, currentDepth, force) {
      return __awaiter(this, void 0, void 0, function* () {
        if (currentDepth >= 255) return;
        currentDepth++;
        yield mkdirP(destDir);
        const files = yield ioUtil.readdir(sourceDir);
        for (const fileName of files) {
          const srcFile = `${sourceDir}/${fileName}`;
          const destFile = `${destDir}/${fileName}`;
          const srcFileStat = yield ioUtil.lstat(srcFile);
          if (srcFileStat.isDirectory()) {
            yield cpDirRecursive(srcFile, destFile, currentDepth, force);
          } else {
            yield copyFile(srcFile, destFile, force);
          }
        }
        yield ioUtil.chmod(destDir, (yield ioUtil.stat(sourceDir)).mode);
      });
    }
    function copyFile(srcFile, destFile, force) {
      return __awaiter(this, void 0, void 0, function* () {
        if ((yield ioUtil.lstat(srcFile)).isSymbolicLink()) {
          try {
            yield ioUtil.lstat(destFile);
            yield ioUtil.unlink(destFile);
          } catch (e) {
            if (e.code === "EPERM") {
              yield ioUtil.chmod(destFile, "0666");
              yield ioUtil.unlink(destFile);
            }
          }
          const symlinkFull = yield ioUtil.readlink(srcFile);
          yield ioUtil.symlink(
            symlinkFull,
            destFile,
            ioUtil.IS_WINDOWS ? "junction" : null
          );
        } else if (!(yield ioUtil.exists(destFile)) || force) {
          yield ioUtil.copyFile(srcFile, destFile);
        }
      });
    }
  },
});

// node_modules/@actions/exec/lib/toolrunner.js
var require_toolrunner = __commonJS({
  "node_modules/@actions/exec/lib/toolrunner.js"(exports2) {
    "use strict";
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    var __awaiter =
      (exports2 && exports2.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done
              ? resolve(result.value)
              : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.argStringToArray = exports2.ToolRunner = void 0;
    var os2 = __importStar(require("os"));
    var events = __importStar(require("events"));
    var child = __importStar(require("child_process"));
    var path2 = __importStar(require("path"));
    var io = __importStar(require_io());
    var ioUtil = __importStar(require_io_util());
    var timers_1 = require("timers");
    var IS_WINDOWS = process.platform === "win32";
    var ToolRunner = class extends events.EventEmitter {
      constructor(toolPath, args, options) {
        super();
        if (!toolPath) {
          throw new Error("Parameter 'toolPath' cannot be null or empty.");
        }
        this.toolPath = toolPath;
        this.args = args || [];
        this.options = options || {};
      }
      _debug(message) {
        if (this.options.listeners && this.options.listeners.debug) {
          this.options.listeners.debug(message);
        }
      }
      _getCommandString(options, noPrefix) {
        const toolPath = this._getSpawnFileName();
        const args = this._getSpawnArgs(options);
        let cmd = noPrefix ? "" : "[command]";
        if (IS_WINDOWS) {
          if (this._isCmdFile()) {
            cmd += toolPath;
            for (const a of args) {
              cmd += ` ${a}`;
            }
          } else if (options.windowsVerbatimArguments) {
            cmd += `"${toolPath}"`;
            for (const a of args) {
              cmd += ` ${a}`;
            }
          } else {
            cmd += this._windowsQuoteCmdArg(toolPath);
            for (const a of args) {
              cmd += ` ${this._windowsQuoteCmdArg(a)}`;
            }
          }
        } else {
          cmd += toolPath;
          for (const a of args) {
            cmd += ` ${a}`;
          }
        }
        return cmd;
      }
      _processLineBuffer(data, strBuffer, onLine) {
        try {
          let s = strBuffer + data.toString();
          let n = s.indexOf(os2.EOL);
          while (n > -1) {
            const line = s.substring(0, n);
            onLine(line);
            s = s.substring(n + os2.EOL.length);
            n = s.indexOf(os2.EOL);
          }
          return s;
        } catch (err) {
          this._debug(`error processing line. Failed with error ${err}`);
          return "";
        }
      }
      _getSpawnFileName() {
        if (IS_WINDOWS) {
          if (this._isCmdFile()) {
            return process.env["COMSPEC"] || "cmd.exe";
          }
        }
        return this.toolPath;
      }
      _getSpawnArgs(options) {
        if (IS_WINDOWS) {
          if (this._isCmdFile()) {
            let argline = `/D /S /C "${this._windowsQuoteCmdArg(
              this.toolPath
            )}`;
            for (const a of this.args) {
              argline += " ";
              argline += options.windowsVerbatimArguments
                ? a
                : this._windowsQuoteCmdArg(a);
            }
            argline += '"';
            return [argline];
          }
        }
        return this.args;
      }
      _endsWith(str, end) {
        return str.endsWith(end);
      }
      _isCmdFile() {
        const upperToolPath = this.toolPath.toUpperCase();
        return (
          this._endsWith(upperToolPath, ".CMD") ||
          this._endsWith(upperToolPath, ".BAT")
        );
      }
      _windowsQuoteCmdArg(arg) {
        if (!this._isCmdFile()) {
          return this._uvQuoteCmdArg(arg);
        }
        if (!arg) {
          return '""';
        }
        const cmdSpecialChars = [
          " ",
          "	",
          "&",
          "(",
          ")",
          "[",
          "]",
          "{",
          "}",
          "^",
          "=",
          ";",
          "!",
          "'",
          "+",
          ",",
          "`",
          "~",
          "|",
          "<",
          ">",
          '"',
        ];
        let needsQuotes = false;
        for (const char of arg) {
          if (cmdSpecialChars.some((x) => x === char)) {
            needsQuotes = true;
            break;
          }
        }
        if (!needsQuotes) {
          return arg;
        }
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
          reverse += arg[i - 1];
          if (quoteHit && arg[i - 1] === "\\") {
            reverse += "\\";
          } else if (arg[i - 1] === '"') {
            quoteHit = true;
            reverse += '"';
          } else {
            quoteHit = false;
          }
        }
        reverse += '"';
        return reverse.split("").reverse().join("");
      }
      _uvQuoteCmdArg(arg) {
        if (!arg) {
          return '""';
        }
        if (!arg.includes(" ") && !arg.includes("	") && !arg.includes('"')) {
          return arg;
        }
        if (!arg.includes('"') && !arg.includes("\\")) {
          return `"${arg}"`;
        }
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
          reverse += arg[i - 1];
          if (quoteHit && arg[i - 1] === "\\") {
            reverse += "\\";
          } else if (arg[i - 1] === '"') {
            quoteHit = true;
            reverse += "\\";
          } else {
            quoteHit = false;
          }
        }
        reverse += '"';
        return reverse.split("").reverse().join("");
      }
      _cloneExecOptions(options) {
        options = options || {};
        const result = {
          cwd: options.cwd || process.cwd(),
          env: options.env || process.env,
          silent: options.silent || false,
          windowsVerbatimArguments: options.windowsVerbatimArguments || false,
          failOnStdErr: options.failOnStdErr || false,
          ignoreReturnCode: options.ignoreReturnCode || false,
          delay: options.delay || 1e4,
        };
        result.outStream = options.outStream || process.stdout;
        result.errStream = options.errStream || process.stderr;
        return result;
      }
      _getSpawnOptions(options, toolPath) {
        options = options || {};
        const result = {};
        result.cwd = options.cwd;
        result.env = options.env;
        result["windowsVerbatimArguments"] =
          options.windowsVerbatimArguments || this._isCmdFile();
        if (options.windowsVerbatimArguments) {
          result.argv0 = `"${toolPath}"`;
        }
        return result;
      }
      /**
       * Exec a tool.
       * Output will be streamed to the live console.
       * Returns promise with return code
       *
       * @param     tool     path to tool to exec
       * @param     options  optional exec options.  See ExecOptions
       * @returns   number
       */
      exec() {
        return __awaiter(this, void 0, void 0, function* () {
          if (
            !ioUtil.isRooted(this.toolPath) &&
            (this.toolPath.includes("/") ||
              (IS_WINDOWS && this.toolPath.includes("\\")))
          ) {
            this.toolPath = path2.resolve(
              process.cwd(),
              this.options.cwd || process.cwd(),
              this.toolPath
            );
          }
          this.toolPath = yield io.which(this.toolPath, true);
          return new Promise((resolve, reject) =>
            __awaiter(this, void 0, void 0, function* () {
              this._debug(`exec tool: ${this.toolPath}`);
              this._debug("arguments:");
              for (const arg of this.args) {
                this._debug(`   ${arg}`);
              }
              const optionsNonNull = this._cloneExecOptions(this.options);
              if (!optionsNonNull.silent && optionsNonNull.outStream) {
                optionsNonNull.outStream.write(
                  this._getCommandString(optionsNonNull) + os2.EOL
                );
              }
              const state = new ExecState(optionsNonNull, this.toolPath);
              state.on("debug", (message) => {
                this._debug(message);
              });
              if (
                this.options.cwd &&
                !(yield ioUtil.exists(this.options.cwd))
              ) {
                return reject(
                  new Error(`The cwd: ${this.options.cwd} does not exist!`)
                );
              }
              const fileName = this._getSpawnFileName();
              const cp = child.spawn(
                fileName,
                this._getSpawnArgs(optionsNonNull),
                this._getSpawnOptions(this.options, fileName)
              );
              let stdbuffer = "";
              if (cp.stdout) {
                cp.stdout.on("data", (data) => {
                  if (this.options.listeners && this.options.listeners.stdout) {
                    this.options.listeners.stdout(data);
                  }
                  if (!optionsNonNull.silent && optionsNonNull.outStream) {
                    optionsNonNull.outStream.write(data);
                  }
                  stdbuffer = this._processLineBuffer(
                    data,
                    stdbuffer,
                    (line) => {
                      if (
                        this.options.listeners &&
                        this.options.listeners.stdline
                      ) {
                        this.options.listeners.stdline(line);
                      }
                    }
                  );
                });
              }
              let errbuffer = "";
              if (cp.stderr) {
                cp.stderr.on("data", (data) => {
                  state.processStderr = true;
                  if (this.options.listeners && this.options.listeners.stderr) {
                    this.options.listeners.stderr(data);
                  }
                  if (
                    !optionsNonNull.silent &&
                    optionsNonNull.errStream &&
                    optionsNonNull.outStream
                  ) {
                    const s = optionsNonNull.failOnStdErr
                      ? optionsNonNull.errStream
                      : optionsNonNull.outStream;
                    s.write(data);
                  }
                  errbuffer = this._processLineBuffer(
                    data,
                    errbuffer,
                    (line) => {
                      if (
                        this.options.listeners &&
                        this.options.listeners.errline
                      ) {
                        this.options.listeners.errline(line);
                      }
                    }
                  );
                });
              }
              cp.on("error", (err) => {
                state.processError = err.message;
                state.processExited = true;
                state.processClosed = true;
                state.CheckComplete();
              });
              cp.on("exit", (code) => {
                state.processExitCode = code;
                state.processExited = true;
                this._debug(
                  `Exit code ${code} received from tool '${this.toolPath}'`
                );
                state.CheckComplete();
              });
              cp.on("close", (code) => {
                state.processExitCode = code;
                state.processExited = true;
                state.processClosed = true;
                this._debug(
                  `STDIO streams have closed for tool '${this.toolPath}'`
                );
                state.CheckComplete();
              });
              state.on("done", (error, exitCode) => {
                if (stdbuffer.length > 0) {
                  this.emit("stdline", stdbuffer);
                }
                if (errbuffer.length > 0) {
                  this.emit("errline", errbuffer);
                }
                cp.removeAllListeners();
                if (error) {
                  reject(error);
                } else {
                  resolve(exitCode);
                }
              });
              if (this.options.input) {
                if (!cp.stdin) {
                  throw new Error("child process missing stdin");
                }
                cp.stdin.end(this.options.input);
              }
            })
          );
        });
      }
    };
    exports2.ToolRunner = ToolRunner;
    function argStringToArray(argString) {
      const args = [];
      let inQuotes = false;
      let escaped = false;
      let arg = "";
      function append(c) {
        if (escaped && c !== '"') {
          arg += "\\";
        }
        arg += c;
        escaped = false;
      }
      for (let i = 0; i < argString.length; i++) {
        const c = argString.charAt(i);
        if (c === '"') {
          if (!escaped) {
            inQuotes = !inQuotes;
          } else {
            append(c);
          }
          continue;
        }
        if (c === "\\" && escaped) {
          append(c);
          continue;
        }
        if (c === "\\" && inQuotes) {
          escaped = true;
          continue;
        }
        if (c === " " && !inQuotes) {
          if (arg.length > 0) {
            args.push(arg);
            arg = "";
          }
          continue;
        }
        append(c);
      }
      if (arg.length > 0) {
        args.push(arg.trim());
      }
      return args;
    }
    exports2.argStringToArray = argStringToArray;
    var ExecState = class _ExecState extends events.EventEmitter {
      constructor(options, toolPath) {
        super();
        this.processClosed = false;
        this.processError = "";
        this.processExitCode = 0;
        this.processExited = false;
        this.processStderr = false;
        this.delay = 1e4;
        this.done = false;
        this.timeout = null;
        if (!toolPath) {
          throw new Error("toolPath must not be empty");
        }
        this.options = options;
        this.toolPath = toolPath;
        if (options.delay) {
          this.delay = options.delay;
        }
      }
      CheckComplete() {
        if (this.done) {
          return;
        }
        if (this.processClosed) {
          this._setResult();
        } else if (this.processExited) {
          this.timeout = timers_1.setTimeout(
            _ExecState.HandleTimeout,
            this.delay,
            this
          );
        }
      }
      _debug(message) {
        this.emit("debug", message);
      }
      _setResult() {
        let error;
        if (this.processExited) {
          if (this.processError) {
            error = new Error(
              `There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`
            );
          } else if (
            this.processExitCode !== 0 &&
            !this.options.ignoreReturnCode
          ) {
            error = new Error(
              `The process '${this.toolPath}' failed with exit code ${this.processExitCode}`
            );
          } else if (this.processStderr && this.options.failOnStdErr) {
            error = new Error(
              `The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`
            );
          }
        }
        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }
        this.done = true;
        this.emit("done", error, this.processExitCode);
      }
      static HandleTimeout(state) {
        if (state.done) {
          return;
        }
        if (!state.processClosed && state.processExited) {
          const message = `The STDIO streams did not close within ${
            state.delay / 1e3
          } seconds of the exit event from process '${
            state.toolPath
          }'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
          state._debug(message);
        }
        state._setResult();
      }
    };
  },
});

// node_modules/@actions/exec/lib/exec.js
var require_exec = __commonJS({
  "node_modules/@actions/exec/lib/exec.js"(exports2) {
    "use strict";
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    var __awaiter =
      (exports2 && exports2.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done
              ? resolve(result.value)
              : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getExecOutput = exports2.exec = void 0;
    var string_decoder_1 = require("string_decoder");
    var tr = __importStar(require_toolrunner());
    function exec(commandLine, args, options) {
      return __awaiter(this, void 0, void 0, function* () {
        const commandArgs = tr.argStringToArray(commandLine);
        if (commandArgs.length === 0) {
          throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
        }
        const toolPath = commandArgs[0];
        args = commandArgs.slice(1).concat(args || []);
        const runner = new tr.ToolRunner(toolPath, args, options);
        return runner.exec();
      });
    }
    exports2.exec = exec;
    function getExecOutput(commandLine, args, options) {
      var _a, _b;
      return __awaiter(this, void 0, void 0, function* () {
        let stdout = "";
        let stderr = "";
        const stdoutDecoder = new string_decoder_1.StringDecoder("utf8");
        const stderrDecoder = new string_decoder_1.StringDecoder("utf8");
        const originalStdoutListener =
          (_a =
            options === null || options === void 0
              ? void 0
              : options.listeners) === null || _a === void 0
            ? void 0
            : _a.stdout;
        const originalStdErrListener =
          (_b =
            options === null || options === void 0
              ? void 0
              : options.listeners) === null || _b === void 0
            ? void 0
            : _b.stderr;
        const stdErrListener = (data) => {
          stderr += stderrDecoder.write(data);
          if (originalStdErrListener) {
            originalStdErrListener(data);
          }
        };
        const stdOutListener = (data) => {
          stdout += stdoutDecoder.write(data);
          if (originalStdoutListener) {
            originalStdoutListener(data);
          }
        };
        const listeners = Object.assign(
          Object.assign(
            {},
            options === null || options === void 0 ? void 0 : options.listeners
          ),
          { stdout: stdOutListener, stderr: stdErrListener }
        );
        const exitCode = yield exec(
          commandLine,
          args,
          Object.assign(Object.assign({}, options), { listeners })
        );
        stdout += stdoutDecoder.end();
        stderr += stderrDecoder.end();
        return {
          exitCode,
          stdout,
          stderr,
        };
      });
    }
    exports2.getExecOutput = getExecOutput;
  },
});

// node_modules/@actions/core/lib/platform.js
var require_platform = __commonJS({
  "node_modules/@actions/core/lib/platform.js"(exports2) {
    "use strict";
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            var desc = Object.getOwnPropertyDescriptor(m, k);
            if (
              !desc ||
              ("get" in desc
                ? !m.__esModule
                : desc.writable || desc.configurable)
            ) {
              desc = {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              };
            }
            Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    var __awaiter =
      (exports2 && exports2.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done
              ? resolve(result.value)
              : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    var __importDefault =
      (exports2 && exports2.__importDefault) ||
      function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getDetails =
      exports2.isLinux =
      exports2.isMacOS =
      exports2.isWindows =
      exports2.arch =
      exports2.platform =
        void 0;
    var os_1 = __importDefault(require("os"));
    var exec = __importStar(require_exec());
    var getWindowsInfo = () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const { stdout: version } = yield exec.getExecOutput(
          'powershell -command "(Get-CimInstance -ClassName Win32_OperatingSystem).Version"',
          void 0,
          {
            silent: true,
          }
        );
        const { stdout: name } = yield exec.getExecOutput(
          'powershell -command "(Get-CimInstance -ClassName Win32_OperatingSystem).Caption"',
          void 0,
          {
            silent: true,
          }
        );
        return {
          name: name.trim(),
          version: version.trim(),
        };
      });
    var getMacOsInfo = () =>
      __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const { stdout } = yield exec.getExecOutput("sw_vers", void 0, {
          silent: true,
        });
        const version =
          (_b =
            (_a = stdout.match(/ProductVersion:\s*(.+)/)) === null ||
            _a === void 0
              ? void 0
              : _a[1]) !== null && _b !== void 0
            ? _b
            : "";
        const name =
          (_d =
            (_c = stdout.match(/ProductName:\s*(.+)/)) === null || _c === void 0
              ? void 0
              : _c[1]) !== null && _d !== void 0
            ? _d
            : "";
        return {
          name,
          version,
        };
      });
    var getLinuxInfo = () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const { stdout } = yield exec.getExecOutput(
          "lsb_release",
          ["-i", "-r", "-s"],
          {
            silent: true,
          }
        );
        const [name, version] = stdout.trim().split("\n");
        return {
          name,
          version,
        };
      });
    exports2.platform = os_1.default.platform();
    exports2.arch = os_1.default.arch();
    exports2.isWindows = exports2.platform === "win32";
    exports2.isMacOS = exports2.platform === "darwin";
    exports2.isLinux = exports2.platform === "linux";
    function getDetails() {
      return __awaiter(this, void 0, void 0, function* () {
        return Object.assign(
          Object.assign(
            {},
            yield exports2.isWindows
              ? getWindowsInfo()
              : exports2.isMacOS
              ? getMacOsInfo()
              : getLinuxInfo()
          ),
          {
            platform: exports2.platform,
            arch: exports2.arch,
            isWindows: exports2.isWindows,
            isMacOS: exports2.isMacOS,
            isLinux: exports2.isLinux,
          }
        );
      });
    }
    exports2.getDetails = getDetails;
  },
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS({
  "node_modules/@actions/core/lib/core.js"(exports2) {
    "use strict";
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            var desc = Object.getOwnPropertyDescriptor(m, k);
            if (
              !desc ||
              ("get" in desc
                ? !m.__esModule
                : desc.writable || desc.configurable)
            ) {
              desc = {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              };
            }
            Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    var __awaiter =
      (exports2 && exports2.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done
              ? resolve(result.value)
              : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.platform =
      exports2.toPlatformPath =
      exports2.toWin32Path =
      exports2.toPosixPath =
      exports2.markdownSummary =
      exports2.summary =
      exports2.getIDToken =
      exports2.getState =
      exports2.saveState =
      exports2.group =
      exports2.endGroup =
      exports2.startGroup =
      exports2.info =
      exports2.notice =
      exports2.warning =
      exports2.error =
      exports2.debug =
      exports2.isDebug =
      exports2.setFailed =
      exports2.setCommandEcho =
      exports2.setOutput =
      exports2.getBooleanInput =
      exports2.getMultilineInput =
      exports2.getInput =
      exports2.addPath =
      exports2.setSecret =
      exports2.exportVariable =
      exports2.ExitCode =
        void 0;
    var command_1 = require_command();
    var file_command_1 = require_file_command();
    var utils_1 = require_utils();
    var os2 = __importStar(require("os"));
    var path2 = __importStar(require("path"));
    var oidc_utils_1 = require_oidc_utils();
    var ExitCode;
    (function (ExitCode2) {
      ExitCode2[(ExitCode2["Success"] = 0)] = "Success";
      ExitCode2[(ExitCode2["Failure"] = 1)] = "Failure";
    })(ExitCode || (exports2.ExitCode = ExitCode = {}));
    function exportVariable(name, val) {
      const convertedVal = (0, utils_1.toCommandValue)(val);
      process.env[name] = convertedVal;
      const filePath = process.env["GITHUB_ENV"] || "";
      if (filePath) {
        return (0, file_command_1.issueFileCommand)(
          "ENV",
          (0, file_command_1.prepareKeyValueMessage)(name, val)
        );
      }
      (0, command_1.issueCommand)("set-env", { name }, convertedVal);
    }
    exports2.exportVariable = exportVariable;
    function setSecret(secret) {
      (0, command_1.issueCommand)("add-mask", {}, secret);
    }
    exports2.setSecret = setSecret;
    function addPath(inputPath) {
      const filePath = process.env["GITHUB_PATH"] || "";
      if (filePath) {
        (0, file_command_1.issueFileCommand)("PATH", inputPath);
      } else {
        (0, command_1.issueCommand)("add-path", {}, inputPath);
      }
      process.env[
        "PATH"
      ] = `${inputPath}${path2.delimiter}${process.env["PATH"]}`;
    }
    exports2.addPath = addPath;
    function getInput(name, options) {
      const val =
        process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
      }
      if (options && options.trimWhitespace === false) {
        return val;
      }
      return val.trim();
    }
    exports2.getInput = getInput;
    function getMultilineInput(name, options) {
      const inputs = getInput(name, options)
        .split("\n")
        .filter((x) => x !== "");
      if (options && options.trimWhitespace === false) {
        return inputs;
      }
      return inputs.map((input) => input.trim());
    }
    exports2.getMultilineInput = getMultilineInput;
    function getBooleanInput(name, options) {
      const trueValue = ["true", "True", "TRUE"];
      const falseValue = ["false", "False", "FALSE"];
      const val = getInput(name, options);
      if (trueValue.includes(val)) return true;
      if (falseValue.includes(val)) return false;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    exports2.getBooleanInput = getBooleanInput;
    function setOutput(name, value) {
      const filePath = process.env["GITHUB_OUTPUT"] || "";
      if (filePath) {
        return (0, file_command_1.issueFileCommand)(
          "OUTPUT",
          (0, file_command_1.prepareKeyValueMessage)(name, value)
        );
      }
      process.stdout.write(os2.EOL);
      (0, command_1.issueCommand)(
        "set-output",
        { name },
        (0, utils_1.toCommandValue)(value)
      );
    }
    exports2.setOutput = setOutput;
    function setCommandEcho(enabled) {
      (0, command_1.issue)("echo", enabled ? "on" : "off");
    }
    exports2.setCommandEcho = setCommandEcho;
    function setFailed(message) {
      process.exitCode = ExitCode.Failure;
      error(message);
    }
    exports2.setFailed = setFailed;
    function isDebug() {
      return process.env["RUNNER_DEBUG"] === "1";
    }
    exports2.isDebug = isDebug;
    function debug(message) {
      (0, command_1.issueCommand)("debug", {}, message);
    }
    exports2.debug = debug;
    function error(message, properties = {}) {
      (0, command_1.issueCommand)(
        "error",
        (0, utils_1.toCommandProperties)(properties),
        message instanceof Error ? message.toString() : message
      );
    }
    exports2.error = error;
    function warning(message, properties = {}) {
      (0, command_1.issueCommand)(
        "warning",
        (0, utils_1.toCommandProperties)(properties),
        message instanceof Error ? message.toString() : message
      );
    }
    exports2.warning = warning;
    function notice(message, properties = {}) {
      (0, command_1.issueCommand)(
        "notice",
        (0, utils_1.toCommandProperties)(properties),
        message instanceof Error ? message.toString() : message
      );
    }
    exports2.notice = notice;
    function info(message) {
      process.stdout.write(message + os2.EOL);
    }
    exports2.info = info;
    function startGroup(name) {
      (0, command_1.issue)("group", name);
    }
    exports2.startGroup = startGroup;
    function endGroup() {
      (0, command_1.issue)("endgroup");
    }
    exports2.endGroup = endGroup;
    function group(name, fn) {
      return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
          result = yield fn();
        } finally {
          endGroup();
        }
        return result;
      });
    }
    exports2.group = group;
    function saveState(name, value) {
      const filePath = process.env["GITHUB_STATE"] || "";
      if (filePath) {
        return (0, file_command_1.issueFileCommand)(
          "STATE",
          (0, file_command_1.prepareKeyValueMessage)(name, value)
        );
      }
      (0, command_1.issueCommand)(
        "save-state",
        { name },
        (0, utils_1.toCommandValue)(value)
      );
    }
    exports2.saveState = saveState;
    function getState(name) {
      return process.env[`STATE_${name}`] || "";
    }
    exports2.getState = getState;
    function getIDToken(aud) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
      });
    }
    exports2.getIDToken = getIDToken;
    var summary_1 = require_summary();
    Object.defineProperty(exports2, "summary", {
      enumerable: true,
      get: function () {
        return summary_1.summary;
      },
    });
    var summary_2 = require_summary();
    Object.defineProperty(exports2, "markdownSummary", {
      enumerable: true,
      get: function () {
        return summary_2.markdownSummary;
      },
    });
    var path_utils_1 = require_path_utils();
    Object.defineProperty(exports2, "toPosixPath", {
      enumerable: true,
      get: function () {
        return path_utils_1.toPosixPath;
      },
    });
    Object.defineProperty(exports2, "toWin32Path", {
      enumerable: true,
      get: function () {
        return path_utils_1.toWin32Path;
      },
    });
    Object.defineProperty(exports2, "toPlatformPath", {
      enumerable: true,
      get: function () {
        return path_utils_1.toPlatformPath;
      },
    });
    exports2.platform = __importStar(require_platform());
  },
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports2, module2) {
    if (typeof Object.create === "function") {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true,
            },
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function () {};
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  },
});

// node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "node_modules/inherits/inherits.js"(exports2, module2) {
    try {
      util = require("util");
      if (typeof util.inherits !== "function") throw "";
      module2.exports = util.inherits;
    } catch (e) {
      module2.exports = require_inherits_browser();
    }
    var util;
  },
});

// node_modules/ltx/lib/escape.js
var require_escape = __commonJS({
  "node_modules/ltx/lib/escape.js"(exports2) {
    "use strict";
    var escapeXMLTable = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
    };
    function escapeXMLReplace(match3) {
      return escapeXMLTable[match3];
    }
    var unescapeXMLTable = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&apos;": "'",
    };
    function unescapeXMLReplace(match3) {
      if (match3[1] === "#") {
        var num;
        if (match3[2] === "x") {
          num = parseInt(match3.slice(3), 16);
        } else {
          num = parseInt(match3.slice(2), 10);
        }
        if (
          num === 9 ||
          num === 10 ||
          num === 13 ||
          (num >= 32 && num <= 55295) ||
          (num >= 57344 && num <= 65533) ||
          (num >= 65536 && num <= 1114111)
        ) {
          return String.fromCodePoint(num);
        }
        throw new Error("Illegal XML character 0x" + num.toString(16));
      }
      if (unescapeXMLTable[match3]) {
        return unescapeXMLTable[match3] || match3;
      }
      throw new Error("Illegal XML entity " + match3);
    }
    exports2.escapeXML = function escapeXML(s) {
      return s.replace(/&|<|>|"|'/g, escapeXMLReplace);
    };
    exports2.unescapeXML = function unescapeXML(s) {
      var result = "";
      var start = -1;
      var end = -1;
      var previous = 0;
      while (
        (start = s.indexOf("&", previous)) !== -1 &&
        (end = s.indexOf(";", start + 1)) !== -1
      ) {
        result =
          result +
          s.substring(previous, start) +
          unescapeXMLReplace(s.substring(start, end + 1));
        previous = end + 1;
      }
      if (previous === 0) return s;
      result = result + s.substring(previous);
      return result;
    };
    exports2.escapeXMLText = function escapeXMLText(s) {
      return s.replace(/&|<|>/g, escapeXMLReplace);
    };
    exports2.unescapeXMLText = function unescapeXMLText(s) {
      return s.replace(/&(amp|#38|lt|#60|gt|#62);/g, unescapeXMLReplace);
    };
  },
});

// node_modules/ltx/lib/equal.js
var require_equal = __commonJS({
  "node_modules/ltx/lib/equal.js"(exports2, module2) {
    "use strict";
    function nameEqual(a, b) {
      return a.name === b.name;
    }
    function attrsEqual(a, b) {
      var attrs = a.attrs;
      var keys = Object.keys(attrs);
      var length = keys.length;
      if (length !== Object.keys(b.attrs).length) return false;
      for (var i = 0, l = length; i < l; i++) {
        var key = keys[i];
        var value = attrs[key];
        if (value == null || b.attrs[key] == null) {
          if (value !== b.attrs[key]) return false;
        } else if (value.toString() !== b.attrs[key].toString()) {
          return false;
        }
      }
      return true;
    }
    function childrenEqual(a, b) {
      var children = a.children;
      var length = children.length;
      if (length !== b.children.length) return false;
      for (var i = 0, l = length; i < l; i++) {
        var child = children[i];
        if (typeof child === "string") {
          if (child !== b.children[i]) return false;
        } else {
          if (!child.equals(b.children[i])) return false;
        }
      }
      return true;
    }
    function equal(a, b) {
      if (!nameEqual(a, b)) return false;
      if (!attrsEqual(a, b)) return false;
      if (!childrenEqual(a, b)) return false;
      return true;
    }
    module2.exports.name = nameEqual;
    module2.exports.attrs = attrsEqual;
    module2.exports.children = childrenEqual;
    module2.exports.equal = equal;
  },
});

// node_modules/ltx/lib/clone.js
var require_clone = __commonJS({
  "node_modules/ltx/lib/clone.js"(exports2, module2) {
    "use strict";
    module2.exports = function clone(el) {
      var clone2 = new el.constructor(el.name, el.attrs);
      for (var i = 0; i < el.children.length; i++) {
        var child = el.children[i];
        clone2.cnode(child.clone ? child.clone() : child);
      }
      return clone2;
    };
  },
});

// node_modules/ltx/lib/Element.js
var require_Element = __commonJS({
  "node_modules/ltx/lib/Element.js"(exports2, module2) {
    "use strict";
    var escape = require_escape();
    var escapeXML = escape.escapeXML;
    var escapeXMLText = escape.escapeXMLText;
    var equality = require_equal();
    var equal = equality.equal;
    var nameEqual = equality.name;
    var attrsEqual = equality.attrs;
    var childrenEqual = equality.children;
    var clone = require_clone();
    function Element(name, attrs) {
      this.name = name;
      this.parent = null;
      this.children = [];
      this.attrs = {};
      this.setAttrs(attrs);
    }
    Element.prototype.is = function (name, xmlns) {
      return this.getName() === name && (!xmlns || this.getNS() === xmlns);
    };
    Element.prototype.getName = function () {
      if (this.name.indexOf(":") >= 0) {
        return this.name.substr(this.name.indexOf(":") + 1);
      } else {
        return this.name;
      }
    };
    Element.prototype.getNS = function () {
      if (this.name.indexOf(":") >= 0) {
        var prefix = this.name.substr(0, this.name.indexOf(":"));
        return this.findNS(prefix);
      }
      return this.findNS();
    };
    Element.prototype.findNS = function (prefix) {
      if (!prefix) {
        if (this.attrs.xmlns) {
          return this.attrs.xmlns;
        } else if (this.parent) {
          return this.parent.findNS();
        }
      } else {
        var attr = "xmlns:" + prefix;
        if (this.attrs[attr]) {
          return this.attrs[attr];
        } else if (this.parent) {
          return this.parent.findNS(prefix);
        }
      }
    };
    Element.prototype.getXmlns = function () {
      var namespaces = {};
      if (this.parent) {
        namespaces = this.parent.getXmlns();
      }
      for (var attr in this.attrs) {
        var m = attr.match("xmlns:?(.*)");
        if (this.attrs.hasOwnProperty(attr) && m) {
          namespaces[this.attrs[attr]] = m[1];
        }
      }
      return namespaces;
    };
    Element.prototype.setAttrs = function (attrs) {
      if (typeof attrs === "string") {
        this.attrs.xmlns = attrs;
      } else if (attrs) {
        Object.keys(attrs).forEach(function (key) {
          this.attrs[key] = attrs[key];
        }, this);
      }
    };
    Element.prototype.getAttr = function (name, xmlns) {
      if (!xmlns) {
        return this.attrs[name];
      }
      var namespaces = this.getXmlns();
      if (!namespaces[xmlns]) {
        return null;
      }
      return this.attrs[[namespaces[xmlns], name].join(":")];
    };
    Element.prototype.getChild = function (name, xmlns) {
      return this.getChildren(name, xmlns)[0];
    };
    Element.prototype.getChildren = function (name, xmlns) {
      var result = [];
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        if (
          child.getName &&
          child.getName() === name &&
          (!xmlns || child.getNS() === xmlns)
        ) {
          result.push(child);
        }
      }
      return result;
    };
    Element.prototype.getChildByAttr = function (attr, val, xmlns, recursive) {
      return this.getChildrenByAttr(attr, val, xmlns, recursive)[0];
    };
    Element.prototype.getChildrenByAttr = function (
      attr,
      val,
      xmlns,
      recursive
    ) {
      var result = [];
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        if (
          child.attrs &&
          child.attrs[attr] === val &&
          (!xmlns || child.getNS() === xmlns)
        ) {
          result.push(child);
        }
        if (recursive && child.getChildrenByAttr) {
          result.push(child.getChildrenByAttr(attr, val, xmlns, true));
        }
      }
      if (recursive) {
        result = [].concat.apply([], result);
      }
      return result;
    };
    Element.prototype.getChildrenByFilter = function (filter, recursive) {
      var result = [];
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        if (filter(child)) {
          result.push(child);
        }
        if (recursive && child.getChildrenByFilter) {
          result.push(child.getChildrenByFilter(filter, true));
        }
      }
      if (recursive) {
        result = [].concat.apply([], result);
      }
      return result;
    };
    Element.prototype.getText = function () {
      var text = "";
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        if (typeof child === "string" || typeof child === "number") {
          text += child;
        }
      }
      return text;
    };
    Element.prototype.getChildText = function (name, xmlns) {
      var child = this.getChild(name, xmlns);
      return child ? child.getText() : null;
    };
    Element.prototype.getChildElements = function () {
      return this.getChildrenByFilter(function (child) {
        return child instanceof Element;
      });
    };
    Element.prototype.root = function () {
      if (this.parent) {
        return this.parent.root();
      }
      return this;
    };
    Element.prototype.tree = Element.prototype.root;
    Element.prototype.up = function () {
      if (this.parent) {
        return this.parent;
      }
      return this;
    };
    Element.prototype.c = function (name, attrs) {
      return this.cnode(new Element(name, attrs));
    };
    Element.prototype.cnode = function (child) {
      this.children.push(child);
      if (typeof child === "object") {
        child.parent = this;
      }
      return child;
    };
    Element.prototype.t = function (text) {
      this.children.push(text);
      return this;
    };
    Element.prototype.remove = function (el, xmlns) {
      var filter;
      if (typeof el === "string") {
        filter = function (child) {
          return !(child.is && child.is(el, xmlns));
        };
      } else {
        filter = function (child) {
          return child !== el;
        };
      }
      this.children = this.children.filter(filter);
      return this;
    };
    Element.prototype.clone = function () {
      return clone(this);
    };
    Element.prototype.text = function (val) {
      if (val && this.children.length === 1) {
        this.children[0] = val;
        return this;
      }
      return this.getText();
    };
    Element.prototype.attr = function (attr, val) {
      if (typeof val !== "undefined" || val === null) {
        if (!this.attrs) {
          this.attrs = {};
        }
        this.attrs[attr] = val;
        return this;
      }
      return this.attrs[attr];
    };
    Element.prototype.toString = function () {
      var s = "";
      this.write(function (c) {
        s += c;
      });
      return s;
    };
    Element.prototype.toJSON = function () {
      return {
        name: this.name,
        attrs: this.attrs,
        children: this.children.map(function (child) {
          return child && child.toJSON ? child.toJSON() : child;
        }),
      };
    };
    Element.prototype._addChildren = function (writer) {
      writer(">");
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        if (child || child === 0) {
          if (child.write) {
            child.write(writer);
          } else if (typeof child === "string") {
            writer(escapeXMLText(child));
          } else if (child.toString) {
            writer(escapeXMLText(child.toString(10)));
          }
        }
      }
      writer("</");
      writer(this.name);
      writer(">");
    };
    Element.prototype.write = function (writer) {
      writer("<");
      writer(this.name);
      for (var k in this.attrs) {
        var v = this.attrs[k];
        if (v != null) {
          writer(" ");
          writer(k);
          writer('="');
          if (typeof v !== "string") {
            v = v.toString();
          }
          writer(escapeXML(v));
          writer('"');
        }
      }
      if (this.children.length === 0) {
        writer("/>");
      } else {
        this._addChildren(writer);
      }
    };
    Element.prototype.nameEquals = function (el) {
      return nameEqual(this, el);
    };
    Element.prototype.attrsEquals = function (el) {
      return attrsEqual(this, el);
    };
    Element.prototype.childrenEquals = function (el) {
      return childrenEqual(this, el);
    };
    Element.prototype.equals = function (el) {
      return equal(this, el);
    };
    module2.exports = Element;
  },
});

// node_modules/ltx/lib/parsers/ltx.js
var require_ltx = __commonJS({
  "node_modules/ltx/lib/parsers/ltx.js"(exports2, module2) {
    "use strict";
    var inherits = require_inherits();
    var EventEmitter = require("events").EventEmitter;
    var unescapeXML = require_escape().unescapeXML;
    var STATE_TEXT = 0;
    var STATE_IGNORE_COMMENT = 1;
    var STATE_IGNORE_INSTRUCTION = 2;
    var STATE_TAG_NAME = 3;
    var STATE_TAG = 4;
    var STATE_ATTR_NAME = 5;
    var STATE_ATTR_EQ = 6;
    var STATE_ATTR_QUOT = 7;
    var STATE_ATTR_VALUE = 8;
    var STATE_CDATA = 9;
    var STATE_IGNORE_CDATA = 10;
    var SaxLtx = (module2.exports = function SaxLtx2() {
      EventEmitter.call(this);
      var state = STATE_TEXT;
      var remainder;
      var tagName;
      var attrs;
      var endTag;
      var selfClosing;
      var attrQuote;
      var attrQuoteChar;
      var recordStart = 0;
      var attrName;
      this._handleTagOpening = function (endTag2, tagName2, attrs2) {
        if (!endTag2) {
          this.emit("startElement", tagName2, attrs2);
          if (selfClosing) {
            this.emit("endElement", tagName2);
          }
        } else {
          this.emit("endElement", tagName2);
        }
      };
      this.write = function (data) {
        if (typeof data !== "string") {
          data = data.toString();
        }
        var pos = 0;
        if (remainder) {
          data = remainder + data;
          pos += remainder.length;
          remainder = null;
        }
        function endRecording() {
          if (typeof recordStart === "number") {
            var recorded = data.substring(recordStart, pos);
            recordStart = void 0;
            return recorded;
          }
        }
        for (; pos < data.length; pos++) {
          if (state === STATE_TEXT) {
            var lt = data.indexOf("<", pos);
            if (lt !== -1 && pos !== lt) {
              pos = lt;
            }
          } else if (state === STATE_ATTR_VALUE) {
            var quot = data.indexOf(attrQuoteChar, pos);
            if (quot !== -1) {
              pos = quot;
            }
          } else if (state === STATE_IGNORE_COMMENT) {
            var endcomment = data.indexOf("-->", pos);
            if (endcomment !== -1) {
              pos = endcomment + 2;
            }
          } else if (state === STATE_IGNORE_CDATA) {
            var endCDATA = data.indexOf("]]>", pos);
            if (endCDATA !== -1) {
              pos = endCDATA + 2;
            }
          }
          var c = data.charCodeAt(pos);
          switch (state) {
            case STATE_TEXT:
              if (c === 60) {
                var text = endRecording();
                if (text) {
                  this.emit("text", unescapeXML(text));
                }
                state = STATE_TAG_NAME;
                recordStart = pos + 1;
                attrs = {};
              }
              break;
            case STATE_CDATA:
              if (c === 93 && data.substr(pos + 1, 2) === "]>") {
                var cData = endRecording();
                if (cData) {
                  this.emit("text", cData);
                }
                state = STATE_TEXT;
              }
              break;
            case STATE_TAG_NAME:
              if (c === 47 && recordStart === pos) {
                recordStart = pos + 1;
                endTag = true;
              } else if (c === 33) {
                if (data.substr(pos + 1, 7) === "[CDATA[") {
                  recordStart = pos + 8;
                  state = STATE_CDATA;
                } else {
                  recordStart = void 0;
                  state = STATE_IGNORE_COMMENT;
                }
              } else if (c === 63) {
                recordStart = void 0;
                state = STATE_IGNORE_INSTRUCTION;
              } else if (c <= 32 || c === 47 || c === 62) {
                tagName = endRecording();
                pos--;
                state = STATE_TAG;
              }
              break;
            case STATE_IGNORE_COMMENT:
              if (c === 62) {
                var prevFirst = data.charCodeAt(pos - 1);
                var prevSecond = data.charCodeAt(pos - 2);
                if (
                  (prevFirst === 45 && prevSecond === 45) ||
                  (prevFirst === 93 && prevSecond === 93)
                ) {
                  state = STATE_TEXT;
                }
              }
              break;
            case STATE_IGNORE_INSTRUCTION:
              if (c === 62) {
                var prev = data.charCodeAt(pos - 1);
                if (prev === 63) {
                  state = STATE_TEXT;
                }
              }
              break;
            case STATE_TAG:
              if (c === 62) {
                this._handleTagOpening(endTag, tagName, attrs);
                tagName = void 0;
                attrs = void 0;
                endTag = void 0;
                selfClosing = void 0;
                state = STATE_TEXT;
                recordStart = pos + 1;
              } else if (c === 47) {
                selfClosing = true;
              } else if (c > 32) {
                recordStart = pos;
                state = STATE_ATTR_NAME;
              }
              break;
            case STATE_ATTR_NAME:
              if (c <= 32 || c === 61) {
                attrName = endRecording();
                pos--;
                state = STATE_ATTR_EQ;
              }
              break;
            case STATE_ATTR_EQ:
              if (c === 61) {
                state = STATE_ATTR_QUOT;
              }
              break;
            case STATE_ATTR_QUOT:
              if (c === 34 || c === 39) {
                attrQuote = c;
                attrQuoteChar = c === 34 ? '"' : "'";
                state = STATE_ATTR_VALUE;
                recordStart = pos + 1;
              }
              break;
            case STATE_ATTR_VALUE:
              if (c === attrQuote) {
                var value = unescapeXML(endRecording());
                attrs[attrName] = value;
                attrName = void 0;
                state = STATE_TAG;
              }
              break;
          }
        }
        if (typeof recordStart === "number" && recordStart <= data.length) {
          remainder = data.slice(recordStart);
          recordStart = 0;
        }
      };
    });
    inherits(SaxLtx, EventEmitter);
    SaxLtx.prototype.end = function (data) {
      if (data) {
        this.write(data);
      }
      this.write = function () {};
    };
  },
});

// node_modules/ltx/lib/Parser.js
var require_Parser = __commonJS({
  "node_modules/ltx/lib/Parser.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events").EventEmitter;
    var inherits = require_inherits();
    var Element = require_Element();
    var LtxParser = require_ltx();
    var Parser = function (options) {
      EventEmitter.call(this);
      var ParserInterface = (this.Parser =
        (options && options.Parser) || this.DefaultParser);
      var ElementInterface = (this.Element =
        (options && options.Element) || this.DefaultElement);
      this.parser = new ParserInterface();
      var el;
      var self = this;
      this.parser.on("startElement", function (name, attrs) {
        var child = new ElementInterface(name, attrs);
        if (!el) {
          el = child;
        } else {
          el = el.cnode(child);
        }
      });
      this.parser.on("endElement", function (name) {
        if (!el) {
        } else if (name === el.name) {
          if (el.parent) {
            el = el.parent;
          } else if (!self.tree) {
            self.tree = el;
            el = void 0;
          }
        }
      });
      this.parser.on("text", function (str) {
        if (el) {
          el.t(str);
        }
      });
      this.parser.on("error", function (e) {
        self.error = e;
        self.emit("error", e);
      });
    };
    inherits(Parser, EventEmitter);
    Parser.prototype.DefaultParser = LtxParser;
    Parser.prototype.DefaultElement = Element;
    Parser.prototype.write = function (data) {
      this.parser.write(data);
    };
    Parser.prototype.end = function (data) {
      this.parser.end(data);
      if (!this.error) {
        if (this.tree) {
          this.emit("tree", this.tree);
        } else {
          this.emit("error", new Error("Incomplete document"));
        }
      }
    };
    module2.exports = Parser;
  },
});

// node_modules/ltx/lib/parse.js
var require_parse = __commonJS({
  "node_modules/ltx/lib/parse.js"(exports2, module2) {
    "use strict";
    var Parser = require_Parser();
    module2.exports = function parse(data, options) {
      var p;
      if (typeof options === "function") {
        p = new options();
      } else {
        p = new Parser(options);
      }
      var result = null;
      var error = null;
      p.on("tree", function (tree) {
        result = tree;
      });
      p.on("error", function (e) {
        error = e;
      });
      p.write(data);
      p.end();
      if (error) {
        throw error;
      } else {
        return result;
      }
    };
  },
});

// node_modules/ltx/lib/createElement.js
var require_createElement = __commonJS({
  "node_modules/ltx/lib/createElement.js"(exports2, module2) {
    "use strict";
    var Element = require_Element();
    module2.exports = function createElement(name, attrs) {
      var el = new Element(name, attrs);
      for (var i = 2; i < arguments.length; i++) {
        var child = arguments[i];
        if (child) el.cnode(child);
      }
      return el;
    };
  },
});

// node_modules/ltx/lib/tagString.js
var require_tagString = __commonJS({
  "node_modules/ltx/lib/tagString.js"(exports2, module2) {
    "use strict";
    var escape = require_escape().escapeXML;
    module2.exports = function tagString() {
      var literals = arguments[0];
      var str = "";
      for (var i = 1; i < arguments.length; i++) {
        str += literals[i - 1];
        str += escape(arguments[i]);
      }
      str += literals[literals.length - 1];
      return str;
    };
  },
});

// node_modules/ltx/lib/tag.js
var require_tag = __commonJS({
  "node_modules/ltx/lib/tag.js"(exports2, module2) {
    "use strict";
    var tagString = require_tagString();
    var parse = require_parse();
    module2.exports = function tag() {
      return parse(tagString.apply(null, arguments));
    };
  },
});

// node_modules/ltx/lib/is.js
var require_is = __commonJS({
  "node_modules/ltx/lib/is.js"(exports2, module2) {
    "use strict";
    var Element = require_Element();
    module2.exports.isNode = function is(el) {
      return el instanceof Element || typeof el === "string";
    };
    module2.exports.isElement = function isElement(el) {
      return el instanceof Element;
    };
    module2.exports.isText = function isText(el) {
      return typeof el === "string";
    };
  },
});

// node_modules/ltx/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/ltx/lib/stringify.js"(exports2, module2) {
    "use strict";
    function stringify(el, indent, level) {
      if (typeof indent === "number") indent = " ".repeat(indent);
      if (!level) level = 1;
      var s = "";
      s += "<" + el.name;
      Object.keys(el.attrs).forEach(function (k) {
        s += " " + k + '="' + el.attrs[k] + '"';
      });
      if (el.children.length) {
        s += ">";
        el.children.forEach(function (child, i) {
          if (indent) s += "\n" + indent.repeat(level);
          if (typeof child === "string") {
            s += child;
          } else {
            s += stringify(child, indent, level + 1);
          }
        });
        if (indent) s += "\n" + indent.repeat(level - 1);
        s += "</" + el.name + ">";
      } else {
        s += "/>";
      }
      return s;
    }
    module2.exports = stringify;
  },
});

// node_modules/ltx/index.js
var require_ltx2 = __commonJS({
  "node_modules/ltx/index.js"(exports2, module2) {
    "use strict";
    var parse = require_parse();
    var Parser = require_Parser();
    var escape = require_escape();
    var Element = require_Element();
    var equal = require_equal();
    var createElement = require_createElement();
    var tag = require_tag();
    var tagString = require_tagString();
    var is = require_is();
    var clone = require_clone();
    var stringify = require_stringify();
    exports2 = module2.exports = function ltx2() {
      return tag.apply(null, arguments);
    };
    exports2.Element = Element;
    exports2.equal = equal.equal;
    exports2.nameEqual = equal.name;
    exports2.attrsEqual = equal.attrs;
    exports2.childrenEqual = equal.children;
    exports2.isNode = is.isNode;
    exports2.isElement = is.isElement;
    exports2.isText = is.isText;
    exports2.clone = clone;
    exports2.createElement = createElement;
    exports2.escapeXML = escape.escapeXML;
    exports2.unescapeXML = escape.unescapeXML;
    exports2.escapeXMLText = escape.escapeXMLText;
    exports2.unescapeXMLText = escape.unescapeXMLText;
    exports2.Parser = Parser;
    exports2.parse = parse;
    exports2.tag = tag;
    exports2.tagString = tagString;
    exports2.stringify = stringify;
  },
});

// node_modules/concat-map/index.js
var require_concat_map = __commonJS({
  "node_modules/concat-map/index.js"(exports2, module2) {
    module2.exports = function (xs, fn) {
      var res = [];
      for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
      }
      return res;
    };
    var isArray =
      Array.isArray ||
      function (xs) {
        return Object.prototype.toString.call(xs) === "[object Array]";
      };
  },
});

// node_modules/balanced-match/index.js
var require_balanced_match = __commonJS({
  "node_modules/balanced-match/index.js"(exports2, module2) {
    "use strict";
    module2.exports = balanced;
    function balanced(a, b, str) {
      if (a instanceof RegExp) a = maybeMatch(a, str);
      if (b instanceof RegExp) b = maybeMatch(b, str);
      var r = range(a, b, str);
      return (
        r && {
          start: r[0],
          end: r[1],
          pre: str.slice(0, r[0]),
          body: str.slice(r[0] + a.length, r[1]),
          post: str.slice(r[1] + b.length),
        }
      );
    }
    function maybeMatch(reg, str) {
      var m = str.match(reg);
      return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str) {
      var begs, beg, left, right, result;
      var ai = str.indexOf(a);
      var bi = str.indexOf(b, ai + 1);
      var i = ai;
      if (ai >= 0 && bi > 0) {
        begs = [];
        left = str.length;
        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi;
            }
            bi = str.indexOf(b, i + 1);
          }
          i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) {
          result = [left, right];
        }
      }
      return result;
    }
  },
});

// node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS({
  "node_modules/brace-expansion/index.js"(exports2, module2) {
    var concatMap = require_concat_map();
    var balanced = require_balanced_match();
    module2.exports = expandTop;
    var escSlash = "\0SLASH" + Math.random() + "\0";
    var escOpen = "\0OPEN" + Math.random() + "\0";
    var escClose = "\0CLOSE" + Math.random() + "\0";
    var escComma = "\0COMMA" + Math.random() + "\0";
    var escPeriod = "\0PERIOD" + Math.random() + "\0";
    function numeric(str) {
      return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
    }
    function escapeBraces(str) {
      return str
        .split("\\\\")
        .join(escSlash)
        .split("\\{")
        .join(escOpen)
        .split("\\}")
        .join(escClose)
        .split("\\,")
        .join(escComma)
        .split("\\.")
        .join(escPeriod);
    }
    function unescapeBraces(str) {
      return str
        .split(escSlash)
        .join("\\")
        .split(escOpen)
        .join("{")
        .split(escClose)
        .join("}")
        .split(escComma)
        .join(",")
        .split(escPeriod)
        .join(".");
    }
    function parseCommaParts(str) {
      if (!str) return [""];
      var parts = [];
      var m = balanced("{", "}", str);
      if (!m) return str.split(",");
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(",");
      p[p.length - 1] += "{" + body + "}";
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
      }
      parts.push.apply(parts, p);
      return parts;
    }
    function expandTop(str, options) {
      if (!str) return [];
      options = options || {};
      var max = options.max == null ? Infinity : options.max;
      if (str.substr(0, 2) === "{}") {
        str = "\\{\\}" + str.substr(2);
      }
      return expand(escapeBraces(str), max, true).map(unescapeBraces);
    }
    function embrace(str) {
      return "{" + str + "}";
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    function expand(str, max, isTop) {
      var expansions = [];
      var m = balanced("{", "}", str);
      if (!m || /\$$/.test(m.pre)) return [str];
      var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
      var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
      var isSequence = isNumericSequence || isAlphaSequence;
      var isOptions = m.body.indexOf(",") >= 0;
      if (!isSequence && !isOptions) {
        if (m.post.match(/,(?!,).*\}/)) {
          str = m.pre + "{" + m.body + escClose + m.post;
          return expand(str, max, true);
        }
        return [str];
      }
      var n;
      if (isSequence) {
        n = m.body.split(/\.\./);
      } else {
        n = parseCommaParts(m.body);
        if (n.length === 1) {
          n = expand(n[0], max, false).map(embrace);
          if (n.length === 1) {
            var post = m.post.length ? expand(m.post, max, false) : [""];
            return post.map(function (p) {
              return m.pre + n[0] + p;
            });
          }
        }
      }
      var pre = m.pre;
      var post = m.post.length ? expand(m.post, max, false) : [""];
      var N;
      if (isSequence) {
        var x = numeric(n[0]);
        var y = numeric(n[1]);
        var width = Math.max(n[0].length, n[1].length);
        var incr = n.length == 3 ? Math.max(Math.abs(numeric(n[2])), 1) : 1;
        var test = lte;
        var reverse = y < x;
        if (reverse) {
          incr *= -1;
          test = gte;
        }
        var pad = n.some(isPadded);
        N = [];
        for (var i = x; test(i, y) && N.length < max; i += incr) {
          var c;
          if (isAlphaSequence) {
            c = String.fromCharCode(i);
            if (c === "\\") c = "";
          } else {
            c = String(i);
            if (pad) {
              var need = width - c.length;
              if (need > 0) {
                var z = new Array(need + 1).join("0");
                if (i < 0) c = "-" + z + c.slice(1);
                else c = z + c;
              }
            }
          }
          N.push(c);
        }
      } else {
        N = concatMap(n, function (el) {
          return expand(el, max, false);
        });
      }
      for (var j = 0; j < N.length; j++) {
        for (var k = 0; k < post.length && expansions.length < max; k++) {
          var expansion = pre + N[j] + post[k];
          if (!isTop || isSequence || expansion) expansions.push(expansion);
        }
      }
      return expansions;
    }
  },
});

// node_modules/minimatch/minimatch.js
var require_minimatch = __commonJS({
  "node_modules/minimatch/minimatch.js"(exports2, module2) {
    var minimatch2 = (module2.exports = (p, pattern, options = {}) => {
      assertValidPattern(pattern);
      if (!options.nocomment && pattern.charAt(0) === "#") {
        return false;
      }
      return new Minimatch(pattern, options).match(p);
    });
    module2.exports = minimatch2;
    var path2 = (() => {
      try {
        return require("path");
      } catch (e) {}
    })() || {
      sep: "/",
    };
    minimatch2.sep = path2.sep;
    var GLOBSTAR = /* @__PURE__ */ Symbol("globstar **");
    minimatch2.GLOBSTAR = GLOBSTAR;
    var expand = require_brace_expansion();
    var plTypes = {
      "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
      "?": { open: "(?:", close: ")?" },
      "+": { open: "(?:", close: ")+" },
      "*": { open: "(?:", close: ")*" },
      "@": { open: "(?:", close: ")" },
    };
    var qmark = "[^/]";
    var star = qmark + "*?";
    var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
    var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
    var charSet = (s) =>
      s.split("").reduce((set, c) => {
        set[c] = true;
        return set;
      }, {});
    var reSpecials = charSet("().*{}+?[]^$\\!");
    var addPatternStartSet = charSet("[.(");
    var slashSplit = /\/+/;
    minimatch2.filter =
      (pattern, options = {}) =>
      (p, i, list) =>
        minimatch2(p, pattern, options);
    var ext = (a, b = {}) => {
      const t = {};
      Object.keys(a).forEach((k) => (t[k] = a[k]));
      Object.keys(b).forEach((k) => (t[k] = b[k]));
      return t;
    };
    minimatch2.defaults = (def) => {
      if (!def || typeof def !== "object" || !Object.keys(def).length) {
        return minimatch2;
      }
      const orig = minimatch2;
      const m = (p, pattern, options) => orig(p, pattern, ext(def, options));
      m.Minimatch = class Minimatch extends orig.Minimatch {
        constructor(pattern, options) {
          super(pattern, ext(def, options));
        }
      };
      m.Minimatch.defaults = (options) =>
        orig.defaults(ext(def, options)).Minimatch;
      m.filter = (pattern, options) => orig.filter(pattern, ext(def, options));
      m.defaults = (options) => orig.defaults(ext(def, options));
      m.makeRe = (pattern, options) => orig.makeRe(pattern, ext(def, options));
      m.braceExpand = (pattern, options) =>
        orig.braceExpand(pattern, ext(def, options));
      m.match = (list, pattern, options) =>
        orig.match(list, pattern, ext(def, options));
      return m;
    };
    minimatch2.braceExpand = (pattern, options) =>
      braceExpand2(pattern, options);
    var braceExpand2 = (pattern, options = {}) => {
      assertValidPattern(pattern);
      if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
        return [pattern];
      }
      return expand(pattern);
    };
    var MAX_PATTERN_LENGTH = 1024 * 64;
    var assertValidPattern = (pattern) => {
      if (typeof pattern !== "string") {
        throw new TypeError("invalid pattern");
      }
      if (pattern.length > MAX_PATTERN_LENGTH) {
        throw new TypeError("pattern is too long");
      }
    };
    var SUBPARSE = /* @__PURE__ */ Symbol("subparse");
    minimatch2.makeRe = (pattern, options) =>
      new Minimatch(pattern, options || {}).makeRe();
    minimatch2.match = (list, pattern, options = {}) => {
      const mm = new Minimatch(pattern, options);
      list = list.filter((f) => mm.match(f));
      if (mm.options.nonull && !list.length) {
        list.push(pattern);
      }
      return list;
    };
    var globUnescape = (s) => s.replace(/\\(.)/g, "$1");
    var regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    var Minimatch = class {
      constructor(pattern, options) {
        assertValidPattern(pattern);
        if (!options) options = {};
        if (!options.allowWindowsEscape && path2.sep !== "/") {
          pattern = pattern.split(path2.sep).join("/");
        }
        this.options = options;
        this.maxGlobstarRecursion =
          options.maxGlobstarRecursion !== void 0
            ? options.maxGlobstarRecursion
            : 200;
        this.set = [];
        this.pattern = pattern;
        this.regexp = null;
        this.negate = false;
        this.comment = false;
        this.empty = false;
        this.partial = !!options.partial;
        this.make();
      }
      debug() {}
      make() {
        const pattern = this.pattern;
        const options = this.options;
        if (!options.nocomment && pattern.charAt(0) === "#") {
          this.comment = true;
          return;
        }
        if (!pattern) {
          this.empty = true;
          return;
        }
        this.parseNegate();
        let set = (this.globSet = this.braceExpand());
        if (options.debug) this.debug = (...args) => console.error(...args);
        this.debug(this.pattern, set);
        set = this.globParts = set.map((s) => s.split(slashSplit));
        this.debug(this.pattern, set);
        set = set.map((s, si, set2) => s.map(this.parse, this));
        this.debug(this.pattern, set);
        set = set.filter((s) => s.indexOf(false) === -1);
        this.debug(this.pattern, set);
        this.set = set;
      }
      parseNegate() {
        if (this.options.nonegate) return;
        const pattern = this.pattern;
        let negate = false;
        let negateOffset = 0;
        for (let i = 0; i < pattern.length && pattern.charAt(i) === "!"; i++) {
          negate = !negate;
          negateOffset++;
        }
        if (negateOffset) this.pattern = pattern.substr(negateOffset);
        this.negate = negate;
      }
      // set partial to true to test if, for example,
      // "/a/b" matches the start of "/*/b/*/d"
      // Partial means, if you run out of file before you run
      // out of pattern, then that's fine, as long as all
      // the parts match.
      matchOne(file, pattern, partial) {
        if (pattern.indexOf(GLOBSTAR) !== -1) {
          return this._matchGlobstar(file, pattern, partial, 0, 0);
        }
        return this._matchOne(file, pattern, partial, 0, 0);
      }
      _matchGlobstar(file, pattern, partial, fileIndex, patternIndex) {
        let firstgs = -1;
        for (let i = patternIndex; i < pattern.length; i++) {
          if (pattern[i] === GLOBSTAR) {
            firstgs = i;
            break;
          }
        }
        let lastgs = -1;
        for (let i = pattern.length - 1; i >= 0; i--) {
          if (pattern[i] === GLOBSTAR) {
            lastgs = i;
            break;
          }
        }
        const head = pattern.slice(patternIndex, firstgs);
        const body = partial
          ? pattern.slice(firstgs + 1)
          : pattern.slice(firstgs + 1, lastgs);
        const tail = partial ? [] : pattern.slice(lastgs + 1);
        if (head.length) {
          const fileHead = file.slice(fileIndex, fileIndex + head.length);
          if (!this._matchOne(fileHead, head, partial, 0, 0)) {
            return false;
          }
          fileIndex += head.length;
        }
        let fileTailMatch = 0;
        if (tail.length) {
          if (tail.length + fileIndex > file.length) return false;
          const tailStart = file.length - tail.length;
          if (this._matchOne(file, tail, partial, tailStart, 0)) {
            fileTailMatch = tail.length;
          } else {
            if (
              file[file.length - 1] !== "" ||
              fileIndex + tail.length === file.length
            ) {
              return false;
            }
            if (!this._matchOne(file, tail, partial, tailStart - 1, 0)) {
              return false;
            }
            fileTailMatch = tail.length + 1;
          }
        }
        if (!body.length) {
          let sawSome = !!fileTailMatch;
          for (let i = fileIndex; i < file.length - fileTailMatch; i++) {
            const f = String(file[i]);
            sawSome = true;
            if (
              f === "." ||
              f === ".." ||
              (!this.options.dot && f.charAt(0) === ".")
            ) {
              return false;
            }
          }
          return partial || sawSome;
        }
        const bodySegments = [[[], 0]];
        let currentBody = bodySegments[0];
        let nonGsParts = 0;
        const nonGsPartsSums = [0];
        for (const b of body) {
          if (b === GLOBSTAR) {
            nonGsPartsSums.push(nonGsParts);
            currentBody = [[], 0];
            bodySegments.push(currentBody);
          } else {
            currentBody[0].push(b);
            nonGsParts++;
          }
        }
        let idx = bodySegments.length - 1;
        const fileLength = file.length - fileTailMatch;
        for (const b of bodySegments) {
          b[1] = fileLength - (nonGsPartsSums[idx--] + b[0].length);
        }
        return !!this._matchGlobStarBodySections(
          file,
          bodySegments,
          fileIndex,
          0,
          partial,
          0,
          !!fileTailMatch
        );
      }
      // return false for "nope, not matching"
      // return null for "not matching, cannot keep trying"
      _matchGlobStarBodySections(
        file,
        bodySegments,
        fileIndex,
        bodyIndex,
        partial,
        globStarDepth,
        sawTail
      ) {
        const bs = bodySegments[bodyIndex];
        if (!bs) {
          for (let i = fileIndex; i < file.length; i++) {
            sawTail = true;
            const f = file[i];
            if (
              f === "." ||
              f === ".." ||
              (!this.options.dot && f.charAt(0) === ".")
            ) {
              return false;
            }
          }
          return sawTail;
        }
        const [body, after] = bs;
        while (fileIndex <= after) {
          const m = this._matchOne(
            file.slice(0, fileIndex + body.length),
            body,
            partial,
            fileIndex,
            0
          );
          if (m && globStarDepth < this.maxGlobstarRecursion) {
            const sub = this._matchGlobStarBodySections(
              file,
              bodySegments,
              fileIndex + body.length,
              bodyIndex + 1,
              partial,
              globStarDepth + 1,
              sawTail
            );
            if (sub !== false) {
              return sub;
            }
          }
          const f = file[fileIndex];
          if (
            f === "." ||
            f === ".." ||
            (!this.options.dot && f.charAt(0) === ".")
          ) {
            return false;
          }
          fileIndex++;
        }
        return partial || null;
      }
      _matchOne(file, pattern, partial, fileIndex, patternIndex) {
        let fi, pi, fl, pl;
        for (
          fi = fileIndex,
            pi = patternIndex,
            fl = file.length,
            pl = pattern.length;
          fi < fl && pi < pl;
          fi++, pi++
        ) {
          this.debug("matchOne loop");
          const p = pattern[pi];
          const f = file[fi];
          this.debug(pattern, p, f);
          if (p === false || p === GLOBSTAR) return false;
          let hit;
          if (typeof p === "string") {
            hit = f === p;
            this.debug("string match", p, f, hit);
          } else {
            hit = f.match(p);
            this.debug("pattern match", p, f, hit);
          }
          if (!hit) return false;
        }
        if (fi === fl && pi === pl) {
          return true;
        } else if (fi === fl) {
          return partial;
        } else if (pi === pl) {
          return fi === fl - 1 && file[fi] === "";
        }
        throw new Error("wtf?");
      }
      braceExpand() {
        return braceExpand2(this.pattern, this.options);
      }
      parse(pattern, isSub) {
        assertValidPattern(pattern);
        const options = this.options;
        if (pattern === "**") {
          if (!options.noglobstar) return GLOBSTAR;
          else pattern = "*";
        }
        if (pattern === "") return "";
        let re = "";
        let hasMagic = !!options.nocase;
        let escaping = false;
        const patternListStack = [];
        const negativeLists = [];
        let stateChar;
        let inClass = false;
        let reClassStart = -1;
        let classStart = -1;
        let cs;
        let pl;
        let sp;
        let dotTravAllowed = pattern.charAt(0) === ".";
        let dotFileAllowed = options.dot || dotTravAllowed;
        const patternStart = () =>
          dotTravAllowed
            ? ""
            : dotFileAllowed
            ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))"
            : "(?!\\.)";
        const subPatternStart = (p) =>
          p.charAt(0) === "."
            ? ""
            : options.dot
            ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))"
            : "(?!\\.)";
        const clearStateChar = () => {
          if (stateChar) {
            switch (stateChar) {
              case "*":
                re += star;
                hasMagic = true;
                break;
              case "?":
                re += qmark;
                hasMagic = true;
                break;
              default:
                re += "\\" + stateChar;
                break;
            }
            this.debug("clearStateChar %j %j", stateChar, re);
            stateChar = false;
          }
        };
        for (let i = 0, c; i < pattern.length && (c = pattern.charAt(i)); i++) {
          this.debug("%s	%s %s %j", pattern, i, re, c);
          if (escaping) {
            if (c === "/") {
              return false;
            }
            if (reSpecials[c]) {
              re += "\\";
            }
            re += c;
            escaping = false;
            continue;
          }
          switch (c) {
            /* istanbul ignore next */
            case "/": {
              return false;
            }
            case "\\":
              clearStateChar();
              escaping = true;
              continue;
            // the various stateChar values
            // for the "extglob" stuff.
            case "?":
            case "*":
            case "+":
            case "@":
            case "!":
              this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
              if (inClass) {
                this.debug("  in class");
                if (c === "!" && i === classStart + 1) c = "^";
                re += c;
                continue;
              }
              if (c === "*" && stateChar === "*") continue;
              this.debug("call clearStateChar %j", stateChar);
              clearStateChar();
              stateChar = c;
              if (options.noext) clearStateChar();
              continue;
            case "(": {
              if (inClass) {
                re += "(";
                continue;
              }
              if (!stateChar) {
                re += "\\(";
                continue;
              }
              const plEntry = {
                type: stateChar,
                start: i - 1,
                reStart: re.length,
                open: plTypes[stateChar].open,
                close: plTypes[stateChar].close,
              };
              this.debug(this.pattern, "	", plEntry);
              patternListStack.push(plEntry);
              re += plEntry.open;
              if (plEntry.start === 0 && plEntry.type !== "!") {
                dotTravAllowed = true;
                re += subPatternStart(pattern.slice(i + 1));
              }
              this.debug("plType %j %j", stateChar, re);
              stateChar = false;
              continue;
            }
            case ")": {
              const plEntry = patternListStack[patternListStack.length - 1];
              if (inClass || !plEntry) {
                re += "\\)";
                continue;
              }
              patternListStack.pop();
              clearStateChar();
              hasMagic = true;
              pl = plEntry;
              re += pl.close;
              if (pl.type === "!") {
                negativeLists.push(Object.assign(pl, { reEnd: re.length }));
              }
              continue;
            }
            case "|": {
              const plEntry = patternListStack[patternListStack.length - 1];
              if (inClass || !plEntry) {
                re += "\\|";
                continue;
              }
              clearStateChar();
              re += "|";
              if (plEntry.start === 0 && plEntry.type !== "!") {
                dotTravAllowed = true;
                re += subPatternStart(pattern.slice(i + 1));
              }
              continue;
            }
            // these are mostly the same in regexp and glob
            case "[":
              clearStateChar();
              if (inClass) {
                re += "\\" + c;
                continue;
              }
              inClass = true;
              classStart = i;
              reClassStart = re.length;
              re += c;
              continue;
            case "]":
              if (i === classStart + 1 || !inClass) {
                re += "\\" + c;
                continue;
              }
              cs = pattern.substring(classStart + 1, i);
              try {
                RegExp("[" + cs + "]");
              } catch (er) {
                sp = this.parse(cs, SUBPARSE);
                re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]";
                hasMagic = hasMagic || sp[1];
                inClass = false;
                continue;
              }
              hasMagic = true;
              inClass = false;
              re += c;
              continue;
            default:
              clearStateChar();
              if (reSpecials[c] && !(c === "^" && inClass)) {
                re += "\\";
              }
              re += c;
              break;
          }
        }
        if (inClass) {
          cs = pattern.substr(classStart + 1);
          sp = this.parse(cs, SUBPARSE);
          re = re.substr(0, reClassStart) + "\\[" + sp[0];
          hasMagic = hasMagic || sp[1];
        }
        for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
          let tail;
          tail = re.slice(pl.reStart + pl.open.length);
          this.debug("setting tail", re, pl);
          tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, (_, $1, $2) => {
            if (!$2) {
              $2 = "\\";
            }
            return $1 + $1 + $2 + "|";
          });
          this.debug("tail=%j\n   %s", tail, tail, pl, re);
          const t =
            pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
          hasMagic = true;
          re = re.slice(0, pl.reStart) + t + "\\(" + tail;
        }
        clearStateChar();
        if (escaping) {
          re += "\\\\";
        }
        const addPatternStart = addPatternStartSet[re.charAt(0)];
        for (let n = negativeLists.length - 1; n > -1; n--) {
          const nl = negativeLists[n];
          const nlBefore = re.slice(0, nl.reStart);
          const nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
          let nlAfter = re.slice(nl.reEnd);
          const nlLast = re.slice(nl.reEnd - 8, nl.reEnd) + nlAfter;
          const closeParensBefore = nlBefore.split(")").length;
          const openParensBefore =
            nlBefore.split("(").length - closeParensBefore;
          let cleanAfter = nlAfter;
          for (let i = 0; i < openParensBefore; i++) {
            cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
          }
          nlAfter = cleanAfter;
          const dollar = nlAfter === "" && isSub !== SUBPARSE ? "$" : "";
          re = nlBefore + nlFirst + nlAfter + dollar + nlLast;
        }
        if (re !== "" && hasMagic) {
          re = "(?=.)" + re;
        }
        if (addPatternStart) {
          re = patternStart() + re;
        }
        if (isSub === SUBPARSE) {
          return [re, hasMagic];
        }
        if (!hasMagic) {
          return globUnescape(pattern);
        }
        const flags = options.nocase ? "i" : "";
        try {
          return Object.assign(new RegExp("^" + re + "$", flags), {
            _glob: pattern,
            _src: re,
          });
        } catch (er) {
          return new RegExp("$.");
        }
      }
      makeRe() {
        if (this.regexp || this.regexp === false) return this.regexp;
        const set = this.set;
        if (!set.length) {
          this.regexp = false;
          return this.regexp;
        }
        const options = this.options;
        const twoStar = options.noglobstar
          ? star
          : options.dot
          ? twoStarDot
          : twoStarNoDot;
        const flags = options.nocase ? "i" : "";
        let re = set
          .map((pattern) => {
            pattern = pattern
              .map((p) =>
                typeof p === "string"
                  ? regExpEscape(p)
                  : p === GLOBSTAR
                  ? GLOBSTAR
                  : p._src
              )
              .reduce((set2, p) => {
                if (!(set2[set2.length - 1] === GLOBSTAR && p === GLOBSTAR)) {
                  set2.push(p);
                }
                return set2;
              }, []);
            pattern.forEach((p, i) => {
              if (p !== GLOBSTAR || pattern[i - 1] === GLOBSTAR) {
                return;
              }
              if (i === 0) {
                if (pattern.length > 1) {
                  pattern[i + 1] =
                    "(?:\\/|" + twoStar + "\\/)?" + pattern[i + 1];
                } else {
                  pattern[i] = twoStar;
                }
              } else if (i === pattern.length - 1) {
                pattern[i - 1] += "(?:\\/|" + twoStar + ")?";
              } else {
                pattern[i - 1] +=
                  "(?:\\/|\\/" + twoStar + "\\/)" + pattern[i + 1];
                pattern[i + 1] = GLOBSTAR;
              }
            });
            return pattern.filter((p) => p !== GLOBSTAR).join("/");
          })
          .join("|");
        re = "^(?:" + re + ")$";
        if (this.negate) re = "^(?!" + re + ").*$";
        try {
          this.regexp = new RegExp(re, flags);
        } catch (ex) {
          this.regexp = false;
        }
        return this.regexp;
      }
      match(f, partial = this.partial) {
        this.debug("match", f, this.pattern);
        if (this.comment) return false;
        if (this.empty) return f === "";
        if (f === "/" && partial) return true;
        const options = this.options;
        if (path2.sep !== "/") {
          f = f.split(path2.sep).join("/");
        }
        f = f.split(slashSplit);
        this.debug(this.pattern, "split", f);
        const set = this.set;
        this.debug(this.pattern, "set", set);
        let filename;
        for (let i = f.length - 1; i >= 0; i--) {
          filename = f[i];
          if (filename) break;
        }
        for (let i = 0; i < set.length; i++) {
          const pattern = set[i];
          let file = f;
          if (options.matchBase && pattern.length === 1) {
            file = [filename];
          }
          const hit = this.matchOne(file, pattern, partial);
          if (hit) {
            if (options.flipNegate) return true;
            return !this.negate;
          }
        }
        if (options.flipNegate) return false;
        return this.negate;
      }
      static defaults(def) {
        return minimatch2.defaults(def).Minimatch;
      }
    };
    minimatch2.Minimatch = Minimatch;
  },
});

// node_modules/js-yaml/lib/common.js
var require_common = __commonJS({
  "node_modules/js-yaml/lib/common.js"(exports2, module2) {
    "use strict";
    function isNothing(subject) {
      return typeof subject === "undefined" || subject === null;
    }
    function isObject2(subject) {
      return typeof subject === "object" && subject !== null;
    }
    function toArray(sequence) {
      if (Array.isArray(sequence)) return sequence;
      else if (isNothing(sequence)) return [];
      return [sequence];
    }
    function extend(target, source) {
      if (source) {
        const sourceKeys = Object.keys(source);
        for (
          let index = 0, length = sourceKeys.length;
          index < length;
          index += 1
        ) {
          const key = sourceKeys[index];
          target[key] = source[key];
        }
      }
      return target;
    }
    function repeat(string, count) {
      let result = "";
      for (let cycle = 0; cycle < count; cycle += 1) {
        result += string;
      }
      return result;
    }
    function isNegativeZero(number) {
      return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
    }
    module2.exports.isNothing = isNothing;
    module2.exports.isObject = isObject2;
    module2.exports.toArray = toArray;
    module2.exports.repeat = repeat;
    module2.exports.isNegativeZero = isNegativeZero;
    module2.exports.extend = extend;
  },
});

// node_modules/js-yaml/lib/exception.js
var require_exception = __commonJS({
  "node_modules/js-yaml/lib/exception.js"(exports2, module2) {
    "use strict";
    function formatError(exception, compact) {
      let where = "";
      const message = exception.reason || "(unknown reason)";
      if (!exception.mark) return message;
      if (exception.mark.name) {
        where += 'in "' + exception.mark.name + '" ';
      }
      where +=
        "(" +
        (exception.mark.line + 1) +
        ":" +
        (exception.mark.column + 1) +
        ")";
      if (!compact && exception.mark.snippet) {
        where += "\n\n" + exception.mark.snippet;
      }
      return message + " " + where;
    }
    function YAMLException(reason, mark) {
      Error.call(this);
      this.name = "YAMLException";
      this.reason = reason;
      this.mark = mark;
      this.message = formatError(this, false);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error().stack || "";
      }
    }
    YAMLException.prototype = Object.create(Error.prototype);
    YAMLException.prototype.constructor = YAMLException;
    YAMLException.prototype.toString = function toString(compact) {
      return this.name + ": " + formatError(this, compact);
    };
    module2.exports = YAMLException;
  },
});

// node_modules/js-yaml/lib/snippet.js
var require_snippet = __commonJS({
  "node_modules/js-yaml/lib/snippet.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
      let head = "";
      let tail = "";
      const maxHalfLength = Math.floor(maxLineLength / 2) - 1;
      if (position - lineStart > maxHalfLength) {
        head = " ... ";
        lineStart = position - maxHalfLength + head.length;
      }
      if (lineEnd - position > maxHalfLength) {
        tail = " ...";
        lineEnd = position + maxHalfLength - tail.length;
      }
      return {
        str:
          head +
          buffer.slice(lineStart, lineEnd).replace(/\t/g, "\u2192") +
          tail,
        pos: position - lineStart + head.length,
        // relative position
      };
    }
    function padStart(string, max) {
      return common.repeat(" ", max - string.length) + string;
    }
    function makeSnippet(mark, options) {
      options = Object.create(options || null);
      if (!mark.buffer) return null;
      if (!options.maxLength) options.maxLength = 79;
      if (typeof options.indent !== "number") options.indent = 1;
      if (typeof options.linesBefore !== "number") options.linesBefore = 3;
      if (typeof options.linesAfter !== "number") options.linesAfter = 2;
      const re = /\r?\n|\r|\0/g;
      const lineStarts = [0];
      const lineEnds = [];
      let match3;
      let foundLineNo = -1;
      while ((match3 = re.exec(mark.buffer))) {
        lineEnds.push(match3.index);
        lineStarts.push(match3.index + match3[0].length);
        if (mark.position <= match3.index && foundLineNo < 0) {
          foundLineNo = lineStarts.length - 2;
        }
      }
      if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
      let result = "";
      const lineNoLength = Math.min(
        mark.line + options.linesAfter,
        lineEnds.length
      ).toString().length;
      const maxLineLength =
        options.maxLength - (options.indent + lineNoLength + 3);
      for (let i = 1; i <= options.linesBefore; i++) {
        if (foundLineNo - i < 0) break;
        const line2 = getLine(
          mark.buffer,
          lineStarts[foundLineNo - i],
          lineEnds[foundLineNo - i],
          mark.position -
            (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
          maxLineLength
        );
        result =
          common.repeat(" ", options.indent) +
          padStart((mark.line - i + 1).toString(), lineNoLength) +
          " | " +
          line2.str +
          "\n" +
          result;
      }
      const line = getLine(
        mark.buffer,
        lineStarts[foundLineNo],
        lineEnds[foundLineNo],
        mark.position,
        maxLineLength
      );
      result +=
        common.repeat(" ", options.indent) +
        padStart((mark.line + 1).toString(), lineNoLength) +
        " | " +
        line.str +
        "\n";
      result +=
        common.repeat("-", options.indent + lineNoLength + 3 + line.pos) +
        "^\n";
      for (let i = 1; i <= options.linesAfter; i++) {
        if (foundLineNo + i >= lineEnds.length) break;
        const line2 = getLine(
          mark.buffer,
          lineStarts[foundLineNo + i],
          lineEnds[foundLineNo + i],
          mark.position -
            (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
          maxLineLength
        );
        result +=
          common.repeat(" ", options.indent) +
          padStart((mark.line + i + 1).toString(), lineNoLength) +
          " | " +
          line2.str +
          "\n";
      }
      return result.replace(/\n$/, "");
    }
    module2.exports = makeSnippet;
  },
});

// node_modules/js-yaml/lib/type.js
var require_type = __commonJS({
  "node_modules/js-yaml/lib/type.js"(exports2, module2) {
    "use strict";
    var YAMLException = require_exception();
    var TYPE_CONSTRUCTOR_OPTIONS = [
      "kind",
      "multi",
      "resolve",
      "construct",
      "instanceOf",
      "predicate",
      "represent",
      "representName",
      "defaultStyle",
      "styleAliases",
    ];
    var YAML_NODE_KINDS = ["scalar", "sequence", "mapping"];
    function compileStyleAliases(map) {
      const result = {};
      if (map !== null) {
        Object.keys(map).forEach(function (style) {
          map[style].forEach(function (alias) {
            result[String(alias)] = style;
          });
        });
      }
      return result;
    }
    function Type(tag, options) {
      options = options || {};
      Object.keys(options).forEach(function (name) {
        if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
          throw new YAMLException(
            'Unknown option "' +
              name +
              '" is met in definition of "' +
              tag +
              '" YAML type.'
          );
        }
      });
      this.options = options;
      this.tag = tag;
      this.kind = options["kind"] || null;
      this.resolve =
        options["resolve"] ||
        function () {
          return true;
        };
      this.construct =
        options["construct"] ||
        function (data) {
          return data;
        };
      this.instanceOf = options["instanceOf"] || null;
      this.predicate = options["predicate"] || null;
      this.represent = options["represent"] || null;
      this.representName = options["representName"] || null;
      this.defaultStyle = options["defaultStyle"] || null;
      this.multi = options["multi"] || false;
      this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
      if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
        throw new YAMLException(
          'Unknown kind "' +
            this.kind +
            '" is specified for "' +
            tag +
            '" YAML type.'
        );
      }
    }
    module2.exports = Type;
  },
});

// node_modules/js-yaml/lib/schema.js
var require_schema = __commonJS({
  "node_modules/js-yaml/lib/schema.js"(exports2, module2) {
    "use strict";
    var YAMLException = require_exception();
    var Type = require_type();
    function compileList(schema, name) {
      const result = [];
      schema[name].forEach(function (currentType) {
        let newIndex = result.length;
        result.forEach(function (previousType, previousIndex) {
          if (
            previousType.tag === currentType.tag &&
            previousType.kind === currentType.kind &&
            previousType.multi === currentType.multi
          ) {
            newIndex = previousIndex;
          }
        });
        result[newIndex] = currentType;
      });
      return result;
    }
    function compileMap() {
      const result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {},
        multi: {
          scalar: [],
          sequence: [],
          mapping: [],
          fallback: [],
        },
      };
      function collectType(type2) {
        if (type2.multi) {
          result.multi[type2.kind].push(type2);
          result.multi["fallback"].push(type2);
        } else {
          result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
        }
      }
      for (
        let index = 0, length = arguments.length;
        index < length;
        index += 1
      ) {
        arguments[index].forEach(collectType);
      }
      return result;
    }
    function Schema(definition) {
      return this.extend(definition);
    }
    Schema.prototype.extend = function extend(definition) {
      let implicit = [];
      let explicit = [];
      if (definition instanceof Type) {
        explicit.push(definition);
      } else if (Array.isArray(definition)) {
        explicit = explicit.concat(definition);
      } else if (
        definition &&
        (Array.isArray(definition.implicit) ||
          Array.isArray(definition.explicit))
      ) {
        if (definition.implicit)
          implicit = implicit.concat(definition.implicit);
        if (definition.explicit)
          explicit = explicit.concat(definition.explicit);
      } else {
        throw new YAMLException(
          "Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })"
        );
      }
      implicit.forEach(function (type2) {
        if (!(type2 instanceof Type)) {
          throw new YAMLException(
            "Specified list of YAML types (or a single Type object) contains a non-Type object."
          );
        }
        if (type2.loadKind && type2.loadKind !== "scalar") {
          throw new YAMLException(
            "There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported."
          );
        }
        if (type2.multi) {
          throw new YAMLException(
            "There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit."
          );
        }
      });
      explicit.forEach(function (type2) {
        if (!(type2 instanceof Type)) {
          throw new YAMLException(
            "Specified list of YAML types (or a single Type object) contains a non-Type object."
          );
        }
      });
      const result = Object.create(Schema.prototype);
      result.implicit = (this.implicit || []).concat(implicit);
      result.explicit = (this.explicit || []).concat(explicit);
      result.compiledImplicit = compileList(result, "implicit");
      result.compiledExplicit = compileList(result, "explicit");
      result.compiledTypeMap = compileMap(
        result.compiledImplicit,
        result.compiledExplicit
      );
      return result;
    };
    module2.exports = Schema;
  },
});

// node_modules/js-yaml/lib/type/str.js
var require_str = __commonJS({
  "node_modules/js-yaml/lib/type/str.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:str", {
      kind: "scalar",
      construct: function (data) {
        return data !== null ? data : "";
      },
    });
  },
});

// node_modules/js-yaml/lib/type/seq.js
var require_seq = __commonJS({
  "node_modules/js-yaml/lib/type/seq.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:seq", {
      kind: "sequence",
      construct: function (data) {
        return data !== null ? data : [];
      },
    });
  },
});

// node_modules/js-yaml/lib/type/map.js
var require_map = __commonJS({
  "node_modules/js-yaml/lib/type/map.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:map", {
      kind: "mapping",
      construct: function (data) {
        return data !== null ? data : {};
      },
    });
  },
});

// node_modules/js-yaml/lib/schema/failsafe.js
var require_failsafe = __commonJS({
  "node_modules/js-yaml/lib/schema/failsafe.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      explicit: [require_str(), require_seq(), require_map()],
    });
  },
});

// node_modules/js-yaml/lib/type/null.js
var require_null = __commonJS({
  "node_modules/js-yaml/lib/type/null.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlNull(data) {
      if (data === null) return true;
      const max = data.length;
      return (
        (max === 1 && data === "~") ||
        (max === 4 && (data === "null" || data === "Null" || data === "NULL"))
      );
    }
    function constructYamlNull() {
      return null;
    }
    function isNull(object) {
      return object === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:null", {
      kind: "scalar",
      resolve: resolveYamlNull,
      construct: constructYamlNull,
      predicate: isNull,
      represent: {
        canonical: function () {
          return "~";
        },
        lowercase: function () {
          return "null";
        },
        uppercase: function () {
          return "NULL";
        },
        camelcase: function () {
          return "Null";
        },
        empty: function () {
          return "";
        },
      },
      defaultStyle: "lowercase",
    });
  },
});

// node_modules/js-yaml/lib/type/bool.js
var require_bool = __commonJS({
  "node_modules/js-yaml/lib/type/bool.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlBoolean(data) {
      if (data === null) return false;
      const max = data.length;
      return (
        (max === 4 &&
          (data === "true" || data === "True" || data === "TRUE")) ||
        (max === 5 &&
          (data === "false" || data === "False" || data === "FALSE"))
      );
    }
    function constructYamlBoolean(data) {
      return data === "true" || data === "True" || data === "TRUE";
    }
    function isBoolean(object) {
      return Object.prototype.toString.call(object) === "[object Boolean]";
    }
    module2.exports = new Type("tag:yaml.org,2002:bool", {
      kind: "scalar",
      resolve: resolveYamlBoolean,
      construct: constructYamlBoolean,
      predicate: isBoolean,
      represent: {
        lowercase: function (object) {
          return object ? "true" : "false";
        },
        uppercase: function (object) {
          return object ? "TRUE" : "FALSE";
        },
        camelcase: function (object) {
          return object ? "True" : "False";
        },
      },
      defaultStyle: "lowercase",
    });
  },
});

// node_modules/js-yaml/lib/type/int.js
var require_int = __commonJS({
  "node_modules/js-yaml/lib/type/int.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var Type = require_type();
    function isHexCode(c) {
      return (
        (c >= 48 && c <= 57) || (c >= 65 && c <= 70) || (c >= 97 && c <= 102)
      );
    }
    function isOctCode(c) {
      return c >= 48 && c <= 55;
    }
    function isDecCode(c) {
      return c >= 48 && c <= 57;
    }
    function resolveYamlInteger(data) {
      if (data === null) return false;
      const max = data.length;
      let index = 0;
      let hasDigits = false;
      if (!max) return false;
      let ch = data[index];
      if (ch === "-" || ch === "+") {
        ch = data[++index];
      }
      if (ch === "0") {
        if (index + 1 === max) return true;
        ch = data[++index];
        if (ch === "b") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch !== "0" && ch !== "1") return false;
            hasDigits = true;
          }
          return hasDigits && Number.isFinite(parseYamlInteger(data));
        }
        if (ch === "x") {
          index++;
          for (; index < max; index++) {
            if (!isHexCode(data.charCodeAt(index))) return false;
            hasDigits = true;
          }
          return hasDigits && Number.isFinite(parseYamlInteger(data));
        }
        if (ch === "o") {
          index++;
          for (; index < max; index++) {
            if (!isOctCode(data.charCodeAt(index))) return false;
            hasDigits = true;
          }
          return hasDigits && Number.isFinite(parseYamlInteger(data));
        }
      }
      for (; index < max; index++) {
        if (!isDecCode(data.charCodeAt(index))) {
          return false;
        }
        hasDigits = true;
      }
      if (!hasDigits) return false;
      return Number.isFinite(parseYamlInteger(data));
    }
    function parseYamlInteger(data) {
      let value = data;
      let sign = 1;
      let ch = value[0];
      if (ch === "-" || ch === "+") {
        if (ch === "-") sign = -1;
        value = value.slice(1);
        ch = value[0];
      }
      if (value === "0") return 0;
      if (ch === "0") {
        if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
        if (value[1] === "x") return sign * parseInt(value.slice(2), 16);
        if (value[1] === "o") return sign * parseInt(value.slice(2), 8);
      }
      return sign * parseInt(value, 10);
    }
    function constructYamlInteger(data) {
      return parseYamlInteger(data);
    }
    function isInteger(object) {
      return (
        Object.prototype.toString.call(object) === "[object Number]" &&
        object % 1 === 0 &&
        !common.isNegativeZero(object)
      );
    }
    module2.exports = new Type("tag:yaml.org,2002:int", {
      kind: "scalar",
      resolve: resolveYamlInteger,
      construct: constructYamlInteger,
      predicate: isInteger,
      represent: {
        binary: function (obj) {
          return obj >= 0
            ? "0b" + obj.toString(2)
            : "-0b" + obj.toString(2).slice(1);
        },
        octal: function (obj) {
          return obj >= 0
            ? "0o" + obj.toString(8)
            : "-0o" + obj.toString(8).slice(1);
        },
        decimal: function (obj) {
          return obj.toString(10);
        },
        hexadecimal: function (obj) {
          return obj >= 0
            ? "0x" + obj.toString(16).toUpperCase()
            : "-0x" + obj.toString(16).toUpperCase().slice(1);
        },
      },
      defaultStyle: "decimal",
      styleAliases: {
        binary: [2, "bin"],
        octal: [8, "oct"],
        decimal: [10, "dec"],
        hexadecimal: [16, "hex"],
      },
    });
  },
});

// node_modules/js-yaml/lib/type/float.js
var require_float = __commonJS({
  "node_modules/js-yaml/lib/type/float.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var Type = require_type();
    var YAML_FLOAT_PATTERN = new RegExp(
      // 2.5e4, 2.5 and integers
      "^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
    );
    var YAML_FLOAT_SPECIAL_PATTERN = new RegExp(
      "^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
    );
    function resolveYamlFloat(data) {
      if (data === null) return false;
      if (!YAML_FLOAT_PATTERN.test(data)) {
        return false;
      }
      if (Number.isFinite(parseFloat(data, 10))) {
        return true;
      }
      return YAML_FLOAT_SPECIAL_PATTERN.test(data);
    }
    function constructYamlFloat(data) {
      let value = data.toLowerCase();
      const sign = value[0] === "-" ? -1 : 1;
      if ("+-".indexOf(value[0]) >= 0) {
        value = value.slice(1);
      }
      if (value === ".inf") {
        return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
      } else if (value === ".nan") {
        return NaN;
      }
      return sign * parseFloat(value, 10);
    }
    var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
    function representYamlFloat(object, style) {
      if (isNaN(object)) {
        switch (style) {
          case "lowercase":
            return ".nan";
          case "uppercase":
            return ".NAN";
          case "camelcase":
            return ".NaN";
        }
      } else if (Number.POSITIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return ".inf";
          case "uppercase":
            return ".INF";
          case "camelcase":
            return ".Inf";
        }
      } else if (Number.NEGATIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return "-.inf";
          case "uppercase":
            return "-.INF";
          case "camelcase":
            return "-.Inf";
        }
      } else if (common.isNegativeZero(object)) {
        return "-0.0";
      }
      const res = object.toString(10);
      return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
    }
    function isFloat(object) {
      return (
        Object.prototype.toString.call(object) === "[object Number]" &&
        (object % 1 !== 0 || common.isNegativeZero(object))
      );
    }
    module2.exports = new Type("tag:yaml.org,2002:float", {
      kind: "scalar",
      resolve: resolveYamlFloat,
      construct: constructYamlFloat,
      predicate: isFloat,
      represent: representYamlFloat,
      defaultStyle: "lowercase",
    });
  },
});

// node_modules/js-yaml/lib/schema/json.js
var require_json = __commonJS({
  "node_modules/js-yaml/lib/schema/json.js"(exports2, module2) {
    "use strict";
    module2.exports = require_failsafe().extend({
      implicit: [
        require_null(),
        require_bool(),
        require_int(),
        require_float(),
      ],
    });
  },
});

// node_modules/js-yaml/lib/schema/core.js
var require_core2 = __commonJS({
  "node_modules/js-yaml/lib/schema/core.js"(exports2, module2) {
    "use strict";
    module2.exports = require_json();
  },
});

// node_modules/js-yaml/lib/type/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/js-yaml/lib/type/timestamp.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var YAML_DATE_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
    );
    var YAML_TIMESTAMP_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
    );
    function resolveYamlTimestamp(data) {
      if (data === null) return false;
      if (YAML_DATE_REGEXP.exec(data) !== null) return true;
      if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
      return false;
    }
    function constructYamlTimestamp(data) {
      let fraction = 0;
      let delta = null;
      let match3 = YAML_DATE_REGEXP.exec(data);
      if (match3 === null) match3 = YAML_TIMESTAMP_REGEXP.exec(data);
      if (match3 === null) throw new Error("Date resolve error");
      const year = +match3[1];
      const month = +match3[2] - 1;
      const day = +match3[3];
      if (!match3[4]) {
        return new Date(Date.UTC(year, month, day));
      }
      const hour = +match3[4];
      const minute = +match3[5];
      const second = +match3[6];
      if (match3[7]) {
        fraction = match3[7].slice(0, 3);
        while (fraction.length < 3) {
          fraction += "0";
        }
        fraction = +fraction;
      }
      if (match3[9]) {
        const tzHour = +match3[10];
        const tzMinute = +(match3[11] || 0);
        delta = (tzHour * 60 + tzMinute) * 6e4;
        if (match3[9] === "-") delta = -delta;
      }
      const date = new Date(
        Date.UTC(year, month, day, hour, minute, second, fraction)
      );
      if (delta) date.setTime(date.getTime() - delta);
      return date;
    }
    function representYamlTimestamp(object) {
      return object.toISOString();
    }
    module2.exports = new Type("tag:yaml.org,2002:timestamp", {
      kind: "scalar",
      resolve: resolveYamlTimestamp,
      construct: constructYamlTimestamp,
      instanceOf: Date,
      represent: representYamlTimestamp,
    });
  },
});

// node_modules/js-yaml/lib/type/merge.js
var require_merge = __commonJS({
  "node_modules/js-yaml/lib/type/merge.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlMerge(data) {
      return data === "<<" || data === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:merge", {
      kind: "scalar",
      resolve: resolveYamlMerge,
    });
  },
});

// node_modules/js-yaml/lib/type/binary.js
var require_binary = __commonJS({
  "node_modules/js-yaml/lib/type/binary.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var BASE64_MAP =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function resolveYamlBinary(data) {
      if (data === null) return false;
      let bitlen = 0;
      const max = data.length;
      const map = BASE64_MAP;
      for (let idx = 0; idx < max; idx++) {
        const code = map.indexOf(data.charAt(idx));
        if (code > 64) continue;
        if (code < 0) return false;
        bitlen += 6;
      }
      return bitlen % 8 === 0;
    }
    function constructYamlBinary(data) {
      const input = data.replace(/[\r\n=]/g, "");
      const max = input.length;
      const map = BASE64_MAP;
      let bits = 0;
      const result = [];
      for (let idx = 0; idx < max; idx++) {
        if (idx % 4 === 0 && idx) {
          result.push((bits >> 16) & 255);
          result.push((bits >> 8) & 255);
          result.push(bits & 255);
        }
        bits = (bits << 6) | map.indexOf(input.charAt(idx));
      }
      const tailbits = (max % 4) * 6;
      if (tailbits === 0) {
        result.push((bits >> 16) & 255);
        result.push((bits >> 8) & 255);
        result.push(bits & 255);
      } else if (tailbits === 18) {
        result.push((bits >> 10) & 255);
        result.push((bits >> 2) & 255);
      } else if (tailbits === 12) {
        result.push((bits >> 4) & 255);
      }
      return new Uint8Array(result);
    }
    function representYamlBinary(object) {
      let result = "";
      let bits = 0;
      const max = object.length;
      const map = BASE64_MAP;
      for (let idx = 0; idx < max; idx++) {
        if (idx % 3 === 0 && idx) {
          result += map[(bits >> 18) & 63];
          result += map[(bits >> 12) & 63];
          result += map[(bits >> 6) & 63];
          result += map[bits & 63];
        }
        bits = (bits << 8) + object[idx];
      }
      const tail = max % 3;
      if (tail === 0) {
        result += map[(bits >> 18) & 63];
        result += map[(bits >> 12) & 63];
        result += map[(bits >> 6) & 63];
        result += map[bits & 63];
      } else if (tail === 2) {
        result += map[(bits >> 10) & 63];
        result += map[(bits >> 4) & 63];
        result += map[(bits << 2) & 63];
        result += map[64];
      } else if (tail === 1) {
        result += map[(bits >> 2) & 63];
        result += map[(bits << 4) & 63];
        result += map[64];
        result += map[64];
      }
      return result;
    }
    function isBinary(obj) {
      return Object.prototype.toString.call(obj) === "[object Uint8Array]";
    }
    module2.exports = new Type("tag:yaml.org,2002:binary", {
      kind: "scalar",
      resolve: resolveYamlBinary,
      construct: constructYamlBinary,
      predicate: isBinary,
      represent: representYamlBinary,
    });
  },
});

// node_modules/js-yaml/lib/type/omap.js
var require_omap = __commonJS({
  "node_modules/js-yaml/lib/type/omap.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var _toString = Object.prototype.toString;
    function resolveYamlOmap(data) {
      if (data === null) return true;
      const objectKeys = [];
      const object = data;
      for (let index = 0, length = object.length; index < length; index += 1) {
        const pair = object[index];
        let pairHasKey = false;
        if (_toString.call(pair) !== "[object Object]") return false;
        let pairKey;
        for (pairKey in pair) {
          if (_hasOwnProperty.call(pair, pairKey)) {
            if (!pairHasKey) pairHasKey = true;
            else return false;
          }
        }
        if (!pairHasKey) return false;
        if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
        else return false;
      }
      return true;
    }
    function constructYamlOmap(data) {
      return data !== null ? data : [];
    }
    module2.exports = new Type("tag:yaml.org,2002:omap", {
      kind: "sequence",
      resolve: resolveYamlOmap,
      construct: constructYamlOmap,
    });
  },
});

// node_modules/js-yaml/lib/type/pairs.js
var require_pairs = __commonJS({
  "node_modules/js-yaml/lib/type/pairs.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _toString = Object.prototype.toString;
    function resolveYamlPairs(data) {
      if (data === null) return true;
      const object = data;
      const result = new Array(object.length);
      for (let index = 0, length = object.length; index < length; index += 1) {
        const pair = object[index];
        if (_toString.call(pair) !== "[object Object]") return false;
        const keys = Object.keys(pair);
        if (keys.length !== 1) return false;
        result[index] = [keys[0], pair[keys[0]]];
      }
      return true;
    }
    function constructYamlPairs(data) {
      if (data === null) return [];
      const object = data;
      const result = new Array(object.length);
      for (let index = 0, length = object.length; index < length; index += 1) {
        const pair = object[index];
        const keys = Object.keys(pair);
        result[index] = [keys[0], pair[keys[0]]];
      }
      return result;
    }
    module2.exports = new Type("tag:yaml.org,2002:pairs", {
      kind: "sequence",
      resolve: resolveYamlPairs,
      construct: constructYamlPairs,
    });
  },
});

// node_modules/js-yaml/lib/type/set.js
var require_set = __commonJS({
  "node_modules/js-yaml/lib/type/set.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    function resolveYamlSet(data) {
      if (data === null) return true;
      const object = data;
      for (const key in object) {
        if (_hasOwnProperty.call(object, key)) {
          if (object[key] !== null) return false;
        }
      }
      return true;
    }
    function constructYamlSet(data) {
      return data !== null ? data : {};
    }
    module2.exports = new Type("tag:yaml.org,2002:set", {
      kind: "mapping",
      resolve: resolveYamlSet,
      construct: constructYamlSet,
    });
  },
});

// node_modules/js-yaml/lib/schema/default.js
var require_default = __commonJS({
  "node_modules/js-yaml/lib/schema/default.js"(exports2, module2) {
    "use strict";
    module2.exports = require_core2().extend({
      implicit: [require_timestamp(), require_merge()],
      explicit: [
        require_binary(),
        require_omap(),
        require_pairs(),
        require_set(),
      ],
    });
  },
});

// node_modules/js-yaml/lib/loader.js
var require_loader = __commonJS({
  "node_modules/js-yaml/lib/loader.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var makeSnippet = require_snippet();
    var DEFAULT_SCHEMA = require_default();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CONTEXT_FLOW_IN = 1;
    var CONTEXT_FLOW_OUT = 2;
    var CONTEXT_BLOCK_IN = 3;
    var CONTEXT_BLOCK_OUT = 4;
    var CHOMPING_CLIP = 1;
    var CHOMPING_STRIP = 2;
    var CHOMPING_KEEP = 3;
    var PATTERN_NON_PRINTABLE =
      /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
    var PATTERN_FLOW_INDICATORS = /[,\[\]{}]/;
    var PATTERN_TAG_HANDLE = /^(?:!|!!|![0-9A-Za-z-]+!)$/;
    var PATTERN_TAG_URI =
      /^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;
    function _class(obj) {
      return Object.prototype.toString.call(obj);
    }
    function isEol(c) {
      return c === 10 || c === 13;
    }
    function isWhiteSpace(c) {
      return c === 9 || c === 32;
    }
    function isWsOrEol(c) {
      return c === 9 || c === 32 || c === 10 || c === 13;
    }
    function isFlowIndicator(c) {
      return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
    }
    function fromHexCode(c) {
      if (c >= 48 && c <= 57) {
        return c - 48;
      }
      const lc = c | 32;
      if (lc >= 97 && lc <= 102) {
        return lc - 97 + 10;
      }
      return -1;
    }
    function escapedHexLen(c) {
      if (c === 120) {
        return 2;
      }
      if (c === 117) {
        return 4;
      }
      if (c === 85) {
        return 8;
      }
      return 0;
    }
    function fromDecimalCode(c) {
      if (c >= 48 && c <= 57) {
        return c - 48;
      }
      return -1;
    }
    function simpleEscapeSequence(c) {
      switch (c) {
        case 48:
          return "\0";
        case 97:
          return "\x07";
        case 98:
          return "\b";
        case 116:
          return "	";
        case 9:
          return "	";
        case 110:
          return "\n";
        case 118:
          return "\v";
        case 102:
          return "\f";
        case 114:
          return "\r";
        case 101:
          return "\x1B";
        case 32:
          return " ";
        case 34:
          return '"';
        case 47:
          return "/";
        case 92:
          return "\\";
        case 78:
          return "\x85";
        case 95:
          return "\xA0";
        case 76:
          return "\u2028";
        case 80:
          return "\u2029";
        default:
          return "";
      }
    }
    function charFromCodepoint(c) {
      if (c <= 65535) {
        return String.fromCharCode(c);
      }
      return String.fromCharCode(
        ((c - 65536) >> 10) + 55296,
        ((c - 65536) & 1023) + 56320
      );
    }
    function setProperty(object, key, value) {
      if (key === "__proto__") {
        Object.defineProperty(object, key, {
          configurable: true,
          enumerable: true,
          writable: true,
          value,
        });
      } else {
        object[key] = value;
      }
    }
    var simpleEscapeCheck = new Array(256);
    var simpleEscapeMap = new Array(256);
    for (let i = 0; i < 256; i++) {
      simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
      simpleEscapeMap[i] = simpleEscapeSequence(i);
    }
    function State(input, options) {
      this.input = input;
      this.filename = options["filename"] || null;
      this.schema = options["schema"] || DEFAULT_SCHEMA;
      this.onWarning = options["onWarning"] || null;
      this.legacy = options["legacy"] || false;
      this.json = options["json"] || false;
      this.listener = options["listener"] || null;
      this.maxDepth =
        typeof options["maxDepth"] === "number" ? options["maxDepth"] : 100;
      this.maxMergeSeqLength =
        typeof options["maxMergeSeqLength"] === "number"
          ? options["maxMergeSeqLength"]
          : 20;
      this.implicitTypes = this.schema.compiledImplicit;
      this.typeMap = this.schema.compiledTypeMap;
      this.length = input.length;
      this.position = 0;
      this.line = 0;
      this.lineStart = 0;
      this.lineIndent = 0;
      this.depth = 0;
      this.firstTabInLine = -1;
      this.documents = [];
      this.anchorMapTransactions = [];
    }
    function generateError(state, message) {
      const mark = {
        name: state.filename,
        buffer: state.input.slice(0, -1),
        // omit trailing \0
        position: state.position,
        line: state.line,
        column: state.position - state.lineStart,
      };
      mark.snippet = makeSnippet(mark);
      return new YAMLException(message, mark);
    }
    function throwError(state, message) {
      throw generateError(state, message);
    }
    function throwWarning(state, message) {
      if (state.onWarning) {
        state.onWarning.call(null, generateError(state, message));
      }
    }
    function storeAnchor(state, name, value) {
      const transactions = state.anchorMapTransactions;
      if (transactions.length !== 0) {
        const transaction = transactions[transactions.length - 1];
        if (!_hasOwnProperty.call(transaction, name)) {
          transaction[name] = {
            existed: _hasOwnProperty.call(state.anchorMap, name),
            value: state.anchorMap[name],
          };
        }
      }
      state.anchorMap[name] = value;
    }
    function beginAnchorTransaction(state) {
      state.anchorMapTransactions.push(/* @__PURE__ */ Object.create(null));
    }
    function commitAnchorTransaction(state) {
      const transaction = state.anchorMapTransactions.pop();
      const transactions = state.anchorMapTransactions;
      if (transactions.length === 0) return;
      const parent = transactions[transactions.length - 1];
      const names = Object.keys(transaction);
      for (let index = 0, length = names.length; index < length; index += 1) {
        const name = names[index];
        if (!_hasOwnProperty.call(parent, name)) {
          parent[name] = transaction[name];
        }
      }
    }
    function rollbackAnchorTransaction(state) {
      const transaction = state.anchorMapTransactions.pop();
      const names = Object.keys(transaction);
      for (let index = names.length - 1; index >= 0; index -= 1) {
        const entry = transaction[names[index]];
        if (entry.existed) {
          state.anchorMap[names[index]] = entry.value;
        } else {
          delete state.anchorMap[names[index]];
        }
      }
    }
    function snapshotState(state) {
      return {
        position: state.position,
        line: state.line,
        lineStart: state.lineStart,
        lineIndent: state.lineIndent,
        firstTabInLine: state.firstTabInLine,
        tag: state.tag,
        anchor: state.anchor,
        kind: state.kind,
        result: state.result,
      };
    }
    function restoreState(state, snapshot) {
      state.position = snapshot.position;
      state.line = snapshot.line;
      state.lineStart = snapshot.lineStart;
      state.lineIndent = snapshot.lineIndent;
      state.firstTabInLine = snapshot.firstTabInLine;
      state.tag = snapshot.tag;
      state.anchor = snapshot.anchor;
      state.kind = snapshot.kind;
      state.result = snapshot.result;
    }
    var directiveHandlers = {
      YAML: function handleYamlDirective(state, name, args) {
        if (state.version !== null) {
          throwError(state, "duplication of %YAML directive");
        }
        if (args.length !== 1) {
          throwError(state, "YAML directive accepts exactly one argument");
        }
        const match3 = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (match3 === null) {
          throwError(state, "ill-formed argument of the YAML directive");
        }
        const major = parseInt(match3[1], 10);
        const minor = parseInt(match3[2], 10);
        if (major !== 1) {
          throwError(state, "unacceptable YAML version of the document");
        }
        state.version = args[0];
        state.checkLineBreaks = minor < 2;
        if (minor !== 1 && minor !== 2) {
          throwWarning(state, "unsupported YAML version of the document");
        }
      },
      TAG: function handleTagDirective(state, name, args) {
        let prefix;
        if (args.length !== 2) {
          throwError(state, "TAG directive accepts exactly two arguments");
        }
        const handle = args[0];
        prefix = args[1];
        if (!PATTERN_TAG_HANDLE.test(handle)) {
          throwError(
            state,
            "ill-formed tag handle (first argument) of the TAG directive"
          );
        }
        if (_hasOwnProperty.call(state.tagMap, handle)) {
          throwError(
            state,
            'there is a previously declared suffix for "' +
              handle +
              '" tag handle'
          );
        }
        if (!PATTERN_TAG_URI.test(prefix)) {
          throwError(
            state,
            "ill-formed tag prefix (second argument) of the TAG directive"
          );
        }
        try {
          prefix = decodeURIComponent(prefix);
        } catch (err) {
          throwError(state, "tag prefix is malformed: " + prefix);
        }
        state.tagMap[handle] = prefix;
      },
    };
    function captureSegment(state, start, end, checkJson) {
      if (start < end) {
        const _result = state.input.slice(start, end);
        if (checkJson) {
          for (
            let _position = 0, _length = _result.length;
            _position < _length;
            _position += 1
          ) {
            const _character = _result.charCodeAt(_position);
            if (
              !(_character === 9 || (_character >= 32 && _character <= 1114111))
            ) {
              throwError(state, "expected valid JSON character");
            }
          }
        } else if (PATTERN_NON_PRINTABLE.test(_result)) {
          throwError(state, "the stream contains non-printable characters");
        }
        state.result += _result;
      }
    }
    function mergeMappings(state, destination, source, overridableKeys) {
      if (!common.isObject(source)) {
        throwError(
          state,
          "cannot merge mappings; the provided source object is unacceptable"
        );
      }
      const sourceKeys = Object.keys(source);
      for (
        let index = 0, quantity = sourceKeys.length;
        index < quantity;
        index += 1
      ) {
        const key = sourceKeys[index];
        if (!_hasOwnProperty.call(destination, key)) {
          setProperty(destination, key, source[key]);
          overridableKeys[key] = true;
        }
      }
    }
    function storeMappingPair(
      state,
      _result,
      overridableKeys,
      keyTag,
      keyNode,
      valueNode,
      startLine,
      startLineStart,
      startPos
    ) {
      if (Array.isArray(keyNode)) {
        keyNode = Array.prototype.slice.call(keyNode);
        for (
          let index = 0, quantity = keyNode.length;
          index < quantity;
          index += 1
        ) {
          if (Array.isArray(keyNode[index])) {
            throwError(state, "nested arrays are not supported inside keys");
          }
          if (
            typeof keyNode === "object" &&
            _class(keyNode[index]) === "[object Object]"
          ) {
            keyNode[index] = "[object Object]";
          }
        }
      }
      if (
        typeof keyNode === "object" &&
        _class(keyNode) === "[object Object]"
      ) {
        keyNode = "[object Object]";
      }
      keyNode = String(keyNode);
      if (_result === null) {
        _result = {};
      }
      if (keyTag === "tag:yaml.org,2002:merge") {
        if (Array.isArray(valueNode)) {
          if (valueNode.length > state.maxMergeSeqLength) {
            throwError(
              state,
              "merge sequence length exceeded maxMergeSeqLength (" +
                state.maxMergeSeqLength +
                ")"
            );
          }
          const seen = /* @__PURE__ */ new Set();
          for (
            let index = 0, quantity = valueNode.length;
            index < quantity;
            index += 1
          ) {
            const src = valueNode[index];
            if (seen.has(src)) continue;
            seen.add(src);
            mergeMappings(state, _result, src, overridableKeys);
          }
        } else {
          mergeMappings(state, _result, valueNode, overridableKeys);
        }
      } else {
        if (
          !state.json &&
          !_hasOwnProperty.call(overridableKeys, keyNode) &&
          _hasOwnProperty.call(_result, keyNode)
        ) {
          state.line = startLine || state.line;
          state.lineStart = startLineStart || state.lineStart;
          state.position = startPos || state.position;
          throwError(state, "duplicated mapping key");
        }
        setProperty(_result, keyNode, valueNode);
        delete overridableKeys[keyNode];
      }
      return _result;
    }
    function readLineBreak(state) {
      const ch = state.input.charCodeAt(state.position);
      if (ch === 10) {
        state.position++;
      } else if (ch === 13) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 10) {
          state.position++;
        }
      } else {
        throwError(state, "a line break is expected");
      }
      state.line += 1;
      state.lineStart = state.position;
      state.firstTabInLine = -1;
    }
    function skipSeparationSpace(state, allowComments, checkIndent) {
      let lineBreaks = 0;
      let ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        while (isWhiteSpace(ch)) {
          if (ch === 9 && state.firstTabInLine === -1) {
            state.firstTabInLine = state.position;
          }
          ch = state.input.charCodeAt(++state.position);
        }
        if (allowComments && ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 10 && ch !== 13 && ch !== 0);
        }
        if (isEol(ch)) {
          readLineBreak(state);
          ch = state.input.charCodeAt(state.position);
          lineBreaks++;
          state.lineIndent = 0;
          while (ch === 32) {
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
          }
        } else {
          break;
        }
      }
      if (
        checkIndent !== -1 &&
        lineBreaks !== 0 &&
        state.lineIndent < checkIndent
      ) {
        throwWarning(state, "deficient indentation");
      }
      return lineBreaks;
    }
    function testDocumentSeparator(state) {
      let _position = state.position;
      let ch = state.input.charCodeAt(_position);
      if (
        (ch === 45 || ch === 46) &&
        ch === state.input.charCodeAt(_position + 1) &&
        ch === state.input.charCodeAt(_position + 2)
      ) {
        _position += 3;
        ch = state.input.charCodeAt(_position);
        if (ch === 0 || isWsOrEol(ch)) {
          return true;
        }
      }
      return false;
    }
    function writeFoldedLines(state, count) {
      if (count === 1) {
        state.result += " ";
      } else if (count > 1) {
        state.result += common.repeat("\n", count - 1);
      }
    }
    function readPlainScalar(state, nodeIndent, withinFlowCollection) {
      let captureStart;
      let captureEnd;
      let hasPendingContent;
      let _line;
      let _lineStart;
      let _lineIndent;
      const _kind = state.kind;
      const _result = state.result;
      let ch = state.input.charCodeAt(state.position);
      if (
        isWsOrEol(ch) ||
        isFlowIndicator(ch) ||
        ch === 35 ||
        ch === 38 ||
        ch === 42 ||
        ch === 33 ||
        ch === 124 ||
        ch === 62 ||
        ch === 39 ||
        ch === 34 ||
        ch === 37 ||
        ch === 64 ||
        ch === 96
      ) {
        return false;
      }
      if (ch === 63 || ch === 45) {
        const following = state.input.charCodeAt(state.position + 1);
        if (
          isWsOrEol(following) ||
          (withinFlowCollection && isFlowIndicator(following))
        ) {
          return false;
        }
      }
      state.kind = "scalar";
      state.result = "";
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
      while (ch !== 0) {
        if (ch === 58) {
          const following = state.input.charCodeAt(state.position + 1);
          if (
            isWsOrEol(following) ||
            (withinFlowCollection && isFlowIndicator(following))
          ) {
            break;
          }
        } else if (ch === 35) {
          const preceding = state.input.charCodeAt(state.position - 1);
          if (isWsOrEol(preceding)) {
            break;
          }
        } else if (
          (state.position === state.lineStart &&
            testDocumentSeparator(state)) ||
          (withinFlowCollection && isFlowIndicator(ch))
        ) {
          break;
        } else if (isEol(ch)) {
          _line = state.line;
          _lineStart = state.lineStart;
          _lineIndent = state.lineIndent;
          skipSeparationSpace(state, false, -1);
          if (state.lineIndent >= nodeIndent) {
            hasPendingContent = true;
            ch = state.input.charCodeAt(state.position);
            continue;
          } else {
            state.position = captureEnd;
            state.line = _line;
            state.lineStart = _lineStart;
            state.lineIndent = _lineIndent;
            break;
          }
        }
        if (hasPendingContent) {
          captureSegment(state, captureStart, captureEnd, false);
          writeFoldedLines(state, state.line - _line);
          captureStart = captureEnd = state.position;
          hasPendingContent = false;
        }
        if (!isWhiteSpace(ch)) {
          captureEnd = state.position + 1;
        }
        ch = state.input.charCodeAt(++state.position);
      }
      captureSegment(state, captureStart, captureEnd, false);
      if (state.result) {
        return true;
      }
      state.kind = _kind;
      state.result = _result;
      return false;
    }
    function readSingleQuotedScalar(state, nodeIndent) {
      let captureStart;
      let captureEnd;
      let ch = state.input.charCodeAt(state.position);
      if (ch !== 39) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 39) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (ch === 39) {
            captureStart = state.position;
            state.position++;
            captureEnd = state.position;
          } else {
            return true;
          }
        } else if (isEol(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(
            state,
            skipSeparationSpace(state, false, nodeIndent)
          );
          captureStart = captureEnd = state.position;
        } else if (
          state.position === state.lineStart &&
          testDocumentSeparator(state)
        ) {
          throwError(
            state,
            "unexpected end of the document within a single quoted scalar"
          );
        } else {
          state.position++;
          if (!isWhiteSpace(ch)) {
            captureEnd = state.position;
          }
        }
      }
      throwError(
        state,
        "unexpected end of the stream within a single quoted scalar"
      );
    }
    function readDoubleQuotedScalar(state, nodeIndent) {
      let captureStart;
      let captureEnd;
      let tmp;
      let ch = state.input.charCodeAt(state.position);
      if (ch !== 34) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 34) {
          captureSegment(state, captureStart, state.position, true);
          state.position++;
          return true;
        } else if (ch === 92) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (isEol(ch)) {
            skipSeparationSpace(state, false, nodeIndent);
          } else if (ch < 256 && simpleEscapeCheck[ch]) {
            state.result += simpleEscapeMap[ch];
            state.position++;
          } else if ((tmp = escapedHexLen(ch)) > 0) {
            let hexLength = tmp;
            let hexResult = 0;
            for (; hexLength > 0; hexLength--) {
              ch = state.input.charCodeAt(++state.position);
              if ((tmp = fromHexCode(ch)) >= 0) {
                hexResult = (hexResult << 4) + tmp;
              } else {
                throwError(state, "expected hexadecimal character");
              }
            }
            state.result += charFromCodepoint(hexResult);
            state.position++;
          } else {
            throwError(state, "unknown escape sequence");
          }
          captureStart = captureEnd = state.position;
        } else if (isEol(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(
            state,
            skipSeparationSpace(state, false, nodeIndent)
          );
          captureStart = captureEnd = state.position;
        } else if (
          state.position === state.lineStart &&
          testDocumentSeparator(state)
        ) {
          throwError(
            state,
            "unexpected end of the document within a double quoted scalar"
          );
        } else {
          state.position++;
          if (!isWhiteSpace(ch)) {
            captureEnd = state.position;
          }
        }
      }
      throwError(
        state,
        "unexpected end of the stream within a double quoted scalar"
      );
    }
    function readFlowCollection(state, nodeIndent) {
      let readNext = true;
      let _line;
      let _lineStart;
      let _pos;
      const _tag = state.tag;
      let _result;
      const _anchor = state.anchor;
      let terminator;
      let isPair;
      let isExplicitPair;
      let isMapping;
      const overridableKeys = /* @__PURE__ */ Object.create(null);
      let keyNode;
      let keyTag;
      let valueNode;
      let ch = state.input.charCodeAt(state.position);
      if (ch === 91) {
        terminator = 93;
        isMapping = false;
        _result = [];
      } else if (ch === 123) {
        terminator = 125;
        isMapping = true;
        _result = {};
      } else {
        return false;
      }
      if (state.anchor !== null) {
        storeAnchor(state, state.anchor, _result);
      }
      ch = state.input.charCodeAt(++state.position);
      while (ch !== 0) {
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === terminator) {
          state.position++;
          state.tag = _tag;
          state.anchor = _anchor;
          state.kind = isMapping ? "mapping" : "sequence";
          state.result = _result;
          return true;
        } else if (!readNext) {
          throwError(state, "missed comma between flow collection entries");
        } else if (ch === 44) {
          throwError(state, "expected the node content, but found ','");
        }
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
        if (ch === 63) {
          const following = state.input.charCodeAt(state.position + 1);
          if (isWsOrEol(following)) {
            isPair = isExplicitPair = true;
            state.position++;
            skipSeparationSpace(state, true, nodeIndent);
          }
        }
        _line = state.line;
        _lineStart = state.lineStart;
        _pos = state.position;
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if ((isExplicitPair || state.line === _line) && ch === 58) {
          isPair = true;
          ch = state.input.charCodeAt(++state.position);
          skipSeparationSpace(state, true, nodeIndent);
          composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
          valueNode = state.result;
        }
        if (isMapping) {
          storeMappingPair(
            state,
            _result,
            overridableKeys,
            keyTag,
            keyNode,
            valueNode,
            _line,
            _lineStart,
            _pos
          );
        } else if (isPair) {
          _result.push(
            storeMappingPair(
              state,
              null,
              overridableKeys,
              keyTag,
              keyNode,
              valueNode,
              _line,
              _lineStart,
              _pos
            )
          );
        } else {
          _result.push(keyNode);
        }
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === 44) {
          readNext = true;
          ch = state.input.charCodeAt(++state.position);
        } else {
          readNext = false;
        }
      }
      throwError(
        state,
        "unexpected end of the stream within a flow collection"
      );
    }
    function readBlockScalar(state, nodeIndent) {
      let folding;
      let chomping = CHOMPING_CLIP;
      let didReadContent = false;
      let detectedIndent = false;
      let textIndent = nodeIndent;
      let emptyLines = 0;
      let atMoreIndented = false;
      let tmp;
      let ch = state.input.charCodeAt(state.position);
      if (ch === 124) {
        folding = false;
      } else if (ch === 62) {
        folding = true;
      } else {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      while (ch !== 0) {
        ch = state.input.charCodeAt(++state.position);
        if (ch === 43 || ch === 45) {
          if (CHOMPING_CLIP === chomping) {
            chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
          } else {
            throwError(state, "repeat of a chomping mode identifier");
          }
        } else if ((tmp = fromDecimalCode(ch)) >= 0) {
          if (tmp === 0) {
            throwError(
              state,
              "bad explicit indentation width of a block scalar; it cannot be less than one"
            );
          } else if (!detectedIndent) {
            textIndent = nodeIndent + tmp - 1;
            detectedIndent = true;
          } else {
            throwError(state, "repeat of an indentation width identifier");
          }
        } else {
          break;
        }
      }
      if (isWhiteSpace(ch)) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (isWhiteSpace(ch));
        if (ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (!isEol(ch) && ch !== 0);
        }
      }
      while (ch !== 0) {
        readLineBreak(state);
        state.lineIndent = 0;
        ch = state.input.charCodeAt(state.position);
        while (
          (!detectedIndent || state.lineIndent < textIndent) &&
          ch === 32
        ) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
        if (!detectedIndent && state.lineIndent > textIndent) {
          textIndent = state.lineIndent;
        }
        if (isEol(ch)) {
          emptyLines++;
          continue;
        }
        if (!detectedIndent && textIndent === 0) {
          throwError(state, "missing indentation for block scalar");
        }
        if (state.lineIndent < textIndent) {
          if (chomping === CHOMPING_KEEP) {
            state.result += common.repeat(
              "\n",
              didReadContent ? 1 + emptyLines : emptyLines
            );
          } else if (chomping === CHOMPING_CLIP) {
            if (didReadContent) {
              state.result += "\n";
            }
          }
          break;
        }
        if (folding) {
          if (isWhiteSpace(ch)) {
            atMoreIndented = true;
            state.result += common.repeat(
              "\n",
              didReadContent ? 1 + emptyLines : emptyLines
            );
          } else if (atMoreIndented) {
            atMoreIndented = false;
            state.result += common.repeat("\n", emptyLines + 1);
          } else if (emptyLines === 0) {
            if (didReadContent) {
              state.result += " ";
            }
          } else {
            state.result += common.repeat("\n", emptyLines);
          }
        } else {
          state.result += common.repeat(
            "\n",
            didReadContent ? 1 + emptyLines : emptyLines
          );
        }
        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        const captureStart = state.position;
        while (!isEol(ch) && ch !== 0) {
          ch = state.input.charCodeAt(++state.position);
        }
        captureSegment(state, captureStart, state.position, false);
      }
      return true;
    }
    function readBlockSequence(state, nodeIndent) {
      const _tag = state.tag;
      const _anchor = state.anchor;
      const _result = [];
      let detected = false;
      if (state.firstTabInLine !== -1) return false;
      if (state.anchor !== null) {
        storeAnchor(state, state.anchor, _result);
      }
      let ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        if (state.firstTabInLine !== -1) {
          state.position = state.firstTabInLine;
          throwError(state, "tab characters must not be used in indentation");
        }
        if (ch !== 45) {
          break;
        }
        const following = state.input.charCodeAt(state.position + 1);
        if (!isWsOrEol(following)) {
          break;
        }
        detected = true;
        state.position++;
        if (skipSeparationSpace(state, true, -1)) {
          if (state.lineIndent <= nodeIndent) {
            _result.push(null);
            ch = state.input.charCodeAt(state.position);
            continue;
          }
        }
        const _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
        _result.push(state.result);
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (
          (state.line === _line || state.lineIndent > nodeIndent) &&
          ch !== 0
        ) {
          throwError(state, "bad indentation of a sequence entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "sequence";
        state.result = _result;
        return true;
      }
      return false;
    }
    function readBlockMapping(state, nodeIndent, flowIndent) {
      let allowCompact;
      let _keyLine;
      let _keyLineStart;
      let _keyPos;
      const _tag = state.tag;
      const _anchor = state.anchor;
      const _result = {};
      const overridableKeys = /* @__PURE__ */ Object.create(null);
      let keyTag = null;
      let keyNode = null;
      let valueNode = null;
      let atExplicitKey = false;
      let detected = false;
      if (state.firstTabInLine !== -1) return false;
      if (state.anchor !== null) {
        storeAnchor(state, state.anchor, _result);
      }
      let ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        if (!atExplicitKey && state.firstTabInLine !== -1) {
          state.position = state.firstTabInLine;
          throwError(state, "tab characters must not be used in indentation");
        }
        const following = state.input.charCodeAt(state.position + 1);
        const _line = state.line;
        if ((ch === 63 || ch === 58) && isWsOrEol(following)) {
          if (ch === 63) {
            if (atExplicitKey) {
              storeMappingPair(
                state,
                _result,
                overridableKeys,
                keyTag,
                keyNode,
                null,
                _keyLine,
                _keyLineStart,
                _keyPos
              );
              keyTag = keyNode = valueNode = null;
            }
            detected = true;
            atExplicitKey = true;
            allowCompact = true;
          } else if (atExplicitKey) {
            atExplicitKey = false;
            allowCompact = true;
          } else {
            throwError(
              state,
              "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"
            );
          }
          state.position += 1;
          ch = following;
        } else {
          _keyLine = state.line;
          _keyLineStart = state.lineStart;
          _keyPos = state.position;
          if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
            break;
          }
          if (state.line === _line) {
            ch = state.input.charCodeAt(state.position);
            while (isWhiteSpace(ch)) {
              ch = state.input.charCodeAt(++state.position);
            }
            if (ch === 58) {
              ch = state.input.charCodeAt(++state.position);
              if (!isWsOrEol(ch)) {
                throwError(
                  state,
                  "a whitespace character is expected after the key-value separator within a block mapping"
                );
              }
              if (atExplicitKey) {
                storeMappingPair(
                  state,
                  _result,
                  overridableKeys,
                  keyTag,
                  keyNode,
                  null,
                  _keyLine,
                  _keyLineStart,
                  _keyPos
                );
                keyTag = keyNode = valueNode = null;
              }
              detected = true;
              atExplicitKey = false;
              allowCompact = false;
              keyTag = state.tag;
              keyNode = state.result;
            } else if (detected) {
              throwError(
                state,
                "can not read an implicit mapping pair; a colon is missed"
              );
            } else {
              state.tag = _tag;
              state.anchor = _anchor;
              return true;
            }
          } else if (detected) {
            throwError(
              state,
              "can not read a block mapping entry; a multiline key may not be an implicit key"
            );
          } else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true;
          }
        }
        if (state.line === _line || state.lineIndent > nodeIndent) {
          if (atExplicitKey) {
            _keyLine = state.line;
            _keyLineStart = state.lineStart;
            _keyPos = state.position;
          }
          if (
            composeNode(
              state,
              nodeIndent,
              CONTEXT_BLOCK_OUT,
              true,
              allowCompact
            )
          ) {
            if (atExplicitKey) {
              keyNode = state.result;
            } else {
              valueNode = state.result;
            }
          }
          if (!atExplicitKey) {
            storeMappingPair(
              state,
              _result,
              overridableKeys,
              keyTag,
              keyNode,
              valueNode,
              _keyLine,
              _keyLineStart,
              _keyPos
            );
            keyTag = keyNode = valueNode = null;
          }
          skipSeparationSpace(state, true, -1);
          ch = state.input.charCodeAt(state.position);
        }
        if (
          (state.line === _line || state.lineIndent > nodeIndent) &&
          ch !== 0
        ) {
          throwError(state, "bad indentation of a mapping entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (atExplicitKey) {
        storeMappingPair(
          state,
          _result,
          overridableKeys,
          keyTag,
          keyNode,
          null,
          _keyLine,
          _keyLineStart,
          _keyPos
        );
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "mapping";
        state.result = _result;
      }
      return detected;
    }
    function readTagProperty(state) {
      let isVerbatim = false;
      let isNamed = false;
      let tagHandle;
      let tagName;
      let ch = state.input.charCodeAt(state.position);
      if (ch !== 33) return false;
      if (state.tag !== null) {
        throwError(state, "duplication of a tag property");
      }
      ch = state.input.charCodeAt(++state.position);
      if (ch === 60) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
      } else if (ch === 33) {
        isNamed = true;
        tagHandle = "!!";
        ch = state.input.charCodeAt(++state.position);
      } else {
        tagHandle = "!";
      }
      let _position = state.position;
      if (isVerbatim) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && ch !== 62);
        if (state.position < state.length) {
          tagName = state.input.slice(_position, state.position);
          ch = state.input.charCodeAt(++state.position);
        } else {
          throwError(
            state,
            "unexpected end of the stream within a verbatim tag"
          );
        }
      } else {
        while (ch !== 0 && !isWsOrEol(ch)) {
          if (ch === 33) {
            if (!isNamed) {
              tagHandle = state.input.slice(_position - 1, state.position + 1);
              if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                throwError(
                  state,
                  "named tag handle cannot contain such characters"
                );
              }
              isNamed = true;
              _position = state.position + 1;
            } else {
              throwError(state, "tag suffix cannot contain exclamation marks");
            }
          }
          ch = state.input.charCodeAt(++state.position);
        }
        tagName = state.input.slice(_position, state.position);
        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
          throwError(
            state,
            "tag suffix cannot contain flow indicator characters"
          );
        }
      }
      if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        throwError(
          state,
          "tag name cannot contain such characters: " + tagName
        );
      }
      try {
        tagName = decodeURIComponent(tagName);
      } catch (err) {
        throwError(state, "tag name is malformed: " + tagName);
      }
      if (isVerbatim) {
        state.tag = tagName;
      } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;
      } else if (tagHandle === "!") {
        state.tag = "!" + tagName;
      } else if (tagHandle === "!!") {
        state.tag = "tag:yaml.org,2002:" + tagName;
      } else {
        throwError(state, 'undeclared tag handle "' + tagHandle + '"');
      }
      return true;
    }
    function readAnchorProperty(state) {
      let ch = state.input.charCodeAt(state.position);
      if (ch !== 38) return false;
      if (state.anchor !== null) {
        throwError(state, "duplication of an anchor property");
      }
      ch = state.input.charCodeAt(++state.position);
      const _position = state.position;
      while (ch !== 0 && !isWsOrEol(ch) && !isFlowIndicator(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(
          state,
          "name of an anchor node must contain at least one character"
        );
      }
      state.anchor = state.input.slice(_position, state.position);
      return true;
    }
    function readAlias(state) {
      let ch = state.input.charCodeAt(state.position);
      if (ch !== 42) return false;
      ch = state.input.charCodeAt(++state.position);
      const _position = state.position;
      while (ch !== 0 && !isWsOrEol(ch) && !isFlowIndicator(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(
          state,
          "name of an alias node must contain at least one character"
        );
      }
      const alias = state.input.slice(_position, state.position);
      if (!_hasOwnProperty.call(state.anchorMap, alias)) {
        throwError(state, 'unidentified alias "' + alias + '"');
      }
      state.result = state.anchorMap[alias];
      skipSeparationSpace(state, true, -1);
      return true;
    }
    function tryReadBlockMappingFromProperty(
      state,
      propertyStart,
      nodeIndent,
      flowIndent
    ) {
      const fallbackState = snapshotState(state);
      beginAnchorTransaction(state);
      restoreState(state, propertyStart);
      state.tag = null;
      state.anchor = null;
      state.kind = null;
      state.result = null;
      if (
        readBlockMapping(state, nodeIndent, flowIndent) &&
        state.kind === "mapping"
      ) {
        commitAnchorTransaction(state);
        return true;
      }
      rollbackAnchorTransaction(state);
      restoreState(state, fallbackState);
      return false;
    }
    function composeNode(
      state,
      parentIndent,
      nodeContext,
      allowToSeek,
      allowCompact
    ) {
      let allowBlockScalars;
      let allowBlockCollections;
      let indentStatus = 1;
      let atNewLine = false;
      let hasContent = false;
      let propertyStart = null;
      let type2;
      let flowIndent;
      let blockIndent;
      if (state.depth >= state.maxDepth) {
        throwError(state, "nesting exceeded maxDepth (" + state.maxDepth + ")");
      }
      state.depth += 1;
      if (state.listener !== null) {
        state.listener("open", state);
      }
      state.tag = null;
      state.anchor = null;
      state.kind = null;
      state.result = null;
      const allowBlockStyles =
        (allowBlockScalars =
        allowBlockCollections =
          CONTEXT_BLOCK_OUT === nodeContext ||
          CONTEXT_BLOCK_IN === nodeContext);
      if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        }
      }
      if (indentStatus === 1) {
        while (true) {
          const ch = state.input.charCodeAt(state.position);
          const propertyState = snapshotState(state);
          if (
            atNewLine &&
            ((ch === 33 && state.tag !== null) ||
              (ch === 38 && state.anchor !== null))
          ) {
            break;
          }
          if (!readTagProperty(state) && !readAnchorProperty(state)) {
            break;
          }
          if (propertyStart === null) {
            propertyStart = propertyState;
          }
          if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            allowBlockCollections = allowBlockStyles;
            if (state.lineIndent > parentIndent) {
              indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
              indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
              indentStatus = -1;
            }
          } else {
            allowBlockCollections = false;
          }
        }
      }
      if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
      }
      if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
        if (
          CONTEXT_FLOW_IN === nodeContext ||
          CONTEXT_FLOW_OUT === nodeContext
        ) {
          flowIndent = parentIndent;
        } else {
          flowIndent = parentIndent + 1;
        }
        blockIndent = state.position - state.lineStart;
        if (indentStatus === 1) {
          if (
            (allowBlockCollections &&
              (readBlockSequence(state, blockIndent) ||
                readBlockMapping(state, blockIndent, flowIndent))) ||
            readFlowCollection(state, flowIndent)
          ) {
            hasContent = true;
          } else {
            const ch = state.input.charCodeAt(state.position);
            if (
              propertyStart !== null &&
              allowBlockStyles &&
              !allowBlockCollections &&
              ch !== 124 &&
              ch !== 62 &&
              tryReadBlockMappingFromProperty(
                state,
                propertyStart,
                propertyStart.position - propertyStart.lineStart,
                flowIndent
              )
            ) {
              hasContent = true;
            } else if (
              (allowBlockScalars && readBlockScalar(state, flowIndent)) ||
              readSingleQuotedScalar(state, flowIndent) ||
              readDoubleQuotedScalar(state, flowIndent)
            ) {
              hasContent = true;
            } else if (readAlias(state)) {
              hasContent = true;
              if (state.tag !== null || state.anchor !== null) {
                throwError(state, "alias node should not have any properties");
              }
            } else if (
              readPlainScalar(
                state,
                flowIndent,
                CONTEXT_FLOW_IN === nodeContext
              )
            ) {
              hasContent = true;
              if (state.tag === null) {
                state.tag = "?";
              }
            }
            if (state.anchor !== null) {
              storeAnchor(state, state.anchor, state.result);
            }
          }
        } else if (indentStatus === 0) {
          hasContent =
            allowBlockCollections && readBlockSequence(state, blockIndent);
        }
      }
      if (state.tag === null) {
        if (state.anchor !== null) {
          storeAnchor(state, state.anchor, state.result);
        }
      } else if (state.tag === "?") {
        if (state.result !== null && state.kind !== "scalar") {
          throwError(
            state,
            'unacceptable node kind for !<?> tag; it should be "scalar", not "' +
              state.kind +
              '"'
          );
        }
        for (
          let typeIndex = 0, typeQuantity = state.implicitTypes.length;
          typeIndex < typeQuantity;
          typeIndex += 1
        ) {
          type2 = state.implicitTypes[typeIndex];
          if (type2.resolve(state.result)) {
            state.result = type2.construct(state.result);
            state.tag = type2.tag;
            if (state.anchor !== null) {
              storeAnchor(state, state.anchor, state.result);
            }
            break;
          }
        }
      } else if (state.tag !== "!") {
        if (
          _hasOwnProperty.call(
            state.typeMap[state.kind || "fallback"],
            state.tag
          )
        ) {
          type2 = state.typeMap[state.kind || "fallback"][state.tag];
        } else {
          type2 = null;
          const typeList = state.typeMap.multi[state.kind || "fallback"];
          for (
            let typeIndex = 0, typeQuantity = typeList.length;
            typeIndex < typeQuantity;
            typeIndex += 1
          ) {
            if (
              state.tag.slice(0, typeList[typeIndex].tag.length) ===
              typeList[typeIndex].tag
            ) {
              type2 = typeList[typeIndex];
              break;
            }
          }
        }
        if (!type2) {
          throwError(state, "unknown tag !<" + state.tag + ">");
        }
        if (state.result !== null && type2.kind !== state.kind) {
          throwError(
            state,
            "unacceptable node kind for !<" +
              state.tag +
              '> tag; it should be "' +
              type2.kind +
              '", not "' +
              state.kind +
              '"'
          );
        }
        if (!type2.resolve(state.result, state.tag)) {
          throwError(
            state,
            "cannot resolve a node with !<" + state.tag + "> explicit tag"
          );
        } else {
          state.result = type2.construct(state.result, state.tag);
          if (state.anchor !== null) {
            storeAnchor(state, state.anchor, state.result);
          }
        }
      }
      if (state.listener !== null) {
        state.listener("close", state);
      }
      state.depth -= 1;
      return state.tag !== null || state.anchor !== null || hasContent;
    }
    function readDocument(state) {
      const documentStart = state.position;
      let hasDirectives = false;
      let ch;
      state.version = null;
      state.checkLineBreaks = state.legacy;
      state.tagMap = /* @__PURE__ */ Object.create(null);
      state.anchorMap = /* @__PURE__ */ Object.create(null);
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (state.lineIndent > 0 || ch !== 37) {
          break;
        }
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        let _position = state.position;
        while (ch !== 0 && !isWsOrEol(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        const directiveName = state.input.slice(_position, state.position);
        const directiveArgs = [];
        if (directiveName.length < 1) {
          throwError(
            state,
            "directive name must not be less than one character in length"
          );
        }
        while (ch !== 0) {
          while (isWhiteSpace(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (ch === 35) {
            do {
              ch = state.input.charCodeAt(++state.position);
            } while (ch !== 0 && !isEol(ch));
            break;
          }
          if (isEol(ch)) break;
          _position = state.position;
          while (ch !== 0 && !isWsOrEol(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          directiveArgs.push(state.input.slice(_position, state.position));
        }
        if (ch !== 0) readLineBreak(state);
        if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
          directiveHandlers[directiveName](state, directiveName, directiveArgs);
        } else {
          throwWarning(
            state,
            'unknown document directive "' + directiveName + '"'
          );
        }
      }
      skipSeparationSpace(state, true, -1);
      if (
        state.lineIndent === 0 &&
        state.input.charCodeAt(state.position) === 45 &&
        state.input.charCodeAt(state.position + 1) === 45 &&
        state.input.charCodeAt(state.position + 2) === 45
      ) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      } else if (hasDirectives) {
        throwError(state, "directives end mark is expected");
      }
      composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
      skipSeparationSpace(state, true, -1);
      if (
        state.checkLineBreaks &&
        PATTERN_NON_ASCII_LINE_BREAKS.test(
          state.input.slice(documentStart, state.position)
        )
      ) {
        throwWarning(state, "non-ASCII line breaks are interpreted as content");
      }
      state.documents.push(state.result);
      if (state.position === state.lineStart && testDocumentSeparator(state)) {
        if (state.input.charCodeAt(state.position) === 46) {
          state.position += 3;
          skipSeparationSpace(state, true, -1);
        }
        return;
      }
      if (state.position < state.length - 1) {
        throwError(
          state,
          "end of the stream or a document separator is expected"
        );
      }
    }
    function loadDocuments(input, options) {
      input = String(input);
      options = options || {};
      if (input.length !== 0) {
        if (
          input.charCodeAt(input.length - 1) !== 10 &&
          input.charCodeAt(input.length - 1) !== 13
        ) {
          input += "\n";
        }
        if (input.charCodeAt(0) === 65279) {
          input = input.slice(1);
        }
      }
      const state = new State(input, options);
      const nullpos = input.indexOf("\0");
      if (nullpos !== -1) {
        state.position = nullpos;
        throwError(state, "null byte is not allowed in input");
      }
      state.input += "\0";
      while (state.input.charCodeAt(state.position) === 32) {
        state.lineIndent += 1;
        state.position += 1;
      }
      while (state.position < state.length - 1) {
        readDocument(state);
      }
      return state.documents;
    }
    function loadAll(input, iterator, options) {
      if (
        iterator !== null &&
        typeof iterator === "object" &&
        typeof options === "undefined"
      ) {
        options = iterator;
        iterator = null;
      }
      const documents = loadDocuments(input, options);
      if (typeof iterator !== "function") {
        return documents;
      }
      for (
        let index = 0, length = documents.length;
        index < length;
        index += 1
      ) {
        iterator(documents[index]);
      }
    }
    function load(input, options) {
      const documents = loadDocuments(input, options);
      if (documents.length === 0) {
        return void 0;
      } else if (documents.length === 1) {
        return documents[0];
      }
      throw new YAMLException(
        "expected a single document in the stream, but found more"
      );
    }
    module2.exports.loadAll = loadAll;
    module2.exports.load = load;
  },
});

// node_modules/js-yaml/lib/dumper.js
var require_dumper = __commonJS({
  "node_modules/js-yaml/lib/dumper.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var DEFAULT_SCHEMA = require_default();
    var _toString = Object.prototype.toString;
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CHAR_BOM = 65279;
    var CHAR_TAB = 9;
    var CHAR_LINE_FEED = 10;
    var CHAR_CARRIAGE_RETURN = 13;
    var CHAR_SPACE = 32;
    var CHAR_EXCLAMATION = 33;
    var CHAR_DOUBLE_QUOTE = 34;
    var CHAR_SHARP = 35;
    var CHAR_PERCENT = 37;
    var CHAR_AMPERSAND = 38;
    var CHAR_SINGLE_QUOTE = 39;
    var CHAR_ASTERISK = 42;
    var CHAR_COMMA = 44;
    var CHAR_MINUS = 45;
    var CHAR_COLON = 58;
    var CHAR_EQUALS = 61;
    var CHAR_GREATER_THAN = 62;
    var CHAR_QUESTION = 63;
    var CHAR_COMMERCIAL_AT = 64;
    var CHAR_LEFT_SQUARE_BRACKET = 91;
    var CHAR_RIGHT_SQUARE_BRACKET = 93;
    var CHAR_GRAVE_ACCENT = 96;
    var CHAR_LEFT_CURLY_BRACKET = 123;
    var CHAR_VERTICAL_LINE = 124;
    var CHAR_RIGHT_CURLY_BRACKET = 125;
    var ESCAPE_SEQUENCES = {};
    ESCAPE_SEQUENCES[0] = "\\0";
    ESCAPE_SEQUENCES[7] = "\\a";
    ESCAPE_SEQUENCES[8] = "\\b";
    ESCAPE_SEQUENCES[9] = "\\t";
    ESCAPE_SEQUENCES[10] = "\\n";
    ESCAPE_SEQUENCES[11] = "\\v";
    ESCAPE_SEQUENCES[12] = "\\f";
    ESCAPE_SEQUENCES[13] = "\\r";
    ESCAPE_SEQUENCES[27] = "\\e";
    ESCAPE_SEQUENCES[34] = '\\"';
    ESCAPE_SEQUENCES[92] = "\\\\";
    ESCAPE_SEQUENCES[133] = "\\N";
    ESCAPE_SEQUENCES[160] = "\\_";
    ESCAPE_SEQUENCES[8232] = "\\L";
    ESCAPE_SEQUENCES[8233] = "\\P";
    var DEPRECATED_BOOLEANS_SYNTAX = [
      "y",
      "Y",
      "yes",
      "Yes",
      "YES",
      "on",
      "On",
      "ON",
      "n",
      "N",
      "no",
      "No",
      "NO",
      "off",
      "Off",
      "OFF",
    ];
    var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
    function compileStyleMap(schema, map) {
      if (map === null) return {};
      const result = {};
      const keys = Object.keys(map);
      for (let index = 0, length = keys.length; index < length; index += 1) {
        let tag = keys[index];
        let style = String(map[tag]);
        if (tag.slice(0, 2) === "!!") {
          tag = "tag:yaml.org,2002:" + tag.slice(2);
        }
        const type2 = schema.compiledTypeMap["fallback"][tag];
        if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
          style = type2.styleAliases[style];
        }
        result[tag] = style;
      }
      return result;
    }
    function encodeHex(character) {
      let handle;
      let length;
      const string = character.toString(16).toUpperCase();
      if (character <= 255) {
        handle = "x";
        length = 2;
      } else if (character <= 65535) {
        handle = "u";
        length = 4;
      } else if (character <= 4294967295) {
        handle = "U";
        length = 8;
      } else {
        throw new YAMLException(
          "code point within a string may not be greater than 0xFFFFFFFF"
        );
      }
      return (
        "\\" + handle + common.repeat("0", length - string.length) + string
      );
    }
    var QUOTING_TYPE_SINGLE = 1;
    var QUOTING_TYPE_DOUBLE = 2;
    function State(options) {
      this.schema = options["schema"] || DEFAULT_SCHEMA;
      this.indent = Math.max(1, options["indent"] || 2);
      this.noArrayIndent = options["noArrayIndent"] || false;
      this.skipInvalid = options["skipInvalid"] || false;
      this.flowLevel = common.isNothing(options["flowLevel"])
        ? -1
        : options["flowLevel"];
      this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
      this.sortKeys = options["sortKeys"] || false;
      this.lineWidth = options["lineWidth"] || 80;
      this.noRefs = options["noRefs"] || false;
      this.noCompatMode = options["noCompatMode"] || false;
      this.condenseFlow = options["condenseFlow"] || false;
      this.quotingType =
        options["quotingType"] === '"'
          ? QUOTING_TYPE_DOUBLE
          : QUOTING_TYPE_SINGLE;
      this.forceQuotes = options["forceQuotes"] || false;
      this.replacer =
        typeof options["replacer"] === "function" ? options["replacer"] : null;
      this.implicitTypes = this.schema.compiledImplicit;
      this.explicitTypes = this.schema.compiledExplicit;
      this.tag = null;
      this.result = "";
      this.duplicates = [];
      this.usedDuplicates = null;
    }
    function indentString(string, spaces) {
      const ind = common.repeat(" ", spaces);
      let position = 0;
      let result = "";
      const length = string.length;
      while (position < length) {
        let line;
        const next = string.indexOf("\n", position);
        if (next === -1) {
          line = string.slice(position);
          position = length;
        } else {
          line = string.slice(position, next + 1);
          position = next + 1;
        }
        if (line.length && line !== "\n") result += ind;
        result += line;
      }
      return result;
    }
    function generateNextLine(state, level) {
      return "\n" + common.repeat(" ", state.indent * level);
    }
    function testImplicitResolving(state, str) {
      for (
        let index = 0, length = state.implicitTypes.length;
        index < length;
        index += 1
      ) {
        const type2 = state.implicitTypes[index];
        if (type2.resolve(str)) {
          return true;
        }
      }
      return false;
    }
    function isWhitespace(c) {
      return c === CHAR_SPACE || c === CHAR_TAB;
    }
    function isPrintable(c) {
      return (
        (c >= 32 && c <= 126) ||
        (c >= 161 && c <= 55295 && c !== 8232 && c !== 8233) ||
        (c >= 57344 && c <= 65533 && c !== CHAR_BOM) ||
        (c >= 65536 && c <= 1114111)
      );
    }
    function isNsCharOrWhitespace(c) {
      return (
        isPrintable(c) &&
        c !== CHAR_BOM && // - b-char
        c !== CHAR_CARRIAGE_RETURN &&
        c !== CHAR_LINE_FEED
      );
    }
    function isPlainSafe(c, prev, inblock) {
      const cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
      const cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
      return (
        // ns-plain-safe
        ((inblock
          ? cIsNsCharOrWhitespace
          : cIsNsCharOrWhitespace && // - c-flow-indicator
            c !== CHAR_COMMA &&
            c !== CHAR_LEFT_SQUARE_BRACKET &&
            c !== CHAR_RIGHT_SQUARE_BRACKET &&
            c !== CHAR_LEFT_CURLY_BRACKET &&
            c !== CHAR_RIGHT_CURLY_BRACKET) && // ns-plain-char
          c !== CHAR_SHARP && // false on '#'
          !(prev === CHAR_COLON && !cIsNsChar)) || // false on ': '
        (isNsCharOrWhitespace(prev) &&
          !isWhitespace(prev) &&
          c === CHAR_SHARP) || // change to true on '[^ ]#'
        (prev === CHAR_COLON && cIsNsChar)
      );
    }
    function isPlainSafeFirst(c) {
      return (
        isPrintable(c) &&
        c !== CHAR_BOM &&
        !isWhitespace(c) && // - s-white
        // - (c-indicator ::=
        // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
        c !== CHAR_MINUS &&
        c !== CHAR_QUESTION &&
        c !== CHAR_COLON &&
        c !== CHAR_COMMA &&
        c !== CHAR_LEFT_SQUARE_BRACKET &&
        c !== CHAR_RIGHT_SQUARE_BRACKET &&
        c !== CHAR_LEFT_CURLY_BRACKET &&
        c !== CHAR_RIGHT_CURLY_BRACKET && // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
        c !== CHAR_SHARP &&
        c !== CHAR_AMPERSAND &&
        c !== CHAR_ASTERISK &&
        c !== CHAR_EXCLAMATION &&
        c !== CHAR_VERTICAL_LINE &&
        c !== CHAR_EQUALS &&
        c !== CHAR_GREATER_THAN &&
        c !== CHAR_SINGLE_QUOTE &&
        c !== CHAR_DOUBLE_QUOTE && // | “%” | “@” | “`”)
        c !== CHAR_PERCENT &&
        c !== CHAR_COMMERCIAL_AT &&
        c !== CHAR_GRAVE_ACCENT
      );
    }
    function isPlainSafeLast(c) {
      return !isWhitespace(c) && c !== CHAR_COLON;
    }
    function codePointAt(string, pos) {
      const first = string.charCodeAt(pos);
      let second;
      if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
        second = string.charCodeAt(pos + 1);
        if (second >= 56320 && second <= 57343) {
          return (first - 55296) * 1024 + second - 56320 + 65536;
        }
      }
      return first;
    }
    function needIndentIndicator(string) {
      const leadingSpaceRe = /^\n* /;
      return leadingSpaceRe.test(string);
    }
    var STYLE_PLAIN = 1;
    var STYLE_SINGLE = 2;
    var STYLE_LITERAL = 3;
    var STYLE_FOLDED = 4;
    var STYLE_DOUBLE = 5;
    function chooseScalarStyle(
      string,
      singleLineOnly,
      indentPerLevel,
      lineWidth,
      testAmbiguousType,
      quotingType,
      forceQuotes,
      inblock
    ) {
      let i;
      let char = 0;
      let prevChar = null;
      let hasLineBreak = false;
      let hasFoldableLine = false;
      const shouldTrackWidth = lineWidth !== -1;
      let previousLineBreak = -1;
      let plain =
        isPlainSafeFirst(codePointAt(string, 0)) &&
        isPlainSafeLast(codePointAt(string, string.length - 1));
      if (singleLineOnly || forceQuotes) {
        for (i = 0; i < string.length; char >= 65536 ? (i += 2) : i++) {
          char = codePointAt(string, i);
          if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          plain = plain && isPlainSafe(char, prevChar, inblock);
          prevChar = char;
        }
      } else {
        for (i = 0; i < string.length; char >= 65536 ? (i += 2) : i++) {
          char = codePointAt(string, i);
          if (char === CHAR_LINE_FEED) {
            hasLineBreak = true;
            if (shouldTrackWidth) {
              hasFoldableLine =
                hasFoldableLine || // Foldable line = too long, and not more-indented.
                (i - previousLineBreak - 1 > lineWidth &&
                  string[previousLineBreak + 1] !== " ");
              previousLineBreak = i;
            }
          } else if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          plain = plain && isPlainSafe(char, prevChar, inblock);
          prevChar = char;
        }
        hasFoldableLine =
          hasFoldableLine ||
          (shouldTrackWidth &&
            i - previousLineBreak - 1 > lineWidth &&
            string[previousLineBreak + 1] !== " ");
      }
      if (!hasLineBreak && !hasFoldableLine) {
        if (plain && !forceQuotes && !testAmbiguousType(string)) {
          return STYLE_PLAIN;
        }
        return quotingType === QUOTING_TYPE_DOUBLE
          ? STYLE_DOUBLE
          : STYLE_SINGLE;
      }
      if (indentPerLevel > 9 && needIndentIndicator(string)) {
        return STYLE_DOUBLE;
      }
      if (!forceQuotes) {
        return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
      }
      return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
    }
    function writeScalar(state, string, level, iskey, inblock) {
      state.dump = (function () {
        if (string.length === 0) {
          return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
        }
        if (!state.noCompatMode) {
          if (
            DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 ||
            DEPRECATED_BASE60_SYNTAX.test(string)
          ) {
            return state.quotingType === QUOTING_TYPE_DOUBLE
              ? '"' + string + '"'
              : "'" + string + "'";
          }
        }
        const indent = state.indent * Math.max(1, level);
        const lineWidth =
          state.lineWidth === -1
            ? -1
            : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
        const singleLineOnly =
          iskey || // No block styles in flow mode.
          (state.flowLevel > -1 && level >= state.flowLevel);
        function testAmbiguity(string2) {
          return testImplicitResolving(state, string2);
        }
        switch (
          chooseScalarStyle(
            string,
            singleLineOnly,
            state.indent,
            lineWidth,
            testAmbiguity,
            state.quotingType,
            state.forceQuotes && !iskey,
            inblock
          )
        ) {
          case STYLE_PLAIN:
            return string;
          case STYLE_SINGLE:
            return "'" + string.replace(/'/g, "''") + "'";
          case STYLE_LITERAL:
            return (
              "|" +
              blockHeader(string, state.indent) +
              dropEndingNewline(indentString(string, indent))
            );
          case STYLE_FOLDED:
            return (
              ">" +
              blockHeader(string, state.indent) +
              dropEndingNewline(
                indentString(foldString(string, lineWidth), indent)
              )
            );
          case STYLE_DOUBLE:
            return '"' + escapeString(string, lineWidth) + '"';
          default:
            throw new YAMLException("impossible error: invalid scalar style");
        }
      })();
    }
    function blockHeader(string, indentPerLevel) {
      const indentIndicator = needIndentIndicator(string)
        ? String(indentPerLevel)
        : "";
      const clip = string[string.length - 1] === "\n";
      const keep =
        clip && (string[string.length - 2] === "\n" || string === "\n");
      const chomp = keep ? "+" : clip ? "" : "-";
      return indentIndicator + chomp + "\n";
    }
    function dropEndingNewline(string) {
      return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
    }
    function foldString(string, width) {
      const lineRe = /(\n+)([^\n]*)/g;
      let result = (function () {
        let nextLF = string.indexOf("\n");
        nextLF = nextLF !== -1 ? nextLF : string.length;
        lineRe.lastIndex = nextLF;
        return foldLine(string.slice(0, nextLF), width);
      })();
      let prevMoreIndented = string[0] === "\n" || string[0] === " ";
      let moreIndented;
      let match3;
      while ((match3 = lineRe.exec(string))) {
        const prefix = match3[1];
        const line = match3[2];
        moreIndented = line[0] === " ";
        result +=
          prefix +
          (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") +
          foldLine(line, width);
        prevMoreIndented = moreIndented;
      }
      return result;
    }
    function foldLine(line, width) {
      if (line === "" || line[0] === " ") return line;
      const breakRe = / [^ ]/g;
      let match3;
      let start = 0;
      let end;
      let curr = 0;
      let next = 0;
      let result = "";
      while ((match3 = breakRe.exec(line))) {
        next = match3.index;
        if (next - start > width) {
          end = curr > start ? curr : next;
          result += "\n" + line.slice(start, end);
          start = end + 1;
        }
        curr = next;
      }
      result += "\n";
      if (line.length - start > width && curr > start) {
        result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
      } else {
        result += line.slice(start);
      }
      return result.slice(1);
    }
    function escapeString(string) {
      let result = "";
      let char = 0;
      for (let i = 0; i < string.length; char >= 65536 ? (i += 2) : i++) {
        char = codePointAt(string, i);
        const escapeSeq = ESCAPE_SEQUENCES[char];
        if (!escapeSeq && isPrintable(char)) {
          result += string[i];
          if (char >= 65536) result += string[i + 1];
        } else {
          result += escapeSeq || encodeHex(char);
        }
      }
      return result;
    }
    function writeFlowSequence(state, level, object) {
      let _result = "";
      const _tag = state.tag;
      for (let index = 0, length = object.length; index < length; index += 1) {
        let value = object[index];
        if (state.replacer) {
          value = state.replacer.call(object, String(index), value);
        }
        if (
          writeNode(state, level, value, false, false) ||
          (typeof value === "undefined" &&
            writeNode(state, level, null, false, false))
        ) {
          if (_result !== "") _result += "," + (!state.condenseFlow ? " " : "");
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = "[" + _result + "]";
    }
    function writeBlockSequence(state, level, object, compact) {
      let _result = "";
      const _tag = state.tag;
      for (let index = 0, length = object.length; index < length; index += 1) {
        let value = object[index];
        if (state.replacer) {
          value = state.replacer.call(object, String(index), value);
        }
        if (
          writeNode(state, level + 1, value, true, true, false, true) ||
          (typeof value === "undefined" &&
            writeNode(state, level + 1, null, true, true, false, true))
        ) {
          if (!compact || _result !== "") {
            _result += generateNextLine(state, level);
          }
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            _result += "-";
          } else {
            _result += "- ";
          }
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = _result || "[]";
    }
    function writeFlowMapping(state, level, object) {
      let _result = "";
      const _tag = state.tag;
      const objectKeyList = Object.keys(object);
      for (
        let index = 0, length = objectKeyList.length;
        index < length;
        index += 1
      ) {
        let pairBuffer = "";
        if (_result !== "") pairBuffer += ", ";
        if (state.condenseFlow) pairBuffer += '"';
        const objectKey = objectKeyList[index];
        let objectValue = object[objectKey];
        if (state.replacer) {
          objectValue = state.replacer.call(object, objectKey, objectValue);
        }
        if (!writeNode(state, level, objectKey, false, false)) {
          continue;
        }
        if (state.dump.length > 1024) pairBuffer += "? ";
        pairBuffer +=
          state.dump +
          (state.condenseFlow ? '"' : "") +
          ":" +
          (state.condenseFlow ? "" : " ");
        if (!writeNode(state, level, objectValue, false, false)) {
          continue;
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = "{" + _result + "}";
    }
    function writeBlockMapping(state, level, object, compact) {
      let _result = "";
      const _tag = state.tag;
      const objectKeyList = Object.keys(object);
      if (state.sortKeys === true) {
        objectKeyList.sort();
      } else if (typeof state.sortKeys === "function") {
        objectKeyList.sort(state.sortKeys);
      } else if (state.sortKeys) {
        throw new YAMLException("sortKeys must be a boolean or a function");
      }
      for (
        let index = 0, length = objectKeyList.length;
        index < length;
        index += 1
      ) {
        let pairBuffer = "";
        if (!compact || _result !== "") {
          pairBuffer += generateNextLine(state, level);
        }
        const objectKey = objectKeyList[index];
        let objectValue = object[objectKey];
        if (state.replacer) {
          objectValue = state.replacer.call(object, objectKey, objectValue);
        }
        if (!writeNode(state, level + 1, objectKey, true, true, true)) {
          continue;
        }
        const explicitPair =
          (state.tag !== null && state.tag !== "?") ||
          (state.dump && state.dump.length > 1024);
        if (explicitPair) {
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            pairBuffer += "?";
          } else {
            pairBuffer += "? ";
          }
        }
        pairBuffer += state.dump;
        if (explicitPair) {
          pairBuffer += generateNextLine(state, level);
        }
        if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
          continue;
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += ":";
        } else {
          pairBuffer += ": ";
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = _result || "{}";
    }
    function detectType(state, object, explicit) {
      const typeList = explicit ? state.explicitTypes : state.implicitTypes;
      for (
        let index = 0, length = typeList.length;
        index < length;
        index += 1
      ) {
        const type2 = typeList[index];
        if (
          (type2.instanceOf || type2.predicate) &&
          (!type2.instanceOf ||
            (typeof object === "object" &&
              object instanceof type2.instanceOf)) &&
          (!type2.predicate || type2.predicate(object))
        ) {
          if (explicit) {
            if (type2.multi && type2.representName) {
              state.tag = type2.representName(object);
            } else {
              state.tag = type2.tag;
            }
          } else {
            state.tag = "?";
          }
          if (type2.represent) {
            const style = state.styleMap[type2.tag] || type2.defaultStyle;
            let _result;
            if (_toString.call(type2.represent) === "[object Function]") {
              _result = type2.represent(object, style);
            } else if (_hasOwnProperty.call(type2.represent, style)) {
              _result = type2.represent[style](object, style);
            } else {
              throw new YAMLException(
                "!<" +
                  type2.tag +
                  '> tag resolver accepts not "' +
                  style +
                  '" style'
              );
            }
            state.dump = _result;
          }
          return true;
        }
      }
      return false;
    }
    function writeNode(
      state,
      level,
      object,
      block,
      compact,
      iskey,
      isblockseq
    ) {
      state.tag = null;
      state.dump = object;
      if (!detectType(state, object, false)) {
        detectType(state, object, true);
      }
      const type2 = _toString.call(state.dump);
      const inblock = block;
      if (block) {
        block = state.flowLevel < 0 || state.flowLevel > level;
      }
      const objectOrArray =
        type2 === "[object Object]" || type2 === "[object Array]";
      let duplicateIndex;
      let duplicate;
      if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
      }
      if (
        (state.tag !== null && state.tag !== "?") ||
        duplicate ||
        (state.indent !== 2 && level > 0)
      ) {
        compact = false;
      }
      if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = "*ref_" + duplicateIndex;
      } else {
        if (
          objectOrArray &&
          duplicate &&
          !state.usedDuplicates[duplicateIndex]
        ) {
          state.usedDuplicates[duplicateIndex] = true;
        }
        if (type2 === "[object Object]") {
          if (block && Object.keys(state.dump).length !== 0) {
            writeBlockMapping(state, level, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowMapping(state, level, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type2 === "[object Array]") {
          if (block && state.dump.length !== 0) {
            if (state.noArrayIndent && !isblockseq && level > 0) {
              writeBlockSequence(state, level - 1, state.dump, compact);
            } else {
              writeBlockSequence(state, level, state.dump, compact);
            }
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowSequence(state, level, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type2 === "[object String]") {
          if (state.tag !== "?") {
            writeScalar(state, state.dump, level, iskey, inblock);
          }
        } else if (type2 === "[object Undefined]") {
          return false;
        } else {
          if (state.skipInvalid) return false;
          throw new YAMLException(
            "unacceptable kind of an object to dump " + type2
          );
        }
        if (state.tag !== null && state.tag !== "?") {
          let tagStr = encodeURI(
            state.tag[0] === "!" ? state.tag.slice(1) : state.tag
          ).replace(/!/g, "%21");
          if (state.tag[0] === "!") {
            tagStr = "!" + tagStr;
          } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
            tagStr = "!!" + tagStr.slice(18);
          } else {
            tagStr = "!<" + tagStr + ">";
          }
          state.dump = tagStr + " " + state.dump;
        }
      }
      return true;
    }
    function getDuplicateReferences(object, state) {
      const objects = [];
      const duplicatesIndexes = [];
      inspectNode(object, objects, duplicatesIndexes);
      const length = duplicatesIndexes.length;
      for (let index = 0; index < length; index += 1) {
        state.duplicates.push(objects[duplicatesIndexes[index]]);
      }
      state.usedDuplicates = new Array(length);
    }
    function inspectNode(object, objects, duplicatesIndexes) {
      if (object !== null && typeof object === "object") {
        const index = objects.indexOf(object);
        if (index !== -1) {
          if (duplicatesIndexes.indexOf(index) === -1) {
            duplicatesIndexes.push(index);
          }
        } else {
          objects.push(object);
          if (Array.isArray(object)) {
            for (let i = 0, length = object.length; i < length; i += 1) {
              inspectNode(object[i], objects, duplicatesIndexes);
            }
          } else {
            const objectKeyList = Object.keys(object);
            for (let i = 0, length = objectKeyList.length; i < length; i += 1) {
              inspectNode(object[objectKeyList[i]], objects, duplicatesIndexes);
            }
          }
        }
      }
    }
    function dump(input, options) {
      options = options || {};
      const state = new State(options);
      if (!state.noRefs) getDuplicateReferences(input, state);
      let value = input;
      if (state.replacer) {
        value = state.replacer.call({ "": value }, "", value);
      }
      if (writeNode(state, 0, value, true, true)) return state.dump + "\n";
      return "";
    }
    module2.exports.dump = dump;
  },
});

// node_modules/js-yaml/index.js
var require_js_yaml = __commonJS({
  "node_modules/js-yaml/index.js"(exports2, module2) {
    "use strict";
    var loader = require_loader();
    var dumper = require_dumper();
    function renamed(from, to) {
      return function () {
        throw new Error(
          "Function yaml." +
            from +
            " is removed in js-yaml 4. Use yaml." +
            to +
            " instead, which is now safe by default."
        );
      };
    }
    module2.exports.Type = require_type();
    module2.exports.Schema = require_schema();
    module2.exports.FAILSAFE_SCHEMA = require_failsafe();
    module2.exports.JSON_SCHEMA = require_json();
    module2.exports.CORE_SCHEMA = require_core2();
    module2.exports.DEFAULT_SCHEMA = require_default();
    module2.exports.load = loader.load;
    module2.exports.loadAll = loader.loadAll;
    module2.exports.dump = dumper.dump;
    module2.exports.YAMLException = require_exception();
    module2.exports.types = {
      binary: require_binary(),
      float: require_float(),
      map: require_map(),
      null: require_null(),
      pairs: require_pairs(),
      set: require_set(),
      timestamp: require_timestamp(),
      bool: require_bool(),
      int: require_int(),
      merge: require_merge(),
      omap: require_omap(),
      seq: require_seq(),
      str: require_str(),
    };
    module2.exports.safeLoad = renamed("safeLoad", "load");
    module2.exports.safeLoadAll = renamed("safeLoadAll", "loadAll");
    module2.exports.safeDump = renamed("safeDump", "dump");
  },
});

// src/operations/fileEncodingUtility.ts
var fileEncodingUtility_exports = {};
__export(fileEncodingUtility_exports, {
  detectFileEncoding: () => detectFileEncoding,
});
function detectFileEncodingWithBOM(fileName, buffer) {
  core4.debug("Detecting file encoding using BOM");
  if (buffer.slice(0, 3).equals(Buffer.from([239, 187, 191]))) {
    return {
      encoding: "utf-8",
      withBOM: true,
    };
  } else if (buffer.slice(0, 4).equals(Buffer.from([255, 254, 0, 0]))) {
    throw Error(
      `Detected file encoding of the file ${fileName} as UTF-32LE. Variable substitution is not supported with file encoding UTF-32LE. Supported encodings are UTF-8 and UTF-16LE.`
    );
  } else if (buffer.slice(0, 2).equals(Buffer.from([254, 255]))) {
    throw Error(
      `Detected file encoding of the file ${fileName} as UTF-32BE. Variable substitution is not supported with file encoding UTF-32BE. Supported encodings are UTF-8 and UTF-16LE.`
    );
  } else if (buffer.slice(0, 2).equals(Buffer.from([255, 254]))) {
    return {
      encoding: "utf-16le",
      withBOM: true,
    };
  } else if (buffer.slice(0, 4).equals(Buffer.from([0, 0, 254, 255]))) {
    throw Error(
      `Detected file encoding of the file ${fileName} as UTF-32BE. Variable substitution is not supported with file encoding UTF-32BE. Supported encodings are UTF-8 and UTF-16LE.`
    );
  }
  core4.debug("Unable to detect File encoding using BOM");
  return null;
}
function detectFileEncodingWithoutBOM(fileName, buffer) {
  core4.debug("Detecting file encoding without BOM");
  let typeCode = 0;
  for (let index = 0; index < 4; index++) {
    typeCode = typeCode << 1;
    typeCode = typeCode | (buffer[index] > 0 ? 1 : 0);
  }
  switch (typeCode) {
    case 1:
      throw Error(
        `Detected file encoding of the file ${fileName} as UTF-32BE. Variable substitution is not supported with file encoding UTF-32BE. Supported encodings are UTF-8 and UTF-16 LE.`
      );
    case 5:
      throw Error(
        `Detected file encoding of the file ${fileName} as UTF-16BE. Variable substitution is not supported with file encoding UTF-16BE. Supported encodings are UTF-8 and UTF-16 LE.`
      );
    case 8:
      throw Error(
        `Detected file encoding of the file ${fileName} as UTF-32LE. Variable substitution is not supported with file encoding UTF-32LE. Supported encodings are UTF-8 and UTF-16 LE.`
      );
    case 10:
      return {
        encoding: "utf-16le",
        withBOM: false,
      };
    case 15:
      return {
        encoding: "utf-8",
        withBOM: false,
      };
    default:
      throw Error(
        `Unable to detect encoding of the file ${fileName} (typeCode: ${typeCode}). Supported encodings are UTF-8 and UTF-16 LE.`
      );
  }
}
function detectFileEncoding(fileName, buffer) {
  if (buffer.length < 4) {
    throw Error(
      `File buffer is too short to detect encoding type : ${fileName}`
    );
  }
  let fileEncoding2 =
    detectFileEncodingWithBOM(fileName, buffer) ||
    detectFileEncodingWithoutBOM(fileName, buffer);
  return fileEncoding2;
}
var core4;
var init_fileEncodingUtility = __esm({
  "src/operations/fileEncodingUtility.ts"() {
    core4 = require_core();
  },
});

// src/variableSubstitution.ts
var variableSubstitution_exports = {};
__export(variableSubstitution_exports, {
  VariableSubstitution: () => VariableSubstitution,
});
module.exports = __toCommonJS(variableSubstitution_exports);
init_envVariableUtility();

// src/operations/jsonVariableSubstitutionUtility.ts
init_envVariableUtility();
var core = require_core();
var JsonSubstitution = class {
  constructor() {
    this.envTreeUtil = new EnvTreeUtility();
  }
  substituteJsonVariable(jsonObject, envObject) {
    let isValueChanged = false;
    for (let jsonChild in jsonObject) {
      let jsonChildArray = jsonChild.split(".");
      let resultNode = this.envTreeUtil.checkEnvTreePath(
        jsonChildArray,
        0,
        jsonChildArray.length,
        envObject
      );
      if (resultNode != void 0) {
        if (resultNode.isEnd) {
          switch (typeof jsonObject[jsonChild]) {
            case "number":
              console.log(
                "SubstitutingValueonKeyWithNumber",
                jsonChild,
                resultNode.value
              );
              jsonObject[jsonChild] = !isNaN(resultNode.value)
                ? Number(resultNode.value)
                : resultNode.value;
              break;
            case "boolean":
              console.log(
                "SubstitutingValueonKeyWithBoolean",
                jsonChild,
                resultNode.value
              );
              jsonObject[jsonChild] =
                resultNode.value == "true"
                  ? true
                  : resultNode.value == "false"
                  ? false
                  : resultNode.value;
              break;
            case "object":
            case null:
              try {
                console.log(
                  "SubstitutingValueonKeyWithObject",
                  jsonChild,
                  resultNode.value
                );
                jsonObject[jsonChild] = JSON.parse(resultNode.value);
              } catch (exception) {
                core.debug(
                  "unable to substitute the value. falling back to string value"
                );
                jsonObject[jsonChild] = resultNode.value;
              }
              break;
            case "string":
              console.log(
                "SubstitutingValueonKeyWithString",
                jsonChild,
                resultNode.value
              );
              jsonObject[jsonChild] = resultNode.value;
          }
          isValueChanged = true;
        } else {
          isValueChanged =
            this.substituteJsonVariable(jsonObject[jsonChild], resultNode) ||
            isValueChanged;
        }
      }
    }
    return isValueChanged;
  }
};

// src/operations/xmlDomUtility.ts
var envVarUtility =
  (init_envVariableUtility(), __toCommonJS(envVariableUtility_exports));
var ltx = require_ltx2();
var XmlDomUtility = class {
  constructor(xmlContent) {
    this.xmlDomLookUpTable = {};
    this.xmlDomLookUpTable = {};
    this.headerContent = null;
    this.xmlDom = ltx.parse(xmlContent);
    this.readHeader(xmlContent);
    this.buildLookUpTable(this.xmlDom);
  }
  getXmlDom() {
    return this.xmlDom;
  }
  readHeader(xmlContent) {
    let index = xmlContent.indexOf("\n");
    if (index > -1) {
      let firstLine = xmlContent.substring(0, index).trim();
      if (firstLine.startsWith("<?") && firstLine.endsWith("?>")) {
        this.headerContent = firstLine;
      }
    }
  }
  getContentWithHeader(xmlDom) {
    return xmlDom
      ? (this.headerContent ? this.headerContent + "\n" : "") +
          xmlDom.root().toString()
      : "";
  }
  /**
   * Define method to create a lookup for DOM
   */
  buildLookUpTable(node) {
    if (node) {
      let nodeName = node.name;
      if (nodeName) {
        nodeName = nodeName.toLowerCase();
        let listOfNodes = this.xmlDomLookUpTable[nodeName];
        if (listOfNodes == null || !Array.isArray(listOfNodes)) {
          listOfNodes = [];
          this.xmlDomLookUpTable[nodeName] = listOfNodes;
        }
        listOfNodes.push(node);
        let childNodes = node.children;
        for (let i = 0; i < childNodes.length; i++) {
          let childNodeName = childNodes[i].name;
          if (childNodeName) {
            this.buildLookUpTable(childNodes[i]);
          }
        }
      }
    }
  }
  /**
   *  Returns array of nodes which match with the tag name.
   */
  getElementsByTagName(nodeName) {
    if (envVarUtility.isEmpty(nodeName)) return [];
    let selectedElements = this.xmlDomLookUpTable[nodeName.toLowerCase()];
    if (!selectedElements) {
      selectedElements = [];
    }
    return selectedElements;
  }
  /**
   *  Search in subtree with provided node name
   */
  getChildElementsByTagName(node, tagName) {
    if (!envVarUtility.isObject(node)) return [];
    let children = node.children;
    let liveNodes = [];
    if (children) {
      for (let i = 0; i < children.length; i++) {
        let childName = children[i].name;
        if (!envVarUtility.isEmpty(childName) && tagName == childName) {
          liveNodes.push(children[i]);
        }
        let liveChildNodes = this.getChildElementsByTagName(
          children[i],
          tagName
        );
        if (liveChildNodes && liveChildNodes.length > 0) {
          liveNodes = liveNodes.concat(liveChildNodes);
        }
      }
    }
    return liveNodes;
  }
};

// src/operations/xmlVariableSubstitution.ts
var core2 = require_core();
var envVarUtility2 =
  (init_envVariableUtility(), __toCommonJS(envVariableUtility_exports));
var tags = [
  "applicationSettings",
  "appSettings",
  "connectionStrings",
  "configSections",
];
var XmlSubstitution = class {
  constructor(xmlDomUtilityInstance) {
    this.replacableTokenValues = { APOS_CHARACTER_TOKEN: "'" };
    this.variableMap = envVarUtility2.getVariableMap();
    this.xmlDomUtility = xmlDomUtilityInstance;
  }
  substituteXmlVariables() {
    let isSubstitutionApplied = false;
    for (let tag of tags) {
      let nodes = this.xmlDomUtility.getElementsByTagName(tag);
      if (nodes.length == 0) {
        core2.debug(
          "Unable to find node with tag '" + tag + "' in provided xml file."
        );
        continue;
      }
      for (let xmlNode of nodes) {
        if (envVarUtility2.isObject(xmlNode)) {
          console.log("Processing substitution for xml node: ", xmlNode.name);
          try {
            if (xmlNode.name == "configSections") {
              isSubstitutionApplied =
                this.updateXmlConfigNodeAttribute(xmlNode) ||
                isSubstitutionApplied;
            } else if (xmlNode.name == "connectionStrings") {
              isSubstitutionApplied =
                this.updateXmlConnectionStringsNodeAttribute(xmlNode) ||
                isSubstitutionApplied;
            } else {
              isSubstitutionApplied =
                this.updateXmlNodeAttribute(xmlNode) || isSubstitutionApplied;
            }
          } catch (error) {
            core2.debug(
              "Error occurred while processing xml node : " + xmlNode.name
            );
            core2.debug(error);
          }
        }
      }
    }
    return isSubstitutionApplied;
  }
  updateXmlConfigNodeAttribute(xmlNode) {
    let isSubstitutionApplied = false;
    let sections = this.xmlDomUtility.getChildElementsByTagName(
      xmlNode,
      "section"
    );
    for (let section of sections) {
      if (envVarUtility2.isObject(section)) {
        let sectionName = section.attr("name");
        if (!envVarUtility2.isEmpty(sectionName)) {
          let customSectionNodes =
            this.xmlDomUtility.getElementsByTagName(sectionName);
          if (customSectionNodes.length != 0) {
            let customNode = customSectionNodes[0];
            isSubstitutionApplied =
              this.updateXmlNodeAttribute(customNode) || isSubstitutionApplied;
          }
        }
      }
    }
    return isSubstitutionApplied;
  }
  updateXmlNodeAttribute(xmlDomNode) {
    let isSubstitutionApplied = false;
    if (
      envVarUtility2.isEmpty(xmlDomNode) ||
      !envVarUtility2.isObject(xmlDomNode) ||
      xmlDomNode.name == "#comment"
    ) {
      core2.debug("Provided node is empty or a comment.");
      return isSubstitutionApplied;
    }
    const ConfigFileAppSettingsToken = "CONFIG_FILE_SETTINGS_TOKEN";
    let xmlDomNodeAttributes = xmlDomNode.attrs;
    for (var attributeName in xmlDomNodeAttributes) {
      var attributeNameValue =
        attributeName === "key" || attributeName == "name"
          ? xmlDomNodeAttributes[attributeName]
          : attributeName;
      var attributeName =
        attributeName === "key" || attributeName == "name"
          ? "value"
          : attributeName;
      if (this.variableMap.get(attributeNameValue) != void 0) {
        let ConfigFileAppSettingsTokenName =
          ConfigFileAppSettingsToken + "(" + attributeNameValue + ")";
        let isValueReplaced = false;
        if (xmlDomNode.getAttr(attributeName) != void 0) {
          console.log(
            `Updating value for key: ${attributeNameValue} with token value: ${ConfigFileAppSettingsTokenName}`
          );
          xmlDomNode.attr(attributeName, ConfigFileAppSettingsTokenName);
          isValueReplaced = true;
        } else {
          let children2 = xmlDomNode.children;
          for (var childNode of children2) {
            if (
              envVarUtility2.isObject(childNode) &&
              childNode.name == attributeName
            ) {
              if (childNode.children.length === 1) {
                console.log(
                  `Updating value for key: ${attributeNameValue} with token value: ${ConfigFileAppSettingsTokenName}`
                );
                childNode.children[0] = ConfigFileAppSettingsTokenName;
                isValueReplaced = true;
              }
            }
          }
        }
        if (isValueReplaced) {
          this.replacableTokenValues[ConfigFileAppSettingsTokenName] =
            this.variableMap.get(attributeNameValue).replace(/"/g, "'");
          isSubstitutionApplied = true;
        }
      }
    }
    let children = xmlDomNode.children;
    for (var childNode of children) {
      if (envVarUtility2.isObject(childNode)) {
        isSubstitutionApplied =
          this.updateXmlNodeAttribute(childNode) || isSubstitutionApplied;
      }
    }
    return isSubstitutionApplied;
  }
  updateXmlConnectionStringsNodeAttribute(xmlDomNode) {
    let isSubstitutionApplied = false;
    const ConfigFileConnStringToken = "CONFIG_FILE_CONN_STRING_TOKEN";
    if (
      envVarUtility2.isEmpty(xmlDomNode) ||
      !envVarUtility2.isObject(xmlDomNode) ||
      xmlDomNode.name == "#comment"
    ) {
      core2.debug("Provided node is empty or a comment.");
      return isSubstitutionApplied;
    }
    let xmlDomNodeAttributes = xmlDomNode.attrs;
    if (xmlDomNodeAttributes.hasOwnProperty("connectionString")) {
      if (
        xmlDomNodeAttributes.hasOwnProperty("name") &&
        this.variableMap.get(xmlDomNodeAttributes.name)
      ) {
        let ConfigFileConnStringTokenName =
          ConfigFileConnStringToken + "(" + xmlDomNodeAttributes.name + ")";
        core2.debug(
          `Substituting connectionString value for connectionString= ${xmlDomNodeAttributes.name} with token value: ${ConfigFileConnStringTokenName}`
        );
        xmlDomNode.attr("connectionString", ConfigFileConnStringTokenName);
        this.replacableTokenValues[ConfigFileConnStringTokenName] =
          this.variableMap.get(xmlDomNodeAttributes.name).replace(/"/g, "'");
        isSubstitutionApplied = true;
      } else if (this.variableMap.get("connectionString") != void 0) {
        let ConfigFileConnStringTokenName =
          ConfigFileConnStringToken + "(connectionString)";
        core2.debug(
          `Substituting connectionString value for connectionString= ${xmlDomNodeAttributes.name} with token value: ${ConfigFileConnStringTokenName}`
        );
        xmlDomNode.attr("connectionString", ConfigFileConnStringTokenName);
        this.replacableTokenValues[ConfigFileConnStringTokenName] =
          this.variableMap.get("connectionString").replace(/"/g, "'");
        isSubstitutionApplied = true;
      }
    }
    let children = xmlDomNode.children;
    for (var childNode of children) {
      if (envVarUtility2.isObject(childNode)) {
        isSubstitutionApplied =
          this.updateXmlConnectionStringsNodeAttribute(childNode) ||
          isSubstitutionApplied;
      }
    }
    return isSubstitutionApplied;
  }
};

// src/operations/utility.ts
var os = __toESM(require("os"));
var minimatch = __toESM(require_minimatch());
var core3 = require_core();
var fs = require("fs");
var path = require("path");
function findfiles(filepath) {
  core3.debug("Finding files matching input: " + filepath);
  let filesList;
  if (filepath.indexOf("*") == -1 && filepath.indexOf("?") == -1) {
    if (exist(filepath)) {
      filesList = [filepath];
    } else {
      core3.debug(
        "No matching files were found with search pattern: " + filepath
      );
      return [];
    }
  } else {
    filepath = path.join(process.env.GITHUB_WORKSPACE, filepath);
    let firstWildcardIndex = function (str) {
      let idx2 = str.indexOf("*");
      let idxOfWildcard = str.indexOf("?");
      if (idxOfWildcard > -1) {
        return idx2 > -1 ? Math.min(idx2, idxOfWildcard) : idxOfWildcard;
      }
      return idx2;
    };
    core3.debug("Matching glob pattern: " + filepath);
    let idx = firstWildcardIndex(filepath);
    core3.debug("Index of first wildcard: " + idx);
    let slicedPath = filepath.slice(0, idx);
    let findPathRoot = path.dirname(slicedPath);
    if (slicedPath.endsWith("\\") || slicedPath.endsWith("/")) {
      findPathRoot = slicedPath;
    }
    core3.debug("find root dir: " + findPathRoot);
    let allFiles = find(findPathRoot);
    filesList = match2(allFiles, filepath, "", {
      matchBase: true,
      nocase: !!os.type().match(/^Win/),
    });
    if (!filesList || filesList.length == 0) {
      core3.debug(
        "No matching files were found with search pattern: " + filepath
      );
      return [];
    }
  }
  return filesList;
}
var _FindItem = class {
  constructor(path2, level) {
    this.path = path2;
    this.level = level;
  }
};
function find(findPath) {
  if (!findPath) {
    core3.debug("no path specified");
    return [];
  }
  findPath = path.normalize(findPath);
  core3.debug(`findPath: '${findPath}'`);
  try {
    fs.lstatSync(findPath);
  } catch (err) {
    if (err.code == "ENOENT") {
      core3.debug("0 results");
      return [];
    }
    throw err;
  }
  try {
    let result = [];
    let stack = [new _FindItem(findPath, 1)];
    let traversalChain = [];
    while (stack.length) {
      let item = stack.pop();
      result.push(item.path);
      let stats;
      stats = fs.lstatSync(item.path);
      if (stats.isDirectory()) {
        core3.debug(`  ${item.path} (directory)`);
        let childLevel = item.level + 1;
        let childItems = fs
          .readdirSync(item.path)
          .map(
            (childName) =>
              new _FindItem(path.join(item.path, childName), childLevel)
          );
        for (let i = childItems.length - 1; i >= 0; i--) {
          stack.push(childItems[i]);
        }
      } else {
        core3.debug(`  ${item.path} (file)`);
      }
    }
    core3.debug(`${result.length} results`);
    return result;
  } catch (err) {
    throw new Error("LIB_OperationFailedfind" + err.message);
  }
}
function _getDefaultMatchOptions() {
  return {
    debug: false,
    nobrace: true,
    noglobstar: false,
    dot: true,
    noext: false,
    nocase: process.platform == "win32",
    nonull: false,
    matchBase: false,
    nocomment: false,
    nonegate: false,
    flipNegate: false,
  };
}
function cloneMatchOptions(matchOptions) {
  return {
    debug: matchOptions.debug,
    nobrace: matchOptions.nobrace,
    noglobstar: matchOptions.noglobstar,
    dot: matchOptions.dot,
    noext: matchOptions.noext,
    nocase: matchOptions.nocase,
    nonull: matchOptions.nonull,
    matchBase: matchOptions.matchBase,
    nocomment: matchOptions.nocomment,
    nonegate: matchOptions.nonegate,
    flipNegate: matchOptions.flipNegate,
  };
}
function match2(list, patterns, patternRoot, options) {
  core3.debug(`patternRoot: '${patternRoot}'`);
  options = options || _getDefaultMatchOptions();
  if (typeof patterns == "string") {
    patterns = [patterns];
  }
  let map = {};
  let originalOptions = options;
  for (let pattern of patterns) {
    core3.debug(`pattern: '${pattern}'`);
    pattern = (pattern || "").trim();
    if (!pattern) {
      core3.debug("skipping empty pattern");
      continue;
    }
    let options2 = cloneMatchOptions(originalOptions);
    if (!options2.nocomment && startsWith(pattern, "#")) {
      core3.debug("skipping comment");
      continue;
    }
    options2.nocomment = true;
    let negateCount = 0;
    if (!options2.nonegate) {
      while (pattern.charAt(negateCount) == "!") {
        negateCount++;
      }
      pattern = pattern.substring(negateCount);
      if (negateCount) {
        core3.debug(`trimmed leading '!'. pattern: '${pattern}'`);
      }
    }
    let isIncludePattern =
      negateCount == 0 ||
      (negateCount % 2 == 0 && !options2.flipNegate) ||
      (negateCount % 2 == 1 && options2.flipNegate);
    options2.nonegate = true;
    options2.flipNegate = false;
    let expanded;
    let preExpanded = pattern;
    if (options2.nobrace) {
      expanded = [pattern];
    } else {
      core3.debug("expanding braces");
      let convertedPattern =
        process.platform == "win32" ? pattern.replace(/\\/g, "/") : pattern;
      expanded = minimatch.braceExpand(convertedPattern);
    }
    options2.nobrace = true;
    for (let pattern2 of expanded) {
      if (expanded.length != 1 || pattern2 != preExpanded) {
        core3.debug(`pattern: '${pattern2}'`);
      }
      pattern2 = (pattern2 || "").trim();
      if (!pattern2) {
        core3.debug("skipping empty pattern");
        continue;
      }
      if (
        patternRoot && // patternRoot supplied
        !isRooted(pattern2) && // AND pattern not rooted
        // AND matchBase:false or not basename only
        (!options2.matchBase ||
          (process.platform == "win32"
            ? pattern2.replace(/\\/g, "/")
            : pattern2
          ).indexOf("/") >= 0)
      ) {
        pattern2 = ensureRooted(patternRoot, pattern2);
        core3.debug(`rooted pattern: '${pattern2}'`);
      }
      if (isIncludePattern) {
        core3.debug("applying include pattern against original list");
        let matchResults = minimatch.match(list, pattern2, options2);
        core3.debug(matchResults.length + " matches");
        for (let matchResult of matchResults) {
          map[matchResult] = true;
        }
      } else {
        core3.debug("applying exclude pattern against original list");
        let matchResults = minimatch.match(list, pattern2, options2);
        core3.debug(matchResults.length + " matches");
        for (let matchResult of matchResults) {
          delete map[matchResult];
        }
      }
    }
  }
  let result = list.filter((item) => map.hasOwnProperty(item));
  core3.debug(result.length + " final results");
  return result;
}
function ensureRooted(root, p) {
  if (!root) {
    throw new Error('ensureRooted() parameter "root" cannot be empty');
  }
  if (!p) {
    throw new Error('ensureRooted() parameter "p" cannot be empty');
  }
  if (isRooted(p)) {
    return p;
  }
  if (process.platform == "win32" && root.match(/^[A-Z]:$/i)) {
    return root + p;
  }
  if (
    endsWith(root, "/") ||
    (process.platform == "win32" && endsWith(root, "\\"))
  ) {
  } else {
    root += path.sep;
  }
  return root + p;
}
function isRooted(p) {
  p = normalizeSeparators(p);
  if (!p) {
    throw new Error('isRooted() parameter "p" cannot be empty');
  }
  if (process.platform == "win32") {
    return (
      startsWith(p, "\\") || // e.g. \ or \hello or \\hello
      /^[A-Z]:/i.test(p)
    );
  }
  return startsWith(p, "/");
}
function startsWith(str, start) {
  return str.slice(0, start.length) == start;
}
function endsWith(str, end) {
  return str.slice(-end.length) == end;
}
function normalizeSeparators(p) {
  p = p || "";
  if (process.platform == "win32") {
    p = p.replace(/\//g, "\\");
    let isUnc = /^\\\\+[^\\]/.test(p);
    return (isUnc ? "\\" : "") + p.replace(/\\\\+/g, "\\");
  }
  return p.replace(/\/\/+/g, "/");
}
function exist(path2) {
  let exist2 = false;
  try {
    exist2 = !!(path2 && fs.statSync(path2) != null);
  } catch (err) {
    if (err && err.code === "ENOENT") {
      exist2 = false;
    } else {
      throw err;
    }
  }
  return exist2;
}

// src/variableSubstitution.ts
var core5 = require_core();
var fs2 = require("fs");
var yaml = require_js_yaml();
var fileEncoding =
  (init_fileEncodingUtility(), __toCommonJS(fileEncodingUtility_exports));
var VariableSubstitution = class {
  constructor() {
    this.fileContentCache = /* @__PURE__ */ new Map();
    this.parseException = "";
  }
  async run() {
    let filesInput = core5.getInput("files", { required: true });
    let files = filesInput.split(",");
    if (files.length > 0) {
      this.segregateFilesAndSubstitute(files);
    } else {
      throw Error(
        "File Tranformation is not enabled. Please provide JSON/XML or YAML target files for variable substitution."
      );
    }
  }
  segregateFilesAndSubstitute(files) {
    let isSubstitutionApplied = false;
    for (let file of files) {
      let matchedFiles = findfiles(file.trim());
      if (matchedFiles.length == 0) {
        core5.error("No file matched with specific pattern: " + file);
        continue;
      }
      for (let file2 of matchedFiles) {
        let fileBuffer = fs2.readFileSync(file2);
        let fileEncodeType = fileEncoding.detectFileEncoding(file2, fileBuffer);
        let fileContent = fileBuffer.toString(fileEncodeType.encoding);
        if (fileEncodeType.withBOM) {
          fileContent = fileContent.slice(1);
        }
        if (this.isJson(file2, fileContent)) {
          console.log("Applying variable substitution on JSON file: " + file2);
          let jsonSubsitution = new JsonSubstitution();
          let jsonObject = this.fileContentCache.get(file2);
          let isJsonSubstitutionApplied =
            jsonSubsitution.substituteJsonVariable(
              jsonObject,
              EnvTreeUtility.getEnvVarTree()
            );
          if (isJsonSubstitutionApplied) {
            fs2.writeFileSync(
              file2,
              (fileEncodeType.withBOM ? "\uFEFF" : "") +
                JSON.stringify(jsonObject, null, 4),
              { encoding: fileEncodeType.encoding }
            );
            console.log(`Successfully updated file: ${file2}`);
          } else {
            console.log("Skipped updating file: " + file2);
          }
          isSubstitutionApplied =
            isJsonSubstitutionApplied || isSubstitutionApplied;
        } else if (this.isXml(file2, fileContent)) {
          console.log("Applying variable substitution on XML file: " + file2);
          let xmlDomUtilityInstance = this.fileContentCache.get(file2);
          let xmlSubstitution = new XmlSubstitution(xmlDomUtilityInstance);
          let isXmlSubstitutionApplied =
            xmlSubstitution.substituteXmlVariables();
          if (isXmlSubstitutionApplied) {
            let xmlDocument = xmlDomUtilityInstance.getXmlDom();
            this.replaceEscapeXMLCharacters(xmlDocument);
            let domContent =
              (fileEncodeType.withBOM ? "\uFEFF" : "") +
              xmlDomUtilityInstance.getContentWithHeader(xmlDocument);
            for (let replacableTokenValue in xmlSubstitution.replacableTokenValues) {
              core5.debug(
                "Substituting original value in place of temp_name: " +
                  replacableTokenValue
              );
              domContent = domContent
                .split(replacableTokenValue)
                .join(
                  xmlSubstitution.replacableTokenValues[replacableTokenValue]
                );
            }
            fs2.writeFileSync(file2, domContent, {
              encoding: fileEncodeType.encoding,
            });
            console.log(`Successfully updated file: ${file2}`);
          } else {
            console.log("Skipped updating file: " + file2);
          }
          isSubstitutionApplied =
            isXmlSubstitutionApplied || isSubstitutionApplied;
        } else if (this.isYaml(file2, fileContent)) {
          console.log("Applying variable substitution on YAML file: " + file2);
          let jsonSubsitution = new JsonSubstitution();
          let yamlObject = this.fileContentCache.get(file2);
          let isYamlSubstitutionApplied =
            jsonSubsitution.substituteJsonVariable(
              yamlObject,
              EnvTreeUtility.getEnvVarTree()
            );
          if (isYamlSubstitutionApplied) {
            fs2.writeFileSync(
              file2,
              (fileEncodeType.withBOM ? "\uFEFF" : "") +
                yaml.safeDump(yamlObject),
              { encoding: fileEncodeType.encoding }
            );
            console.log(`Successfully updated config file: ${file2}`);
          } else {
            console.log("Skipped updating file: " + file2);
          }
          isSubstitutionApplied =
            isYamlSubstitutionApplied || isSubstitutionApplied;
        } else {
          throw new Error(
            "Could not parse file: " + file2 + "\n" + this.parseException
          );
        }
      }
    }
    if (!isSubstitutionApplied) {
      throw new Error("Failed to apply variable substitution");
    }
  }
  isJson(file, content) {
    try {
      content = this.stripJsonComments(content);
      let jsonObject = JSON.parse(content);
      if (!this.fileContentCache.has(file)) {
        this.fileContentCache.set(file, jsonObject);
      }
      return true;
    } catch (exception) {
      this.parseException += "JSON parse error: " + exception + "\n";
      return false;
    }
  }
  isYaml(file, content) {
    try {
      let yamlObject = yaml.load(content);
      if (!this.fileContentCache.has(file)) {
        this.fileContentCache.set(file, yamlObject);
      }
      return true;
    } catch (exception) {
      this.parseException += "YAML parse error: " + exception + "\n";
      return false;
    }
  }
  isXml(file, content) {
    try {
      let ltxDomUtiltiyInstance = new XmlDomUtility(content);
      if (!this.fileContentCache.has(file)) {
        this.fileContentCache.set(file, ltxDomUtiltiyInstance);
      }
      return true;
    } catch (exception) {
      this.parseException += "XML parse error: " + exception;
      return false;
    }
  }
  stripJsonComments(content) {
    if (!content || (content.indexOf("//") < 0 && content.indexOf("/*") < 0)) {
      return content;
    }
    var currentChar;
    var nextChar;
    var insideQuotes = false;
    var contentWithoutComments = "";
    var insideComment = 0;
    var singlelineComment = 1;
    var multilineComment = 2;
    for (var i = 0; i < content.length; i++) {
      currentChar = content[i];
      nextChar = i + 1 < content.length ? content[i + 1] : "";
      if (insideComment) {
        if (
          insideComment == singlelineComment &&
          (currentChar + nextChar === "\r\n" || currentChar === "\n")
        ) {
          i--;
          insideComment = 0;
          continue;
        }
        if (
          insideComment == multilineComment &&
          currentChar + nextChar === "*/"
        ) {
          i++;
          insideComment = 0;
          continue;
        }
      } else {
        if (insideQuotes && currentChar == "\\") {
          contentWithoutComments += currentChar + nextChar;
          i++;
          continue;
        } else {
          if (currentChar == '"') {
            insideQuotes = !insideQuotes;
          }
          if (!insideQuotes) {
            if (currentChar + nextChar === "//") {
              insideComment = singlelineComment;
              i++;
            }
            if (currentChar + nextChar === "/*") {
              insideComment = multilineComment;
              i++;
            }
          }
        }
      }
      if (!insideComment) {
        contentWithoutComments += content[i];
      }
    }
    return contentWithoutComments;
  }
  replaceEscapeXMLCharacters(xmlDOMNode) {
    if (!xmlDOMNode || typeof xmlDOMNode == "string") {
      return;
    }
    for (var xmlAttribute in xmlDOMNode.attrs) {
      xmlDOMNode.attrs[xmlAttribute] = xmlDOMNode.attrs[xmlAttribute].replace(
        /'/g,
        "APOS_CHARACTER_TOKEN"
      );
    }
    for (var xmlChild of xmlDOMNode.children) {
      this.replaceEscapeXMLCharacters(xmlChild);
    }
  }
};
var varSub = new VariableSubstitution();
varSub.run().catch((error) => {
  core5.setFailed(error);
});
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    VariableSubstitution,
  });

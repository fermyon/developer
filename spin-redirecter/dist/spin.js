var spin;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 54:
/***/ ((module) => {

/*! typedarray-to-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/**
 * Convert a typed array to a Buffer without a copy
 *
 * Author:   Feross Aboukhadijeh <https://feross.org>
 * License:  MIT
 *
 * `npm install typedarray-to-buffer`
 */

module.exports = function typedarrayToBuffer (arr) {
  return ArrayBuffer.isView(arr)
    // To avoid a copy, use the typed array's underlying ArrayBuffer to back
    // new Buffer, respecting the "view", i.e. byteOffset and byteLength
    ? Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength)
    // Pass through all other types to `Buffer.from`
    : Buffer.from(arr)
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  handleRequest: () => (/* binding */ handleRequest)
});

;// CONCATENATED MODULE: ./node_modules/itty-router/dist/itty-router.mjs
const e=({base:e="",routes:r=[]}={})=>({__proto__:new Proxy({},{get:(a,o,t)=>(a,...p)=>r.push([o.toUpperCase(),RegExp(`^${(e+a).replace(/(\/?)\*/g,"($1.*)?").replace(/(\/$)|((?<=\/)\/)/,"").replace(/(:(\w+)\+)/,"(?<$2>.*)").replace(/:(\w+)(\?)?(\.)?/g,"$2(?<$1>[^/]+)$2$3").replace(/\.(?=[\w(])/,"\\.").replace(/\)\.\?\(([^\[]+)\[\^/g,"?)\\.?($1(?<=\\.)[^\\.")}/*$`),p])&&t}),routes:r,async handle(e,...a){let o,t,p=new URL(e.url),l=e.query={};for(let[e,r]of p.searchParams)l[e]=void 0===l[e]?r:[l[e],r].flat();for(let[l,s,c]of r)if((l===e.method||"ALL"===l)&&(t=p.pathname.match(s))){e.params=t.groups||{};for(let r of c)if(void 0!==(o=await r(e.proxy||e,...a)))return o}}});

;// CONCATENATED MODULE: ./node_modules/@fermyon/spin-sdk/lib/modules/router.js
/** @internal */

/** @internal */
function router() {
    let _spinRouter = e();
    return {
        all: function (path, ...handlers) { return _spinRouter.all(path, ...handlers); },
        delete: function (path, ...handlers) { return _spinRouter.delete(path, ...handlers); },
        get: function (path, ...handlers) { return _spinRouter.get(path, ...handlers); },
        handle: function (request, ...extra) { return _spinRouter.handle(request, ...extra); },
        handleRequest: function (request, ...a) {
            return _spinRouter.handle({
                method: request.method,
                url: request.headers["spin-full-url"]
            }, ...a);
        },
        options: function (path, ...handlers) { return _spinRouter.options(path, ...handlers); },
        patch: function (path, ...handlers) { return _spinRouter.patch(path, ...handlers); },
        post: function (path, ...handlers) { return _spinRouter.post(path, ...handlers); },
        put: function (path, ...handlers) { return _spinRouter.put(path, ...handlers); },
        routes: _spinRouter.routes
    };
}


// EXTERNAL MODULE: ./node_modules/typedarray-to-buffer/index.js
var typedarray_to_buffer = __webpack_require__(54);
var typedarray_to_buffer_default = /*#__PURE__*/__webpack_require__.n(typedarray_to_buffer);
;// CONCATENATED MODULE: ./node_modules/@fermyon/spin-sdk/lib/modules/utils.js

const utils = {
    toBuffer(arg0) {
        return typedarray_to_buffer_default()(arg0);
    },
};


;// CONCATENATED MODULE: ./node_modules/@fermyon/spin-sdk/lib/modules/spinSdk.js


function encodeBody(body) {
    if (typeof (body) == "string") {
        return new TextEncoder().encode(body).buffer;
    }
    else if (ArrayBuffer.isView(body)) {
        return body.buffer;
    }
    else {
        return body;
    }
}
class ResponseBuilder {
    constructor() {
        this.response = {
            status: 200,
            headers: {}
        };
        this.statusCode = this.response.status;
    }
    getHeader(key) {
        return this.response.headers[key] || null;
    }
    header(key, value) {
        this.response.headers[key] = value;
        return this;
    }
    status(status) {
        this.response.status = status;
        this.statusCode = this.response.status;
        return this;
    }
    body(data) {
        this.response.body = encodeBody(data);
        return this;
    }
}
const kv = {
    open: (name) => {
        let store = __internal__.spin_sdk.kv.open(name);
        store.getJson = (key) => {
            let val = store.get(key);
            if (val) {
                return JSON.parse(new TextDecoder().decode(val));
            }
            else {
                return null;
            }
        };
        store.setJson = (key, value) => {
            store.set(key, JSON.stringify(value));
        };
        return store;
    },
    openDefault: () => {
        let store = kv.open("default");
        return store;
    }
};
/**  features
 */
/** @deprecated */
const spinSdk = {
    config: __internal__.spin_sdk.config,
    redis: __internal__.spin_sdk.redis,
    kv: kv,
    mysql: __internal__.spin_sdk.mysql,
    pg: __internal__.spin_sdk.pg,
    sqlite: __internal__.spin_sdk.sqlite,
    llm: __internal__.spin_sdk.llm,
    utils: utils,
    Router: () => {
        return router();
    }
};
var InferencingModels;
(function (InferencingModels) {
    InferencingModels["Llama2Chat"] = "llama2-chat";
    InferencingModels["CodellamaInstruct"] = "codellama-instruct";
})(InferencingModels || (InferencingModels = {}));
var EmbeddingModels;
(function (EmbeddingModels) {
    EmbeddingModels["AllMiniLmL6V2"] = "all-minilm-l6-v2";
})(EmbeddingModels || (EmbeddingModels = {}));
const Llm = {
    infer: (model, prompt, options) => {
        if (!options) {
            return __internal__.spin_sdk.llm.infer(model, prompt);
        }
        let inference_options = {
            max_tokens: options.maxTokens || 100,
            repeat_penalty: options.repeatPenalty || 1.1,
            repeat_penalty_last_n_token_count: options.repeatPenaltyLastNTokenCount || 64,
            temperature: options.temperature || 0.8,
            top_k: options.topK || 40,
            top_p: options.topP || 0.9
        };
        return __internal__.spin_sdk.llm.inferWithOptions(model, prompt, inference_options);
    },
    generateEmbeddings: (model, text) => {
        return __internal__.spin_sdk.llm.generateEmbeddings(model, text);
    }
};
const Config = __internal__.spin_sdk.config;
const Redis = __internal__.spin_sdk.redis;
const Kv = (/* unused pure expression or super */ null && (kv));
const Mysql = __internal__.spin_sdk.mysql;
const Pg = __internal__.spin_sdk.pg;
const Sqlite = __internal__.spin_sdk.sqlite;
// const Llm = __internal__.spin_sdk.llm



;// CONCATENATED MODULE: ./node_modules/@fermyon/spin-sdk/lib/index.js







;// CONCATENATED MODULE: ./src/index.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var decoder = new TextDecoder();
var handleRequest = function (request) {
    return __awaiter(this, void 0, void 0, function () {
        var latest_spin_version, bytes, text, redirectList, base, route, path, reqPath, routeMatch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    latest_spin_version = Config.get("latest_spin_version");
                    return [4 /*yield*/, fsPromises.readFile("spin-redirect.json")];
                case 1:
                    bytes = _a.sent();
                    text = decoder.decode(bytes);
                    redirectList = JSON.parse(text);
                    base = request.headers["spin-base-path"];
                    route = request.headers["spin-component-route"];
                    path = request.headers["spin-path-info"];
                    reqPath = "".concat(base).concat(route).concat(path).replace("//", "/");
                    routeMatch = redirectList[reqPath];
                    if (routeMatch) {
                        return [2 /*return*/, {
                                status: 302,
                                headers: {
                                    location: routeMatch
                                }
                            }];
                    }
                    // If none of the specified redirects matches just convert to latest version
                    return [2 /*return*/, {
                            status: 302,
                            headers: {
                                location: reqPath.replace("/spin", "/spin/".concat(latest_spin_version))
                            }
                        }];
            }
        });
    });
};

})();

spin = __webpack_exports__;
/******/ })()
;
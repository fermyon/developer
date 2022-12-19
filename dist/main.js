// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"aPAto":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "c748e144c2fbcaa3";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"3MVHK":[function(require,module,exports) {
var _testJs = require("./test.js");
const { el , mount , text , list , setChildren , setStyle , setAttr  } = redom;
let documents;
document.querySelectorAll(".modal-button").forEach(function(el) {
    el.addEventListener("click", function() {
        var target = document.querySelector(el.getAttribute("data-target"));
        target.classList.add("is-active");
        target.querySelector(".modal-close").addEventListener("click", function() {
            target.classList.remove("is-active");
        });
        target.querySelector(".modal-background").addEventListener("click", function() {
            target.classList.remove("is-active");
        });
    });
});
if (document.body.contains(document.getElementById("blogSlogan"))) blogAd.init();
const svgCopy = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"/></svg>';
const svgCheck = '<svg aria-hidden="true" height="24" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true"><path fill-rule="evenodd" fill="#18d1a5" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';
const addCopyButtons = (clipboard)=>{
    document.querySelectorAll("pre > code").forEach((codeBlock)=>{
        let content = codeBlock.innerText.trim();
        let isComment = codeBlock.parentNode.previousSibling.previousSibling;
        if (isComment.nodeName == "#comment") switch(isComment.textContent.trim()){
            case "@nocpy":
                return;
            case "@selectiveCpy":
                {
                    let previousSlashEnding = false;
                    content = content.split("\n").map((k)=>{
                        k = k.trim();
                        let isCommand = k.startsWith("$");
                        if (isCommand || previousSlashEnding == true) {
                            if (!k.endsWith("\\")) previousSlashEnding = false;
                            else previousSlashEnding = true;
                            return isCommand ? k.substring(1).trim() : k;
                        } else return undefined;
                    }).filter((k)=>k != undefined).join("\n");
                }
        }
        let button = document.createElement("button");
        button.className = "copy-code-button";
        button.type = "button";
        button.ariaLabel = "Copy code";
        button.innerHTML = svgCopy;
        button.addEventListener("click", ()=>{
            clipboard.writeText(content).then(()=>{
                button.classList.add("is-success");
                button.innerHTML = svgCheck;
                setTimeout(()=>{
                    button.innerHTML = svgCopy;
                    button.classList.remove("is-success");
                }, 2000);
            }, (error)=>button.innerHTML = "Error");
        });
        let pre = codeBlock.parentNode;
        pre.appendChild(button);
    });
};
// const multilangCodeblocks = () => {
//   let codeblocks = Array.from(document.querySelectorAll("pre > code"))
//   let multicodes = []
//   codeblocks.map((k, i) => {
//     let codeblock = k.parentNode.previousSibling
//     let comment = undefined
//     if (codeblock.previousSibling.nodeName == "#comment") comment = codeblock.previousSibling
//     if (codeblock.previousSibling.previousSibling.previousSibling.nodeName == "#comment") {
//       comment = codeblock.previousSibling.previousSibling.previousSibling
//     }
//     if (comment && comment.textContent.includes("@multilangCode")) {
//       let nodes = []
//       comment = comment.textContent
//       let langs = comment.split("langs=[")[1].split("]")[0].split(",")
//       for (let j = 0; j < langs.length; j++) {
//         nodes.push(codeblocks[i + j].parentElement)
//       }
//       let data = {
//         nodes: nodes,
//         langs: langs
//       }
//       multicodes.push(data)
//     }
//   })
//   return multicodes
// }
const addAnchorLinks = ()=>{
    document.querySelectorAll(".content h1, .content h2, .content h3, .content h4").forEach((heading)=>{
        let id = heading.innerText.toLowerCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "").replace(/ +/g, "-");
        heading.setAttribute("id", id);
        heading.classList.add("heading-anchor");
        let anchor = document.createElement("a");
        anchor.className = "anchor-link";
        anchor.href = "#" + id;
        anchor.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width=16 height=16 viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>';
        heading.append(anchor);
        anchor.addEventListener("click", (e)=>{
            e.preventDefault();
            window.location = anchor.href;
            document.querySelector(anchor.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
                block: "start" //scroll to top of the target element
            });
        });
    });
};
let idx;
async function getSearchIndex() {
    try {
        let res = await fetch("/static/data.json");
        return await res.json();
    } catch (err) {
        console.Err("cannot load search module");
    }
}
async function setupSearch() {
    documents = await getSearchIndex();
    idx = lunr(function() {
        this.field("title");
        this.field("subheading");
        this.field("content");
        this.field("keywords", {
            boost: 10
        });
        this.ref("url");
        documents.forEach(function(doc) {
            this.add(doc);
        }, this);
    });
}
class SearchButton {
    constructor(modal){
        this.modal = modal;
        this.searchPlaceholder = el("span.search-placeholder", "Search");
        this.searchCommand = el("span.search-command", "⌘/ctrl + K");
        this.el = el("button.search-button", {
            onclick: (function(e) {
                this.modal.open();
            }).bind(this)
        }, [
            this.searchPlaceholder,
            this.searchCommand
        ]);
    }
}
class SearchResultSubHeading {
    constructor(){
        this.itemIcon = el("span.result-item-icon", "#");
        this.link = el("span");
        this.el = el("a.result-subitem", {
            onclick: function(e) {
                searchModal.close();
            }
        }, [
            this.itemIcon,
            this.link
        ]);
    }
    update(data) {
        this.link.textContent = data.subheading;
        this.el.href = data.url;
    }
}
class SearchResultItem {
    constructor(){
        this.subheading = list("div.result-subheading-container", SearchResultSubHeading);
        this.projectName = el("code.project-name");
        this.pageTitle = el("span");
        this.title = el("a", this.pageTitle, this.projectName);
        this.el = el("div.result-block", [
            this.title,
            this.subheading
        ]);
    }
    update(data) {
        this.pageTitle.textContent = data.title;
        this.projectName.textContent = data.project;
        this.title.href = data.url;
        this.subheading.update(data.data);
    }
}
class ResultFilterItem {
    constructor(){
        this.index;
        this.active = true;
        this.parentCallback;
        this.el = el("code.active", {
            onclick: (function(e) {
                this.toggle();
            }).bind(this)
        });
    }
    update(data, index, item, context) {
        this.parentCallback = context.callback;
        this.index = index;
        context.reset && (this.active = true);
        if (this.active) this.el.classList.add("active");
        this.el.textContent = data;
    }
    toggle() {
        this.active = !this.active;
        if (this.active) this.el.classList.add("active");
        else this.el.classList.remove("active");
        this.parentCallback(this.index, this.active);
    }
}
class SearchResultFilter {
    constructor(categories, callback){
        this.categories = categories;
        this.parentCallback = callback;
        this.active = [
            true,
            true,
            true
        ];
        this.activefilter = categories.map((k)=>k.toLowerCase());
        this.filters = list("div.filter-categories", ResultFilterItem);
        this.filters.update(this.categories, {
            callback: this.updateFilterSearch.bind(this)
        });
        this.resetFilter = el("span.reset-filter", {
            onclick: (function(e) {
                this.resetFilters();
            }).bind(this)
        }, "Clear filters");
        this.el = el("div.result-filters", this.filters, this.resetFilter);
    }
    updateFilterSearch(index, status) {
        console.log(this.active, this.active[index]);
        this.active[index] = status;
        this.activefilter = this.categories.filter((k, i)=>{
            return this.active[i];
        }).map((k)=>{
            return k.toLowerCase();
        });
        this.parentCallback(this.activefilter);
    }
    resetFilters() {
        this.activefilter = this.categories.map((k)=>k.toLowerCase());
        this.parentCallback(this.activefilter);
        this.filters.update(this.categories, {
            callback: this.updateFilterSearch.bind(this),
            reset: true
        });
    }
}
class SearchResult {
    constructor(){
        this.data;
        this.projects = [
            "Spin",
            "Cloud"
        ];
        this.resultItems = list("div.result-section", SearchResultItem);
        this.resultFilters = new SearchResultFilter(this.projects, this.filter.bind(this));
        this.el = el("div.result-section-container", this.resultFilters, this.resultItems);
    }
    update(data) {
        this.data = data;
        this.resultItems.update(this.data);
    }
    filter(filters) {
        this.resultItems.update(this.data.filter((k)=>{
            return filters.includes(k.project);
        }));
    }
}
class ProjectRecommendations {
    constructor(){
        this.link1 = el("a.suggested-project-link");
        this.link2 = el("a.suggested-project-link");
        this.link3 = el("a.suggested-project-link");
        this.link4 = el("a.suggested-project-link");
        this.projectLinks = el("div.recommended-navs", this.link1, this.link2, this.link3, this.link4);
        this.projectTitle = el("div.project-title");
        this.el = el("div.suggested-project", this.projectTitle, this.projectLinks);
    }
    update(data) {
        this.projectTitle.textContent = data.project;
        this.link1.textContent = data.link1[0];
        this.link1.href = data.link1[1];
        this.link2.textContent = data.link2[0];
        this.link2.href = data.link2[1];
        this.link3.textContent = data.link3[0];
        this.link3.href = data.link3[1];
        this.link4.textContent = data.link4[0];
        this.link4.href = data.link4[1];
    }
}
// this content shouldn't live in the theme javascript, ideally be managed via the config/site.toml and shortcodes in the template html
class ModalSuggest {
    constructor(){
        this.projectData = [
            {
                project: "Spin",
                link1: [
                    "Install",
                    "/spin/install"
                ],
                link2: [
                    "Quickstart",
                    "/spin/quickstart/"
                ],
                link3: [
                    "Develop",
                    "/spin/developing"
                ],
                link4: [
                    "Deploy",
                    "/spin/deploying-to-fermyon/"
                ]
            },
            {
                project: "Cloud",
                link1: [
                    "Quickstart",
                    "/cloud/quickstart"
                ],
                link2: [
                    "VS Code",
                    "/cloud/spin-vs-code-extension"
                ],
                link3: [
                    "Support",
                    "/cloud/support"
                ],
                link4: [
                    "FAQ",
                    "/cloud/faq"
                ]
            }
        ];
        this.projectRecommendations = list("div.result-section", ProjectRecommendations);
        this.projectRecommendations.update(this.projectData);
        this.el = el("div.result-section-container", "Suggested Projects", this.projectRecommendations);
    }
}
class SearchModal {
    constructor(){
        this.container = document.getElementById("search-modal-container");
        this.modalSearchBar = el("input.modal-search-bar", {
            type: "text",
            spellcheck: false,
            placeholder: "Search Fermyon Developer Home",
            oninput: (function(e) {
                this.updateSearch();
            }).bind(this)
        });
        this.searchResults = new SearchResult();
        this.modalSuggest = new ModalSuggest();
        this.modal = el("div.modal-box", {
            onclick: function(e) {
                e.stopPropagation();
            }
        });
        this.el = el("div.modal-wrapper", {
            onclick: (function(e) {
                this.close();
            }).bind(this),
            onkeydown: function(e) {
                if (e.key != "Escape") e.stopPropagation();
            }
        }, this.modal);
    }
    open() {
        setStyle(this.container, {
            display: "block"
        });
        setStyle(document.body, {
            "overflow": "hidden",
            height: "100%"
        });
        this.modalSearchBar.value = "";
        setChildren(this.modal, [
            this.modalSearchBar,
            this.modalSuggest
        ]);
        this.modalSearchBar.focus();
    }
    close() {
        setStyle(this.container, {
            display: "none"
        });
        setStyle(document.body, {
            "overflow-y": "auto",
            height: "auto"
        });
        setChildren(this.modal, []);
    }
    updateSearch() {
        let query = this.modalSearchBar.value;
        if (query == "") {
            setChildren(this.modal, [
                this.modalSearchBar,
                this.modalSuggest
            ]);
            return;
        }
        let updatedQuery = query.split(" ").map((word)=>word + "^2 " + word + "* ").join(" ");
        let result = idx.search(updatedQuery);
        let matches = {};
        let data;
        result.map((k)=>{
            if (k.score < 0.5) return;
            data = documents.find((post)=>k.ref === post.url);
            let key = data.title.replaceAll(" ", "");
            if (!matches[key]) {
                matches[key] = {};
                matches[key].data = [];
            }
            if (data.subheading == "") {
                matches[key].url = data.url;
                return;
            } else matches[key].url = data.url.slice(0, data.url.indexOf("#"));
            matches[key].data.push({
                subheading: data.subheading,
                url: data.url
            });
            matches[key].title = data.title;
            matches[key].project = data.project;
            matches[key].score = matches[key].score ? matches[key].score > k.score ? matches[key].score : k.score : k.score;
        });
        matches = Object.keys(matches).map((k)=>{
            return matches[k];
        }).sort(function(a, b) {
            return b.score - a.score;
        }).filter((k)=>{
            return k.title != undefined;
        });
        this.searchResults.update(matches);
        setChildren(this.modal, [
            this.modalSearchBar,
            this.searchResults
        ]);
    }
}
let searchModal = new SearchModal();
let searchButton = new SearchButton(searchModal);
function scrollSideMenu() {
    let sidemenu = document.querySelector("aside.menu");
    if (sidemenu) sidemenu.querySelector(".active")?.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center",
        behavior: "smooth"
    });
}
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
// class codeblockLanguageTab {
//   constructor(parentCallback) {
//     this.index
//     this.parentCallback = parentCallback
//     this.lang = el("a")
//     this.el = el("li", {onclick: function(e) {
//       parentCallback(this.index)
//     }.bind(this)}, this.lang)
//   }
//   update(data, index, items, context) {
//     this.index = index
//     this.lang.textContent = data
//     if (context.active == this.index) {
//       this.lang.classList.add("is-active")
//     } else {
//       this.lang.classList.remove("is-active")
//     }
//   }
// }
// class MulticodeBlock {
//   constructor(data) {
//     this.active = null
//     this.nodes = data.nodes
//     this.langs = data.langs
//     this.tabs = list("ul", codeblockLanguageTab, null, this.ChildEventHandler.bind(this))
//     this.el = el("div.tabs.is-boxed", this.tabs)
//     this.tabs.update(this.langs, {active: 0})
//   }
//   ChildEventHandler(data) {
//     console.log(data)
//     this.tabs.update(this.langs, {active: data})
//     for (let i = 0; i < this.nodes.length; i++) {
//       setStyle(this.nodes[i], {display: i == data ? "block" : "none"})
//     }
//   }
//   updateActiveTab() {
//   }
// }
// class MultilangCodeHandler {
//   constructor(data) {
//     console.log(data)
//     this.handles = []
//     for (let i = 0; i < data.length; i++) {
//       this.handles.push(new MulticodeBlock(data[i]))
//       console.log(this.handles)
//       console.log(data[i].nodes[0])
//       insertAfter(this.handles[i].el, data[i].nodes[0].previousSibling)
//     }
//   }
// }
class codeblockLanguageTab {
    constructor(parentCallback){
        this.index;
        this.parentCallback = parentCallback;
        this.lang = el("a");
        this.el = el("li", {
            onclick: (function(e) {
                parentCallback(this.index);
            }).bind(this)
        }, this.lang);
    }
    update(data, index, items, context) {
        this.index = index;
        this.lang.textContent = data;
        if (context.active == this.index) this.lang.classList.add("is-active");
        else this.lang.classList.remove("is-active");
    }
}
class multiTabBlockHandler {
    constructor(nodes){
        this.active = 0;
        this.nodes = Array.from(nodes);
        this.langs = this.nodes.map((k)=>{
            return k.dataset.title;
        });
        this.tabs = list("ul", codeblockLanguageTab, null, this.ChildEventHandler.bind(this));
        this.el = el("div.tabs.is-boxed", this.tabs);
        this.tabs.update(this.langs, {
            active: 0
        });
        this.updateTabContent(this.active);
    }
    ChildEventHandler(data) {
        console.log(data);
        this.tabs.update(this.langs, {
            active: data
        });
        this.updateTabContent(data);
    }
    updateTabContent(data) {
        for(let i = 0; i < this.nodes.length; i++)setStyle(this.nodes[i], {
            display: i == data ? "block" : "none"
        });
    }
}
function multiTabContentHandler() {
    let multiTabBlocks = document.querySelectorAll("div.multitab-content-wrapper");
    multiTabBlocks.forEach((multiTabBlock)=>{
        let tabs = multiTabBlock.querySelectorAll("div.multitab-content");
        let handler = new multiTabBlockHandler(tabs);
        multiTabBlock.insertBefore(handler.el, multiTabBlock.firstChild);
    });
}
document.addEventListener("DOMContentLoaded", function() {
    // Initialize after the DOM.
    (function() {
        var burger = document.querySelector(".burger");
        var menu = document.querySelector("#" + burger.dataset.target);
        burger.addEventListener("click", function() {
            burger.classList.toggle("is-active");
            menu.classList.toggle("is-active");
        });
    })();
    header.init();
    hljs.highlightAll();
    if (navigator && navigator.clipboard) addCopyButtons(navigator.clipboard);
    addAnchorLinks();
    scrollSideMenu();
    // let multicodes = multilangCodeblocks()
    // new MultilangCodeHandler(multicodes)
    multiTabContentHandler();
    if (window.location.hash.length > 0) {
        setTimeout(function() {
            document.querySelector('a[href="' + window.location.hash + '"]').click();
        }, 150);
        header.unpin();
    }
    (async function() {
        try {
            await setupSearch();
            mount(document.getElementById("search-button-container"), searchButton);
            mount(document.getElementById("search-modal-container"), searchModal);
            document.onkeydown = function(e) {
                if (e.key == "Escape") searchModal.close();
                if ((e.key == "k" || e.key == "K") && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    e.stopPropagation();
                    searchModal.open();
                }
            };
        } catch (err) {
            console.err("Could not setup search");
        }
    })();
});

},{"./test.js":"jgWZt"}],"jgWZt":[function(require,module,exports) {
var header = new Headroom(document.querySelector("#topbar"), {
    tolerance: 5,
    offset: 80
});
var blogAd = new Headroom(document.querySelector("#blogSlogan"), {
    tolerance: 5,
    offset: 300
});

},{}]},["aPAto","3MVHK"], "3MVHK", "parcelRequire252c")

//# sourceMappingURL=main.js.map

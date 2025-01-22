(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Q=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),M=__DEFINES__;Object.keys(M).forEach(t=>{const e=t.split(".");let n=Q;for(let o=0;o<e.length;o++){const r=e[o];o===e.length-1?n[r]=M[t]:n=n[r]||(n[r]={})}});class j{constructor(e,n,o){this.logger=e,this.transport=n,this.importUpdatedModule=o,this.hotModulesMap=new Map,this.disposeMap=new Map,this.pruneMap=new Map,this.dataMap=new Map,this.customListenersMap=new Map,this.ctxToListenersMap=new Map,this.updateQueue=[],this.pendingUpdateQueue=!1}async notifyListeners(e,n){const o=this.customListenersMap.get(e);o&&await Promise.allSettled(o.map(r=>r(n)))}send(e){this.transport.send(e).catch(n=>{this.logger.error(n)})}clear(){this.hotModulesMap.clear(),this.disposeMap.clear(),this.pruneMap.clear(),this.dataMap.clear(),this.customListenersMap.clear(),this.ctxToListenersMap.clear()}async prunePaths(e){await Promise.all(e.map(n=>{const o=this.disposeMap.get(n);if(o)return o(this.dataMap.get(n))})),e.forEach(n=>{const o=this.pruneMap.get(n);o&&o(this.dataMap.get(n))})}warnFailedUpdate(e,n){e.message.includes("fetch")||this.logger.error(e),this.logger.error(`Failed to reload ${n}. This could be due to syntax errors or importing non-existent modules. (see errors above)`)}async queueUpdate(e){if(this.updateQueue.push(this.fetchUpdate(e)),!this.pendingUpdateQueue){this.pendingUpdateQueue=!0,await Promise.resolve(),this.pendingUpdateQueue=!1;const n=[...this.updateQueue];this.updateQueue=[],(await Promise.all(n)).forEach(o=>o&&o())}}async fetchUpdate(e){const{path:n,acceptedPath:o}=e,r=this.hotModulesMap.get(n);if(!r)return;let i;const s=n===o,c=r.callbacks.filter(({deps:a})=>a.includes(o));if(s||c.length>0){const a=this.disposeMap.get(o);a&&await a(this.dataMap.get(o));try{i=await this.importUpdatedModule(e)}catch(l){this.warnFailedUpdate(l,o)}}return()=>{for(const{deps:l,fn:u}of c)u(l.map(p=>p===o?i:void 0));const a=s?n:`${o} via ${n}`;this.logger.debug(`hot updated: ${a}`)}}}let D="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",J=(t=21)=>{let e="",n=t|0;for(;n--;)e+=D[Math.random()*64|0];return e};typeof process<"u"&&process.platform;function B(){let t,e;return{promise:new Promise((o,r)=>{t=o,e=r}),resolve:t,reject:e}}function x(t){const e=new Error(t.message||"Unknown invoke error");return Object.assign(e,t,{runnerError:new Error("RunnerError")}),e}const V=t=>{if(t.invoke)return{...t,async invoke(n,o){const r=await t.invoke({type:"custom",event:"vite:invoke",data:{id:"send",name:n,data:o}});if("error"in r)throw x(r.error);return r.result}};if(!t.send||!t.connect)throw new Error("transport must implement send and connect when invoke is not implemented");const e=new Map;return{...t,connect({onMessage:n,onDisconnection:o}){return t.connect({onMessage(r){if(r.type==="custom"&&r.event==="vite:invoke"){const i=r.data;if(i.id.startsWith("response:")){const s=i.id.slice(9),c=e.get(s);if(!c)return;c.timeoutId&&clearTimeout(c.timeoutId),e.delete(s);const{error:a,result:l}=i.data;a?c.reject(a):c.resolve(l);return}}n(r)},onDisconnection:o})},disconnect(){var n;return e.forEach(o=>{o.reject(new Error(`transport was disconnected, cannot call ${JSON.stringify(o.name)}`))}),e.clear(),(n=t.disconnect)==null?void 0:n.call(t)},send(n){return t.send(n)},async invoke(n,o){var _;const r=J(),i={type:"custom",event:"vite:invoke",data:{name:n,id:`send:${r}`,data:o}},s=t.send(i),{promise:c,resolve:a,reject:l}=B(),u=t.timeout??6e4;let p;u>0&&(p=setTimeout(()=>{e.delete(r),l(new Error(`transport invoke timed out after ${u}ms (data: ${JSON.stringify(i)})`))},u),(_=p==null?void 0:p.unref)==null||_.call(p)),e.set(r,{resolve:a,reject:l,name:n,timeoutId:p}),s&&s.catch(g=>{clearTimeout(p),e.delete(r),l(g)});try{return await c}catch(g){throw x(g)}}}},G=t=>{const e=V(t);let n=!e.connect,o;return{...t,...e.connect?{async connect(r){if(n)return;if(o){await o;return}const i=e.connect({onMessage:r??(()=>{}),onDisconnection(){n=!1}});i&&(o=i,await o,o=void 0),n=!0}}:{},...e.disconnect?{async disconnect(){n&&(o&&await o,n=!1,await e.disconnect())}}:{},async send(r){if(e.send){if(!n)if(o)await o;else throw new Error("send was called before connect");await e.send(r)}},async invoke(r,i){if(!n)if(o)await o;else throw new Error("invoke was called before connect");return e.invoke(r,i)}}},S=t=>{const e=t.pingInterval??3e4;let n,o;return{async connect({onMessage:r,onDisconnection:i}){const s=t.createConnection();s.addEventListener("message",async({data:a})=>{r(JSON.parse(a))});let c=s.readyState===s.OPEN;c||await new Promise((a,l)=>{s.addEventListener("open",()=>{c=!0,a()},{once:!0}),s.addEventListener("close",async()=>{if(!c){l(new Error("WebSocket closed without opened."));return}r({type:"custom",event:"vite:ws:disconnect",data:{webSocket:s}}),i()})}),r({type:"custom",event:"vite:ws:connect",data:{webSocket:s}}),n=s,o=setInterval(()=>{s.readyState===s.OPEN&&s.send(JSON.stringify({type:"ping"}))},e)},disconnect(){clearInterval(o),n==null||n.close()},send(r){n.send(JSON.stringify(r))}}},K=__HMR_CONFIG_NAME__,Y=__BASE__||"/";function d(t,e={},...n){const o=document.createElement(t);for(const[r,i]of Object.entries(e))o.setAttribute(r,i);return o.append(...n),o}const Z=`
:host {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  --monospace: 'SFMono-Regular', Consolas,
  'Liberation Mono', Menlo, Courier, monospace;
  --red: #ff5555;
  --yellow: #e2aa53;
  --purple: #cfa4ff;
  --cyan: #2dd9da;
  --dim: #c9c9c9;

  --window-background: #181818;
  --window-color: #d8d8d8;
}

.backdrop {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  margin: 0;
  background: rgba(0, 0, 0, 0.66);
}

.window {
  font-family: var(--monospace);
  line-height: 1.5;
  max-width: 80vw;
  color: var(--window-color);
  box-sizing: border-box;
  margin: 30px auto;
  padding: 2.5vh 4vw;
  position: relative;
  background: var(--window-background);
  border-radius: 6px 6px 8px 8px;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  overflow: hidden;
  border-top: 8px solid var(--red);
  direction: ltr;
  text-align: left;
}

pre {
  font-family: var(--monospace);
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 1em;
  overflow-x: scroll;
  scrollbar-width: none;
}

pre::-webkit-scrollbar {
  display: none;
}

pre.frame::-webkit-scrollbar {
  display: block;
  height: 5px;
}

pre.frame::-webkit-scrollbar-thumb {
  background: #999;
  border-radius: 5px;
}

pre.frame {
  scrollbar-width: thin;
}

.message {
  line-height: 1.3;
  font-weight: 600;
  white-space: pre-wrap;
}

.message-body {
  color: var(--red);
}

.plugin {
  color: var(--purple);
}

.file {
  color: var(--cyan);
  margin-bottom: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.frame {
  color: var(--yellow);
}

.stack {
  font-size: 13px;
  color: var(--dim);
}

.tip {
  font-size: 13px;
  color: #999;
  border-top: 1px dotted #999;
  padding-top: 13px;
  line-height: 1.8;
}

code {
  font-size: 13px;
  font-family: var(--monospace);
  color: var(--yellow);
}

.file-link {
  text-decoration: underline;
  cursor: pointer;
}

kbd {
  line-height: 1.5;
  font-family: ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.75rem;
  font-weight: 700;
  background-color: rgb(38, 40, 44);
  color: rgb(166, 167, 171);
  padding: 0.15rem 0.3rem;
  border-radius: 0.25rem;
  border-width: 0.0625rem 0.0625rem 0.1875rem;
  border-style: solid;
  border-color: rgb(54, 57, 64);
  border-image: initial;
}
`,X=()=>d("div",{class:"backdrop",part:"backdrop"},d("div",{class:"window",part:"window"},d("pre",{class:"message",part:"message"},d("span",{class:"plugin",part:"plugin"}),d("span",{class:"message-body",part:"message-body"})),d("pre",{class:"file",part:"file"}),d("pre",{class:"frame",part:"frame"}),d("pre",{class:"stack",part:"stack"}),d("div",{class:"tip",part:"tip"},"Click outside, press ",d("kbd",{},"Esc")," key, or fix the code to dismiss.",d("br"),"You can also disable this overlay by setting ",d("code",{part:"config-option-name"},"server.hmr.overlay")," to ",d("code",{part:"config-option-value"},"false")," in ",d("code",{part:"config-file-name"},K),".")),d("style",{},Z)),L=/(?:[a-zA-Z]:\\|\/).*?:\d+:\d+/g,w=/^(?:>?\s*\d+\s+\|.*|\s+\|\s*\^.*)\r?\n/gm,{HTMLElement:ee=class{}}=globalThis;class te extends ee{constructor(e,n=!0){var s;super(),this.root=this.attachShadow({mode:"open"}),this.root.appendChild(X()),w.lastIndex=0;const o=e.frame&&w.test(e.frame),r=o?e.message.replace(w,""):e.message;e.plugin&&this.text(".plugin",`[plugin:${e.plugin}] `),this.text(".message-body",r.trim());const[i]=(((s=e.loc)==null?void 0:s.file)||e.id||"unknown file").split("?");e.loc?this.text(".file",`${i}:${e.loc.line}:${e.loc.column}`,n):e.id&&this.text(".file",i),o&&this.text(".frame",e.frame.trim()),this.text(".stack",e.stack,n),this.root.querySelector(".window").addEventListener("click",c=>{c.stopPropagation()}),this.addEventListener("click",()=>{this.close()}),this.closeOnEsc=c=>{(c.key==="Escape"||c.code==="Escape")&&this.close()},document.addEventListener("keydown",this.closeOnEsc)}text(e,n,o=!1){const r=this.root.querySelector(e);if(!o)r.textContent=n;else{let i=0,s;for(L.lastIndex=0;s=L.exec(n);){const{0:c,index:a}=s,l=n.slice(i,a);r.appendChild(document.createTextNode(l));const u=document.createElement("a");u.textContent=c,u.className="file-link",u.onclick=()=>{fetch(new URL(`${Y}__open-in-editor?file=${encodeURIComponent(c)}`,import.meta.url))},r.appendChild(u),i+=l.length+c.length}}}close(){var e;(e=this.parentNode)==null||e.removeChild(this),document.removeEventListener("keydown",this.closeOnEsc)}}const h="vite-error-overlay",{customElements:v}=globalThis;v&&!v.get(h)&&v.define(h,te);console.debug("[vite] connecting...");const b=new URL(import.meta.url),ne=__SERVER_HOST__,T=__HMR_PROTOCOL__||(b.protocol==="https:"?"wss":"ws"),W=__HMR_PORT__,$=`${__HMR_HOSTNAME__||b.hostname}:${W||b.port}${__HMR_BASE__}`,P=__HMR_DIRECT_TARGET__,y=__BASE__||"/",O=__HMR_TIMEOUT__,R=__WS_TOKEN__,F=G((()=>{let t=S({createConnection:()=>new WebSocket(`${T}://${$}?token=${R}`,"vite-hmr"),pingInterval:O});return{async connect(e){try{await t.connect(e)}catch(n){if(!W){t=S({createConnection:()=>new WebSocket(`${T}://${P}?token=${R}`,"vite-hmr"),pingInterval:O});try{await t.connect(e),console.info("[vite] Direct websocket connection fallback. Check out https://vite.dev/config/server-options.html#server-hmr to remove the previous connection error.")}catch(o){if(o instanceof Error&&o.message.includes("WebSocket closed without opened.")){const r=new URL(import.meta.url),i=r.host+r.pathname.replace(/@vite\/client$/,"");console.error(`[vite] failed to connect to websocket.
your current setup:
  (browser) ${i} <--[HTTP]--> ${ne} (server)
  (browser) ${$} <--[WebSocket (failing)]--> ${P} (server)
Check out your Vite / network configuration and https://vite.dev/config/server-options.html#server-hmr .`)}}return}throw console.error(`[vite] failed to connect to websocket (${n}). `),n}},async disconnect(){await t.disconnect()},send(e){t.send(e)}}})());let q=!1;typeof window<"u"&&window.addEventListener("beforeunload",()=>{q=!0});function U(t){const e=new URL(t,"http://vite.dev");return e.searchParams.delete("direct"),e.pathname+e.search}let C=!0;const I=new WeakSet,oe=t=>{let e;return()=>{e&&(clearTimeout(e),e=null),e=setTimeout(()=>{location.reload()},t)}},k=oe(50),E=new j({error:t=>console.error("[vite]",t),debug:(...t)=>console.debug("[vite]",...t)},F,async function({acceptedPath:e,timestamp:n,explicitImportRequired:o,isWithinCircularImport:r}){const[i,s]=e.split("?"),c=import(y+i.slice(1)+`?${o?"import&":""}t=${n}${s?`&${s}`:""}`);return r&&c.catch(()=>{console.info(`[hmr] ${e} failed to apply HMR as it's within a circular import. Reloading page to reset the execution order. To debug and break the circular import, you can run \`vite --debug hmr\` to log the circular dependency path if a file change triggered it.`),k()}),await c});F.connect(re);async function re(t){switch(t.type){case"connected":console.debug("[vite] connected.");break;case"update":if(f("vite:beforeUpdate",t),m)if(C&&se()){location.reload();return}else N&&z(),C=!1;await Promise.all(t.updates.map(async e=>{if(e.type==="js-update")return E.queueUpdate(e);const{path:n,timestamp:o}=e,r=U(n),i=Array.from(document.querySelectorAll("link")).find(c=>!I.has(c)&&U(c.href).includes(r));if(!i)return;const s=`${y}${r.slice(1)}${r.includes("?")?"&":"?"}t=${o}`;return new Promise(c=>{const a=i.cloneNode();a.href=new URL(s,i.href).href;const l=()=>{i.remove(),console.debug(`[vite] css hot updated: ${r}`),c()};a.addEventListener("load",l),a.addEventListener("error",l),I.add(i),i.after(a)})})),f("vite:afterUpdate",t);break;case"custom":{if(f(t.event,t.data),t.event==="vite:ws:disconnect"&&m&&!q){console.log("[vite] server connection lost. Polling for restart...");const e=t.data.webSocket,n=new URL(e.url);n.search="",await ce(n.href),location.reload()}break}case"full-reload":if(f("vite:beforeFullReload",t),m)if(t.path&&t.path.endsWith(".html")){const e=decodeURI(location.pathname),n=y+t.path.slice(1);(e===n||t.path==="/index.html"||e.endsWith("/")&&e+"index.html"===n)&&k();return}else k();break;case"prune":f("vite:beforePrune",t),await E.prunePaths(t.paths);break;case"error":{if(f("vite:error",t),m){const e=t.err;N?ie(e):console.error(`[vite] Internal Server Error
${e.message}
${e.stack}`)}break}case"ping":break;default:return t}}function f(t,e){E.notifyListeners(t,e)}const N=__HMR_ENABLE_OVERLAY__,m="document"in globalThis;function ie(t){z();const{customElements:e}=globalThis;if(e){const n=e.get(h);document.body.appendChild(new n(t))}}function z(){document.querySelectorAll(h).forEach(t=>t.close())}function se(){return document.querySelectorAll(h).length}async function ce(t,e=1e3){async function n(){const o=new WebSocket(t,"vite-ping");return new Promise(r=>{function i(){r(!0),c()}function s(){r(!1),c()}function c(){o.removeEventListener("open",i),o.removeEventListener("error",s),o.close()}o.addEventListener("open",i),o.addEventListener("error",s)})}if(!await n())for(await H(e);;)if(document.visibilityState==="visible"){if(await n())break;await H(e)}else await ae()}function H(t){return new Promise(e=>setTimeout(e,t))}function ae(){return new Promise(t=>{const e=async()=>{document.visibilityState==="visible"&&(t(),document.removeEventListener("visibilitychange",e))};document.addEventListener("visibilitychange",e)})}const le=new Map;"document"in globalThis&&document.querySelectorAll("style[data-vite-dev-id]").forEach(t=>{le.set(t.getAttribute("data-vite-dev-id"),t)});var A;"document"in globalThis&&((A=document.querySelector("meta[property=csp-nonce]"))==null||A.nonce);

(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,963499,e=>{"use strict";var t=e.i(843476),a=e.i(391264),s=e.i(131614),n=e.i(271645),o=e.i(902702),r=e.i(937039);let i={darkMode:!1,background:"#f5f4ef",primaryColor:"#e8e6df",secondaryColor:"#f5f4ef",tertiaryColor:"#d9d6cc",primaryTextColor:"#131311",secondaryTextColor:"#3c3c38",tertiaryTextColor:"#6f6f69",primaryBorderColor:"#d9d6cc",secondaryBorderColor:"#e8e6df",tertiaryBorderColor:"#f5f4ef",edgeLabelBackground:"#f5f4ef",lineColor:"#6f6f69",textColor:"#131311",pie1:"#da7756",pie2:"#4a90d9",pie3:"#7c5cba",pie4:"#5a9a32",pie5:"#c94a4a",pie6:"#c9871e",pieStrokeColor:"#e8e6df",pieOuterStrokeColor:"#e8e6df",fillType0:"#da7756",fillType1:"#4a90d9",fillType2:"#7c5cba",fillType3:"#5a9a32",fillType4:"#c94a4a",fillType5:"#c9871e",fillType6:"#6f6f69",fillType7:"#d9d6cc"},l={darkMode:!0,background:"#1f1e1d",primaryColor:"#2f2e2c",secondaryColor:"#252423",tertiaryColor:"#3c3b39",primaryTextColor:"#f5f4ef",secondaryTextColor:"#c4bfb3",tertiaryTextColor:"#6f6f69",primaryBorderColor:"#4a4845",secondaryBorderColor:"#3c3b39",tertiaryBorderColor:"#2f2e2c",edgeLabelBackground:"#1f1e1d",lineColor:"#6f6f69",textColor:"#f5f4ef",pie1:"#da7756",pie2:"#4a90d9",pie3:"#9a7dd4",pie4:"#6abf3b",pie5:"#e06666",pie6:"#d9a033",pieStrokeColor:"#2f2e2c",pieOuterStrokeColor:"#2f2e2c",fillType0:"#da7756",fillType1:"#4a90d9",fillType2:"#9a7dd4",fillType3:"#6abf3b",fillType4:"#e06666",fillType5:"#d9a033",fillType6:"#6f6f69",fillType7:"#3c3b39"};function c(){let[t,a]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{try{let t=await e.A(695802);a(t.default)}catch(e){s.logger.error(s.LoggerTopic.USER_CONTENT_RENDERER,"Failed to load Mermaid",e)}})()},[]),t}let d=({content:e,theme:d="dark"})=>{let u=c(),p=(0,n.useId)(),[h,m]=(0,n.useState)({status:"loading"}),g="dark"===d?l:i,b="dark"===d?"#1f1e1d":"#f5f4ef";(0,n.useEffect)(()=>{if(!u)return;let t=!1;return(async()=>{try{let{svg:s,diagramId:n}=await (0,a.renderMermaidIsolated)(u,{startOnLoad:!1,htmlLabels:!1,maxTextSize:2e4,maxEdges:400,theme:"base",themeVariables:{fontFamily:"monospace",fontSize:"14px",...g}},`mermaid-artifact-${p.replace(/[^a-zA-Z0-9]/g,"")}`,e);t||m({status:"success",svg:(0,a.sanitizeMermaidSvg)(s,n)})}catch(e){t||(s.logger.error(s.LoggerTopic.USER_CONTENT_RENDERER,"Failed to render Mermaid diagram",e),m({status:"error"}))}})(),()=>{t=!0}},[e,u,p,g]);let y=async()=>{document.fullscreenElement?await document.exitFullscreen?.():await document.documentElement.requestFullscreen()};return"loading"===h.status?(0,t.jsx)("div",{className:"flex h-full w-full items-center justify-center",style:{backgroundColor:b},children:(0,t.jsx)(o.LoadingSpinner,{size:"md"})}):"error"===h.status?(0,t.jsx)("pre",{className:"h-full w-full overflow-auto whitespace-pre-wrap p-4 font-mono text-sm",style:{backgroundColor:b,color:g.primaryTextColor},children:e}):(0,t.jsxs)(r.ZoomPanContainer,{style:{backgroundColor:b},children:[(0,t.jsx)("div",{"data-mermaid":!0,className:"relative [contain:paint] flex max-h-full max-w-full grow items-center justify-center self-stretch [&>svg]:max-h-full [&>svg]:max-w-full",style:{backgroundColor:b},dangerouslySetInnerHTML:{__html:h.svg}}),(0,t.jsx)("button",{onClick:y,"aria-label":"Toggle fullscreen",className:"absolute bottom-2 right-2 z-10 rounded-md px-2 py-1",style:{backgroundColor:"dark"===d?"rgba(47, 46, 44, 0.5)":"rgba(217, 214, 204, 0.5)",color:"#6f6f69"}})]})},u=(0,n.memo)(d);u.displayName="MermaidRenderer",e.s(["MermaidRenderer",0,u])},98095,__turbopack_context__=>{"use strict";var __TURBOPACK__imported__module__843476__=__turbopack_context__.i(843476),__TURBOPACK__imported__module__698829__=__turbopack_context__.i(698829),__TURBOPACK__imported__module__271645__=__turbopack_context__.i(271645);function ReplRenderer({initialCode="",sendRequest}){let fetchData=(0,__TURBOPACK__imported__module__271645__.useCallback)(async e=>{if(sendRequest)return(await sendRequest(__TURBOPACK__imported__module__698829__.KnownMethods.GetFile,{key:e,"@type":"type.googleapis.com/anthropic.claude.usercontent.sandbox.GetFileRequest"})).value},[sendRequest]),onFinish=(0,__TURBOPACK__imported__module__271645__.useCallback)(e=>{sendRequest?.(__TURBOPACK__imported__module__698829__.KnownMethods.SendConversationMessage,{messageType:"text",message:e,"@type":"type.googleapis.com/anthropic.claude.usercontent.sandbox.SendConversationMessageRequest"})},[sendRequest]),onError=(0,__TURBOPACK__imported__module__271645__.useCallback)(e=>{sendRequest?.(__TURBOPACK__imported__module__698829__.KnownMethods.SendConversationMessage,{messageType:"error",message:e,"@type":"type.googleapis.com/anthropic.claude.usercontent.sandbox.SendConversationMessageRequest"})},[sendRequest]);return(0,__TURBOPACK__imported__module__271645__.useEffect)(()=>{try{let res=eval(initialCode);onFinish(JSON.stringify(res)??"")}catch(err){onError(err instanceof Error?err.message:String(err))}},[initialCode,onError,onFinish]),(0,__TURBOPACK__imported__module__843476__.jsx)(__TURBOPACK__imported__module__843476__.Fragment,{})}__turbopack_context__.s(["ReplRenderer",0,ReplRenderer])},780934,e=>{"use strict";var t=e.i(843476),a=e.i(271645);function s(e,t){if("function"==typeof e)return e(t);"object"==typeof e&&null!==e&&"current"in e&&(e.current=t)}function n(...e){let t=new Map;return a=>{if(e.forEach(e=>{let n=s(e,a);n&&t.set(e,n)}),t.size>0)return()=>{e.forEach(e=>{let a=t.get(e);a?a():s(e,null)}),t.clear()}}}function o(...e){return(0,a.useCallback)(n(...e),e)}var r=e.i(582458),r=r,i=e.i(884981),i=i,l=e.i(798031),l=l,c=a,d=e.i(747500),u=e.i(656464);function p(e,t){return!!e&&t.nonce===e.nonce&&(e.resolve(t),!0)}let h=1e4;function m(e){return e.length<=h?e:e.slice(0,h).replace(/[\ud800-\udbff]$/,"")+"…"}function g(e){try{if("string"==typeof e)return e;if(null===e||"object"!=typeof e)return m(String(e));if(ArrayBuffer.isView(e)&&e.byteLength>h)return m(Object.prototype.toString.call(e));let t=h,a=JSON.stringify(e,(e,a)=>{if((t-=e.length+1)<0)throw Error("budget");if(ArrayBuffer.isView(a)&&a.byteLength>h){let e=m(Object.prototype.toString.call(a));if((t-=e.length+1)<0)throw Error("budget");return e}if("string"==typeof a&&(t-=a.length),t<0)throw Error("budget");return a});return m(a??Object.prototype.toString.call(e))}catch{try{return m(Object.prototype.toString.call(e))}catch{return"[unserializable]"}}}let b=new WeakSet,y=c.forwardRef(({content:e,onScreenshot:a,chartTheme:s,hostMessage:n},p)=>{let[h,m]=(0,c.useState)([]),y=(0,c.useRef)(null),f=o(y,p),x=(0,c.useRef)(s);(0,c.useEffect)(()=>{let e=y.current,t=()=>{let t=e?.contentDocument;if(!t)return;let a=t.getElementById("claude-chart-theme");if(!s)return void a?.remove();let n=a;n||((n=t.createElement("style")).id="claude-chart-theme",(t.head??t.documentElement).appendChild(n)),n.textContent=`:root {
${(0,u.chartThemeCssVariables)(s)} }`};return t(),e?.addEventListener("load",t),()=>e?.removeEventListener("load",t)},[s,e]),(0,c.useEffect)(()=>{if(!n)return;let e=y.current,t=()=>{e?.contentWindow?.postMessage({type:"hostMessage",data:n},window.location.origin)};return t(),e?.addEventListener("load",t),()=>e?.removeEventListener("load",t)},[n,e]),(0,c.useEffect)(()=>{let e=y.current?.contentWindow;e&&b.add(e)},[e]),(0,c.useEffect)(()=>{let e=e=>{if(!e.source||!b.has(e.source))return;if(e.source!==y.current?.contentWindow){let t=e.data,a=t&&"object"==typeof t?t.type:void 0;if("console"!==a&&"screenshotData"!==a&&"screenshotError"!==a)return}if(e.origin!==window.location.origin)return;let t=e.data;if(t&&"screenshotData"===t.type&&a?.({success:!0,screenshot:t.data,nonce:t.nonce}),t&&"screenshotError"===t.type&&a?.({success:!1,error:t.error,nonce:t.nonce}),t&&"console"===t.type&&null!==t.message&&void 0!==t.message){let e=g(t.message);""!==e&&m(t=>[...t,e])}if(t&&"claudeComplete"===t.type&&window.claude.complete(t.prompt).then(e=>{y.current?.contentWindow?.postMessage({type:"claudeComplete",completion:e,id:t.id},window.location.origin)}).catch(e=>{y.current?.contentWindow?.postMessage({type:"claudeComplete",error:e instanceof Error?e.message:String(e),id:t.id},window.location.origin)}),t&&"openExternal"===t.type&&window.claude.openExternal(t.href),t&&"downloadFile"===t.type&&window.claude.downloadFile(t),t&&"proxyFetch"===t.type){let{channelId:e}=t;fetch(t.url,t.init).then(async a=>{if(y.current?.contentWindow?.postMessage({type:"proxyFetchResponse",id:t.id,headers:Object.fromEntries(a.headers.entries()),status:a.status,statusText:a.statusText},window.location.origin),a.body&&e){let t=a.body.getReader();try{let a=!1;for(;!a;){let s=await t.read();(a=s.done)?y.current?.contentWindow?.postMessage({type:"proxyFetchStream",channelId:e,done:!0},window.location.origin):s.value&&y.current?.contentWindow?.postMessage({type:"proxyFetchStream",channelId:e,chunk:s.value.buffer},window.location.origin,[s.value.buffer])}}catch(t){y.current?.contentWindow?.postMessage({type:"proxyFetchStream",channelId:e,error:t instanceof Error?t.message:String(t)},window.location.origin)}finally{t.releaseLock()}}else!a.body&&e&&y.current?.contentWindow?.postMessage({type:"proxyFetchStream",channelId:e,done:!0},window.location.origin)}).catch(e=>{y.current?.contentWindow?.postMessage({type:"proxyFetchResponse",id:t.id,error:e instanceof Error?e.message:String(e)},window.location.origin)})}t&&"storageGet"===t.type?window.storage.get(t.key,t.shared).then(e=>{y.current?.contentWindow?.postMessage({type:"storageGet",result:e,id:t.id},window.location.origin)}).catch(e=>{y.current?.contentWindow?.postMessage({type:"storageGet",error:e instanceof Error?e.message:String(e),id:t.id},window.location.origin)}):t&&"storageSet"===t.type?window.storage.set(t.key,t.value,t.shared).then(e=>{y.current?.contentWindow?.postMessage({type:"storageSet",result:e,id:t.id},window.location.origin)}).catch(e=>{y.current?.contentWindow?.postMessage({type:"storageSet",error:e instanceof Error?e.message:String(e),id:t.id},window.location.origin)}):t&&"storageDelete"===t.type?window.storage.delete(t.key,t.shared).then(e=>{y.current?.contentWindow?.postMessage({type:"storageDelete",result:e,id:t.id},window.location.origin)}).catch(e=>{y.current?.contentWindow?.postMessage({type:"storageDelete",error:e instanceof Error?e.message:String(e),id:t.id},window.location.origin)}):t&&"storageList"===t.type&&window.storage.list(t.prefix,t.shared).then(e=>{y.current?.contentWindow?.postMessage({type:"storageList",result:e,id:t.id},window.location.origin)}).catch(e=>{y.current?.contentWindow?.postMessage({type:"storageList",error:e instanceof Error?e.message:String(e),id:t.id},window.location.origin)})};return window.addEventListener("message",e),()=>window.removeEventListener("message",e)},[a]);let w=`
    <script>
      (function() {
        // Capture host references before any artifact code runs: Window.parent
        // is [Replaceable] (a top-level \`var parent\` in artifact code would
        // replace the accessor with a data property), and a top-level
        // \`const crypto\` would shadow the global — either would otherwise
        // silently break the bridge for artifacts that worked before.
        const realParent = window.parent;
        const cryptoObj = window.crypto;
        // html-to-image is only used by takeScreenshot: fetched on first use, not as a
        // parser-blocking tag. Native fetch, captured before the proxy override below.
        const realFetch = typeof window.fetch === 'function' ? window.fetch.bind(window) : null;
        const HTML_TO_IMAGE_SRC = "https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.13/html-to-image.min.js";
        const HTML_TO_IMAGE_INTEGRITY = "sha512-iZ2ORl595Wx6miw+GuadDet4WQbdSWS3JLMoNfY8cRGoEFy6oT3G9IbcrBeL6AfkgpA51ETt/faX6yLV+/gFJg==";
        let htmlToImageLoad = null;
        const loadHtmlToImage = () => {
          if (!htmlToImageLoad) {
            htmlToImageLoad = (realFetch
              ? realFetch(HTML_TO_IMAGE_SRC, { integrity: HTML_TO_IMAGE_INTEGRITY, credentials: 'omit', referrerPolicy: 'no-referrer' })
              : Promise.reject(new Error('fetch unavailable'))
            )
              .then((res) => {
                if (!res.ok) throw new Error('html-to-image failed to load (' + res.status + ')');
                return res.text();
              })
              .then((source) => {
                // UMD bundle: hide the artifact's AMD/CommonJS globals so it takes the
                // window-global branch; inline script text runs synchronously on insert.
                const hidden = ['define', 'module', 'exports'].map((k) => {
                  const entry = { k, own: Object.prototype.hasOwnProperty.call(window, k), v: window[k] };
                  try { window[k] = undefined; } catch (e) {}
                  return entry;
                });
                try {
                  const el = document.createElement('script');
                  el.text = source;
                  (document.head || document.documentElement).appendChild(el);
                } finally {
                  hidden.forEach(({ k, own, v }) => {
                    try { if (own) { window[k] = v; } else { delete window[k]; } } catch (e) {}
                  });
                }
                if (!window.htmlToImage) throw new Error('html-to-image unavailable after load');
                return window.htmlToImage;
              });
            // A failed load may be transient; let the next screenshot retry.
            htmlToImageLoad.catch(() => { htmlToImageLoad = null; });
          }
          return htmlToImageLoad;
        };
        // crypto.randomUUID exists only in Secure Contexts; fall back to a
        // unique non-crypto id elsewhere (http://LAN-IP dev flows) —
        // uniqueness is what the bridge needs, unpredictability is
        // defense-in-depth on top of the source guards.
        const newRequestId =
          cryptoObj && typeof cryptoObj.randomUUID === "function"
            ? function () { return cryptoObj.randomUUID(); }
            : function () { return Date.now() + "-" + Math.random(); };
        const originalConsole = window.console;
        window.console = {
          log: (...args) => {
            originalConsole.log(...args);
            realParent.postMessage({ type: 'console', message: args.join(' ') }, '*');
          },
          error: (...args) => {
            originalConsole.error(...args);
            realParent.postMessage({ type: 'console', message: 'Error: ' + args.join(' ') }, '*');
          },
          warn: (...args) => {
            originalConsole.warn(...args);
            realParent.postMessage({ type: 'console', message: 'Warning: ' + args.join(' ') }, '*');
          }
        };

        // Bridge request ids are crypto-random (not sequential) so they
        // cannot be predicted by other frames in the tab.
        let callbacksMap = new Map();
        let streamControllers = new Map();
        
        window.claude = {
          complete: (prompt) => {
            return new Promise((resolve, reject) => {
              const id = newRequestId();
              callbacksMap.set(id, { resolve, reject });
              realParent.postMessage({ type: 'claudeComplete', id, prompt }, '*');
            });
          }
        };

        window.storage = {
          get: (key, shared = false) => {
            return new Promise((resolve, reject) => {
              const id = newRequestId();
              callbacksMap.set(id, { resolve, reject });
              realParent.postMessage({ type: 'storageGet', id, key, shared }, '*');
            });
          },
          set: (key, value, shared = false) => {
            return new Promise((resolve, reject) => {
              const id = newRequestId();
              callbacksMap.set(id, { resolve, reject });
              realParent.postMessage({ type: 'storageSet', id, key, value, shared }, '*');
            });
          },
          delete: (key, shared = false) => {
            return new Promise((resolve, reject) => {
              const id = newRequestId();
              callbacksMap.set(id, { resolve, reject });
              realParent.postMessage({ type: 'storageDelete', id, key, shared }, '*');
            });
          },
          list: (prefix, shared = false) => {
            return new Promise((resolve, reject) => {
              const id = newRequestId();
              callbacksMap.set(id, { resolve, reject });
              realParent.postMessage({ type: 'storageList', id, prefix, shared }, '*');
            });
          }
        };

        let pendingBlobs = new Map();
        URL.createObjectURL = (blob) => {
          // Store the blob and create an ID and URL for it
          const blobId = \`blob-\${Date.now()}-\${Math.random()}\`;
          pendingBlobs.set(blobId, blob);
          return \`blob-request://\${blobId}\`;
        };

        URL.revokeObjectURL = (url) => {
          // Remove the blob from our store
          const blobId = url.replace("blob-request://", "");
          pendingBlobs.delete(blobId);
        };

        const getBlobFromURL = (url) => {
          const blobId = url.replace("blob-request://", "");
          return pendingBlobs.get(blobId);
        };

        // Override global fetch with streaming support
        window.fetch = (url, init = {}) => {
          return new Promise((resolve, reject) => {
            const id = newRequestId();
            const channelId = \`fetch-\${id}-\${Date.now()}\`;
            
            callbacksMap.set(id, { 
              resolve: (response) => {
                // Null-body statuses: Response(stream, {status: 204}) throws
                // per the Fetch spec, which would escape this resolver and
                // hang the artifact's await forever.
                if (response.status === 204 || response.status === 205 || response.status === 304) {
                  try {
                    resolve(new Response(null, {
                      status: response.status,
                      statusText: response.statusText,
                      headers: response.headers
                    }));
                  } catch (err) {
                    // Invalid statusText/header bytes can throw here too.
                    reject(new TypeError(
                      'Bridge fetch: unconstructable response (status ' + response.status + ')'
                    ));
                  }
                  return;
                }
                // Create a ReadableStream for the response body
                const stream = new ReadableStream({
                  start(controller) {
                    streamControllers.set(channelId, controller);
                  },
                  cancel() {
                    streamControllers.delete(channelId);
                  }
                });
                
                // Create and return the Response with the stream. Response()
                // requires status in [200, 599]; an opaque/no-cors fetch
                // forwards status 0, which would throw here and escape the
                // resolver, hanging the artifact's await. Surface it as a
                // network-error-shaped rejection instead.
                try {
                  resolve(new Response(stream, {
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers
                  }));
                } catch (err) {
                  streamControllers.delete(channelId);
                  reject(new TypeError(
                    'Bridge fetch: unconstructable response (status ' + response.status + ')'
                  ));
                }
              },
              reject,
              channelId
            });
            
            realParent.postMessage({
              type: 'proxyFetch',
              id,
              url,
              init,
              channelId
            }, '*');
          });
        };

        window.addEventListener('message', async (event) => {
          // Only the embedding parent may drive the bridge — sibling and
          // nested frames can also postMessage into this window.
          if (event.source !== realParent) return;
          if (event.data.type === 'takeScreenshot') {
            // Echo the request's nonce so the requester can correlate the
            // reply to ITS request — a reply without the expected nonce
            // (e.g. from a stale pre-remount artifact) is ignored upstream.
            const screenshotNonce = event.data.nonce;
            const rootElement = document.getElementById('artifacts-component-root-html');
            if (!rootElement) {
              realParent.postMessage({
                type: 'screenshotError',
                nonce: screenshotNonce,
                error: new Error('Root element not found'),
              }, '*');
              return;
            }
            // Catch CDN load failures and toPng errors so the parent always
            // gets a response instead of hanging forever.
            try {
              const htmlToImage = await loadHtmlToImage();
              const screenshot = await htmlToImage.toPng(rootElement, {
                imagePlaceholder:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjePDgwX8ACOQDoNsk0PMAAAAASUVORK5CYII=",
              });
              realParent.postMessage({
                type: 'screenshotData',
                nonce: screenshotNonce,
                data: screenshot,
              }, '*');
            } catch (err) {
              realParent.postMessage({
                type: 'screenshotError',
                nonce: screenshotNonce,
                error: err instanceof Error ? err : new Error(String(err)),
              }, '*');
            }
          } else if (event.data.type === 'claudeComplete') {
            const callback = callbacksMap.get(event.data.id);
            if (!callback) return;
            if (event.data.error) {
              callback.reject(new Error(event.data.error));
            } else {
              callback.resolve(event.data.completion);
            }
            callbacksMap.delete(event.data.id);
          } else if (event.data.type === 'proxyFetchResponse') {
            const callback = callbacksMap.get(event.data.id);
            if (!callback) return;
            if (event.data.error) {
              callback.reject(new Error(event.data.error));
              callbacksMap.delete(event.data.id);
            } else {
              // Initial response with headers, status, etc.
              callback.resolve({
                status: event.data.status,
                statusText: event.data.statusText,
                headers: event.data.headers
              });
              // Don't delete the callback yet if streaming
              if (!event.data.body) {
                callbacksMap.delete(event.data.id);
              }
            }
          } else if (event.data.type === 'proxyFetchStream') {
            // Handle streaming data chunks
            const controller = streamControllers.get(event.data.channelId);
            if (controller) {
              if (event.data.error) {
                controller.error(new Error(event.data.error));
                streamControllers.delete(event.data.channelId);
              } else if (event.data.done) {
                controller.close();
                streamControllers.delete(event.data.channelId);
                // Clean up the callback
                const callback = Array.from(callbacksMap.entries()).find(
                  ([_, value]) => value.channelId === event.data.channelId
                );
                if (callback) {
                  callbacksMap.delete(callback[0]);
                }
              } else if (event.data.chunk) {
                controller.enqueue(new Uint8Array(event.data.chunk));
              }
            }
          } else if (event.data.type === 'storageGet') {
            const callback = callbacksMap.get(event.data.id);
            if (!callback) return;
            if (event.data.error) {
              callback.reject(new Error(event.data.error));
            } else {
              callback.resolve(event.data.result);
            }
            callbacksMap.delete(event.data.id);
          } else if (event.data.type === 'storageSet') {
            const callback = callbacksMap.get(event.data.id);
            if (!callback) return;
            if (event.data.error) {
              callback.reject(new Error(event.data.error));
            } else {
              callback.resolve(event.data.result);
            }
            callbacksMap.delete(event.data.id);
          } else if (event.data.type === 'storageDelete') {
            const callback = callbacksMap.get(event.data.id);
            if (!callback) return;
            if (event.data.error) {
              callback.reject(new Error(event.data.error));
            } else {
              callback.resolve(event.data.result);
            }
            callbacksMap.delete(event.data.id);
          } else if (event.data.type === 'storageList') {
            const callback = callbacksMap.get(event.data.id);
            if (!callback) return;
            if (event.data.error) {
              callback.reject(new Error(event.data.error));
            } else {
              callback.resolve(event.data.result);
            }
            callbacksMap.delete(event.data.id);
          }
        });

        window.addEventListener('click', (event) => {
          const isEl = event.target instanceof HTMLElement;
          if (!isEl) return;
    
          // find ancestor links
          const linkEl = event.target.closest("a");
          if (!linkEl || !linkEl.href) return;
    
          event.preventDefault();
          event.stopImmediatePropagation();
    
          if (linkEl.href.startsWith("blob-request:")) {
            const blob = getBlobFromURL(linkEl.href);
            if (!blob) return;
            void blob.arrayBuffer().then((data) => {
              realParent.postMessage({
                type: "downloadFile",
                filename: linkEl.download,
                data,
                mimeType: blob.type || "application/octet-stream",
              });
            });
          } else if (linkEl.href.startsWith("data:")) {
            const [header, base64Data] = linkEl.href.split(",");
            const mimeMatch = header.match(/data:([^;]+)/);
            const mimeType = mimeMatch ? mimeMatch[1] : "application/octet-stream";
            const binaryString = atob(base64Data);
            const data = Uint8Array.from(binaryString, (c) =>
              c.charCodeAt(0),
            ).buffer;
            realParent.postMessage({
              type: "downloadFile",
              filename: linkEl.download,
              data,
              mimeType,
            });
          } else {
            let linkUrl;
            try {
              linkUrl = new URL(linkEl.href);
            } catch (error) {
              return;
            }
    
            if (linkUrl.hostname === window.location.hostname) return;
      
            realParent.postMessage({
              type: 'openExternal',
              href: linkEl.href,
            }, '*');
          }
      });

        const originalOpen = window.open;
        window.open = function (url) {
          realParent.postMessage({
            type: "openExternal",
            href: url,
          }, "*");
        };

        window.addEventListener('error', (event) => {
          realParent.postMessage({ type: 'console', message: 'Uncaught Error: ' + event.message }, '*');
        });
      })();
    </script>
  `,S=x.current,R=S?`
    <style id="claude-chart-theme">
      :root {
${(0,u.chartThemeCssVariables)(S)}
      }
    </style>
  `:"",z=/<head(\s[^>]*)?>/i,v=z.test(e)?e.replace(z,e=>`${e}${w}${R}`):`${w}${R}${e}`;return v=v.replace(/<body(\s[^>]*)?>/i,e=>{let t=e.slice(5,-1);return`<body${t} id="artifacts-component-root-html">`}),(0,t.jsxs)(d.ResizablePanelGroup,{direction:"vertical",className:"h-screen",children:[(0,t.jsx)(d.ResizablePanel,{defaultSize:h.length>0?80:100,children:(0,t.jsx)("iframe",{ref:f,className:"h-full w-full",title:"Rendered HTML content",sandbox:"allow-scripts allow-same-origin",allow:"clipboard-write",srcDoc:v},e)}),h.length>0&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(d.ResizableHandle,{withHandle:!0}),(0,t.jsx)(d.ResizablePanel,{defaultSize:20,children:(0,t.jsxs)("div",{className:"h-full overflow-auto p-4",style:{backgroundColor:"hsl(60 1.8% 22%)",backgroundImage:"linear-gradient(hsl(60 3.3% 17.8%), hsl(45 4.9% 16.1%))"},children:[(0,t.jsxs)("div",{className:"mb-2 inline-flex items-center gap-2 rounded-lg border px-2 py-1",style:{borderColor:"hsl(50 5.9% 40%)",color:"hsl(47 8.4% 79%)"},children:[(0,t.jsx)(i.default,{size:12}),(0,t.jsx)("h2",{className:"gap-2 font-ui text-xs",children:"Console Messages"})]}),h.map((e,a)=>{let s=null,n={},o={color:"hsl(50 23.1% 94.9%)"};return e.startsWith("Error:")||e.startsWith("Uncaught Error:")?(s=(0,t.jsx)(l.default,{size:12,className:"mt-1 shrink-0 text-red-500"}),n={backgroundColor:"rgba(255, 0, 0, 0.1)"},o.color="hsl(5 69.4% 72.9%)"):e.startsWith("Warning:")&&(s=(0,t.jsx)(r.default,{size:12,className:"mt-1 shrink-0 text-yellow-500"}),n={backgroundColor:"rgba(255, 255, 0, 0.1)"},o.color="hsl(18 50.4% 47.5%)"),(0,t.jsxs)("div",{className:"mb-0.5 flex items-start gap-2 rounded-lg px-2 py-1",style:n,children:[(0,t.jsx)(t.Fragment,{children:s}),(0,t.jsx)("pre",{className:"flex-grow text-wrap font-mono text-sm",style:o,children:e})]},a)})]})})]})]})});y.displayName="UnsafeHtmlRenderer";let f=c.memo(y);e.s(["UnsafeHtmlRenderer",0,f,"resolvePendingScreenshot",0,p],780934)},65551,e=>{"use strict";var t=e.i(843476),a=e.i(271645);let s=100,n=20,o=120,r=50;function i(e){return null!==e&&"object"==typeof e&&"value"in e}function l(e){return i(e)?e.value:e}function c(e){if(i(e))return e.formula}function d({sheetName:e,data:i,selectedCell:u,onCellSelect:p,isFirstRowHeader:h=!1,formulaBar:m=!1}){let g=Math.min(Math.max(...i.map(e=>e?.length||0)),n),[b,y]=(0,a.useState)(()=>Array(g).fill(o)),[f,x]=(0,a.useState)(!1),w=(0,a.useRef)(0),S=(0,a.useRef)(0),R=(0,a.useRef)(null),z=(0,a.useCallback)(e=>{let t="";for(;e>=0;)t=String.fromCharCode(e%26+65)+t,e=Math.floor(e/26)-1;return t},[]),v=(0,a.useCallback)(e=>null==e?"":String(e),[]),C=(0,a.useCallback)(e=>{let t=c(e);return t?`=${t}`:v(l(e))},[v]),M=(0,a.useCallback)(e=>{let t=e.clientX-w.current,a=Math.max(o,S.current+t);y(e=>{let t=[...e];return null!==R.current&&(t[R.current]=a),t})},[]),E=(0,a.useCallback)(()=>{document.removeEventListener("mousemove",M),document.removeEventListener("mouseup",E),R.current=null,x(!1)},[M]),k=(0,a.useCallback)((e,t)=>{e.preventDefault(),e.stopPropagation(),y(e=>(S.current=e[t],e)),w.current=e.clientX,R.current=t,x(!0),document.addEventListener("mousemove",M),document.addEventListener("mouseup",E)},[M,E]);return i.length?(0,t.jsx)("div",{className:"flex-1 min-h-0 w-full bg-gray-50",style:{cursor:f?"col-resize":void 0},children:(0,t.jsxs)("div",{className:"flex flex-col h-full bg-white rounded-sm border border-gray-200 overflow-hidden",children:[m&&(0,t.jsx)("div",{className:"bg-white border-b border-gray-300 px-3 py-2 min-h-[44px] flex items-center",children:(0,t.jsx)("div",{className:"text-sm text-gray-700 font-mono",children:u&&i[u.row]?.[u.col]?C(i[u.row]?.[u.col]):(0,t.jsx)("span",{className:"text-gray-400",children:"Select a cell to view its content"})})}),(0,t.jsx)("div",{className:"flex-1 overflow-auto relative bg-gray-50",children:(0,t.jsxs)("table",{className:"border-collapse",style:{tableLayout:"fixed"},children:[(0,t.jsx)("thead",{className:"sticky top-0 z-20 bg-gray-200",children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{"aria-label":"Row numbers",className:"sticky left-0 z-30 border-r border-b border-gray-300 bg-gray-300",style:{width:`${r}px`,minWidth:`${r}px`}}),Array.from({length:g}).map((e,a)=>(0,t.jsxs)("th",{className:"relative border-r border-b border-gray-300 bg-gray-200 px-4 py-2 text-xs font-semibold text-gray-700",style:{width:`${b[a]}px`,minWidth:`${b[a]}px`},children:[z(a),(0,t.jsx)("div",{className:"absolute top-0 -right-1 w-3 h-full cursor-col-resize hover:bg-blue-400 active:bg-blue-500 z-10",onMouseDown:e=>k(e,a)})]},a))]})}),(0,t.jsx)("tbody",{children:i.slice(0,s).map((e,a)=>{let s=h&&0===a;return(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{className:"sticky left-0 z-10 border-r border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold text-gray-700",style:{width:`${r}px`,minWidth:`${r}px`},children:a+1}),Array.from({length:g}).map((n,o)=>{let r=e?.[o],i=l(r),d=c(r),h=u?.row===a&&u?.col===o;return(0,t.jsx)("td",{onClick:()=>p({row:a,col:o}),className:`border border-gray-300 px-2 py-1 text-sm cursor-cell ${s?"font-semibold bg-gray-100":""} ${h?"bg-blue-50 outline outline-2 outline-blue-500":s?"":"hover:bg-gray-50"}`,style:{width:`${b[o]}px`,minWidth:`${b[o]}px`,maxWidth:`${b[o]}px`},children:d&&(!i||""===i)?(0,t.jsxs)("span",{className:"text-gray-400 italic",children:["=",d]}):v(i)},o)})]},a)})})]})})]})}):(0,t.jsx)("div",{className:"flex items-center justify-center min-h-[600px] bg-gray-50 rounded-lg",children:(0,t.jsx)("p",{className:"text-gray-500",children:"No data available"})})}let u=a.memo(d);e.s(["TableView",0,u])},698829,39177,e=>{"use strict";var t,a=e.i(623272),s=e.i(296362),n=e.i(681307),o=e.i(70249),r=n;let i=(0,s.lazyValue)(()=>{let e=r.z.object({channel:r.z.enum(["request","response"]),requestId:r.z.string()}).passthrough(),t=e.strict().extend({channel:r.z.literal("request"),method:r.z.string(),payload:r.z.strictObject({"@type":r.z.string()})}),a=e.extend({channel:r.z.literal("response"),status:r.z.number().int().min(100).max(599),payload:r.z.strictObject({"@type":r.z.string()}).passthrough()}).passthrough(),s=a.extend({status:r.z.number().int().min(400).max(599),payload:r.z.strictObject({"@type":r.z.literal("type.googleapis.com/anthropic.claude.usercontent.ErrorResponse"),error:r.z.string()})}),n=a.extend({payload:r.z.strictObject({"@type":r.z.literal("type.googleapis.com/google.protobuf.Empty")})});return{baseMessage:e,baseRequest:t,baseResponse:a,errorResponse:s,emptyResponse:n}}),l=r.z.lazy(()=>i().baseMessage),c=r.z.lazy(()=>i().baseResponse),d=r.z.lazy(()=>i().errorResponse);r.z.lazy(()=>i().emptyResponse);let u={"@type":"type.googleapis.com/google.protobuf.Empty"},p=e=>({"@type":"type.googleapis.com/anthropic.claude.usercontent.ErrorResponse",error:e});e.s(["baseMessageSchema",0,l,"baseResponseSchema",0,c,"emptyPayload",0,u,"errorResponseSchema",0,d,"getErrorResponsePayload",0,p,"protocolSchemas",0,i],39177);var h=((t={}).ReadyForContent="anthropic.claude.usercontent.sandbox.ReadyForContent",t.SetContent="anthropic.claude.usercontent.sandbox.SetContent",t.GetFile="anthropic.claude.usercontent.sandbox.GetFile",t.SendConversationMessage="anthropic.claude.usercontent.sandbox.SendConversationMessage",t.RunCode="anthropic.claude.usercontent.sandbox.RunCode",t.ClaudeCompletion="anthropic.claude.usercontent.sandbox.ClaudeCompletion",t.ReportError="anthropic.claude.usercontent.sandbox.ReportError",t.GetScreenshot="anthropic.claude.usercontent.sandbox.GetScreenshot",t.BroadcastContentSize="anthropic.claude.usercontent.sandbox.BroadcastContentSize",t.OpenExternal="anthropic.claude.usercontent.sandbox.OpenExternal",t.DownloadFile="anthropic.claude.usercontent.sandbox.DownloadFile",t.CopyHtmlContent="anthropic.claude.usercontent.sandbox.CopyHtmlContent",t.TrackInteraction="anthropic.claude.usercontent.sandbox.TrackInteraction",t.ProxyFetch="anthropic.claude.usercontent.sandbox.ProxyFetch",t.ProxyFetchStream="anthropic.claude.usercontent.sandbox.ProxyFetchStream",t.GetDOMSnapshot="anthropic.claude.usercontent.sandbox.GetDOMSnapshot",t.PostHostMessage="anthropic.claude.usercontent.sandbox.PostHostMessage",t.DOMContentLoaded="anthropic.claude.usercontent.sandbox.DOMContentLoaded",t.ReportRenderTiming="anthropic.claude.usercontent.sandbox.ReportRenderTiming",t.StorageGet="anthropic.claude.usercontent.sandbox.StorageGet",t.StorageSet="anthropic.claude.usercontent.sandbox.StorageSet",t.StorageDelete="anthropic.claude.usercontent.sandbox.StorageDelete",t.StorageList="anthropic.claude.usercontent.sandbox.StorageList",t.SetPreviewCommentMode="anthropic.claude.usercontent.sandbox.SetPreviewCommentMode",t.ReportPreviewCommentClick="anthropic.claude.usercontent.sandbox.ReportPreviewCommentClick",t.GetConvertPdfToken="anthropic.claude.usercontent.sandbox.GetConvertPdfToken",t);let m=n.z.lazy(()=>n.z.discriminatedUnion("type",[n.z.object({type:n.z.literal("UnsupportedImports"),unsupportedModules:n.z.array(n.z.string()),nonExistentIcons:n.z.array(n.z.string())}),n.z.object({type:n.z.literal("RuntimeError"),message:n.z.string()}),n.z.object({type:n.z.literal("FileNotFound"),fileName:n.z.string()}),n.z.object({type:n.z.literal("ClaudeCompletionError"),message:n.z.string()}),n.z.object({type:n.z.literal("ArtifactStorageError"),message:n.z.string()})]));n.z.lazy(()=>n.z.object({code:n.z.string()}));let g=(0,s.lazyValue)(()=>n.z.object({status:n.z.enum(["success","error"]),result:n.z.string().optional(),logs:n.z.array(n.z.string()),error:n.z.string().optional()})),b=n.z.lazy(g),y=5242880,f=[137,80,78,71,13,10,26,10];function x(e){let t=new Uint8Array(e,0,Math.min(8,e.byteLength));return f.every((e,a)=>t[a]===e)}let w=(0,s.lazyValue)(()=>({"anthropic.claude.usercontent.sandbox.CopyHtmlContent":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.CopyHtmlContent"),payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.CopyHtmlContentRequest")})}),responseSchema:i().baseResponse.extend({payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.CopyHtmlContentResponse"),reportHTMLContent:n.z.string()})}),alwaysPermitted:!1},"anthropic.claude.usercontent.sandbox.SetContent":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.SetContent"),payload:n.z.discriminatedUnion("type",[n.z.strictObject({"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.SandboxContent"),content:n.z.string(),type:n.z.nativeEnum(a.ArtifactMimeType),watchContentSize:n.z.boolean().optional(),theme:n.z.strictObject({mode:n.z.enum(["light","dark"]),variables:n.z.record(n.z.string(),n.z.string())}).optional()}),n.z.strictObject({"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.SandboxContent"),content:n.z.union([n.z.string(),n.z.instanceof(ArrayBuffer)]),type:n.z.nativeEnum(a.WiggleMimeType),watchContentSize:n.z.boolean().optional(),theme:n.z.strictObject({mode:n.z.enum(["light","dark"]),variables:n.z.record(n.z.string(),n.z.string())}).optional()})])}),responseSchema:i().emptyResponse,alwaysPermitted:!1},"anthropic.claude.usercontent.sandbox.ReadyForContent":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.ReadyForContent"),payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/google.protobuf.Empty")})}),responseSchema:i().emptyResponse,alwaysPermitted:!0},"anthropic.claude.usercontent.sandbox.BroadcastContentSize":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.BroadcastContentSize"),payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.BroadcastContentSizePayload"),height:n.z.number(),width:n.z.number()})}),responseSchema:i().emptyResponse,alwaysPermitted:!1},"anthropic.claude.usercontent.sandbox.GetFile":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.GetFile"),payload:n.z.strictObject({key:n.z.string(),"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.GetFileRequest")})}),responseSchema:i().baseResponse.extend({payload:n.z.strictObject({value:n.z.instanceof(Uint8Array).nullable(),"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.GetFileResponse")})}),alwaysPermitted:!1},"anthropic.claude.usercontent.sandbox.SendConversationMessage":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.SendConversationMessage"),payload:n.z.strictObject({message:n.z.string(),messageType:n.z.enum(["text","error"]),"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.SendConversationMessageRequest")})}),responseSchema:i().emptyResponse,alwaysPermitted:!1},"anthropic.claude.usercontent.sandbox.RunCode":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.RunCode"),payload:n.z.strictObject({code:n.z.string(),"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.RunCodeRequest")})}),responseSchema:i().baseResponse.extend({payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.RunCodeResponse")}).merge(g())}),alwaysPermitted:!1},"anthropic.claude.usercontent.sandbox.ClaudeCompletion":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.ClaudeCompletion"),payload:n.z.strictObject({prompt:n.z.string(),"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.ClaudeCompletionRequest")})}),responseSchema:i().baseResponse.extend({payload:n.z.strictObject({completion:n.z.string().nullable(),"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.ClaudeCompletionResponse")})}),alwaysPermitted:!1},"anthropic.claude.usercontent.sandbox.ReportError":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.ReportError"),payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.ReportErrorRequest"),error:m})}),responseSchema:i().emptyResponse,alwaysPermitted:!0},"anthropic.claude.usercontent.sandbox.GetScreenshot":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.GetScreenshot"),payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/google.protobuf.Empty")})}),responseSchema:i().baseResponse.extend({payload:n.z.strictObject({screenshot:n.z.string().nullable(),"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.GetScreenshotResponse")})}),alwaysPermitted:!1},"anthropic.claude.usercontent.sandbox.OpenExternal":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.OpenExternal"),payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.OpenExternal"),href:n.z.string().refine(e=>{if((0,o.isContentSafeClaudeDeepLink)(e))return!0;try{return["http:","https:"].includes(new URL(e).protocol)}catch{return!1}},"OpenExternal only permits http(s) and content-safe claude:// URLs")})}),responseSchema:i().emptyResponse,alwaysPermitted:!0},"anthropic.claude.usercontent.sandbox.DownloadFile":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.DownloadFile"),payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.DownloadFile"),filename:n.z.string(),data:n.z.instanceof(ArrayBuffer),mimeType:n.z.string()})}),responseSchema:i().emptyResponse,alwaysPermitted:!0},"anthropic.claude.usercontent.sandbox.TrackInteraction":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.TrackInteraction"),payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.TrackInteraction"),interactionType:n.z.literal("click")})}),responseSchema:i().emptyResponse,alwaysPermitted:!0},"anthropic.claude.usercontent.sandbox.ReportRenderTiming":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.ReportRenderTiming"),payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.ReportRenderTiming"),phase:n.z.enum(["convert","convert_server","convert_route","first_paint"]),durationMs:n.z.number().min(0).max(36e5),inputBytes:n.z.number().int().min(0).max(0x40000000).optional(),outputBytes:n.z.number().int().min(0).max(0x40000000).optional(),cache:n.z.enum(["hit","miss"]).optional()})}),responseSchema:i().emptyResponse,alwaysPermitted:!0},"anthropic.claude.usercontent.sandbox.ProxyFetch":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.ProxyFetch"),payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.ProxyFetchRequest"),url:n.z.string(),method:n.z.string(),headers:n.z.record(n.z.string(),n.z.string()),body:n.z.instanceof(ArrayBuffer).nullable(),channelId:n.z.string()})}),responseSchema:i().baseResponse.extend({payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.ProxyFetchResponse"),status:n.z.number(),statusText:n.z.string(),headers:n.z.record(n.z.string(),n.z.string())})}),alwaysPermitted:!1},"anthropic.claude.usercontent.sandbox.ProxyFetchStream":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.ProxyFetchStream"),payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.ProxyFetchStreamRequest"),channelId:n.z.string(),chunk:n.z.instanceof(ArrayBuffer).nullable(),done:n.z.boolean(),error:n.z.string().optional()})}),responseSchema:i().emptyResponse,alwaysPermitted:!1},"anthropic.claude.usercontent.sandbox.GetDOMSnapshot":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.GetDOMSnapshot"),payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/google.protobuf.Empty")})}),responseSchema:i().baseResponse.extend({payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.GetDOMSnapshotResponse"),domSnapshot:n.z.string().nullable()})}),alwaysPermitted:!1},"anthropic.claude.usercontent.sandbox.PostHostMessage":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.PostHostMessage"),payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.PostHostMessageRequest"),data:n.z.record(n.z.string(),n.z.unknown())})}),responseSchema:i().emptyResponse,alwaysPermitted:!1},"anthropic.claude.usercontent.sandbox.DOMContentLoaded":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.DOMContentLoaded"),payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/google.protobuf.Empty")})}),responseSchema:i().emptyResponse,alwaysPermitted:!0},"anthropic.claude.usercontent.sandbox.StorageGet":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.StorageGet"),payload:n.z.strictObject({key:n.z.string(),shared:n.z.boolean().optional().default(!1),"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.StorageGetRequest")})}),responseSchema:i().baseResponse.extend({payload:n.z.strictObject({key:n.z.string(),value:n.z.string(),shared:n.z.boolean(),"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.StorageGetResponse")}).nullable()}),alwaysPermitted:!1},"anthropic.claude.usercontent.sandbox.StorageSet":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.StorageSet"),payload:n.z.strictObject({key:n.z.string(),value:n.z.string(),shared:n.z.boolean().optional().default(!1),"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.StorageSetRequest")})}),responseSchema:i().baseResponse.extend({payload:n.z.strictObject({key:n.z.string(),value:n.z.string(),shared:n.z.boolean(),"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.StorageSetResponse")})}),alwaysPermitted:!1},"anthropic.claude.usercontent.sandbox.StorageDelete":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.StorageDelete"),payload:n.z.strictObject({key:n.z.string(),shared:n.z.boolean().optional().default(!1),"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.StorageDeleteRequest")})}),responseSchema:i().baseResponse.extend({payload:n.z.strictObject({key:n.z.string(),deleted:n.z.boolean(),shared:n.z.boolean(),"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.StorageDeleteResponse")})}),alwaysPermitted:!1},"anthropic.claude.usercontent.sandbox.SetPreviewCommentMode":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.SetPreviewCommentMode"),payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.SetPreviewCommentModeRequest"),enabled:n.z.boolean()})}),responseSchema:i().emptyResponse,alwaysPermitted:!1},"anthropic.claude.usercontent.sandbox.ReportPreviewCommentClick":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.ReportPreviewCommentClick"),payload:n.z.strictObject({"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.ReportPreviewCommentClickRequest"),pageNumber:n.z.number().int().min(1),pinX:n.z.number().min(0).max(1),pinY:n.z.number().min(0).max(1),viewportX:n.z.number().min(0).max(1),viewportY:n.z.number().min(0).max(1),imagePng:n.z.instanceof(ArrayBuffer).refine(e=>e.byteLength<=y,"Screenshot too large").refine(x,"Screenshot is not a PNG")})}),responseSchema:i().emptyResponse,alwaysPermitted:!0},"anthropic.claude.usercontent.sandbox.StorageList":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.StorageList"),payload:n.z.strictObject({prefix:n.z.string().optional(),shared:n.z.boolean().optional().default(!1),"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.StorageListRequest")})}),responseSchema:i().baseResponse.extend({payload:n.z.strictObject({keys:n.z.array(n.z.string()),prefix:n.z.string().nullable().optional(),shared:n.z.boolean(),"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.StorageListResponse")})}),alwaysPermitted:!1},"anthropic.claude.usercontent.sandbox.GetConvertPdfToken":{requestSchema:i().baseRequest.extend({method:n.z.literal("anthropic.claude.usercontent.sandbox.GetConvertPdfToken"),payload:n.z.strictObject({forceFresh:n.z.boolean(),"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.GetConvertPdfTokenRequest")})}),responseSchema:i().baseResponse.extend({payload:n.z.strictObject({token:n.z.string().min(1).nullable(),"@type":n.z.literal("type.googleapis.com/anthropic.claude.usercontent.sandbox.GetConvertPdfTokenResponse")})}),alwaysPermitted:!1}})),S=n.z.enum(["anthropic.claude.usercontent.sandbox.ReadyForContent","anthropic.claude.usercontent.sandbox.GetFile","anthropic.claude.usercontent.sandbox.SendConversationMessage","anthropic.claude.usercontent.sandbox.ClaudeCompletion","anthropic.claude.usercontent.sandbox.ReportError","anthropic.claude.usercontent.sandbox.BroadcastContentSize","anthropic.claude.usercontent.sandbox.OpenExternal","anthropic.claude.usercontent.sandbox.DownloadFile","anthropic.claude.usercontent.sandbox.TrackInteraction","anthropic.claude.usercontent.sandbox.ProxyFetch","anthropic.claude.usercontent.sandbox.DOMContentLoaded","anthropic.claude.usercontent.sandbox.ReportRenderTiming","anthropic.claude.usercontent.sandbox.StorageGet","anthropic.claude.usercontent.sandbox.StorageSet","anthropic.claude.usercontent.sandbox.StorageDelete","anthropic.claude.usercontent.sandbox.StorageList","anthropic.claude.usercontent.sandbox.ReportPreviewCommentClick","anthropic.claude.usercontent.sandbox.GetConvertPdfToken"]),R=n.z.lazy(()=>{let e=w();return n.z.discriminatedUnion("method",[e["anthropic.claude.usercontent.sandbox.ReadyForContent"].requestSchema,e["anthropic.claude.usercontent.sandbox.GetFile"].requestSchema,e["anthropic.claude.usercontent.sandbox.SendConversationMessage"].requestSchema,e["anthropic.claude.usercontent.sandbox.ClaudeCompletion"].requestSchema,e["anthropic.claude.usercontent.sandbox.ReportError"].requestSchema,e["anthropic.claude.usercontent.sandbox.BroadcastContentSize"].requestSchema,e["anthropic.claude.usercontent.sandbox.OpenExternal"].requestSchema,e["anthropic.claude.usercontent.sandbox.DownloadFile"].requestSchema,e["anthropic.claude.usercontent.sandbox.TrackInteraction"].requestSchema,e["anthropic.claude.usercontent.sandbox.ProxyFetch"].requestSchema,e["anthropic.claude.usercontent.sandbox.DOMContentLoaded"].requestSchema,e["anthropic.claude.usercontent.sandbox.ReportRenderTiming"].requestSchema,e["anthropic.claude.usercontent.sandbox.StorageGet"].requestSchema,e["anthropic.claude.usercontent.sandbox.StorageSet"].requestSchema,e["anthropic.claude.usercontent.sandbox.StorageDelete"].requestSchema,e["anthropic.claude.usercontent.sandbox.StorageList"].requestSchema,e["anthropic.claude.usercontent.sandbox.ReportPreviewCommentClick"].requestSchema,e["anthropic.claude.usercontent.sandbox.GetConvertPdfToken"].requestSchema])}),z=n.z.lazy(()=>{let e=w();return n.z.union([i().emptyResponse,e["anthropic.claude.usercontent.sandbox.GetFile"].responseSchema,e["anthropic.claude.usercontent.sandbox.SendConversationMessage"].responseSchema,e["anthropic.claude.usercontent.sandbox.ClaudeCompletion"].responseSchema,e["anthropic.claude.usercontent.sandbox.ProxyFetch"].responseSchema,e["anthropic.claude.usercontent.sandbox.StorageGet"].responseSchema,e["anthropic.claude.usercontent.sandbox.StorageSet"].responseSchema,e["anthropic.claude.usercontent.sandbox.StorageDelete"].responseSchema,e["anthropic.claude.usercontent.sandbox.StorageList"].responseSchema,e["anthropic.claude.usercontent.sandbox.GetConvertPdfToken"].responseSchema])}),v=n.z.enum(["anthropic.claude.usercontent.sandbox.SetContent","anthropic.claude.usercontent.sandbox.RunCode","anthropic.claude.usercontent.sandbox.GetScreenshot","anthropic.claude.usercontent.sandbox.CopyHtmlContent","anthropic.claude.usercontent.sandbox.ProxyFetchStream","anthropic.claude.usercontent.sandbox.GetDOMSnapshot","anthropic.claude.usercontent.sandbox.PostHostMessage","anthropic.claude.usercontent.sandbox.SetPreviewCommentMode"]),C=n.z.lazy(()=>{let e=w();return n.z.discriminatedUnion("method",[e["anthropic.claude.usercontent.sandbox.SetContent"].requestSchema,e["anthropic.claude.usercontent.sandbox.RunCode"].requestSchema,e["anthropic.claude.usercontent.sandbox.GetScreenshot"].requestSchema,e["anthropic.claude.usercontent.sandbox.CopyHtmlContent"].requestSchema,e["anthropic.claude.usercontent.sandbox.ProxyFetchStream"].requestSchema,e["anthropic.claude.usercontent.sandbox.GetDOMSnapshot"].requestSchema,e["anthropic.claude.usercontent.sandbox.PostHostMessage"].requestSchema,e["anthropic.claude.usercontent.sandbox.SetPreviewCommentMode"].requestSchema])}),M=n.z.lazy(()=>{let e=w();return n.z.union([e["anthropic.claude.usercontent.sandbox.SetContent"].responseSchema,e["anthropic.claude.usercontent.sandbox.RunCode"].responseSchema,e["anthropic.claude.usercontent.sandbox.GetScreenshot"].responseSchema,e["anthropic.claude.usercontent.sandbox.CopyHtmlContent"].responseSchema,e["anthropic.claude.usercontent.sandbox.ProxyFetchStream"].responseSchema,e["anthropic.claude.usercontent.sandbox.GetDOMSnapshot"].responseSchema,e["anthropic.claude.usercontent.sandbox.PostHostMessage"].responseSchema,e["anthropic.claude.usercontent.sandbox.SetPreviewCommentMode"].responseSchema])}),E=(0,s.lazyValue)(()=>Object.entries(w()).filter(([e,t])=>!0===t.alwaysPermitted).map(([e,t])=>e));e.s(["KnownMethods",()=>h,"PREVIEW_COMMENT_PNG_MAX_BYTES",0,y,"alwaysPermittedActions",0,E,"codeExecutionResultSchema",0,b,"insideRequestMethodSchema",0,S,"insideRequestResponseSchema",0,z,"insideRequestSchema",0,R,"outsideRequestMethodSchema",0,v,"outsideRequestResponseSchema",0,M,"outsideRequestSchema",0,C],698829)},826778,e=>{"use strict";let t="__antRealmRelay";function a(e){if(!e||e===globalThis.window)return;let a=Object.getOwnPropertyDescriptor(e,t),s=a?.value;if(a&&!a.configurable&&!a.writable&&"object"==typeof s&&null!==s&&"function"==typeof s.postMessage)return s}function s(e,t,s,n,o){let r=a(e);r?r.postMessage(t,s,n,o):o&&o.length>0?t.postMessage(s,n,o):t.postMessage(s,n)}var n=e.i(131614),o=e.i(698829),r=e.i(39177);let i=new WeakMap,l=1e3,c=256,d="__sandbox_handshake__",u="__sandbox_handshake_request__";class p{iframe;hostWindow;allowedOrigin;messageCount=0;lastResetTime=Date.now();MAX_MESSAGES_PER_INTERVAL=30;RESET_INTERVAL=5e3;onRateLimited=null;onPermissionRequested;onCapabilityAction;messageChannel=null;handshakeCompleted=!1;constructor({iframe:e,allowedOrigin:t,onRateLimited:a=null,onPermissionRequested:s,onCapabilityAction:n}){this.iframe=e,this.hostWindow=e.ownerDocument.defaultView??window,this.allowedOrigin=t,this.onRateLimited=a,this.onPermissionRequested=s,this.onCapabilityAction=n,this.boundHandleMessage=this.handleMessage.bind(this),this.boundSendRequest=this.sendRequest.bind(this),this.setupMessageListener(),this.setupMessageChannel(),this.iframe.contentWindow&&this.allowedOrigin&&this.sendHandshakeWithPort()}setupMessageChannel(){this.messageChannel=new MessageChannel,this.messageChannel.port1.onmessage=e=>{this.handlePortMessage(e)}}handlePortMessage(e){let t=Date.now();if(t-this.lastResetTime>this.RESET_INTERVAL&&(this.messageCount=0,this.lastResetTime=t),!this.isPendingResponse(e.data)&&this.messageCount++,this.messageCount>this.MAX_MESSAGES_PER_INTERVAL){let t=e.data;t?.channel==="request"&&"string"==typeof t.requestId&&this.messageChannel?.port1.postMessage({channel:"response",status:429,requestId:t.requestId,payload:(0,r.getErrorResponsePayload)("Message rate limit exceeded. Reload to continue.")}),this.messageChannel?.port1.close(),this.hostWindow.removeEventListener("message",this.boundHandleMessage),this.onRateLimited&&this.onRateLimited();return}let a=r.baseMessageSchema.safeParse(e.data);if(!a.success)return void n.logger.warn(n.LoggerTopic.ARTIFACTS,"Received port message does not conform to basic message shape, ignoring");let s=a.data;"response"===s.channel?this.handleResponse(s):(this.messageQueue.push(s),this.isConsumerRunning||this.consumeMessages())}sendHandshakeWithPort(){this.messageChannel&&(this.handshakeCompleted&&(this.messageChannel.port1.close(),this.setupMessageChannel()),this.postToSandbox({type:d},[this.messageChannel.port2]),this.handshakeCompleted=!0)}boundHandleMessage;boundSendRequest;setupMessageListener(){this.hostWindow.addEventListener("message",this.boundHandleMessage,!1)}postToSandbox(e,t){let a=this.iframe.contentWindow;a&&s(this.hostWindow,a,e,this.allowedOrigin,t)}handleMessage(e){if(e.origin!==this.allowedOrigin||e.source!==this.iframe.contentWindow)return;let t=Date.now();if(t-this.lastResetTime>this.RESET_INTERVAL&&(this.messageCount=0,this.lastResetTime=t),!this.isPendingResponse(e.data)&&this.messageCount++,this.messageCount>this.MAX_MESSAGES_PER_INTERVAL){let t=e.data;t?.channel==="request"&&"string"==typeof t.requestId&&this.sendErrorResponse(t.requestId,429,"Message rate limit exceeded. Reload to continue."),this.messageChannel?.port1.close(),this.hostWindow.removeEventListener("message",this.boundHandleMessage),this.onRateLimited&&this.onRateLimited();return}if(e.data&&"object"==typeof e.data&&e.data.type===u)return void this.sendHandshakeWithPort();let a=r.baseMessageSchema.safeParse(e.data);if(!a.success)return void n.logger.warn(n.LoggerTopic.ARTIFACTS,"Received message does not conform to basic message shape, ignoring");let s=a.data;"response"===s.channel?this.handleResponse(s):(this.messageQueue.push(s),this.isConsumerRunning||this.consumeMessages())}handleResponse(e){let t=i.get(this.iframe),a=t?.get(e.requestId);void 0!==t&&void 0!==a&&(t.delete(e.requestId),a(e))}isPendingResponse(e){let t=r.baseMessageSchema.safeParse(e);if(!t.success||"response"!==t.data.channel)return!1;let a=t.data.requestId;return t.data.type!==u&&(i.get(this.iframe)?.has(a)??!1)}messageQueue=[];isConsumerRunning=!1;processedRequestIds=new Set;async consumeMessages(){for(this.isConsumerRunning=!0;this.messageQueue.length>0;){let e=this.messageQueue.shift();if(!e)continue;let t=o.insideRequestMethodSchema.safeParse(e.method);if(!t.success){this.sendErrorResponse(e.requestId,400,"Unknown method");continue}let a=t.data,s=o.insideRequestSchema.safeParse(e);if(!s.success){this.sendErrorResponse(e.requestId,400,"Invalid payload content");continue}let i=s.data;if(this.processedRequestIds.has(i.requestId)){this.sendErrorResponse(i.requestId,400,"Request ID already processed");continue}this.rememberProcessedRequestId(i.requestId),await this.onPermissionRequested(a).then(e=>"denied"!==e||(this.sendErrorResponse(i.requestId,403,"Permission denied"),!1)).catch(e=>(n.logger.error(n.LoggerTopic.ARTIFACTS,`Error checking permission for method ${a}:`,e),this.sendErrorResponse(i.requestId,500,"Error checking permission"),!1))&&(this.onCapabilityAction(i,this.boundSendRequest).then(e=>{let t=r.baseResponseSchema.parse({channel:"response",status:200,requestId:i.requestId,payload:e??r.emptyPayload});this.postToSandbox(t)}).catch(e=>{n.logger.error(n.LoggerTopic.ARTIFACTS,`Error processing action for method ${a}:`,e),this.sendErrorResponse(i.requestId,500,"Internal server error while processing action")}),await new Promise(e=>setTimeout(e,0)))}this.isConsumerRunning=!1}sendErrorResponse(e,t,a){let s=r.errorResponseSchema.parse({channel:"response",status:t,requestId:e,payload:(0,r.getErrorResponsePayload)(a)});this.postToSandbox(s)}rememberProcessedRequestId(e){if(!(e.length>c)&&(this.processedRequestIds.add(e),this.processedRequestIds.size>l)){let e=this.processedRequestIds.values().next().value;void 0!==e&&this.processedRequestIds.delete(e)}}cleanup(){this.hostWindow.removeEventListener("message",this.boundHandleMessage),this.messageChannel?.port1.close(),this.messageChannel=null,this.handshakeCompleted=!1,this.messageQueue=[],this.isConsumerRunning=!1}get inFlightRequests(){let e=i.get(this.iframe);return void 0===e&&(e=new Map,i.set(this.iframe,e)),e}async sendRequest(e,t,a){return new Promise((s,n)=>{if(!this.iframe.isConnected)return;let i=Date.now().toString()+Math.random().toString(),l={channel:"request",method:e,requestId:i,payload:t},c=e=>{let t=r.baseResponseSchema.safeParse(e);if(!t.success)return void n(Error("Invalid response format"));let a=t.data;if(a.status>=400){let e=r.errorResponseSchema.safeParse(a);e.success?n(Error(e.data.payload.error)):n(Error(`Error response (${a.status})`));return}let i=o.outsideRequestResponseSchema.safeParse(a);i.success?s(i.data.payload):n(Error("Invalid response payload for the method"))};this.inFlightRequests.set(i,c),this.postToSandbox(l,a)})}}class h{parentWindow;allowedOrigins;onOutsideRequest;messagePort=null;handshakeCompleted=!1;rateLimited=!1;constructor({parentWindow:e,allowedOrigins:t,onOutsideRequest:a}){this.parentWindow=e,this.allowedOrigins=t,this.onOutsideRequest=a,this.boundHandleMessage=this.handleMessage.bind(this),this.setupMessageListener(),this.requestHandshake()}boundHandleMessage;setupMessageListener(){window.addEventListener("message",this.boundHandleMessage,!1)}broadcast(e){for(let t of this.allowedOrigins)try{this.parentWindow.postMessage(e,t)}catch{}}requestHandshake(){this.broadcast({type:u})}handleMessage(e){if(!1!==this.allowedOrigins.includes(e.origin)&&e.source===this.parentWindow){if(e.data&&"object"==typeof e.data&&e.data.type===d&&e.ports&&e.ports.length>0)return void this.setupMessagePort(e.ports[0]);this.processMessage(e.data)}}setupMessagePort(e){this.messagePort=e,this.handshakeCompleted=!0,this.messagePort.onmessage=e=>{this.processMessage(e.data)}}processMessage(e){let t=r.baseMessageSchema.safeParse(e);if(!t.success)return void n.logger.warn(n.LoggerTopic.ARTIFACTS,"Received message does not conform to basic request shape, ignoring");let a=t.data;if("response"===a.channel)return void this.handleResponse(a);if(!o.outsideRequestMethodSchema.safeParse(a.method).success)return void this.sendErrorResponse(a.requestId,400,"Unknown method");let s=o.outsideRequestSchema.safeParse(a);if(!s.success)return void this.sendErrorResponse(a.requestId,400,"Invalid payload content");let i=s.data;this.onOutsideRequest(i).then(e=>{let t=r.baseResponseSchema.parse({channel:"response",status:200,requestId:i.requestId,payload:e??r.emptyPayload});this.sendMessage(t)}).catch(e=>{n.logger.error(n.LoggerTopic.ARTIFACTS,`Error processing action for method ${i.method}:`,e),this.sendErrorResponse(i.requestId,500,"Internal error while processing action")})}sendErrorResponse(e,t,a){let s=r.errorResponseSchema.parse({channel:"response",status:t,requestId:e,payload:(0,r.getErrorResponsePayload)(a)});this.sendMessage(s)}sendMessage(e){this.messagePort&&this.handshakeCompleted?this.messagePort.postMessage(e):this.broadcast(e)}cleanup(){window.removeEventListener("message",this.boundHandleMessage),this.messagePort?.close(),this.messagePort=null,this.handshakeCompleted=!1,this.inFlightRequests.clear()}handleResponse(e){let t=this.inFlightRequests.get(e.requestId);void 0!==t&&(this.inFlightRequests.delete(e.requestId),t(e))}inFlightRequests=new Map;async sendRequest(e,t){return this.rateLimited?Promise.reject(Error("Message rate limit exceeded. Reload to continue.")):new Promise((a,s)=>{let n=Date.now().toString()+Math.random().toString(),i={channel:"request",method:e,requestId:n,payload:t},l=e=>{let t=r.baseResponseSchema.safeParse(e);if(!t.success)return void s(Error("Invalid response format"));let n=t.data;if(429===n.status&&(this.rateLimited=!0),n.status>=400){let e=r.errorResponseSchema.safeParse(n);e.success?s(Error(e.data.payload.error)):s(Error(`Error response (${n.status})`));return}let i=o.insideRequestResponseSchema.safeParse(n);i.success?a(i.data.payload):s(Error("Invalid response payload for the method"))};this.inFlightRequests.set(n,l),this.sendMessage(i)})}}e.s(["SandboxArtifactsCommunicator",0,h,"SandboxCommunicator",0,p],826778)}]);
if(!self.define){let e,i={};const a=(a,n)=>(a=new URL(a+".js",n).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let r={};const c=e=>a(e,o),d={module:{uri:o},exports:r,require:c};i[o]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(s(...e),r)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"761076616970d5b0c1790f40e604e522"},{url:"/_next/static/chunks/213-df642b2fdeb71573.js",revision:"dOzU-LkUhj2bF7i4Dbkkx"},{url:"/_next/static/chunks/388.ba62af852f96d302.js",revision:"ba62af852f96d302"},{url:"/_next/static/chunks/413-b1662136779cd4d1.js",revision:"dOzU-LkUhj2bF7i4Dbkkx"},{url:"/_next/static/chunks/426.8736aae2bc455ab4.js",revision:"8736aae2bc455ab4"},{url:"/_next/static/chunks/457b8330-fff76bf986364e53.js",revision:"dOzU-LkUhj2bF7i4Dbkkx"},{url:"/_next/static/chunks/472-7ddc06000428b38d.js",revision:"dOzU-LkUhj2bF7i4Dbkkx"},{url:"/_next/static/chunks/567-0374c3526a070f62.js",revision:"dOzU-LkUhj2bF7i4Dbkkx"},{url:"/_next/static/chunks/app/_not-found-b38cc31b8d8dd850.js",revision:"dOzU-LkUhj2bF7i4Dbkkx"},{url:"/_next/static/chunks/app/layout-2b1f026ebb821c2a.js",revision:"dOzU-LkUhj2bF7i4Dbkkx"},{url:"/_next/static/chunks/app/page-0285d2fbd20a75db.js",revision:"dOzU-LkUhj2bF7i4Dbkkx"},{url:"/_next/static/chunks/app/rest/%5BrestId%5D/layout-1ea44e435202374f.js",revision:"dOzU-LkUhj2bF7i4Dbkkx"},{url:"/_next/static/chunks/app/rest/%5BrestId%5D/page-9f8cd223a5330e66.js",revision:"dOzU-LkUhj2bF7i4Dbkkx"},{url:"/_next/static/chunks/app/rest/%5BrestId%5D/search/page-2991110bdb133f2f.js",revision:"dOzU-LkUhj2bF7i4Dbkkx"},{url:"/_next/static/chunks/fd9d1056-605400be3f59ece1.js",revision:"dOzU-LkUhj2bF7i4Dbkkx"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"dOzU-LkUhj2bF7i4Dbkkx"},{url:"/_next/static/chunks/main-app-6fabecf05e562340.js",revision:"dOzU-LkUhj2bF7i4Dbkkx"},{url:"/_next/static/chunks/main-b83c9ccd57fdcd31.js",revision:"dOzU-LkUhj2bF7i4Dbkkx"},{url:"/_next/static/chunks/pages/_app-1534f180665c857f.js",revision:"dOzU-LkUhj2bF7i4Dbkkx"},{url:"/_next/static/chunks/pages/_error-b646007f40c4f0a8.js",revision:"dOzU-LkUhj2bF7i4Dbkkx"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-b42da9d71f1ba077.js",revision:"dOzU-LkUhj2bF7i4Dbkkx"},{url:"/_next/static/css/112f688cf5bbbf3a.css",revision:"112f688cf5bbbf3a"},{url:"/_next/static/dOzU-LkUhj2bF7i4Dbkkx/_buildManifest.js",revision:"50654c4134ba6f71b423498e9447ee91"},{url:"/_next/static/dOzU-LkUhj2bF7i4Dbkkx/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/android/android-launchericon-144-144.png",revision:"691408d759184e8bba2236c3f0b2c18e"},{url:"/android/android-launchericon-192-192.png",revision:"095b1012a16e47198fc85dee47005638"},{url:"/android/android-launchericon-48-48.png",revision:"0d68cb92ba7eeb2e8c7501da59c697f4"},{url:"/android/android-launchericon-512-512.png",revision:"d7ccb311f3126596a6ce198dc5c96f4f"},{url:"/android/android-launchericon-72-72.png",revision:"dd0ece471ae923ae8103ce78db560cfa"},{url:"/android/android-launchericon-96-96.png",revision:"2022817568afe73980e83cbd7fceafd3"},{url:"/fonts/Nexa-Bold.otf",revision:"56018b3b835fdd96e151eac5f59cc6d5"},{url:"/fonts/Nexa-Light.otf",revision:"1be8e55329aaffbe7eabe32f7e7a3d6b"},{url:"/fonts/Nexa-Regular.otf",revision:"007b563f5cdff20485f665a5d933ba96"},{url:"/images/jpg/comingsoon.jpg",revision:"48e4f1c5b264e2507de42e75ed07c384"},{url:"/ios/100.png",revision:"8a60b511a582380003a2c9c5c4343d73"},{url:"/ios/1024.png",revision:"3ff0c4904ad10349367d72524a5b417d"},{url:"/ios/114.png",revision:"8c727c5579f480c5def302c4c94f259e"},{url:"/ios/120.png",revision:"23794afd052230d1056181068bcc2075"},{url:"/ios/128.png",revision:"0aa144ec41ae5519a8c18c8374d64dc9"},{url:"/ios/144.png",revision:"691408d759184e8bba2236c3f0b2c18e"},{url:"/ios/152.png",revision:"30bd8994342803e0337500110225f8ba"},{url:"/ios/16.png",revision:"1b5e43c4650da34db272f442f07b21bc"},{url:"/ios/167.png",revision:"b511ae23705639b4ec267bc1aa740190"},{url:"/ios/180.png",revision:"c5051840740358d347a40e8e6d471525"},{url:"/ios/192.png",revision:"095b1012a16e47198fc85dee47005638"},{url:"/ios/20.png",revision:"b2033ae3e364249f22384be90e0be1ca"},{url:"/ios/256.png",revision:"a670925eca4b6047f1bb10404a97e1d5"},{url:"/ios/29.png",revision:"a3cd9204d1fb09e27add272c2f27c64e"},{url:"/ios/32.png",revision:"74a90781cc2f8b928f582eecba4fb54d"},{url:"/ios/40.png",revision:"4ccdcb8bb35678d2c305b0c9771644c3"},{url:"/ios/50.png",revision:"5ceb93657c4c6b37ef7fb18c9fd557e2"},{url:"/ios/512.png",revision:"d7ccb311f3126596a6ce198dc5c96f4f"},{url:"/ios/57.png",revision:"37d2bfe79ae2a5ecad393f8417e14a19"},{url:"/ios/58.png",revision:"7a419b3d208ff9428e8a166a112df5c6"},{url:"/ios/60.png",revision:"8865394cb848b6e3b86e64edb10237b5"},{url:"/ios/64.png",revision:"7cc3d9beb20c1efdda06fb6c5460167e"},{url:"/ios/72.png",revision:"dd0ece471ae923ae8103ce78db560cfa"},{url:"/ios/76.png",revision:"77a0e11ecacdb568e30eee967344516f"},{url:"/ios/80.png",revision:"064cd3e5a4dcc31bcfb10cfdd67c29a4"},{url:"/ios/87.png",revision:"a0a05477a7f566a89bb6b9cce9b418c1"},{url:"/manifest.json",revision:"787fb80027ea975c5435ae2a95c450f6"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"},{url:"/windows11/LargeTile.scale-100.png",revision:"bd8ed6c74504056441bee15b664aed6c"},{url:"/windows11/LargeTile.scale-125.png",revision:"b803552095fb7bc0aa5f03efc06a69d5"},{url:"/windows11/LargeTile.scale-150.png",revision:"28a5ae452e9dcbb97767ea9d833be72d"},{url:"/windows11/LargeTile.scale-200.png",revision:"0dce9c415b70fe92ac8d56308faadcc8"},{url:"/windows11/LargeTile.scale-400.png",revision:"0ad2ae257f1b534755e10daaf9c8dfd1"},{url:"/windows11/SmallTile.scale-100.png",revision:"d4971c53feb79210203c6df0eb363074"},{url:"/windows11/SmallTile.scale-125.png",revision:"11d88f84120f64f06b583ac50557d4bc"},{url:"/windows11/SmallTile.scale-150.png",revision:"fce39f980d9034f649d7d12b065c7598"},{url:"/windows11/SmallTile.scale-200.png",revision:"da69b6f6fdbd7c3d2efe0e6a771f7bd4"},{url:"/windows11/SmallTile.scale-400.png",revision:"8337c136ceca085af0796fd7ff2b2f8a"},{url:"/windows11/SplashScreen.scale-100.png",revision:"331ed99c1f144ed88b4dc8db0d704e79"},{url:"/windows11/SplashScreen.scale-125.png",revision:"8e090680a9a46148546fcbd63a010720"},{url:"/windows11/SplashScreen.scale-150.png",revision:"cd42b994b4a6c69e2bcb7bd4e6127b56"},{url:"/windows11/SplashScreen.scale-200.png",revision:"f2a3aca4dddb6174c118ba9eaf6041f8"},{url:"/windows11/SplashScreen.scale-400.png",revision:"e4d0331f19c181c59e4631519efcbbd2"},{url:"/windows11/Square150x150Logo.scale-100.png",revision:"645b050bdc557b83e6ad5670fbb3b6e8"},{url:"/windows11/Square150x150Logo.scale-125.png",revision:"497322a87eaf7b28e541af5ce5bfbfc2"},{url:"/windows11/Square150x150Logo.scale-150.png",revision:"75e5fa4786c4d464cdb06f4ecb279c78"},{url:"/windows11/Square150x150Logo.scale-200.png",revision:"73f2b053b6595d28ef09bb2ca4ad0616"},{url:"/windows11/Square150x150Logo.scale-400.png",revision:"b3d6fd47360dd379dd6566f7cf17e3aa"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",revision:"1b5e43c4650da34db272f442f07b21bc"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",revision:"b2033ae3e364249f22384be90e0be1ca"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",revision:"b68f12e7aeb5736a8606105fae7aa4e7"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",revision:"a670925eca4b6047f1bb10404a97e1d5"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",revision:"a3b6ef21c8d5381b9bcbd9e5b2de3310"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",revision:"74a90781cc2f8b928f582eecba4fb54d"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",revision:"02149f8f0f3504f4a27771904f6d664e"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",revision:"4ccdcb8bb35678d2c305b0c9771644c3"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",revision:"0abe07f2b50adcd8d4598b19f6156c92"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",revision:"0d68cb92ba7eeb2e8c7501da59c697f4"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",revision:"8865394cb848b6e3b86e64edb10237b5"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",revision:"7cc3d9beb20c1efdda06fb6c5460167e"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",revision:"dd0ece471ae923ae8103ce78db560cfa"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",revision:"064cd3e5a4dcc31bcfb10cfdd67c29a4"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",revision:"2022817568afe73980e83cbd7fceafd3"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",revision:"1b5e43c4650da34db272f442f07b21bc"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",revision:"b2033ae3e364249f22384be90e0be1ca"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",revision:"b68f12e7aeb5736a8606105fae7aa4e7"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",revision:"a670925eca4b6047f1bb10404a97e1d5"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",revision:"a3b6ef21c8d5381b9bcbd9e5b2de3310"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",revision:"74a90781cc2f8b928f582eecba4fb54d"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",revision:"02149f8f0f3504f4a27771904f6d664e"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",revision:"4ccdcb8bb35678d2c305b0c9771644c3"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",revision:"0abe07f2b50adcd8d4598b19f6156c92"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",revision:"0d68cb92ba7eeb2e8c7501da59c697f4"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",revision:"8865394cb848b6e3b86e64edb10237b5"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",revision:"7cc3d9beb20c1efdda06fb6c5460167e"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",revision:"dd0ece471ae923ae8103ce78db560cfa"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",revision:"064cd3e5a4dcc31bcfb10cfdd67c29a4"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",revision:"2022817568afe73980e83cbd7fceafd3"},{url:"/windows11/Square44x44Logo.scale-100.png",revision:"0abe07f2b50adcd8d4598b19f6156c92"},{url:"/windows11/Square44x44Logo.scale-125.png",revision:"532859853d3030ede98661ab8cd1b546"},{url:"/windows11/Square44x44Logo.scale-150.png",revision:"82c287593041c8ed3aed478995f96902"},{url:"/windows11/Square44x44Logo.scale-200.png",revision:"d002af5e8fbf90d4a5f433c3d36e74d8"},{url:"/windows11/Square44x44Logo.scale-400.png",revision:"0286d28dacc079db4a00b0f981a259f0"},{url:"/windows11/Square44x44Logo.targetsize-16.png",revision:"1b5e43c4650da34db272f442f07b21bc"},{url:"/windows11/Square44x44Logo.targetsize-20.png",revision:"b2033ae3e364249f22384be90e0be1ca"},{url:"/windows11/Square44x44Logo.targetsize-24.png",revision:"b68f12e7aeb5736a8606105fae7aa4e7"},{url:"/windows11/Square44x44Logo.targetsize-256.png",revision:"a670925eca4b6047f1bb10404a97e1d5"},{url:"/windows11/Square44x44Logo.targetsize-30.png",revision:"a3b6ef21c8d5381b9bcbd9e5b2de3310"},{url:"/windows11/Square44x44Logo.targetsize-32.png",revision:"74a90781cc2f8b928f582eecba4fb54d"},{url:"/windows11/Square44x44Logo.targetsize-36.png",revision:"02149f8f0f3504f4a27771904f6d664e"},{url:"/windows11/Square44x44Logo.targetsize-40.png",revision:"4ccdcb8bb35678d2c305b0c9771644c3"},{url:"/windows11/Square44x44Logo.targetsize-44.png",revision:"0abe07f2b50adcd8d4598b19f6156c92"},{url:"/windows11/Square44x44Logo.targetsize-48.png",revision:"0d68cb92ba7eeb2e8c7501da59c697f4"},{url:"/windows11/Square44x44Logo.targetsize-60.png",revision:"8865394cb848b6e3b86e64edb10237b5"},{url:"/windows11/Square44x44Logo.targetsize-64.png",revision:"7cc3d9beb20c1efdda06fb6c5460167e"},{url:"/windows11/Square44x44Logo.targetsize-72.png",revision:"dd0ece471ae923ae8103ce78db560cfa"},{url:"/windows11/Square44x44Logo.targetsize-80.png",revision:"064cd3e5a4dcc31bcfb10cfdd67c29a4"},{url:"/windows11/Square44x44Logo.targetsize-96.png",revision:"2022817568afe73980e83cbd7fceafd3"},{url:"/windows11/StoreLogo.scale-100.png",revision:"ad71b7bfa56945e1aefeeed8fbbe6c7d"},{url:"/windows11/StoreLogo.scale-125.png",revision:"8e64085d9d5cb80c5c3262b7992024f9"},{url:"/windows11/StoreLogo.scale-150.png",revision:"303f13938eca6f6288da426c40bd09cd"},{url:"/windows11/StoreLogo.scale-200.png",revision:"24b2e74523f5204acd090bb9751a7e8b"},{url:"/windows11/StoreLogo.scale-400.png",revision:"a35fb459804b70751109c43c64364a42"},{url:"/windows11/Wide310x150Logo.scale-100.png",revision:"88dc86a777f2dd2df54477c548f1e76d"},{url:"/windows11/Wide310x150Logo.scale-125.png",revision:"1c789830fa448355d75ffc93df59beac"},{url:"/windows11/Wide310x150Logo.scale-150.png",revision:"b205cd56159e32c8e159656bdfaa4d5f"},{url:"/windows11/Wide310x150Logo.scale-200.png",revision:"331ed99c1f144ed88b4dc8db0d704e79"},{url:"/windows11/Wide310x150Logo.scale-400.png",revision:"f2a3aca4dddb6174c118ba9eaf6041f8"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:a,state:n})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));

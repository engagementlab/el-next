(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[29],{9169:function(e,t,n){"use strict";n.d(t,{e:function(){return u}});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}const c={inline:{bold:"strong",code:"code",keyboard:"kbd",strikethrough:"s",italic:"em",link:"a",subscript:"sub",superscript:"sup",underline:"u",relationship:e=>{let{data:t}=e;return r.createElement("span",null,(null===t||void 0===t?void 0:t.label)||(null===t||void 0===t?void 0:t.id))}},block:{block:"div",blockquote:"blockquote",paragraph:e=>{let{children:t,textAlign:n}=e;return r.createElement("p",{style:{textAlign:n}},t)},divider:"hr",heading:e=>{let{level:t,children:n,textAlign:l}=e,i=`h${t}`;return r.createElement(i,{style:{textAlign:l},children:n})},code:"pre",list:e=>{let{children:t,type:n}=e;const l="ordered"===n?"ol":"ul";return r.createElement(l,null,t.map(((e,t)=>r.createElement("li",{key:t},e))))},layout:e=>{let{children:t,layout:n}=e;return r.createElement("div",{style:{display:"grid",gridTemplateColumns:n.map((e=>`${e}fr`)).join(" ")}},t.map(((e,t)=>r.createElement("div",{key:t},e))))}}};function o(e){let{node:t,componentBlocks:n,renderers:l}=e;if("string"===typeof t.text){let e=r.createElement(r.Fragment,null,t.text);return Object.keys(l.inline).forEach((n=>{if("link"!==n&&"relationship"!==n&&t[n]){const t=l.inline[n];e=r.createElement(t,null,e)}})),e}const i=t,a=i.children.map(((e,t)=>r.createElement(o,{node:e,componentBlocks:n,renderers:l,key:t})));switch(i.type){case"blockquote":return r.createElement(l.block.blockquote,{children:a});case"paragraph":return r.createElement(l.block.paragraph,{textAlign:i.textAlign,children:a});case"code":if(1===i.children.length&&i.children[0]&&"string"===typeof i.children[0].text)return r.createElement(l.block.code,null,i.children[0].text);break;case"layout":return r.createElement(l.block.layout,{layout:i.layout,children:a});case"divider":return r.createElement(l.block.divider,null);case"heading":return r.createElement(l.block.heading,{textAlign:i.textAlign,level:i.level,children:a});case"component-block":{const e=n[i.component];if(e){const t=function(e,t){const n=JSON.parse(JSON.stringify(e.props));return e.children.forEach(((e,r)=>{if(e.propPath){const l=[...e.propPath];d(n,l,t[r])}})),n}(i,a);return r.createElement(l.block.block,null,r.createElement(e,t))}break}case"ordered-list":case"unordered-list":return r.createElement(l.block.list,{children:a,type:"ordered-list"===i.type?"ordered":"unordered"});case"relationship":{const e=i.data;return r.createElement(l.inline.relationship,{relationship:i.relationship,data:e?{id:e.id,label:e.label,data:e.data}:null})}case"link":return r.createElement(l.inline.link,{href:i.href},a)}return r.createElement(r.Fragment,null,a)}function d(e,t,n){if(1===t.length)e[t[0]]=n;else{d(e[t.shift()],t,n)}}function u(e){var t,n;const l={inline:a(a({},c.inline),null===(t=e.renderers)||void 0===t?void 0:t.inline),block:a(a({},c.block),null===(n=e.renderers)||void 0===n?void 0:n.block)},i=e.componentBlocks||{};return r.createElement(r.Fragment,null,e.document.map(((e,t)=>r.createElement(o,{node:e,componentBlocks:i,renderers:l,key:t}))))}},3036:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/about/initiative",function(){return n(4875)}])},2439:function(e,t,n){"use strict";var r=n(5893),l=n(1664),i=n(3638),a=n(2400);t.Z=function(e){return{image:function(t){return e?e(t):(0,r.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[(0,r.jsx)(i.Z,{id:"img-"+t.image.data.image.publicId,alt:t.image.data.altText,imgId:t.image.data.image.publicId}),(0,r.jsx)("p",{children:t.image.data.caption})]})},video:function(e){return(0,r.jsx)(a.Z,{videoLabel:e.video.label,videoUrl:e.video.value,thumbUrl:e.video.thumb})},button:function(e){return(0,r.jsx)(l.default,{href:e.link.props.node.children[0].text,passHref:!0,children:(0,r.jsx)("button",{className:"block lg:inline-block rounded-full px-9 py-7 mt-4 uppercase whitespace-nowrap bg-lynx text-bluegreen border-2 border-bluegreen transition-all hover:bg-green-blue hover:text-lynx hover:border-green-blue",children:e.label})})}}}},5224:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(5893),l=function(e,t){var n="flex gap-x-5 flex-col-reverse md:flex-row";return 2===e[0]&&1===e[1]?(0,r.jsx)("div",{className:n,children:t.map((function(e,t){return(0,r.jsx)("div",{className:"".concat(0===t?"w-full lg:w-3/4":""),children:e},t)}))}):1===e[0]&&1===e[1]?(0,r.jsx)("div",{className:n,children:t.map((function(e,t){return(0,r.jsx)("div",{className:"".concat(0===t?"w-full lg:w-1/2":""),children:e},t)}))}):1===e[0]&&1===e[1]&&1===e[2]?(0,r.jsx)("div",{className:n,children:t.map((function(e,t){return(0,r.jsx)("div",{className:"w-full lg:w-1/3",children:e},t)}))}):(0,r.jsx)("div",{children:t})},i=n(783),a=function(e){return{inline:{bold:function(t){var n=t.children;return(null===e||void 0===e?void 0:e.bold)?e.bold(n):(0,r.jsx)("strong",{children:n})},link:function(t){var n=t.children,l=t.href,i=n.at(0).props.node.text;return(null===e||void 0===e?void 0:e.link)?e.link(n,l):(0,r.jsx)("a",{href:l,className:"text-purple no-underline border-b-2 border-b-[rgba(141,51,210,0)] hover:border-b-[rgba(141,51,210,1)] transition-all",children:i})}},block:{heading:function(t){var n=t.level,r=t.children,l=t.textAlign;return(null===e||void 0===e?void 0:e.heading)?e.heading(n,r,l):(0,i.Z)(n,r,l)},layout:function(t){var n=t.layout,r=t.children;return(null===e||void 0===e?void 0:e.layout)?e.layout(n,r):l(n,r)}}}}},783:function(e,t,n){"use strict";var r=n(5893);t.Z=function(e,t,n,l){var i="".concat(3===e&&"h3 text-2xl text-coated leading-none"," ").concat(4===e&&"text-md text-coated mt-8 lg:mt-12 mb-2"," font-semibold"),a=l&&l[e];return(0,r.jsx)("p",{className:a||i,style:{textAlign:n},children:t})}},5121:function(e,t,n){"use strict";var r=n(5893),l=(n(7294),n(7592)),i={hidden:{opacity:0},enter:{opacity:1},exit:{opacity:0}};t.Z=function(e){var t=e.children;return(0,r.jsx)("div",{children:(0,r.jsx)(l.E.main,{initial:"hidden",animate:"enter",exit:"exit",variants:i,transition:{type:"linear"},children:t})})}},2400:function(e,t,n){"use strict";var r=n(5893),l=n(5675),i=n(7294),a=n(4671);t.Z=function(e){var t=e.thumbUrl,n=e.videoUrl,c=e.videoLabel,o=(0,i.useState)((function(){return(0,a.Z)((function(e){return{videoOpen:!1,toggleOpen:function(t){return e({videoOpen:t})}}}))}))[0],d=o((function(e){return e.toggleOpen})),u=o((function(e){return e.videoOpen}));return(0,r.jsxs)("div",{className:"relative video w-full h-full lg:mb-8",children:[u?"":(0,r.jsxs)("a",{href:"#",onClick:function(e){d(!0),e.preventDefault()},children:[(0,r.jsx)(l.default,{alt:'Thumbnail image for video with title "'.concat(c,'"'),src:t,width:1920,height:1080,layout:"responsive",unoptimized:!0}),(0,r.jsx)("span",{className:"absolute top-[calc(50%-75px)] left-[calc(50%-75px)]",children:(0,r.jsxs)("svg",{viewBox:"0 0 151 151",width:"151",height:"151",children:[(0,r.jsx)("circle",{style:{strokeWidth:"0.8px",stroke:"#B571E9",fill:"rgba(141, 51, 210, .6)"},cx:"49.467",cy:"49.467",r:"49.467",transform:"matrix(1.521806, 0, 0, 1.510012, 0, 0)"}),(0,r.jsx)("path",{style:{strokeWidth:"0.8px",stroke:"#B571E9",fill:"rgba(237, 234, 229, .8)"},d:"M 214.012 155.256 L 252.117 221.256 L 175.907 221.256 L 214.012 155.256 Z","data-bx-shape":"triangle 175.907 155.256 76.21 66 0.5 0 1@b1f3cbc1",transform:"matrix(-0.000024, 1, -1, -0.000024, 268.262054, -141.660278)","data-bx-origin":"0.53481 0.565042"})]})})]}),u?(0,r.jsx)("div",{id:"video-embed",children:(0,r.jsx)("div",{className:"relative",style:{padding:"49.27% 0 0 0"},children:(0,r.jsx)("iframe",{src:"".concat(n,"?h=e72038724e&color=bf9eda&byline=0&portrait=0&autoplay=1"),style:{position:"absolute",top:0,left:0,width:"100%",height:"100%"},frameBorder:"0",allow:"autoplay; fullscreen; picture-in-picture",allowFullScreen:!0})})}):""]})}},4875:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return s},default:function(){return p}});var r=n(5893),l=n(9169),i=n(2439),a=n(5121),c=n(3638),o=n(5224),d=function(e){return(0,r.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[(0,r.jsx)(c.Z,{id:"img-"+e.image.data.image.publicId,alt:e.image.data.altText,imgId:e.image.data.image.publicId,aspectDefault:!0}),(0,r.jsx)("p",{children:e.image.data.caption})]})},u={heading:function(e,t,n){return(0,r.jsx)("p",{className:"".concat(3===e&&"text-2xl text-bluegreen leading-none"," ").concat(4===e&&"text-xl text-coated"," font-semibold mb-8"),style:{textAlign:n},children:t})}},s=!0;function p(e){var t=e.page;return(0,r.jsx)(a.Z,{children:(0,r.jsx)("div",{className:"about-container container mt-14 mb-24 xl:mt-16 px-4 xl:px-8 w-full lg:w-10/12 xl:w-9/12",children:(0,r.jsx)(l.e,{document:t.content.document,renderers:(0,o.Z)(u),componentBlocks:(0,i.Z)(d)})})})}}},function(e){e.O(0,[592,675,774,888,179],(function(){return t=3036,e(e.s=t);var t}));var t=e.O();_N_E=t}]);
(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[134],{2288:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/news",function(){return n(4064)}])},5840:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var i=n(5893),a=n(5675),r=function(e){var t=e.src;e.width,e.quality;return t};function s(e){var t=e.imageLabel,n=e.width,s=e.height;return(0,i.jsx)(a.default,{src:"https://dummyimage.com/".concat(n,"x").concat(s,"/026670/fff.png&text=").concat(t,"+Image+Missing"),alt:"Preview image with text saying '".concat(t," Image Missing'"),width:n,height:s,layout:"fixed",loader:r})}},5121:function(e,t,n){"use strict";var i=n(5893),a=(n(7294),n(7592)),r={hidden:{opacity:0},enter:{opacity:1},exit:{opacity:0}};t.Z=function(e){var t=e.children;return(0,i.jsx)("div",{children:(0,i.jsx)(a.E.main,{initial:"hidden",animate:"enter",exit:"exit",variants:r,transition:{type:"linear"},children:t})})}},4064:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return c},default:function(){return o}});var i=n(5893),a=n(1664),r=n(3638),s=n(5121),l=n(5840),c=!0;function o(e){var t=e.items;return(0,i.jsx)(s.Z,{children:(0,i.jsxs)("div",{className:"container mt-14 mb-24 xl:mt-16 px-4 xl:px-8",children:[(0,i.jsx)("h2",{className:"text-2xl text-bluegreen font-semibold mb-8",children:"Latest News"}),(0,i.jsx)("div",{className:"mt-6",children:t.map((function(e,t){return(0,i.jsxs)("div",{className:"flex flex-col-reverse md:flex-row ".concat(t>0&&"mt-14"),children:[(0,i.jsx)("div",{className:"w-full md:w-1/3",children:(0,i.jsxs)("div",{className:"text-coated text-xl font-semibold leading-8 mt-3 md:mt-0",children:[new Date(e.publishDate).toLocaleDateString("en-US",{weekday:"long"}),(0,i.jsx)("br",{}),new Date(e.publishDate).toLocaleDateString("en-US",{month:"long",day:"numeric"}),(0,i.jsx)("br",{}),new Date(e.publishDate).toLocaleDateString("en-US",{year:"numeric"})]})}),(0,i.jsx)("div",{className:"flex-shrink",children:(0,i.jsx)(a.default,{href:"/news/".concat(e.key),passHref:!0,children:(0,i.jsxs)("a",{className:"group",children:[(0,i.jsx)("h3",{className:"text-bluegreen hover:text-green-blue group-hover:text-green-blue text-xl font-semibold my-2",children:e.title}),(0,i.jsx)("p",{className:"max-w-2xl",children:e.blurb}),e.thumbnail?(0,i.jsx)(r.Z,{id:"thumb-".concat(t),alt:'Thumbnail for blog post with title "'.concat(e.title,'" '),imgId:e.thumbnail.publicId,width:335}):(0,i.jsx)(l.Z,{imageLabel:"News",width:335,height:200})]})})})]},t)}))})]})})}}},function(e){e.O(0,[592,675,774,888,179],(function(){return t=2288,e(e.s=t);var t}));var t=e.O();_N_E=t}]);
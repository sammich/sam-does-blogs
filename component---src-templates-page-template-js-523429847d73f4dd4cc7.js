(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{152:function(e,t,a){"use strict";a.r(t),a.d(t,"query",function(){return o});var n=a(0),c=a.n(n),r=a(158),i=a(159),l=a(161),o="4092021430";t.default=function(e){var t=e.data,a=t.site.siteMetadata,n=a.title,o=a.subtitle,s=t.markdownRemark.frontmatter,u=s.title,m=s.description,h=t.markdownRemark.html,_=null!==m?m:o;return c.a.createElement(r.a,{title:u+" - "+n,description:_},c.a.createElement(i.a,null),c.a.createElement(l.a,{title:u},c.a.createElement("div",{dangerouslySetInnerHTML:{__html:h}})))}},158:function(e,t,a){"use strict";var n=a(0),c=a.n(n),r=a(175),i=a.n(r),l=a(163),o=a.n(l),s=function(e){var t=e.children,a=e.title,n=e.description;return c.a.createElement("div",{className:o.a.layout},c.a.createElement(i.a,null,c.a.createElement("html",{lang:"en"}),c.a.createElement("title",null,a),c.a.createElement("meta",{name:"description",content:n})),t)};a.d(t,"a",function(){return s})},159:function(e,t,a){"use strict";a(25);var n=a(165),c=a(0),r=a.n(c),i=a(32),l=(a(162),a(166)),o=a.n(l),s=function(e){var t=e.author,a=e.isIndex;return r.a.createElement("div",{className:o.a.author},r.a.createElement(i.Link,{to:"/"},r.a.createElement("img",{src:Object(i.withPrefix)(t.photo),className:o.a.author__photo,width:"75",height:"75",alt:t.name})),a?r.a.createElement("h1",{className:o.a.author__title},r.a.createElement(i.Link,{className:o.a["author__title-link"],to:"/"},t.name)):r.a.createElement("h2",{className:o.a.author__title},r.a.createElement(i.Link,{className:o.a["author__title-link"],to:"/"},t.name)),r.a.createElement("p",{className:o.a.author__subtitle},t.bio))},u=(a(71),a(52),a(167),a(164)),m=a(169),h=a.n(m),_=function(e){var t=e.icon;return r.a.createElement("svg",{className:h.a.icon,viewBox:t.viewBox},r.a.createElement("path",{d:t.path}))},d=a(170),p=a.n(d),v=function(e){var t=e.contacts;return r.a.createElement("div",{className:p.a.contacts},r.a.createElement("ul",{className:p.a.contacts__list},Object.keys(t).map(function(e){return r.a.createElement("li",{className:p.a["contacts__list-item"],key:e},r.a.createElement("a",{className:p.a["contacts__list-item-link"],href:Object(u.a)(e,t[e]),rel:"noopener noreferrer",target:"_blank"},r.a.createElement(_,{icon:Object(u.b)(e)})))})))},b=a(171),E=a.n(b),f=function(e){var t=e.copyright;return r.a.createElement("div",{className:E.a.copyright},t)},g=a(172),k=a.n(g),M=function(e){var t=e.menu;return r.a.createElement("nav",{className:k.a.menu},r.a.createElement("ul",{className:k.a.menu__list},t.map(function(e){return r.a.createElement("li",{className:k.a["menu__list-item"],key:e.path},r.a.createElement(i.Link,{to:e.path,className:k.a["menu__list-item-link"],activeClassName:k.a["menu__list-item-link--active"]},e.label))})))},w=a(173),N=a.n(w),y=function(e){var t=e.data,a=e.isIndex,n=t.site.siteMetadata,c=n.author,i=n.copyright,l=n.menu;return r.a.createElement("div",{className:N.a.sidebar},r.a.createElement("div",{className:N.a.sidebar__inner},r.a.createElement(s,{author:c,isIndex:a}),r.a.createElement(M,{menu:l}),r.a.createElement(v,{contacts:c.contacts}),r.a.createElement(f,{copyright:i})))},x=function(e){return r.a.createElement(i.StaticQuery,{query:"213204691",render:function(t){return r.a.createElement(y,Object.assign({},e,{data:t}))},data:n})};a.d(t,"a",function(){return x})},160:function(e,t,a){"use strict";var n={TWITTER:{path:"M25.312 6.375c-0.688 1-1.547 1.891-2.531 2.609 0.016 0.219 0.016 0.438 0.016 0.656 0 6.672-5.078 14.359-14.359 14.359-2.859 0-5.516-0.828-7.75-2.266 0.406 0.047 0.797 0.063 1.219 0.063 2.359 0 4.531-0.797 6.266-2.156-2.219-0.047-4.078-1.5-4.719-3.5 0.313 0.047 0.625 0.078 0.953 0.078 0.453 0 0.906-0.063 1.328-0.172-2.312-0.469-4.047-2.5-4.047-4.953v-0.063c0.672 0.375 1.453 0.609 2.281 0.641-1.359-0.906-2.25-2.453-2.25-4.203 0-0.938 0.25-1.797 0.688-2.547 2.484 3.062 6.219 5.063 10.406 5.281-0.078-0.375-0.125-0.766-0.125-1.156 0-2.781 2.25-5.047 5.047-5.047 1.453 0 2.766 0.609 3.687 1.594 1.141-0.219 2.234-0.641 3.203-1.219-0.375 1.172-1.172 2.156-2.219 2.781 1.016-0.109 2-0.391 2.906-0.781z",viewBox:"0 0 26 28"},FACEBOOK:{path:"M14.984 0.187v4.125h-2.453c-1.922 0-2.281 0.922-2.281 2.25v2.953h4.578l-0.609 4.625h-3.969v11.859h-4.781v-11.859h-3.984v-4.625h3.984v-3.406c0-3.953 2.422-6.109 5.953-6.109 1.687 0 3.141 0.125 3.563 0.187z",viewBox:"0 0 16 28"},TELEGRAM:{path:"M27.563 0.172c0.328 0.234 0.484 0.609 0.422 1l-4 24c-0.047 0.297-0.234 0.547-0.5 0.703-0.141 0.078-0.313 0.125-0.484 0.125-0.125 0-0.25-0.031-0.375-0.078l-7.078-2.891-3.781 4.609c-0.187 0.234-0.469 0.359-0.766 0.359-0.109 0-0.234-0.016-0.344-0.063-0.391-0.141-0.656-0.516-0.656-0.938v-5.453l13.5-16.547-16.703 14.453-6.172-2.531c-0.359-0.141-0.594-0.469-0.625-0.859-0.016-0.375 0.172-0.734 0.5-0.922l26-15c0.156-0.094 0.328-0.141 0.5-0.141 0.203 0 0.406 0.063 0.562 0.172z",viewBox:"0 0 28 28"},VKONTAKTE:{path:"M29.953 8.125c0.234 0.641-0.5 2.141-2.344 4.594-3.031 4.031-3.359 3.656-0.859 5.984 2.406 2.234 2.906 3.313 2.984 3.453 0 0 1 1.75-1.109 1.766l-4 0.063c-0.859 0.172-2-0.609-2-0.609-1.5-1.031-2.906-3.703-4-3.359 0 0-1.125 0.359-1.094 2.766 0.016 0.516-0.234 0.797-0.234 0.797s-0.281 0.297-0.828 0.344h-1.797c-3.953 0.25-7.438-3.391-7.438-3.391s-3.813-3.938-7.156-11.797c-0.219-0.516 0.016-0.766 0.016-0.766s0.234-0.297 0.891-0.297l4.281-0.031c0.406 0.063 0.688 0.281 0.688 0.281s0.25 0.172 0.375 0.5c0.703 1.75 1.609 3.344 1.609 3.344 1.563 3.219 2.625 3.766 3.234 3.437 0 0 0.797-0.484 0.625-4.375-0.063-1.406-0.453-2.047-0.453-2.047-0.359-0.484-1.031-0.625-1.328-0.672-0.234-0.031 0.156-0.594 0.672-0.844 0.766-0.375 2.125-0.391 3.734-0.375 1.266 0.016 1.625 0.094 2.109 0.203 1.484 0.359 0.984 1.734 0.984 5.047 0 1.062-0.203 2.547 0.562 3.031 0.328 0.219 1.141 0.031 3.141-3.375 0 0 0.938-1.625 1.672-3.516 0.125-0.344 0.391-0.484 0.391-0.484s0.25-0.141 0.594-0.094l4.5-0.031c1.359-0.172 1.578 0.453 1.578 0.453z",viewBox:"0 0 31 28"},GITHUB:{path:"M10 19c0 1.141-0.594 3-2 3s-2-1.859-2-3 0.594-3 2-3 2 1.859 2 3zM20 19c0 1.141-0.594 3-2 3s-2-1.859-2-3 0.594-3 2-3 2 1.859 2 3zM22.5 19c0-2.391-1.453-4.5-4-4.5-1.031 0-2.016 0.187-3.047 0.328-0.812 0.125-1.625 0.172-2.453 0.172s-1.641-0.047-2.453-0.172c-1.016-0.141-2.016-0.328-3.047-0.328-2.547 0-4 2.109-4 4.5 0 4.781 4.375 5.516 8.188 5.516h2.625c3.813 0 8.188-0.734 8.188-5.516zM26 16.25c0 1.734-0.172 3.578-0.953 5.172-2.063 4.172-7.734 4.578-11.797 4.578-4.125 0-10.141-0.359-12.281-4.578-0.797-1.578-0.969-3.437-0.969-5.172 0-2.281 0.625-4.438 2.125-6.188-0.281-0.859-0.422-1.766-0.422-2.656 0-1.172 0.266-2.344 0.797-3.406 2.469 0 4.047 1.078 5.922 2.547 1.578-0.375 3.203-0.547 4.828-0.547 1.469 0 2.953 0.156 4.375 0.5 1.859-1.453 3.437-2.5 5.875-2.5 0.531 1.062 0.797 2.234 0.797 3.406 0 0.891-0.141 1.781-0.422 2.625 1.5 1.766 2.125 3.938 2.125 6.219z",viewBox:"0 0 26 28"},EMAIL:{path:"M26 23.5v-12c-0.328 0.375-0.688 0.719-1.078 1.031-2.234 1.719-4.484 3.469-6.656 5.281-1.172 0.984-2.625 2.188-4.25 2.188h-0.031c-1.625 0-3.078-1.203-4.25-2.188-2.172-1.813-4.422-3.563-6.656-5.281-0.391-0.313-0.75-0.656-1.078-1.031v12c0 0.266 0.234 0.5 0.5 0.5h23c0.266 0 0.5-0.234 0.5-0.5zM26 7.078c0-0.391 0.094-1.078-0.5-1.078h-23c-0.266 0-0.5 0.234-0.5 0.5 0 1.781 0.891 3.328 2.297 4.438 2.094 1.641 4.188 3.297 6.266 4.953 0.828 0.672 2.328 2.109 3.422 2.109h0.031c1.094 0 2.594-1.437 3.422-2.109 2.078-1.656 4.172-3.313 6.266-4.953 1.016-0.797 2.297-2.531 2.297-3.859zM28 6.5v17c0 1.375-1.125 2.5-2.5 2.5h-23c-1.375 0-2.5-1.125-2.5-2.5v-17c0-1.375 1.125-2.5 2.5-2.5h23c1.375 0 2.5 1.125 2.5 2.5z",viewBox:"0 0 28 28"},RSS:{path:"M6 21c0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3 3 1.344 3 3zM14 22.922c0.016 0.281-0.078 0.547-0.266 0.75-0.187 0.219-0.453 0.328-0.734 0.328h-2.109c-0.516 0-0.938-0.391-0.984-0.906-0.453-4.766-4.234-8.547-9-9-0.516-0.047-0.906-0.469-0.906-0.984v-2.109c0-0.281 0.109-0.547 0.328-0.734 0.172-0.172 0.422-0.266 0.672-0.266h0.078c3.328 0.266 6.469 1.719 8.828 4.094 2.375 2.359 3.828 5.5 4.094 8.828zM22 22.953c0.016 0.266-0.078 0.531-0.281 0.734-0.187 0.203-0.438 0.313-0.719 0.313h-2.234c-0.531 0-0.969-0.406-1-0.938-0.516-9.078-7.75-16.312-16.828-16.844-0.531-0.031-0.938-0.469-0.938-0.984v-2.234c0-0.281 0.109-0.531 0.313-0.719 0.187-0.187 0.438-0.281 0.688-0.281h0.047c5.469 0.281 10.609 2.578 14.484 6.469 3.891 3.875 6.188 9.016 6.469 14.484z",viewBox:"0 0 22 28"}},c={PREV_PAGE:"← PREV",NEXT_PAGE:"→ NEXT"};a.d(t,"a",function(){return n}),a.d(t,"b",function(){return c})},161:function(e,t,a){"use strict";var n=a(0),c=a.n(n),r=a(174),i=a.n(r),l=function(e){var t=e.title,a=e.children,r=Object(n.useRef)();return Object(n.useEffect)(function(){r.current.scrollIntoView()}),c.a.createElement("div",{ref:r,className:i.a.page},c.a.createElement("div",{className:i.a.page__inner},t&&c.a.createElement("h1",{className:i.a.page__title},t),c.a.createElement("div",{className:i.a.page__body},a)))};a.d(t,"a",function(){return l})},163:function(e,t,a){e.exports={layout:"Layout-module--layout--3Pyz6"}},164:function(e,t,a){"use strict";var n=a(160),c=function(e){var t;switch(e){case"twitter":t=n.a.TWITTER;break;case"github":t=n.a.GITHUB;break;case"vkontakte":t=n.a.VKONTAKTE;break;case"telegram":t=n.a.TELEGRAM;break;case"email":t=n.a.EMAIL;break;case"rss":t=n.a.RSS;break;default:t={}}return t},r=function(e,t){var a;switch(e){case"twitter":a="https://www.twitter.com/"+t;break;case"github":a="https://github.com/"+t;break;case"vkontakte":a="https://vk.com/"+t;break;case"telegram":a="telegram:"+t;break;case"email":a="mailto:"+t;break;default:a=t}return a};a.d(t,"b",function(){return c}),a.d(t,"a",function(){return r})},165:function(e){e.exports={data:{site:{siteMetadata:{title:"Sam Does Blogs",subtitle:"Samuel Chan blogs here about the geekier parts of his life.",copyright:"© All rights reserved.",menu:[{label:"Articles",path:"/"},{label:"About me",path:"/pages/about"},{label:"Contact me",path:"/pages/contacts"}],author:{name:"Samuel Chan",photo:"/photo.jpg",bio:"A struggling blogger that's an IBM BPM consultant on the side.",contacts:{twitter:"#",github:"#",email:"me@samuelchan.dev",rss:"#"}}}}}}},166:function(e,t,a){e.exports={author__photo:"Author-module--author__photo--36xCH",author__title:"Author-module--author__title--2CaTb","author__title-link":"Author-module--author__title-link--Yrism",author__subtitle:"Author-module--author__subtitle--cAaEB"}},167:function(e,t,a){var n=a(34),c=a(33);a(168)("keys",function(){return function(e){return c(n(e))}})},168:function(e,t,a){var n=a(13),c=a(17),r=a(26);e.exports=function(e,t){var a=(c.Object||{})[e]||Object[e],i={};i[e]=t(a),n(n.S+n.F*r(function(){a(1)}),"Object",i)}},169:function(e,t,a){e.exports={icon:"Icon-module--icon--Gpyvw"}},170:function(e,t,a){e.exports={contacts:"Contacts-module--contacts--1rGd1",contacts__list:"Contacts-module--contacts__list--3OgdW","contacts__list-item":"Contacts-module--contacts__list-item--16p9q","contacts__list-item-link":"Contacts-module--contacts__list-item-link--2MIDn"}},171:function(e,t,a){e.exports={copyright:"Copyright-module--copyright--1ariN"}},172:function(e,t,a){e.exports={menu:"Menu-module--menu--Efbin",menu__list:"Menu-module--menu__list--31Zeo","menu__list-item":"Menu-module--menu__list-item--1lJ6B","menu__list-item-link":"Menu-module--menu__list-item-link--10Ush","menu__list-item-link--active":"Menu-module--menu__list-item-link--active--2CbUO"}},173:function(e,t,a){e.exports={sidebar:"Sidebar-module--sidebar--X4z2p",sidebar__inner:"Sidebar-module--sidebar__inner--Jdc5s"}},174:function(e,t,a){e.exports={page:"Page-module--page--2nMky",page__inner:"Page-module--page__inner--2M_vz",page__title:"Page-module--page__title--GPD8L",page__body:"Page-module--page__body--Ic6i6"}}}]);
//# sourceMappingURL=component---src-templates-page-template-js-523429847d73f4dd4cc7.js.map
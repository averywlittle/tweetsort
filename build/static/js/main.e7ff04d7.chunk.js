(this["webpackJsonpreact-ui"]=this["webpackJsonpreact-ui"]||[]).push([[0],{37:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n(2),r=n(13),u=n.n(r),a=n(3),i=function(e){return Object(c.jsxs)("div",{children:["@",Object(c.jsx)("input",{value:e.query,onChange:e.handleQueryChange}),Object(c.jsx)("button",{onClick:e.queryTweets,type:"submit",children:"Get Tweets"})]})},j=function(e){var t=e.tweets;return 0===t.length?null:t.map((function(e){return Object(c.jsxs)("div",{children:[e.text,Object(c.jsxs)("p",{children:["Likes: ",e.favorite_count]}),Object(c.jsxs)("p",{children:["Retweets: ",e.retweet_count]}),Object(c.jsx)("br",{})]},e.id)}))},o=n(14),l=n.n(o),b=function(){var e=Object(s.useState)(""),t=Object(a.a)(e,2),n=t[0],r=t[1],u=Object(s.useState)(null),o=Object(a.a)(u,2),b=(o[0],o[1]),h=Object(s.useState)([]),d=Object(a.a)(h,2),O=d[0],p=d[1];return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"tweetsort"}),Object(c.jsx)(i,{query:n,handleQueryChange:function(e){r(e.target.value)},queryTweets:function(){console.log("query",n),l.a.post("http://localhost:3001/api/query/",n).then((function(e){console.log(e.data.user),b(e.data.user),p(e.data.tweets)}))}}),Object(c.jsx)(j,{tweets:O})]})};u.a.render(Object(c.jsx)(b,{}),document.getElementById("root"))}},[[37,1,2]]]);
//# sourceMappingURL=main.e7ff04d7.chunk.js.map
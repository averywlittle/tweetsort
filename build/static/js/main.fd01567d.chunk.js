(this["webpackJsonpreact-ui"]=this["webpackJsonpreact-ui"]||[]).push([[0],{41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n(1),a=n(15),s=n.n(a),u=n(3),l=function(e){return Object(c.jsxs)("div",{children:["@",Object(c.jsx)("input",{value:e.query,onChange:e.handleQueryChange}),Object(c.jsx)("button",{onClick:e.queryTweets,type:"submit",children:"Get Tweets"})]})},i=n(17),j=function(e){var t=e.tweets;if(0===t.length&&console.log("empty tweets"),0===t.length)return null;var n=10*e.page;return t.slice(n-10,n).map((function(e){return Object(c.jsxs)("div",{children:[Object(c.jsx)(i.a,{tweetId:e.id_str}),Object(c.jsx)("br",{})]},e.id)}))},o=function(e){return!0===e.loading?Object(c.jsx)("div",{id:"loading",children:Object(c.jsx)("img",{src:"loading.gif",alt:"loading symbol",width:"100",height:"25"})}):null},d=function(e){return Object(c.jsx)("form",{children:Object(c.jsxs)("label",{children:["Sort by:",Object(c.jsxs)("select",{value:e.QueryType,onChange:e.handleQueryTypeChange,children:[Object(c.jsx)("option",{value:"favorites",children:"Likes"}),Object(c.jsx)("option",{value:"retweets",children:"Reach"}),Object(c.jsx)("option",{value:"date",children:"Date"})]})]})})},b=function(e){return Object(c.jsx)("form",{children:Object(c.jsxs)("label",{children:["In order:",Object(c.jsxs)("select",{value:e.queryOrder,onChange:e.handleQueryOrderChange,children:[Object(c.jsx)("option",{value:"asc",children:"Ascending"}),Object(c.jsx)("option",{value:"desc",children:"Descending"})]})]})})},h=function(e){return Object(c.jsxs)("div",{children:[Object(c.jsx)("button",{onClick:e.handlePageDown,type:"submit",children:"Page Down"}),e.page,Object(c.jsx)("button",{onClick:e.handlePageUp,type:"submit",children:"Page Up"})]})},O=n(16),g=n.n(O),p=function(){var e=Object(r.useState)(""),t=Object(u.a)(e,2),n=t[0],a=t[1],s=Object(r.useState)(null),i=Object(u.a)(s,2),O=(i[0],i[1]),p=Object(r.useState)([]),x=Object(u.a)(p,2),y=x[0],f=x[1],v=Object(r.useState)(!1),w=Object(u.a)(v,2),q=w[0],C=w[1],m=Object(r.useState)("favorites"),D=Object(u.a)(m,2),S=D[0],T=D[1],P=Object(r.useState)("desc"),Q=Object(u.a)(P,2),k=Q[0],R=Q[1],I=Object(r.useState)(1),U=Object(u.a)(I,2),E=U[0],J=U[1];return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"tweetsort"}),Object(c.jsx)(d,{queryType:S,handleQueryTypeChange:function(e){e.preventDefault(),T(e.target.value)}}),Object(c.jsx)(b,{queryOrder:k,handleQueryOrderChange:function(e){e.preventDefault(),R(e.target.value)}}),Object(c.jsx)(l,{query:n,handleQueryChange:function(e){a(e.target.value)},queryTweets:function(){console.log("query",n),C(!0);var e={query:n,queryType:S,queryOrder:k};g.a.post("/api/query/",e).then((function(e){console.log(e.data.user),console.log("tweets returned",e.data.tweets.length),O(e.data.user),f(e.data.tweets),C(!1)})).catch((function(e){return console.log("POST ERROR",e)}))}}),Object(c.jsx)(o,{loading:q}),Object(c.jsx)(j,{tweets:y,page:E}),Object(c.jsx)(h,{page:E,handlePageUp:function(e){e.preventDefault(),10*E<y.length/10+1&&J(E+1)},handlePageDown:function(e){e.preventDefault(),1!==E&&J(E-1)}})]})};n(41);s.a.render(Object(c.jsx)(p,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.fd01567d.chunk.js.map
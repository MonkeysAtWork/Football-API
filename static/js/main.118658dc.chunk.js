(this.webpackJsonp2xbet=this.webpackJsonp2xbet||[]).push([[0],{54:function(e,t,a){"use strict";a.r(t);var n=a(7),s=a.n(n),r=a(9),c=a(0),i=a(1),l=a.n(i),o=a(8),u=a.n(o),m=a(3),d=a(6),j=a(10),b=a.n(j),f=a(56),p=a(2),O=a(11),h="https://v2.api-football.com",x="fixtures",v=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;return[h,x,"team",e,"last",t].join("/")},g=function(e){return[h,x,"date",e].join("/")},T={params:{timezone:"Europe/Moscow"},headers:{"x-rapidapi-key":Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).API_KEY,"x-rapidapi-host":"https://v2.api-football.com/"}},S={equal:function(e,t){return e===t},gt:function(e,t){return e>=t},lt:function(e,t){return e<=t}},F=function(e,t,a){var n=a.goalsCompare,s=a.missedGoalsCompare,r=S[n.action],c=S[s.action];return r(e,n.value)&&c(t,s.value)},N={goalsCompare:{action:"equal",value:0,name:"goalsCompare"},missedGoalsCompare:{action:"equal",value:0,name:"missedGoalsCompare"}},y=Object(d.b)({name:"teamsInfo",initialState:{filtredTeams:[],teamsFilters:[Object(p.a)({},N)],requestState:""},reducers:{addTeamsFilter:function(e){e.teamsFilters.length<3&&e.teamsFilters.push(Object(p.a)({},N))},deleteLastTeamsFilter:function(e){e.teamsFilters.length>1&&e.teamsFilters.pop()},changeTeamsFilter:function(e,t){var a=t.payload,n=a.paramName,s=a.index,r=a.newState;e.teamsFilters[s][n]=r},setTeamsStatsRequest:function(e){e.requestState="requested"},setTeamsStatsFailure:function(e){e.requestState="failured"},setTeamsStats:function(e,t){e.requestState="success",e.filtredTeams=t.payload}}}),w=y.actions,q={},C=function(e){var t=e.id;if(q[t])return Promise.resolve(Object(p.a)(Object(p.a)({},e),{},{stats:q[t]}));var a=v(t,3);return b.a.get(a,T).then((function(a){var n=a.data.api.fixtures;return q[t]=n,Object(p.a)(Object(p.a)({},e),{},{stats:n})})).catch((function(a){return console.log("\u043e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u0438 \u0434\u0430\u043d\u043d\u044b\u0445 \u043a\u043e\u043c\u0430\u043d\u0434\u044b id: ".concat(t)),console.error(a),Object(p.a)(Object(p.a)({},e),{},{error:a})}))},I=function(e,t){return t.every((function(t,a){var n=e.stats[a].homeTeam.team_id===e.id,s=e.stats[a],r=s.goalsHomeTeam,c=s.goalsAwayTeam;return n?F(r,c,t):F(c,r,t)}))},_={selectFiltredTeams:function(e){return e.teamsInfo.filtredTeams.map((function(e){return{name:e.name,id:e.id,league:e.league,country:e.country}}))},selectTeamsFilters:function(e){return e.teamsInfo.teamsFilters},selectTeamsFiltersLength:function(e){return e.teamsInfo.teamsFilters.length},selectRequestState:function(e){return e.teamsInfo.requestState}},E=y.reducer,k=Object(d.b)({name:"gamesInfo",initialState:{gamesStats:[],gamesFilter:{}},extraReducers:Object(O.a)({},w.changeTeamsFilter.type,(function(e,t){var a=t.payload,n=a.paramName,s=a.index,r=a.newState;0===s&&(e.gamesFilter[n]=r)}))}),R=["FT","AET","PEN"],A=k.actions,L={selectFiltredTeamsFromGames:function(e){var t=e.gamesInfo,a=t.gamesStats,n=t.gamesFilter,s=a.reduce((function(e,t){if(!R.includes(t.statusShort))return e;var a=t.goalsHomeTeam,s=t.goalsAwayTeam,r=t.homeTeam,c=r.team_id,i=r.team_name,l=t.awayTeam,o=l.team_id,u=l.team_name,m=t.league,d=m.name,j=m.country;return F(a,s,n)&&(e[c]={id:c,name:i,league:d,country:j,stats:t}),F(s,a,n)&&(e[o]={id:o,name:u,league:d,country:j,stats:t}),e}),{});return Object.values(s)}},P={gamesInfo:k.reducer,teamsInfo:E},D=Object(p.a)(Object(p.a)(Object(p.a)({},A),w),{},{setTeamsStatsAsync:function(e){return function(){var t=Object(r.a)(s.a.mark((function t(a,n){var r,c,i,l;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a(w.setTeamsStatsRequest()),t.prev=1,r=e.map(C),t.next=5,Promise.allSettled(r);case 5:c=t.sent,i=n().teamsInfo.teamsFilters,l=c.filter((function(e){return"fulfilled"===e.status})).map((function(e){return e.value})).filter((function(e){return I(e,i)})),a(w.setTeamsStats(l)),t.next=16;break;case 11:t.prev=11,t.t0=t.catch(1),console.log("\u043e\u0448\u0438\u0431\u043a\u0430 \u0432 \u0441\u0431\u043e\u0440\u043a\u0435 \u043f\u0440\u043e\u043c\u0438\u0441\u0430"),console.error(t.t0),a(w.setTeamsStatsFailure());case 16:case"end":return t.stop()}}),t,null,[[1,11]])})));return function(e,a){return t.apply(this,arguments)}}()}}),G=Object(p.a)(Object(p.a)({},L),_),H=P,B=function(e){var t=e.filterState,a=e.index,n=Object(m.b)(),s=t.goalsCompare,r=t.missedGoalsCompare,i=function(e){var t={newState:e,paramName:e.name,index:a};n(D.changeTeamsFilter(t))},l=function(e){return function(t){var a=t.target.value,n=parseInt(a,10);Number.isNaN(n)||(a=n);var s=Object(p.a)(Object(p.a)({},e),{},{value:a});i(s)}},o=function(e){return function(t){var a=Object(p.a)(Object(p.a)({},e),{},{action:t.target.value});i(a)}},u=function(e,t){return function(a){if(!a.target.value){var n=Object(p.a)(Object(p.a)({},e),{},{value:t});i(n)}}};return Object(c.jsxs)("div",{className:"row flex-nowrap mb-2",children:[Object(c.jsx)("div",{className:"col-1 mr-3 d-flex align-items-center",children:Object(c.jsx)("span",{className:"",children:-a})}),Object(c.jsxs)("div",{className:"col d-flex flex-nowrap p-0 mr-2",children:[Object(c.jsxs)("select",{className:"custom-select col-7",value:s.action,onChange:o(s),children:[Object(c.jsx)("option",{value:"equal",children:"="}),Object(c.jsx)("option",{value:"gt",children:">="}),Object(c.jsx)("option",{value:"lt",children:"<="})]}),Object(c.jsx)("input",{type:"number",className:"form-control col-5",min:0,value:s.value,onChange:l(s),onBlur:u(s,0)})]}),Object(c.jsxs)("div",{className:"col d-flex flex-nowrap p-0",children:[Object(c.jsxs)("select",{className:"custom-select col-7",value:r.action,onChange:o(r),children:[Object(c.jsx)("option",{value:"equal",children:"="}),Object(c.jsx)("option",{value:"gt",children:">="}),Object(c.jsx)("option",{value:"lt",children:"<="})]}),Object(c.jsx)("input",{type:"number",className:"form-control col-5",min:"0",value:r.value,onChange:l(r),onBlur:u(r,0)})]})]})},M=function(){var e=Object(m.c)(G.selectTeamsFilters),t=Object(m.c)(G.selectFiltredTeamsFromGames),a=Object(m.c)(G.selectTeamsFiltersLength),n=Object(m.c)(G.selectRequestState),s=Object(m.b)();return Object(c.jsxs)("form",{className:"container-fluid",onSubmit:function(e){e.preventDefault(),s(1===a?D.setTeamsStats(t):D.setTeamsStatsAsync(t))},children:[Object(c.jsxs)("div",{className:"row mb-2 flex-nowrap",children:[Object(c.jsx)("div",{className:"col-1 mr-3",children:Object(c.jsx)("span",{className:"p-0",children:"\u2116"})}),Object(c.jsx)("div",{className:"col mr-2 m-0 p-0",children:Object(c.jsx)("span",{className:"p-0",children:"\u0417\u0430\u0431\u0438\u0442\u043e"})}),Object(c.jsx)("div",{className:"col m-0 p-0",children:Object(c.jsx)("span",{className:"p-0",children:"\u041f\u0440\u043e\u043f\u0443\u0449\u0435\u043d\u043e"})})]}),e.map((function(e,t){return Object(c.jsx)(B,{filterState:e,index:t},t)})),Object(c.jsxs)("div",{className:"row mt-3 flex-nowrap justify-content-between",children:[Object(c.jsx)("div",{children:Object(c.jsxs)("button",{className:"btn btn-primary",type:"submit",disabled:"requested"===n,children:["requested"===n&&Object(c.jsx)("span",{className:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"}),"\u041d\u0430\u0439\u0442\u0438"]})}),Object(c.jsx)("div",{children:Object(c.jsxs)("div",{className:"d-flex flex-nowrap",children:[Object(c.jsx)("button",{className:"btn btn-outline-primary p-1",type:"button",onClick:function(){return s(D.addTeamsFilter())},children:"+"}),Object(c.jsx)("button",{className:"btn btn-outline-primary p-1 ml-2",type:"button",onClick:function(){return s(D.deleteLastTeamsFilter())},children:"\u2212"})]})})]})]})},W=function(){var e=Object(m.c)(G.selectFiltredTeams);return Object(c.jsxs)("table",{className:"table table-borderless",children:[Object(c.jsx)("thead",{children:Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:"#"}),Object(c.jsx)("th",{children:"\u041a\u043e\u043c\u0430\u043d\u0434\u0430"}),Object(c.jsx)("th",{children:"\u041b\u0438\u0433\u0430"}),Object(c.jsx)("th",{children:"\u0421\u0442\u0440\u0430\u043d\u0430"})]})}),Object(c.jsx)("tbody",{children:e.map((function(e,t){return Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{children:t+1}),Object(c.jsx)("td",{children:e.name}),Object(c.jsx)("td",{children:e.league}),Object(c.jsx)("td",{children:e.country})]},e.id)}))})]})},K=function(){var e=Object(m.c)(G.selectRequestState);return Object(c.jsxs)("div",{className:"container-md pt-5 d-flex flex-wrap",children:[Object(c.jsx)("div",{className:"mb-5 col col-sm-5",children:Object(c.jsx)(M,{})}),"success"===e&&Object(c.jsx)("div",{className:"col col-sm-7",children:Object(c.jsx)(W,{})})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));Object(r.a)(s.a.mark((function e(){var t,a,n,r,i,o,j,p;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=document.getElementById("root"),a=Object(f.a)(new Date,"yyyy-MM-dd"),n=g(a),e.prev=3,e.next=6,b.a.get(n,T);case 6:if(i=e.sent,r=i.data,!(o=r.api.error)){e.next=11;break}throw Error(o);case 11:e.next=18;break;case 13:return e.prev=13,e.t0=e.catch(3),console.error(e.t0),t.innerHTML='<h3 class="p-3">C\u0435\u0440\u0432\u0435\u0440 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0438 \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d, \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443.<br> \u041f\u0440\u0438 \u043f\u043e\u0432\u0442\u043e\u0440\u043d\u043e\u0439 \u043e\u0448\u0438\u0431\u043a\u0435 \u043e\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044c \u0432 \u0442\u0435\u0445\u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0443.</h3 ><div class="m-3">'.concat(e.t0,"</div>"),e.abrupt("return");case 18:j={gamesInfo:{gamesStats:r.api.fixtures,gamesFilter:N},teamsInfo:{filtredTeams:[],teamsFilters:[N],requestState:""}},p=Object(d.a)({reducer:H,preloadedState:j}),u.a.render(Object(c.jsx)(l.a.StrictMode,{children:Object(c.jsx)(m.a,{store:p,children:Object(c.jsx)(K,{})})}),t),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}));case 22:case"end":return e.stop()}}),e,null,[[3,13]])})))()}},[[54,1,2]]]);
//# sourceMappingURL=main.118658dc.chunk.js.map
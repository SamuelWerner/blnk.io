webpackJsonp([1],{117:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(27),s=n(120),r=n(156),o=n(194),i=n(303),c=(n.n(i),n(304)),u=(n.n(c),n(305)),l=n.n(u),d=n(86),v=(n.n(d),n(306));n.n(v);a.default.use(o.a),a.default.use(l.a),a.default.config.productionTip=!1,new a.default({el:"#app",router:r.a,template:"<App/>",components:{App:s.a}})},120:function(t,e,n){"use strict";var a=n(61),s=n(155),r=n(28),o=r(a.a,s.a,!1,null,null,null);e.a=o.exports},155:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("b-navbar",{attrs:{toggleable:"md",type:"dark",variant:"dark"}},[n("b-navbar-toggle",{attrs:{target:"nav_collapse"}}),t._v(" "),n("b-navbar-brand",{attrs:{to:"/"}},[t._v("blnk.io")]),t._v(" "),n("b-collapse",{attrs:{"is-nav":"",id:"nav_collapse"}},[n("b-navbar-nav",[n("b-nav-item",{attrs:{to:"/"}},[t._v("Home")]),t._v(" "),n("b-nav-item",{attrs:{to:"/posts-manager"}},[t._v("CRUD Example")]),t._v(" "),n("b-nav-item",{attrs:{to:"/start"}},[t._v("Startseite (Test)")])],1)],1)],1),t._v(" "),n("router-view")],1)},s=[],r={render:a,staticRenderFns:s};e.a=r},156:function(t,e,n){"use strict";var a=n(27),s=n(157),r=n(158),o=n(162),i=n(190),c=n(193),u=(n.n(c),n(86));n.n(u);a.default.use(s.a),a.default.use(c.MdButton),a.default.use(c.MdContent),a.default.use(c.MdTabs);var l=new s.a({mode:"history",routes:[{path:"/",name:"Hello",component:r.a},{path:"/start",name:"Start",component:i.a},{path:"/posts-manager",name:"PostsManager",component:o.a,meta:{requiresAuth:!0}}]});e.a=l},158:function(t,e,n){"use strict";function a(t){n(159)}var s=n(161),r=n(28),o=a,i=r(null,s.a,!1,o,null,null);e.a=i.exports},159:function(t,e){},161:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{staticClass:"container",staticStyle:{height:"100%"}},[n("div",{staticClass:"my-3 p-3 bg-white rounded shadow-lg paper",staticStyle:{outline:"none"},attrs:{contenteditable:"true"}},[n("div",[n("h1",{staticClass:"display-3"},[t._v("Hello World")]),t._v(" "),n("p",{staticClass:"lead"},[t._v("This is the homepage of your vue app")])])])])}],r={render:a,staticRenderFns:s};e.a=r},162:function(t,e,n){"use strict";var a=n(78),s=n(189),r=n(28),o=r(a.a,s.a,!1,null,null,null);e.a=o.exports},169:function(t,e,n){"use strict";var a=n(38),s=n.n(a),r=n(39),o=n.n(r),i=n(170),c=n.n(i),u=c.a.create({baseURL:"https://blnk-io.herokuapp.com/",json:!0});e.a={execute:function(t,e,n){var a=this;return o()(s.a.mark(function r(){return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return console.log(t+"  "+e+"  "+n),a.abrupt("return",u({method:t,url:e,data:n}).then(function(t){return t.data}));case 2:case"end":return a.stop()}},r,a)}))()},getPosts:function(){return this.execute("get","/posts")},getPost:function(t){return this.execute("get","/posts/"+t)},createPost:function(t){return this.execute("post","/posts",t)},updatePost:function(t,e){return this.execute("put","/posts/"+t,e)},deletePost:function(t){return this.execute("delete","/posts/"+t)}}},189:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container-fluid mt-4"},[n("h1",{staticClass:"h1"},[t._v("Posts Manager")]),t._v(" "),n("b-alert",{attrs:{show:t.loading,variant:"info"}},[t._v("Loading...")]),t._v(" "),n("b-row",[n("b-col",[n("table",{staticClass:"table table-striped"},[n("thead",[n("tr",[n("th",[t._v("ID")]),t._v(" "),n("th",[t._v("Title")]),t._v(" "),n("th",[t._v("Updated At")]),t._v(" "),n("th",[t._v(" ")])])]),t._v(" "),n("tbody",t._l(t.posts,function(e){return n("tr",{key:e.id},[n("td",[t._v(t._s(e.id))]),t._v(" "),n("td",[t._v(t._s(e.title))]),t._v(" "),n("td",[t._v(t._s(e.updatedAt))]),t._v(" "),n("td",{staticClass:"text-right"},[n("a",{attrs:{href:"#"},on:{click:function(n){n.preventDefault(),t.populatePostToEdit(e)}}},[t._v("Edit")]),t._v(" -\n              "),n("a",{attrs:{href:"#"},on:{click:function(n){n.preventDefault(),t.deletePost(e.id)}}},[t._v("Delete")])])])}))])]),t._v(" "),n("b-col",{attrs:{lg:"3"}},[n("b-card",{attrs:{title:t.model.id?"Edit Post ID#"+t.model.id:"New Post"}},[n("form",{on:{submit:function(e){return e.preventDefault(),t.savePost(e)}}},[n("b-form-group",{attrs:{label:"Title"}},[n("b-form-input",{attrs:{type:"text"},model:{value:t.model.title,callback:function(e){t.$set(t.model,"title",e)},expression:"model.title"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Body"}},[n("b-form-textarea",{attrs:{rows:"4"},model:{value:t.model.body,callback:function(e){t.$set(t.model,"body",e)},expression:"model.body"}})],1),t._v(" "),n("div",[n("b-btn",{attrs:{type:"submit",variant:"success"}},[t._v("Save Post")])],1)],1)])],1)],1)],1)},s=[],r={render:a,staticRenderFns:s};e.a=r},190:function(t,e,n){"use strict";function a(t){n(191)}var s=n(84),r=n(192),o=n(28),i=a,c=o(s.a,r.a,!1,i,"data-v-27b497a4",null);e.a=c.exports},191:function(t,e){},192:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main",{staticClass:"container",staticStyle:{height:"100%"}},[a("h1",{staticClass:"h1"},[t._v("blnk.io")]),t._v(" "),a("div",[a("div",{staticClass:"card text-center"},[a("div",{staticClass:"card-header"},[t._v("\n        Featured\n      ")]),t._v(" "),a("div",{staticClass:"card-body"},[t._m(0),t._v(" "),a("h5",{staticClass:"card-title"},[t._v("Neues Dokument anlegen")]),t._v(" "),a("p",{staticClass:"card-text"},[t._v("Lege ein neues Dokument an und bearbeite es.")]),t._v(" "),a("div",[a("md-dialog",{staticClass:"dialog",attrs:{"md-active":t.showDialog},on:{"update:mdActive":function(e){t.showDialog=e}}},[a("md-dialog-title",[t._v("Neues Dokument anlegen")]),t._v(" "),a("md-field",{staticClass:"inputBox"},[a("form",{attrs:{id:"form"},on:{submit:function(e){return e.preventDefault(),t.addDoc(e)}}},[a("md-input",{attrs:{type:"text",placeholder:"Titel eingeben...",maxlength:"30"},model:{value:t.doc,callback:function(e){t.doc=e},expression:"doc"}})],1)]),t._v(" "),a("md-dialog-actions",[a("md-button",{staticClass:"md-primary",on:{click:function(e){t.showDialog=!1}}},[t._v("Abbruch")]),t._v(" "),a("md-button",{staticClass:"md-primary",attrs:{type:"submit",form:"form"},on:{click:function(e){t.showDialog=!1}}},[t._v("Erstellen")])],1)],1),t._v(" "),a("md-button",{staticClass:"md-primary md-raised",on:{click:function(e){t.showDialog=!0}}},[t._v("+")])],1)])])]),t._v(" "),a("ul",t._l(t.docs,function(e,s){return a("li",{key:s},[a("img",{staticStyle:{width:"30px"},attrs:{src:n(85)}}),a("hr"),t._v("\n      "+t._s(e.doc)+"\n    ")])}))])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",[a("img",{staticStyle:{width:"60px"},attrs:{src:n(85)}})])}],r={render:a,staticRenderFns:s};e.a=r},198:function(t,e){},227:function(t,e){},244:function(t,e){},289:function(t,e){},303:function(t,e){},304:function(t,e){},306:function(t,e){},61:function(t,e,n){"use strict";var a=n(38),s=n.n(a),r=n(39),o=n.n(r);e.a={name:"app",data:function(){return{activeUser:null}},methods:{logout:function(){var t=this;return o()(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$auth.logout();case 2:return e.next=4,t.refreshActiveUser();case 4:t.$router.push("/");case 5:case"end":return e.stop()}},e,t)}))()}}}},78:function(t,e,n){"use strict";var a=n(163),s=n.n(a),r=n(38),o=n.n(r),i=n(39),c=n.n(i),u=n(169);e.a={data:function(){return{loading:!1,posts:[],model:{}}},created:function(){var t=this;return c()(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.refreshPosts();case 1:case"end":return e.stop()}},e,t)}))()},methods:{refreshPosts:function(){var t=this;return c()(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,u.a.getPosts();case 3:t.posts=e.sent,t.loading=!1;case 5:case"end":return e.stop()}},e,t)}))()},populatePostToEdit:function(t){var e=this;return c()(o.a.mark(function n(){return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:e.model=s()({},t);case 1:case"end":return n.stop()}},n,e)}))()},savePost:function(){var t=this;return c()(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.model.id){e.next=5;break}return e.next=3,u.a.updatePost(t.model.id,t.model);case 3:e.next=7;break;case 5:return e.next=7,u.a.createPost(t.model);case 7:return t.model={},e.next=10,t.refreshPosts();case 10:case"end":return e.stop()}},e,t)}))()},deletePost:function(t){var e=this;return c()(o.a.mark(function n(){return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(!confirm("Are you sure you want to delete this post?")){n.next=6;break}return e.model.id===t&&(e.model={}),n.next=4,u.a.deletePost(t);case 4:return n.next=6,e.refreshPosts();case 6:case"end":return n.stop()}},n,e)}))()}}}},84:function(t,e,n){"use strict";e.a={name:"Start",data:function(){return{active:!1,value:null,showDialog:!1,docs:[]}},methods:{addDoc:function(){""!==this.doc?(this.docs.push({doc:this.doc}),this.doc=""):this.doc=""}}}},85:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDBWMHoiLz48cGF0aCBkPSJNMTQgMkg2Yy0xLjEgMC0xLjk5LjktMS45OSAyTDQgMjBjMCAxLjEuODkgMiAxLjk5IDJIMThjMS4xIDAgMi0uOSAyLTJWOGwtNi02ek02IDIwVjRoN3Y1aDV2MTFINnoiLz48L3N2Zz4="},86:function(t,e){}},[117]);
//# sourceMappingURL=app.d15bf54c3935f0afdd57.js.map
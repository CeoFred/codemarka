(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{271:function(e,t,a){"use strict";a.r(t);var n=a(35),l=a(13),r=a(27),c=a(0),o=a.n(c),i=a(15),s=a(20),m=a(11),d=a(94),u=a(96),p=a(69),g=a(75),b=a(66),f=a(28),h=a(68),v=a(8),E=a(18),w=a(6),y=a(5),k=a(29),N=a.n(k),x=(a(81),o.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-key"},o.a.createElement("path",{d:"M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"}))),j=o.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-at-sign"},o.a.createElement("circle",{cx:"12",cy:"12",r:"4"}),o.a.createElement("path",{d:"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"}));t.default=Object(i.b)(function(e){return{loading:e.auth.loading,error:e.auth.message,isAuthenticated:null!==e.auth.user.token,message:e.auth.message}},function(e){return{onResetAll:function(){return e(v.k())},onAuth:function(t,a){return e(v.g(t,a))},onClassroomSwitch:function(t){return e(v.u(t))}}})(function(e){var t=e.onClassroomSwitch,a=e.onResetAll,i=Object(c.useState)(!1),v=Object(r.a)(i,2),k=v[0],L=v[1];Object(c.useEffect)(function(){L(!0),k||(a(),t("classroom"))},[k,t,a]);var A,C=Object(c.useState)({controls:{email:{value:""},password:{value:""}},formSubmitted:!1,alertMessage:e.message,alertType:e.error&&e.message?"success":"danger"}),O=Object(r.a)(C,2),P=O[0],S=O[1],_=function(e,t){e.preventDefault();var a=e.target.value,r=Object(l.a)({},P.controls,Object(n.a)({},t,Object(l.a)({},P.controls[t],{value:a})));S(Object(l.a)({},P,{controls:r}))},B=function(t){t.preventDefault(),S(Object(y.c)(P,!0));var a={};for(var n in P.controls)a[n]=P.controls[n].value;e.onAuth(Object(l.a)({},a))},I=o.a.createElement(h.a,{display:e.message,type:e.error?"danger":"success"},e.message?"".concat(e.message):"");if(e.isAuthenticated){var R=window.location.href,D=new URLSearchParams(R).get("redir");D?A=o.a.createElement(s.a,{to:"".concat(D)}):window.location.href=window.location.origin}return o.a.createElement("div",null,o.a.createElement(b.a,{title:"Sign Into your account",metaDescription:"Return back to learn or host classrooms in real time"}),A,o.a.createElement("section",{className:"container-fluid"},o.a.createElement("div",{className:"row min-vh-100",style:{maxHeight:"100vh",overflow:"auto"}},o.a.createElement("div",{className:"comm_bg_img col-md-8 col-xl-8 col-lg-8 py-6 py-md-0 h-100vh d-none d-md-flex d-lg-flex d-xl-flex"},o.a.createElement("div",{className:"details_container"},o.a.createElement("div",{className:"logo_container"},o.a.createElement("img",{src:N.a,height:"25",alt:"codemarka_logo"}),o.a.createElement("span",{className:"badge badge-warning"},"PRO")),o.a.createElement("div",{className:"mb-2"},o.a.createElement("p",{className:"float-left p-text text-white line-height-1"},"Get the best out of every classrom and enjoy",o.a.createElement("br",null),"all our exciting features by",o.a.createElement("br",null)," getting a community account today.")),o.a.createElement(m.b,{to:w.l},o.a.createElement("button",{type:"button",class:"btn btn-animated btn-primary btn-animated-x"},o.a.createElement("span",{class:"btn-inner--visible"},"SIGN UP"),o.a.createElement("span",{class:"btn-inner--hidden"},o.a.createElement("i",{className:"fa fa-arrow-alt-circle-right"})))))),o.a.createElement("div",{className:"mt-3 p-3 col-md-4 col-lg-4 col-xl-4 py-6 h-100 py-md-0 oveflow-auto",style:{maxHeight:"100vh",overflow:"auto"}},o.a.createElement("div",null,o.a.createElement("div",{className:"mb-5 text-center"},o.a.createElement("h6",{className:"h3 mb-1"},"Welcome back!"),o.a.createElement("p",{className:"text-muted mb-0"},"Sign in to your account to continue.")),o.a.createElement("span",{className:"clearfix"}),I,o.a.createElement("form",{onSubmit:B},o.a.createElement(g.a,{type:"email",id:"emailinput",placeholder:"someone@someserver.com",label:"Email address",initialPrepend:!0,initialPrependsvg:j,value:P.controls.email.value,changed:function(e){return _(e,"email")}}),o.a.createElement(g.a,{type:"password",id:"passwordinput",placeholder:"Secret password",label:"password",isLoginPasswordInput:!0,initialPrepend:!0,forgotPassword:!0,initialPrependsvg:x,value:P.controls.password.value,finalAppend:!1,changed:function(e){return _(e,"password")}}),o.a.createElement("div",{className:"mt-4"},o.a.createElement(p.a,{type:"submit",clicked:B,disabled:e.loading,textColor:"#fff",block:!0,color:"primary"},e.loading?o.a.createElement(f.a,null):"Sign In"))),o.a.createElement("div",{className:"py-3 text-center"},o.a.createElement("span",{className:"text-xs text-uppercase"},"or")),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-6"},o.a.createElement(d.a,{link:E.t+"?auth=login&vendor=github"})),o.a.createElement("div",{className:"col-6"},o.a.createElement(u.a,{link:E.u+"?auth=login&vendor=google"}))),o.a.createElement("div",{className:"mt-4 text-center"},o.a.createElement("small",null,"Not registered?"),o.a.createElement(m.b,{to:"/auth/signup",className:"small font-weight-bold ml-1"},"Create account")))))))})},66:function(e,t,a){"use strict";a.d(t,"a",function(){return o});var n=a(0),l=a.n(n),r=a(67),c=a.n(r);function o(e){var t=e.follow,a=void 0===t||t,n=e.lang,r=e.title,o=e.metaDescription,i=e.pathname,s=e.image,m=e.children;return l.a.createElement(c.a,{htmlAttributes:{lang:n||"en"},title:r||"Codemarka - Learning, Building and collaboration in real time.",titleTemplate:"".concat(r||"Codemarka - Learning, Building and collaboration in real time."),meta:[{name:"description",content:o||"An online real time code editor for learning, building and collaborating with multi language support."},{property:"og:title",content:r||"Codemarka - Learning, Building and collaboration in real time."},{property:"og:url",content:"https://codemarka.dev"},{property:"og:description",content:o||"An online real time code editor for learning, building and collaborating with multi language support."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:"@codemon_"},{name:"twitter:title",content:r||"Codemarka - Learning, Building and collaboration in real time."},{name:"og:site_name",content:"codemarka"},{name:"og:locale",content:"en"},{name:"og:image",content:s||"https://res.cloudinary.com/ogwugo-people/image/upload/v1577469153/dark.png"},{name:"twitter:description",content:o||"An online real time code editor for learning, building and collaborating with multi language support."}]},m,l.a.createElement("link",{rel:"canonical",href:"https://codemarka/".concat(i||"")}),l.a.createElement("meta",{name:"robots",content:a?"follow":"nofollow,noindex"}))}},68:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=function(e){return l.a.createElement("div",{className:"alert alert-".concat(e.type,"  alert-dismissible fade show d-").concat(e.display?"block":"none"),role:"alert",ref:e.ref},e.message)},c={success:"success",danger:"danger",info:"info",warning:"warning"};function o(e){switch(e.type){case c.success:return l.a.createElement(r,{clicked:e.clicked,type:c.success,display:e.display,message:e.children,title:e.title});case c.danger:return l.a.createElement(r,{clicked:e.clicked,type:c.danger,display:e.display,message:e.children,title:e.title});default:return l.a.createElement(r,{clicked:e.clicked,type:"info",display:e.display,message:e.children,title:e.title})}}a.d(t,"a",function(){return o})},69:function(e,t,a){"use strict";a.d(t,"a",function(){return r});var n=a(0),l=a.n(n);function r(e){return l.a.createElement("button",{onClick:e.clicked,type:e.type||"button",className:"mb-2 btn btn-".concat(e.color," ").concat(e.block?"btn-block":"","  ").concat(e.animation," btn-").concat(e.size," ").concat(e.icon||""),disabled:e.disabled||!1,style:{color:"".concat(e.textColor||"inherit")}},e.children)}},75:function(e,t,a){"use strict";a.d(t,"a",function(){return o});var n=a(0),l=a.n(n),r=a(11),c=a(6);function o(e){var t=l.a.createElement("div",{className:"form-group mb-4"},l.a.createElement("div",{className:"d-flex align-items-center justify-content-between"},l.a.createElement("div",null,l.a.createElement("label",{className:"form-control-label"},e.label)),e.isLoginPasswordInput&&e.forgotPassword?l.a.createElement("div",{className:"mb-2"},l.a.createElement(r.b,{to:c.c,className:"small text-muted text-underline--dashed border-primary"},"Forgot password?")):""),l.a.createElement("div",{className:"input-group input-group-merge"},e.initialPrepend?l.a.createElement("div",{className:"input-group-prepend"},l.a.createElement("span",{className:"input-group-text"},e.initialPrependsvg)):"",l.a.createElement("input",{type:e.type,className:"form-control",id:e.id||"",placeholder:e.placeholder,onChange:e.changed,value:e.value}),e.finalAppend?l.a.createElement("div",{className:"input-group-append"},l.a.createElement("span",{className:"input-group-text"},l.a.createElement("a",{href:"/#","data-toggle":"password-text","data-target":"#input-password"},e.finalAppendsvg))):"")),a=l.a.createElement("div",{className:"my-4"},l.a.createElement("div",{className:"custom-control custom-checkbox mb-3"},l.a.createElement("input",{type:"checkbox",selected:e.selected,className:"custom-control-input",onSelect:e.clicked,id:"check-terms"}),l.a.createElement("label",{className:"custom-control-label",htmlFor:"check-terms"},e.children)));switch(e.fieldtype){case"checkbox":return a;default:return t}}},81:function(e,t,a){},94:function(e,t,a){"use strict";a.d(t,"a",function(){return o});var n=a(0),l=a.n(n),r=a(95),c=a.n(r);function o(e){return l.a.createElement("a",{href:e.link,className:"btn btn-block btn-neutral btn-icon mb-3 mb-sm-0"},l.a.createElement("span",{className:"btn-inner--icon"},l.a.createElement("img",{src:c.a,alt:" placeholder"})),l.a.createElement("span",{className:"btn-inner--text"},"Github"))}},95:function(e,t,a){e.exports=a.p+"static/media/github.2e257125.svg"},96:function(e,t,a){"use strict";a.d(t,"a",function(){return o});var n=a(0),l=a.n(n),r=a(97),c=a.n(r);function o(e){return l.a.createElement("a",{href:e.link,className:"btn btn-block btn-neutral btn-icon"},l.a.createElement("span",{className:"btn-inner--icon"},l.a.createElement("img",{src:c.a,alt:"placeholder"})),l.a.createElement("span",{className:"btn-inner--text"},"Google"))}},97:function(e,t,a){e.exports=a.p+"static/media/google.08ea438e.svg"}}]);
(this["webpackJsonp@transmute/nfc-did-ai"]=this["webpackJsonp@transmute/nfc-did-ai"]||[]).push([[0],{100:function(e,a,t){e.exports=t.p+"static/media/logo.33b194d8.svg"},114:function(e,a,t){e.exports=t(138)},119:function(e,a,t){},138:function(e,a,t){"use strict";t.r(a);var n={};t.r(n),t.d(n,"setTmuiProp",(function(){return C}));var r=t(0),o=t.n(r),i=t(7),c=t.n(i),l=(t(119),t(62)),s=t(46),u=t(36),m=t(85);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var p=t(26),d=t(19),b=t(74),h=t(79),f=t(86),g=t.n(f),E=t(87),y=t(88),v=t(89),O=t.n(v),j=t(21),k=t(192),w=t(197),C=Object(w.a)("tmui/SET_TMUI_PROP",(function(e){return e})),S=Object(k.a)(Object(j.a)({},C,(function(e,a){var t=a.payload;return Object(p.a)({},e,{},t)})),{isPrimaryDrawerOpen:!1,isSpeedDialogOpen:!1,activeTabIndex:0,currentRole:{label:"Tier 0",value:"tier0"}}),T=t(63),x=Object(u.c)((function(e){return{tmui:e.tmui}}),Object(p.a)({},n)),F=Object(T.b)({setTmuiProp:function(e){var a=e.setTmuiProp;return function(e){a(e)}},doToggleSpeedDial:function(e){var a=e.setTmuiProp;return function(e){a({isSpeedDialogOpen:e})}},doSelectActiveTab:function(e){var a=e.setTmuiProp;return function(e){a({activeTabIndex:e})}},doFabClick:function(e){var a=e.setTmuiProp;return function(e){a({fabClick:e})}}}),N={reducer:S,container:Object(T.a)(x,F)},P=t(30),M=Object(P.a)(),W={router:Object(s.b)(M),tmui:N.reducer},R=t(34),B=t(50),D=t(52),I=t(53),z=t(61),L=t(64),H=t(102),A=t(176),J=t(49),U='"Rajdhani"',_='"Roboto Condensed"',G='"Lato"',V=function(e){Object(L.a)(t,e);var a=Object(z.a)(t);function t(){return Object(D.a)(this,t),a.apply(this,arguments)}return Object(I.a)(t,[{key:"render",value:function(){var e=this.props.children,a=Object(H.a)({splashImage:"",palette:{type:"light",primary:{light:Object(J.lighten)("#594aa8",.07),main:"#594aa8",dark:Object(J.darken)("#594aa8",.07)},secondary:{light:Object(J.lighten)("#fcb373",.07),main:"#fcb373",dark:Object(J.darken)("#fcb373",.07)}},typography:{useNextVariants:!0,fontSize:16,fontFamily:[U,_,G].join(","),h1:{fontFamily:U,fontWeight:600},h2:{fontFamily:U,fontWeight:600},h3:{fontFamily:U,fontWeight:600},h4:{fontFamily:_,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:400},h5:{fontFamily:_,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:400},h6:{fontFamily:_,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:400},subtitle1:{fontFamily:U,fontWeight:400},subtitle2:{fontFamily:_,fontWeight:400},body1:{fontFamily:G,fontWeight:400},body2:{fontFamily:G,fontWeight:400},button:{fontFamily:_,fontWeight:400},caption:{fontFamily:_,fontWeight:400},overline:{fontFamily:_,letterSpacing:"0.15em",textTransform:"uppercase",fontWeight:300}},overrides:{MuiInput:{input:{fontFamily:G}},MuiInputLabel:{root:{fontFamily:_}},MuiAppBar:{root:{}},MuiButton:{contained:{boxShadow:"none"}}}});return o.a.createElement(A.a,{theme:a},e)}}]),t}(r.Component),$=t(198),q=t(103),K=t(4),Q=t(92),X=t.n(Q),Y=t(94),Z=t.n(Y),ee=t(73),ae=t.n(ee),te=t(96),ne=t.n(te),re=t(178),oe=t(179),ie=t(181),ce=t(180),le=t(93),se=t.n(le),ue=t(95),me={success:X.a,warning:se.a,error:Z.a,info:ae.a,default:ae.a},pe=Object(ue.a)((function(e){return{success:{backgroundColor:re.a[600]},error:{backgroundColor:e.palette.error.dark},info:{backgroundColor:e.palette.primary.main},warning:{backgroundColor:oe.a[700]},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:e.spacing(1)},message:{display:"flex",alignItems:"center"}}}));var de=function(e){var a=pe(),t=e.className,n=e.message,r=e.onClose,i=e.variant,c=Object(q.a)(e,["className","message","onClose","variant"]),l=me[i];return o.a.createElement(ce.a,Object.assign({className:Object(K.a)(a[i],t),"aria-describedby":"client-snackbar",message:o.a.createElement("span",{id:"client-snackbar",className:a.message},o.a.createElement(l,{className:Object(K.a)(a.icon,a.iconVariant)}),n),action:[o.a.createElement(ie.a,{key:"close","aria-label":"close",color:"inherit",onClick:r},o.a.createElement(ne.a,{className:a.icon}))]},c))};var be=function(e){var a=e.tmui.snackBarMessage||{variant:"default",vertical:"bottom",horizontal:"right"},t=a.open,n=a.variant,r=a.message,i=a.autoHideDuration,c=a.vertical,l=a.horizontal,s=function(a,t){"clickaway"!==t&&e.setTmuiProp({snackBarMessage:Object(p.a)({},e.tmui.snackBarMessage,{open:!1})})};return o.a.createElement("div",null,o.a.createElement($.a,{anchorOrigin:{vertical:c,horizontal:l},open:t,autoHideDuration:i,onClose:s},o.a.createElement(de,{onClose:s,variant:n,message:r})))},he=t(187),fe=t(186),ge=t(195),Ee=t(194),ye=t(97),ve=t.n(ye),Oe=t(188),je=t(15),ke=t(185),we=t(184),Ce=t(196),Se=t(98),Te=t.n(Se),xe=t(99),Fe=t.n(xe),Ne=Object(ue.a)((function(e){var a;return{root:{},grow:{flexGrow:1},drawer:Object(j.a)({},e.breakpoints.up("sm"),{width:240,flexShrink:0}),appBar:Object(j.a)({},e.breakpoints.up("sm"),{width:"calc(100% - ".concat(240,"px)"),marginLeft:240}),menuButton:Object(j.a)({marginRight:e.spacing(2)},e.breakpoints.up("sm"),{display:"none"}),toolbar:e.mixins.toolbar,drawerPaper:{width:240},sectionDesktop:Object(j.a)({display:"none"},e.breakpoints.up("sm"),{display:"flex"}),sectionMobile:Object(j.a)({display:"flex"},e.breakpoints.up("sm"),{display:"none"}),content:(a={},Object(j.a)(a,e.breakpoints.up("sm"),{marginLeft:240}),Object(j.a)(a,"flexGrow",1),Object(j.a)(a,"padding",e.spacing(3)),a)}}));var Pe=function(e){var a=e.container,t=Ne(),n=Object(je.a)(),r=o.a.useState(!1),i=Object(R.a)(r,2),c=i[0],l=i[1],s=o.a.useState(null),u=Object(R.a)(s,2),m=u[0],p=u[1],d=o.a.useState(null),b=Object(R.a)(d,2),h=b[0],f=b[1],g=Boolean(m),E=Boolean(h),y=function(){l(!c)},v=function(){f(null)},O=o.a.createElement(Ce.a,{anchorEl:m,anchorOrigin:{vertical:"top",horizontal:"right"},id:"primary-search-account-menu",keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:g,onClose:function(){p(null),v()}},e.rightHandAccountMenu.map((function(e){return e.displaySmUp?"":o.a.createElement(we.a,{key:e.label,onClick:e.onClick},e.label)}))),j=o.a.createElement(Ce.a,{anchorEl:h,anchorOrigin:{vertical:"top",horizontal:"right"},id:"primary-search-account-menu-mobile",keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:E,onClose:v},e.rightHandAccountMenu.map((function(e){return o.a.createElement(we.a,{key:e.label,onClick:e.onClick},o.a.createElement(ie.a,{"aria-label":e.ariaLabel,color:"inherit"},o.a.createElement(ke.a,{badgeContent:e.badgeContent,color:"secondary"},e.icon)),o.a.createElement("p",null,e.label))})));return o.a.createElement("div",{className:t.root},o.a.createElement(fe.a,null),o.a.createElement(he.a,{position:"fixed",className:t.appBar},o.a.createElement(Oe.a,null,o.a.createElement(ie.a,{color:"inherit","aria-label":"open drawer",edge:"start",onClick:y,className:t.menuButton},o.a.createElement(ve.a,null)),e.headerImage?o.a.createElement("img",{src:e.headerImage,alt:e.headerText,className:t.title,style:{height:"28px"}}):o.a.createElement(B.a,{className:t.title,variant:"h6",noWrap:!0},e.headerText),o.a.createElement("div",{className:t.grow}),o.a.createElement("div",{className:t.sectionDesktop},e.rightHandAccountMenu.map((function(e){return e.displaySmUp?o.a.createElement(ie.a,{key:e.ariaLabel,"aria-label":e.ariaLabel,color:"inherit"},o.a.createElement(ke.a,{color:"secondary",badgeContent:e.badgeContent},e.icon)):""})),o.a.createElement(ie.a,{edge:"end","aria-label":"account of current user","aria-controls":"primary-search-account-menu","aria-haspopup":"true",onClick:function(e){p(e.currentTarget)},color:"inherit"},o.a.createElement(Te.a,null))),o.a.createElement("div",{className:t.sectionMobile},o.a.createElement(ie.a,{"aria-label":"show more","aria-controls":"primary-search-account-menu-mobile","aria-haspopup":"true",onClick:function(e){f(e.currentTarget)},color:"inherit"},o.a.createElement(Fe.a,null))))),j,O,o.a.createElement("nav",{className:t.drawer,"aria-label":"drawer menu"},o.a.createElement(Ee.a,{smUp:!0,implementation:"css"},o.a.createElement(ge.a,{container:a,variant:"temporary",anchor:"rtl"===n.direction?"right":"left",open:c,onClose:y,classes:{paper:t.drawerPaper},ModalProps:{keepMounted:!0}},e.drawer)),o.a.createElement(Ee.a,{xsDown:!0,implementation:"css"},o.a.createElement(ge.a,{classes:{paper:t.drawerPaper},variant:"permanent",open:!0},e.drawer))),o.a.createElement("main",{className:t.content},o.a.createElement("div",{className:t.toolbar}),o.a.createElement("div",{style:{maxWidth:"100%"}},e.content)))},Me=t(141),We=t(189),Re=t(190),Be=t(183),De=t(60),Ie=t.n(De),ze=t(59),Le=t.n(ze),He=[{label:"Home",icon:o.a.createElement(Le.a,null),showForRoles:["tier0","tier1","tier2"],onClick:function(){M.push("/")}},{label:"Source Code",icon:o.a.createElement(Ie.a,null),showForRoles:["tier0","tier1","tier2"],onClick:function(){window.open("https://github.com/OR13/nfc.did.ai","_blank")}}];var Ae=function(e){var a=e.tmui,t=(e.setTmuiProp,o.a.useState({currentRole:a.currentRole})),n=Object(R.a)(t,1)[0];return o.a.createElement(o.a.Fragment,null,o.a.createElement(Be.a,null,He.filter((function(e){return-1!==e.showForRoles.indexOf(n.currentRole.value)})).map((function(e){return o.a.createElement(Me.a,{button:!0,key:e.label,onClick:e.onClick},o.a.createElement(We.a,null,e.icon),o.a.createElement(Re.a,{primary:e.label}))}))))},Je=[{badgeContent:0,ariaLabel:"home",icon:o.a.createElement(Le.a,null),label:"Home",onClick:function(){M.push("/")}},{badgeContent:0,label:"Source Code",ariaLabel:"source",icon:o.a.createElement(Ie.a,null),onClick:function(){window.open("https://github.com/OR13/nfc.did.ai","_blank")}}],Ue=t(100),_e=t.n(Ue),Ge=function(e){var a=e.tmui,t=e.setTmuiProp,n=e.children;return o.a.createElement(V,null,o.a.createElement(Pe,{rightHandAccountMenu:Je,headerImage:_e.a,drawer:o.a.createElement(Ae,{tmui:a,setTmuiProp:t}),content:n}),o.a.createElement(be,{tmui:a,setTmuiProp:t}))},Ve=t(191),$e=(t(68),t(101)),qe=t.n($e),Ke=(t(135),t(137),function(e){Object(L.a)(t,e);var a=Object(z.a)(t);function t(){return Object(D.a)(this,t),a.apply(this,arguments)}return Object(I.a)(t,[{key:"render",value:function(){var e=this.props,a=e.jsonObject,t=e.onChange;return o.a.createElement(qe.a,{mode:"json",theme:"github",readOnly:void 0===t,style:Object(p.a)({},this.props.style,{width:"100%"}),onChange:function(e){t(e)},name:"JSONEditorEditor",value:JSON.stringify(a,null,2),editorProps:{$blockScrolling:!0}})}}]),t}(r.Component)),Qe=function(e){var a=e.tmui,t=e.setTmuiProp,n=o.a.useState({}),r=Object(R.a)(n,2),i=r[0],c=r[1];return o.a.createElement(Ge,{tmui:a,setTmuiProp:t},o.a.createElement(B.a,{variant:"h5",style:{marginBottom:"32px"}},"Test"),o.a.createElement(B.a,{style:{marginBottom:"32px"}},"See ",o.a.createElement("a",{href:"https://web.dev/nfc/"},"web.dev/nfc"),"."),o.a.createElement(Ve.a,{variant:"contained",color:"secondary",onClick:function(){if("NDEFReader"in window){var e=new(0,window.NDEFReader);e.scan().then((function(){console.log("Scan started successfully."),e.onerror=function(){console.log("Cannot read data from the NFC tag. Try another one?")},e.onreading=function(e){c({event:e}),console.log("NDEF message read.")}})).catch((function(e){console.log("Error! Scan failed to start: ".concat(e,"."))}))}else alert("NFC Not Supported.")}},"Scan for NFC"),o.a.createElement(Ke,{jsonObject:i}))},Xe=[{path:"/",exact:!0,component:Object(d.compose)(N.container)((function(e){return o.a.createElement(Qe,e)}))}],Ye=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a={key:"root",whitelist:["keystore"],storage:g.a},t=[y.a,Object(h.a)(M)];var n=Object(d.createStore)(Object(b.a)(a,Object(d.combineReducers)(Object(p.a)({},W,{},e))),Object(E.composeWithDevTools)(Object(d.compose)(d.applyMiddleware.apply(void 0,t),O.a))),r=Object(b.b)(n);return{store:n,persistor:r,history:M}}(),Ze=Ye.store,ea=Ye.persistor,aa=Ye.history;c.a.render(o.a.createElement(u.a,{store:Ze},o.a.createElement(m.PersistGate,{persistor:ea},o.a.createElement(s.a,{history:aa},o.a.createElement(l.c,null,Xe.map((function(e){var a=e.exact,t=e.path,n=e.component;return o.a.createElement(l.a,{key:t,exact:a,path:t,component:n})})))))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[114,1,2]]]);
//# sourceMappingURL=main.e5b966ad.chunk.js.map
(this.webpackJsonpram=this.webpackJsonpram||[]).push([[0],{34:function(e,t,a){e.exports=a.p+"static/media/memoryCellCircuit.375091a1.svg"},35:function(e,t,a){e.exports=a.p+"static/media/memoryBlock.7657086e.svg"},36:function(e,t,a){e.exports=a.p+"static/media/memoryBlocks.31663eda.svg"},37:function(e,t,a){e.exports=a.p+"static/media/memoryBank.23c42a43.svg"},38:function(e,t,a){e.exports=a.p+"static/media/memoryBankRowCol.4feac339.svg"},39:function(e,t,a){e.exports=a.p+"static/media/memoryBankRasCas.dc6a5e8d.svg"},42:function(e,t,a){e.exports=a(67)},53:function(e,t,a){},54:function(e,t,a){},55:function(e,t,a){},56:function(e,t,a){},57:function(e,t,a){},58:function(e,t,a){},59:function(e,t,a){},60:function(e,t,a){},61:function(e,t,a){},62:function(e,t,a){},63:function(e,t,a){},64:function(e,t,a){},65:function(e,t,a){},67:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(24),s=a.n(r),i=a(2),l=a(15),o=function(e,t,a){var n=""!==t?[e,t].join("__"):e;return"".concat(n," ").concat(a.reduce((function(e,t){return"".concat(e," ").concat(n).concat("_").concat(t)}),""))},m=function(e){return function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return a="string"===typeof t?a:t||[],o(e,"string"===typeof t?t:"",Array.isArray(a)?a.filter(Boolean):Object.entries(a).filter((function(e){var t=Object(l.a)(e,2)[1];return Boolean(t)})).map((function(e){return Object(l.a)(e,1)[0]})))}},d=m,u=m("Hello");u(),u(["men","women"]),u({men:!0,women:!1}),u("world"),u("world",["mars","venera"]),u("world",{mars:!0,venera:!1});var b,h=a(4),f=a(72),p=a(71),E=function(e,t){return{type:"SET_PINS",payload:{type:e,value:t}}},y=function(e){return{type:"SET_CLOCK_PIN",payload:e}},O=function(e){return{type:"SET_ADDRESS_ROW_PINS",payload:e}},j=function(e){return{type:"SET_ADDRESS_COL_PINS",payload:e}},w=function(e){return{type:"SET_SELECTED_ROW_IN_MEMORY",payload:e}},N=function(e){return{type:"SET_SELECTED_COL_IN_MEMORY",payload:e}},v=function(e,t){return{type:"SET_PINS_WIDTH",payload:{type:e,width:t}}},g=function(e){return{type:"SET_IS_PIN_NOTATION_CLASSICAL",payload:{isClassical:e}}},k=function(e){return{type:"SET_MEMORY_DISPLAY_TYPE",payload:{displayType:e}}},S=function(e){return{type:"SET_IS_TACTING_ENABLED",payload:{isEnabled:e}}},A=function(e){return{type:"SET_IS_RAS_CAS_ENABLED",payload:{isEnabled:e}}},T=function(e,t){return{type:"WRITE_DATUM_IN_MEMORY",payload:{datum:e,address:t}}},C=function(e){return{type:"READ_DATUM_FROM_MEMORY",payload:{address:e}}},_=function(e){return{type:"SET_MEMORY",payload:{data:e}}},M=function(e){return{type:"SET_TACTS",payload:e}},R=function(e){return{type:"SET_CURRENT_TACTS",payload:e}},x={memoryArray:new Array(16).fill({datum:"0000",isDirty:!1}),selectedAddress:{address:void 0,row:void 0,col:void 0}},I=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"SET_SELECTED_ADDRESS_IN_MEMORY":return Object(h.a)(Object(h.a)({},e),{},{selectedAddress:{col:void 0,row:void 0,address:n}});case"SET_SELECTED_ROW_IN_MEMORY":return Object(h.a)(Object(h.a)({},e),{},{selectedAddress:Object(h.a)(Object(h.a)({},e.selectedAddress),{},{row:n})});case"SET_SELECTED_COL_IN_MEMORY":return Object(h.a)(Object(h.a)({},e),{},{selectedAddress:Object(h.a)(Object(h.a)({},e.selectedAddress),{},{col:n})});case"WRITE_DATUM_IN_MEMORY":var c=n.address,r=n.datum;return Object(h.a)(Object(h.a)({},e),{},{memoryArray:Object(f.a)(parseInt(c,2),{datum:r,isDirty:!0})(e.memoryArray)});case"SET_MEMORY":return Object(h.a)(Object(h.a)({},e),{},{memoryArray:n.data});default:return e}},D=function(e){return Object(p.a)(["memory","memoryArray"],e)},P=function(e){return Object(p.a)(["memory","selectedAddress","row"],e)},B=function(e){return Object(p.a)(["memory","selectedAddress","col"],e)},W=a(10),L=a(33),F="1",Y="0",U="1",z="0",H="RAS",V="CAS",G="clock",q="data",X="address",K="enabled",J="readWrite",$={ON:"1",OFF:"0"},Q=[{value:"table",label:"Table View"},{value:"matrix",label:"Matrix View"}],Z=(b={address:$.OFF.repeat(4),row:$.OFF.repeat(2),col:$.OFF.repeat(2)},Object(W.a)(b,H,$.OFF),Object(W.a)(b,V,$.OFF),Object(W.a)(b,"addressWidth",4),Object(W.a)(b,"data",$.OFF.repeat(4)),Object(W.a)(b,"dataWidth",4),Object(W.a)(b,"enabled",U),Object(W.a)(b,"readWrite",Y),Object(W.a)(b,"clock",$.OFF),Object(W.a)(b,"tacts",4),Object(W.a)(b,"currentTacts",0),b),ee=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Z,t=arguments.length>1?arguments[1]:void 0,a=t.payload;switch(t.type){case"SET_RAS_PIN":return Object(h.a)(Object(h.a)({},e),{},Object(W.a)({},H,a));case"SET_CAS_PIN":return Object(h.a)(Object(h.a)({},e),{},Object(W.a)({},V,a));case"SET_ADDRESS_ROW_PINS":return Object(h.a)(Object(h.a)({},e),{},{row:a});case"SET_ADDRESS_COL_PINS":return Object(h.a)(Object(h.a)({},e),{},{col:a});case"SET_CLOCK_PIN":return Object(h.a)(Object(h.a)({},e),{},Object(W.a)({},G,a));case"SET_PINS":return Object(h.a)(Object(h.a)({},e),{},Object(W.a)({},a.type,a.value));case"TOGGLE_RAS_CAS":var n;return Object(h.a)(Object(h.a)({},e),{},(n={},Object(W.a)(n,H,e[H]===$.ON?$.OFF:$.ON),Object(W.a)(n,V,e[V]===$.ON?$.OFF:$.ON),n));case"SET_TACTS":return Object(h.a)(Object(h.a)({},e),{},{tacts:a,currentTacts:a});case"SET_CURRENT_TACTS":return Object(h.a)(Object(h.a)({},e),{},{currentTacts:a});case"SET_PINS_WIDTH":var c,r=a.type,s=a.width,i=e[r].padStart(s,"0").slice(-s),l=(c={},Object(W.a)(c,r,i),Object(W.a)(c,"".concat(r,"Width"),s),c);return"address"===r&&(l.row=Object(L.a)(0,i.length/2,i),l.col=Object(L.a)(i.length/2,i.length,i)),Object(h.a)(Object(h.a)({},e),l);default:return e}},te=function(e){return Object(p.a)(["pinsInfo","data"],e)},ae=function(e){return Object(p.a)(["pinsInfo","dataWidth"],e)},ne=function(e){return Object(p.a)(["pinsInfo","addressWidth"],e)},ce=function(e){return Object(p.a)(["pinsInfo","enabled"],e)},re=function(e){return Object(p.a)(["pinsInfo","readWrite"],e)},se=function(e){return Object(p.a)(["pinsInfo","clock"],e)},ie=function(e){return Object(p.a)(["pinsInfo","tacts"],e)},le=function(e){return Object(p.a)(["pinsInfo","currentTacts"],e)},oe=function(e){return Object(p.a)(["pinsInfo",H],e)},me=function(e){return Object(p.a)(["pinsInfo",V],e)},de=function(e){return Object(p.a)(["pinsInfo","row"],e)},ue=function(e){return Object(p.a)(["pinsInfo","col"],e)},be=function(e){var t=de(e),a=ue(e);return"".concat(t).concat(a)},he=function(e){var t=Object(i.b)(),a=Object(n.useMemo)((function(){return e}),[e]);return Object(n.useCallback)((function(){t(a.apply(null,arguments))}),[t,a])},fe={isPinsNotationClassical:!1,isTactingEnabled:!1,isRasCasEnabled:!1,memoryDisplayType:"matrix"},pe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:fe,t=arguments.length>1?arguments[1]:void 0,a=t.payload,n=t.type;switch(n){case"SET_IS_PIN_NOTATION_CLASSICAL":return Object(h.a)(Object(h.a)({},e),{},{isPinsNotationClassical:a.isClassical});case"SET_IS_TACTING_ENABLED":return Object(h.a)(Object(h.a)({},e),{},{isTactingEnabled:a.isEnabled,isRasCasEnabled:!!a.isEnabled&&e.isRasCasEnabled});case"SET_IS_RAS_CAS_ENABLED":return Object(h.a)(Object(h.a)({},e),{},{isRasCasEnabled:a.isEnabled});case"SET_MEMORY_DISPLAY_TYPE":return Object(h.a)(Object(h.a)({},e),{},{memoryDisplayType:a.displayType});default:return e}},Ee=function(e){return Object(p.a)(["visualizationSettings","isPinsNotationClassical"],e)},ye=function(e){return Object(p.a)(["visualizationSettings","isTactingEnabled"],e)},Oe=function(e){return Object(p.a)(["visualizationSettings","memoryDisplayType"],e)},je=function(e){return Object(p.a)(["visualizationSettings","isRasCasEnabled"],e)},we=a(14),Ne=a(69),ve=function(){var e=Object(i.c)(Oe),t=Object(i.c)(ne),a=Object(i.c)(ae),n=function(){var e=Object(i.c)(ne),t=Math.pow(2,Math.floor(e/2));return[function(t){return{column:t%Math.pow(2,Math.floor(e/2)),row:Math.floor(t/Math.pow(2,Math.floor(e/2)))}},{totalRows:Math.floor(Math.pow(2,e)/Math.pow(2,Math.floor(e/2))),totalColumns:t}]}(),c=Object(l.a)(n,1)[0],r="table"===e?100:70,s="table"===e?20:33,o="table"===e?2*r+2:(r+2)*Math.pow(2,Math.floor(t/2)),m="table"===e?Math.pow(2,t)*(s+2)+22:Math.pow(2,Math.ceil(t/2))*(s+2),d=r/a;return[function(t){if("table"===e){var a=22+t*(s+2);return{cellX:r+2,cellY:a,textX:2*r,textY:a+(s+2)/2}}var n=c(t),i=n.row,l=n.column;return{cellX:l*(r+2),cellY:i*(s+2),textX:l*(r+2)+r-4,textY:i*(s+2)+(s+2)/2}},function(e){return{x:e*(r+2),y:0}},function(e){return{x:0,y:e*(s+2)}},{cellWidth:r,cellHeight:s,cellMargin:2,verticalOffset:22,containerWidth:o,containerHeight:m,fontSize:d>20?20:d<13?13:r/a},{width:o-2,height:s},{width:r,height:m-2}]},ge=function(){var e=he(E),t=he(w),a=he(N),c=he(C),r=Object(i.c)(D),s=he(T),l=Object(i.c)(be),o=Object(i.c)(de),m=Object(i.c)(ue),d=Object(i.c)(ae),u=Object(i.c)(te),b=Object(i.c)(re),h=Object(i.c)(ce),f=Object(i.c)(je),p=Object(i.c)(le),y=Object(i.c)(P),O=Object(i.c)(B),j=Object(i.c)(oe)===$.ON;Object(n.useEffect)((function(){b&&0!==p&&function(t){e(q,t)}($.OFF.repeat(d))}),[b]),Object(n.useEffect)((function(){y&&O&&h===U&&b===Y&&0===p&&s(u,"".concat(y).concat(O))}),[p,O,y,u,h,s,b]),Object(n.useEffect)((function(){y&&O&&b===F&&0===p&&c(l)}),[p,b,r,l,y,O,u,h,c]),Object(n.useEffect)((function(){p||f&&j||!m||a(m),p||f&&!j||!o||t(o)}),[f,j,m,o,p,t,a])},ke=(a(53),d("ToggleButtons")),Se=function(e){var t=e.options,a=e.handleSelect,n=void 0===a?function(){}:a,r=e.selectedValue,s=e.containerClassName,i=function(e){return function(){return n(e)}};return c.a.createElement("div",{className:"".concat(ke()," ").concat(s)},Object(Ne.a)((function(e){var t=e.value,a=e.label;return c.a.createElement("button",{key:t,className:ke("option",[r===t&&"selected"]),onClick:i(t)},a)}),t))},Ae=d("Memory"),Te=function(e){var t=e.coords,a=e.measures,n=e.isShowSelected,r=t.x,s=t.y,i=a.width,l=a.height;return c.a.createElement("rect",{key:"".concat(r,"-").concat(s),transform:"translate(1 1)",y:s,x:r,width:i-2,height:l-2,className:Ae("frame",[n?"selected":"preselected"])})},Ce=(a(54),d("Memory")),_e=function(){var e=he(k),t=Object(i.c)(D),a=Object(i.c)(Oe),r=Object(i.c)(ue),s=Object(i.c)(B),o=Object(i.c)(de),m=Object(i.c)(P),d=Object(i.c)(ne),u=Object(i.c)(Oe),b=Object(i.c)(je),h="".concat(o).concat(r),f="".concat(m).concat(s),p=Object(n.useMemo)((function(){return f.length===d}),[d,f]),E=ve(),y=Object(l.a)(E,6),O=y[0],j=y[1],w=y[2],N=y[3],v=N.cellWidth,g=N.cellHeight,S=N.cellMargin,A=N.verticalOffset,T=N.containerWidth,C=N.containerHeight,_=N.fontSize,M=y[4],R=y[5],x=parseInt(m,2),I=parseInt(o,2),W=parseInt(s,2),L=parseInt(r,2),F=w(x),Y=w(I),U=j(W),z=j(L),H=b?m===o:f===h,V=b?s===r:f===h,G=function(e,t,a){return c.a.createElement("text",{className:Ce("header"),x:t,y:a},e)};return c.a.createElement("div",{className:Ce()},c.a.createElement(Se,{containerClassName:Ce("viewOptions"),options:Q,selectedValue:u,handleSelect:e}),c.a.createElement("div",{className:Ce("memoryContainer")},c.a.createElement("svg",{style:{minHeight:C,width:T}},c.a.createElement("g",null,"table"===a&&c.a.createElement("g",null,G("Address",v-S,A/2),G("Data",2*v,A/2)),c.a.createElement("g",null,t.map((function(e,t){var n=O(t),r=n.cellX,s=n.cellY,i=n.textX,l=n.textY,o=parseInt(h,2)===t?"preselected":"",m=f===h&&parseInt(f,2)===t&&p?"selected":"",d=e.isDirty?"dirty":"";return c.a.createElement("g",{key:t},"table"===a&&c.a.createElement("g",null,c.a.createElement("rect",{x:0,y:s,width:v,height:g,className:Ce("cellAddress",[m||o,d])}),c.a.createElement("text",{className:Ce("addressLabel"),x:r-S,y:s+(g+S)/2},t)),c.a.createElement("g",{id:t},c.a.createElement("rect",{x:r,y:s,width:v,height:g,className:Ce("cell",[m||o,d])}),c.a.createElement("text",{className:Ce("dataLabel"),x:i,y:l,fontSize:"".concat(_,"px")},e.datum)))})),"matrix"===a&&c.a.createElement(c.a.Fragment,null,c.a.createElement(Te,{measures:R,coords:V?U:z,isShowSelected:V}),c.a.createElement(Te,{measures:M,coords:H?F:Y,isShowSelected:H})))))))},Me=a(68),Re=(a(55),d("Pin")),xe=function(e){var t=e.id,a=e.pinState,n=e.pinWidth,r=e.handleDataPinClick,s=e.isDisabled,i=e.isNotationClassical,l=e.isOneOfMany,o=e.significance;return c.a.createElement("g",{key:t,onClick:r(t)},o&&c.a.createElement("text",{x:-25,y:20*t+20-3,className:Re("pinSignificance")},o),c.a.createElement("text",{x:0,y:20*t+20-3,className:Re("pinLabel",[a===$.ON&&"selected",s&&"disabled"])},a),c.a.createElement("rect",{x:0,y:20*t,height:20,width:n,className:Re("pinArea",[s&&"disabled"])}),c.a.createElement("line",{x1:0,y1:20*t+20,x2:80,y2:20*t+20,className:Re("pinLine",[i&&l?"short":"long"])}))},Ie=(a(56),d("CrossPinsNotation")),De=function(e){var t=e.pinWidth,a=e.isNotationClassical,r=e.numberOfPins,s=Object(n.useMemo)((function(){return 20*r/2+10}),[r]),i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=Object(n.useRef)(t);return Object(n.useEffect)((function(){a.current=e}),[e]),a.current}(a);return c.a.createElement(c.a.Fragment,null,c.a.createElement("line",{x1:t,y1:20,x2:t,y2:20*r,className:Ie("pinsDivider",[a?"visible":"invisible"])}),c.a.createElement("text",{x:45,y:s-3,className:Ie("pinsNumber",[a?"visible":"invisible"])},r),c.a.createElement("line",{x1:a?50:80,y1:s,x2:a?70:80,y2:s,className:Ie("crossNotation",[a?"visible":"invisible"])}),r>1&&c.a.createElement("line",{x1:t,y1:s,x2:80,y2:s,className:Ie("pinsNotation",[a&&(null===i||i===a?"visible":"visibleAnimated"),!a&&"invisible"])}))},Pe=(a(57),d("PinsBlock")),Be=function(e){var t=e.binaryData,a=e.setBinaryData,r=e.isDisabled,s=void 0!==r&&r,o=Object(n.useState)("".concat(t).split("")),m=Object(l.a)(o,2),d=m[0],u=m[1],b=d.length,h=Object(i.c)(Ee),p=Object(n.useMemo)((function(){return h?25:80}),[h]),E=Object(n.useMemo)((function(){return 105}),[]),y=Object(n.useCallback)((function(e){return Object(Me.a)(e,[0,d.length-1])}),[d]);Object(n.useEffect)((function(){t&&u("".concat(t).split(""))}),[t,u]);var O=Object(n.useCallback)((function(e){return function(){if(!s&&a){var t=0===Number(d[e])?$.ON:$.OFF,n=Object(f.a)(e,t,d);u(n),a(n.join(""))}}}),[d,s,a]),j=Object(n.useCallback)((function(e,t){var a=y(t)&&(0===t?"MSB":"LSB");return c.a.createElement(xe,{key:t,id:t,pinState:e,pinWidth:p,defaultPinWidth:80,isOneOfMany:b>1,isNotationClassical:h,significance:b>1&&a,handleDataPinClick:O,isDisabled:s})}),[s,b,y,O,h,p]);return c.a.createElement("div",{className:Pe()},c.a.createElement("svg",{className:Pe("list"),width:E,height:20*(b+1),viewBox:"-".concat(25," 0 ").concat(E," ").concat(20*(d.length+1))},d.map(j),c.a.createElement(De,{pinWidth:p,isNotationClassical:h,numberOfPins:b})))},We=d("MemoryControls"),Le=function(){var e=Object(i.c)(re),t=Object(i.c)(te),a=he(E),n=he(v),r=Object(i.c)(ae);return c.a.createElement("div",{className:We("dataBlock")},c.a.createElement("label",{className:We("dataLabel")},c.a.createElement("div",{className:We("dataMode")},c.a.createElement("span",{className:We("dataModeLabel")},e===Y?"Input: ":"Output: "),c.a.createElement("span",null,t)),c.a.createElement("div",null,"Decimal: ",parseInt(t,2)),c.a.createElement("div",{className:We("bitsWidth")},"width: ",r," bits"),c.a.createElement("div",{className:We("rangeWrapper",["data"])},c.a.createElement("input",{name:"dataLength",type:"range",min:1,max:8,defaultValue:r,onInput:function(e){return t=+e.target.value,n(q,t);var t}}))),c.a.createElement(Be,{binaryData:t,setBinaryData:function(e){return a(q,e)},isDisabled:e===F}))},Fe=d("MemoryControls"),Ye=function(){var e=Object(i.c)(de),t=Object(i.c)(ue),a=Object(i.c)(ne),n=Object(i.c)(je),r=Object(i.c)(oe),s=Object(i.c)(me),l=he(O),o=he(j),m=he(v),d=Math.max(a-e.length-t.length,0),u="".concat("0".repeat(d)).concat(e).concat(t);return c.a.createElement("div",{className:Fe("addressBlock")},c.a.createElement("label",{className:Fe("addressLabel")},c.a.createElement("div",null,"Address: ",u),c.a.createElement("div",null,"Decimal: ",parseInt(u,2)),c.a.createElement("div",{className:Fe("bitsWidth")},"width: ",a," bits"),c.a.createElement("div",{className:Fe("rangeWrapper",["address"])},c.a.createElement("input",{name:"addressLength",type:"range",min:2,max:8,step:2,defaultValue:a,onInput:function(e){var t,a=e.target;return t=+a.value,m(X,t)}}))),c.a.createElement("div",{className:Fe("addressPins")},!n&&c.a.createElement(Be,{binaryData:u,setBinaryData:function(e){l(Object(L.a)(0,e.length/2,e)),o(Object(L.a)(e.length/2,e.length,e))}}),n&&c.a.createElement(c.a.Fragment,null,Number(r)?c.a.createElement("div",{className:Fe("rowAddress")},c.a.createElement("span",{className:Fe("rowAddressLabel",[r===$.ON&&"active"])},"write",c.a.createElement("br",null),"row",c.a.createElement("br",null),"address"),c.a.createElement(Be,{binaryData:e,setBinaryData:l})):null,Number(s)?c.a.createElement("div",{className:Fe("colAddress")},c.a.createElement("span",{className:Fe("colAddressLabel",[s===$.ON&&"active"])},"write",c.a.createElement("br",null),"col",c.a.createElement("br",null),"address"),c.a.createElement(Be,{binaryData:t,setBinaryData:o})):null,c.a.createElement("div",{className:Fe("ras")},c.a.createElement("span",{className:Fe("rasLabel",[r===$.ON&&"active"])},"ras"),c.a.createElement(Be,{binaryData:r,isDisabled:!0})),c.a.createElement("div",{className:Fe("cas")},c.a.createElement("span",{className:Fe("casLabel",[s===$.ON&&"active"])},"cas"),c.a.createElement(Be,{binaryData:s,isDisabled:!0})))))},Ue=d("MemoryControls"),ze=function(){var e=Object(i.c)(re),t=Object(i.c)(ce),a=he(E),n=function(e){return a(J,e)},r=function(){a(K,t===U?z:U)};return c.a.createElement("div",null,c.a.createElement("div",{className:Ue("enabledBlock")},c.a.createElement("label",{onClick:r,className:Ue("enabledLabel",[t===U&&"enabled"])},"Enable"),c.a.createElement(Be,{binaryData:t,setBinaryData:r})),c.a.createElement("div",{className:Ue("readWriteBlock")},c.a.createElement("label",{className:Ue("readWriteLabel")},c.a.createElement("span",{className:Ue("read",[e===F&&"enabled"]),onClick:function(){return n(F)}},"Read"),"/",c.a.createElement("span",{className:Ue("write",[e===Y&&"enabled"]),onClick:function(){return n(Y)}},"Write")),c.a.createElement(Be,{binaryData:e,setBinaryData:n})))},He=d("MemoryControls"),Ve=function(){var e=Object(i.c)(ye),t=Object(i.c)(se),a=Object(i.c)(ie),r=Object(i.c)(le),s=he(M),o=function(){var e=he(y),t=Object(i.c)(se),a=Object(i.c)(le),c=Object(n.useRef)(null);Object(n.useEffect)((function(){return t===$.ON&&(c.current=setTimeout((function(){e($.OFF)}),500)),function(){return clearTimeout(c.current)}}),[t,a,e]);return[function(){a>0&&e($.ON)}]}(),m=Object(l.a)(o,1)[0];return c.a.createElement("div",{className:He("clockPinBlock",[e?"visible":"hidden"])},c.a.createElement("label",{className:He("clockLabel")},c.a.createElement("div",{onClick:m,className:He("clock",[t===$.ON&&"enabled"])},"Clock ",c.a.createElement("span",{className:He("currentTacts")},"(",r," cycles left)")),c.a.createElement("div",{className:He("tacts")},c.a.createElement("input",{type:"number",className:He("tactsNumber"),value:a,onChange:function(e){return s(+e.target.value)}})," ","Cycles ",c.a.createElement("span",{className:He("tactsNote")},"determined by the hardware producer"))),c.a.createElement(Be,{binaryData:t,setBinaryData:m}))},Ge=(a(58),d("MemoryControls")),qe=[{value:!1,label:"Default"},{value:!0,label:"Classical"}],Xe=function(){var e=he(g),t=Object(i.c)(Ee);return function(){var e=he(_),t=Object(i.c)(ae),a=Object(i.c)(D);Object(n.useEffect)((function(){Object(we.compose)(e,Object(Ne.a)((function(e){return Object(h.a)(Object(h.a)({},e),{},{datum:e.datum.padStart(t,$.OFF).slice(-t)})})))(a)}),[t,e])}(),ge(),c.a.createElement("span",{className:Ge()},c.a.createElement(Se,{containerClassName:Ge("viewOptions"),options:qe,selectedValue:t,handleSelect:e}),c.a.createElement(Le,null),c.a.createElement(Ye,null),c.a.createElement(ze,null),c.a.createElement(Ve,null))},Ke=(a(59),d("VisualizationSettings")),Je=function(){var e=Object(i.c)(ye),t=Object(i.c)(je),a=he(S),r=he(R),s=he(A);return Object(n.useEffect)((function(){e||r(0)}),[e,r]),c.a.createElement("div",{className:Ke()},c.a.createElement("label",{className:Ke("tacting")},c.a.createElement("input",{className:Ke("tactingInput"),type:"checkbox",checked:e,onChange:function(){return a(!e)}}),"Manual clock"),c.a.createElement("label",{className:Ke("rasCas")},c.a.createElement("input",{className:Ke("rasCasInput"),type:"checkbox",checked:t,onChange:function(){return s(!t)}}),"RAS / CAS"))},$e=a(11),Qe=(a(60),d("HowTo")),Ze=function(){return c.a.createElement("div",{className:Qe()},c.a.createElement("h3",{className:Qe("header")},"How to:"),c.a.createElement($e.a,null,c.a.createElement($e.b,{className:Qe("accordionItem")},c.a.createElement($e.d,null,c.a.createElement($e.c,{className:Qe("accordionButton")},"write into memory")),c.a.createElement($e.e,{className:Qe("accordionContent")},c.a.createElement("ol",{className:Qe("instruction")},c.a.createElement("li",null,"Pass the data to the input pins by clicking on the black lines in the Input block"),c.a.createElement("li",null,'Set "Enable" pin to 1 (click on a black line in Enable block), if it\'s currently in 0 state'),c.a.createElement("li",null,'Make sure "Read/Write" pin is currently in "write" state (click on a black line in Read/Write block, if not)'),c.a.createElement("li",null,"Pass the needed address to the address pins by clicking on the black lines in the Address block"),c.a.createElement("li",null,"Your data is now written into the memory bank :)")))),c.a.createElement($e.b,{className:Qe("accordionItem")},c.a.createElement($e.d,null,c.a.createElement($e.c,{className:Qe("accordionButton")},"read from memory")),c.a.createElement($e.e,{className:Qe("accordionContent")},c.a.createElement("ol",{className:Qe("instruction")},c.a.createElement("li",null,'Make sure "Read/Write" pin is currently in "read" state (click on a black line in Read/Write block, if not)'),c.a.createElement("li",null,'Set "Enable" pin to 1 (click on a black line in Enable block), if it\'s currently in 0 state'),c.a.createElement("li",null,"Pass the needed address to the address pins by clicking on the black lines in the Address block"),c.a.createElement("li",null,"The read data is now displayed on the data pins (black lines)")))),c.a.createElement($e.b,{className:Qe("accordionItem")},c.a.createElement($e.d,null,c.a.createElement($e.c,{className:Qe("accordionButton")},"write into memory with manual clock")),c.a.createElement($e.e,{className:Qe("accordionContent")},c.a.createElement("ol",{className:Qe("instruction")},c.a.createElement("li",null,'Tick "Manual clock" checkbox'),c.a.createElement("li",null,'Make sure "Read/Write" pin is currently in "write" state (click on a black line in Read/Write block, if not)'),c.a.createElement("li",null,'Set "Enable" pin to 1 (click on a black line in Enable block), if it\'s currently in 0 state'),c.a.createElement("li",null,"Pass the data to the input pins by clicking on the black lines in the Input block"),c.a.createElement("li",null,"Pass the desired address to the address pins by clicking on the black lines in the Address block"),c.a.createElement("li",null,'The data won\'t be written to the memory bank right away, because some predefined number of clock tacts should pass. To see it more explicitly, we will "tick" the clock manually. Click on the clock pin a predefined number of times (equal to the number of cycles indicated).'),c.a.createElement("li",null,"Your data is now written into the memory bank :)")))),c.a.createElement($e.b,{className:Qe("accordionItem")},c.a.createElement($e.d,null,c.a.createElement($e.c,{className:Qe("accordionButton")},"write into memory using RAS/CAS")),c.a.createElement($e.e,{className:Qe("accordionContent")},c.a.createElement("ol",{className:Qe("instruction")},c.a.createElement("li",null,'Tick "RAS/CAS" checkbox'),c.a.createElement("li",null,"Pass the data to the input pins by clicking on the black lines in the Input block"),c.a.createElement("li",null,'Set "Enable" pin to 1 (click on a black line in Enable block), if it\'s currently in 0 state'),c.a.createElement("li",null,'Make sure "Read/Write" pin is currently in "write" state (click on a black line in Read/Write block, if not)'),c.a.createElement("li",null,c.a.createElement("em",null,"RAS")," pin is now active. Pass the desired ",c.a.createElement("em",null,"row")," address to the address pins by clicking on the black lines in the Address block"),c.a.createElement("li",null,'"Tick" the clock manually: click on the clock pin a predefined number of times (equal to the number of cycles indicated).'),c.a.createElement("li",null,c.a.createElement("em",null,"CAS")," pin is now active. Pass the desired ",c.a.createElement("em",null,"column")," address to the address pins by clicking on the black lines in the Address block"),c.a.createElement("li",null,'"Tick" the clock manually: click on the clock pin (black line near Clock) a predefined number of times (equal to the number of cycles indicated).'),c.a.createElement("li",null,"Your data is now written into the memory bank :)"))))))},et=(a(61),d("RAMVisualization")),tt=function(){return c.a.createElement("div",{id:"playground",className:et()},c.a.createElement("div",{className:et("container")},c.a.createElement("header",{className:et("caption")},c.a.createElement("h2",null,"RAM Playground"),c.a.createElement(Je,null)),c.a.createElement("div",{className:et("content")},c.a.createElement("div",{className:et("main")},c.a.createElement("div",{className:et("memoryCircuit")},c.a.createElement("div",{className:et("pins")},c.a.createElement(Xe,null)),c.a.createElement("div",{className:et("memory")},c.a.createElement(_e,null))),c.a.createElement("div",{className:et("notes")},c.a.createElement("div",null,"\uff0a LSB - Least Significant Bit (right-most bit)"),c.a.createElement("div",null,"\uff0a MSB - Most Significant Bit (left-most bit)"))),c.a.createElement("div",{className:et("howTo")},c.a.createElement(Ze,null)))))},at=(a(62),d("ArticleSection")),nt=function(e){var t=e.children,a=e.name,n=e.displayedName;return c.a.createElement("div",{className:at(a)},c.a.createElement("div",{className:at("content")},t,c.a.createElement("label",{className:at("confirmation")},c.a.createElement("input",{type:"checkbox",className:at("checkbox")}),'I have finished reading the section "',n,'"')))},ct=a(34),rt=a.n(ct),st=a(35),it=a.n(st),lt=a(36),ot=a.n(lt),mt=a(37),dt=a.n(mt),ut=a(38),bt=a.n(ut),ht=a(39),ft=a.n(ht),pt=(a(63),d("RAMArticle")),Et=function(){return c.a.createElement("div",{className:pt()},c.a.createElement("section",{className:pt("preface")},c.a.createElement("h1",{className:pt("heading",["primary"])},"Random Access Memory [RAM]"),c.a.createElement("section",{className:pt("contents")},c.a.createElement("a",{className:pt("topicRef"),href:"#understandingRAM"},"Understanding RAM"),c.a.createElement("a",{className:pt("topicRef"),href:"#clockTimingsChapter"},"Clock Timings"),c.a.createElement("a",{className:pt("topicRef"),href:"#rasCasChapter"},"RAS and CAS"),c.a.createElement("a",{className:pt("topicRef",["emphasised"]),href:"#playground"},"Directly to RAM Playground"))),c.a.createElement(nt,{name:"introduction",displayedName:"Understanding RAM"},c.a.createElement("h2",{id:"understandingRAM",className:pt("heading",["secondary"])},"Understanding RAM"),c.a.createElement("p",{className:pt("paragraph")},'RAM (Random Access Memory) is a high-speed storage that computers utilize to temporarily store and access the working data. Each application we run on our computer requires some amount of temporary memory to operate efficiently. In simple terms, RAM is like a pocket, where computer keeps the frequently needed data, while keeping remaining stuff in the bag. The reason for this is that a computer can access this "pocket" with less time compared to opening the "bag" and getting things out of it. The term random access as applied to RAM comes from the fact that we can access any memory address directly and without any predefined order.'),c.a.createElement("p",{className:pt("paragraph")},"The major activities of CPU (Central Processing Unit) include reading from RAM and writing to RAM. Modern computer memory is organized in a set of rows and columns, much as a matrix. Similar to the matrix, memory is organized in a set of rows and columns. To write or read from the specific memory address, we need to send the desired address from the CPU to the memory. The address is passed to the memory in the binary form. Similarly, the data inside the memory is written & read and stored in the binary form. The information is transmitted between CPU and RAM using the buses. Bus is simply a collection of wires through which the data is transmitted. Each wire transmits a single stream of 0s and 1s. So bus can transmit as many bits simultaneously as many wires, or in other words lines, it has."),c.a.createElement("p",{className:pt("paragraph")},"There are such main categories of wires (buses) connecting the RAM to the CPU:",c.a.createElement("ul",null,c.a.createElement("li",null,"Address bus - sends bits of the selected memory address from the CPU to the memory."),c.a.createElement("li",null,"Data bus - is bidirectional, meaning it is used for both sending the actual data to the memory and getting the read data from the memory."),c.a.createElement("li",null,"Control bus with the following lines (wires):",c.a.createElement("ul",null,c.a.createElement("li",null,"Read / Write - instructs the memory that CPU would like to read data from the memory or write data into it;"),c.a.createElement("li",null,"Output enable - controls whether the memory snoops the address bus and can drive the data bus."))))),c.a.createElement("p",{className:pt("paragraph")},"The smallest atomic piece of memory is a memory cell which can store and retrieve just one bit of information, either 1 or 0. The main parts of the memory cell circuit are the so-called flip-flop (it remembers the data bit) and the so-called bi-directional bus transceiver (which controls the direction of data flow -- to the flip-flop of from it)."),c.a.createElement("img",{src:rt.a,className:pt("schema",["cellCircuit"])}),c.a.createElement("p",{className:pt("paragraph")},"Or course, storing one bit of information is not very useful. But we are not limited to one memory cell. We can put several elementary memory cells into a memory module and use an address to select one of them. For example, if we take 256 memory cells we need an 8-bit wide address bus to have the ability to point to each of our cells - to address it."),c.a.createElement("img",{src:it.a,className:pt("schema",["cellBlock"])}),c.a.createElement("p",{className:pt("paragraph")},"But, first of all, one bit is too few for most practical usages. Let us group several memory modules with 256 bits each in parallel. The same address is sent to each module selecting the same address. As a result, memory can read or write several bits at a time. For example, 8-bit memory means that such a memory module can read or write 8 bits -- one byte at a time."),c.a.createElement("img",{src:ot.a,className:pt("schema",["memoryBlocks"])}),c.a.createElement("p",{className:pt("paragraph")},"Instead of thinking of it as a series of individual memory modules and circuits, we will move to another level of abstraction and think of it as a uniform bank of addressable memory, which can store 2",c.a.createElement("sup",null,"M")," words of the length N bit, where M is the width of the address bus and N is the width of the data bus."),c.a.createElement("img",{src:dt.a,className:pt("schema",["memoryBank"])}),c.a.createElement("p",{className:pt("paragraph")},"Let us discuss a memory bank whose address bus has 8 address wires and data bus has 8 data wires. In this case the CPU can access 2^8 = 256 address locations. The address range is from 0000 0000 to 1111 1111, which represents a number in a range from 0 to 255 in decimal view. As there are 8 data wires, each location can keep 8 bits of data (1 byte). The data range is the same, from 0000 0000 to 1111 1111 (from 0 to 255).")),c.a.createElement(nt,{name:"clockTimings",displayedName:"Clock Timings"},c.a.createElement("h2",{id:"clockTimingsChapter",className:pt("heading",["secondary"])},"Clock Timings"),c.a.createElement("p",{className:pt("paragraph")},"Of course, passing of the information from CPU into RAM and vice versa is not executed immediately. It takes some time to send the information at a certain speed through the wires and read / write it to the memory. The delay which occurs in the data transmission as the data moves between CPU and RAM is called RAM latency. RAM latency is measured in terms of memory bus clock cycles. A clock cycle is a pulse used to synchronize the operations of the components of a CPU and other parts of the computer, such as a memory. The fewer clock cycles, the lower the latency. The lower the latency, the better. The speed at which the CPU or the memory can respond to the clock cycles is called its clock speed and is measured in hertz (Hz). One Hz equals to one cycle per second. The number of cycles per second depends on the specific hardware and is defined by its producers (you can find this information on the chips documentation). Today's personal computers run at a clock speed of several gigahertz."),c.a.createElement("p",{className:pt("paragraph")},"The type of RAM which has its operations orchestrated by an externally supplied clock signal is called SDRAM (Synchronous Dynamic random-access memory). So there is one more additional clock wire, which can either supply 1 or 0 to indicate the constant change of clock cycles.")),c.a.createElement(nt,{name:"rasCas",displayedName:"RAS and CAS"},c.a.createElement("h2",{id:"rasCasChapter",className:pt("heading",["secondary"])},"RAS and CAS"),c.a.createElement("p",{className:pt("paragraph")},"To this point, we were mainly talking about the memory address bus as a group of wires, which pass the index of the memory location in the binary format. But, in fact, similar to the matrix, memory is organized into a grid of rows and columns. So the address of some location is actually composed of its row and column address. To activate a row of RAM, we have to send the memory controller the address of the row we're interested in, and similarly, to activate a column, we have to send it the address of the column. These two addresses are then combined together."),c.a.createElement("img",{src:bt.a,className:pt("schema",["memoryBank"])}),c.a.createElement("p",{className:pt("paragraph")},"However, let us suppose that while we need 8 address bits, 8 address lines is too much for us for some reason. How can we optimise this? Instead of having 8 wires passing the whole address to the memory bank simultaneously, we can make use of only 4 address wires to first send 4 bits as a row number, and then using the same wires send 4 bits as a column number."),c.a.createElement("p",{className:pt("paragraph")},"That's why, besides the clock wire, the RAM circuit has two additional control wires. These are RAS (Row Access Strobe) and CAS (Column Access Strobe). When data is read or written into memory, the CPU activates the RAS line to specify the row of the desired location, and then, after some number of cycles, activates the CAS line to specify the column. Combined, the two signals give us the complete location address in DRAM, and only after that the data is actually read or written."),c.a.createElement("img",{src:ft.a,className:pt("schema",["memoryBank"])})))},yt=(a(64),d("App"));var Ot=function(){return c.a.createElement("div",{className:yt()},c.a.createElement(Et,null),c.a.createElement(tt,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(65);var jt=a(41),wt=a(40),Nt=Object(we.combineReducers)({memory:I,pinsInfo:ee,visualizationSettings:pe}),vt=a(13),gt=a.n(vt),kt=a(6),St=a(70),At=gt.a.mark(Dt),Tt=gt.a.mark(Pt),Ct=gt.a.mark(Bt),_t=gt.a.mark(Wt),Mt=gt.a.mark(Lt),Rt=gt.a.mark(Ft),xt=gt.a.mark(Yt),It=function(e){return new Promise((function(t){return setTimeout(t,e)}))};function Dt(e){var t,a,n;return gt.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return t=e.payload.address,c.next=3,Object(kt.d)(D);case 3:return a=c.sent,c.next=6,Object(kt.d)(ae);case 6:return n=c.sent,c.next=9,Object(kt.d)(ce);case 9:if(c.sent!==U){c.next=15;break}return c.next=13,Object(kt.c)(E(q,a[parseInt(t,2)].datum));case 13:c.next=16;break;case 15:Object(kt.c)(E(q,$.OFF.repeat(n)));case 16:case"end":return c.stop()}}),At)}function Pt(){return gt.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(kt.d)(ye);case 2:if(!e.sent){e.next=10;break}return e.next=6,Object(kt.b)(It,1e3);case 6:return e.next=8,Object(kt.c)(w(void 0));case 8:return e.next=10,Object(kt.c)(N(void 0));case 10:case"end":return e.stop()}}),Tt)}function Bt(){var e,t,a,n;return gt.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Object(kt.d)(ne);case 2:return e=c.sent,c.next=5,Object(kt.d)(ae);case 5:return t=c.sent,c.next=8,Object(kt.d)(D);case 8:if(a=c.sent,!e){c.next=13;break}return n=Object(St.a)((function(e){return e.map((function(e,t){return a[t]||e}))}),(function(e){return e.fill({isDirty:!1,datum:$.OFF.repeat(t)})}))(new Array(Math.pow(2,e))),c.next=13,Object(kt.c)(_(n));case 13:case"end":return c.stop()}}),Ct)}function Wt(e){return gt.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.payload.isEnabled){t.next=5;break}return t.next=3,Object(kt.c)(E(H,$.ON));case 3:return t.next=5,Object(kt.c)(S(!0));case 5:case"end":return t.stop()}}),_t)}function Lt(e){var t;return gt.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(!e.payload.isEnabled){a.next=6;break}return a.next=3,Object(kt.d)(ie);case 3:return t=a.sent,a.next=6,Object(kt.c)(R(t));case 6:return a.next=8,Object(kt.c)(w(void 0));case 8:return a.next=10,Object(kt.c)(N(void 0));case 10:case"end":return a.stop()}}),Mt)}function Ft(e){var t,a,n,c;return gt.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(kt.d)(le);case 2:return t=r.sent,a=e.payload,r.next=6,Object(kt.d)(je);case 6:if(n=r.sent,a!==$.ON){r.next=10;break}return r.next=10,Object(kt.c)(R(t-1));case 10:if(0!==t||a!==$.OFF){r.next=19;break}return r.next=13,Object(kt.d)(ie);case 13:return c=r.sent,r.next=16,Object(kt.c)(R(c));case 16:if(!n){r.next=19;break}return r.next=19,Object(kt.c)({type:"TOGGLE_RAS_CAS"});case 19:case"end":return r.stop()}}),Rt)}function Yt(){return gt.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(kt.a)([Object(kt.e)(["WRITE_DATUM_IN_MEMORY","READ_DATUM_FROM_MEMORY"],Pt),Object(kt.e)("READ_DATUM_FROM_MEMORY",Dt),Object(kt.e)("SET_IS_RAS_CAS_ENABLED",Wt),Object(kt.e)("SET_IS_TACTING_ENABLED",Lt),Object(kt.e)("SET_CLOCK_PIN",Ft),Object(kt.e)("SET_PINS_WIDTH",Bt)]);case 2:case"end":return e.stop()}}),xt)}var Ut=Object(jt.a)(),zt=Object(wt.composeWithDevTools)({}),Ht=function(){var e=Object(we.createStore)(Nt,zt(Object(we.applyMiddleware)(Ut)));return Ut.run(Yt),e}();s.a.render(c.a.createElement(i.a,{store:Ht},c.a.createElement(Ot,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[42,1,2]]]);
//# sourceMappingURL=main.dfce4fc4.chunk.js.map
(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{16:function(e,t,n){e.exports=n(40)},21:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),u=n(13),c=n.n(u),o=(n(21),n(14)),l=n(15),i=n(2),f=n(3),s=n.n(f),m="https://morning-lake-23452.herokuapp.com/api/persons",d=function(){return s.a.get(m).then((function(e){return e.data}))},b=function(e){return s.a.post(m,e).then((function(e){return e.data}))},p=function(e){return s.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},h=function(e,t){return s.a.put("".concat(m,"/").concat(e),t).then((function(e){return e.data})).catch((function(e){return console.log(e)}))},v=function(e){var t=e.message,n=e.status;if(null===t)return null;var r={color:"red"};return"success"===n&&(r={color:"green"}),a.a.createElement("div",{style:r}," ",t," ")},O=function(e){var t=e.person,n=e.delEntry;return a.a.createElement("div",null,t.name," : ",t.number," ",a.a.createElement("button",{onClick:function(){return function(e,t){window.confirm("Are you sure you want to delete ".concat(e.name))?p(e.id).then((function(n){return t(e)})).catch((function(n){return t(e,1)})):console.log("Do nothing")}(t,n)}}," Delete ")," ")},g=function(e){var t=e.text,n=e.onChange,r=e.value;return a.a.createElement("div",null,t,": ",a.a.createElement("input",{onChange:n,value:r}))};n(39);function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var j=function(){var e=Object(r.useState)([]),t=Object(i.a)(e,2),n=t[0],u=t[1],c=Object(r.useState)(""),f=Object(i.a)(c,2),s=f[0],m=f[1],p=Object(r.useState)(""),j=Object(i.a)(p,2),y=j[0],w=j[1],k=Object(r.useState)(""),P=Object(i.a)(k,2),S=P[0],C=P[1],x=Object(r.useState)(null),D=Object(i.a)(x,2),A=D[0],N=D[1],J=Object(r.useState)(null),L=Object(i.a)(J,2),T=L[0],B=L[1];Object(r.useEffect)((function(){d().then((function(e){return u(e)})).catch(u([]))}),[]);var F=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;1===t&&(N("".concat(e.name," was already deleted")),B(""),setTimeout((function(){B(null),N(null)}),2e3)),u(n.filter((function(t){return t.id!==e.id})))};return a.a.createElement("div",null,a.a.createElement("h2",null,"Phonebook"),a.a.createElement(v,{message:A,status:T}),a.a.createElement("form",{onSubmit:function(e){var t=!0,r=Object(l.a)(n).map((function(e){return e.name})),a=r.indexOf(s);if(-1!==a){if(window.confirm("".concat(s," is already added to the phonebook, entry update? 'Yes'/'No' "))){var c=n.find((function(e){return e.name===r[a]}));h(c.id,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(n,!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},c,{number:y})).then((function(e){return u(n.map((function(t){return t.id!==c.id?t:e})))}))}t=!1}if(t&&s.length>=1){e.preventDefault();var i={name:s,number:y,id:n.length+1};b(i).then((function(e){return N("Added ".concat(i.name)),B("success"),setTimeout((function(){N(null),B(null)}),2e3),m(""),w(""),u(n.concat(e)),null}))}else m(""),w(""),u(n)}},a.a.createElement("div",null,a.a.createElement(g,{text:"Filter",value:S,onChange:function(e){C(e.target.value)}}),a.a.createElement("h3",null,"Add new"),a.a.createElement(g,{text:"Name",value:s,onChange:function(e){m(e.target.value)}}),a.a.createElement(g,{text:"Number",value:y,onChange:function(e){w(e.target.value)}})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"Add"))),a.a.createElement("h3",null,"Numbers"),a.a.createElement("div",null,function(e){return e.filter((function(e){return-1!==e.name.toLowerCase().indexOf(S.toLowerCase())})).map((function(e,t){return a.a.createElement(O,{key:t,person:e,delEntry:F})}))}(n)))};c.a.render(a.a.createElement(j,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.f64b9d78.chunk.js.map
!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";function o(e,t){(t||0===t)&&(t instanceof HTMLElement?e.appendChild(t):"string"==typeof t||"number"==typeof t?e.appendChild(document.createTextNode(t.toString())):console.warn("Unknown type to append: ",t))}Object.defineProperty(t,"__esModule",{value:!0}),t.h=void 0,t.h=function(e,t,...n){if("function"==typeof e)return e(Object.assign(Object.assign({},t),{children:n}));const r=document.createElement(e);if(t){t.style&&"string"!=typeof t.style&&(!function(e,t){for(const n of Object.keys(e))Object.prototype.hasOwnProperty.call(t,n)&&(t[n]=e[n])}(t.style,r.style),delete t.style);for(const e of Object.keys(t)){const n=t[e];if(e.startsWith("on")){const t=e.replace(/Capture$/,""),o=e!==t,i=t.toLowerCase().substring(2);r.addEventListener(i,n,o)}else!0===n?r.setAttribute(e,e):(n||0===n)&&r.setAttribute(e,n.toString())}}return function(e,t){for(const n of t)Array.isArray(n)?n.forEach(t=>o(e,t)):o(e,n)}(r,n),r}},function(e,t,n){"use strict";t.__esModule=!0;var o=n(0),r=function(){function e(t,n,r){var i=this;if(this.pos=[0,0,0,0],!t||!("string"==typeof t||t instanceof HTMLElement))throw new TypeError("Message is not a string or HTMLElement!");if(!n||!("string"==typeof n||n instanceof HTMLElement))throw new TypeError("Message is not a string or HTMLElement!");var c=null!=r?r:e.generateID();this.id=c,this.dialog=o.h("div",{id:c,class:"dialog",style:{position:"absolute",left:"50%",top:"50%",background:"#c5c5c5"}},o.h("div",{id:c+"_titlebar",class:"dialog_titlebar",style:{background:"#dddddd",cursor:"move"},onMouseDown:function(e){i.pos[2]=e.clientX,i.pos[3]=e.clientY,document.onmouseup=function(){document.onmouseup=null,document.onmousemove=null},document.onmousemove=function(e){e.preventDefault(),i.pos[0]=i.pos[2]-e.clientX,i.pos[1]=i.pos[3]-e.clientY,i.pos[2]=e.clientX,i.pos[3]=e.clientY,i.dialog.style.top=i.dialog.offsetTop-i.pos[1]+"px",i.dialog.style.left=i.dialog.offsetLeft-i.pos[0]+"px"}}},n,o.h("button",{id:c+"_titlebar_closebtn",class:"dialog_titlebar_closebtn right"},"x")),t),document.body.appendChild(this.dialog),document.getElementById(c+"_titlebar_closebtn").onclick=function(){return i.cancel()}}return e.prototype.cancel=function(){this.dialog.remove()},e.generateID=function(){return"dialog_"+~~(9999*Math.random())},e}();t.Dialog=r,t.DefaultDialogControlButtons={confirm:"OK",cancel:"Cancel"}},function(e,t,n){"use strict";t.__esModule=!0;var o=n(3),r=n(4),i=n(0),c=document.getElementById("grid"),a=[[2,0,0,1,1],[1,1,0,1,1],[0,0,0,0,1],[0,1,1,0,1],[0,0,0,0,3]];c.innerHTML=a.map((function(e,t){return"<tr>"+e.map((function(e,n){return'<td id="X'+n+"Y"+t+'" class="cell '+{0:"path",1:"wall",2:"start",3:"end"}[e]+'"></td>'})).join("")+"</tr>"})).join("");var l={x:0,y:0},s=document.getElementById("X0Y0"),u=document.createElement("div");u.id="car",s.appendChild(u);var d=document.getElementById("moves"),f=!1;var p=[new(function(){function e(){this.name="Manual Control",this.description=""}return e.prototype.Pathfind=function(e){alert(this.name+" has been activated."),document.addEventListener("keydown",(function(t){t.repeat||(["ArrowUp","KeyW"].includes(t.code)?e(0,1):["ArrowDown","KeyS"].includes(t.code)?e(1,1):["ArrowLeft","KeyA"].includes(t.code)?e(2,1):["ArrowRight","KeyD"].includes(t.code)&&e(3,1))}))},e}()),new o.default];window.PATHFINDERS=p;for(var h=prompt("Choose a pathfinder algorithm (type the number in front):\n"+p.map((function(e,t){return t+": "+e.name})).join("\n"));!h||isNaN(+h)||p.length<=+h;)h=prompt("Invalid input! Please enter one of the numbers listed.\n\nChoose a pathfinder algorithm (type the number in front):\n"+p.map((function(e,t){return t+": "+e.name})).join("\n"));p[+h].Pathfind((function(e,t){var n;if(void 0===t&&(t=1),!f){var o={x:l.x,y:l.y};switch(e){case 0:console.log("going up by "+t),o.y-=t;break;case 1:console.log("going down by "+t),o.y+=t;break;case 2:console.log("going left by "+t),o.x-=t;break;case 3:console.log("going right by "+t),o.x+=t}return o.y<0||o.y>=a[0].length?console.error("Y coordinate out of bounds! Abandoning move."):o.x<0||o.x>=a.length?console.error("X coordinate out of bounds! Abandoning move."):(null===(n=document.getElementById("X"+o.x+"Y"+o.y))||void 0===n?void 0:n.classList.contains("wall"))?console.error("Target cell is a wall! Abandoning move."):(l=o,(s=document.getElementById("X"+l.x+"Y"+l.y)).appendChild(u),d.innerHTML=(+d.innerHTML+t).toString(),s.classList.contains("end")&&(setTimeout((function(){return alert("Goal reached in "+d.innerHTML+" moves!")}),100),f=!0),l)}}),a,l);var g=new Map;p.forEach((function(e,t){g.set(t.toString(),i.h("div",null,i.h("b",{style:{fontSize:"1.5em"}},e.name),",",i.h("p",null,e.description),","))}));var m=new r.SelectDialog("Select a pathfinder:","Pathfinder",g,console.log);window.dialog=m},function(e,t,n){"use strict";t.__esModule=!0;var o=function(){function e(){this.name="Brute Force",this.description="This pathfinder brute forces paths."}return e.prototype.Pathfind=function(e,t,n){for(alert(this.name+" has been activated.");3!==t[n.x][n.y];)e(DIRECTIONS)},e}();t.default=o},function(e,t,n){"use strict";var o,r=this&&this.__extends||(o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});t.__esModule=!0;var i=n(0),c=n(1),a=function(e){function t(t,n,o,r,a,l){var s=null!=l?l:c.Dialog.generateID(),u=[];return o.forEach((function(e,t){u.push(i.h("input",{type:"radio",id:"dialog_"+s+"_choices_"+t,name:"dialog_"+s+"_input",value:t})),u.push(i.h("label",{for:"dialog_"+s+"_choices_"+t},e))})),e.call(this,i.h("div",null,t,i.h("br",null),i.h("div",{id:"dialog_"+s+"_choices"},u)),n,(function(e){r(e.get("dialog_"+s+"_input"))}),a,s)||this}return r(t,e),t}(n(5).FormDialog);t.SelectDialog=a},function(e,t,n){"use strict";var o,r=this&&this.__extends||(o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});t.__esModule=!0;var i=n(0),c=n(1),a=function(e){function t(t,n,o,r,a){void 0===r&&(r=c.DefaultDialogControlButtons);var l=this,s=null!=a?a:c.Dialog.generateID();return l=e.call(this,i.h("form",{id:s+"_form"},t,i.h("br",null),i.h("div",{class:"right"},i.h("input",{id:s+"_form_cancel",type:"button",class:"cancel",value:r.cancel}),i.h("input",{id:s+"_form_submit",type:"submit",class:"submit",value:r.confirm}))),n,s)||this,document.getElementById(l.id+"_form_cancel").addEventListener("click",(function(){l.cancel()})),document.getElementById(s+"_form").addEventListener("submit",(function(e){e.preventDefault(),o(new FormData(e.target)),l.cancel()})),l}return r(t,e),t}(c.Dialog);t.FormDialog=a}]);
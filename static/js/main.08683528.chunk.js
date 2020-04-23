(this.webpackJsonprollcrits=this.webpackJsonprollcrits||[]).push([[0],{280:function(e,t,a){e.exports=a(488)},285:function(e,t,a){},286:function(e,t,a){},488:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(14),i=a.n(o),l=(a(285),a(96)),c=a(130),u=a(131),s=a(150),d=a(145),m=a(497),h=a(500),f=a(502);a(286);function v(e){return btoa(JSON.stringify(e))}var b=a(514),p=a(510),g=a(511),k=a(499),E=a(506);function y(e){return r.a.createElement(k.a.Item,{label:e.label},r.a.createElement(E.a,{value:e.count,min:0,onChange:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;e.onChange(Number.isInteger(t)?t:e.count)}}))}var x,C=function(e){Object(s.a)(a,e);var t=Object(d.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){var e=this,t=this.props.dice;return r.a.createElement(k.a,{labelCol:{xs:{span:24},sm:{span:8}}},r.a.createElement(y,{label:"Red",count:t.red,onChange:function(t){return e.updateDice({red:t})}}),r.a.createElement(y,{label:"Black",count:t.black,onChange:function(t){return e.updateDice({black:t})}}),r.a.createElement(y,{label:"White",count:t.white,onChange:function(t){return e.updateDice({white:t})}}))}},{key:"updateDice",value:function(e){this.props.onChanged(Object(l.a)({},this.props.dice,{},e))}}]),a}(r.a.Component),S=a(148),w=a(505),O=a(503),I=a(509),W=a(110),j=a(498),D=[{name:"B1 Battle Droid",toWound:5/6,armor:!1},{name:"B2 Battle Droid",toWound:5/6,armor:1},{name:"Rebel Trooper",toWound:4/6,armor:!1},{name:"Stormtrooper",toWound:.5,armor:!1},{name:"Deathtrooper",toWound:2/6,armor:!1},{name:"Rebel AT-RT",toWound:5/6,armor:!0},{name:"X-34 Landpseeder",toWound:4/6,armor:2},{name:"T-47 Airspeeder",toWound:4/6,armor:!0},{name:"Dewback Rider",toWound:.5,armor:1},{name:"Occupier Tank",toWound:.5,armor:!0}],M=function(e){var t,a=W.mean(e.data.map((function(e){return e.netHits}))),n=W.mean(e.data.map((function(e){return e.netCrits}))),o=[],i=Object(S.a)(D);try{for(i.s();!(t=i.n()).done;){var l=t.value,c=a,u=n;l.armor&&(c=!0===l.armor?0:Math.max(0,c-l.armor));var s=c+u,d=Math.max(0,s-0)*l.toWound,m=Math.max(0,s-1)*l.toWound,h=Math.max(0,s-2)*l.toWound;o.push({name:l.name,cover0:d.toFixed(1),cover1:m.toFixed(1),cover2:h.toFixed(1)})}}catch(f){i.e(f)}finally{i.f()}return r.a.createElement(j.a,{bordered:!0,columns:[{title:"Defending",key:"name",dataIndex:"name"},{title:"No Cover",key:"cover0",dataIndex:"cover0"},{title:"Cover 1",key:"cover1",dataIndex:"cover1"},{title:"Cover 2",key:"cover2",dataIndex:"cover2"}],dataSource:o,pagination:!1,size:"small"})},T=a(263);!function(e){e[e.blank=0]="blank",e[e.surge=1]="surge",e[e.hit=2]="hit",e[e.crit=3]="crit"}(x||(x={}));var N={white:[x.crit,x.surge,x.hit,x.blank,x.blank,x.blank,x.blank,x.blank],black:[x.crit,x.surge,x.hit,x.hit,x.hit,x.blank,x.blank,x.blank],red:[x.crit,x.surge,x.hit,x.hit,x.hit,x.hit,x.hit,x.blank]};var H=function(e){var t,a=function(e){for(var t=[],a=new T.a,n=0;n<e.iterations;n++){for(var r=[],o=0;o<e.attackPool.red;o++)r.push(a.nextArrayItem(N.red));for(var i=0;i<e.attackPool.black;i++)r.push(a.nextArrayItem(N.black));for(var l=0;l<e.attackPool.white;l++)r.push(a.nextArrayItem(N.white));for(var c=0,u=0,s=0,d=r;s<d.length;s++){var m=d[s];m===x.crit?u++:m===x.hit?c++:m===x.surge&&("crit"===e.attackModifiers.surge?u++:"hit"===e.attackModifiers.surge&&c++)}t.push({netHits:c,netCrits:u})}return t}(e.simulate),n={},o=new Set,i=Object(S.a)(a);try{for(i.s();!(t=i.n()).done;){var l=t.value,c=l.netCrits+l.netHits;n[c]=(n[c]||0)+1,o.add(c)}}catch(u){i.e(u)}finally{i.f()}return r.a.createElement(r.a.Fragment,null,r.a.createElement(w.a,{animate:{duration:1e3},domainPadding:{x:15},height:200},r.a.createElement(O.a,{data:Object.entries(n).map((function(e){return{x:e[0],y:e[1]}})),labels:function(e){var t=e.datum;return"".concat((t.y/a.length*100).toFixed(0),"%")},style:{data:{fill:"tomato"}}}),r.a.createElement(I.a,{label:"\u03bc Hits: ".concat(W.mean(a.map((function(e){return e.netHits+e.netCrits}))).toFixed(1)),style:{axisLabel:{padding:30}}})),r.a.createElement(M,{data:a}))},F=a(113),P=F.a.Option,B=function(e){return r.a.createElement(k.a,{layout:"inline"},r.a.createElement(k.a.Item,{label:"Surge"},r.a.createElement(F.a,{value:e.modifiers.surge,onChange:function(t){e.onChanged(Object(l.a)({},e.modifiers,{surge:t}))}},r.a.createElement(P,{value:"none"},"None"),r.a.createElement(P,{value:"hit"},"Hit"),r.a.createElement(P,{value:"crit"},"Crit"))))},J=m.a.Sider,R=function(e){Object(s.a)(a,e);var t=Object(d.a)(a);function a(e){var n;Object(c.a)(this,a),n=t.call(this,e);var r=JSON.parse(JSON.stringify(a.defaultState));return n.state=Object(l.a)({},r,{},function(e){var t=window.location.hash;if(t){var a=t.indexOf("#");if(-1!==a&&(t=t.substring(a+1)),t&&t.length)return JSON.parse(atob(t))}}(window.location.hash)),n}return Object(u.a)(a,[{key:"encodeStateIfChanged",value:function(){var e=v(this.state);e===a.defaultEncodedState?window.location.hash="":window.location.hash=e}},{key:"iterationsToSlider",value:function(e){return e.toString().length-1}},{key:"slideToIterations",value:function(e){switch(e){case 1:return 10;case 2:return 100;case 3:return 1e3;case 4:return 1e4;case 5:return 1e5;default:return a.defaultState.iterations}}},{key:"render",value:function(){var e=this;return this.encodeStateIfChanged(),r.a.createElement(m.a,{style:{height:"100vh"}},r.a.createElement(J,{breakpoint:"lg",collapsedWidth:"0",width:"250px"},r.a.createElement("div",{className:"logo"},r.a.createElement("strong",null,"RollCrits")," #",a.shortHash),r.a.createElement(h.a,{title:r.a.createElement("span",null,r.a.createElement(b.a,null),r.a.createElement("span",null," Settings"))},"Iterations",r.a.createElement(f.a,{min:1,max:5,marks:{1:"10",3:"1000",5:"100000"},value:this.iterationsToSlider(this.state.iterations),tipFormatter:this.slideToIterations.bind(this),onChange:function(t){return e.setState({iterations:e.slideToIterations(t)})}})),r.a.createElement(h.a,{title:r.a.createElement("span",null,r.a.createElement(p.a,null),r.a.createElement("span",null," Dice"))},r.a.createElement(C,{dice:this.state.attackPool,onChanged:function(t){e.setState({attackPool:t})}})),r.a.createElement(h.a,{title:r.a.createElement("span",null,r.a.createElement(g.a,null),r.a.createElement("span",null," Modifiers"))},r.a.createElement(B,{modifiers:this.state.attackModifiers,onChanged:function(t){e.setState({attackModifiers:t})}}))),r.a.createElement(m.a,null,r.a.createElement(m.a.Content,{style:{margin:"24px 16px 0"}},r.a.createElement("div",{className:"content-module"},r.a.createElement(H,{simulate:this.state})))))}}]),a}(r.a.Component);R.defaultState={attackPool:{red:1,black:1,white:1},attackModifiers:{surge:"none"},iterations:1e4},R.defaultEncodedState=v(R.defaultState),R.shortHash="a7b4b0c";var A=R;i.a.render(r.a.createElement(A,null),document.getElementById("root"))}},[[280,1,2]]]);
//# sourceMappingURL=main.08683528.chunk.js.map
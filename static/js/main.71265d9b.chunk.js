(this.webpackJsonprollcrits=this.webpackJsonprollcrits||[]).push([[0],{278:function(e,t,a){e.exports=a(486)},283:function(e,t,a){},284:function(e,t,a){},486:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(14),l=a.n(r),o=(a(283),a(87)),s=a(88),c=a(147),u=a(143),h=a(494),d=a(497),m=a(500);a(284);function f(e){return btoa(JSON.stringify(e))}var b=a(509),k=a(506),p=a(273),g=a(496),v=a(503);function E(e){return i.a.createElement(g.a.Item,{label:e.label},i.a.createElement(v.a,{value:e.count,min:0,onChange:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;e.onChange(Number.isInteger(t)?t:e.count)}}))}var y,w=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e=this,t=this.props.dice;return i.a.createElement(g.a,{labelCol:{xs:{span:24},sm:{span:8}}},i.a.createElement(E,{label:"Red",count:t.red,onChange:function(t){return e.updateDice({red:t})}}),i.a.createElement(E,{label:"Black",count:t.black,onChange:function(t){return e.updateDice({black:t})}}),i.a.createElement(E,{label:"White",count:t.white,onChange:function(t){return e.updateDice({white:t})}}))}},{key:"updateDice",value:function(e){this.props.onChanged(Object(p.a)({},this.props.dice,{},e))}}]),a}(i.a.Component),x=a(245),S=a(495),O=a(508),C=a(102),I=a(499),F=a(505),j=a(502);!function(e){e[e.blank=0]="blank",e[e.surge=1]="surge",e[e.hit=2]="hit",e[e.crit=3]="crit"}(y||(y={}));var M=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new x.a;Object(o.a)(this,e),this.rng=t}return Object(s.a)(e,[{key:"white",value:function(){return this.rng.nextArrayItem(e.table.white)}},{key:"black",value:function(){return this.rng.nextArrayItem(e.table.black)}},{key:"red",value:function(){return this.rng.nextArrayItem(e.table.red)}}]),e}();M.table={white:[y.crit,y.surge,y.hit,y.blank,y.blank,y.blank,y.blank,y.blank],black:[y.crit,y.surge,y.hit,y.hit,y.hit,y.blank,y.blank,y.blank],red:[y.crit,y.surge,y.hit,y.hit,y.hit,y.hit,y.hit,y.blank]};var P=function(e){for(var t=[],a=new M,n=function(n){for(var i=0,r=function(e){e!==y.blank&&e!==y.surge&&i++},l=0;l<e.dice.white;l++)r(a.white());for(var o=0;o<e.dice.black;o++)r(a.black());for(var s=0;s<e.dice.red;s++)r(a.red());t.push(i)},r=0;r<e.iterations;r++)n();for(var l={},o=new Set,s=0,c=t;s<c.length;s++){var u=c[s];l[u]=(l[u]||0)+1,o.add(u)}return i.a.createElement(i.a.Fragment,null,i.a.createElement(I.a,{theme:F.a.material,animate:{duration:1e3},height:200},i.a.createElement(j.a,{data:Object.entries(l).map((function(e){return{x:e[0],y:e[1]}}))})),i.a.createElement(S.a,{bordered:!0,columns:[{title:"Type",dataIndex:"type",width:30,key:"type"},{title:"Hits",dataIndex:"hits",width:30,key:"hits"},{title:i.a.createElement(i.a.Fragment,null,i.a.createElement(O.a,null),"\xa0Details"),dataIndex:"details",key:"Details"}],pagination:!1,dataSource:[{key:"Mean",type:"Mean",hits:C.mean(t).toFixed(2),details:i.a.createElement(i.a.Fragment,null,"Known as the ",i.a.createElement("em",null,"average"),", or the sum of all values over the number of all values.")},{key:"Mode",type:"Mode",hits:C.mode(t).toFixed(2),details:i.a.createElement(i.a.Fragment,null,"The"," ",i.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Mode_(statistics)",rel:"_blank",title:"Learn more about the mode in statistics"},"mode")," ","is the most ",i.a.createElement("em",null,"commonly")," seen result in the simulation.")},{key:"Median",type:"Median",hits:C.median(t).toFixed(2),details:i.a.createElement(i.a.Fragment,null,"The"," ",i.a.createElement("a",{href:"http://en.wikipedia.org/wiki/Median",rel:"_blank",title:"Learn more about the median in statistics"},"median")," ","is the middle number - useful when outliners skew the mean.")},{key:"P50",type:"P50",hits:C.quantile(t,.5).toFixed(2),details:i.a.createElement(i.a.Fragment,null,"50% of results will exceed this estimate.")},{key:"P90",type:"P90",hits:C.quantile(t,1-.9).toFixed(2),details:i.a.createElement(i.a.Fragment,null,"90% of results will exceed this estimate.")}]}))},T=h.a.Sider,D=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state=function(e){var t=window.location.hash;if(t){var a=t.indexOf("#");if(-1!==a&&(t=t.substring(a+1)),t&&t.length)return JSON.parse(atob(t))}}(window.location.hash)||JSON.parse(JSON.stringify(a.defaultState)),n}return Object(s.a)(a,[{key:"encodeStateIfChanged",value:function(){var e=f(this.state);e===a.defaultEncodedState?window.location.hash="":window.location.hash=e}},{key:"iterationsToSlider",value:function(e){return e.toString().length-1}},{key:"slideToIterations",value:function(e){switch(e){case 1:return 10;case 2:return 100;case 3:return 1e3;case 4:return 1e4;case 5:return 1e5;default:return a.defaultState.iterations}}},{key:"render",value:function(){var e=this;return this.encodeStateIfChanged(),i.a.createElement(h.a,{style:{height:"100vh"}},i.a.createElement(T,{breakpoint:"lg",collapsedWidth:"0",width:"250px"},i.a.createElement("div",{className:"logo"},"RollCrits"),i.a.createElement(d.a,{title:i.a.createElement("span",null,i.a.createElement(b.a,null),i.a.createElement("span",null," Settings"))},"Iterations",i.a.createElement(m.a,{min:1,max:5,marks:{1:"10",3:"1000",5:"100000"},value:this.iterationsToSlider(this.state.iterations),tipFormatter:this.slideToIterations.bind(this),onChange:function(t){return e.setState({iterations:e.slideToIterations(t)})}})),i.a.createElement(d.a,{title:i.a.createElement("span",null,i.a.createElement(k.a,null),i.a.createElement("span",null," Dice"))},i.a.createElement(w,{dice:this.state.attackPool,onChanged:function(t){e.setState({attackPool:t})}}))),i.a.createElement(h.a,null,i.a.createElement(h.a.Content,{style:{margin:"24px 16px 0"}},i.a.createElement("div",{className:"content-module"},i.a.createElement(P,{dice:this.state.attackPool,iterations:this.state.iterations})))))}}]),a}(i.a.Component);D.defaultState={attackPool:{red:1,black:1,white:1},iterations:1e4},D.defaultEncodedState=f(D.defaultState),D.shortHash="75a1492";var N=D;l.a.render(i.a.createElement(N,null),document.getElementById("root"))}},[[278,1,2]]]);
//# sourceMappingURL=main.71265d9b.chunk.js.map
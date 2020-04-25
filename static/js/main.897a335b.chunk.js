(this.webpackJsonprollcrits=this.webpackJsonprollcrits||[]).push([[0],{288:function(e,t,a){e.exports=a(500)},293:function(e,t,a){},294:function(e,t,a){},500:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(16),c=a.n(i),l=(a(293),a(88)),o=a(52),s=a(41),u=a(158),h=a(154),d=a(508),m=a(511),f=a(510),g=a(110),b=a(46),v=a(53),k=a(524),p=a(522),E=a(526),w=(a(294),a(69));(new w.a).nextString(10);function y(e){return btoa(JSON.stringify(e))}var O=a(518);function S(e){return r.a.createElement(f.a.Item,{label:e.label},r.a.createElement(O.a,{value:e.count,min:0,onChange:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;e.onChange(Number.isInteger(t)?t:e.count)}}))}var C,j,x=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e=this,t=this.props.dice;return r.a.createElement(f.a,{labelCol:{xs:{span:24},sm:{span:8}}},r.a.createElement(S,{label:"Red",count:t.red,onChange:function(t){return e.updateDice({red:t})}}),r.a.createElement(S,{label:"Black",count:t.black,onChange:function(t){return e.updateDice({black:t})}}),r.a.createElement(S,{label:"White",count:t.white,onChange:function(t){return e.updateDice({white:t})}}))}},{key:"updateDice",value:function(e){this.props.onChanged(Object(l.a)({},this.props.dice,{},e))}}]),a}(r.a.Component),D=a(80),I=a(517),M=a(514),N=a(521),H=a(146),R=a(509);!function(e){e.blank="blank",e.surge="surge",e.hit="hit",e.crit="crit"}(C||(C={})),function(e){e.blank="blank",e.surge="surge",e.block="block"}(j||(j={}));var T={white:[C.crit,C.surge,C.hit,C.blank,C.blank,C.blank,C.blank,C.blank],black:[C.crit,C.surge,C.hit,C.hit,C.hit,C.blank,C.blank,C.blank],red:[C.crit,C.surge,C.hit,C.hit,C.hit,C.hit,C.hit,C.blank]},A={white:[j.block,j.surge,j.blank,j.blank,j.blank,j.blank],red:[j.block,j.block,j.block,j.surge,j.blank,j.blank]},B=function(){function e(t){Object(o.a)(this,e),this.sides=t}return Object(s.a)(e,null,[{key:"red",value:function(){return new e(T.red)}},{key:"black",value:function(){return new e(T.black)}},{key:"white",value:function(){return new e(T.white)}}]),Object(s.a)(e,[{key:"roll",value:function(e){return e.nextArrayItem(this.sides)}}]),e}(),J=function(){function e(t){Object(o.a)(this,e),this.sides=t}return Object(s.a)(e,null,[{key:"red",value:function(){return new e(A.red)}},{key:"white",value:function(){return new e(A.white)}}]),Object(s.a)(e,[{key:"roll",value:function(e){return e.nextArrayItem(this.sides)}}]),e}(),F=function(){function e(t,a,n){Object(o.a)(this,e),this.rng=t,this.rolled=a,this.modifiers=n}return Object(s.a)(e,[{key:"aggregateDice",value:function(){var e,t=0,a=0,n=Object(D.a)(this.rolled);try{for(n.s();!(e=n.n()).done;){switch(e.value){case C.crit:a++;break;case C.hit:t++;break;case C.surge:switch(this.modifiers.surge){case"crit":a++;break;case"hit":t++}break;case C.blank:}}}catch(r){n.e(r)}finally{n.f()}return{hits:t,crits:a}}},{key:"hits",value:function(e,t){var a=this.aggregateDice(),n=a.hits,r=a.crits;if(n=Math.max(0,n-e),t.armor){var i=Math.min(n,this.modifiers.impact);n-=i,r+=i,n=!0===t.armor?0:Math.max(0,n-t.armor)}return new P(this.rng,n+r,t)}},{key:"rawTotalHits",get:function(){var e=this.aggregateDice();return e.hits+e.crits}}]),e}(),P=function(){function e(t,a,n){Object(o.a)(this,e),this.rng=t,this.hits=a,this.stats=n}return Object(s.a)(e,[{key:"generateDefenseDice",value:function(){return Array(this.hits).fill(this.stats.dice)}},{key:"wounds",value:function(){var e,t=0,a=Object(D.a)(this.generateDefenseDice());try{for(a.s();!(e=a.n()).done;){switch(e.value.roll(this.rng)){case j.block:t++;break;case j.surge:this.stats.surges&&t++;break;case j.blank:}}}catch(n){a.e(n)}finally{a.f()}return Math.max(0,this.hits-t)}}]),e}(),z=function(){function e(t){Object(o.a)(this,e),this.config=t,this.rng=void 0,this.rng=new w.a(t.rngSeed)}return Object(s.a)(e,[{key:"generateAttackDice",value:function(){for(var e=[],t=this.config.attackPool,a=0;a<t.red;a++)e.push(B.red());for(var n=0;n<t.black;n++)e.push(B.black());for(var r=0;r<t.white;r++)e.push(B.white());return e}},{key:"simulate",value:function(){for(var e=this,t=Array(this.config.iterations),a=0;a<t.length;a++){var n=this.generateAttackDice().map((function(t){return t.roll(e.rng)}));t[a]=new F(this.rng,n,this.config.attackModifiers)}return t}}]),e}(),L=[{name:"B1 Battle Droid",dice:J.white()},{name:"B2 Battle Droid",dice:J.white(),armor:1},{name:"Rebel Trooper",dice:J.white(),surges:!0},{name:"Stormtrooper",dice:J.red()},{name:"Deathtrooper",dice:J.red(),surges:!0},{name:"Rebel AT-RT",dice:J.white(),armor:!0},{name:"X-34 Landpseeder",dice:J.white(),surges:!0,armor:2},{name:"AT-ST",dice:J.white(),surges:!0,armor:!0},{name:"Dewback Rider",dice:J.red(),armor:1},{name:"Occupier Tank",dice:J.red(),armor:!0}],W=function(e){var t,a=[],n=Object(D.a)(L);try{for(n.s();!(t=n.n()).done;){for(var i=t.value,c=[[],[],[]],l=0;l<c.length;l++){var o,s=Object(D.a)(e.data);try{for(s.s();!(o=s.n()).done;){var u=o.value;c[l].push(u.hits(l,i).wounds())}}catch(d){s.e(d)}finally{s.f()}}var h=c.map((function(e){return H.mean(e).toFixed(2)}));a.push({key:i.name,cover0:h[0],cover1:h[1],cover2:h[2]})}}catch(d){n.e(d)}finally{n.f()}return r.a.createElement(R.a,{bordered:!0,columns:[{title:"Defending",key:"nakeyme",dataIndex:"key"},{title:"No Cover",key:"cover0",dataIndex:"cover0"},{title:"Cover 1",key:"cover1",dataIndex:"cover1"},{title:"Cover 2",key:"cover2",dataIndex:"cover2"}],dataSource:a,pagination:!1,size:"small"})},G=function(e){var t,a=new z(e.simulate).simulate(),n={},i=new Set,c=Object(D.a)(a);try{for(c.s();!(t=c.n()).done;){var l=t.value.rawTotalHits;n[l]=(n[l]||0)+1,i.add(l)}}catch(o){c.e(o)}finally{c.f()}return r.a.createElement(r.a.Fragment,null,r.a.createElement(I.a,{animate:{duration:1e3},domainPadding:{x:15},height:200},r.a.createElement(M.a,{data:Object.entries(n).map((function(e){return{x:e[0],y:e[1]}})),labels:function(e){var t=e.datum;return"".concat((t.y/a.length*100).toFixed(0),"%")},style:{data:{fill:"tomato"}}}),r.a.createElement(N.a,{label:"\u03bc Hits: ".concat(H.mean(a.map((function(e){return e.rawTotalHits}))).toFixed(1)),style:{axisLabel:{padding:30}}})),r.a.createElement(W,{data:a,mods:{impact:e.simulate.attackModifiers.impact}}))},X=a(125),q=X.a.Option,K=function(e){return r.a.createElement(f.a,{labelCol:{xs:{span:24},sm:{span:8}}},r.a.createElement(f.a.Item,{label:"Surge"},r.a.createElement(X.a,{value:e.modifiers.surge,onChange:function(t){e.onChanged(Object(l.a)({},e.modifiers,{surge:t}))}},r.a.createElement(q,{value:"none"},"None"),r.a.createElement(q,{value:"hit"},"Hit"),r.a.createElement(q,{value:"crit"},"Crit"))),r.a.createElement(f.a.Item,{label:"Impact"},r.a.createElement(O.a,{value:e.modifiers.impact,min:0,onChange:function(t){e.onChanged(Object(l.a)({},e.modifiers,{impact:0===t?0:t||e.modifiers.impact}))}})))},Q=a(513);function U(e){switch(e){case 1:return 10;case 2:return 100;case 3:return 1e3;case 4:return 1e4;case 5:return 1e5;default:return te.defaultState.iterations}}var V=function(e){return r.a.createElement(Q.a,{min:1,max:5,marks:{1:"10",3:"1000",5:"100000"},value:(t=e.value,t.toString().length-1),tipFormatter:U,onChange:function(t){return e.onChanged(U(t))}});var t},Y=a(516),Z=a(525),$=function(e){return r.a.createElement(g.a,null,r.a.createElement(b.a,{span:18},r.a.createElement(Y.a,{value:e.value,maxLength:10,onChange:function(t){return e.onChanged(t.target.value)}})),r.a.createElement(b.a,{span:2,offset:2},r.a.createElement(v.a,{icon:r.a.createElement(Z.a,null),title:"Randomize",onClick:function(){return e.onChanged((new w.a).nextString(10))}})))},_=d.a.Sider,ee=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var n;Object(o.a)(this,a),n=t.call(this,e);var r=JSON.parse(JSON.stringify(a.defaultState));return n.state=Object(l.a)({},r,{},function(e){var t=window.location.hash;if(t){var a=t.indexOf("#");if(-1!==a&&(t=t.substring(a+1)),t&&t.length)return JSON.parse(atob(t))}}(window.location.hash)),n}return Object(s.a)(a,[{key:"encodeStateIfChanged",value:function(){var e=y(this.state);e===a.defaultEncodedState?window.location.hash="":window.location.hash=e}},{key:"render",value:function(){var e=this;return this.encodeStateIfChanged(),r.a.createElement(d.a,{style:{minHeight:"100vh",height:"100%"}},r.a.createElement(_,{breakpoint:"lg",collapsedWidth:"0",width:"250px",style:{minHeight:"100vh",height:"100%"}},r.a.createElement("div",{className:"logo"},r.a.createElement("strong",null,"RollCrits")," #",a.shortHash),r.a.createElement(m.a,{title:r.a.createElement("span",null,r.a.createElement(k.a,null),r.a.createElement("span",null," Settings"))},r.a.createElement(f.a,{layout:"vertical"},r.a.createElement(f.a.Item,{label:"Iterations"},r.a.createElement(V,{value:this.state.iterations,onChanged:function(t){return e.setState({iterations:t})}})),r.a.createElement(f.a.Item,{label:"RNG Seed"},r.a.createElement($,{value:this.state.rngSeed,onChanged:function(t){return e.setState({rngSeed:t})}})),r.a.createElement(g.a,null,r.a.createElement(b.a,{span:24},r.a.createElement(v.a,{block:!0,disabled:!window.location.hash,type:"danger",onClick:function(){e.setState(a.defaultState)}},"Reset"))))),r.a.createElement(m.a,{title:r.a.createElement("span",null,r.a.createElement(p.a,null),r.a.createElement("span",null," Dice"))},r.a.createElement(x,{dice:this.state.attackPool,onChanged:function(t){e.setState({attackPool:t})}})),r.a.createElement(m.a,{title:r.a.createElement("span",null,r.a.createElement(E.a,null),r.a.createElement("span",null," Modifiers"))},r.a.createElement(K,{modifiers:this.state.attackModifiers,onChanged:function(t){e.setState({attackModifiers:t})}}))),r.a.createElement(d.a,null,r.a.createElement(d.a.Content,{style:{margin:"24px 16px 0"}},r.a.createElement("div",{className:"content-module"},r.a.createElement(G,{simulate:this.state})))))}}]),a}(r.a.Component);ee.defaultState=Object.freeze({attackPool:{red:1,black:1,white:1},attackModifiers:{impact:0,surge:"none"},iterations:1e4,rngSeed:"".concat((new w.a).nextString(10))}),ee.defaultEncodedState=y(ee.defaultState),ee.shortHash="ce722d4";var te=ee;c.a.render(r.a.createElement(te,null),document.getElementById("root"))}},[[288,1,2]]]);
//# sourceMappingURL=main.897a335b.chunk.js.map
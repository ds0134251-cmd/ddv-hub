/* DDV Game Hub — общий модуль: темы, анимированные фоны, релакс-движок. Создатель: ddv_7202 */
const U=(()=>{let d={th:0,sc:0,rv:.8,rm:{},sp:1,px:1,pt:0};try{Object.assign(d,JSON.parse(localStorage.getItem('nsui')))}catch(e){}return d})();
const usave=()=>{try{localStorage.setItem('nsui',JSON.stringify(U))}catch(e){}};
const THEMES=[
{n:'Неон',c:['#00f0ff','#ff2bd6','#ffe14a'],bg:'#07040f'},{n:'Закат',c:['#ffb347','#ff5e62','#ffe29a'],bg:'#140808'},
{n:'Океан',c:['#4ee1ff','#3a7bff','#9bffd8'],bg:'#041018'},{n:'Мята',c:['#7dffb2','#2dd4bf','#eaff8a'],bg:'#041410'},
{n:'Сакура',c:['#ff9ecb','#c77dff','#fff1a8'],bg:'#120714'},{n:'Лёд',c:['#bfe9ff','#8ab4ff','#ffffff'],bg:'#070c14'},
{n:'Золото',c:['#ffd34d','#ff8f3a','#fff3b0'],bg:'#120c04'},{n:'Кровь',c:['#ff4d6d','#ff9100','#ffd6a5'],bg:'#140508'},
{n:'Фиалка',c:['#c9a7ff','#7c5cff','#ffd1fb'],bg:'#0c0816'},{n:'Лайм',c:['#d4ff4d','#4dff88','#fffbb0'],bg:'#0a1204'},{n:'Космос',c:['#7aa2ff','#b04bff','#7dfff2'],bg:'#05061a'},{n:'Карамель',c:['#ffb88a','#ff7aa8','#fff0c9'],bg:'#150a0c'}];
const rgb=h=>[1,3,5].map(i=>parseInt(h.substr(i,2),16)),al=(h,a)=>`rgba(${rgb(h)},${a})`;
function applyTheme(){const t=THEMES[U.th|0],r=document.documentElement.style;t.c.forEach((c,i)=>r.setProperty('--c'+(i+1),c));r.setProperty('--bg',t.bg)}

/* ---------- анимированные фоны ---------- */
const SCN=['Синтвейв','Звёздное небо','Аврора','Океан','Сакура','Ночной дождь','Матрица','Светлячки','Снегопад','Подводный мир','Планета','Гипер-прыжок'];
const SS=Array.from({length:170},(_,i)=>({x:((i*7919)%1000)/1000,y:((i*104729)%1000)/1000,r:.4+(i%7)*.25,p:i}));
let MX=0,MY=0,MXs=0,MYs=0;addEventListener('mousemove',e=>{MX=e.clientX/innerWidth*2-1;MY=e.clientY/innerHeight*2-1});
function scene(g,W,H,t){t*=[.5,1,1.8][U.sp|0];MXs+=(MX-MXs)*.06;MYs+=(MY-MYs)*.06;const T=THEMES[U.th|0],[c1,c2,c3]=T.c,bg=T.bg,hz=H*.58;let gr;g.globalAlpha=1;g.shadowBlur=0;g.save();if(U.px){g.translate(W/2+MXs*18,H/2+MYs*12);g.scale(1.05,1.05);g.translate(-W/2,-H/2)}
const stars=(h,a)=>{for(const s of SS){if(s.y*H>h)continue;g.globalAlpha=a*(.35+.65*Math.sin(t*1.7+s.p)**2);g.fillStyle='#fff';g.fillRect(s.x*W,s.y*H,s.r,s.r)}g.globalAlpha=1};
switch(U.sc|0){
case 0:{gr=g.createLinearGradient(0,0,0,hz);gr.addColorStop(0,bg);gr.addColorStop(1,al(c2,.85));g.fillStyle=gr;g.fillRect(0,0,W,hz+2);stars(hz*.8,1);
const r=Math.min(W,H)*.2,sy=hz-r*.25;gr=g.createLinearGradient(0,sy-r,0,sy+r);gr.addColorStop(0,c3);gr.addColorStop(1,c2);g.shadowColor=c2;g.shadowBlur=60;g.fillStyle=gr;g.beginPath();g.arc(W/2,sy,r,0,6.283);g.fill();g.shadowBlur=0;
g.save();g.beginPath();g.arc(W/2,sy,r,0,6.283);g.clip();g.fillStyle=bg;for(let i=0;i<7;i++)g.fillRect(W/2-r,sy+r*.05+(i+(t*.25)%1)*r*.14,r*2,2+i*1.5);g.restore();
gr=g.createLinearGradient(0,hz,0,H);gr.addColorStop(0,al(c2,.25));gr.addColorStop(1,bg);g.fillStyle=gr;g.fillRect(0,hz,W,H-hz);
g.strokeStyle=c1;g.shadowColor=c1;g.shadowBlur=8;g.lineWidth=1.5;g.beginPath();for(let i=-24;i<=24;i++){g.moveTo(W/2+i*8,hz);g.lineTo(W/2+i*W*.07,H)}for(let k=0;k<14;k++){const z=(k+(t*.5)%1)/14,y=hz+(H-hz)*z*z;g.moveTo(0,y);g.lineTo(W,y)}g.globalAlpha=.55;g.stroke();break}
case 1:{g.fillStyle=bg;g.fillRect(0,0,W,H);for(let i=0;i<3;i++){const x=W*(.3+.4*Math.sin(t*.05+i*2)),y=H*(.4+.3*Math.cos(t*.04+i*3)),r=Math.max(W,H)*.45,c=[c1,c2,c3][i];gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,al(c,.22));gr.addColorStop(1,al(c,0));g.fillStyle=gr;g.fillRect(0,0,W,H)}
g.save();g.translate(W/2,H/2);g.rotate(t*.012);g.translate(-W/2,-H/2);stars(H*2,1);g.restore();
const m=(t*.25)%6;if(m<.7){const k=m/.7,x=W*(.1+.8*(((t*.25)|0)*.37%1)),y=H*.1+k*H*.25;g.strokeStyle=al('#ffffff',1-k);g.lineWidth=2;g.beginPath();g.moveTo(x-k*300,y-k*100);g.lineTo(x-k*300+70,y-k*100+23);g.stroke()}break}
case 2:{gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,bg);gr.addColorStop(1,al(c1,.12));g.fillStyle=gr;g.fillRect(0,0,W,H);stars(H*.8,.9);
for(let k=0;k<4;k++){const col=[c1,c2,c3,c1][k],base=H*(.22+k*.06);gr=g.createLinearGradient(0,base-H*.1,0,base+H*.35);gr.addColorStop(0,al(col,0));gr.addColorStop(.35,al(col,.28));gr.addColorStop(1,al(col,0));g.fillStyle=gr;g.beginPath();const dn=[];
for(let x=0;x<=W+12;x+=12){const y=base+Math.sin(x*.004+t*.3+k*1.7)*H*.07+Math.sin(x*.011-t*.22+k)*H*.03;x?g.lineTo(x,y):g.moveTo(x,y);dn.push([x,y+H*(.18+.08*Math.sin(x*.006+t*.4+k))])}
for(let i=dn.length-1;i>=0;i--)g.lineTo(dn[i][0],dn[i][1]);g.closePath();g.fill()}
g.fillStyle=bg;g.beginPath();g.moveTo(0,H);for(let x=0;x<=W;x+=10)g.lineTo(x,H*.86-Math.abs(Math.sin(x*.005+1))*H*.1-Math.abs(Math.sin(x*.013))*H*.04);g.lineTo(W,H);g.closePath();g.fill();break}
case 3:{gr=g.createLinearGradient(0,0,0,hz);gr.addColorStop(0,bg);gr.addColorStop(1,al(c2,.45));g.fillStyle=gr;g.fillRect(0,0,W,hz+2);stars(hz*.7,.8);
const mx=W*.7,my=H*.22,mr=Math.min(W,H)*.07;g.shadowColor=c3;g.shadowBlur=50;g.fillStyle=c3;g.beginPath();g.arc(mx,my,mr,0,6.283);g.fill();g.shadowBlur=0;
gr=g.createLinearGradient(0,hz,0,H);gr.addColorStop(0,al(c1,.35));gr.addColorStop(1,bg);g.fillStyle=gr;g.fillRect(0,hz,W,H-hz);
for(let i=0;i<14;i++){const y=hz+8+i*i*1.6+i*4,w=mr*(1.8-i*.08)*(1+.3*Math.sin(t*2+i));g.fillStyle=al(c3,.35-i*.02);g.fillRect(mx-w+Math.sin(t*1.5+i)*8,y,w*2,2)}
for(let l=0;l<6;l++){const by=hz+(H-hz)*(l/6)*.9+10;g.fillStyle=al(l%2?c1:c2,.07+l*.01);g.beginPath();g.moveTo(0,H);for(let x=0;x<=W;x+=14)g.lineTo(x,by+Math.sin(x*.012*(1+l*.15)+t*(.6+l*.15)+l)*(5+l*3));g.lineTo(W,H);g.closePath();g.fill()}break}
case 4:{gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,bg);gr.addColorStop(.6,al(c2,.35));gr.addColorStop(1,al(c3,.3));g.fillStyle=gr;g.fillRect(0,0,W,H);
g.shadowColor=c3;g.shadowBlur=60;g.fillStyle=al(c3,.5);g.beginPath();g.arc(W*.78,H*.3,Math.min(W,H)*.09,0,6.283);g.fill();g.shadowBlur=0;
for(let i=0;i<80;i++){const x=((i*131+t*(14+i%5*5)+Math.sin(t*.8+i)*40)%(W+80))-40,y=((i*71+t*(24+i%7*7))%(H+60))-30,s=4+i%4*2;g.save();g.translate(x,y);g.rotate(t*.6+i);g.fillStyle=al(i%3?c1:c2,.55+.3*Math.sin(i));g.beginPath();g.ellipse(0,0,s,s*.55,0,0,6.283);g.fill();g.restore()}break}
case 5:{gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,bg);gr.addColorStop(1,al(c2,.3));g.fillStyle=gr;g.fillRect(0,0,W,H);
for(let i=0,x=0;x<W;i++){const w=40+(i*53)%70,h=H*(.18+((i*37)%100)/100*.3);g.fillStyle='#0a0a14cc';g.fillRect(x,H*.8-h,w-4,h);
for(let wy=H*.8-h+8;wy<H*.8-8;wy+=16)for(let wx=x+6;wx<x+w-12;wx+=14){if(Math.sin(i*9+wx*.7+wy*1.3+t*(.2+(wx%3)*.1))>.55){g.fillStyle=al([c1,c3,c2][(wx+wy|0)%3],.75);g.fillRect(wx,wy,6,8)}}x+=w}
gr=g.createLinearGradient(0,H*.8,0,H);gr.addColorStop(0,al(c1,.25));gr.addColorStop(1,bg);g.fillStyle=gr;g.fillRect(0,H*.8,W,H*.2);
g.strokeStyle=al(c1,.35);g.lineWidth=1;g.beginPath();for(let i=0;i<140;i++){const x=(i*53+t*80)%(W+100)-50,y=((i*97+t*(600+i%5*80))%(H+100))-50;g.moveTo(x,y);g.lineTo(x-4,y+18)}g.stroke();break}
case 6:{g.fillStyle=bg;g.fillRect(0,0,W,H);g.font='16px monospace';g.textAlign='center';const cs='01ΣΔ◆▲<>/#$%';
for(let i=0;i<W/18;i++){const sp=.4+(i*37%10)/12,hd=(t*sp*6+i*13)%(H/16+16);for(let j=0;j<16;j++){const y=(hd-j)*16;if(y<0||y>H)continue;g.fillStyle=j?al(c1,.6*(1-j/16)):'#ffffff';g.fillText(cs[(i*7+j*13+((t*6)|0))%cs.length],i*18+9,y)}}
g.textAlign='left';break}
case 7:{gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,bg);gr.addColorStop(1,al(c1,.18));g.fillStyle=gr;g.fillRect(0,0,W,H);stars(H*.6,.7);
g.fillStyle='#02060a';for(let k=0;k<2;k++){g.beginPath();g.moveTo(0,H);for(let x=0;x<=W;x+=24){const y=H*(.86-k*.07)-Math.abs(Math.sin(x*.013+k*3))*H*(.12+k*.05);g.lineTo(x,y);g.lineTo(x+12,y+H*.04)}g.lineTo(W,H);g.closePath();g.fill()}
for(let i=0;i<70;i++){const x=W*Math.abs((i*.137+Math.sin(t*.2+i)*.04)%1),y=H*(.45+.45*Math.abs((i*.291+Math.cos(t*.25+i*2)*.05)%1)),a=.4+.6*Math.sin(t*2+i*3)**2;g.shadowColor=c3;g.shadowBlur=14;g.fillStyle=al(c3,a);g.beginPath();g.arc(x,y,2.2,0,6.283);g.fill()}g.shadowBlur=0;break}
case 8:{gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,bg);gr.addColorStop(1,al(c1,.25));g.fillStyle=gr;g.fillRect(0,0,W,H);
g.fillStyle=al(c1,.18);g.beginPath();g.moveTo(0,H);for(let x=0;x<=W;x+=20)g.lineTo(x,H*.82+Math.sin(x*.004)*H*.05+Math.sin(x*.011)*H*.02);g.lineTo(W,H);g.fill();
for(let i=0;i<160;i++){const z=1+i%3,x=(((i*113+t*(8+z*4)*.5+Math.sin(t*.5+i)*30*z)%(W+40))+W+40)%(W+40)-20,y=((i*61+t*(30+z*22))%(H+20))-10;g.fillStyle=`rgba(255,255,255,${.35+z*.2})`;g.beginPath();g.arc(x,y,z*1.2,0,6.283);g.fill()}break}
case 9:{gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,al(c1,.55));gr.addColorStop(1,bg);g.fillStyle=gr;g.fillRect(0,0,W,H);
for(let i=0;i<6;i++){const x=W*(.1+i*.17)+Math.sin(t*.3+i)*40;gr=g.createLinearGradient(x,0,x+120,H);gr.addColorStop(0,al('#ffffff',.14));gr.addColorStop(1,al('#ffffff',0));g.fillStyle=gr;g.beginPath();g.moveTo(x,0);g.lineTo(x+60,0);g.lineTo(x+200+Math.sin(t*.4+i)*30,H);g.lineTo(x+60,H);g.closePath();g.fill()}
for(let i=0;i<50;i++){const x=(i*97+Math.sin(t+i)*20)%W,y=H-((i*53+t*(30+i%6*10))%(H+40));g.strokeStyle=al('#ffffff',.35);g.lineWidth=1;g.beginPath();g.arc(x,y,2+i%5,0,6.283);g.stroke()}
for(let i=0;i<7;i++){const dir=i%2?1:-1,x=(((i*211+t*(40+i*9)*dir)%(W+200))+W+200)%(W+200)-100,y=H*(.25+(i*.11)%.5)+Math.sin(t+i)*14;g.save();g.translate(x,y);g.scale(-dir,1);g.fillStyle=al(i%2?c2:c3,.55);g.beginPath();g.ellipse(0,0,22,8,0,0,6.283);g.fill();g.beginPath();g.moveTo(-18,0);g.lineTo(-34,-9);g.lineTo(-34,9);g.fill();g.restore()}break}
case 10:{g.fillStyle=bg;g.fillRect(0,0,W,H);gr=g.createRadialGradient(W*.3,H*.3,0,W*.3,H*.3,Math.max(W,H)*.6);gr.addColorStop(0,al(c1,.2));gr.addColorStop(1,al(c1,0));g.fillStyle=gr;g.fillRect(0,0,W,H);stars(H*2,1);
const pr=Math.min(W,H)*.22,px=W*.72+Math.sin(t*.1)*10,py=H*.6;g.save();g.translate(px,py);g.rotate(-.35);g.strokeStyle=al(c3,.55);g.lineWidth=10;g.beginPath();g.ellipse(0,0,pr*1.7,pr*.4,0,Math.PI,6.283);g.stroke();
gr=g.createRadialGradient(-pr*.4,-pr*.4,pr*.1,0,0,pr);gr.addColorStop(0,c2);gr.addColorStop(1,bg);g.shadowColor=c2;g.shadowBlur=50;g.fillStyle=gr;g.beginPath();g.arc(0,0,pr,0,6.283);g.fill();g.shadowBlur=0;
g.beginPath();g.ellipse(0,0,pr*1.7,pr*.4,0,0,Math.PI);g.stroke();g.restore();
const ma=t*.2;g.fillStyle=al('#ffffff',.8);g.beginPath();g.arc(px+Math.cos(ma)*pr*2.1,py+Math.sin(ma)*pr*.5-pr*.2,pr*.2,0,6.283);g.fill();break}
case 11:{g.fillStyle=bg;g.fillRect(0,0,W,H);const cx=W/2,cy=H/2,mx=Math.hypot(W,H)/2;
for(let i=0;i<190;i++){const a=i*2.399963,s=(i*.137+t*.35*(.5+i%4*.25))%1,r1=s*s*mx,r2=r1+s*s*mx*.35+4;g.strokeStyle=al([c1,c2,c3,'#ffffff'][i%4],.15+.7*s);g.lineWidth=.6+s*2.4;g.beginPath();g.moveTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1);g.lineTo(cx+Math.cos(a)*r2,cy+Math.sin(a)*r2);g.stroke()}
gr=g.createRadialGradient(cx,cy,0,cx,cy,mx*.3);gr.addColorStop(0,al(c1,.35));gr.addColorStop(1,al(c1,0));g.fillStyle=gr;g.fillRect(0,0,W,H);break}
}
g.restore();overlay(g,W,H,t);g.globalAlpha=1;g.shadowBlur=0}
function overlay(g,W,H,t){const m=U.pt|0;if(!m)return;const [c1,c2,c3]=THEMES[U.th|0].c;g.save();
for(let i=0;i<60;i++){let x,y,r;
if(m==1){x=(i*97+t*(5+i%5*3))%W;y=(i*53+Math.sin(t*.3+i)*30+t*(3+i%4))%H;r=1+i%3;g.fillStyle='rgba(255,255,255,.22)'}
else if(m==2){x=W*Math.abs((i*.137+Math.sin(t*.2+i)*.05)%1);y=H*Math.abs((i*.291+Math.cos(t*.23+i*2)*.06)%1);r=2+i%2;g.shadowColor=c3;g.shadowBlur=12;g.fillStyle=al(c3,.4+.6*Math.sin(t*2+i)**2)}
else if(m==3){x=(((i*113+Math.sin(t*.6+i)*40+t*10)%(W+40))+W+40)%(W+40)-20;y=(i*61+t*(40+i%5*14))%(H+20)-10;r=1+i%3;g.fillStyle='rgba(255,255,255,.8)'}
else{x=(i*127+Math.sin(t+i)*20)%W;y=H-((i*71+t*(60+i%5*30))%(H+30));r=1+i%2;g.shadowColor=c2;g.shadowBlur=10;g.fillStyle=al(i%2?c2:c3,.8)}
g.beginPath();g.arc(x,y,r,0,6.283);g.fill()}g.restore()}

/* ---------- релакс-движок (генеративные звуки и музыка) ---------- */
const RX={run:{}};
const RL=[['rain','Дождь','🌧️'],['thunder','Гром вдали','⛈️'],['ocean','Океан','🌊'],['wind','Ветер','🍃'],['fire','Камин','🔥'],['night','Ночные сверчки','🌙'],['birds','Птицы','🐦'],['pad','Космический пад','🌌'],['bells','Дзен-колокольчики','🔔'],['lofi','Лофи-аккорды','☕'],['box','Музыкальная шкатулка','🎼'],['delta','Глубокий сон','😴'],['stream','Горный ручей','🏞️'],['drip','Капли в пещере','💧'],['piano','Тихое пианино','🎹'],['hum','Космический гул','🛸']];
const PRE=[['Дождь и камин',{rain:.6,fire:.5}],['Ночной океан',{ocean:.6,night:.35,pad:.4}],['Лес на рассвете',{birds:.5,wind:.35,bells:.3}],['Космос',{pad:.6,delta:.3,wind:.2}],['Лофи-кафе',{lofi:.6,rain:.3}],['Глубокий сон',{delta:.4,ocean:.35,pad:.35}],['Дзен-сад',{bells:.6,wind:.3,box:.25}],['Гроза',{rain:.7,thunder:.7,wind:.3}],['Тихая ночь',{night:.4,pad:.3,box:.3}],
['Горный ручей',{stream:.6,birds:.4,wind:.2}],['Пещера',{drip:.6,hum:.4,pad:.2}],['Вечер с пианино',{piano:.6,rain:.3,fire:.25}],['Звёздный корабль',{hum:.6,pad:.4,delta:.2}],
['Зимняя ночь',{wind:.5,fire:.4,piano:.3}],['Дождь за окном',{rain:.8,piano:.2}],['Тропики',{ocean:.4,birds:.5,stream:.3}],['Медитация',{bells:.5,hum:.4,delta:.25}],
['Книга и чай',{lofi:.45,fire:.3,rain:.2}],['Ночной лес',{night:.5,wind:.3,stream:.3}],['Шторм на море',{ocean:.7,thunder:.6,wind:.5,rain:.5}],['Колыбельная',{box:.5,delta:.3,pad:.3}],['Фокус',{lofi:.4,hum:.2,rain:.2}]];
const rnd=(a,b)=>a+Math.random()*(b-a);
function rx(){if(!RX.a){const a=RX.a=new AudioContext(),len=a.sampleRate*3,ib=a.createBuffer(2,len,a.sampleRate);for(let c=0;c<2;c++){const d=ib.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3)}
RX.m=a.createGain();RX.m.gain.value=U.rv;RX.m.connect(a.destination);RX.cv=a.createConvolver();RX.cv.buffer=ib;const rg=a.createGain();rg.gain.value=.6;RX.cv.connect(rg);rg.connect(RX.m);
const nb=a.createBuffer(1,a.sampleRate*4,a.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1;RX.nb=nb}
if(RX.a.state=='suspended')RX.a.resume();return RX.a}
const ns=a=>{const s=a.createBufferSource();s.buffer=RX.nb;s.loop=true;s.start();return s};
const bq=(a,t,f,q=1)=>{const b=a.createBiquadFilter();b.type=t;b.frequency.value=f;b.Q.value=q;return b};
const lfo=(a,r,d,tg)=>{const o=a.createOscillator(),g=a.createGain();o.frequency.value=r;g.gain.value=d;o.connect(g);g.connect(tg);o.start();return o};
const rep=(fn,a,b)=>{let on=1;(function l(){if(!on)return;fn();setTimeout(l,rnd(a,b))})();return()=>{on=0}};
function tone(a,out,f,d,v,ty='sine',at=.01,send=.5){const t=a.currentTime,o=a.createOscillator(),g=a.createGain();o.type=ty;o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+at);g.gain.exponentialRampToValueAtTime(.0008,t+d);o.connect(g);g.connect(out);if(send){const s=a.createGain();s.gain.value=send;g.connect(s);s.connect(RX.cv)}o.start(t);o.stop(t+d+.05)}
function click(a,out,hf,v1,v2,dur,off){const s=a.createBufferSource(),h=bq(a,'highpass',hf),e=a.createGain(),t=a.currentTime;s.buffer=RX.nb;e.gain.setValueAtTime(rnd(v1,v2),t);e.gain.exponentialRampToValueAtTime(.001,t+dur);s.connect(h);h.connect(e);e.connect(out);s.start(t,rnd(0,3),off)}
const LY={
rain:(a,o)=>{const n=ns(a),h=bq(a,'highpass',900),l=bq(a,'lowpass',7500);n.connect(h);h.connect(l);l.connect(o);return()=>n.stop()},
ocean:(a,o)=>{const n=ns(a),l=bq(a,'lowpass',650),g=a.createGain();g.gain.value=.5;n.connect(l);l.connect(g);g.connect(o);const x=lfo(a,.09,.45,g.gain);return()=>{n.stop();x.stop()}},
wind:(a,o)=>{const n=ns(a),b=bq(a,'bandpass',500,1.4);n.connect(b);b.connect(o);const x=lfo(a,.07,300,b.frequency);return()=>{n.stop();x.stop()}},
fire:(a,o)=>{const n=ns(a),l=bq(a,'lowpass',380),g=a.createGain();g.gain.value=.7;n.connect(l);l.connect(g);g.connect(o);const r=rep(()=>{if(Math.random()<.7)click(a,o,1800,.15,.7,rnd(.02,.08),.1)},60,260);return()=>{n.stop();r()}},
night:(a,o)=>rep(()=>{for(let i=0;i<3;i++)setTimeout(()=>tone(a,o,4300+rnd(-80,80),.05,.05,'sine',.005,0),i*55)},350,1300),
birds:(a,o)=>rep(()=>{const f=rnd(2200,3600),n=1+(Math.random()*3|0);for(let i=0;i<n;i++)setTimeout(()=>tone(a,o,f*(1+i*.12),.12,.08,'sine',.01,.4),i*120)},1500,4500),
pad:(a,o)=>{const C=[[0,4,7,11],[-3,0,4,7],[-5,-1,2,5],[-7,-3,0,4]],fl=bq(a,'lowpass',900),g=a.createGain();g.gain.value=.5;fl.connect(g);g.connect(o);g.connect(RX.cv);
const os=[0,1,2,3].map(i=>{const x=a.createOscillator();x.type='triangle';x.detune.value=rnd(-8,8);x.frequency.value=110*2**(C[0][i]/12);x.connect(fl);x.start();return x});
const tm=lfo(a,.12,.25,g.gain);let k=0;const r=setInterval(()=>{k=(k+1)%4;os.forEach((x,i)=>x.frequency.setTargetAtTime(110*2**(C[k][i]/12),a.currentTime,2.5))},11000);return()=>{clearInterval(r);os.forEach(x=>x.stop());tm.stop()}},
bells:(a,o)=>rep(()=>{const P=[0,2,4,7,9,12,14],f=392*2**(P[Math.random()*P.length|0]/12);tone(a,o,f,3.5,.14,'sine',.005,.8);tone(a,o,f*2.01,2,.04,'sine',.005,.8)},1300,4200),
lofi:(a,o)=>{const CH=[[0,3,7,10],[5,8,12,15],[-2,2,5,8],[3,7,10,14]];let k=0;
const r=rep(()=>{const c=CH[k];c.forEach((s,i)=>setTimeout(()=>{const f=220*2**(s/12);tone(a,o,f,2.6,.07,'sine',.02,.4);tone(a,o,f*2,1.2,.02,'sine',.02,.4)},i*40));tone(a,o,110*2**(c[0]/12),2.2,.12,'sine',.03,0);k=(k+1)%4},3300,3300),
c=rep(()=>click(a,o,3000,.03,.12,.02,.03),40,220);return()=>{r();c()}},
box:(a,o)=>{const P=[0,2,4,7,9,12,14,16];let i=3;return rep(()=>{if(Math.random()<.75){i=Math.max(0,Math.min(7,i+(Math.random()<.5?-1:1)*(1+(Math.random()*2|0))));tone(a,o,523*2**(P[i]/12),1.4,.1,'triangle',.004,.7)}},420,520)},
delta:(a,o)=>{const m=[[180,-1],[184.5,1]].map(([f,p])=>{const x=a.createOscillator(),pn=a.createStereoPanner(),g=a.createGain();x.frequency.value=f;pn.pan.value=p;g.gain.value=.35;x.connect(g);g.connect(pn);pn.connect(o);x.start();return x});return()=>m.forEach(x=>x.stop())},
thunder:(a,o)=>rep(()=>{const n=a.createBufferSource(),l=bq(a,'lowpass',rnd(120,260)),e=a.createGain(),t=a.currentTime;n.buffer=RX.nb;n.loop=true;e.gain.setValueAtTime(0,t);e.gain.linearRampToValueAtTime(rnd(.6,1),t+.4);e.gain.exponentialRampToValueAtTime(.001,t+rnd(3,5));n.connect(l);l.connect(e);e.connect(o);n.start(t,rnd(0,2),6)},9000,26000),
stream:(a,o)=>{const n=ns(a),b=bq(a,'bandpass',1400,.8),g=a.createGain();g.gain.value=.55;n.connect(b);b.connect(g);g.connect(o);const x=lfo(a,.9,500,b.frequency),y=lfo(a,.23,.2,g.gain);return()=>{n.stop();x.stop();y.stop()}},
drip:(a,o)=>rep(()=>{const f=rnd(650,1300);tone(a,o,f,.4,.12,'sine',.003,.9);setTimeout(()=>tone(a,o,f*1.5,.3,.05,'sine',.003,.9),90)},1300,4200),
piano:(a,o)=>{const P=[0,3,5,7,10,12,15];return rep(()=>{const f=261.6*2**(P[Math.random()*P.length|0]/12);tone(a,o,f,3,.12,'triangle',.008,.7);tone(a,o,f*2,1.6,.035,'sine',.008,.7);if(Math.random()<.3)setTimeout(()=>tone(a,o,f*1.5,2.4,.08,'triangle',.008,.7),380)},1800,5200)},
hum:(a,o)=>{const l=bq(a,'lowpass',260),g=a.createGain();g.gain.value=.6;l.connect(g);g.connect(o);const os=[55,82.4,110.5].map(f=>{const x=a.createOscillator();x.type='sine';x.frequency.value=f;x.connect(l);x.start();return x}),t=lfo(a,.06,.3,g.gain);return()=>{os.forEach(x=>x.stop());t.stop()}}};
/* v — громкость слоя (0 выключает); nosave=1 — не запоминать в микс */
function rset(id,v,nosave){if(!nosave){U.rm[id]=v;usave()}const a=rx();let r=RX.run[id];
if(v>0&&!r){const o=a.createGain();o.gain.value=0;o.connect(RX.m);r=RX.run[id]={o,stop:LY[id](a,o)}}
if(r){r.o.gain.setTargetAtTime(v,a.currentTime,.4);if(v<=0){const q=r;delete RX.run[id];setTimeout(()=>{try{q.stop()}catch(e){}q.o.disconnect()},1500)}}}
function rmaster(v){U.rv=v;usave();if(RX.m)RX.m.gain.value=v}
function rstopAll(){if(!RX.a)return;for(const id in RX.run){const r=RX.run[id];r.o.gain.setTargetAtTime(0,RX.a.currentTime,.5);setTimeout(()=>{try{r.stop()}catch(e){}},2500)}RX.run={}}
let slT=0;
function rsleep(min){clearTimeout(slT);if(!min)return;slT=setTimeout(()=>{if(RX.m)RX.m.gain.setTargetAtTime(0,RX.a.currentTime,8);setTimeout(()=>{rstopAll();if(RX.m)RX.m.gain.value=U.rv},26000)},min*60000)}

/* ---------- общее для казино и мини-игр ---------- */
const BCSS=`:root{--c1:#00f0ff;--c2:#ff2bd6;--c3:#ffe14a;--bg:#07040f;color-scheme:dark}
*{box-sizing:border-box;margin:0}
html,body{min-height:100%;background:var(--bg);color:#fff;font-family:"Segoe UI",system-ui,sans-serif;user-select:none}
#bg{position:fixed;inset:0;width:100%;height:100%;z-index:-1}
button{font:inherit;color:#fff;cursor:pointer;border:1px solid var(--c1);background:rgba(10,4,30,.65);border-radius:10px;padding:9px 16px;transition:.15s;backdrop-filter:blur(4px)}
button:hover:not(:disabled){box-shadow:0 0 16px var(--c1);transform:translateY(-2px)}
button:disabled{opacity:.4;cursor:default}button.sel{background:var(--c1);color:#000;font-weight:700}
.row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:center}
.ctop{position:sticky;top:0;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;padding:10px 16px;background:rgba(5,3,15,.6);backdrop-filter:blur(8px)}
#cbal{font-size:20px;text-shadow:0 0 12px var(--c3)}#cbal b{color:var(--c3)}
.cm{max-width:1100px;margin:0 auto;padding:16px;display:flex;flex-direction:column;gap:14px;align-items:center}
.felt{width:100%;padding:18px;border-radius:22px;background:radial-gradient(ellipse at center,rgba(20,90,60,.6),rgba(6,30,24,.82));border:2px solid var(--c3);box-shadow:inset 0 0 60px rgba(0,0,0,.5),0 0 30px rgba(0,0,0,.5);display:flex;flex-direction:column;gap:12px;align-items:center}
.chb{border-radius:50%;width:54px;height:54px;padding:0;font-weight:800;border:3px dashed #fff;background:var(--c2);color:#000}.chb.sel{background:var(--c3)}
.big{font-size:20px;font-weight:700;text-align:center;min-height:28px;text-shadow:0 0 10px var(--c3)}.hint{font-size:13px;opacity:.75;text-align:center}
.pc{width:70px;height:100px;border-radius:9px;background:#fff;color:#111;position:relative;font-weight:800;font-family:Georgia,serif;box-shadow:0 4px 12px #0008;animation:dl .35s ease-out}
.pc.r{color:#d21}.pc i{position:absolute;left:6px;top:4px;font-style:normal;font-size:20px}.pc b{position:absolute;inset:0;display:grid;place-items:center;font-size:38px}
.pc.back{background:repeating-linear-gradient(45deg,var(--c2),var(--c2) 6px,#222 6px,#222 12px);border:3px solid #fff}.pc.back i,.pc.back b{display:none}.pc.hold{transform:translateY(-14px);box-shadow:0 0 18px var(--c3)}
@keyframes dl{from{transform:translateY(-70px) rotate(-10deg);opacity:0}}
#cmsg{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.85);border:1px solid var(--c3);padding:10px 20px;border-radius:12px;opacity:0;pointer-events:none;transition:.3s;z-index:9}#cmsg.on{opacity:1}
.hubb{position:fixed;top:12px;left:12px;z-index:5}`;
function gbg(hub){applyTheme();const st=document.createElement('style');st.textContent=BCSS;document.head.appendChild(st);
const cvs=document.createElement('canvas');cvs.id='bg';document.body.prepend(cvs);const gx=cvs.getContext('2d');let bw,bh;const brs=()=>{bw=cvs.width=innerWidth;bh=cvs.height=innerHeight};addEventListener('resize',brs);brs();(function lp(ts){scene(gx,bw,bh,ts/1000);requestAnimationFrame(lp)})(0);
if(hub){const b=document.createElement('button');b.className='hubb';b.textContent='← Хаб';b.onclick=()=>{location.href='launcher.html'};document.body.appendChild(b)}}
const CS=(()=>{let d={bal:1000,bi:1,best:0,spins:0,last:0};try{Object.assign(d,JSON.parse(localStorage.getItem('cs1')))}catch(e){}return d})();
const cssave=()=>{try{localStorage.setItem('cs1',JSON.stringify(CS))}catch(e){}};
const CG=[['casino.html','🎰 Слоты'],['roulette.html','🎡 Рулетка'],['blackjack.html','🃏 Блэкджек'],['poker.html','♠ Покер'],['dice.html','🎲 Кости'],['upgrader.html','⚙ Апгрейдер']];
function cbalUpd(){const e=document.getElementById('cbal');if(e)e.innerHTML=`💰 <b>${CS.bal}</b> монет`}
function cadd(n){CS.bal+=n;cssave();cbalUpd()}
function msg(t){let e=document.getElementById('cmsg');if(!e){e=document.createElement('div');e.id='cmsg';document.body.appendChild(e)}e.textContent=t;e.className='on';clearTimeout(msg.t);msg.t=setTimeout(()=>{e.className=''},2400)}
function cinit(cur){gbg(0);if(CS.bal<10){CS.bal+=300;cssave();setTimeout(()=>msg('Монеты закончились — держи подарок: +300'),400)}
const b=document.createElement('div');b.className='ctop';b.innerHTML=`<button onclick="location.href='launcher.html'">← Хаб</button><div class="row">${CG.map((x,i)=>`<button class="${i==cur?'sel':''}" onclick="location.href='${x[0]}'">${x[1]}</button>`).join('')}</div><div id="cbal"></div>`;document.body.prepend(b);cbalUpd()}
let BA;function bleep(f,d=.1,ty='sine',v=.08,sl=0){try{BA=BA||new AudioContext();if(BA.state=='suspended')BA.resume();const t=BA.currentTime,o=BA.createOscillator(),q=BA.createGain();o.type=ty;o.frequency.setValueAtTime(f,t);if(sl)o.frequency.exponentialRampToValueAtTime(Math.max(40,f+sl),t+d);q.gain.setValueAtTime(v,t);q.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(q);q.connect(BA.destination);o.start(t);o.stop(t+d)}catch(e){}}
function chipRow(el,vals,on,cur){el.innerHTML=vals.map(v=>`<button class="chb${v==cur?' sel':''}" data-v="${v}">${v}</button>`).join('');el.onclick=e=>{const b=e.target.closest('button');if(b)on(+b.dataset.v)}}
const RKN=['A','2','3','4','5','6','7','8','9','10','J','Q','K'],SUN=['♠','♥','♦','♣'];
function cardHtml(c,cls=''){return cls=='back'?'<div class="pc back"></div>':`<div class="pc ${c[1]==1||c[1]==2?'r':''} ${cls}"><i>${RKN[c[0]]}</i><b>${SUN[c[1]]}</b></div>`}
function mkDeck(){const d=[];for(let s=0;s<4;s++)for(let r=0;r<13;r++)d.push([r,s]);for(let i=d.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[d[i],d[j]]=[d[j],d[i]]}return d}

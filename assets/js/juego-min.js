const miModulo=(()=>{"use strict";let e=[];const t=["C","D","H","S"],n=["A","J","Q","K"];let r=[];const l=document.querySelector("#btnPedir"),s=document.querySelector("#btnDetener"),o=(document.querySelector("#btnNuevo"),document.querySelectorAll(".divCartas")),d=document.querySelectorAll("small"),i=()=>{e=[];for(let n=2;n<=10;n++)for(let r of t)e.push(n+r);for(let r of t)for(let t of n)e.push(t+r);return _.shuffle(e)},c=()=>{if(0===e.length)throw"No hay cartas en el deck";return e.pop()},a=(e,t)=>(r[t]=r[t]+(e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t})(e),d[t].innerText=r[t],r[t]),u=(e,t)=>{const n=document.createElement("img");n.src=`assets/cartas/${e}.png`,n.classList.add("carta"),o[t].append(n)},h=e=>{let t=0;do{const e=c();t=a(e,r.length-1),u(e,r.length-1)}while(t<=e&&t<=20&&e<=21);(()=>{const[e,t]=r,n=d[r.length-1];t===e&&21===e?n.innerText=`${t} EMPATE!`:e>21?(d[0].innerText=`${r[0]} Perdiste`,n.innerText=`${t} Gana`):t>e&&t<=21?(d[0].innerText=`${r[0]} Perdiste`,n.innerText=`${t} Gana`):t>21&&(n.innerText=`${t} Pierde`,d[0].innerText=`${r[0]} GANASTE!!`)})()};return l.addEventListener("click",()=>{const e=c(),t=a(e,0);u(e,0),t>21?(l.disabled=!0,s.disabled=!0,h(t)):21===t&&(d[0].innerText=`${t} GENIAL!`,l.disabled=!0,s.disabled=!0,h(t))}),s.addEventListener("click",()=>{s.disabled=!0,l.disabled=!0,h(r[0])}),{nuevoJuego:(t=2)=>{e=i(),r=[];for(let e=0;e<t;e++)r.push(0);d.forEach(e=>e.innerText=0),o.forEach(e=>e.innerHTML=""),l.disabled=!1,s.disabled=!1}}})();
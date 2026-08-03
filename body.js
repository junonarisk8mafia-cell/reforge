(function(){
var G='stroke="#8fbf7f" stroke-width="2.5" fill="none" stroke-linecap="round"';
var O='stroke="#ff6a2b" stroke-width="2" fill="none" stroke-linecap="round"';
var F='stroke="#3d5c36" stroke-width="2" fill="none"';
function S(i){return '<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">'+i+'</svg>';}

var st=document.createElement("style");
st.textContent='.drill .fig{background:#1f1f25;border:1px solid #2a2a31;border-radius:10px;padding:6px;display:flex;justify-content:center}'+
'.drill .fig svg{width:100%;max-width:230px;height:96px}'+
'.ytlink{display:block;margin-top:2px;font-size:13px;color:#7fb0c8;text-decoration:none;border:1px solid #2a2a31;border-radius:9px;padding:10px 12px;text-align:center;font-weight:700}';
document.head.appendChild(st);

var FIG=[
S('<g '+G+'><circle cx="56" cy="26" r="9" transform="rotate(-18 56 26)"/><line x1="58" y1="36" x2="60" y2="64"/><path d="M60 44 C 72 40 74 26 64 20"/><line x1="58" y1="44" x2="46" y2="60"/><line x1="60" y1="64" x2="52" y2="90"/><line x1="60" y1="64" x2="69" y2="90"/></g><g '+O+'><path d="M40 24 A 16 16 0 0 1 46 14"/><path d="M46 14 l-1 5 l5 -2"/></g>'),
S('<g '+G+'><circle cx="66" cy="22" r="9"/><path d="M64 31 Q 56 46 56 60"/><path d="M62 40 Q 50 46 54 57"/><path d="M56 60 L52 90"/><path d="M56 60 L64 90"/></g><g '+O+'><path d="M80 30 A 18 18 0 0 1 84 46"/><path d="M84 46 l3 -4 l-5 -1"/></g>'),
S('<line x1="12" y1="90" x2="110" y2="90" '+F+'/><g '+G+'><circle cx="48" cy="22" r="9"/><line x1="48" y1="31" x2="48" y2="58"/><path d="M48 58 L74 66 L74 90"/><path d="M48 58 L40 78 L22 88"/><line x1="48" y1="40" x2="60" y2="52"/></g><g '+O+'><path d="M62 38 l14 0"/></g><path d="M78 38 l-6 -3 l0 6 z" fill="#ff6a2b"/>'),
S('<g '+G+'><path d="M18 58 L62 58"/><path d="M62 58 Q 74 58 76 48"/><path d="M76 48 L76 34"/><path d="M70 50 L70 36"/><path d="M82 50 L82 38"/></g><g '+O+'><path d="M64 68 Q 80 68 82 56"/><path d="M82 56 l4 4 l-1 -7"/></g>'),
S('<line x1="10" y1="82" x2="112" y2="82" '+F+'/><g '+G+'><circle cx="28" cy="44" r="8"/><line x1="36" y1="47" x2="92" y2="58"/><path d="M34 50 L32 68 L48 68"/><path d="M92 58 L100 78"/></g><path d="M20 36 L100 51" stroke="#ff6a2b" stroke-width="1.5" stroke-dasharray="4 3" fill="none"/>'),
S('<line x1="10" y1="90" x2="112" y2="90" '+F+'/><g '+G+'><circle cx="30" cy="30" r="9"/><line x1="38" y1="34" x2="72" y2="46"/><line x1="50" y1="40" x2="48" y2="66"/><path d="M72 46 L70 68 L64 90"/></g><g '+O+'><path d="M86 44 l14 6"/></g><path d="M102 51 l-7 -2 l3 6 z" fill="#ff6a2b"/>'),
S('<line x1="26" y1="8" x2="26" y2="94" '+F+'/><g '+G+'><circle cx="42" cy="24" r="9"/><line x1="42" y1="33" x2="42" y2="62"/><path d="M42 42 L30 34 L32 18"/><path d="M42 42 L58 34 L56 18"/><line x1="42" y1="62" x2="36" y2="90"/><line x1="42" y1="62" x2="50" y2="90"/></g><g '+O+'><path d="M78 42 l0 -16"/></g><path d="M78 22 l-4 6 l8 0 z" fill="#ff6a2b"/>'),
S('<line x1="10" y1="90" x2="112" y2="90" '+F+'/><path d="M78 90 L78 62 L102 62" '+F+'/><g '+G+'><circle cx="46" cy="26" r="9"/><line x1="46" y1="35" x2="52" y2="58"/><line x1="48" y1="42" x2="34" y2="46"/><path d="M52 58 L70 62 L66 90"/><path d="M52 58 L44 76 L48 90"/></g>'),
S('<rect x="26" y="20" width="68" height="58" rx="6" '+G+'/><text x="60" y="14" text-anchor="middle" fill="#ff6a2b" font-size="11">吸う 4</text><text x="104" y="53" text-anchor="middle" fill="#9a9aa6" font-size="11">止 4</text><text x="60" y="93" text-anchor="middle" fill="#ff6a2b" font-size="11">吐く 4</text><text x="14" y="53" text-anchor="middle" fill="#9a9aa6" font-size="11">止 4</text><path d="M40 20 l9 -4 l0 8 z" fill="#8fbf7f"/>'),
S('<line x1="12" y1="80" x2="112" y2="80" '+F+'/><path d="M16 72 L34 42 L44 46 L54 22 L108 74" '+G+'/><text x="34" y="16" text-anchor="middle" fill="#ff6a2b" font-size="10">吸う×2</text><text x="88" y="40" text-anchor="middle" fill="#ff6a2b" font-size="10">長く吐く</text>'),
S('<line x1="14" y1="90" x2="108" y2="90" '+F+'/><g '+G+'><circle cx="60" cy="22" r="9"/><line x1="60" y1="31" x2="60" y2="60"/><line x1="60" y1="40" x2="46" y2="56"/><line x1="60" y1="40" x2="74" y2="56"/><line x1="60" y1="60" x2="53" y2="90"/><line x1="60" y1="60" x2="67" y2="90"/></g><g '+O+'><circle cx="53" cy="90" r="4"/><circle cx="67" cy="90" r="4"/><path d="M42 38 l-10 0"/><path d="M78 38 l10 0"/></g>'),
S('<line x1="14" y1="90" x2="108" y2="90" '+F+'/><g '+G+'><circle cx="60" cy="30" r="9"/><line x1="60" y1="39" x2="60" y2="64"/><path d="M60 44 L46 26 L44 12"/><path d="M60 44 L74 26 L76 12"/><line x1="60" y1="64" x2="53" y2="90"/><line x1="60" y1="64" x2="67" y2="90"/></g><g '+O+'><path d="M30 30 l-8 -8"/><path d="M90 30 l8 -8"/></g>')
];

var YT=["首こり 肩こり ストレッチ やり方","腰痛予防 ストレッチ やり方 立ったまま","腸腰筋 ストレッチ 片膝立ち やり方","手首 前腕 ストレッチ 腱鞘炎 予防","プランク 正しいやり方 初心者 腰痛","ヒップヒンジ やり方 腰を守る 持ち上げ方","ウォールエンジェル 巻き肩 改善 やり方","椅子スクワット 正しいやり方 初心者","ボックスブリージング 箱呼吸 やり方","生理的ため息 やり方 ストレス 呼吸法","グラウンディング 呼吸 集中力 高める","立ったまま 全身 ストレッチ 30秒 リフレッシュ"];

for(var i=0;i<DRILLS.length;i++){DRILLS[i].svg=FIG[i];DRILLS[i].yt=YT[i];}

window.renderDrills=function(){
  var list=DRILLS.filter(function(d){return bodyFilter==="all"||d.cat===bodyFilter;});
  var html="";
  list.forEach(function(d,i){
    html+='<div class="drill" style="margin-bottom:10px">'+
      '<div class="h"><span class="n">'+(i+1)+'</span><span class="t">'+esc(d.t)+'</span></div>'+
      '<div class="fig">'+(d.svg||"")+'</div>'+
      '<div class="time">⏱ '+esc(d.time)+'</div>'+
      '<div class="why">'+esc(d.why)+'</div>'+
      '<div class="how">'+esc(d.how)+'</div>'+
      '<a class="ytlink" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query='+encodeURIComponent(d.yt||d.t)+'">▶ 動画で見る（YouTube検索）</a>'+
    '</div>';
  });
  document.getElementById("drills").innerHTML=html;
};
document.querySelectorAll("#bodySeg button").forEach(function(b){
  b.addEventListener("click",function(){setTimeout(window.renderDrills,0);});
});
window.renderDrills();
})();

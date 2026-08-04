(function(){

/* ===== 育成就労 2027 =====
   技能実習は廃止され、2027年4月1日から育成就労制度へ。
   最大の変化＝「本人の意向による転籍」が認められる。ただし条件がある。 */

var st=document.createElement("style");
st.textContent=
'.ikbox{background:#17171b;border:1px solid #2a2a31;border-radius:14px;padding:16px 15px;display:flex;flex-direction:column;gap:11px;margin-bottom:12px}'+
'.ikbox>.hd{display:flex;align-items:center;gap:9px;font-weight:800;font-size:15.5px;color:#ececf0}'+
'.ikbox>.hd .ic{font-size:19px;flex:none}'+
'.ikbox .tx{font-size:14px;line-height:1.9;color:#d6d6dd}'+
'.ikbox .tx b{color:#ececf0}'+
'.iknow{background:#141a14;border:1px solid #3d5c36;border-left:3px solid #8fbf7f;border-radius:10px;padding:12px 13px;font-size:13.5px;line-height:1.9;color:#cfe0c4}'+
'.iknow b{color:#8fbf7f}'+
'.ikwarn{background:#241012;border:1px solid #5a2226;border-radius:10px;padding:12px 13px;font-size:13.5px;line-height:1.9;color:#f0d9d2}'+
'.ikwarn b{color:#ff8f70}'+
'.ikq{display:flex;align-items:flex-start;gap:11px;background:#1f1f25;border:1px solid #2a2a31;border-radius:11px;padding:13px;cursor:pointer;margin-bottom:8px}'+
'.ikq .bx{flex:none;width:24px;height:24px;border-radius:6px;border:2px solid #3a3a44;display:flex;align-items:center;justify-content:center;font-size:14px;color:transparent;margin-top:1px}'+
'.ikq.on .bx{background:#8fbf7f;border-color:#8fbf7f;color:#11190e}'+
'.ikq .q{flex:1;font-size:14px;line-height:1.75;color:#e2e2e8}'+
'.ikq .q small{display:block;color:#9a9aa6;font-size:12px;margin-top:3px;line-height:1.6}'+
'.ikres{border-radius:12px;padding:15px;font-size:14.5px;line-height:1.9;margin-top:4px}'+
'.ikres.ok{background:#141a14;border:1px solid #8fbf7f;color:#cfe0c4}'+
'.ikres.no{background:#1f1a12;border:1px solid #7a5a25;color:#e8d7bd}'+
'.ikres b{color:#fff}'+
'.iktl{display:flex;gap:11px;align-items:flex-start;margin-bottom:11px}'+
'.iktl .dot{flex:none;width:11px;height:11px;border-radius:50%;background:#ff6a2b;margin-top:6px}'+
'.iktl .d2{background:#3a3a44}'+
'.iktl .tt{font-size:14px;line-height:1.8;color:#d6d6dd}'+
'.iktl .tt b{color:#ff6a2b;display:block;font-size:14.5px}';
document.head.appendChild(st);

/* 転籍の条件チェック */
var Q=[
 {t:"今の会社で <b>1年</b> を超えて働いている",s:"※分野によっては最大2年。自分の分野の期間は監理支援機関か機構に確認"},
 {t:"技能の試験に合格した",s:"技能検定基礎級、または育成就労評価試験など"},
 {t:"日本語の試験に合格した",s:"日本語教育参照枠 A1相当以上（日本語能力試験 N5相当など）"},
 {t:"移りたい先が <b>同じ業務区分</b> の仕事",s:"分野をまたぐ転籍（例：農業→漁業）はできない"},
 {t:"移りたい先が「優良な育成就労実施者」",s:"試験合格率・法令順守などで認定された会社。相手に確認できる"},
 {t:"民間の職業紹介業者を通していない",s:"※ここが落とし穴。ブローカーを使うと転籍が認められない"}
];

var sec=document.createElement("section");
sec.className="view";
sec.id="view-ikusei";

var h=
 '<div class="eyebrow">— 2027年、制度が変わる —</div>'+

 '<div class="card" style="gap:9px;border-color:#3d5c36;background:#141a14">'+
  '<span class="track" style="color:#8fbf7f;border-color:#3d5c36">2027</span>'+
  '<h1 style="font-size:18px">技能実習は終わる。転籍できるようになる。</h1>'+
  '<div class="body" style="font-size:14px">2027年4月1日、技能実習制度は廃止され<b>育成就労制度</b>が始まる。<br>一番大きい変化は——<b style="color:#8fbf7f">本人の意思で会社を変われる（転籍）</b>。今まで原則禁止だった。<br>ただし<b>条件がある。</b>知らないと、権利があっても動けない。会社は教えてくれない。</div>'+
 '</div>'+

 '<div class="ikbox">'+
  '<div class="hd"><span class="ic">📅</span><span>いつ、どう変わる</span></div>'+
  '<div class="iktl"><span class="dot"></span><div class="tt"><b>2027年4月1日</b>育成就労制度がスタート。技能実習の新規受入れは終わる。</div></div>'+
  '<div class="iktl"><span class="dot d2"></span><div class="tt"><b>すでに実習生の人</b>その日に日本にいる技能実習生は、<b>そのまま技能実習を続けられる</b>。1号→2号への移行もできる。2号→3号は、2027年4月1日時点で2号を1年以上やっていることが条件。</div></div>'+
  '<div class="iktl"><span class="dot d2"></span><div class="tt"><b>期間は原則3年</b>3年で特定技能1号の試験（技能＋日本語A2相当／N4等）に受かれば、次に進める。落ちても最長1年の在留継続が認められる場合がある。</div></div>'+
 '</div>'+

 '<div class="ikbox">'+
  '<div class="hd"><span class="ic">🔑</span><span>転籍できるか、確かめろ</span></div>'+
  '<div class="tx" style="font-size:13.5px;color:#9a9aa6">あてはまるものを押せ。全部そろえば、本人の意向で転籍を申し出られる。</div>'+
  '<div id="ikQs"></div>'+
  '<div id="ikRes"></div>'+
 '</div>'+

 '<div class="ikbox" style="border-color:#5a2226;background:#1a1113">'+
  '<div class="hd"><span class="ic">🛑</span><span style="color:#ffb4a0">条件がそろわなくても、転籍できる場合がある</span></div>'+
  '<div class="tx">上の条件は「本人が希望して移る」場合の話だ。<br>それとは別に——<b style="color:#ffb4a0">暴力・パワハラなどの人権侵害を受けた場合など、やむを得ない事情があるときの転籍</b>は、技能実習の時から認められていて、育成就労でも続く。<br><br><b>1年待つ必要はない。試験に受かっていなくてもいい。</b><br>殴られている、賃金が払われない、書類を取られている——そういう時は、条件を気にせず<b>今すぐOTITか労基署に相談しろ。</b></div>'+
 '</div>'+

 '<div class="ikbox">'+
  '<div class="hd"><span class="ic">💰</span><span>送り出し機関に払う金に、上限ができた</span></div>'+
  '<div class="tx">育成就労では、外国人が<b>送出機関に払う費用の上限</b>が決められた。<br><b style="color:#8fbf7f">日本の会社から支払われる月給の2か月分まで。</b><br>これを超える分は、受入れ会社か監理支援機関が負担する。<br><br>借金を背負わせて逃げられなくする——その手口を潰すための仕組みだ。<b>これから来る人に、必ず伝えてくれ。</b></div>'+
 '</div>'+

 '<div class="ikbox">'+
  '<div class="hd"><span class="ic">📌</span><span>その他、知っておくこと</span></div>'+
  '<div class="tx">'+
   '・<b>日本語の要件ができた</b>。働き始める前にA1相当（試験合格、または100時間の講習）。3年でA2相当（N4等）を目指す。<br>'+
   '・<b>家族の帯同は原則できない。</b><br>'+
   '・<b>「帰国後に同じ仕事をすること」「前職要件」は無くなった。</b>技能実習にあった縛りが外れる。<br>'+
   '・監理団体は<b>「監理支援機関」</b>になり、許可の基準が厳しくなる（外部監査人の設置が義務、など）。<br>'+
   '・受入れ会社にも新しい条件。<b>労働・社会保険・税の法令を守っていること</b>が要件に入った。'+
  '</div>'+
 '</div>'+

 '<div class="ikwarn">'+
  '<b>⚠ ここが一番大事だ</b><br>'+
  '制度が変わっても、<b>会社が自分から「転籍できますよ」と教えることはまず無い。</b><br>転籍されると人手が減るからだ。<br>だから<b>自分で知って、自分で申し出るしかない。</b>そのための情報がこれだ。<br><br>分からないことは、監理支援機関ではなく<b>OTIT（機構）や労基署に直接聞け。</b>会社側と利害が近い相手にだけ聞くな。'+
 '</div>'+

 '<div class="iknow" style="margin-top:10px">'+
  '<b>※ この情報について</b><br>'+
  '2026年時点で公表されている内容にもとづく。<b>転籍できる期間（1年〜2年）や必要な試験は、分野ごとに違う。</b>細かい基準は今後も追加で決まる。<br>自分の分野の正確な条件は、必ず下の公式ページか窓口で確認してくれ。'+
 '</div>';

sec.innerHTML=h;
document.querySelector("main").appendChild(sec);

/* 公式リンク */
var LINKS=[
 {t:"育成就労制度 Q&A（出入国在留管理庁）",u:"https://www.moj.go.jp/isa/applications/faq/ikusei_qa_00002.html"},
 {t:"育成就労制度について（出入国在留管理庁）",u:"https://www.moj.go.jp/isa/applications/index_00005.html"},
 {t:"育成就労制度について（OTIT／機構）",u:"https://www.otit.go.jp/employment_for_skill_development/"},
 {t:"技能実習 SOS・緊急相談窓口（OTIT）",u:"https://www.otit.go.jp/sos.html"}
];
var lw=document.createElement("div");
lw.style.marginTop="12px";
lw.innerHTML='<div class="eyebrow" style="margin-bottom:8px">— 公式で確かめる —</div>'+
 LINKS.map(function(x){
   return '<a class="tel" href="'+x.u+'" target="_blank" rel="noopener"><div style="flex:1"><div class="t">'+x.t+'</div></div><span class="go">↗</span></a>';
 }).join("");
sec.appendChild(lw);

/* チェックリスト */
var state=Q.map(function(){return false;});
var qWrap=sec.querySelector("#ikQs");
qWrap.innerHTML=Q.map(function(q,i){
  return '<div class="ikq" data-i="'+i+'"><span class="bx">✓</span><span class="q">'+q.t+'<small>'+q.s+'</small></span></div>';
}).join("");

function renderRes(){
  var missing=[];
  state.forEach(function(v,i){ if(!v)missing.push(i); });
  var r=sec.querySelector("#ikRes");
  if(missing.length===0){
    r.innerHTML='<div class="ikres ok"><b>条件はそろっている。</b><br>本人の意向による転籍を申し出られる状態だ。<br><br>手続きは、<b>移りたい先の会社が育成就労計画を作って機構に申請する</b>形になる。まずは監理支援機関か機構に「転籍を希望する」と伝えろ。<br>そして——<b>民間のブローカーは使うな。</b>それだけで転籍が認められなくなる。</div>';
  }else{
    var list=missing.map(function(i){return "・"+Q[i].t.replace(/<[^>]+>/g,"");}).join("<br>");
    r.innerHTML='<div class="ikres no"><b>まだ足りないものがある。</b><br>'+list+'<br><br>ここを埋めれば申し出られる。試験は受け直せる。期間は待てば来る。<br><br>ただし——<b>暴力・パワハラ・賃金未払いなど「やむを得ない事情」があるなら、この条件を満たさなくても転籍できる場合がある。</b>下の赤い枠を読め。我慢して1年待つ必要はない。</div>';
  }
}
qWrap.addEventListener("click",function(e){
  var el=e.target.closest(".ikq"); if(!el)return;
  var i=parseInt(el.getAttribute("data-i"),10);
  state[i]=!state[i];
  el.classList.toggle("on",state[i]);
  renderRes();
});
renderRes();

/* ホームにタイル追加 */
var grid=document.querySelector(".menugrid");
if(grid){
  var tile=document.createElement("button");
  tile.className="tile wide";
  tile.style.borderColor="#3d5c36";
  tile.setAttribute("data-go","ikusei");
  tile.innerHTML='<span class="ic">📅</span><span class="txt"><span class="t" style="color:#bfe0ae">2027年、制度が変わる</span><span class="d">技能実習→育成就労。転籍できるようになる</span></span>';
  tile.addEventListener("click",function(){go("ikusei");});
  grid.appendChild(tile);
}

})();

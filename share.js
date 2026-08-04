(function(){

/* ===== シェア =====
   困っている人に「これ読め」と1項目だけ送れるようにする。
   スマホは共有シート（LINE・メッセージ等）、PCはクリップボードにコピー。 */

var APP="https://junonarisk8mafia-cell.github.io/reforge/";

var st=document.createElement("style");
st.textContent=
'.shareBtn{background:transparent;border:1px solid #2a2a31;color:#9a9aa6;border-radius:9px;padding:8px 12px;font-size:12.5px;font-weight:700;font-family:inherit;cursor:pointer;flex:none}'+
'.shareBtn:active{border-color:#8fbf7f;color:#8fbf7f}'+
'.shareRow{display:flex;align-items:center;gap:8px;margin-top:2px}'+
'.shareRow .lb{flex:1;font-size:12px;color:#9a9aa6;line-height:1.6}'+
'.shareBig{background:#141a14;border:1px solid #3d5c36;border-radius:14px;padding:16px 15px;display:flex;flex-direction:column;gap:11px;margin-top:14px}'+
'.shareBig .t{font-size:15px;font-weight:800;color:#bfe0ae}'+
'.shareBig .d{font-size:13px;color:#8ba081;line-height:1.8}'+
'.shareOk{font-size:12.5px;color:#8fbf7f;min-height:18px;text-align:center}';
document.head.appendChild(st);

function toast(el,msg){
  if(!el)return;
  el.textContent=msg;
  setTimeout(function(){el.textContent="";},3500);
}

/* 共有する（スマホは共有シート、だめならコピー） */
function share(title,text,okEl){
  var payload = text + "\n\n" + APP;
  if(navigator.share){
    navigator.share({title:title,text:text,url:APP})
      .then(function(){})
      .catch(function(){ copy(payload,okEl); });
  }else{
    copy(payload,okEl);
  }
}
function copy(txt,okEl){
  function ok(){toast(okEl,"コピーした。LINEなどに貼って送れる。");}
  function ng(){
    toast(okEl,"コピーできなかった。下の文を選んでコピーしてくれ。");
    var ta=document.createElement("textarea");
    ta.value=txt;ta.style.cssText="width:100%;min-height:140px;background:#0e0e10;color:#ececf0;border:1px solid #2a2a31;border-radius:10px;padding:12px;margin-top:8px;font-size:14px";
    if(okEl&&okEl.parentNode){okEl.parentNode.insertBefore(ta,okEl.nextSibling);ta.select();}
  }
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(ok).catch(ng);
  }else{
    try{
      var t=document.createElement("textarea");t.value=txt;document.body.appendChild(t);t.select();
      document.execCommand("copy");document.body.removeChild(t);ok();
    }catch(e){ng();}
  }
}

/* HTMLからプレーンテキストを作る */
function toText(html){
  var d=document.createElement("div");
  d.innerHTML=String(html).replace(/<br\s*\/?>/gi,"\n");
  return (d.textContent||"").replace(/\n{3,}/g,"\n\n").trim();
}

/* ===== SOSの各項目にシェアボタンを付ける ===== */
function mountSOS(){
  var items=document.querySelectorAll("#view-sos .sositem");
  if(!items.length)return false;
  items.forEach(function(it){
    if(it.querySelector(".shareRow"))return;
    var bd=it.querySelector(".bd");
    var hdSpan=it.querySelector(".hd span:nth-child(2)");
    if(!bd)return;

    var row=document.createElement("div");
    row.className="shareRow";
    var ok=document.createElement("div");
    ok.className="shareOk";
    ok.style.flex="1";
    ok.style.textAlign="left";

    var btn=document.createElement("button");
    btn.className="shareBtn";
    btn.textContent="↗ これを送る";
    btn.addEventListener("click",function(){
      var title=hdSpan?hdSpan.textContent.trim():"REFORGE";
      /* 「やること」の部分だけ抜く（長すぎると送りにくい） */
      var doBox=bd.querySelector(".sosdo");
      var body=doBox?toText(doBox.innerHTML):toText(bd.innerHTML);
      if(body.length>420)body=body.slice(0,420)+"…";
      var text="【"+title+"】\n"+body+"\n\n——\n知らないだけで泣き寝入りする人が多い。困ったらここを見てくれ。";
      share(title,text,ok);
    });

    row.appendChild(ok);
    row.appendChild(btn);
    bd.appendChild(row);
  });
  return true;
}

/* ===== 「もしもの時」の最後に、全体を送るブロック ===== */
function mountBig(){
  var v=document.getElementById("view-sos");
  if(!v||document.getElementById("shareBigBox"))return;
  var box=document.createElement("div");
  box.className="shareBig";
  box.id="shareBigBox";
  box.innerHTML=
    '<div class="t">↗ 困ってる人に、これを渡してくれ</div>'+
    '<div class="d">知らないだけで泣き寝入りしている人が、現場にはたくさんいる。<br>1人に届けば、その人がまた誰かに回す。それが一番効く。</div>'+
    '<button class="primary" id="shareApp" style="width:100%">このアプリを送る</button>'+
    '<button class="ghost" id="copyUrl" style="width:100%">URLだけコピー</button>'+
    '<div class="shareOk" id="shareBigOk"></div>';
  v.appendChild(box);

  document.getElementById("shareApp").addEventListener("click",function(){
    var t="現場で働く人のためのアプリ。\n\nケガ・給料・契約・辞めさせてもらえない——\n困った時に「まず何をやるか」と「どこに電話するか」が入ってる。\n\n知らないだけで損してる人が多い。無料。登録もいらない。";
    share("REFORGE — 折れない頭を作る",t,document.getElementById("shareBigOk"));
  });
  document.getElementById("copyUrl").addEventListener("click",function(){
    copy(APP,document.getElementById("shareBigOk"));
  });
}

/* ===== 今日のカードにもシェアを付ける ===== */
function mountCard(){
  var acts=document.querySelector("#view-today .actions");
  if(!acts||document.getElementById("shareCard"))return;
  var b=document.createElement("button");
  b.className="ghost";
  b.id="shareCard";
  b.setAttribute("aria-label","送る");
  b.textContent="↗";
  b.addEventListener("click",function(){
    var c=document.getElementById("card");
    if(!c)return;
    var h=c.querySelector("h1");
    var body=c.querySelector(".body");
    var t=(h?h.textContent.trim():"")+"\n\n"+(body?body.textContent.trim():"");
    share("REFORGE",t,document.getElementById("status"));
  });
  acts.appendChild(b);
}

function mountAll(){
  mountSOS();
  mountBig();
  mountCard();
}

/* SOSやEASYの描画が終わってから付ける */
if(document.querySelector("#view-sos .sositem")){mountAll();}
else{setTimeout(mountAll,400);}

/* やさしい日本語の切り替えで中身が入れ替わるので、付け直す */
document.addEventListener("click",function(e){
  if(e.target&&e.target.id==="ezsw"){setTimeout(mountSOS,80);}
});

})();

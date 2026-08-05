(function(){

/* ===== 証拠キット =====
   「記録を残せ」を、実際にやれるようにする。
   勤怠／ヒヤリ・ケガ／言われたこと／給料・天引き／パワハラ の5種。
   写真も保存。月ごとにテキストで出力して、労基署に持っていける。
   保存先はこの端末の中だけ。 */

var st=document.createElement("style");
st.textContent=
'.evtabs{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:12px}'+
'.evtabs button{flex:1;min-width:88px;background:#1f1f25;border:1px solid #2a2a31;color:#9a9aa6;font-size:12.5px;padding:11px 6px;border-radius:10px;font-weight:700;font-family:inherit}'+
'.evtabs button.on{border-color:#ff6a2b;color:#fff;background:#2a1a14}'+
'.evbox{background:#17171b;border:1px solid #2a2a31;border-radius:14px;padding:16px 15px;display:flex;flex-direction:column;gap:12px;margin-bottom:12px}'+
'.evbox>.hd{font-weight:800;font-size:15px;color:#ececf0;display:flex;align-items:center;gap:8px}'+
'.evf{display:flex;flex-direction:column;gap:6px}'+
'.evf label{font-size:13px;color:#9a9aa6}'+
'.evf input[type=text],.evf input[type=date],.evf input[type=time],.evf textarea{width:100%;background:#0e0e10;color:#ececf0;border:1px solid #2a2a31;border-radius:10px;padding:12px;font-family:inherit;font-size:15px;line-height:1.7}'+
'.evf textarea{min-height:80px;resize:vertical}'+
'.evf input:focus,.evf textarea:focus{outline:none;border-color:#ff6a2b}'+
'.evrow{display:flex;gap:9px}'+
'.evrow>*{flex:1}'+
'.punch{display:flex;gap:10px}'+
'.punch button{flex:1;padding:20px 10px;border-radius:14px;font-size:17px;font-weight:800;font-family:inherit;border:none}'+
'.punch .in{background:#1f2a1c;border:2px solid #8fbf7f;color:#8fbf7f}'+
'.punch .out{background:#2a1a14;border:2px solid #ff6a2b;color:#ff6a2b}'+
'.punch button small{display:block;font-size:12px;font-weight:400;margin-top:4px;opacity:.85}'+
'.today2{background:#1f1f25;border:1px solid #2a2a31;border-radius:11px;padding:13px;font-size:14px;line-height:1.9;color:#e2e2e8}'+
'.today2 b{color:#ff6a2b}'+
'.evitem{background:#17171b;border:1px solid #2a2a31;border-radius:12px;padding:13px 14px;display:flex;flex-direction:column;gap:6px;margin-bottom:9px}'+
'.evitem .dt{font-size:11.5px;color:#9a9aa6;letter-spacing:.5px;display:flex;align-items:center;gap:7px}'+
'.evitem .tg{font-size:10px;padding:2px 7px;border-radius:999px;border:1px solid #2a2a31;color:#9a9aa6}'+
'.evitem .bd2{font-size:14px;color:#e2e2e8;line-height:1.8;white-space:pre-wrap}'+
'.evitem .meta{font-size:12px;color:#9a9aa6}'+
'.evitem .del{align-self:flex-end;background:transparent;border:1px solid #2a2a31;color:#9a9aa6;font-size:12px;padding:6px 11px;border-radius:8px;font-family:inherit}'+
'.evthumbs{display:flex;gap:6px;flex-wrap:wrap}'+
'.evthumbs img{width:72px;height:72px;object-fit:cover;border-radius:8px;border:1px solid #2a2a31}'+
'.evadd{background:#1f1f25;border:1px dashed #3a3a44;color:#9a9aa6;border-radius:10px;padding:12px;font-size:13.5px;font-family:inherit;font-weight:700;width:100%}'+
'.evnote{font-size:12.5px;color:#9a9aa6;line-height:1.8;background:#141820;border:1px solid #26313f;border-left:3px solid #7fb0c8;border-radius:10px;padding:12px 13px}'+
'.evnote b{color:#7fb0c8}'+
'.evok{font-size:13px;color:#8fbf7f;text-align:center;min-height:18px}'+
'.evsum{background:#141a14;border:1px solid #3d5c36;border-radius:12px;padding:14px;font-size:14px;line-height:1.95;color:#cfe0c4}'+
'.evsum b{color:#8fbf7f}'+
'.evsum .big2{font-size:26px;font-weight:800;color:#8fbf7f}';
document.head.appendChild(st);

/* ---------- 保存 ---------- */
var KEY="reforge_evi";
var R=[];
try{R=JSON.parse(localStorage.getItem(KEY)||"[]");}catch(e){R=[];}
function save(){try{localStorage.setItem(KEY,JSON.stringify(R));}catch(e){alert("保存できなかった。端末の空き容量を確認してくれ。");}}
function E(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7);}

/* ---------- 写真（IndexedDB） ---------- */
function db(){
  return new Promise(function(res,rej){
    var r=indexedDB.open("reforge_photos",1);
    r.onupgradeneeded=function(){ if(!r.result.objectStoreNames.contains("p"))r.result.createObjectStore("p"); };
    r.onsuccess=function(){res(r.result);};
    r.onerror=function(){rej(r.error);};
  });
}
function putP(id,data){
  return db().then(function(d){return new Promise(function(res,rej){
    var t=d.transaction("p","readwrite");t.objectStore("p").put(data,id);
    t.oncomplete=function(){res(id);};t.onerror=function(){rej(t.error);};
  });});
}
function getP(id){
  return db().then(function(d){return new Promise(function(res,rej){
    var t=d.transaction("p","readonly");var q=t.objectStore("p").get(id);
    q.onsuccess=function(){res(q.result);};q.onerror=function(){rej(q.error);};
  });});
}
function delP(id){
  return db().then(function(d){return new Promise(function(res){
    var t=d.transaction("p","readwrite");t.objectStore("p").delete(id);
    t.oncomplete=function(){res();};t.onerror=function(){res();};
  });}).catch(function(){});
}
/* 写真を小さくして保存（容量対策） */
function shrink(file){
  return new Promise(function(res,rej){
    var fr=new FileReader();
    fr.onload=function(){
      var img=new Image();
      img.onload=function(){
        var max=1200, w=img.width, h=img.height;
        if(w>max||h>max){ if(w>h){h=Math.round(h*max/w);w=max;} else {w=Math.round(w*max/h);h=max;} }
        var c=document.createElement("canvas");c.width=w;c.height=h;
        c.getContext("2d").drawImage(img,0,0,w,h);
        res(c.toDataURL("image/jpeg",0.6));
      };
      img.onerror=rej;
      img.src=fr.result;
    };
    fr.onerror=rej;
    fr.readAsDataURL(file);
  });
}

/* ---------- 日付 ---------- */
function dayKey(d){d=d||new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();}
function monKey(d){d=d||new Date();return d.getFullYear()+"-"+(d.getMonth()+1);}
function monOf(day){var p=day.split("-");return p[0]+"-"+p[1];}
function fmtD(day){var p=day.split("-");var dt=new Date(+p[0],+p[1]-1,+p[2]);var w="日月火水木金土"[dt.getDay()];return (+p[1])+"/"+(+p[2])+"("+w+")";}
function fmtT(ts){var d=new Date(ts);return ("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2);}
function hm(min){var h=Math.floor(min/60),m=min%60;return h+"時間"+("0"+m).slice(-2)+"分";}

/* ---------- 画面 ---------- */
var TYPES=[
 {k:"kintai",n:"勤怠",ic:"⏱"},
 {k:"hiyari",n:"ヒヤリ・ケガ",ic:"🩹"},
 {k:"iwareta",n:"言われたこと",ic:"💬"},
 {k:"kyuryo",n:"給料・天引き",ic:"💴"},
 {k:"power",n:"パワハラ・いじめ",ic:"⚠️"}
];
var cur="kintai";

var sec=document.createElement("section");
sec.className="view";
sec.id="view-evi";
sec.innerHTML=
 '<div class="eyebrow">— 証拠キット —</div>'+
 '<div class="card" style="gap:9px;border-color:#b8461c">'+
  '<span class="track" style="color:#ff6a2b;border-color:#b8461c">EVIDENCE</span>'+
  '<h1 style="font-size:18px">記録が、お前の金と体を守る</h1>'+
  '<div class="body" style="font-size:14px">労基署も裁判所も、<b>記録がある側の話を信じる。</b><br>1日10秒でいい。積み上がった時、それが一番強い武器になる。<br>月末に「まとめて出す」を押せば、そのまま持っていける形になる。</div>'+
 '</div>'+
 '<div class="evnote">保存されるのは<b>この端末の中だけ</b>。どこにも送られない。会社にも見えない。<br>※スマホを機種変更したり、ブラウザのデータを消すと消える。大事な記録は<b>月ごとに書き出して、別の場所にも保存しておけ。</b></div>'+
 '<div class="evtabs" id="evTabs"></div>'+
 '<div id="evForm"></div>'+
 '<div class="eyebrow" style="margin-top:6px">— 記録 —</div>'+
 '<div id="evList"></div>'+
 '<div class="evbox">'+
  '<div class="hd">📤 まとめて出す</div>'+
  '<div class="evf"><label>どの月を出すか</label><input type="text" id="evMon" placeholder="例：2026-8"></div>'+
  '<button class="primary" id="evOut" style="width:100%">この月の記録をまとめてコピー</button>'+
  '<div class="evok" id="evOk"></div>'+
 '</div>';
document.querySelector("main").appendChild(sec);

/* タブ */
var tabs=sec.querySelector("#evTabs");
tabs.innerHTML=TYPES.map(function(t){
  return '<button data-k="'+t.k+'"'+(t.k===cur?' class="on"':'')+'>'+t.ic+'<br>'+t.n+'</button>';
}).join("");
tabs.addEventListener("click",function(e){
  var b=e.target.closest("button"); if(!b)return;
  cur=b.getAttribute("data-k");
  tabs.querySelectorAll("button").forEach(function(x){x.classList.toggle("on",x.getAttribute("data-k")===cur);});
  drawForm(); drawList();
});

/* ---------- フォーム ---------- */
function todayKintai(){
  var dk=dayKey();
  for(var i=0;i<R.length;i++){ if(R[i].type==="kintai"&&R[i].day===dk)return R[i]; }
  return null;
}
function monthKintaiSummary(mk){
  var days=0,min=0,over=0;
  R.forEach(function(r){
    if(r.type!=="kintai"||monOf(r.day)!==mk)return;
    if(r.in&&r.out){
      var m=Math.round((r.out-r.in)/60000);
      if(r.brk)m-=r.brk;
      if(m<0)m=0;
      days++;min+=m;
      if(m>480)over+=(m-480);
    }
  });
  return {days:days,min:min,over:over};
}

function drawForm(){
  var f=sec.querySelector("#evForm");
  if(cur==="kintai"){
    var t=todayKintai();
    var s=monthKintaiSummary(monKey());
    var stat = !t ? "今日はまだ記録なし。" :
      (t.in?("出勤 <b>"+fmtT(t.in)+"</b>"):"出勤 —") + " ／ " +
      (t.out?("退勤 <b>"+fmtT(t.out)+"</b>"):"退勤 —") +
      ((t.in&&t.out)?("<br>今日：<b>"+hm(Math.max(0,Math.round((t.out-t.in)/60000)-(t.brk||0)))+"</b>"):"");
    f.innerHTML=
     '<div class="evbox">'+
      '<div class="hd">⏱ 今日の勤怠</div>'+
      '<div class="punch">'+
        '<button class="in" id="pIn">🌅 出勤<small>今の時間で記録</small></button>'+
        '<button class="out" id="pOut">🌙 退勤<small>今の時間で記録</small></button>'+
      '</div>'+
      '<div class="today2">'+stat+'</div>'+
      '<div class="evrow">'+
        '<div class="evf"><label>休憩（分）</label><input type="text" id="pBrk" value="'+(t&&t.brk?t.brk:"60")+'" placeholder="60"></div>'+
        '<div class="evf"><label>現場（任意）</label><input type="text" id="pSite" value="'+E(t&&t.site||"")+'" placeholder="例：〇〇現場"></div>'+
      '</div>'+
      '<button class="ghost" id="pManual" style="width:100%">時間を手で直す・過去の日を入れる</button>'+
      '<div id="pManualBox"></div>'+
      '<div class="evsum">今月：<span class="big2">'+s.days+'</span> 日 ／ 合計 <b>'+hm(s.min)+'</b>'+
        (s.over>0?('<br>1日8時間を超えた分：<b>'+hm(s.over)+'</b><br><span style="font-size:12.5px;color:#9ab08e">この分に割増賃金（原則1.25倍以上）が発生している可能性がある。</span>'):'')+
      '</div>'+
     '</div>';

    sec.querySelector("#pIn").addEventListener("click",function(){punch("in");});
    sec.querySelector("#pOut").addEventListener("click",function(){punch("out");});
    sec.querySelector("#pBrk").addEventListener("input",function(){
      var t2=todayKintai(); if(!t2){t2={id:uid(),type:"kintai",day:dayKey(),ts:Date.now()};R.unshift(t2);}
      t2.brk=parseInt(this.value,10)||0; save();
    });
    sec.querySelector("#pSite").addEventListener("input",function(){
      var t2=todayKintai(); if(!t2){t2={id:uid(),type:"kintai",day:dayKey(),ts:Date.now()};R.unshift(t2);}
      t2.site=this.value; save();
    });
    sec.querySelector("#pManual").addEventListener("click",function(){
      var b=sec.querySelector("#pManualBox");
      if(b.innerHTML){b.innerHTML="";return;}
      b.innerHTML=
       '<div class="evrow" style="margin-top:10px"><div class="evf"><label>日付</label><input type="date" id="mD"></div></div>'+
       '<div class="evrow" style="margin-top:8px">'+
        '<div class="evf"><label>始業</label><input type="time" id="mI"></div>'+
        '<div class="evf"><label>終業</label><input type="time" id="mO"></div>'+
       '</div>'+
       '<button class="primary" id="mSave" style="width:100%;margin-top:10px">この日を記録する</button>';
      b.querySelector("#mSave").addEventListener("click",function(){
        var d=b.querySelector("#mD").value, i=b.querySelector("#mI").value, o=b.querySelector("#mO").value;
        if(!d||!i||!o){alert("日付・始業・終業を入れてくれ。");return;}
        var p=d.split("-");
        var dk=(+p[0])+"-"+(+p[1])+"-"+(+p[2]);
        var inTs=new Date(+p[0],+p[1]-1,+p[2],+i.split(":")[0],+i.split(":")[1]).getTime();
        var outTs=new Date(+p[0],+p[1]-1,+p[2],+o.split(":")[0],+o.split(":")[1]).getTime();
        if(outTs<inTs)outTs+=86400000;
        var ex=null; R.forEach(function(r){if(r.type==="kintai"&&r.day===dk)ex=r;});
        if(ex){ex.in=inTs;ex.out=outTs;}
        else{R.unshift({id:uid(),type:"kintai",day:dk,ts:inTs,in:inTs,out:outTs,brk:60});}
        save();drawForm();drawList();
      });
    });
    return;
  }

  /* 勤怠以外の共通フォーム */
  var ph = {
    hiyari:{lb:"何があった",ph2:"例：グラインダーで左手を切った。手袋が裂けた。"},
    iwareta:{lb:"言われたこと（そのまま書け）",ph2:"例：「労災は使うな、自分の不注意だろ」と親方に言われた"},
    kyuryo:{lb:"金額・内容",ph2:"例：支給18万円。寮費5万・食費3万を天引き。明細に説明なし"},
    power:{lb:"何をされたか",ph2:"例：全員の前で30分怒鳴られた。ヘルメットを投げられた"}
  }[cur];

  f.innerHTML=
   '<div class="evbox">'+
    '<div class="hd">✍️ 記録する</div>'+
    '<div class="evrow">'+
      '<div class="evf"><label>日付</label><input type="date" id="eD"></div>'+
      '<div class="evf"><label>時間（任意）</label><input type="time" id="eT"></div>'+
    '</div>'+
    '<div class="evf"><label>場所・現場（任意）</label><input type="text" id="eP" placeholder="例：3階足場"></div>'+
    '<div class="evf"><label>'+ph.lb+'</label><textarea id="eB" placeholder="'+E(ph.ph2)+'"></textarea></div>'+
    '<div class="evf"><label>見ていた人（任意）</label><input type="text" id="eW" placeholder="例：田中さん、山本さん"></div>'+
    '<button class="evadd" id="ePhoto">📷 写真をつける（何枚でも）</button>'+
    '<input type="file" id="ePick" accept="image/*" multiple style="display:none">'+
    '<div class="evthumbs" id="ePrev"></div>'+
    '<button class="primary" id="eSave" style="width:100%">記録する</button>'+
    '<div class="evok" id="eOk"></div>'+
   '</div>';

  var pend=[];
  var d0=new Date();
  sec.querySelector("#eD").value=d0.getFullYear()+"-"+("0"+(d0.getMonth()+1)).slice(-2)+"-"+("0"+d0.getDate()).slice(-2);
  sec.querySelector("#eT").value=("0"+d0.getHours()).slice(-2)+":"+("0"+d0.getMinutes()).slice(-2);

  sec.querySelector("#ePhoto").addEventListener("click",function(){sec.querySelector("#ePick").click();});
  sec.querySelector("#ePick").addEventListener("change",function(){
    var files=Array.prototype.slice.call(this.files||[]);
    var ok=sec.querySelector("#eOk");
    ok.textContent="写真を準備中…";
    Promise.all(files.map(function(f){return shrink(f);})).then(function(arr){
      arr.forEach(function(data){pend.push(data);});
      var pv=sec.querySelector("#ePrev");
      pv.innerHTML=pend.map(function(d){return '<img src="'+d+'">';}).join("");
      ok.textContent=pend.length+"枚 つけた。";
      setTimeout(function(){ok.textContent="";},2500);
    }).catch(function(){ok.textContent="写真を読めなかった。";});
  });

  sec.querySelector("#eSave").addEventListener("click",function(){
    var d=sec.querySelector("#eD").value;
    var body=sec.querySelector("#eB").value.trim();
    if(!d){alert("日付を入れてくれ。");return;}
    if(!body){alert("内容を書いてくれ。");return;}
    var p=d.split("-");
    var tm=sec.querySelector("#eT").value;
    var ts=new Date(+p[0],+p[1]-1,+p[2], tm?+tm.split(":")[0]:12, tm?+tm.split(":")[1]:0).getTime();
    var rec={id:uid(),type:cur,day:(+p[0])+"-"+(+p[1])+"-"+(+p[2]),ts:ts,
             place:sec.querySelector("#eP").value.trim(),
             body:body, wit:sec.querySelector("#eW").value.trim(), photos:[]};
    var jobs=pend.map(function(data){
      var pid=uid(); rec.photos.push(pid); return putP(pid,data);
    });
    Promise.all(jobs).catch(function(){}).then(function(){
      R.unshift(rec); save();
      var ok=sec.querySelector("#eOk"); ok.textContent="🔥 記録した。これが後で効く。";
      setTimeout(function(){ok.textContent="";},2800);
      drawForm(); drawList();
    });
  });
}

/* ---------- 一覧 ---------- */
function drawList(){
  var L=sec.querySelector("#evList");
  var list=R.filter(function(r){return r.type===cur;});
  if(!list.length){L.innerHTML='<div class="empty">まだ記録がない。<br>1件目を残すところから。</div>';return;}
  var tn={};TYPES.forEach(function(t){tn[t.k]=t.n;});
  L.innerHTML=list.map(function(r){
    if(r.type==="kintai"){
      var m=(r.in&&r.out)?Math.max(0,Math.round((r.out-r.in)/60000)-(r.brk||0)):0;
      return '<div class="evitem" data-id="'+r.id+'">'+
        '<div class="dt">'+fmtD(r.day)+' <span class="tg">勤怠</span></div>'+
        '<div class="bd2">'+(r.in?fmtT(r.in):"—")+' → '+(r.out?fmtT(r.out):"—")+(m?('　（'+hm(m)+'）'):'')+
          (r.brk?('\n休憩 '+r.brk+'分'):'')+(r.site?('\n'+E(r.site)):'')+'</div>'+
        '<button class="del">消す</button></div>';
    }
    return '<div class="evitem" data-id="'+r.id+'">'+
      '<div class="dt">'+fmtD(r.day)+' '+fmtT(r.ts)+' <span class="tg">'+E(tn[r.type]||"")+'</span></div>'+
      (r.place?'<div class="meta">📍 '+E(r.place)+'</div>':'')+
      '<div class="bd2">'+E(r.body)+'</div>'+
      (r.wit?'<div class="meta">👁 見ていた人：'+E(r.wit)+'</div>':'')+
      (r.photos&&r.photos.length?'<div class="evthumbs" data-ph="'+r.id+'"></div>':'')+
      '<button class="del">消す</button></div>';
  }).join("");

  /* 写真を読み込む */
  L.querySelectorAll("[data-ph]").forEach(function(box){
    var id=box.getAttribute("data-ph");
    var rec=null;R.forEach(function(r){if(r.id===id)rec=r;});
    if(!rec)return;
    rec.photos.forEach(function(pid){
      getP(pid).then(function(data){
        if(!data)return;
        var im=document.createElement("img");im.src=data;box.appendChild(im);
      }).catch(function(){});
    });
  });

  L.querySelectorAll(".del").forEach(function(b){
    b.addEventListener("click",function(){
      var id=b.closest(".evitem").getAttribute("data-id");
      if(!confirm("この記録を消すか？　戻せない。"))return;
      var idx=-1;R.forEach(function(r,i){if(r.id===id)idx=i;});
      if(idx>=0){
        var rec=R[idx];
        if(rec.photos)rec.photos.forEach(function(p){delP(p);});
        R.splice(idx,1);save();drawForm();drawList();
      }
    });
  });
}

/* ---------- 出力 ---------- */
function buildOut(mk){
  var L=[];
  var now=new Date();
  L.push("■ 記録（REFORGE）");
  L.push("出力日：" + now.getFullYear()+"年"+(now.getMonth()+1)+"月"+now.getDate()+"日");
  L.push("対象：" + mk.replace("-","年") + "月");
  L.push("");

  var k=R.filter(function(r){return r.type==="kintai"&&monOf(r.day)===mk;})
         .sort(function(a,b){return a.ts-b.ts;});
  if(k.length){
    L.push("【勤怠】");
    var tot=0,ov=0,dcount=0;
    k.forEach(function(r){
      var m=(r.in&&r.out)?Math.max(0,Math.round((r.out-r.in)/60000)-(r.brk||0)):0;
      L.push(fmtD(r.day)+"  "+(r.in?fmtT(r.in):"—")+" → "+(r.out?fmtT(r.out):"—")+
             (r.brk?("  休憩"+r.brk+"分"):"")+(m?("  = "+hm(m)):"")+(r.site?("  ["+r.site+"]"):""));
      if(m){tot+=m;dcount++;if(m>480)ov+=(m-480);}
    });
    L.push("");
    L.push("出勤日数：" + dcount + "日");
    L.push("合計労働時間：" + hm(tot));
    if(ov>0){
      L.push("1日8時間を超えた分：" + hm(ov));
      L.push("※この分について割増賃金（原則1.25倍以上）が発生している可能性があります。");
    }
    L.push("");
  }

  var tn={hiyari:"ヒヤリ・ケガ",iwareta:"言われたこと",kyuryo:"給料・天引き",power:"パワハラ・いじめ"};
  ["hiyari","iwareta","kyuryo","power"].forEach(function(tp){
    var arr=R.filter(function(r){return r.type===tp&&monOf(r.day)===mk;}).sort(function(a,b){return a.ts-b.ts;});
    if(!arr.length)return;
    L.push("【"+tn[tp]+"】");
    arr.forEach(function(r){
      L.push("・"+fmtD(r.day)+" "+fmtT(r.ts)+(r.place?("　"+r.place):""));
      L.push("　"+r.body.replace(/\n/g,"\n　"));
      if(r.wit)L.push("　見ていた人："+r.wit);
      if(r.photos&&r.photos.length)L.push("　写真："+r.photos.length+"枚（アプリ内に保存）");
      L.push("");
    });
  });

  if(L.length<=4){L.push("（この月の記録はありません）");}
  L.push("─────────");
  L.push("この記録は本人がその都度作成したものです。");
  return L.join("\n");
}

var mIn=sec.querySelector("#evMon");
mIn.value=monKey();
sec.querySelector("#evOut").addEventListener("click",function(){
  var mk=(mIn.value||monKey()).trim().replace(/[／\/]/g,"-");
  var p=mk.split("-"); if(p.length>=2)mk=(+p[0])+"-"+(+p[1]);
  var txt=buildOut(mk);
  var ok=sec.querySelector("#evOk");
  function done(){ok.textContent="コピーした。メモやメールに貼って保存しろ。";setTimeout(function(){ok.textContent="";},4000);}
  function ng(){
    ok.textContent="コピーできなかった。下の文を選んでコピーしてくれ。";
    var ta=document.createElement("textarea");
    ta.value=txt;ta.style.cssText="width:100%;min-height:240px;background:#0e0e10;color:#ececf0;border:1px solid #2a2a31;border-radius:10px;padding:12px;margin-top:8px;font-size:13px";
    ok.parentNode.insertBefore(ta,ok.nextSibling);ta.select();
  }
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(done).catch(ng);}
  else{try{var t=document.createElement("textarea");t.value=txt;document.body.appendChild(t);t.select();document.execCommand("copy");document.body.removeChild(t);done();}catch(e){ng();}}
});

/* 初期描画 */
drawForm(); drawList();

/* ホームにタイル */
var grid=document.querySelector(".menugrid");
if(grid){
  var tile=document.createElement("button");
  tile.className="tile wide";
  tile.style.borderColor="#b8461c";
  tile.style.background="#1a1210";
  tile.setAttribute("data-go","evi");
  tile.innerHTML='<span class="ic">📸</span><span class="txt"><span class="t" style="color:#ffb9a0">証拠キット</span><span class="d" style="color:#b08a7d">勤怠・ケガ・言われたこと。1日10秒で残す</span></span>';
  tile.addEventListener("click",function(){go("evi");});
  var sosT=grid.querySelector('[data-go="sos"]');
  if(sosT){grid.insertBefore(tile,sosT);}else{grid.insertBefore(tile,grid.children[1]||null);}
}

})();

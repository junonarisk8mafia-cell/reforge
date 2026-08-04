(function(){

/* ===== 相談前シート =====
   窓口に電話する前に埋める。埋めたらコピーして、電話しながら読む。
   入力は自動保存（端末の中だけ。どこにも送らない）。 */

var st=document.createElement("style");
st.textContent=
'.shsec{background:#17171b;border:1px solid #2a2a31;border-radius:14px;padding:16px 15px;display:flex;flex-direction:column;gap:12px;margin-bottom:12px}'+
'.shsec>.hd{display:flex;align-items:center;gap:9px;font-weight:700;font-size:15px;color:#ececf0}'+
'.shsec>.hd .n{flex:none;width:24px;height:24px;border-radius:7px;background:#1f1f25;border:1px solid #2a2a31;color:#ff6a2b;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center}'+
'.shf{display:flex;flex-direction:column;gap:6px}'+
'.shf label{font-size:13px;color:#9a9aa6}'+
'.shf input[type=text],.shf textarea,.shf select{width:100%;background:#0e0e10;color:#ececf0;border:1px solid #2a2a31;border-radius:10px;padding:12px;font-family:inherit;font-size:15px;line-height:1.7}'+
'.shf textarea{min-height:84px;resize:vertical}'+
'.shf input:focus,.shf textarea:focus,.shf select:focus{outline:none;border-color:#ff6a2b}'+
'.chips{display:flex;flex-wrap:wrap;gap:7px}'+
'.chip{background:#1f1f25;border:1px solid #2a2a31;color:#cfcfd6;border-radius:999px;padding:9px 13px;font-size:13px;font-family:inherit;font-weight:400;cursor:pointer}'+
'.chip.on{border-color:#ff6a2b;color:#fff;background:#2a1a14}'+
'.shbar{display:flex;gap:9px;margin-bottom:12px}'+
'.shhint{font-size:12.5px;color:#9a9aa6;line-height:1.8;background:#141820;border:1px solid #26313f;border-left:3px solid #7fb0c8;border-radius:10px;padding:12px 13px}'+
'.shhint b{color:#7fb0c8}'+
'.shsay{background:#1f1f25;border:1px solid #2a2a31;border-left:3px solid #8fbf7f;border-radius:10px;padding:13px;font-size:14.5px;line-height:1.9;color:#e2e2e8}'+
'.shsay b{color:#8fbf7f}'+
'.shok{font-size:13px;color:#8fbf7f;text-align:center;min-height:20px}';
document.head.appendChild(st);

var KEY="reforge_sheet";
var D={};
try{D=JSON.parse(localStorage.getItem(KEY)||"{}");}catch(e){D={};}
function save(){try{localStorage.setItem(KEY,JSON.stringify(D));}catch(e){}}
function E(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}

var TROUBLE=["給料が払われない","残業代が出ない","天引きが多い","ケガをした（労災）","働く時間が長すぎる","休憩がない","クビだと言われた","契約と条件が違う","パワハラ・暴力","辞めさせてもらえない","書類を返してくれない","有給が取れない","保険に入れてもらえない","その他"];
var PROOF=["雇用契約書","労働条件通知書","給与明細","タイムカード・出勤記録","自分で書いたメモ","LINE・メール","写真・動画","診断書","録音","何もない"];
var WANT=["払われていない分を払ってほしい","違法な状態をやめさせたい","労災を使いたい","辞めたい・別の会社に行きたい","まず話を聞いてほしい","どうすればいいか知りたい"];
var EMP=["選んでください","正社員","契約社員","パート・アルバイト","派遣","業務委託・一人親方","技能実習・育成就労","特定技能","わからない"];

function chips(name,arr){
  var sel=D[name]||[];
  return '<div class="chips" data-chips="'+name+'">'+arr.map(function(x){
    return '<button type="button" class="chip'+(sel.indexOf(x)>=0?' on':'')+'" data-v="'+E(x)+'">'+E(x)+'</button>';
  }).join("")+'</div>';
}
function field(k,label,ph,ta){
  var v=E(D[k]||"");
  return '<div class="shf"><label>'+E(label)+'</label>'+
    (ta?'<textarea data-k="'+k+'" placeholder="'+E(ph||"")+'">'+v+'</textarea>'
       :'<input type="text" data-k="'+k+'" value="'+v+'" placeholder="'+E(ph||"")+'">')+
  '</div>';
}

var sec=document.createElement("section");
sec.className="view";
sec.id="view-sheet";
sec.innerHTML=
 '<div class="eyebrow">— 相談前シート —</div>'+
 '<div class="card" style="gap:9px">'+
   '<span class="track" style="color:#8fbf7f;border-color:#3d5c36">SHEET</span>'+
   '<h1 style="font-size:18px">電話の前に、これを埋めろ</h1>'+
   '<div class="body" style="font-size:14px">窓口でたらい回しにされる一番の理由は、<b>こちらの説明がまとまっていない</b>ことだ。<br>先にこれを埋めておけば、相手はすぐ動ける。埋めたら下の「コピー」を押して、電話しながら読め。</div>'+
 '</div>'+

 '<div class="shhint">入力した内容は<b>この端末の中だけ</b>に保存される。どこにも送られない。他の人には見えない。</div>'+

 '<div class="shsec">'+
  '<div class="hd"><span class="n">1</span><span>会社のこと</span></div>'+
  field("co","会社の名前","例：〇〇建設株式会社")+
  field("coaddr","会社の場所（市区町村まででいい）","例：〇〇県〇〇市")+
  field("cotel","会社の電話（わかれば）","")+
  field("site","働いている現場（わかれば）","例：〇〇マンション新築工事")+
 '</div>'+

 '<div class="shsec">'+
  '<div class="hd"><span class="n">2</span><span>自分のこと</span></div>'+
  '<div class="shf"><label>雇用の形</label><select data-k="emp">'+
    EMP.map(function(x){return '<option'+((D.emp===x)?' selected':'')+'>'+E(x)+'</option>';}).join("")+
  '</select></div>'+
  field("since","いつから働いているか","例：2024年4月から")+
  field("hours","だいたいの働き方","例：週6日・朝7時〜夜7時")+
  field("pay","給料（わかれば）","例：日給12,000円 ／ 月20万円くらい")+
  field("me","自分の名前（言いたくなければ空でいい）","")+
 '</div>'+

 '<div class="shsec">'+
  '<div class="hd"><span class="n">3</span><span>何が起きたか</span></div>'+
  '<div class="shf"><label>あてはまるものを押す（いくつでも）</label>'+chips("trouble",TROUBLE)+'</div>'+
  field("when","いつのこと（日付・期間）","例：8月1日 ／ 今年の4月からずっと")+
  field("amount","金額（わかれば）","例：残業代 約15万円 ／ 天引き 月5万円")+
  field("detail","くわしく（短くていい）","例：8月1日、鉄骨の下敷きで左足を打った。親方に言ったが労災は使うなと言われた。","ta")+
 '</div>'+

 '<div class="shsec">'+
  '<div class="hd"><span class="n">4</span><span>持っている証拠</span></div>'+
  '<div class="shf"><label>あるものを押す（無くても相談できる）</label>'+chips("proof",PROOF)+'</div>'+
 '</div>'+

 '<div class="shsec">'+
  '<div class="hd"><span class="n">5</span><span>どうしてほしいか</span></div>'+
  '<div class="shf"><label>近いものを押す</label>'+chips("want",WANT)+'</div>'+
 '</div>'+

 '<div class="shsay"><b>📞 電話がつながったら、こう言え</b><br>'+
  '「<b>労働基準法違反について申告したいのですが</b>」<br>'+
  '——「相談」でなく「申告」。この一言で扱いが変わる。<br>'+
  'そして最後に必ず：<br>「<b>本日ご対応いただいたのは、どなたですか</b>」<br>'+
  '断られたら：<br>「<b>では、どこの窓口に行けばいいか、名前と連絡先を教えてください</b>」</div>'+

 '<div class="shbar" style="margin-top:12px">'+
  '<button class="primary" id="shCopy">📋 まとめてコピー</button>'+
  '<button class="ghost" id="shClear">消す</button>'+
 '</div>'+
 '<div class="shok" id="shOk"></div>'+

 '<div class="shsec" style="margin-top:6px">'+
  '<div class="hd"><span class="n">📞</span><span>電話したあとの記録</span></div>'+
  '<div class="shhint" style="margin-bottom:2px">ここを埋めておくと、次にかけ直す時・別の窓口に行く時に効く。<b>「前回◯月◯日に△△さんに相談しました」</b>と言えるだけで、扱いが変わる。</div>'+
  field("cwhen","かけた日と時間","例：8月5日 18:30")+
  field("cwho","かけた先／出た人の名前","例：〇〇労働基準監督署／田中さん")+
  field("csaid","言われたこと","","ta")+
  field("cnext","次にどこへ行くか","例：〇〇労働局の総合労働相談コーナーへ")+
 '</div>'+

 '<div class="shbar">'+
  '<button class="ghost" id="shCopy2" style="flex:1">📋 記録もふくめてコピー</button>'+
 '</div>'+
 '<div class="shok" id="shOk2"></div>';

document.querySelector("main").appendChild(sec);

/* 入力を保存 */
sec.addEventListener("input",function(e){
  var k=e.target.getAttribute("data-k");
  if(k){D[k]=e.target.value;save();}
});
sec.addEventListener("change",function(e){
  var k=e.target.getAttribute("data-k");
  if(k){D[k]=e.target.value;save();}
});
sec.querySelectorAll("[data-chips]").forEach(function(box){
  var name=box.getAttribute("data-chips");
  box.addEventListener("click",function(e){
    var b=e.target.closest(".chip"); if(!b)return;
    var v=b.getAttribute("data-v");
    var arr=D[name]||[];
    var i=arr.indexOf(v);
    if(i>=0){arr.splice(i,1);b.classList.remove("on");}
    else{arr.push(v);b.classList.add("on");}
    D[name]=arr;save();
  });
});

/* テキストを組み立てる */
function build(withLog){
  var L=[];
  L.push("■ 労働相談メモ（REFORGE）");
  L.push("");
  L.push("【会社】");
  L.push("名前：" + (D.co||"—"));
  L.push("場所：" + (D.coaddr||"—"));
  if(D.cotel)L.push("電話：" + D.cotel);
  if(D.site)L.push("現場：" + D.site);
  L.push("");
  L.push("【自分】");
  if(D.me)L.push("名前：" + D.me);
  L.push("雇用の形：" + (D.emp && D.emp!=="選んでください" ? D.emp : "—"));
  L.push("勤務開始：" + (D.since||"—"));
  L.push("働き方：" + (D.hours||"—"));
  L.push("給料：" + (D.pay||"—"));
  L.push("");
  L.push("【相談したいこと】");
  L.push((D.trouble&&D.trouble.length)? D.trouble.join("／") : "—");
  L.push("時期：" + (D.when||"—"));
  L.push("金額：" + (D.amount||"—"));
  L.push("");
  L.push("【くわしく】");
  L.push(D.detail||"—");
  L.push("");
  L.push("【持っている証拠】");
  L.push((D.proof&&D.proof.length)? D.proof.join("／") : "—");
  L.push("");
  L.push("【どうしてほしいか】");
  L.push((D.want&&D.want.length)? D.want.join("／") : "—");
  if(withLog){
    L.push("");
    L.push("─────────");
    L.push("【電話の記録】");
    L.push("日時：" + (D.cwhen||"—"));
    L.push("相手：" + (D.cwho||"—"));
    L.push("言われたこと：" + (D.csaid||"—"));
    L.push("次の行き先：" + (D.cnext||"—"));
  }
  return L.join("\n");
}

function copyText(txt,okEl){
  function done(){okEl.textContent="コピーした。メモアプリやLINEに貼れる。";setTimeout(function(){okEl.textContent="";},3500);}
  function fail(){
    okEl.textContent="コピーできなかった。下の文をそのまま選んでコピーしてくれ。";
    var ta=document.createElement("textarea");
    ta.value=txt; ta.style.width="100%"; ta.style.minHeight="180px";
    ta.style.background="#0e0e10"; ta.style.color="#ececf0";
    ta.style.border="1px solid #2a2a31"; ta.style.borderRadius="10px";
    ta.style.padding="12px"; ta.style.marginTop="8px"; ta.style.fontSize="14px";
    okEl.parentNode.insertBefore(ta, okEl.nextSibling);
    ta.select();
  }
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(done).catch(fail);
  } else {
    try{
      var t=document.createElement("textarea");
      t.value=txt; document.body.appendChild(t); t.select();
      document.execCommand("copy"); document.body.removeChild(t); done();
    }catch(e){fail();}
  }
}

document.getElementById("shCopy").addEventListener("click",function(){
  copyText(build(false),document.getElementById("shOk"));
});
document.getElementById("shCopy2").addEventListener("click",function(){
  copyText(build(true),document.getElementById("shOk2"));
});
document.getElementById("shClear").addEventListener("click",function(){
  if(!confirm("入力した内容を全部消すか？"))return;
  D={};save();
  sec.querySelectorAll("[data-k]").forEach(function(el){el.value="";});
  sec.querySelectorAll(".chip").forEach(function(c){c.classList.remove("on");});
  document.getElementById("shOk").textContent="消した。";
  setTimeout(function(){document.getElementById("shOk").textContent="";},2000);
});

/* ホームにタイルを追加（「もしもの時」の下） */
var grid=document.querySelector(".menugrid");
if(grid){
  var tile=document.createElement("button");
  tile.className="tile wide";
  tile.style.borderColor="#3d5c36";
  tile.style.background="#141a14";
  tile.setAttribute("data-go","sheet");
  tile.innerHTML='<span class="ic">📋</span><span class="txt"><span class="t" style="color:#bfe0ae">相談前シート</span><span class="d" style="color:#8ba081">電話の前に埋める。そのままコピーできる</span></span>';
  tile.addEventListener("click",function(){go("sheet");});
  var sosTile=grid.querySelector('[data-go="sos"]');
  if(sosTile && sosTile.nextSibling){grid.insertBefore(tile,sosTile.nextSibling);}
  else{grid.appendChild(tile);}
}

/* 「もしもの時」画面からも行けるように */
var sosView=document.getElementById("view-sos");
if(sosView){
  var jump=document.createElement("button");
  jump.className="primary";
  jump.style.width="100%";
  jump.style.marginBottom="12px";
  jump.textContent="📋 電話の前に「相談前シート」を埋める";
  jump.addEventListener("click",function(){go("sheet");});
  sosView.insertBefore(jump, sosView.children[1] || null);
}

})();

/***********************************************
  グローバル変数
************************************************/
//カードの山（配列）
let cards = [];

//自分のカード（配列）
let myCards = [];

//相手のカード（配列）
let comCards = [];

//勝敗判定フラグ（論理型）
//false→未決定(初期値)
//true→決定
let isGameOver = false;

/***********************************************
  イベントハンドラの割り当て
************************************************/
//ページ読み込み時の初期処理
window.addEventListener("load", loadHandler);


//「カードを引く」ボタン押下時の処理
document.querySelector("#pick").addEventListener("click", clickPickHandler);


//「勝負する！」ボタン押下時の処理
document.querySelector("#judge").addEventListener("click", clickJudgeHandler);



//「もう１回遊ぶ」ボタン押下時の処理
document.querySelector("#reset").addEventListener("click", clickResetHandler);

/***********************************************
  イベントハンドラ
************************************************/
//ページ読み込み時の初期処理
function loadHandler() {
  //シャッフル
  shuffle();

  //自分がカードを引く
  pickMyCard();

  //相手がカードを引く
  pickComCard();

  //画面を更新する
  updateView();
}

//「カードを引く」ボタン押下時の処理
function clickPickHandler(){
  if (isGameOver){//もしもflagが降りていたら
  //自分がカードを引く
  //相手がカードを引く
  //画面を更新する
  }
}


//「勝負する！」ボタン押下時の処理
function clickJudgeHandler(){
  if (isGameOver){//もしもflagが降りていたら
  //勝敗を判定する
  //勝敗を画面に表示する
  //勝敗決定フラグを「決定」に変更
  }
}

//「もう１回遊ぶ」ボタン押下時の処理
function clickResetHandler(){
  //画面を初期表示に戻す
  //relodeメソッドで画面を再読み込みする
}


/***********************************************
  ゲーム関数
************************************************/

//カードの山をシャッフルする関数
function shuffle(){
  //カードの初期化
  for (let i = 1; i <= 52; i++){
    cards.push(i);//1~52のカードをcards配列に追加
  }
  //100回繰り返す
  for(let i = 0; i < 100; i++){
  //カードの山からランダムに選んだ２枚を入れ替える
  let j = Math.floor(Math.random() * 52);//0~51までのランダムな値を代入
  let k = Math.floor(Math.random() * 52);//0~51までのランダムな値を代入
  let temp = cards[j];//変数jの値を変数tempに退避しておく
  cards[j] = cards[k];//変数jに変数kの値を代入
  cards[k] = temp;//退避させておいた変数jの値(変数temp)を変数kに代入
  }

}

//自分がカードを引く関数
function pickMyCard(){
  if(myCards.length <= 4 /*自分のカード(配列)が4枚以下*/){
    //カードの山（配列）から1枚取り出す
    let card = cards.pop();
    //取り出した1枚を自分のカードに追加する
    myCards.push(card);
  }
}

//相手がカードを引く関数
function pickComCard(){
  if(comCards.length <= 4 /*相手のカード(配列)が4枚以下*/){
    if(pickAI(comCards) /*カードを引くか考える*/){
      //カードの山（配列）から1枚取り出す
    let card = cards.pop();
      //取り出した1枚を自分のカードに追加する
      comCards.push(card);
    }
  }
}

//カードを引くか考える関数
function pickAI(handCards) {
  //現在のカードの合計を求める
  let total = getTotal(handCards);
  //カードを引くかどうか
  let isPick = false;//引くならtrue,引かないならfalse

  //合計が11以下なら引く
  if(total <= 11){
    isPick = true;
    //合計が12以上14以下なら80%の確率で引く
  }else if(total >= 12 && total <= 14){
    if(Math.random() < 0.8){
      isPick = true;
    }
    //合計が15以上17以下なら35%の確率で引く
  }else if(total >= 15 && total <= 17)
    if(Math.random() < 0.35){
      isPick = true;
  }
  //合計が18以上なら引かない
  else if(total >= 18){
    isPick = false;
  }
  //引くか引かないか戻り値で返す
  return isPick;
}

function getTotal(handCards){
  let total = 0;//計算した合計を入れる変数
  let number = 0;//カードの数字を入れる変数
  for(let i = 0; i < handCards.length; i++){
    //11で割った余りを求める
    number = handCards[i] % 13;
    //11で割った余が11,12,0の場合は10を加算する
    if(number == 11 || number == 12 || number == 0){
      total += 10;
      //それ以外はカードの数字を加算
    }else{
      total += number;
    }
    //Aのカードを含んでいる場合
    if(handCards.includes(1) || handCards.includes(14) || handCards.includes(27) || handCards.includes(40)){
      //Aを11として加算しても21を超えないならば、Aを11と読み替えて加算
      if(total += 10 <= 21){//すでに１として加算しているため、10の加算となる
        total += 10;
      }
    }
  }
  return total;//合計を返す
}

//画面を更新する関数
function updateView(){
  ///自分のカードを表示する
  let myfields = document.querySelectorAll(".myCard");//[myCrad]のクラスの要素を全て取得しNodeListオブジェクトとして返す
  for(let i = 0;i < myfields.length;i++){
    if(i < myCards.length){
    //表面の画像を表示する
    myfields[i].setAttribute('src', getCardPath(myCards[i]));
    }else{
      //裏面の画像を表示する
    myfields[i].setAttribute('src', "blue.png");
    }
  }
  //相手のカードを表示する
  let comfields = document.querySelectorAll(".comCard");//[comCrad]のクラスの要素を全て取得しNodeListオブジェクトとして返す
  for(let i = 0;i < comfields.length;i++){
    if(i < comCards.length){
    //表面の画像を表示する
    comfields[i].setAttribute('src', getCardPath(comCards[i]));
    }else{
      //裏面の画像を表示する
    comfields[i].setAttribute('src', "red.png");
    }
  }
  //カードの合計を再計算する
}

//勝敗を判定する関数
function 勝敗を判定する(){
  //自分のカードの合計を求める
  //相手のカードの合計を求める
  //勝敗のパターン表に当てはめて勝敗を決める
  //勝敗を呼び出し元に返す
}

/***********************************************
  デバッグ関数
************************************************/
function debug() {
  console.log("カードの山", cards);
  console.log("自分のカード", myCards);
  console.log("相手のカード", comCards);
  console.log("勝敗決定フラグ", isGameOver);
}



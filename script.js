$(".loading").ripples({
  dropRadius: 20,
  perturbance: 0.01,
  resolution: 170
});

$(".loading").ripples(
  "drop",
  screen.availWidth / 2,
  screen.availHeight / 2,
  200,
  10
);

$(".body").ripples({
  resolution: 300,
  dropRadius: 35,
  perturbance: 0.1
});

$(".sidebar_ver_synth").ripples();

$(".main").ripples({
  imageUrl: "./name-momonga.png"
});

$(".profile").ripples();

$(".profile--image").ripples({
  resolution: 300,
  dropRadius: 35,
  perturbance: 0.1
});

//ホーム画面の選択オブジェクトの動き
function moveObject(){
  //windowの開始時間
  let prev_time = new Date();
  //vx オブジェクトの速度
  let vx = 10;
  // vector オブジェクトの方向
  let vector = 1;
  // querySelector オブジェクトのid取得
  const object = document.querySelector('#link_profile');
  // movePositionX オブジェクトのx座標
  let movePositionx= 4;
  let movePositiony= 32;
  //オブジェクト移動速度減衰率
  let ref = 0.998;
  //波紋発火頻度パラメータ
  let fps = 5;
  let preFrame;
    //アニメーションループの内容
    const Animation=()=>{
      console.log("start Animation",fps)
      const now = new Date();
      const diffSecond = (now.getTime() - prev_time.getTime()) * 0.01;
      prev_time = now;
      movePositionx = Math.min(movePositionx + (vx*diffSecond));
      vx = vx*ref;
      object.style.left= movePositionx+'px';
      object.style.top = movePositiony+'px';
      //画面端でバウンド処理
      if(parseInt(object.style.left,10) >= screen.width-63 || parseInt(object.style.left,10)<=0){
        vx = -vx;
        vector = -vector;
      }
      //減衰によるオブジェクトの停止
      if(Math.abs(vx)<0.5){
        vx = 0;
      }
      //'mouseover'でカーソルがオブジェクトに当たった時停止、'mouseout'でカーソルが外れた時再稼働
      object.addEventListener('mouseover',function(){
        vx = 0;
      })
      object.addEventListener('mouseout',function(){
        vx = 10*vector;
        fps = 30;
      })
      //波紋の回数の制限
      function loop(timing=0){
        let frame = Math.floor((timing - prev_time)/(1000/fps));
        if(preFrame!=frame){
          objectRipples(movePositionx,movePositiony)
        }
        preFrame = frame;
        fps= fps*0.99;
      }
      loop();
      //アニメーションのループ
      requestAnimationFrame(Animation);
    }
    //アニメーション開始
    Animation();
}

function objectRipples(movePositionx,movePositiony){
  //波紋のエフェクト
  $(".main").ripples(
    "drop",
    movePositionx+32,
    movePositiony+32,
    50,
    0.1,
  );
}

window.addEventListener('load' ,moveObject());
//moveObject(".link_profile");
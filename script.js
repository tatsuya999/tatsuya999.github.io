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

//ホーム画面の選択オブジェクトの動き
function moveObject(id){
  //windowの開始時間
  let prev_time = new Date();
  //vx オブジェクトの速度
  let vx = getRandomArbitrary(-20,20);
  let vy = getRandomArbitrary(-20,20);
  //初速度記録用
  let first_vx = vx;
  let first_vy = vy;
  // vector オブジェクトの方向
  let vector_x = 1;
  let vector_y = 1;
  // querySelector オブジェクトのid取得
  const object = document.getElementById(id);
  // オブジェクトの大きさ
  let object_size_width = object.clientWidth;
  let object_size_hight = object.clientHeight;
  // movePositionX オブジェクトのx座標
  let movePositionx= getRandomArbitrary(5,window.innerWidth-70);
  let movePositiony= getRandomArbitrary(0,window.innerHeight-60);
  //オブジェクト移動速度減衰率
  let ref = 0.998;
  //波紋発火頻度パラメータ
  let fps = 5;
  let preFrame;
    //アニメーションループの内容
    const Animation=()=>{
      const now = new Date();
      const diffSecond = (now.getTime() - prev_time.getTime()) * 0.01;
      prev_time = now;
      movePositionx = Math.min(movePositionx + (vx*diffSecond));
      movePositiony = Math.min(movePositiony + (vy*diffSecond));
      vx = vx*ref;
      vy = vy*ref;
      object.style.left= movePositionx+'px';
      object.style.top = movePositiony+'px';
      //画面端(width)と衝突でバウンド処理
      if(Math.min(parseInt(object.style.left,10)+object_size_width) >= window.innerWidth || Math.min(parseInt(object.style.left,10))<=0||objectCollision(id)){
        vx = -vx;
        vector_x = -vector_x;
      }
      //画面端(height)と衝突でバウンド処理
      if(Math.min(parseInt(object.style.top,10)+object_size_hight) >= window.innerHeight|| Math.min(parseInt(object.style.top,10))<=0||objectCollision(id)){
        vy = -vy;
        vector_y = -vector_y;
      }
      //減衰によるオブジェクトの停止
      if(Math.abs(Math.sqrt((vx**2)*(vy**2)))<0.5){
        vx = 0;
        vy = 0;
      }
      //'mouseover'でカーソルがオブジェクトに当たった時停止、'mouseout'でカーソルが外れた時再稼働
      object.addEventListener('mouseover',function(){
        vx = 0;
        vy = 0;
      })
      object.addEventListener('mouseout',function(){
        vx = first_vx*vector_x;
        vy = first_vy*vector_y;
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

//波紋エフェクトを出す関数
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
//2値間の乱数
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
//2オブジェクトの距離
function dist(x1,y1,x2,y2){
  let len = Math.abs(Math.sqrt((x1-x2)**2+(y1-y2)**2));
  return len;
}

function objectCollision(object_id){
  object_list = document.getElementsByClassName('links');
  // オブジェクトの中心
  let object_center0_x = (parseInt(object_list[0].style.left,10)+object_list[0].clientWidth/2);
  let object_center0_y = (parseInt(object_list[0].style.top,10)+object_list[0].clientHeight/2);
  let object_center1_x = (parseInt(object_list[1].style.left,10)+object_list[1].clientWidth/2);
  let object_center1_y = (parseInt(object_list[1].style.top,10)+object_list[1].clientHeight/2);
  let d_01 = dist(object_center0_x,object_center0_y,object_center1_x,object_center1_y);
  if(d_01<(object_list[0].clientWidth/2)+(object_list[1].clientWidth/2)){
    if(object_id==object_list[0].id||object_id==object_list[1].id){
      return true;
    }
  }
  return false;
}

window.addEventListener('load' ,moveObject("link_works"));
window.addEventListener('load' ,moveObject("link_profile"));
window.addEventListener('load' ,objectCollision);
//moveObject(".link_profile");

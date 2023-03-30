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

$(".sidebar").ripples();

$(".sidebar_ver_synth").ripples();

$(".main").ripples({
  imageUrl: "./name-momonga.png"
});
/*
$(".wrap").ripples(
  "drop",
  $(".wrap").width() - 64,

  $(".wrap").height() - 64,
  2,
  10
);
*/
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
  let movePositionx= 0;
    //アニメーションループの内容
    const Animation=()=>{
      console.log("start Animation",object.style.left)
      const now = new Date();
      const diffSecond = (now.getTime() - prev_time.getTime()) * 0.01;
      prev_time = now;
      movePositionx = movePositionx + (vx*diffSecond);
      object.style.left= movePositionx+'px';
      //画面端でバウンド処理
      if(parseInt(object.style.left,10) >= screen.availWidth-63 || parseInt(object.style.left,10)<=-1){
        vx = -vx;
        vector = -vector;
      }
      //'mouseover'でカーソルがオブジェクトに当たった時停止、'mouseout'でカーソルが外れた時再稼働
      object.addEventListener('mouseover',function(){
        vx = 0;
      })
      object.addEventListener('mouseout',function(){
        vx = 10*vector;
      })
      //アニメーションのループ
      requestAnimationFrame(Animation);
    }
    //アニメーション開始
    Animation();
}

function reflectionObject(){
  let start = Date.now();
  let timer = setInterval(function() {
    let timePassed = Date.now() - start;
    v = 1;
    link_profile.style.left = (v*timePassed/5) + 'px';
    if(parseInt(link_profile.style.left,10) >= screen.availWidth-60){
    v = -v;
    link_profile.style.left =(screen.availWidth-60)*2+(v*timePassed/5) + 'px';
    }
    if(parseInt(link_profile.style.left,10)<0){
    v= -v;
    link_profile.style.left = (v*timePassed/5)-(screen.availWidth-60)*2 + 'px';
    }
    if(parseInt(link_profile.style.left,10) >= screen.availWidth-60){
      v = -v;
      link_profile.style.left =(screen.availWidth-60)*4+(v*timePassed/5) + 'px';
      }
    //止める関数
    //clearInterval(timer);
    console.log(v,parseInt(link_profile.style.left,10),screen.availWidth)
    
  }, 20);
}

window.addEventListener('load' ,moveObject());
//moveObject(".link_profile");
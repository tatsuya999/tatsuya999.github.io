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
function moveObject(object_id){
  object_id.style.animate({
    left:['0px','200px'],
   }
  );
}

function reflectionObject(){

}

window.onload = function(){
  let start = Date.now();
  let timer = setInterval(function() {
    let timePassed = Date.now() - start;
    v = 1;
    link_profile.style.left = (v*timePassed/5) + 'px';

    if (parseInt(link_profile.style.left,10) >= screen.availWidth-60){
    v = -v;
    link_profile.style.left =(screen.availWidth-60)*2+(v*timePassed/5) + 'px';
    }
    if(parseInt(link_profile.style.left,10)<0){
    v= -v;
    link_profile.style.left = (v*timePassed/5)-(screen.availWidth-60)*2 + 'px';
    }
    //止める関数
    //clearInterval(timer);
    console.log(v,parseInt(link_profile.style.left,10))
    
  }, 20);
};
//moveObject(".link_profile");
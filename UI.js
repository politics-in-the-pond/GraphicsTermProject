import { Game } from './main/Game.js';
var SFX = [
  new Audio('/assets/button_click.wav'),
  new Audio('/assets/bomb.wav'),
];
var BGM = [
  new Audio('/assets/BGM_Ingame.mp3'),
  new Audio('/assets/BGM_End.wav'),
];/*Sound List*/

window.onload=function init(){
  var button = [
    document.getElementById("GameStartBtn"),
    document.getElementById("GameSettingBtn"),
    document.getElementById("GameCreatorsBtn"),
    document.getElementById("GameMenuBtn"),
    document.getElementById("MenuResumeBtn"),
    document.getElementById("MenuRestartBtn"),
    document.getElementById("MenuSettingBtn"),
    document.getElementById("MenuQuitBtn"),
    document.getElementById("SettingResetBtn"),
    document.getElementById("SettingSaveCloseBtn"),
    document.getElementById("CreatorsBackBtn"),
    document.getElementById("OverRestartBtn"),
    document.getElementById("OverQuitBtn"),
    document.getElementById("GameHelpBtn"),
    document.getElementById("HelpBackBtn"),
  ];/*Button List*/
  var Menu =[
    document.getElementById("TitleMenu"),
    document.getElementById("GameMenu"),
    document.getElementById("SettingMenu"),
    document.getElementById("Creators"),
    document.getElementById("GameOverMenu"),
    document.getElementById("Help"),
  ];/*Menu List*/
  var Component =[
    document.getElementById("LifeArea"),
    document.getElementById("Distance"),
  ];/*Ingame UI List*/
  var Slider =[
    document.getElementById("BGM"),
    document.getElementById("SFX"),
  ]/*Sound Slider List*/
  var menuEnabled = false;
  var optionEnabled = false;
   
  
  Slider[0].addEventListener("change", () => { //BGM volume
    BGM.forEach(bgm=>{
      bgm.volume =  Slider[0].value/100;
    });
  });

  Slider[1].addEventListener("change", () => { //SFX volume
    SFX.forEach(sfx=>{
      sfx.volume =  Slider[1].value/100;
    });
  });

  button.forEach(btn =>{
    btn.addEventListener("click", () => {  //all Button Sound
      SFX[0].play();
    });
  });


  button[0].addEventListener("click", () => {//게임시작
    const game = new Game(BGM,SFX); 
    window.game = game;
    Menu[0].style.display = "none";
    button[3].style.display = "block";
    Component[0].style.display = "flex";
    Component[1].style.display = "block";
  });
  button[1].addEventListener("click", () => { //타이틀설정 버튼
    if(!optionEnabled)
    {
      optionEnabled=true;
      Menu[0].style.display = "none";
      Menu[2].style.display = "flex";
    }
  });
  button[2].addEventListener("click", () => { //제작자들 버튼
      Menu[0].style.display = "none";
      Menu[3].style.display = "flex";
  });

  button[13].addEventListener("click", () => { //제작자들 버튼
    Menu[0].style.display = "none";
    Menu[5].style.display = "flex";
});
button[14].addEventListener("click", () => { //뒤로가기 버튼
  Menu[0].style.display = "flex";
  Menu[5].style.display = "none";
});
  button[3].addEventListener("click", () => { //인게임 메뉴버튼
    if(!menuEnabled)
    {
      menuEnabled=true;
      Menu[1].style.display = "flex";
      button[3].style.display = "none";
    }
  });
  button[4].addEventListener("click", () => { //계속하기 버튼
    if(menuEnabled)
    {
      menuEnabled=false;
      Menu[1].style.display = "none";
      button[3].style.display = "block";
    }
  });
 
  button[6].addEventListener("click", () => { //메뉴설정 버튼
    if(!optionEnabled)
    {
      optionEnabled=true;
      Menu[1].style.display = "none";
      Menu[2].style.display = "flex";
    }
  });
  button[7].addEventListener("click", () => { //종료 버튼
    window.open(location, '_self').close();
  });
  button[8].addEventListener("click", () => { //sound slider
    Slider.forEach(slider =>{
      slider.value=50;
    });
      BGM.forEach(bgm=>{
        bgm.volume =  Slider[0].value/100;
      });
  
      SFX.forEach(sfx=>{
        sfx.volume =  Slider[1].value/100;
      });
   
  });
  button[9].addEventListener("click", () => { //설정 저장후 닫기
    if(menuEnabled)
    {
      Menu[1].style.display = "flex";
    }
    else
    {
      Menu[0].style.display = "flex";
    }
    optionEnabled=false;
    Menu[2].style.display = "none";
  });

  button[10].addEventListener("click", () => { //제작자들 뒤로가기
    Menu[0].style.display = "flex";
    Menu[3].style.display = "none";
  });
  button[12].addEventListener("click", () => { //게임오버 종료 버튼
    window.open(location, '_self').close();
  });
  button[5].addEventListener("click", () => { //재시작 버튼
    menuEnabled=false;
    document.getElementById("GameMenu").style.display="none";
    document.getElementById("GameMenuBtn").style.display="block";
  
    BGM[1].pause();
    BGM[1].currentTime=0;
    BGM[0].play();
    BGM[0].loop=true;

});
button[11].addEventListener("click", () => { //재시작 버튼
    menuEnabled=false;
    document.getElementById("GameOverMenu").style.display="none";
    document.getElementById("GameMenuBtn").style.display="block";
    BGM[1].pause();
    BGM[1].currentTime=0;
    BGM[0].play();
    BGM[0].loop=true;
});
}
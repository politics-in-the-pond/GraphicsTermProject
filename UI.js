import { Game } from './main/Game.js';


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

  ];
  var Menu =[
    document.getElementById("TitleMenu"),
    document.getElementById("GameMenu"),
    document.getElementById("SettingMenu"),
    document.getElementById("Creators")
  ];
  var Component =[
    document.getElementById("LifeArea"),
    document.getElementById("Distance"),
  ];
  var menuEnabled = false;
  var optionEnabled = false;
  button[0].addEventListener("click", () => { //게임시작
    const game = new Game(); 
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
  button[9].addEventListener("click", () => { //종료 버튼
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

  button[10].addEventListener("click", () => { //종료 버튼
    Menu[0].style.display = "flex";
    Menu[3].style.display = "none";
  });
  button[12].addEventListener("click", () => { //종료 버튼
    window.open(location, '_self').close();
  });
  button[5].addEventListener("click", () => { //재시작 버튼
    menuEnabled=false;
    document.getElementById("GameMenu").style.display="none";
    document.getElementById("GameMenuBtn").style.display="block";
});
button[11].addEventListener("click", () => { //재시작 버튼
    menuEnabled=false;
    document.getElementById("GameOverMenu").style.display="none";
    document.getElementById("GameMenuBtn").style.display="block";
});
}
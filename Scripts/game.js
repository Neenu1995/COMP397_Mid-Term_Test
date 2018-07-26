//Neenu Shaji
//Student ID : 300991504
//Date : 26/07/2018
//Program displays success message when both the dice have same number.

let app;
(function(app) {
  "use strict";

  // Game Variables
  let stage;
  let canvas;
  let helloLabel;
  let assetManager;
  let startButton;
  let successLabel;
  //Bitmap objects variables for dice 1 and 2
  let Dice1;
  let Dice2;
    
  let manifest = [
      { id: "1", src: "/Assets/images/1.png" }, 
      { id: "2", src: "/Assets/images/2.png" }, 
      { id: "3", src: "/Assets/images/3.png" }, 
      { id: "4", src: "/Assets/images/4.png" },
      { id: "5", src: "/Assets/images/5.png" },
      { id: "6", src: "/Assets/images/6.png" },
      { id: "blank", src: "/Assets/images/blank.png" },
      { id: "StartButton", src: "/Assets/images/StartButton.png" }
    ];

  function Init() {
      console.log("App Initializing...");
      assetManager = new createjs.LoadQueue();
      assetManager.installPlugin(createjs.Sound);
      assetManager.on("complete", Start);
      assetManager.loadManifest(manifest);
  }

  


  /**
   * The Start function initializes the createjs Stage object,
   * sets the framerate and sets up the Main Game Loop to
   * trigger every frame
   *
   */
  function Start() {
    console.log("App Started...");
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.framerate = 60;
    createjs.Ticker.on("tick", Update);

    Main();
  }

  /**
   * This is the Main Game Loop it runs at 60 fps
   *
   */
  function Update() {
    stage.update();
  }

  /**
   *  This is the main function - place all your code here
   *
   */
  function Main() {
    console.log("Main Function...");

    // hello label
    helloLabel = new createjs.Text("Hello, World!", "60px Consolas", "#000000");
    helloLabel.regX = helloLabel.getBounds().width * 0.5;
    helloLabel.regY = helloLabel.getBounds().height * 0.5;
    helloLabel.x = 320;
    helloLabel.y = 200;
    stage.addChild(helloLabel);

    // start button
    startButton = new createjs.Bitmap(assetManager.getResult("StartButton"));
    startButton.regX = startButton.getBounds().width * 0.5;
    startButton.regY = startButton.getBounds().height * 0.5;
    startButton.x = 320;
    startButton.y = 320;
    stage.addChild(startButton);

    // start button listeners
    startButton.addEventListener("click", function() {

      //Added Roll Button
      stage.removeAllChildren();
      startButton = new createjs.Bitmap(assetManager.getResult("StartButton"));
      startButton.regX = startButton.getBounds().width * 0.5;
      startButton.regY = startButton.getBounds().height * 0.5;
      startButton.x = 320;
      startButton.y = 320;
      stage.addChild(startButton);
      console.log("Roll Button Added");

      //Listener to roll die on button click
      startButton.addEventListener("click",rollDice);

       
    });

    startButton.addEventListener("mouseover", function(event) {
        event.currentTarget.alpha = 0.7;
    });

    startButton.addEventListener("mouseout", function(event) {
        event.currentTarget.alpha = 1.0;
    });
  }

  //Method to Roll Dice
  function rollDice(){
    stage.removeAllChildren();
    stage.addChild(startButton);
    //Random number generation
    var diceCount1 = (Math.floor(Math.random()*6) + 1);
    var diceCount2 = (Math.floor(Math.random()*6) + 1);
   
  
    //retrieving the image for randomly generated numbers
    var diceImage1 = assetManager.getResult(diceCount1);
    var diceImage2 = assetManager.getResult(diceCount2);

    //Bitmap images created
    Dice1 = new createjs.Bitmap(diceImage1);
    Dice2 = new createjs.Bitmap(diceImage2);

    //Dice image locations
    var diceWidth = Dice1.getBounds().width;
    Dice1.x = 720 - (diceWidth*2) - diceWidth;
    Dice2.x = 720 - (diceWidth) - diceWidth;
    Dice1.y = 60;
    Dice2.y = 60;

    //Text view of dice Value created
    diceImage1 = new createjs.Text(diceCount1);
    diceImage2 = new createjs.Text(diceCount2);

    //Text view locations
    var diceHeight = Dice1.getBounds().height;
    diceImage1.x = 720 - (diceWidth*2) -(diceWidth/2);
    diceImage2.x = 720 - (diceWidth) -(diceWidth/2);
    diceImage1.y = 60 +diceHeight + 10;
    diceImage2.y = 60 +diceHeight + 10;

    //adding objects to the stage
    stage.addChild(Dice1);
    stage.addChild(Dice2);
    stage.addChild(diceImage1);
    stage.addChild(diceImage2);

    //Success method added
    if (diceCount1 == diceCount2){
      win();
    }

  }

  //Method to display success message
  function win(){
    successLabel = new createjs.Text("Success!!", "60px Consolas", " #0F52BA");
    successLabel.regX = successLabel.getBounds().width * 0.5;
    successLabel.regY = successLabel.getBounds().height * 0.5;
    successLabel.x = 320;
    successLabel.y = 60 +Dice1.getBounds().height + 100;
    stage.addChild(successLabel);
  }

  window.addEventListener("load", Init);
})(app | (app = {}));

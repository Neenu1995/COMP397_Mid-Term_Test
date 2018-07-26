let app;
(function(app) {
  "use strict";

  // Game Variables
  let stage;
  let canvas;
  let helloLabel;
  let assetManager;
  let startButton;
    
  let manifest = [
      { id: "one", src: "/Assets/images/1.png" }, 
      { id: "two", src: "/Assets/images/2.png" }, 
      { id: "three", src: "/Assets/images/3.png" }, 
      { id: "four", src: "/Assets/images/4.png" },
      { id: "five", src: "/Assets/images/5.png" },
      { id: "six", src: "/Assets/images/6.png" },
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
    startButton.y = 300;
    stage.addChild(startButton);

    // start button listeners
    startButton.addEventListener("click", function() {
        console.log("Start Button Clicked");
    });

    startButton.addEventListener("mouseover", function(event) {
        event.currentTarget.alpha = 0.7;
    });

    startButton.addEventListener("mouseout", function(event) {
        event.currentTarget.alpha = 1.0;
    });
  }

  window.addEventListener("load", Init);
})(app | (app = {}));

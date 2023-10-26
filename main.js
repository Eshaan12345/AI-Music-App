song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() 
{
    song = loadSound("music.mp3");
}






function setup() 
{
    canvas = createCanvas(500,500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();
  
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() 
{
    console.log('Posenet has been initialized!');
}

function draw() 
{
    image(video,0,0,600,500);
}

function play() 
{
    song.play();
    song.setVolume(a); 
}

function gotPoses(results)
{
    scoreLeftWrist = results[0].keypoints[9].score;
    scoreRighttWrist = results[0].keypoints[10].score;

    if(scoreLeftWrist > 0.2 && scoreRightWrist > 0.2)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        a = Math.floor(leftWristX-leftWristY);
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
        
        if (leftWristY > 0 && leftWristY <= 100) {
            song.rate(0.5);
            console.log("song.rate(0.5);")
        } else  if (leftWristY > 100 && leftWristY <= 200) {
            song.rate(1);
            console.log("song.rate(1);")
        } else  if (leftWristY > 200 && leftWristY <= 300) {
            song.rate(1.5);
            console.log("song.rate(1.5);")
        } else  if (leftWristY > 300 && leftWristY <= 400) {
            song.rate(2);
            console.log("song.rate(2);")
        } else  if (leftWristY > 400 && leftWristY <= 500) {
            song.rate(2.5);
            console.log("song.rate(2.5);")
        }
    }
}
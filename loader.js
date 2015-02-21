var audio = new Audio();
audio.src = 'out.mp3';
audio.controls = true;
audio.loop = false;
audio.autoplay = true;
document.body.appendChild(audio);

var audioCtx = new AudioContext();
var analyser = audioCtx.createAnalyser();
var source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);

var canvas = document.getElementById('myCanvas');
var gl = canvas.getContext('webgl');
gl.clearColor(1.0, 0.0, 0.0, 1.0);
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);
gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

var frequencyData = new Uint8Array(analyser.frequencyBinCount);

function renderFrame() {
  requestAnimationFrame(renderFrame);
  analyser.getByteFrequencyData(frequencyData);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.clearColor(frequencyData[0]/255, frequencyData[1]/255, frequencyData[2]/255, 1.0);
};
renderFrame();


// var audioSrc = ctx.createMediaElementSource(audio);
// var analyser = ctx.createAnalyser();
// // // we have to connect the MediaElementSource with the analyser 
// // audioSrc.connect(analyser);
// // // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)

// // // frequencyBinCount tells you how many values you'll receive from the analyser
// // var frequencyData = new Uint8Array(analyser.frequencyBinCount);

// we're ready to receive some data!
// // loop
// function renderFrame() {
//    requestAnimationFrame(renderFrame);
//    // update data in frequencyData
//    analyser.getByteFrequencyData(frequencyData);
//    // render frame based on values in frequencyData
//    // console.log(frequencyData)
// }
// audio.play();
// renderFrame();
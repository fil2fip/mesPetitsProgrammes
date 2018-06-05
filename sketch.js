/*
**********************    Tanks to DTS, Coding Train. ************************

http:open-notify.org/
http:api.open-notify.org/iss-now.json    <<<<<<<<<<<
https:www.cartograf.fr/images/map/monde-pays/grande_carte_monde_vierge_decoupage_pays_fond_bleu.png

The map is only a picture, not accurate.

*/

var img;
var url = 'http://api.open-notify.org/iss-now.json';
var api;
var interv = 60000; // chaque minute
var traceX = [];
var traceY = [];
var maxTrace = 100;
var x, y;


function legende() {
  textAlign(CENTER, CENTER);
  text("Actuel :", 50, 395);
  stroke(100, 0, 100);
  ellipse(80, 395, 5, 5);
  noFill();
  text("Précédent(s) :", 150, 395)
  ellipse(195, 395, 5, 5);
}

function litData() {
  api = loadJSON(url, okData);
}

function okData(data) {
  var l;
  traceX.push(api.iss_position.longitude);
  traceY.push(api.iss_position.latitude);
  if (traceX.length > maxTrace) {
    traceX.splice(0, 1);
    traceY.splice(0, 1);
  }
  l = traceX.length - 1;
  console.log(l + 1 + " : ", traceX[l], traceY[l]);
}


function setup() {
  createCanvas(800, 400);
  frameRate(5);
  img = loadImage("carteDuMonde.jpg");
  noFill();
  stroke(100, 0, 100);
  litData(); // Une fois au début ...
  setInterval(litData, interv);
}

function draw() {
  image(img, 0, 0, 800, 400);
  legende();
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);
  for (var i = traceX.length - 1; i >= 0; i--) {
    x = map(traceX[i], -180, 180, 0, 800);
    y = map(traceY[i], 180, -180, 0, 400);
    if (i == traceX.length - 1) {
      fill(100, 0, 100);
    } else {
      noFill();
    }
    ellipse(x, y, 5, 5);
  }
}

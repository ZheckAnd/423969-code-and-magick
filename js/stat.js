'use strict';
window.renderStatistics = function (ctx, names, times) {
  var FILL_STYLE_ORIGIN = '#000';
  var FONT = '16px PT Mono';
  var GISTOGRAM_HEIGHT = 150; // px;
  var BAR_WIDTH = 40; // px;
  var INDENT_WIDTH = 50; // px;
  var INITIAL_X = 150; // px;
  var INITIAL_Y = 100; // px;
  var SPACE = 20; // px;
  var OFFSET_X = 10; // px;
  var OFFSET_Y = 10; // px;

  var positionWhiteX = [100, 500, 508, 518, 520, 520, 120, 112, 102, 100, 100];
  var positionWhiteY = [10, 10, 12, 17, 30, 280, 280, 278, 273, 260, 10];
  var positionShadowX = [];
  var positionShadowY = [];
  var i = 0;

  while (i < positionWhiteX.length) {
    positionShadowX[i] = positionWhiteX[i] + OFFSET_X;
    positionShadowY[i] = positionWhiteY[i] + OFFSET_Y;
    i++;
  }

  var drowPath = function (positionX, positionY) {
    ctx.beginPath();
    ctx.moveTo(positionX[0], positionY[0]);
    ctx.lineTo(positionX[1], positionY[1]);
    ctx.bezierCurveTo(positionX[2], positionY[2], positionX[3], positionY[3], positionX[4], positionY[4]);
    ctx.lineTo(positionX[5], positionY[5]);
    ctx.lineTo(positionX[6], positionY[6]);
    ctx.bezierCurveTo(positionX[7], positionY[7], positionX[8], positionY[8], positionX[9], positionY[9]);
    ctx.lineTo(positionX[10], positionY[10]);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  };
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // Shadow Path;
  drowPath(positionShadowX, positionShadowY);

  ctx.fillStyle = 'white'; // White Path;
  drowPath(positionWhiteX, positionWhiteY);

  ctx.fillStyle = FILL_STYLE_ORIGIN;
  ctx.font = FONT;

  ctx.fillText('Ура вы победили!', 150, 40);
  ctx.fillText('Список результатов:', 150, 60);

  var max = -1;

  for (i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var histogramHeight = GISTOGRAM_HEIGHT;
  var step = histogramHeight / (max - 0);

  var barWidth = BAR_WIDTH;
  var indent = INDENT_WIDTH + BAR_WIDTH;
  var initialX = INITIAL_X; // px;
  var initialY = INITIAL_Y; // px;
  var lineUp = SPACE / 2;// px;
  var lineDown = SPACE;// px;

  for (i = 0; i < times.length; i++) {
    ctx.fillStyle = FILL_STYLE_ORIGIN;
    ctx.fillText(names[i], initialX + indent * i, initialY + histogramHeight + lineDown);
    ctx.fillText(times[i].toFixed(), initialX + indent * i, initialY + histogramHeight - times[i] * step - lineUp);
    var randomAlpha = Math.random();
    ctx.fillStyle = 'rgba(0, 0, 255, ' + randomAlpha + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(initialX + indent * i, initialY + histogramHeight - times[i] * step, barWidth, times[i] * step);
  }
};

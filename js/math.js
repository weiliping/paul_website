function random_num(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function getRandomEquation() {
    var startInt = random_num(10, 100);
    var sign = random_num(1, 100) % 2 == 0 ? "+" : "-";
    var endInt = getEndInt(startInt, sign);
    return [startInt, endInt, sign];
}

function getEndInt(startInt, sign) {
    var firstNum = Math.floor(startInt / 10);
    var lastNum = startInt % 10;
    var endFirstNum = getNoneZero(sign == "+" ? 10 - firstNum : firstNum);
    var endLastNum = getLessRandom(sign == "+" ? 10 - lastNum : lastNum);
    return endFirstNum * 10 + endLastNum;
}

function getNoneZero(num) {
    var rNum = getLessRandom(num);
    return rNum != 0 ? rNum : getNoneZero(num);
}

function getLessRandom(num) {
    if (num == 0) {
        return num;
    }
    console.log("num=" + num);
    var randomNum = random_num(0, 10);
    return randomNum <= num ? randomNum : getLessRandom(num);
}

function generateMaths() {
    var html = "";
    var i = 100;
    while (i > 0) {
        var equa = getRandomEquation();
        console.log( "array size =" + equa.length);
        html += "<div class='method-row'>" + equa[0] + " " + equa[2] + " " + equa[1] + " = </div>"
        i--;
    }
    return html;
}

function attachHtml(html) {
    $('#math-container-id').html(html);
}

$(document).ready(function () {
    attachHtml(generateMaths());
});
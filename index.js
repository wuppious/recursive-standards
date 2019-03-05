var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

var problem = '<div class="pull-left"><img src="img/problem.png">';
var solution = '<div class="pull-left"><img src="img/solution.png">';
var result = '<div class="pull-left"><img src="img/result.png">';

var count = Math.max(15, parseInt(urlParams.count, 10) + 1 || 15);

var container = document.getElementById('container');
var content = [
  problem + countElem('lower', count -1),
  solution + countElem('upper', count -1),
  result + countElem('lower', count),
  solution + countElem('upper', count),
];
var isProblem = false;


function scroll() {
  if (container.scrollLeft >= 194) {
    count += isProblem ? 0 : 1;

    content.splice(0,1);
    var newElement = isProblem ? solution : result;
    content.push(newElement + countElem(isProblem ? 'upper' : 'lower', count));
    container.scrollLeft = (isProblem ? 0 : 61);
    isProblem = !isProblem;
    container.innerHTML = toElems(content);
  }
}

function countElem(where, count) {
  var px = 20 * 2 / count.toString().length
  var style = ' style="font-size: ' + px + 'px;"';
  var span = '<span ' + style + '>' + count + '</span>';
  return '<p align="right" class="count' + where + '">' + span + '</p>'
}

function toElems(arr) {
  return arr.join('</div>') + '</div>';
}

container.onscroll = scroll;
container.ontouchmove = scroll;



container.innerHTML = toElems(content);

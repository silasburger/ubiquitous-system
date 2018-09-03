newGame();

function newGame() {
  var spans = document.querySelectorAll('span');
  var numPool = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  var chosen = [];
  for (let i = 0; i < spans.length; i++) {
    var random = Math.floor(Math.random() * numPool.length);
    var pic = 'owls/' + numPool[random] + '.png';
    spans[i].style.backgroundImage = 'URL(' + pic + ')';
    if (chosen.includes(numPool[random])) {
      numPool.splice(random, 1);
    } else {
      chosen.push(numPool[random]);
    }
  }
}

function choose() {
  var oneFlipped = false;
  return function(e) {
    console.log(e.target);
    var closestCard = e.target.closest('.card');
    var closestSpan = closestCard.childNodes[3].childNodes[0];
    if (
      closestCard.contains(e.target) &&
      e.target.classList[0] === 'card-face' &&
      !oneFlipped
    ) {
      closestCard.classList.toggle('is-flipped');
      oneFlipped = true;
    } else if (
      e.target.classList[0] === 'card-face' &&
      closestCard.contains(e.target) &&
      oneFlipped &&
      document.getElementsByClassName('is-flipped')[0].childNodes[3]
        .childNodes[0].style.backgroundImage ===
        closestSpan.style.backgroundImage &&
      document.getElementsByClassName('is-flipped')[0].childNodes[3]
        .childNodes[0] !== closestSpan
    ) {
      document.getElementsByClassName('is-flipped')[0].style.transform =
        'rotateY(180deg)';
      closestSpan.parentNode.parentNode.style.transform = 'rotateY(180deg)';
      document
        .getElementsByClassName('is-flipped')[0]
        .classList.toggle('is-flipped');
      oneFlipped = false;
    } else if (
      closestCard.contains(e.target) &&
      e.target.classList[0] === 'card-face' &&
      oneFlipped
    ) {
      oneFlipped = false;
      closestCard.classList.toggle('is-flipped');
      window.setTimeout(function() {
        closestCard.classList.toggle('is-flipped');
        document
          .getElementsByClassName('is-flipped')[0]
          .classList.toggle('is-flipped');
        document.getElementById('score').innerText = String(
          +document.getElementById('score').innerText + 1
        );
      }, 1000);
    }
  };
}

var selected = choose();

document.getElementById('new-game').addEventListener('click', newGame);

document.getElementById('game-container').addEventListener('click', selected);

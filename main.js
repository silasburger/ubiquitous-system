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
  var closestCard = e.target.closest('.card');
  var closestSpan = e.target.closest('span');
  var oneFlipped = false;
  return function() {
    if (closestCard.contains(e.target) && !oneFlipped) {
      closestCard.classList.toggle('is-flipped');
      oneFlipped = true;
    } else if (
      closestCard.contains(e.target) &&
      oneFlipped &&
      document.getElementsByClassName('is-flipped')[0].childNodes[3]
        .childNodes[0].style.backgroundImage ===
        closestSpan.style.backgroundImage
    ) {
      document.getElementsByClassName('is-flipped')[0].style.transform =
        'rotateY(180deg)';
      closestSpan.parentNode.parentNode.style.transform = 'rotateY(180deg)';
      document.getElementsByClassName('is-flipped')[0].toggle('is-flipped');
      oneFlipped = false;
    } else if (closestCard.contains(e.target) && oneFlipped) {
      document.getElementsByClassName('is-flipped')[0].toggle('is-flipped');
      closestCard.toggle('is-flipped');
      Window.setTimeout(function() {
        closestCard.toggle('is-flipped');
      }, 1000);
    }
  };
}

document.getElementById('new-game').addEventListener('click', newGame);

document
  .getElementById('game-container')
  .addEventListener('click', function(e) {
    var closestCard = e.target.closest('.card');
    var closestRow = e.target.closest('.container');
    if (closestCard.contains(e.target) && closestRow.contains(e.target)) {
      closestCard.classList.toggle('is-flipped');
    }
  });

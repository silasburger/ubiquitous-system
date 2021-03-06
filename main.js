newGame();

function newGame() {
  var spans = document.querySelectorAll('.image');
  var numPool = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  var chosen = [];
  for (let i = 0; i < spans.length; i++) {
    spans[i].closest('.card').style.transform = '';
  }
  window.setTimeout(function() {
    for (let i = 0; i < spans.length; i++) {
      document.getElementById('score').innerText = '0';
      var random = Math.floor(Math.random() * numPool.length);
      var pic = 'owls/' + numPool[random] + '-min.png';
      spans[i].style.backgroundImage = 'URL(' + pic + ')';
      if (chosen.includes(numPool[random])) {
        numPool.splice(random, 1);
      } else {
        chosen.push(numPool[random]);
      }
    }
  }, 1000);
}

function choose(e) {
  var closestCard = e.target.closest('.card');
  var closestSpan = closestCard.childNodes[3].childNodes[0];
  var flippedCards = document.getElementsByClassName('is-flipped');

  //First flip
  if (
    flippedCards.length === 0 &&
    closestCard.contains(e.target) &&
    (e.target.classList[0] === 'card-face' || e.target.classList[0] === 'image')
  ) {
    closestCard.classList.toggle('is-flipped');
  }

  //Same
  else if (
    flippedCards.length === 1 &&
    closestCard.contains(e.target) &&
    flippedCards[0].childNodes[3].childNodes[0] === closestSpan &&
    (e.target.classList[0] === 'card-face' || e.target.classList[0] === 'image')
  ) {
    flippedCards[0].classList.toggle('is-flipped');
  }

  //Second flip - Correct
  else if (
    closestCard.contains(e.target) &&
    flippedCards[0].childNodes[3].childNodes[0].style.backgroundImage ===
      closestSpan.style.backgroundImage &&
    flippedCards[0].childNodes[3].childNodes[0] !== closestSpan &&
    (e.target.classList[0] === 'card-face' || e.target.classList[0] === 'image')
  ) {
    flippedCards[0].style.transform = 'rotateY(180deg)';
    closestCard.style.transform = 'rotateY(180deg) rotateX(360deg)';
    flippedCards[0].classList.toggle('is-flipped');
  }

  //Second flip - Incorrect
  else if (
    flippedCards.length === 1 &&
    closestCard.contains(e.target) &&
    (e.target.classList[0] === 'card-face' || e.target.classList[0] === 'image')
  ) {
    closestCard.classList.toggle('is-flipped');
    window.setTimeout(function() {
      closestCard.classList.toggle('is-flipped');
      flippedCards[0].classList.toggle('is-flipped');
      document.getElementById('score').innerText = String(
        +document.getElementById('score').innerText + 1
      );
    }, 1000);
  }
}

// handlers
document.getElementById('new-game').addEventListener('click', newGame);
document.getElementById('game-container').addEventListener('click', choose);

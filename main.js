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

document.getElementById('new-game').addEventListener('click', newGame());

document
  .getElementById('game-container')
  .addEventListener('click', function(e) {
    var closestCard = e.target.closest('.card');
    var closestRow = e.target.closest('.container');
    if (closestCard.contains(e.target) && closestRow.contains(e.target)) {
      closestCard.classList.toggle('is-flipped');
    }
  });

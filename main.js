document
  .getElementById('game-container')
  .addEventListener('click', function(e) {
    var closestCard = e.target.closest('.card');
    var closestRow = e.target.closest('.container');
    if (closestCard.contains(e.target) && closestRow.contains(e.target)) {
      closestCard.classList.toggle('is-flipped');
    }
  });

class Character {
  constructor(id) {
    this.element = document.getElementById(id);
    this.sup1 = new SuperGif({ gif: this.element } );
    this.sup1.load();
  }

  play() {
    this.sup1.play();
  }

  pause() {
    this.sup1.pause();
  }

  restart() {
    this.sup1.move_to(0);
  }

  moveForward() {
    this.sup1.move_relative(1);
  }

  moveBackward() {
    this.sup1.move_relative(-1);
  }

  flipDirection(isGoingRight) {
    if (isGoingRight) {
      document.querySelector('.character_wrapper').classList.remove('flipped');
    } else {
      document.querySelector('.character_wrapper').classList.add('flipped');
    }
  }
}

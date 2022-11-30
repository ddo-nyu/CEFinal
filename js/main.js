window.onload = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const characterWrapper = document.querySelector('.character_wrapper');
  // characterWrapper.style.top = `${windowHeight / 2}px`;
  // characterWrapper.style.left = `${windowWidth / 2}px`;

  const startButton = document.querySelector('.startButton');
  startButton.onclick = () => {
    setupPitchDetection();
  }

  const character = new Character('character_going_right');

  const options = { probabilityThreshold: 0.7 };
  const classifier = ml5.soundClassifier('SpeechCommands18w', options, () => console.log('SoundClassifier model ready'));
  let multiplier = 10;

  const gotResult = (error, result) => {
    if (error) {
      console.log(error);
      return;
    }
    // log the result
    console.log(result[0].label, result[0].confidence, multiplier);

    const charWrapper = document.querySelector('.character_wrapper');

    switch(result[0].label) {
      case 'up':
        charWrapper.classList.add('jump');
        setTimeout(() => charWrapper.classList.remove('jump'), 1000);
        break;
      case 'right':
        character.flipDirection(true);
        break;
      case 'left':
        character.flipDirection(false);
        break;
      default:
        break;
    }
  }

  let pitch;

  const setupPitchDetection = async () => {
    const audioContext = new AudioContext();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    pitch = ml5.pitchDetection('./model/', audioContext , stream, () => {
      getPitch();
      classifier.classify(gotResult);
      character.play();
    });
  };

  const getPitch = () => {
    pitch.getPitch(function(err, frequency) {
      if (frequency) {
        console.log('frequency', frequency);
        if (frequency > 200) {
          multiplier = frequency / 5;
        } else {
          multiplier = 10;
        }
      }
      getPitch();
    });
  };
}


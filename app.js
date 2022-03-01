let keys = document.querySelectorAll('.keys');
let spaceKey = document.querySelector('.space');
let shift_left = document.querySelector('.shift-left');
let shift_right = document.querySelector('.shift-right');
let caps_lock_key = document.querySelector('.caps_lock');
let toggle_circle = document.querySelector('.toggle_circle');
let night_mode = document.querySelector('.night_mode');
let body = document.querySelector('body');
let text_input = document.querySelector('.text');
let change_colors = document.querySelector('.change_light_color');
let colors_input = document.querySelector('.colors_input');
let keyboard_lights = document.querySelector('.keyboard_lights');
let keyboard_wrapper = document.querySelector('.keyboard_wrapper');
let random_word = document.querySelector('.word-display');
let time_display = document.querySelector('.time-display');
let timeSec = 60;
let score = 0;
let score_display = document.querySelector('.score');
// let text_border = document.querySelector('.text:focus');

//sets attributes for each key//
for(let i = 0; i < keys.length; i++) {
    keys[i].setAttribute('keyname', keys[i].innerText);
    keys[i].setAttribute('lowerCaseName', keys[i].innerText.toLowerCase());

}

//Disables enter key default function//
document.addEventListener('keypress', function (e) {
    if (e.keyCode === 32 || e.which === 32) {
        e.preventDefault();
        return false;
    }
});

//Disables space key default function//
document.addEventListener('keypress', function (e) {
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
    }
});

//keydown functions//
window.addEventListener('keydown', function(e) {
    for(let i = 0; i < keys.length; i++) {
        if(e.key == keys[i].getAttribute('keyname') || e.key == keys[i].getAttribute('lowerCaseName')) {
            keys[i].classList.add('active');
        }
        if(e.code == 'Space') {
            spaceKey.classList.add('active');
        }
        if(e.code == 'ShiftRight') {
            shift_left.classList.remove('active');
        }
        if(e.code == 'ShiftLeft') {
            shift_right.classList.remove('active');
        }
        if(e.code == 'CapsLock') {
            caps_lock_key.classList.toggle('active');
        }
    }
});

//Key up functions//
window.addEventListener('keyup', function(e) {
    for(let i = 0; i < keys.length; i++) {
        if(e.key == keys[i].getAttribute('keyname') || e.key == keys[i].getAttribute('lowerCaseName')) {
            keys[i].classList.remove('active');
            keys[i].classList.add('remove');
        }
        if(e.code == 'Space') {
            spaceKey.classList.remove('active');
            spaceKey.classList.add('remove');
            
        }
        if(e.code == 'ShiftRight') {
            shift_right.classList.remove('active');
            shift_right.classList.add('remove');
            shift_left.classList.remove('remove');
        }
        if(e.code == 'ShiftLeft') {
            shift_left.classList.remove('active');
            shift_left.classList.add('remove');
            shift_right.classList.remove('remove');
        }    
        
        this.setTimeout(()=>{
            keys[i].classList.remove('remove');
        }, 200)
    }

});

//Sets night mode//
night_mode.addEventListener('click', function() {
    toggle_circle.classList.toggle('active');
    body.classList.toggle('active');
    night_mode.classList.toggle('active');
    text_input.classList.toggle('active');
    keyboard_wrapper.classList.toggle('active');
    change_colors.classList.toggle('active');
    for( let i = 0; i < keys.length; i++ ){
        keys[i].classList.toggle('keys_night');
    }
});
//changes custom background lights//
colors_input.addEventListener('input', function() {
    for ( let i =0; i < keys.length; i++) {
        keys[i].style.color = colors_input.value
    }
    keyboard_lights.style.background = colors_input.value;
});

//Create and display timer//
let startTimer = function() {
   const countDown = setInterval( function() {
        timeSec--;
        time_display.innerHTML = `00:${timeSec}`
        if ( timeSec === 0 ) {
            time_display.innerHTML = `Times Up`;
            clearInterval(countDown);
        }
        return timeSec;
    },1000);
}

//Fetches random word and displays it//
window.addEventListener('keydown', function(event) {
    let val = text_input.value;
    if (event.code === 'Space' ) {
        fetch('https://random-word-api.herokuapp.com/word?number=1')
                .then(response => response.json())
                .then(data => random_word.innerHTML = data)
        document.querySelector('.text').value = "";
    if (timeSec === 60){
        startTimer();
      }
      
    if (random_word.innerHTML === val) {
            console.log('Correct');
            correctDisplay();
        } else {
        console.log('wrong');
        if(timeSec < 60) {
            incorrectDisplay();
        }
    }
    
  }
});
//Correct answer display//
let correctDisplay = function() {
    text_input.classList.remove('text:focus');
    text_input.classList.add('correct');
    
    if(text_input.classList.contains('active') === true) {
        text_input.classList.remove('active');
    }
    
    if (timeSec > 0) {score++;
    score_display.innerHTML = `${score}`;
    }
    setTimeout(function(){
        text_input.classList.remove('correct');
        if (body.classList.contains('active')) {
            text_input.classList.add('active');
        }
    },500); 
}

//Incorrect answer display//
let incorrectDisplay = function() {
    text_input.classList.remove('text:focus');
    text_input.classList.add('incorrect');
    
    if(text_input.classList.contains('active') === true) {
        text_input.classList.remove('active');
    }
    
    

    setTimeout(function(){
        // score_display.innerHTML = `${score}`;
        text_input.classList.remove('incorrect');
        if (body.classList.contains('active')) {
            text_input.classList.add('active');
        }
        
    },500); 
}







const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function tellMe(joke) {
    VoiceRSS.speech({
        key: 'cdbe637a18c248cfaca8903c81d1c3a4',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

function toggleButton() {
    button.disabled = !button.disabled;
}

async function getJokesFromAPI() {
    const jokeURL = "https://v2.jokeapi.dev/joke/Any"
    let joke = "";
    try {
        const response = await fetch(jokeURL);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        }
        else{
            joke = data.joke;
        }
        tellMe(joke);
        toggleButton();
    } catch (error) {
        console.log("error : ",error);
    }
}

/* Event Listeners */
button.addEventListener('click',getJokesFromAPI);

audioElement.addEventListener('ended',toggleButton)
// Variáveis
const menuBtn = document.querySelector(".menu-btn"),
    container = document.querySelector(".container"),
    progressBar = document.querySelector(".bar"),
    progressDot = document.querySelector(".dot"),
    currentTimeElement = document.querySelector(".current-time"),
    durationElement = document.querySelector(".duration")



menuBtn.addEventListener("click", () => {
    container.classList.toggle("active")
})
// Variáveis
let playing = false,
    currentSong = 0,
    shuffle = false,
    repeat = false,
    favourits = [],
    audio = new Audio()

const songs = [
    {
        title: "Take On Me",
        artist: "a-ha",
        img_src: "../assets/a-ha.jpg",
        src: "../assets/musicTakeOnMe.mp3"
    },
    {
        title: "Summer Of'69",
        artist: "Bryan Adams",
        img_src: "../assets/bryanAdams.jpg",
        src: "../assets/musicSummerOf69.mp3"
    },
    {
        title: "Girls Just Want To Have Fun",
        artist: "Cyndi Lauper",
        img_src: "../assets/cyndiLauper.jpg",
        src: "../assets/musicGirlsJustWantToHaveFun.mp3"
    },
    {
        title: "Time After Time",
        artist: "Cyndi Lauper",
        img_src: "../assets/cyndiLauper.jpg",
        src: "../assets/musicTimeAfterTime.mp3"
    },
    {
        title: "Sweet Dreams",
        artist: "eurythmics",
        img_src: "../assets/eurythmics.jpg",
        src: "../assets/musicSweetDreams.mp3"
    },
    {
        title: "Footlose",
        artist: "Kenny Loggins",
        img_src: "../assets/kennyLoggins.jpg",
        src: "../assets/musicFootlose.mp3"
    }
]
// Variáveis
const playlistContainer = document.querySelector("#playlist"),
    infoWrapper = document.querySelector(".info"),
    coverImage = document.querySelector(".cover-image"),
    currentSongTitle = document.querySelector(".current-song-title"),
    currentFavourite = document.querySelector("#current-favourite")
    


function init() {
    updatePlaylist(songs)
    loadSong(currentSong)
}

init()

function updatePlaylist(songs) {
    // Remove qualquer elemento  existente

    playlistContainer.innerHTML = ""

    // use para cada matriz de músicas
    songs.forEach((song, index) => {
        //Extrai dados da músic 
        const { title, src } = song
        // Verifica se está na matriz de favoritos
        const isFavourite = favourits.includes(index)

        // Cria uma tabela junta com os sons
        const tr = document.createElement("tr")
        tr.classList.add("song")
        tr.innerHTML = `       
            <tr class="song">
                <td class="no">
                    <h5>${index + 1}</h5>
                </td>
                <td class="title">
                    <h6>${title}</h6>
                        
                </td>
                <td class="length">
                    <h5>2:03</h5>
                </td>
                <td>
                    <i class="fas fa-heart ${isFavourite ? "active" : ""}"></i>
                </td>
            </tr>
                `

        playlistContainer.appendChild(tr)




        // Tocar a música quando clicada na playlist

        tr.addEventListener("click", (e) => {


            if(e.target.classList.contains("fa-heart")){
                addToFavourits(index)
                e.target.classList.toggle("active")
                return
            }
            currentSong = index
            loadSong(currentSong)
            audio.play()
            container.classList.remove("active")
            playPauseBtn.classList.replace("fa-play", "fa-pause")
            playing = true
        })
        const audioForDuration = new Audio(`data/${src}`)
        audioForDuration.addEventListener("loadedmetadata", () => {
            const duration = audioForDuration.duration

            let songDuration = formatTime(duration)
            tr.querySelector(".length h5").innerText = songDuration
        })
    });
}

function formatTime(time) {
    // formatar o tempo tipo 2:30
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time % 60)
    // Adiciona zero  se os segundo forem menores do que 10
    seconds = seconds < 10 ? `0${seconds}` : seconds
    return `${minutes}:${seconds}`

}



function loadSong(num) {
    // Muda todos títulos,artistas e tempo para a devida música
    infoWrapper.innerHTML = `
        <h2>${songs[num].title}</h2>
        <h3>${songs[num].artist}</h3>
    `
    

    

    currentSongTitle.innerHTML = songs[num].title
    // muda o cabeçalho da capa da música

    coverImage.style.backgroundImage = `url(../assets/${songs[num].img_src})`


    // Adicionando o endereço da música que está tocando

    audio.src = `../assets/${songs[num].src}`



    // Se a música estiver no highlight de favorita
   
    if(favourits.includes(num)){
        currentFavourite.classList.add("active")
    } else{
        // se não for, remove a classe ativa
        currentFavourite.classList.remove("active")
    }
}

    //Adicionando as funcionalidades de play, pause, próximo e anterior 

const playPauseBtn = document.querySelector("#playPause"),
nextBtn = document.querySelector("#next"),
prevBtn = document.querySelector("#prev")


playPauseBtn.addEventListener("click", () => {
    if(playing){
        playPauseBtn.classList.replace("fa-pause","fa-play")
        playing = false
        audio.pause()
    }else{
        playPauseBtn.classList.replace("fa-play","fa-pause")
        playing = true
        audio.play()
    }
})

function nextSong(){

    if(shuffle){
        shuffleFunction()
        loadSong(currentSong)
        
    } else if(currentSong < songs.length - 1){
        currentSong++
        loadSong(currentSong)
    }else{
        currentSong = 0
    }
    loadSong(currentSong)

    // Quando pular para a próxima, se estiver tocando, continuar tocando

    if(playing){
        audio.play()
    }
}

function prevSong(){

    if(shuffle){
        shuffleFunction()
        loadSong(currentSong)
        
    } else if(currentSong > 0){
        currentSong--
    }else{
        currentSong = songs.length - 1
    }
    loadSong(currentSong)

    // Quando passar para a anterior, se estiver tocando, continuar tocando

    if(playing){
        audio.play()
    }
}



nextBtn.addEventListener("click", nextSong)
prevBtn.addEventListener("click", prevSong)

function addToFavourits(index){
    if(favourits.includes(index)){
        favourits = favourits.filter((item) => item !== index)
        currentFavourite.classList.remove("active")
    }else {
        favourits.push(index)
        if(index === currentSong){
            currentFavourite.classList.add("active")
        }
    }

    updatePlaylist(songs)
}

currentFavourite.addEventListener("click", () =>{
    currentFavourite.classList.toggle("active")
    addToFavourits(currentSong)
})


// Função de aleatório

const shuffleBtn = document.querySelector("#shuffle")

function shuffleSongs(){

    shuffle = !shuffle
    shuffleBtn.classList.toggle("active")
}
shuffleBtn.addEventListener("click", shuffleSongs)


function shuffleFunction(){
    if(shuffle){
        currentSong = Math.floor(Math.random()*songs.length)
    } 
}

const repeatBtn = document.querySelector("#repeat")
function repeatSong(){
    if(repeat === 0){

        repeat = 1
        repeatBtn.classList.add("active")
    } else if(repeat == 1){
        repeat = 2
        repeatBtn.classList.add("active")
    } else{
        repeat = 0
        repeatBtn.classList.remove("active")

    }
}
repeatBtn.addEventListener("click", repeatSong)

audio.addEventListener("ended",() =>{
    if(repeat === 1){
        loadSong(currentSong)
        audio.play()
    }else if(repeat === 2){
        nextSong()
        audio.play()
    } else{
        if(currentSong === songs.length -1){
            audio.pause()
            playPauseBtn.classList.replace("fa-pause", "fa-play")
            playing = false
        } else{
            nextSong()
            audio.play()
        }
    }
})

// Barra de progreço

function progress(){
    let{duration, currentTime} = audio

    isNaN(duration) ? (duration = 0) : duration
    isNaN(currentTime) ? (currentTime = 0) : currentTime

    currentTimeElement.innerHTML = formatTime(currentTime)
    durationElement.innerHTML = formatTime(duration)

    let progressPercentage = (currentTime / duration) * 100
    progressDot.style.left = `${progressPercentage}%`
}

audio.addEventListener("timeupdate", progress)

function setProgress(e){
    let width = this.clientWidth
    let clickX = e.offsetX
    let duration = audio.duration
    audio.currentTime = (clickX/width) * duration
}
progressBar.addEventListener("click", setProgress)
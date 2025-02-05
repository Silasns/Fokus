const html = document.querySelector("html");
const btFoco = document.querySelector(".app__card-button--foco");
const btDescansoCurto = document.querySelector(".app__card-button--curto");
const btDescansoLongo = document.querySelector(".app__card-button--longo");
const btnStartPause = document.querySelector("#start-pause span");
const imgTopo = document.querySelector(".app__image");
const imgStartpause = document.querySelector(".app__card-primary-butto-icon");
const title = document.querySelector(".app__title");
const timer = document.querySelector("#timer");
const arrayButtons = document.querySelectorAll(".app__card-button");
const musicaInput = document.querySelector("#alternar-musica");
const music = new Audio("/sons/luna-rise-part-one.mp3");
const beepFim = new Audio("/sons/beep.mp3");
const musicPlay = new Audio("/sons/play.wav");
const musicPause = new Audio("/sons/pause.mp3");
music.loop = true;

let intervaloId = null;
const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;
let temporizadorcache = duracaoFoco;
let temporizador = duracaoFoco;

musicaInput.addEventListener("change", () => {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
});

btnStartPause.addEventListener("click", () => {
  playTemporizadorAndPause();
  if (btnStartPause.innerText == "Começar") {
    playButton();
    musicPlay.play();
  } else {
    pauseButton();
    musicPause.play();
  }
});

btFoco.addEventListener("click", () => {
  setTemplate("foco");
  btFoco.classList.add("active");
});

btDescansoCurto.addEventListener("click", () => {
  setTemplate("descanso-curto");
  btDescansoCurto.classList.add("active");
});

btDescansoLongo.addEventListener("click", () => {
  setTemplate("descanso-longo");
  btDescansoLongo.classList.add("active");
});

function playButton() {
  btnStartPause.innerText = "Pausar";
  imgStartpause.setAttribute("src", "/imagens/pause.png");
}

function pauseButton() {
  btnStartPause.innerText = "Começar";
  imgStartpause.setAttribute("src", "/imagens/play_arrow.png");
}

const contagemRegressiva = () => {
  if (temporizador <= 0) {
    console.log("Estou sendo chamando");
    beepFim.play();
    alert("Tempo Finalizado!");
    finalizarTemporizador();
    beepFim.pause();
    temporizador = temporizadorcache;
    pauseButton();
    return;
  }
  temporizador -= 1;
  console.log(temporizador);
};

function finalizarTemporizador() {
  clearInterval(intervaloId);
  intervaloId = null;
}

function playTemporizadorAndPause() {
  console.log("Temporizador: ", temporizador);
  if (intervaloId) {
    finalizarTemporizador();
    return;
  }
  intervaloId = setInterval(contagemRegressiva, 1000);
}

function setTemplate(template) {
  arrayButtons.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", template);
  imgTopo.setAttribute("src", `/imagens/${template}.png`);
  switch (template) {
    case "foco":
      temporizador = duracaoFoco;
      temporizadorcache = duracaoFoco;
      title.innerHTML =
        "Otimize sua produtividade,<br /><strong class='app__title-strong'>mergulhe no que importa.</strong>";
      break;

    case "descanso-curto":
      temporizador = duracaoDescansoCurto;
      temporizadorcache = duracaoDescansoCurto;
      title.innerHTML =
        "Que tal dar uma respirada?<br /><strong class='app__title-strong'>Faça uma pausa curta.</strong>";
      break;
    case "descanso-longo":
      temporizador = duracaoDescansoLongo;
      temporizadorcache = duracaoDescansoLongo;
      title.innerHTML =
        "Hora de voltar à superfície.<br /><strong class='app__title-strong'>Faça uma pausa longa.</strong>";
      break;
    default:
      break;
  }
}

function exibirtempo() {
  tempo = new Date(temporizador * 1000); //Aqui o date trabalha com milisegundo
  tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  timer.innerHTML = `${tempoFormatado}`;
}

exibirtempo();

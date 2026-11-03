const DATA_REENCONTRO = "2027-01-04T09:00:00";

const mensagens = [
  { titulo: "Quando estiver com saudade 💌", texto: "Eu também estou! Mas lembra que os dias estão acabando, logo a gente se ver de novo." },
  { titulo: "Quando o dia estiver difícil 🌧️", texto: "Respira. Você é mais forte do que imagina, e eu torço muito por você." },
  { titulo: "Quando o ano estiver acabando 🎆", texto: "Obrigado por mais um ano ao seu lado. Que 2027 comece ainda melhor!!" }
];
const envelopes = document.getElementById("envelopes");

mensagens.forEach((m) => {
  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "envelope";
  botao.innerHTML = `
    <div class="envelope__title">${m.titulo}</div>
    <div class="envelope__msg">${m.texto}</div>
  `;
  const msgEl = botao.querySelector(".envelope__msg");

  botao.addEventListener("click", () => {
    const vaiAbrir = !botao.classList.contains("open");
    botao.classList.toggle("open");

    if (vaiAbrir) {
      msgEl.classList.remove("appear");
      void msgEl.offsetWidth;
      msgEl.classList.add("appear");
    } else {
      msgEl.classList.remove("appear");
    }
  });

  envelopes.appendChild(botao);
});

const elDias = document.getElementById("dias");
const elHoras = document.getElementById("horas");
const elMin = document.getElementById("min");
const elMsg = document.getElementById("countdownMsg");

function atualizarContagem() {
  const diff = new Date(DATA_REENCONTRO) - new Date();

  if (diff <= 0) {
    elDias.textContent = elHoras.textContent = elMin.textContent = "0";
    elMsg.textContent = "Chegou o dia! Bem-vinda de volta! 🎉";
    return;
  }

  elDias.textContent = Math.floor(diff / 86400000);
  elHoras.textContent = Math.floor((diff / 3600000) % 24);
  elMin.textContent = Math.floor((diff / 60000) % 60);
  elMsg.textContent = "Já estou ansioso pra te ver!";
}

atualizarContagem();
setInterval(atualizarContagem, 60000);
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      observador.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => observador.observe(el));

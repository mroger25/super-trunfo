const btnSortear = document.getElementById("btnSortear");
const opcoes = document.getElementById("opcoes");
const btnJogar = document.getElementById("btnJogar");
const resultado = document.getElementById("resultado");

let cartasSelecionadas;
const cartasDoJogador = [];
const cartasDoComputador = [];

function Carta({ id, name, img }) {
  this.id = id;
  this.nome = name;
  this.img = img;
  this.atributos = {
    HP: Math.floor(Math.random() * 16),
    "Phc. Atk": Math.floor(Math.random() * 16),
    "Phc. Def": Math.floor(Math.random() * 16),
    "Mgc. Atk": Math.floor(Math.random() * 16),
    "Mgc. Def": Math.floor(Math.random() * 16),
    Speed: Math.floor(Math.random() * 16),
  };
}

const listaDeCartas = [
  new Carta({ id: "Nº001", name: "Bulbasaur", img: "001.png" }),
  new Carta({ id: "Nº002", name: "Ivysaur", img: "002.png" }),
  new Carta({ id: "Nº003", name: "Venusaur", img: "003.png" }),
  new Carta({ id: "Nº004", name: "Charmander", img: "004.png" }),
  new Carta({ id: "Nº005", name: "Charmeleon", img: "005.png" }),
  new Carta({ id: "Nº006", name: "Charizard", img: "006.png" }),
  new Carta({ id: "Nº007", name: "Squirtle", img: "007.png" }),
  new Carta({ id: "Nº008", name: "Wartortle", img: "008.png" }),
  new Carta({ id: "Nº009", name: "Blastoise", img: "009.png" }),
  new Carta({ id: "Nº010", name: "Caterpie", img: "010.png" }),
  new Carta({ id: "Nº011", name: "Metapod", img: "011.png" }),
  new Carta({ id: "Nº012", name: "Butterfree", img: "012.png" }),
  new Carta({ id: "Nº013", name: "Weedle", img: "013.png" }),
  new Carta({ id: "Nº014", name: "Kakuna", img: "014.png" }),
  new Carta({ id: "Nº015", name: "Beedrill", img: "015.png" }),
  new Carta({ id: "Nº016", name: "Pidgey", img: "016.png" }),
  new Carta({ id: "Nº017", name: "Pidgeotto", img: "017.png" }),
  new Carta({ id: "Nº018", name: "Pidgeot", img: "018.png" }),
];

function exibirCartaNaTela({ carta, num, hasInput, exemple }) {
  let elemento = "<div class='cartaTitle'>";
  if (exemple) {
    elemento += "Carta de exemplo";
  } else if (num) {
    elemento += "Carta do Computador";
  } else {
    elemento += "Carta do Jogador";
  }
  elemento += "</div>";
  // abertura da table
  elemento += "<div class=carta-table>";
  // nome da carta
  elemento +=
    "<div class='tituloCarta'><div class='nomeCarta'>" +
    carta.nome +
    "</div><div class='idCarta'>" +
    carta.id +
    "</div></div>";
  // imagem da carta
  elemento += "<div class='imgCarta'>";
  elemento +=
    "<img src='https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" +
    carta.img +
    "' alt='' />";
  elemento += "<br>crédito da imagem: pokemon.com</div>";
  // atributos
  for (const atrb in carta.atributos) {
    if (Object.hasOwnProperty.call(carta.atributos, atrb)) {
      const valorAtrb = carta.atributos[atrb];
      if (hasInput) {
        elemento += `<div><label for="${atrb}">`;
        elemento += `<input type="radio" name="atrbCarta" id="${atrb}" />`;
        elemento += `<span class="linhaAtrb input"><div class="chaveAtrb">${atrb}</div>`;
        elemento += `<div class="valorAtrb">${valorAtrb}</div></span>`;
        elemento += `</label></div>`;
      } else {
        elemento += `<div>`;
        elemento += `<span class="linhaAtrb"><div class="chaveAtrb">${atrb}</div>`;
        elemento += `<div class="valorAtrb">${valorAtrb}</div></span>`;
        elemento += `</div>`;
      }
    }
  }
  // fechamento da table
  elemento += "</div>";
  elemento += "<div class='footer-info'>Valores aleatórios</div>";

  document.getElementById("carta" + num).innerHTML = elemento;
}

function selecionarCartas() {
  const cartaJogador = cartasDoJogador.shift();
  const cartaComputador = cartasDoComputador.shift();
  return { cartaComputador, cartaJogador };
}

function embaralharCartas(array) {
  // The Fisher Yates Method
  const arrayLength = array.length;
  for (let i = arrayLength - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let k = array[i];
    array[i] = array[j];
    array[j] = k;
  }
}

function cortarBaralho() {
  const totalCartas = cartasDoJogador.length + cartasDoComputador.length;
  if (totalCartas === 0) {
    const indexMediana = Math.floor(listaDeCartas.length / 2);
    const indexMax = indexMediana * 2;
    for (let i = 0; i < indexMax; i++) {
      const carta = listaDeCartas[i];
      if (i < indexMediana) {
        cartasDoJogador.push(carta);
      } else {
        cartasDoComputador.push(carta);
      }
    }
  }
}

function sortearCarta() {
  document.getElementById("carta1").innerHTML = "";
  embaralharCartas(listaDeCartas);
  cortarBaralho();
  cartasSelecionadas = selecionarCartas();
  const command = {
    carta: cartasSelecionadas.cartaJogador,
    num: 0,
    hasInput: true,
  };
  exibirCartaNaTela(command);
  btnSortear.disabled = true;
  btnJogar.disabled = false;
  resultado.innerHTML = "";
}

function jogar() {
  let atributoSelecionado = selecionarAtributo();
  mostrarResultadoNaTela(atributoSelecionado);
}

function selecionarAtributo() {
  const atributos = document.getElementsByName("atrbCarta");
  let atributoSelecionado = "";
  atributos.forEach((atributo) => {
    if (atributo.checked) {
      atributoSelecionado = atributo.id;
    }
  });
  return atributoSelecionado;
}

function mostrarResultadoNaTela(atributoSelecionado) {
  let resultadoTexto = compararAtributos(atributoSelecionado);
  resultado.innerHTML = resultadoTexto;
}

function compararAtributos(atributoSelecionado) {
  let resultadoTexto = "Selecione um atributo";
  if (atributoSelecionado !== "") {
    const atrbJgd =
      cartasSelecionadas.cartaJogador.atributos[atributoSelecionado];
    const atrbCpu =
      cartasSelecionadas.cartaComputador.atributos[atributoSelecionado];
    if (atrbJgd === atrbCpu) {
      resultadoTexto = "Empatou! Selecione outro atributo.";
    } else {
      if (atrbJgd < atrbCpu) {
        resultadoTexto = "Você perdeu!";
        cartasDoComputador.push(cartasSelecionadas.cartaJogador);
        cartasDoComputador.push(cartasSelecionadas.cartaComputador);
        if (cartasDoJogador.length > 0) btnSortear.disabled = false;
      } else {
        resultadoTexto = "Você venceu!";
        cartasDoJogador.push(cartasSelecionadas.cartaComputador);
        cartasDoJogador.push(cartasSelecionadas.cartaJogador);
        if (cartasDoComputador.length > 0) btnSortear.disabled = false;
      }
      const command = {
        carta: cartasSelecionadas.cartaComputador,
        num: 1,
      };
      exibirCartaNaTela(command);
      btnJogar.disabled = true;
    }
  }
  return resultadoTexto;
}

function cartasExemplo() {
  embaralharCartas(listaDeCartas);
  exibirCartaNaTela({
    carta: listaDeCartas[0],
    num: 0,
    exemple: true,
  });
  exibirCartaNaTela({
    carta: listaDeCartas[1],
    num: 1,
    exemple: true,
  });
}

cartasExemplo();

const btnSortear = document.getElementById("btnSortear");
const opcoes = document.getElementById("opcoes");
const btnJogar = document.getElementById("btnJogar");
const resultado = document.getElementById("resultado");

let cartasSelecionadas;
const cartasDoJogador = [];
const cartasDoComputador = [];

function Carta({ id, name }) {
  this.id = id;
  this.nome = name;
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
  new Carta({ id: "001", name: "Bulbasaur" }),
  new Carta({ id: "002", name: "Ivysaur" }),
  new Carta({ id: "003", name: "Venusaur" }),
  new Carta({ id: "004", name: "Charmander" }),
  new Carta({ id: "005", name: "Charmeleon" }),
  new Carta({ id: "006", name: "Charizard" }),
  new Carta({ id: "007", name: "Squirtle" }),
  new Carta({ id: "008", name: "Wartortle" }),
  new Carta({ id: "009", name: "Blastoise" }),
  new Carta({ id: "010", name: "Caterpie" }),
  new Carta({ id: "011", name: "Metapod" }),
  new Carta({ id: "012", name: "Butterfree" }),
  new Carta({ id: "013", name: "Weedle" }),
  new Carta({ id: "014", name: "Kakuna" }),
  new Carta({ id: "015", name: "Beedrill" }),
  new Carta({ id: "016", name: "Pidgey" }),
  new Carta({ id: "017", name: "Pidgeotto" }),
  new Carta({ id: "018", name: "Pidgeot" }),
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
    "</div><div class='idCarta'>Nº" +
    carta.id +
    "</div></div>";
  // imagem da carta
  elemento += "<div class='imgCarta'>";
  elemento +=
    "<img src='https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" +
    carta.id +
    ".png' alt='' />";
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

const btnJogar = document.getElementById("btnJogar");
const resultado = document.getElementById("resultado");

let cartasSelecionadas;
let atrbSelecionado;
const cartasDoJogador = [];
const cartasDoComputador = [];

function Carta({ id, name }) {
  this.id = id;
  this.nome = name;
  this.img =
    "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + id + ".png";
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

function exibirCartaNaTela({
  carta,
  num,
  hasInput,
  textoTitle,
  contentHidden,
}) {
  // título
  let elemento = "<div class='cartaTitle'>";
  elemento += textoTitle;
  elemento += "</div>";
  // abertura da table
  elemento += `<div class="carta-table">`;
  if (contentHidden) {
    // capa
    elemento += `<div class="imgCapa"></div>`;
  } else {
    // nome da carta
    elemento += `<div class="tituloCarta"><div>${carta.nome}</div>`;
    elemento += `<div>Nº${carta.id}</div></div>`;
    // imagem da carta
    elemento += "<div class='imgCarta'>";
    elemento += "<img src='" + carta.img + "' alt='' />";
    elemento += "<br>crédito da imagem: pokemon.com</div>";
    // atributos
    for (const atrb in carta.atributos) {
      if (Object.hasOwnProperty.call(carta.atributos, atrb)) {
        const valorAtrb = carta.atributos[atrb];
        if (hasInput) {
          elemento += `<div><label for="${atrb}">`;
          elemento += `<input type="radio" name="atrbCarta" id="${atrb}" />`;
          elemento += `<span onclick="selecionarAtrb('${atrb}')" class="linhaAtrb input">`;
          elemento += `<div class="chaveAtrb">${atrb}</div>`;
          elemento += `<div class="valorAtrb">${valorAtrb}</div></span></label></div>`;
        } else {
          if (atrb === atrbSelecionado) {
            elemento += `<div><span class="linhaAtrb atrbSelecionado"><div class="chaveAtrb">${atrb}</div>`;
          } else {
            elemento += `<div><span class="linhaAtrb"><div class="chaveAtrb">${atrb}</div>`;
          }
          elemento += `<div class="valorAtrb">${valorAtrb}</div></span></div>`;
        }
      }
    }
  }
  // fechamento da table
  elemento += "</div><div class='footer-info'>Valores aleatórios</div>";

  document.getElementById("carta" + num).innerHTML = elemento;
}

function selecionarAtrb(atrb) {
  atrbSelecionado = atrb;
}

function selecionarCartas() {
  const cartaJgd = cartasDoJogador.shift();
  const cartaCpu = cartasDoComputador.shift();
  return { cartaCpu, cartaJgd };
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
    for (let i = 0; i < 10; i++) {
      const carta = listaDeCartas[i];
      if (i < 5) {
        cartasDoJogador.push(carta);
      } else {
        cartasDoComputador.push(carta);
      }
    }
  }
}

function sortearCarta() {
  document.getElementById("carta0").innerHTML = "";
  document.getElementById("carta1").innerHTML = "";
  embaralharCartas(listaDeCartas);
  cortarBaralho();
  cartasSelecionadas = selecionarCartas();
  exibirCartaNaTela({
    carta: cartasSelecionadas.cartaJgd,
    num: 0,
    hasInput: true,
    textoTitle: "Carta do Jogador",
  });
  exibirCartaNaTela({
    carta: cartasSelecionadas.cartaCpu,
    num: 1,
    textoTitle: "Carta do Computador",
    contentHidden: true,
  });
  btnJogar.setAttribute("onclick", "compararAtrb()");
  btnJogar.innerHTML = "Comparar";
  resultado.innerHTML = "";
}

function jogar() {
  sortearCarta();
}

function compararAtrb() {
  let resultadoTexto = "";
  if (atrbSelecionado) {
    const atrbJgd = cartasSelecionadas.cartaJgd.atributos[atrbSelecionado];
    const atrbCpu = cartasSelecionadas.cartaCpu.atributos[atrbSelecionado];
    if (atrbJgd === atrbCpu) {
      resultadoTexto = "Empatou! Selecione outro atributo.";
    } else {
      if (atrbJgd < atrbCpu) {
        resultadoTexto = "Você perdeu!";
        cartasDoComputador.push(cartasSelecionadas.cartaJogador);
        cartasDoComputador.push(cartasSelecionadas.cartaComputador);
      } else {
        resultadoTexto = "Você venceu!";
        cartasDoJogador.push(cartasSelecionadas.cartaComputador);
        cartasDoJogador.push(cartasSelecionadas.cartaJogador);
      }
      exibirCartaNaTela({
        carta: cartasSelecionadas.cartaCpu,
        num: 1,
        textoTitle: "Carta do Computador",
      });
      btnJogar.setAttribute("onclick", "turnar()");
      btnJogar.innerHTML = "Próxima carta";
    }
  } else {
    resultadoTexto = "(Selecione um atributo)";
  }
  resultado.innerHTML = resultadoTexto;
}

function turnar() {
  atrbSelecionado = null;
  jogar();
}

function cartasExemplo() {
  embaralharCartas(listaDeCartas);
  exibirCartaNaTela({
    carta: listaDeCartas[0],
    num: 0,
    textoTitle: "Carta de Exemplo",
  });
  exibirCartaNaTela({
    carta: listaDeCartas[1],
    num: 1,
    textoTitle: "Carta de Exemplo",
  });
}

cartasExemplo();

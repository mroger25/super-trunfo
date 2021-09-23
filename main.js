const btnSortear = document.getElementById("btnSortear");
const opcoes = document.getElementById("opcoes");
const btnJogar = document.getElementById("btnJogar");
const resultado = document.getElementById("resultado");

function Carta(nome, img) {
  this.nome = nome;
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
  new Carta(
    "Bulbasaur",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png"
  ),
  new Carta(
    "Ivysaur",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/002.png"
  ),
  new Carta(
    "Venusaur",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/003.png"
  ),
  new Carta(
    "Charmander",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png"
  ),
  new Carta(
    "Charmeleon",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png"
  ),
  new Carta(
    "Charizard",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png"
  ),
  new Carta(
    "Squirtle",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png"
  ),
  new Carta(
    "Wartortle",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/008.png"
  ),
  new Carta(
    "Blastoise",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png"
  ),
  new Carta(
    "Caterpie",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/010.png"
  ),
  new Carta(
    "Metapod",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/011.png"
  ),
  new Carta(
    "Butterfree",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/012.png"
  ),
];

let cartasSelecionadas;
const cartasDoJogador = [];
const cartasDoComputador = [];

function exibirCartaNaTela(carta, num, hasInput) {
  let elemento = "<div class='cartaTitle'>";
  elemento += num ? "Carta do Computador" : "Carta do Jogador";
  elemento += "</div>";
  // abertura da table
  elemento += "<table><tbody>";
  // nome da carta
  elemento += "<tr><th colspan='3'>" + carta.nome + "</th></tr>";
  // imagem da carta
  elemento += "<tr><td colspan='3'><div class='imagem'>";
  elemento += "<img src=" + carta.img + " alt='' />";
  elemento += "<br>crédito da imagem: pokemon.com</div></td></tr>";
  // atributos
  for (const atrb in carta.atributos) {
    if (Object.hasOwnProperty.call(carta.atributos, atrb)) {
      const valorAtrb = carta.atributos[atrb];
      elemento += "<tr>";
      if (hasInput) {
        elemento +=
          "<td><input type='radio' name='atrbCarta' id='" + atrb + "' /></td>";
      }
      elemento += "<th>" + atrb + "</th>";
      elemento += "<td>" + valorAtrb + "</td>";
      elemento += "</tr>";
    }
  }
  // fechamento da table
  elemento += "</tbody></table>";
  elemento += "<div class='footer-info'>*Valores aleatórios</div>";

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
  exibirCartaNaTela(cartasSelecionadas.cartaJogador, 0, true);
  btnSortear.disabled = true;
  btnJogar.disabled = false;
  resultado.innerHTML = "";
}

function jogar() {
  const atributos = document.getElementsByName("atrbCarta");
  let atributoSelecionado = "";
  atributos.forEach((atributo) => {
    if (atributo.checked) {
      atributoSelecionado = atributo.id;
    }
  });
  let resultadoTexto = "Selecione um atributo";
  if (atributoSelecionado !== "") {
    if (
      cartasSelecionadas.cartaJogador.atributos[atributoSelecionado] ===
      cartasSelecionadas.cartaComputador.atributos[atributoSelecionado]
    ) {
      resultadoTexto = "Empatou! Selecione outro atributo.";
    } else {
      if (
        cartasSelecionadas.cartaJogador.atributos[atributoSelecionado] <
        cartasSelecionadas.cartaComputador.atributos[atributoSelecionado]
      ) {
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
      exibirCartaNaTela(cartasSelecionadas.cartaComputador, 1);
      btnJogar.disabled = true;
    }
  }
  resultado.innerHTML = resultadoTexto;
}

function cartasExemplo() {
  embaralharCartas(listaDeCartas);
  exibirCartaNaTela(listaDeCartas[0], 0);
  exibirCartaNaTela(listaDeCartas[1], 1);
}

cartasExemplo();

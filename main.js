const btnSortear = document.getElementById("btnSortear");
const opcoes = document.getElementById("opcoes");
const btnJogar = document.getElementById("btnJogar");
const resultado = document.getElementById("resultado");

function Carta(nome, img) {
  this.nome = nome;
  this.img = img;
  this.atributos = {
    hp: Math.floor(Math.random() * 16),
    atk: Math.floor(Math.random() * 16),
    def: Math.floor(Math.random() * 16),
    spcAtk: Math.floor(Math.random() * 16),
    spcDef: Math.floor(Math.random() * 16),
    speed: Math.floor(Math.random() * 16),
  };
}

const listaDeCartas = [
  new Carta(
    "Bulbasaur",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
  ),
  new Carta(
    "Ivysaur",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png"
  ),
  new Carta(
    "Venusaur",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png"
  ),
  new Carta(
    "Charmander",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"
  ),
  new Carta(
    "Charmeleon",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png"
  ),
  new Carta(
    "Charizard",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png"
  ),
  new Carta(
    "Squirtle",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png"
  ),
  new Carta(
    "Wartortle",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png"
  ),
  new Carta(
    "Blastoise",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png"
  ),
  new Carta(
    "Caterpie",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/010.png"
  ),
  new Carta(
    "Metapod",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/011.png"
  ),
  new Carta(
    "Butterfree",
    "https://assets.pokemon.com/assets/cms2/img/pokedex/full/012.png"
  ),
];

let cartasSelecionadas;

function exibirCartaNaTela(carta, num) {
  let elemento =
    "<table><tr><th>Nome</th><td>" +
    carta.nome +
    "</td></tr>" +
    "<tr><td colspan='2'><div class='imagem'><img src=" +
    carta.img +
    " alt='' /></div></td></tr>" +
    "<tr><th>HP</th><td>" +
    carta.atributos.hp +
    "</td></tr>" +
    "<tr><th>Attack</th><td>" +
    carta.atributos.atk +
    "</td></tr>" +
    "<tr><th>Defense</th><td>" +
    carta.atributos.def +
    "</td></tr>" +
    "<tr><th>Sp. Atk</th><td>" +
    carta.atributos.spcAtk +
    "</td></tr>" +
    "<tr><th>Sp. Def</th><td>" +
    carta.atributos.spcDef +
    "</td></tr>" +
    "<tr><th>Speed</th><td>" +
    carta.atributos.speed +
    "</td></tr></table>";
  document.getElementById("carta" + num).innerHTML = elemento;
}

function selecionarCartas() {
  const cartaJogador = listaDeCartas[0];
  const cartaComputador = listaDeCartas[1];
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

function sortearCarta() {
  embaralharCartas(listaDeCartas);
  cartasSelecionadas = selecionarCartas();
  exibirCartaNaTela(cartasSelecionadas.cartaJogador, 1);
  btnSortear.disabled = true;
  btnJogar.disabled = false;
  resultado.innerHTML = "";
}

function jogar() {
  const atributos = document.getElementsByName("atrb");
  let atributoSelecionado = "";
  atributos.forEach((atributo) => {
    if (atributo.checked) {
      atributoSelecionado = atributo.id;
    }
  });
  let resultadoTexto = "Selecione um atributo";
  if (atributoSelecionado !== "") {
    if (
      cartasSelecionadas.cartaJogador.atributos[atributoSelecionado] >
      cartasSelecionadas.cartaComputador.atributos[atributoSelecionado]
    ) {
      resultadoTexto = "Você venceu!";
      console.log({ cartaComputador: cartasSelecionadas.cartaComputador });
      btnSortear.disabled = false;
      btnJogar.disabled = true;
    } else if (
      cartasSelecionadas.cartaJogador.atributos[atributoSelecionado] <
      cartasSelecionadas.cartaComputador.atributos[atributoSelecionado]
    ) {
      resultadoTexto = "Você perdeu!";
      console.log({ cartaComputador: cartasSelecionadas.cartaComputador });
      btnSortear.disabled = false;
      btnJogar.disabled = true;
    } else {
      resultadoTexto = "Empatou!";
    }
  }
  resultado.innerHTML = resultadoTexto;
}

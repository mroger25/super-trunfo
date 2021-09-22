const btnSortear = document.getElementById("btnSortear");
const opcoes = document.getElementById("opcoes");
const btnJogar = document.getElementById("btnJogar");
const resultado = document.getElementById("resultado");

function Carta(nome, img) {
  this.nome = nome;
  this.img = img;
  this.atributos = {
    HP: Math.floor(Math.random() * 16),
    Attack: Math.floor(Math.random() * 16),
    Defense: Math.floor(Math.random() * 16),
    "Sp. Atk": Math.floor(Math.random() * 16),
    "Sp. Def": Math.floor(Math.random() * 16),
    Speed: Math.floor(Math.random() * 16),
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
  let elemento = "<table><tbody>";
  elemento += "<tr><th>Nome</th><td>" + carta.nome + "</td></tr>";
  elemento += "<tr><td colspan='2'><div class='imagem'>";
  elemento += "<img src=" + carta.img + " alt='' />";
  elemento += "</div></td></tr>";
  for (const atrb in carta.atributos) {
    if (Object.hasOwnProperty.call(carta.atributos, atrb)) {
      const valorAtrb = carta.atributos[atrb];
      elemento +=
        "<tr><td><input type='radio' name='atrbCarta" +
        num +
        "' id='" +
        atrb +
        "_Carta" +
        num +
        "'></td>";
      elemento +=
        "<th>" +
        "<label for='" +
        atrb +
        "Carta" +
        num +
        "'>" +
        atrb +
        ": " +
        valorAtrb +
        "</label>" +
        "</th></tr>";
    }
  }
  elemento += "</tbody></table>";
  document.getElementById("carta" + num).innerHTML = elemento;
}

function selecionarAtrib(atrb) {
  console.log("Atributo selecionado: " + atrb);
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
  document.getElementById("carta2").innerHTML = "";
  embaralharCartas(listaDeCartas);
  cartasSelecionadas = selecionarCartas();
  exibirCartaNaTela(cartasSelecionadas.cartaJogador, 1);
  btnSortear.disabled = true;
  btnJogar.disabled = false;
  resultado.innerHTML = "";
}

function jogar() {
  const atributos = document.getElementsByName("atrbCarta1");
  let atributoSelecionado = "";
  atributos.forEach((atributo) => {
    if (atributo.checked) {
      atributoSelecionado = atributo.id.split("_")[0];
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
      } else {
        resultadoTexto = "Você venceu!";
      }
      exibirCartaNaTela(cartasSelecionadas.cartaComputador, 2);
      btnSortear.disabled = false;
      btnJogar.disabled = true;
    }
  }
  resultado.innerHTML = resultadoTexto;
}

function cartasExemplo() {
  embaralharCartas(listaDeCartas);
  cartasSelecionadas = selecionarCartas();
  exibirCartaNaTela(cartasSelecionadas.cartaJogador, 1);
  exibirCartaNaTela(cartasSelecionadas.cartaComputador, 2);
}

cartasExemplo();

const btnSortear = document.getElementById("btnSortear");
const opcoes = document.getElementById("opcoes");
const btnJogar = document.getElementById("btnJogar");
const resultado = document.getElementById("resultado");

function Carta(nome) {
  this.nome = nome;
  this.atributos = {
    atrb1: Math.floor(Math.random() * 11),
    atrb2: Math.floor(Math.random() * 11),
    atrb3: Math.floor(Math.random() * 11),
    atrb4: Math.floor(Math.random() * 11),
    atrb5: Math.floor(Math.random() * 11),
  };
}

const listaDeCartas = [
  new Carta("Carta1"),
  new Carta("Carta2"),
  new Carta("Carta3"),
  new Carta("Carta4"),
  new Carta("Carta5"),
  new Carta("Carta6"),
  new Carta("Carta7"),
  new Carta("Carta8"),
];

let cartasSelecionadas;

function exibirAtributosNaTela(carta) {
  let elemento = "<div>Nome da carta: " + carta.nome + "</div>";
  for (const atrb in carta.atributos) {
    if (Object.hasOwnProperty.call(carta.atributos, atrb)) {
      const valorDoAtributo = carta.atributos[atrb];
      elemento +=
        "<input type='radio' name='atrb' id=" +
        atrb +
        " value=" +
        valorDoAtributo +
        " />";
      elemento +=
        "<label for=" +
        atrb +
        ">" +
        atrb +
        ": " +
        valorDoAtributo +
        "</label><br />";
    }
  }
  opcoes.innerHTML = elemento;
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
  exibirAtributosNaTela(cartasSelecionadas.cartaJogador);
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

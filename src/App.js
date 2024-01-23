import { useState } from 'react'
import './App.css';
import {
  sortearPalavra,
  listaPalavrasObjetoEscolhido,
  saberSeLetraExiste
} from './utils/funcoes'

const words = {
  "Frutas": ["abacaxi", "banana", "morango", "pessego", "maca", "uva", "manga", "cereja", "melancia", "kiwi"],
  "Animais": ["cachorro", "girafa", "leao", "zebra", "elefante", "tigre", "macaco", "tartaruga", "borboleta", "golfinho"],
  "Alimentos": ["hamburguer", "ketchup", "queijo", "sorvete", "pizza", "chocolate", "batata", "sushi", "pipoca", "sanduiche"],
  "Estações do Ano": ["inverno", "verao", "outono", "primavera", "neve", "sol", "chuva", "flores", "calor", "frio"],
  "Atividades": ["escola", "futebol", "jardim", "nadar", "pintar", "correr", "ler", "dancar", "cantar", "viajar"],
  "Eventos e Comemorações": ["natal", "aniversario", "casamento", "carnaval", "independencia", "pascoa", "halloween", "formatura", "",],
  "Elementos Naturais": ["oceano", "universo", "ceu", "montanha", "rio", "terra", "sol", "lua", "estrela", "floresta"],
  "Objetos e Coisas": ["pijama", "roda", "telefone", "violino", "xadrez", "mesa", "computador", "oculos", "camera", "bola"]
};

const tracinhos = "_"

// Lista de categorias a serem sorteadas 
const listaPalavras = listaPalavrasObjetoEscolhido(words)
console.log(listaPalavras[0])

// Palavra que foi sorteada + total de tracinhos 
const palavra = sortearPalavra(listaPalavras[0])
const listaLetrasPalavra = palavra.split("")
const totalTracinhos = tracinhos.repeat(listaLetrasPalavra.length)
console.log(palavra)

// Categoria sorteada
const sorteioCategoria = listaPalavras[1]
console.log(sorteioCategoria)

// Array das imagens utilizadas
const imagens = [
  'images/forca1.jpg',
  'images/forca2.png',
  'images/forca3.png',
  'images/forca4.png',
  'images/forca5.png',
  'images/forca6.png',
  'images/forca7.png'
]

// Array de letras/ tentativas 
let listaLetras = []

// Chances
let chances = 6

function App() {

  const [letter, setLetter] = useState("");

  // Estado para armazenar o índice da imagem atual
  const [indiceImagem, setIndiceImagem] = useState(0);

  // Estado para armazenar as tentativas
  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([])

  // Função para saber se a letra existe na lista de palavras
  // e atualizar o state setLetrasAdivinhadas
  const saberSeLetraNaoEstaNaLista = (letraLetter) => {
    if (!listaLetras.includes(letraLetter)) {
      listaLetras.push(letraLetter)
    }
    setLetrasAdivinhadas(listaLetras)
    return listaLetras
  }

  // Função para limpar o input após o usuário clicar em "Enviar"
  const limparInput = () => {
    setLetter("")
  }


  // Função para alterar a imagem do jogo a cada tentativa do usuário
  const mudarImagem = () => {
    setIndiceImagem((prevIndiceImagem) => {
      if (saberSeLetraExiste(palavra, letter) === false) {
        if (prevIndiceImagem <= 4) {
          chances -= 1
          return prevIndiceImagem + 1
        } else {
          alert(`Você perdeu! A palavra era "${palavra}"`)
          // Recarregar página após a derrota
          window.location.reload()
        }
      } else {
        return prevIndiceImagem
      }
    })
  }
  const totalTraco = totalTracinhos.split("")

  // função para substituir os tracinhos pela letra correspondente
  const tracoELetra = (palavra, letrasAdivinhadas) => {
    for (let i = 0; i < palavra.length; i++){
      if (letrasAdivinhadas.includes(palavra[i])){
        totalTraco[i] = palavra[i]
      }
    }
    return totalTraco.join(" ")
  }

  const victoryCondition = (palavra, letrasAdivinhadas) => {
    for (let i = 0; i < palavra.length; i++) {
      if (!letrasAdivinhadas.includes(palavra[i])) {
        // Se uma letra da palavra não estiver no array de letras adivinhadas,
        // então a condição de vitória não foi alcançada
        return false;
      }
    }
  
    // Se o loop terminar sem retornar, todas as letras da palavra foram adivinhadas
    return true;
  }

  // Se a função victoryCondition for true:
  if (victoryCondition(palavra, letrasAdivinhadas)){
    alert("Você venceu! Parabéns!")
    window.location.reload()
  }


  // Função para chamar funções ao clique do usuário
  const handleClick = () => {
    limparInput()
    mudarImagem()
    tracoELetra(palavra, letrasAdivinhadas)
    saberSeLetraNaoEstaNaLista(letter)
  }



  return (
    <div className='flexbox'>
      <div className="App">
        <div>
          <h1>
            Jogo da Forca!
          </h1>
          <p>
            Desafie-se tentando descobrir qual
            é a palavra oculta antes que esgotem
            as suas tentativas. Uma nova palavra,
            de um tema diferente, é adicionada a cada hora.
          </p>
          <div className='mini-container'>
            <h4>Chances: {chances} </h4> |
            <h4>Letras já utilizadas: {`(${letrasAdivinhadas})`}</h4>
          </div>
          <div className='flexbox1'>
            <h2>Digite uma letra: </h2>
            <input
              type="text"
              value={letter}
              onChange={(event) => setLetter(event.target.value.toLowerCase())}
              maxLength={1}
              className='letter'
            />
            <button onClick={handleClick}>Enviar</button>
          </div>
        </div>
        <div className='image_and_traits'>
          <div className='background_image'>
            <img src={imagens[indiceImagem]} />
          </div>
          <div className='traits_and_chosen_word'>
              <h3>Dica: {sorteioCategoria} </h3>
              <h1>{tracoELetra(palavra, letrasAdivinhadas, totalTracinhos)}</h1>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;


export const listaPalavrasObjetoEscolhido = (objeto) => {
    // Sorteando a categoria e suas palavras
    const chaves = Object.keys(objeto)
    const categoriaSorteada = chaves[Math.floor(Math.random() * chaves.length)]
    const palavrasLista = objeto[categoriaSorteada]
    return [palavrasLista, categoriaSorteada]
}

export const sortearPalavra = (lista) => {
    // Para sortear a palavra
    const categoriaSorteada = lista
    const palavraSorteada = categoriaSorteada[Math.floor(Math.random() * categoriaSorteada.length)]
    return palavraSorteada
}

export const tracinhos = (palavraEscolhida) => {
    const palavraSorteada = palavraEscolhida
    const tracinho = "_ "
    const totalTracinhos = tracinho.repeat(palavraSorteada.length)
    return totalTracinhos
 }

export const saberSeLetraExiste = (palavraAtual, letra) => {
    const letraDigitada = letra
    
    if (letraDigitada === "" || letraDigitada === " ") {
        return
    }else{
        const listaLetras = palavraAtual.split("")
        const letraExiste = listaLetras.includes(letraDigitada)
        return letraExiste
    }
}







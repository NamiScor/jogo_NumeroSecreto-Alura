let lista = [];  

/* array = lista e pode receber qualquer tipo de valor (string, números, objetos e outras arrays...), 
sua contagem -indice- inicia-se a partir do zero,
para adicionar algo a mais na lista usa o PUSH
para remover algo nha lista usa o POP*/

let limite = 10; //podemos alterar para quantos números poderá ser sorteado
let numAleatorio = aleatorio();
let tentativas = 1;

function exibicao (tag, texto){
    let campo = document.querySelector(tag);   // concatena os comandos    
    campo.innerHTML = texto;
    
    /* modo alternativo para o uso do Responsive Voice funcione em todos os navegadores */
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.3}); ->  modo simplificado do código / faz a leitura do texto com áudio
     if ('speechSynthesis' in window) {  
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.3; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
    // outros idiomas: Spanish Female
}
exibicao ('h1',"Advinhe o número secreto" );
exibicao ('p', "Escolha um número de 1 a 10");

function verificarChute() {

    let chute = document.querySelector('input').value;
    
    if (chute == numAleatorio){
        let chances = tentativas > 1 ? 'tentativas':'tentativa';  //condiciona a pluralidade 
        let mensagem = `${tentativas} ${chances}`;
        exibicao ('p', ' Você acertou com ' + mensagem);
        document.getElementById('reiniciar').removeAttribute ('disabled'); //irá ser desabilitado, para reiniciar o jogo
    }
    else {
        if (chute > numAleatorio){
            exibicao ('p', 'O número secreto é menor');
        } else {
            exibicao ('p', 'O número secreto é maior');
        }
    }
    tentativas ++;
    limparCampo();
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function aleatorio () {
    //return parseInt(Math.random()*10 + 1);
    let numEscolhido = parseInt(Math.random()*limite + 1);  
    let quantLista = lista.length;  // length = indicar o tamanho da lista ou faz a contagem de itens na lista

    if (quantLista == limite){
        lista = [];  // reinicia a lista quando atingir o limite de números sorteados
    }

    if (lista.includes(numEscolhido)){
        return aleatorio();  // caso o numero já esteja na lista, gera um novo numero novamente
    } else {
        lista.push(numEscolhido);  // push = adiciona o número na lista ao FINAL dela
        console.log(lista);
        return numEscolhido;
    }
} 

function reiniciarJogo(){
    numAleatorio = aleatorio();
    limparCampo();
    tentativas = 1;
    exibicao ('h1',"Advinhe o novo número secreto" );
    exibicao ('p', 'Escolha um número de 1 a 10');
    document.getElementById('reiniciar').setAttribute ('disabled', true);

}






function start() {
    window.location.reload();
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
}

function iniciaJogo(){
	
	var tempo_segundos = 15;

	//inserindo segundos no span
	document.getElementById('cronometro').innerHTML = tempo_segundos;

	// quantidade de meteoros
	var qtde_meteoros = 10;
	
	cria_meteoros(qtde_meteoros);

	//imprimir qtde meteoros inteiros
	document.getElementById('meteoros').innerHTML = qtde_meteoros;
	document.getElementById('explosoes').innerHTML = 0;
		
	iniciaCronometro(tempo_segundos +1);
}

function gameOver(){
	$("#cenario").removeClass("terra");
	$("#cenario").addClass("terraDestruida");
	deletaMeteoros();
	somExplosao = new sound("musicas/bomba.mp3");
	somExplosao.play();
}

var timerId; //variável que armazena a chamada da função timeout
function iniciaCronometro(segundos){
	//setTime função do jQuery setTime(funçãoQueVaiSerChamadaACada, milisegundos)
	segundos--;
	
	if(segundos==-1){
		clearTimeout(timeId); //para a execução do setTimeout
		gameOver();
		return false;
	}
	document.getElementById('cronometro').innerHTML = segundos;
	timeId = setTimeout("iniciaCronometro("+segundos+")", 1000);
	movimentaMeteoros();
	
}

function cria_meteoros(qtde_meteoros){

	for(var i = 1; i <= qtde_meteoros; i++){
		var meteoro = document.createElement("img");
		meteoro.src = 'imagens/meteoro.png';
		meteoro.width="30";
		meteoro.id = "m"+i;
		meteoro.onclick = function() {
			explodir(this);
		}
		
		meteoro.style.marginTop = (Math.random() * 100)+'px';
		meteoro.style.marginBottom = (Math.random() * 100)+'px'; 
		meteoro.style.marginLeft = (Math.random() * 100)+'px';
		meteoro.style.marginRight = (Math.random() * 100)+'px';

		document.getElementById('cenario').append(meteoro);
	}
}

function explodir(m){
	var idMeteoro = m.id;
	var explosao = document.createElement("img");
	explosao = 'imagens/explosao.png';
	explosao.width="40";
	document.getElementById(idMeteoro).src = explosao;
	document.getElementById(idMeteoro).setAttribute("onclick",""); //remover a chance de clicar duas vezes
	pontuacao(-1); //a cada clique eu tenho -1 meteoro
}

function pontuacao(pontos){

	var qtde_meteoros = document.getElementById('meteoros').innerHTML;
	var qtde_explosoes = document.getElementById('explosoes').innerHTML;
	
	qtde_meteoros = parseInt(qtde_meteoros);
	qtde_explosoes = parseInt(qtde_explosoes);
	
	qtde_meteoros = qtde_meteoros + pontos;
	qtde_explosoes = qtde_explosoes - pontos; //menos com menos dá mais

	document.getElementById('meteoros').innerHTML = qtde_meteoros;
	document.getElementById('explosoes').innerHTML = qtde_explosoes;
	
	situacaoJogo(qtde_meteoros);
}

function situacaoJogo(qtde_meteoros){
	if(qtde_meteoros==0){
		clearTimeout(timeId);
		$("#cenario").removeClass("terra");
		$("#cenario").addClass("terraSalva");
		deletaMeteoros();
	}
}

function deletaMeteoros() {
    var i = 1; //contador para recuperar meteoros por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('m'+i)) {
        //retira o evento onclick do elemento
        document.getElementById('m'+i).setAttribute("src","");
        i++; //faz a iteração da variávei i
    }
}


function movimentaMeteoros() {
    var i = 1; //contador para recuperar meteoros por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('m'+i)) {
        //retira o evento onclick do elemento
        var meteoro = document.getElementById('m'+i);
		
		var posicao = Math.floor((Math.random() * 150));
		
		var posicaoAnterior = meteoro.style.get
		meteoro.style.marginTop = posicao+'px';
		
        i++; //faz a iteração da variávei i
    }
}


$(document).ready(function () {
	
	
	$("#JanelaQuiz div").hide(); 
	$("#Pergunta1").show(); 
	$("#Placar").show(); 
	$("#Mensagem").hide(); 
	$("#Fechar").hide(); 

	
	$('#Carousel').bxSlider({
		
		displaySlideQty: 1, 
		infiniteLoop: false,
		hideControlOnEnd: true,
		nextText: '',
		prevText: '',
		startingSlide: 5, 
		moveSlideQty: 1 

	});
	
	
	$("nav a").click(function(){
		
		var carregar = $(this).attr("href") + " #Conteudo"; 
		
		escondeConteudo(carregaConteudo); 
		
		window.location.hash = $(this).attr('href').substr(0,$(this).attr('href').length-5);
		
		function escondeConteudo(funcao){
			$("#Container > #Conteudo > p").animate({marginLeft: "-1000px"},500); 
			
			setTimeout(funcao,500); 
		}
		
		function carregaConteudo(){
			$("#Container > #Conteudo > p").load(carregar,'', mostraConteudo); 
		}
		
		function mostraConteudo(){
			$("#Container > #Conteudo > p").animate({marginLeft: "0px"},500); 
		}
		
		return false;
		
	});
   

});


function configuraTela(){
	
	configuraMargens(function(){
		
		criaSlider();
	
	});
	
	centralizaMenu();
	
	$("#Container > #Conteudo > p").load("sobre.html #Conteudo"); 
		
}


function configuraMargens(funcao){ 

	$("#Slider img").each(function(){

		var alturaImg = $(this).height();
		var alturaDiv = $("#Slider").css('height').replace("px","");
		var restante = parseInt(alturaDiv) - parseInt(alturaImg);
		$(this).css("margin-top",restante + "px");
	
	});
	
	
	funcao(); 
}


function criaSlider(){
	
	
	$("#Slider").responsiveSlides({

		auto:  true,
		pager: false,
		nav:   true,
		speed: 500,
		namespace: "callbacks",
	
	});
	
}


function centralizaMenu(){	
	
	var largura = parseInt($("#Menu").outerWidth()); 
	var larguraTela = parseInt($(window).width());
	var left = (larguraTela - largura) / 2;
	var valor = Math.max(0,left + $(window).scrollLeft()) + "px";
	$("#Menu").css("left",valor);
	
}


function quiz(){
	
	$(".mask").css("height", $(document).height() + "px");
	$(".mask").show(500); 
	
	centralizaJanela(function(){

		$("#JanelaQuiz").show();
		$("#JanelaQuiz").animate({top: "230px" }, "slow");
	
	});
}


function centralizaJanela(funcao){

	$("#JanelaQuiz").css("left",($(document).width() - $("#JanelaQuiz").width()) / 2 + "px");
	
	funcao(); 
}


function fechaQuiz(){

	$(".mask").hide(500);
	$("#JanelaQuiz").css("top","-300px");
	$('#JanelaQuiz').hide(500);	
	
}


											/* -- Funções de validação - usadas pela página contato -- */
											
											
function TesteCampoVazio(registro){
	
	if (!registro.value)
	{
		 $(registro).attr('class','vermelho'); 
		 return true;
	}
	else $(registro).attr('class','');
	
	return false;
	
}


function ValidarEmail(email){
	
	var re = /\S+@\S+\.\S+/;

	if(!re.test(email.value)){
		$(email).attr('class','vermelho'); 
		return false;
	}
	else $(email).attr('class','');
	 
	return true;	
	
}


function ApenasLetras(e){  
 
    var tecla=(window.event)?event.keyCode:e.which;
 
    return(!(tecla >= 48 && tecla <= 57));
	
} 

function ApenasNumeros(e){  
 
    var tecla=(window.event)?event.keyCode:e.which;
 
    return(tecla >= 48 && tecla <= 57 || tecla==8);
	
} 



function ValidarFormulario(){
	
	var nome = document.getElementById("Nome");
	var sobreNome = document.getElementById("Sobrenome");
	var email = document.getElementById("Email");
	var mensagem = document.getElementById("Mensagem");
	
	
	if(!nome.value || !sobreNome.value || !email.value || !mensagem.value) alert("Preencha os campos obrigatórios!");
	
	else if(!ValidarEmail(email)) alert("O email é inválido!");
	else alert("Mensagem enviada com sucesso!");
	
}


										/* -- Funções utilizadas na janela do Quiz -- */
										


var Marcado = false;
var Acertos = 0;
var Erros   = 0;
var Respostas_Corretas = new Array(2,3,0,3,0,1,3,1,2,3);


function DesabilitarRadios(){

    var NumeroQuestao = document.getElementById("Proxima").name;

    $("input[name=Resposta" + NumeroQuestao + "]").attr('disabled',true);

}


function HabilitarRadios(){
    
	var NumeroQuestao = document.getElementById("Proxima").name;

    $("input[name=Resposta" + NumeroQuestao + "]").attr('disabled', false);

}


function ProximaPergunta(){
            
    var Tela_Atual = document.getElementById("Proxima").name; 
    var Tela_Nova  = parseInt(Tela_Atual) + 1; 
    var Div_Nova   = "#Pergunta" + Tela_Nova; 

	
    if($("input:[name=Resposta" + Tela_Atual + "]:checked").val() == null || !Marcado)
    {
    	alert("Marque sua resposta e clique em 'Checar' antes de prosseguir!");
    	Marcado = false;
    	return false;
    }

	$("#JanelaQuiz div").hide(); 
	document.getElementById("Proxima").name = Tela_Nova;
	$(Div_Nova).show(); 
	$("#Placar").show();

    if(Tela_Atual == 9) $("#Proxima").attr('value','Terminar'); 

	
    if (Tela_Atual == 10){
     	
    	$("#Validar").hide();
    	$("#Proxima").hide();
		$("#Mensagem").show();
		$("#Fechar").show();

     	if(Acertos >= 8) document.getElementById("Mensagem").innerHTML = "Parabéns, seu número de acertos foi muito bom!";
		else if(Acertos < 5) document.getElementById("Mensagem").innerHTML = "Que tal estudar mais sobre o Corinthians? Seu número de acertos foi muito ruim!";
		else  document.getElementById("Mensagem").innerHTML = "Você foi bem, mas pode melhorar!";
     }
	 
	 Marcado = false;
              
}


function ValidarPergunta(){
         
	var Tela_Atual  = document.getElementById("Proxima").name;
    var Radio_Marcado = $("input:[name=Resposta" + Tela_Atual + "]:checked").val(); 
    var Posicao_Elemento = parseInt(document.getElementById("Proxima").name) -1;
	var NumeroQuestao = document.getElementById("Proxima").name;

	
    if(Radio_Marcado == null){
		alert("Marque uma resposta!");
		return false;
	}
	
	
	if($("input[name=Resposta" + NumeroQuestao + "]").attr('disabled') == 'disabled'){
		 alert("A resposta já foi checada! Clique em prosseguir!");
		 return false;
	}
	
	
	if(Radio_Marcado == Respostas_Corretas[Posicao_Elemento]) {
    	alert("Correta!");
        document.getElementById("Acertos").innerHTML = Acertos +=1;
    }
    else{
         alert("Errada!");
         document.getElementById("Erros").innerHTML = Erros +=1;
    }

    Marcado = true;
            
    DesabilitarRadios(); 
         
}


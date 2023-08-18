import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/style.css';
import './CSS/particula.css';
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './JS/counter.js'
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import * as bootsrap from 'bootstrap';

var rolagemManual = false;

$(document).ready(function () {

  $('#menu_portifolio').on('click', function () {

    if ($(event.target).closest('#menu_content').length) { return; }

    if (!$('#show_menu').prop('checked')) {
      $('#menu_portifolio').addClass('big');
    } else {
      $('#menu_portifolio').removeClass('big');
    }

    $('#show_menu').prop('checked', !$('#show_menu').prop('checked'));
    console.log($('#show_menu').prop('checked'));
  });

  $('#contatoFormulario').submit(function (event) {
    event.preventDefault();

    const nome = $('input[name="nome"]').val();
    const email = $('input[name="email"]').val();
    const assunto = $('input[name="assunto"]').val();
    const conteudo = $('textarea[name="conteudo"]').val();

    const data = {
      nome: nome,
      email: email,
      assunto: assunto,
      conteudo: conteudo
    };

    const url = 'https://script.google.com/macros/s/AKfycbx_h9GqjWMU1f5y5YJ7M6dfd07460JlMrFLulbcyYN6nUgyGzY-hKVkTytI-pCSRclvfQ/exec';

    // Quando o botão estiver em cima do formulário, o cursor é alterado para "progress"
    $('#enviaFormulario').css('cursor', 'progress');
    // Coloca uma animação chamada "pulse" no botão
    $('#enviaFormulario').css('animation', 'pulse 1s infinite');

    $.ajax({
      url: url,
      type: 'POST',
      contentType: 'text/plain;charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json',
      success: function (response) {
        console.log('Response from server:', response);
        $('#form_response').text('Email enviado com sucesso!');
        $('#form_response').addClass('text-verde');
      },
      error: function (error) {
        console.error('Error:', error);
        $('#form_response').text('Erro ao enviar e-mail. Tente novamente mais tarde.');
      },
      complete: function () {
        $('#enviaFormulario').text('Enviar');
        $('input[name="assunto"]').val('');
        $('textarea[name="conteudo"]').val('');
        $('#enviaFormulario').css({ 'cursor': 'pointer', 'animation': 'none' });
      }
    });
  });

  // * O ícone é alterado quando o usuário o clica
  var timeoutID; // Variável para armazenar o ID do timeout
  $('#menu_content').on('click', 'a', function () {
    atualizaLink($(this));

    if (rolagemManual) {
      clearTimeout(timeoutID); // Cancela o timeout existente se estiver em andamento
    }

    rolagemManual = true;

    timeoutID = setTimeout(function () {
      rolagemManual = false; // Define a variável como false após 1000 milissegundos
    }, 800);
  });

  // * Quando o usuário realizar um scroll, pegar o valor do scroll e alterar o menu
  $(window).scroll(function () {

    // var scale = 1 + ($(window).scrollTop() / 1000); // Ajuste o divisor conforme necessário
    // var translateX, translateY;

    // if ($(window).width() >= 1400) {
    //   translateX = -900 - ($(window).scrollTop() / 5);
    //   translateY = -250 - ($(window).scrollTop() / 5);
    // } else if ($(window).width() >= 1200) {
    //   translateX = -600 - ($(window).scrollTop() / 5);
    //   translateY = -280 - ($(window).scrollTop() / 5);
    // } else if ($(window).width() >= 992) {
    //   translateX = -500 - ($(window).scrollTop() / 5);
    //   translateY = -280 - ($(window).scrollTop() / 5);
    // } else if ($(window).width() >= 768) {
    //   translateX = -400 - ($(window).scrollTop() / 5);
    //   translateY = -280 - ($(window).scrollTop() / 5);
    // } else {
    //   translateX = -180;
    //   translateY = -200;
    // }

    // $('.particle-container').css('transform', 'translate(' + translateX + 'px, ' + translateY + 'px) scale(' + scale + ')');

    if (rolagemManual) {
      return; // Se a rolagem for manual, não alterar o menu
    }

    $('.particle').css({
      'border-radius': (100 - ($(window).scrollTop() / 20)) - 50 + '%',
      'filter': 'blur(' + ($(window).scrollTop() / 200) + 'px)'
    });

    var projetosTop = $('#projetos').offset().top; // Obtém a posição do elemento com ID "projetos"
    var experienciaTop = $('#experiencia').offset().top; // Obtém a posição do elemento com ID "experiencia"
    var habilidadeTop = $('#habilidades').offset().top; // Obtém a posição do elemento com ID "contato"
    var contatoTop = $('#contato').offset().top; // Obtém a posição do elemento com ID "contato"
    var scrollTopParaLink = $(window).scrollTop() + $(window).height() / 2;
    var scrollTopParaExibir = $(window).scrollTop() + $(window).height() / 1.2;

    if (scrollTopParaExibir <= experienciaTop) {
      $('#projetos').addClass('active');
    } else if (scrollTopParaExibir <= habilidadeTop) {
      $('#experiencia ').addClass('active');
    } else if (scrollTopParaExibir <= contatoTop) {
      $('#habilidades').addClass('active');
    } else {
      $('#contato').addClass('active');
    }

    if (scrollTopParaLink <= projetosTop) {
      atualizaLink($('#menu_content a[href="#"]'));
      $('.section').removeClass('active');
    } else if (scrollTopParaLink <= experienciaTop) {
      atualizaLink($('#menu_content a[href="#projetos"]'));
      // $('#experiencia ').removeClass('active');
    } else if (scrollTopParaLink <= habilidadeTop) {
      atualizaLink($('#menu_content a[href="#experiencia"]'));
      // $('#habilidades ').removeClass('active');
    } else if (scrollTopParaLink <= contatoTop) {
      atualizaLink($('#menu_content a[href="#habilidades"]'));
      // $('#contato ').removeClass('active');
    } else {
      atualizaLink($('#menu_content a[href="#contato"]'));
    }

    // Se não tiver mais como rolar a página, o menu é alterado para o último item
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
      $('#footer').addClass('active');
    } else {
      $('#footer').removeClass('active');
    }
  });

  // * Personaliza o scroll da página
  $('a.scroll-link').on('click', function (event) {
    event.preventDefault();

    var idClicado =  String(this.getAttribute('href'));

    // Se o id clicado for #experiencia
    if (idClicado == '#experiencia') {
      idClicado = '#projetos, #experiencia';
    } else if (idClicado == '#habilidades') {
      idClicado = '#projetos, #experiencia, #habilidades';
    } else if (idClicado == '#contato') {
      idClicado = '#projetos, #experiencia, #habilidades, #contato, #footer';
    }

    console.log(idClicado);

    $(idClicado).addClass('opacity-100');
    $(idClicado).removeClass('active');

    var target = $(this.getAttribute('href'));
    $('.particle').css({
      'border-radius': '4px',
      'filter': 'blur(2px)'
    });

    if (target.length) {
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 45 // Ajuste o valor conforme necessário
      }, 0);

      setTimeout(function () {
        $(idClicado).addClass('active');
        $(idClicado).removeClass('opacity-100');
      }, 300);
    }
  });
  // * Se o usuário clicar em um href='#'
  $('a[href="#"]').on('click', function (event) {
    $('.section').removeClass('active');
    $('.particle').css({
      'border-radius': '50%',
      'filter': 'blur(0px)'
    });
  });

  // * Quando o usuário clica na página, o menu é fechado 
  $(document).on('click', function (event) {
    if (!$(event.target).closest('#menu_portifolio').length) {
      const showMenuCheckbox = document.getElementById('show_menu');
      showMenuCheckbox.checked = false;
      $('#menu_portifolio').removeClass('big');
    }
  });

  // * Quando o mouse passa por cima de um projeto, este projeto ganha uma sobra maior
  $('.interativo').hover(function () {
    $(this).addClass('shadow').removeClass('shadow-sm');
  }, function () {
    $(this).addClass('shadow-sm').removeClass('shadow');
  });

  // * Comportamento do modal
  $('#xp_cefet').click(function () {
    $('.modal-title').text('CEFET-MG');
    $('.modal-body').html(
      '<strong>1° Ano: (2020)</strong><br>' +
      '<ul>' +
      '<li>Algorítmos e lógica de programação - <span class="text-especial">C / C++</span></li>' +
      '<li>Programação para web - <span class="text-especial">HTML / CSS / Javascript</span></li>' +
      '<li>Fundamentos da informática - <span class="text-especial">Básico da computação</span></li>' +
      '</ul>' +
      '<strong>2° Ano: (2021)</strong><br>' +
      '<ul>' +
      '<li>Linguagem de programação 1 - <span class="text-especial">Java</span></li>' +
      '<li>Aplicações para web - <span class="text-especial">PHP / Servlets</span></li>' +
      '<li>Organização de computadores - <span class="text-especial">Computação avançada</span></li>' +
      '</ul>' +
      '<strong>3° Ano: (2022)</strong><br>' +
      '<ul>' +
      '<li>Linguagem de programação 2 - <span class="text-especial">Criação de microsseviços</span></li>' +
      '<li>Banco de dados - <span class="text-especial">PostgreSQL</span></li>' +
      '<li>Tecnologias emergentes em informática - <span class="text-especial">C++ avançado</span></li>' +
      '<li>Redes de Computadores - <span class="text-especial">Funcionamento / Quantificação</span></li>' +
      '<li>Serviços do sistema operacional - <span class="text-especial">Protocolos / Segurança</span></li>' +
      '<li>Projeto de sistemas - <span class="text-especial">Desenvolvimento de Software</span></li>' +
      '</ul>' +
      '<span>' +
      '<strong class="fw-bold">TCC:</strong> Utilizando o aprendizado das disciplinas acima, foi desenvolvido um aplicativo para celular intitulado "Quebra-Galho",' +
      '<a href="https://github.com/cefetmg-2022-psi-g2" class="text-especial"> clique aqui</a> para mais detalhes.<br>' +
      '</span>'
    );
  });
  $('#xp_puc').click(function () {
    $('.modal-title').text('PUC Minas');
    $('.modal-body').html(
      '<i class="bi-patch-check-fill text-verde"></i>&nbsp; <span class="fw-normal">1° Período - </span>' +
      '<span class="text-especial">Info</span> <br>' +
      '<i class="bi-repeat text-amarelo"></i>&nbsp; <span class="fw-normal">2° Período - </span>' +
      '<span class="text-especial">Info</span> <br>' +
      '<i class="bi-dash text-vermelho"></i>&nbsp; <span class="fw-normal">3° Período - </span>' +
      '<span class="text-especial">Info</span> <br>' +
      '<i class="bi-dash text-vermelho"></i>&nbsp; <span class="fw-normal">4° Período - </span>' +
      '<span class="text-especial">Info</span> <br>' +
      '<i class="bi-dash text-vermelho"></i>&nbsp; <span class="fw-normal">5° Período - </span>' +
      '<span class="text-especial">Info</span> <br>' +
      '<i class="bi-dash text-vermelho"></i>&nbsp; <span class="fw-normal">6° Período - </span>' +
      '<span class="text-especial">Info</span> <br>' +
      '<i class="bi-dash text-vermelho"></i>&nbsp; <span class="fw-normal">7° Período - </span>' +
      '<span class="text-especial">Info</span> <br>' +
      '<i class="bi-dash text-vermelho"></i>&nbsp; <span class="fw-normal">8° Período - </span>' +
      '<span class="text-especial">Info</span> <br><br>' +
      'Atualmente, curso o <span class="text-especial">2° período</span> de forma regular.'
    );
  });
  $('#xp_hackatruck').click(function () {
    $('.modal-title').text('Hackatruck');
    $('.modal-body').html(
      '<strong>Introdução:</strong><br>' +
      'Projeto de capacitação profissional de estudantes de ' +
      'Instituições de Ensino Superior de Tecnologia da Informação.<br><br>' +
      '<strong>Habilidades adquiridas:</strong><br>' +
      '<ul>' +
      '<li>Desenvolvimento de aplicativos utilizando Swift UI</li>' +
      '<li>Programação de ChatBot inteligente Watson</li>' +
      '<li>Conhecimento em IOT</li>' +
      '<li>Criação de API própria</li>' +
      '<li>Configuração de rotas utilizando Node Red</li>' +
      '</ul>' +
      'Junto de um grupo, desenvolvi um aplicativo para IOS que auxilia pessoas na execução de exercícios físicos, ' +
      '<a href="https://github.com/LuisBrescia/Hackatruck-Academia>" class="text-especial">clique aqui</a> para mais detalhes.'

    );
  });

  // * Redirecionamento de projetos ONLINE/GITHUB
  $('#site-event-manager').on('click', function () {
    window.open('https://event-manager-tiaw-e7211e805cd0.herokuapp.com', '_blank');
  });
  $('#site-projeto-redes').on('click', function () {
    window.open('https://projeto-redes.onrender.com', '_blank');
  });
  $('#site-music-maker').on('click', function () {
    window.open('https://luisbrescia.github.io/DragonMusicMaker/', '_blank');
  });
  $('#repo-event-manager').on('click', function () {
    window.open('https://github.com/LuisBrescia/EventManager', '_blank');
  });
  $('#repo-projeto-redes').on('click', function () {
    window.open('https://github.com/LuisBrescia/ProjetoRedes', '_blank');
  });
  $('#repo-music-maker').on('click', function () {
    window.open('https://github.com/LuisBrescia/ProjetoRedes', '_blank');
  });

  // * Altera a imagem do carousel

  const eventManagerSources = [
    '/event-manager-listas-participantes.png',
    '/event-manager-listas-insumos.png',
    '/event-manager-sm.jpeg'
  ];
  const projetoRedesSources = [
    '/projeto-redes-lightmode.png',
    '/projeto-redes-darkmode.png',
    '/projeto-redes-questionario.png'
  ];
  
  let currentEventManager = 0;
  let currentProjetoRedes = 0;
  
  function changeImage() {
    $('#event-manager-carousel').attr('src', eventManagerSources[currentEventManager]);
    $('#projeto-redes-carousel').attr('src', projetoRedesSources[currentProjetoRedes]);
    currentEventManager = (currentEventManager + 1) % eventManagerSources.length;
    currentProjetoRedes = (currentProjetoRedes + 1) % projetoRedesSources.length;
  }
  
  setInterval(changeImage, 3000);
  
});

// * Atualiza barra de menu
function atualizaLink($clickedLi) {
  var $clickedSpan = $clickedLi.find('span');
  var $clickedH6 = $clickedLi.find('h6');
  var defaultClass = $clickedSpan.data('default');
  var fillClass = $clickedSpan.data('fill');

  $('#menu_content h6').removeClass('fw-light').not($clickedH6).addClass('fw-light');

  $('#menu_content span').each(function () {
    $(this).addClass($(this).data('default')).removeClass($(this).data('fill'));
  });

  $clickedSpan.addClass(fillClass).removeClass(defaultClass);
}
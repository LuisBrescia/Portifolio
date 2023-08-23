import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/style.css';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import * as bootsrap from 'bootstrap';

var timeoutID; // ? Para rolagem de tela
var alteraPattern; // ? Para alterar o padrão de fundo
var rolagemManual = false; // ? True enquando o usuário estiver scrollando

$(document).ready(function () {

  $('#menu_portifolio').on('click', function () {
    if ($(event.target).closest('#menu_content').length) { return; }
    $('#show_menu').prop('checked') ? $('#menu_portifolio').removeClass('big') : $('#menu_portifolio').addClass('big');
    $('#show_menu').prop('checked', !$('#show_menu').prop('checked'));
  });

  // * Envio do formulátio
  $('#contatoFormulario').submit(function (event) {
    event.preventDefault();

    const data = {
      nome: $('input[name="nome"]').val(),
      email: $('input[name="email"]').val(),
      assunto: $('input[name="assunto"]').val(),
      conteudo: $('textarea[name="conteudo"]').val()
    };

    $('#enviaFormulario').css({
      'cursor': 'progress',
      'animation': 'pulse 1s infinite'
    });

    $.ajax({
      url: 'https://script.google.com/macros/s/AKfycbx_h9GqjWMU1f5y5YJ7M6dfd07460JlMrFLulbcyYN6nUgyGzY-hKVkTytI-pCSRclvfQ/exec',
      type: 'POST',
      contentType: 'text/plain;charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json',
      success: function (response) {
        console.log('Response from server:', response);
        $('#form_response').text('Email enviado com sucesso!');
      },
      error: function (error) {
        console.error('Error:', error);
        $('#form_response').text('Erro ao enviar e-mail. Tente novamente mais tarde.');
      },
      complete: function () {
        $('#enviaFormulario').text('Enviar');
        $('input[name="assunto"], textarea[name="conteudo"]').val('');
        $('#enviaFormulario').css({ 'cursor': 'pointer', 'animation': 'none' });
      }
    });
  });

  // * O ícone é alterado quando o usuário o clica
  $('#menu_content').on('click', 'a', function () {
    atualizaLink($(this));
    if (rolagemManual) {
      clearTimeout(timeoutID);
    }
    rolagemManual = true;
    timeoutID = setTimeout(function () {
      rolagemManual = false;
    }, 800);
  });

  // * Quando o usuário realizar um scroll, pegar o valor do scroll e alterar o menu
  $(window).scroll(function () {

    if (rolagemManual) { return; }

    $('#floatElements').css({
      'transform': 'scale(' + (1 + ($(window).scrollTop() / 500)) + ')',
      'opacity': 1 - ($(window).scrollTop() / 500)
    });
    $('.floatElement').css({
      'filter': 'blur(' + ($(window).scrollTop() / 200) + 'px)'
    });

    var scrollTopParaLink = $(window).scrollTop() + $(window).height() / 2; // ? Quando uma determinada seção será ativa no menu
    var scrollTopParaExibir = $(window).scrollTop() + $(window).height() / 1.2; // ? Quando uma determinada seção será exibida na tela

    switch (true) {
      case scrollTopParaExibir <= $('#experiencia').offset().top:
        if (scrollTopParaLink <= $('#projetos').offset().top) {break;}
        $('#projetos').addClass('active');
        scrollDown_fadeOut();
        break;

      case scrollTopParaExibir <= $('#habilidades').offset().top:
        $('#experiencia').addClass('active');
        $('#floatElements').addClass('d-none');
        break;

      case scrollTopParaExibir <= $('#contato').offset().top:
        $('#habilidades').addClass('active');
        break;

      default:
        $('#contato').addClass('active');
        break;
    }

    switch (true) {
      case scrollTopParaLink <= $('#projetos').offset().top:
        atualizaLink($('#menu_content a[href="#"]'));
        scrollDown_fadeIn();
        $('.section').removeClass('active');
        break;

      case scrollTopParaLink <= $('#experiencia').offset().top:
        atualizaLink($('#menu_content a[href="#projetos"]'));
        $('#floatElements').removeClass('d-none');
        break;

      case scrollTopParaLink <= $('#habilidades').offset().top:
        atualizaLink($('#menu_content a[href="#experiencia"]'));
        break;

      case scrollTopParaLink <= $('#contato').offset().top:
        atualizaLink($('#menu_content a[href="#habilidades"]'));
        break;

      default:
        atualizaLink($('#menu_content a[href="#contato"]'));
        break;
    }

    $(window).scrollTop() + $(window).height() >= $(document).height() - 100 ? 
    $('#footer').addClass('active') : $('#footer').removeClass('active');
  });

  $('#role_para_baixo').on('click', function () {
    scrollDown_fadeOut();
    $('html, body').stop().animate({
      scrollTop: $('#projetos').offset().top - 45
    }, 0);
  });

  // * Personaliza o scroll da página
  $('a.scroll-link').on('click', function (event) {
    event.preventDefault();
    
    scrollDown_fadeOut();

    var idClicado = String(this.getAttribute('href'));

    const idMapping = {
      '#experiencia': '#projetos, #experiencia',
      '#habilidades': '#projetos, #experiencia, #habilidades',
      '#contato': '#projetos, #experiencia, #habilidades, #contato, #footer'
    };
    
    idClicado = idMapping[idClicado] || idClicado;

    $(idClicado).addClass('opacity-100').removeClass('active');

    var target = $(this.getAttribute('href'));

    if (target.length) {
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 45 
      }, 0);

      setTimeout(function () {
        $(idClicado).addClass('active').removeClass('opacity-100');
      }, 300);
    }
  });

  // * Se o usuário clicar em um href='#' levando para o ínicio
  $('a[href="#"]').on('click', function () {
    scrollDown_fadeIn(); // ? Exibe o ícone de rolagem
    $('.section').removeClass('active'); // ? Remove a classe active de todas as seções
    $('#floatElements').removeClass('d-none'); // ? Exibe os elementos flutuantes com seus atributos padrões
    $('#floatElements').css({
      'transform': 'scale(1)',
      'opacity': 1
    });
    $('.floatElement').css({
      'filter': 'blur(0px)'
    });
  });

  // * Quando o usuário clica na página, o menu é fechado 
  $(document).on('click', function (event) {
    if (!$(event.target).closest('#menu_portifolio').length) {
      document.getElementById('show_menu').checked = false;
      $('#menu_portifolio').removeClass('big');
    }
  });

  // * Botão de alterar tema
  $('#altera_tema').on('click', function () {

    // Se o timeout alteraPattern estiver ativo, cancela-o
    if (alteraPattern) {
      clearTimeout(alteraPattern);
    }

    if ($('#altera_tema span').text() == 'Light') {
      $('#altera_tema span').text('Dark');
      document.documentElement.style.setProperty('--gradiente-roxo', 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)');
      document.documentElement.style.setProperty('--color-indigo', '#0093E9');
      $('.shadow-sm:not(form input, form textarea)').addClass('shadow-sm-dark');
      $('form').attr('data-bs-theme', 'dark');

      $('body').addClass('Pattern-escuro');

      alteraPattern = setTimeout(function () {
        $('body').addClass('Pattern-escuro').removeClass('Pattern-claro');
      } , 1000);

    } else {
      $('#altera_tema span').text('Light');
      document.documentElement.style.setProperty('--gradiente-roxo', 'linear-gradient(144deg, #AF40FF, #5B42F3 50%, #00DDEB)');
      document.documentElement.style.setProperty('--color-indigo', '#5b42f3');
      $('modal-body').removeClass('bg-branco');
      $('.shadow-sm').removeClass('shadow-sm-dark');
      $('form').attr('data-bs-theme', 'light');

      $('body').addClass('Pattern-claro').removeClass('Pattern-escuro');

    }

    $('.bg-especial, .bg-especial-dark').toggleClass('bg-especial bg-especial-dark');
    $('.shadow, .shadow-dark').toggleClass('shadow shadow-dark');
    $('.shadow-lg, .shadow-lg-dark').toggleClass('shadow-lg shadow-lg-dark');
    $('nav button').toggleClass('textura-light textura-dark');

    var colorClaro = getComputedStyle(document.documentElement).getPropertyValue('--color-claro');
    var colorEscuro = getComputedStyle(document.documentElement).getPropertyValue('--color-escuro');

    var colorBranco = getComputedStyle(document.documentElement).getPropertyValue('--color-branco');
    var colorPreto = getComputedStyle(document.documentElement).getPropertyValue('--color-preto');

    document.documentElement.style.setProperty('--color-branco', colorPreto);
    document.documentElement.style.setProperty('--color-preto', colorBranco);

    document.documentElement.style.setProperty('--color-claro', colorEscuro);
    document.documentElement.style.setProperty('--color-escuro', colorClaro);

  });

  // * Quando o mouse passa por cima de um projeto, este projeto ganha uma sobra maior
  $('.interativo').hover(function () {
    $(this).addClass('shadow').removeClass('shadow-sm');
  }, function () {
    $(this).addClass('shadow-sm').removeClass('shadow');
  });

  $('.interativo.shadow-sm-dark').hover(function () {
    $(this).addClass('shadow-dark').removeClass('shadow-sm-dark');
  }, function () {
    $(this).addClass('shadow-sm-dark').removeClass('shadow-dark');
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
    window.open('https://github.com/LuisBrescia/DragonMusicMaker', '_blank');
  });
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
// * Funções para exibir e esconder ícone de rolagem
function scrollDown_fadeIn() {
  $('#role_para_baixo').addClass('pulse-down');
  $('#role_para_baixo i, #role_para_baixo span').css('opacity', 1)
}
function scrollDown_fadeOut() {
  $('#role_para_baixo').removeClass('pulse-down');
  $('#role_para_baixo i, #role_para_baixo span').css('opacity', 0)
}

// linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)
// linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)
// linear-gradient( 109.6deg,  rgba(61,245,167,1) 11.2%, rgba(9,111,224,1) 91.1% )
// linear-gradient(160deg, #bdc3c7 0%, #2c3e50 100%)
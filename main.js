import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './JS/counter.js'
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
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

  document.getElementById('contatoFormulario').addEventListener('submit', function (event) {
    event.preventDefault();
    const nome = document.querySelector('input[name="nome"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const assunto = document.querySelector('input[name="assunto"]').value;
    const conteudo = document.querySelector('textarea[name="conteudo"]').value;

    const data = {
        nome: nome,
        email: email,
        assunto: assunto,
        conteudo: conteudo
    };

    const url = 'https://script.google.com/macros/s/AKfycbx_h9GqjWMU1f5y5YJ7M6dfd07460JlMrFLulbcyYN6nUgyGzY-hKVkTytI-pCSRclvfQ/exec';
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log('data', data))
      .catch((err) => console.log('err', err));
  });

  // * O ícone é alterado quando o usuário o clica
  var timeoutID; // Variável para armazenar o ID do timeout

  $('#menu_content').on('click', 'a', function () {
    atualizaLink($(this));
    
    if (rolagemManual) {
      clearTimeout(timeoutID); // Cancela o timeout existente se estiver em andamento
    }
    
    rolagemManual = true;
    
    timeoutID = setTimeout(function() {
      rolagemManual = false; // Define a variável como false após 1000 milissegundos
    }, 800);
  });

  // * Quando o usuário realizar um scroll, pegar o valor do scroll e alterar o menu
  $(window).scroll(function () {

    if(rolagemManual) {
      console.log("retornou"); 
      return; // Se a rolagem for manual, não alterar o menu
    } 

    var projetosTop = $('#projetos').offset().top; // Obtém a posição do elemento com ID "projetos"
    var experienciaTop = $('#experiencia').offset().top; // Obtém a posição do elemento com ID "experiencia"
    var habilidadeTop = $('#habilidades').offset().top; // Obtém a posição do elemento com ID "contato"
    var contatoTop = $('#contato').offset().top; // Obtém a posição do elemento com ID "contato"
    var scrollTop = $(window).scrollTop() + 20;

    if (scrollTop <= projetosTop) {
      atualizaLink($('#menu_content a[href="#"]'));
    } else if (scrollTop <= experienciaTop) {
      atualizaLink($('#menu_content a[href="#projetos"]'));
    } else if (scrollTop <= habilidadeTop) {
      atualizaLink($('#menu_content a[href="#experiencia"]'));
    } else if (scrollTop <= contatoTop) {
      atualizaLink($('#menu_content a[href="#habilidades"]'));
      console.log("Contato");
    } else {
      atualizaLink($('#menu_content a[href="#contato"]'));
    }

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

  // * Personaliza o scroll da página
  $('a.scroll-link').on('click', function (event) {
    event.preventDefault();
    var target = $(this.getAttribute('href'));
    if (target.length) {
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 20 // Ajuste o valor conforme necessário
      }, 0);
    }
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

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './JS/counter.js'
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// import * as bootsrap from 'bootstrap';

$(document).ready(function () {

  $('#menu_portifolio').on('click', function () {

    if ($(event.target).closest('#menu_content').length) {return;}

    if (!$('#show_menu').prop('checked')) {
      $('#menu_portifolio').addClass('big');
    } else {
      $('#menu_portifolio').removeClass('big');
    }

    $('#show_menu').prop('checked', !$('#show_menu').prop('checked'));
    console.log($('#show_menu').prop('checked'));
  });

  // * O ícone é alterado quando o usuário o clica
  $('#menu_content').on('click', 'li', function () {
    var $clickedLi = $(this);
    var $clickedSpan = $clickedLi.find('span');
    var $clickedH6 = $clickedLi.find('h6');
    var defaultClass = $clickedSpan.data('default');
    var fillClass = $clickedSpan.data('fill');
      
    $('#menu_content h6').removeClass('fw-light').not($clickedH6).addClass('fw-light');
      
    $('#menu_content span').each(function() {	
      $(this).addClass($(this).data('default')).removeClass($(this).data('fill'));
    });
      
    $clickedSpan.addClass(fillClass).removeClass(defaultClass);
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

  // * Redirecionamento de projetos
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
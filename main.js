import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './JS/counter.js'
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// import * as bootstrap from 'bootstrap';




$(document).ready(function () {
  $('#menu_portifolio').on('click', function () {

    // Se for clicado em #menu_content, retorna função
    if ($(event.target).closest('#menu_content').length) {
      console.log('menu_content AAAAAAAAAAAA');
      return;
    }

    const showMenuCheckbox = document.getElementById('show_menu');
    if (!showMenuCheckbox.checked) {
      // Adicionar tranfosrm: scale(1.1) ao menu;
      $('#menu_portifolio').addClass('big');
    } else {
      // Voltar para como se essa propriedade nunca tivesse sido aplicada
      $('#menu_portifolio').removeClass('big');
    }
    // Se o elemento clicado for #menu_content, o menu não é fechado
    showMenuCheckbox.checked = !showMenuCheckbox.checked;
  });

  $('#menu_content').on('click', function () {
    $('#menu_content li').addClass('fw-light');
    $(event.target).closest('li').removeClass('fw-light');

    // Caso clique no 2 elemento
    if ($(event.target).closest('li').is(':first-child')) {
      $('#menu_content li:first-child ').addClass('bi-house-fill').removeClass('bi-house');
      $('#menu_content li:nth-child(2) ').addClass('bi-person').removeClass('bi-person-fill');
    }
    if ($(event.target).closest('li').is(':nth-child(2)')) {
      $('#menu_content li:first-child ').removeClass('bi-house-fill').addClass('bi-house');
      $('#menu_content li:nth-child(2) ').removeClass('bi-person').addClass('bi-person-fill');
    }
  });

  // Caso o usuário clique fora do menu, o menu é fechado
  $(document).on('click', function (event) {
    if (!$(event.target).closest('#menu_portifolio').length) {
      const showMenuCheckbox = document.getElementById('show_menu');
      showMenuCheckbox.checked = false;
    }
  });

  // Quando um elemento section estiver em hover esse elemento receberá a classe shadow
  $('section').hover(function () {
    console.log('hover');
    $(this).addClass('shadow').removeClass('shadow-sm');
    // Ao sair do hover a classe é removida
  }, function () {
    $(this).addClass('shadow-sm').removeClass('shadow');
  });
});
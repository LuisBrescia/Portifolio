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

    if ($(event.target).closest('#menu_content').length) {return;}

    if (!$('#show_menu').checked) {
      $('#menu_portifolio').addClass('big');
    } else {
      $('#menu_portifolio').removeClass('big');
    }

    $('#show_menu').checked = !$('#show_menu').checked;
  });

  $('#menu_content').on('click', 'span', function() {
    
    $('#menu_content span').addClass('fw-light');
    $(this).removeClass('fw-light');

    $('#menu_content span').each(function() {	
      $(this).addClass($(this).data('default')).removeClass($(this).data('fill'));
    });
    
    $(this).addClass($(this).data('fill')).removeClass($(this).data('default'));

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
  $('section').hover(function () {
    $(this).addClass('shadow').removeClass('shadow-sm');
  }, function () {
    $(this).addClass('shadow-sm').removeClass('shadow');
  });

});
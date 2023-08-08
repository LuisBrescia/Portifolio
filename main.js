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

    console.log('menu_portifolio click');

    if ($(event.target).closest('#menu_content').length) {return;}

    console.log('menu_portifolio click 2');

    if (!$('#show_menu').checked) {
      $('#menu_portifolio').addClass('big');
    } else {
      $('#menu_portifolio').removeClass('big');
    }

    console.log('menu_portifolio click 3');

    $('#show_menu').checked = !$('#show_menu').checked;
  });

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

});
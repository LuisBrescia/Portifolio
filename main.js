import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './JS/counter.js'
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// import * as bootstrap from 'bootstrap';




$(document).ready(function() {
  $('#menu_portifolio').on('click', function() {
    const showMenuCheckbox = document.getElementById('show_menu');
    showMenuCheckbox.checked = !showMenuCheckbox.checked;
  });

  // Caso o usuário clique fora do menu, o menu é fechado
  $(document).on('click', function(event) {
    if (!$(event.target).closest('#menu_portifolio').length) {
      const showMenuCheckbox = document.getElementById('show_menu');
      showMenuCheckbox.checked = false;
    }
  });

  // Quando um elemento section estiver em hover esse elemento receberá a classe shadow
  $('section').hover(function() {
    console.log('hover');
    $(this).addClass('shadow').removeClass('shadow-sm');
    // Ao sair do hover a classe é removida
  }, function() {
    $(this).addClass('shadow-sm').removeClass('shadow');

  });
});
document.addEventListener('DOMContentLoaded', () => {

  if ( document.querySelector('.peak-logo-link') ) {
    document.querySelector('.peak-logo-link').addEventListener('click', function(e) {
      let mq = window.matchMedia( '(max-width: 640px)' );
      if (mq.matches) {
        e.preventDefault();
        let nav = document.querySelector('.peak-nav');
        if ( nav.classList.contains('peak-nav-open') ) {
          nav.classList.remove('peak-nav-open');
        }
        else {
          nav.classList.add('peak-nav-open');
        }
      }
    });
  }

});
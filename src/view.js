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
        // make link-tapping also close the nav
        const links = document.querySelectorAll('.peak-nav .navOne a');
        links.forEach( link => {
          link.classList.add('peak-nav-link');
          link.addEventListener('click', function(e) {
            e.preventDefault();
            nav.classList.remove('peak-nav-open');
            document.querySelector('main').style.transition = 'opacity .1s ease-in-out ';
            document.querySelector('main').style.opacity = 0;
            setTimeout(function() {
              window.location.href = e.target.href;
            }, 100)
          })
        })
      }
    });
  }

});
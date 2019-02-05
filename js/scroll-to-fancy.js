var ScrollToFancy = function(Options) {
  var _settings = {
    parallax:               true,
    parallaxMinWidth:       800,
    scrollToReveal:         true,
    scrollToRevealMinWidth: 800,
    scrollToRevealOffset:   140
  };
  var _scrollDistance = 0;


  /************************************************************
  FUNCTION: init()
  DESC:     assign user options to settings and assign events
  ************************************************************/
  this.init = function(Options) {

    if ('parallax' in Options && typeof(Options.parallax) === 'boolean') {
      _settings.parallax = Options.parallax;
    }

    if ('parallaxMinWidth' in Options && typeof(Options.parallaxMinWidth) === 'number') {
      _settings.parallaxMinWidth = Options.parallaxMinWidth;
    }

    if ('scrollToReveal' in Options && typeof(Options.scrollToReveal) === 'boolean') {
      _settings.scrollToReveal = Options.scrollToReveal;
    }

    if ('scrollToRevealMinWidth' in Options && typeof(Options.scrollToRevealMinWidth) === 'number') {
      _settings.scrollToRevealMinWidth = Options.scrollToRevealMinWidth;
    }

    if ('scrollToRevealOffset' in Options && typeof(Options.scrollToRevealOffset) === 'number') {
      _settings.scrollToRevealOffset = Options.scrollToRevealOffset;
    }

    window.addEventListener('scroll', function() {
      window.requestAnimationFrame( function() {
        _scrollDistance = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
      });
    });

    if (_settings.parallax === true) {
      _assignParallaxScrolling();
    }

    if (_settings.scrollToReveal === true) {
      _assignScrollToReveal();
    }
  } //END init()


  /************************************************************
  FUNCTION: _assignScrollToReveal()
  DESC:     fade in elements when user scrolls to it
  ************************************************************/
  function _assignScrollToReveal() {
    var animationWrapperClass = 'scroll-to-reveal';
    var revealOffset          = _settings.scrollToRevealOffset; // threshold before element fades in
    var animationWrapperElem  = document.body;
    var animationElems        = document.querySelectorAll('[data-reveal]:not(.scroll-to-reveal-hide)');
    var triggers              = [];


    /************************************************************
    FUNCTION: assignAnimationTriggers()
    DESC:     get all elements that have a scroll to reveal effect
    ************************************************************/
    var assignAnimationTriggers = function() {
      triggers = [];

      if (window.innerWidth >= _settings.scrollToRevealMinWidth) {
        animationWrapperElem.classList.add( animationWrapperClass );
      } else {
        animationWrapperElem.classList.remove( animationWrapperClass );
        return false;
      }

      for (var i=0; i<animationElems.length; i++) {
        var item = animationElems[i];

        item.classList.add('scroll-to-reveal-hide');

        // save element
        triggers.push({
          revealed:   false,
          element:    item,
          offset:     Math.round( item.getBoundingClientRect().top + document.documentElement.scrollTop ),
          animation:  item.getAttribute('data-reveal'),
          delay:      parseInt( item.getAttribute('data-reveal-delay') )
        });

      }

      // console.log(animationElems);
    } // END assignAnimationTriggers()


    /************************************************************
    FUNCTION: playAnimation()
    DESC:     check if element is in viewport via scroll distance
    ************************************************************/
    var playAnimation = function() {

      if (!animationWrapperElem.classList.contains('scroll-to-reveal') || triggers.length === 0) {
        return false;
      }

      var scrollOffset = Math.round( _scrollDistance + (window.innerHeight - revealOffset) );

      for (var i=0; i<triggers.length; i++) {
        var item = triggers[i];

        if (!item.revealed && item.offset < scrollOffset && item.offset > (scrollOffset - window.innerHeight)) {

          // check for delay
          if (item.delay) item.element.style.animationDelay = item.delay + 'ms';

          // assign reveal class
          item.element.classList.add( item.animation );
          triggers[i].revealed = true;
        }
      }
    } // playAnimation()


    assignAnimationTriggers();
    playAnimation();

    // get and save animation triggers on resize
    window.addEventListener('resize', function() {
      window.requestAnimationFrame( assignAnimationTriggers );
      window.requestAnimationFrame( playAnimation );
    });

    // play fade in animation on scroll
    window.addEventListener('scroll', function() {
      window.requestAnimationFrame( playAnimation );
    });
  } // _assignScrollToReveal()




  /************************************************************
  FUNCTION: _assignParallaxScrolling()
  DESC:     assigns hero image parallax scrolling
  ************************************************************/
  function _assignParallaxScrolling() {
    var classEnabled    = 'scroll-to-parallax';
    var elems           = document.querySelectorAll('[data-parallax], [data-parallax-bg]');
    var scrollModifier  = 0.5; /* (slow) 0.01, 0.99 (fast) */
    var triggers        = [];

    if (!elems) {
      return false;
    }

    /************************************************************
    FUNCTION: getElementTriggers()
    DESC:     save all elements with position values in array
    ************************************************************/
    var getElementTriggers = function() {
      triggers = [];

      if (window.innerWidth >= _settings.parallaxMinWidth) {
        document.body.classList.add(classEnabled);
      } else {
        document.body.classList.remove(classEnabled);

        // remove bg position and leave triggers empty when window width is to small
        for (var i=0; i<elems.length; i++) {
          var item = elems[i];

          item.classList.remove('has-parallax');

          if (item.hasAttribute('data-parallax')) {
            item.style.transform = '';
          }

          if (item.hasAttribute('data-parallax-bg')) {
            item.style.backgroundPosition = '';
          }
        };

        return false;
      }

      // save all the elements in triggers
      for (var i=0; i<elems.length; i++) {
        var item = elems[i];

        item.classList.add('has-parallax');

        // get scroll speed modifier from element
        switch (true) {

          case item.hasAttribute('data-parallax'):
            scrollSpeed = parseFloat(item.getAttribute('data-parallax'))
            break;

          case item.hasAttribute('data-parallax-bg'):
            scrollSpeed = parseFloat(item.getAttribute('data-parallax-bg'))
            break;

          default:
            scrollSpeed = scrollModifier;
        }

        // use global scroll speed modifier as a fallback if scroll speed is invalid or undefinied
        if (isNaN(scrollSpeed)) {
          scrollSpeed = scrollModifier;
        }

        // save elements
        triggers.push({
          element:      item,
          isBackground: (item.hasAttribute('data-parallax-bg') ? true : false),
          offset:       Math.round( item.getBoundingClientRect().top + document.documentElement.scrollTop ),
          height:       item.offsetHeight,
          position:     (item.hasAttribute('data-parrallax-position') ? item.getAttribute('data-parrallax-position') : 'center'),
          speed:        scrollSpeed
        });
      }
    } //END getElementTriggers()


    /************************************************************
    FUNCTION: playAnimation()
    DESC:     check if element is in viewport and animate background
    ************************************************************/
    var playAnimation = function() {
      var revealOffset = 1000;

      if (triggers.length === 0) {
        return false;
      }

      var scrollOffset = Math.round( _scrollDistance + (window.innerHeiht - revealOffset) * 100) / 100;

      for (var i=0; i<triggers.length; i++) {
        var item = triggers[i];

        // check if item is in viewport
        if ((window.innerHeight + _scrollDistance) > item.offset && _scrollDistance < (item.offset + item.height)) {
          // calculate vertical position
          var y = (_scrollDistance - item.offset) * item.speed;

          if (item.isBackground === true) {
            // set vertical background image position
            item.element.style.backgroundPosition = 'center ' + y + 'px';
          } else {
            // set vertical translate position
            item.element.style.transform = 'translate(0, ' + y + 'px)';
          }
        }
      }
    } // playAnimation()


    getElementTriggers();
    playAnimation();

    // get and save element positions on resize
    window.addEventListener('resize', function() {
      window.requestAnimationFrame( getElementTriggers );
      window.requestAnimationFrame( playAnimation );
    });

    // play parallax animation on scroll
    window.addEventListener('scroll', function() {
      window.requestAnimationFrame( playAnimation );
    });

  } //END _assignParallaxScrolling()


  init(Options);
}
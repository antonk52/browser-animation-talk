(function(doc, win){
  'use strict';
  const header = document.querySelector('.main-header');
  const headerBG = document.querySelector('.main-header__bg');
  const logo = document.querySelector('.main-header__logo');
  const MAX_WIDTH = window.innerWidth;
  const MAX_HEIGHT = window.innerHeight;

  // exit if window size too small
  // most likely to be a weak device
  if (Math.min(MAX_HEIGHT, MAX_WIDTH) < 300) return;

  function allTheMagic() {
    const MID_HEIGHT = MAX_HEIGHT/2;
    const START = logo.getBoundingClientRect();
    const HALF_MIN_WIN_SIZE = Math.min(MAX_WIDTH, MAX_HEIGHT)/2;
    const END = {
      x: (MAX_WIDTH - HALF_MIN_WIN_SIZE)/2,
      y: (MAX_HEIGHT - HALF_MIN_WIN_SIZE)/2,
      width: HALF_MIN_WIN_SIZE,
      height: HALF_MIN_WIN_SIZE
    };
    const handleScroll = handleScroll4;

    function handleScroll1() {

      const scrolled = window.scrollY;
      const persentage = scrolled < MID_HEIGHT ?
        (MID_HEIGHT - scrolled) / MID_HEIGHT :
        0;

      // logo
      logo.style.position = 'absolute';
      logo.style.top = START.y + END.y * persentage + 'px';
      logo.style.left =  START.x - (persentage * (START.x - END.x)) + 'px';
      logo.style.width = (END.width - START.width) * persentage + START.width + 'px';
      logo.style.height = (END.width - START.width) * persentage + START.width + 'px';

      // header
      header.style.backgroundColor = `rgba(255,255,255,${1 - persentage})`

    }

    function handleScroll2() {

      const scrolled = window.scrollY;
      const persentage = scrolled < MID_HEIGHT ?
        (MID_HEIGHT - scrolled) / MID_HEIGHT :
        0;

      // logo
      logo.style.transform = `
        translateY(${(END.y + HALF_MIN_WIN_SIZE/2) * persentage}px)
        scale(${1 + (END.width / START.width) * persentage})
      `;

      // header
      header.style.backgroundColor = `rgba(255,255,255,${1 - persentage.toFixed(2)})`;

    }

    function handleScroll3() {

      const scrolled = window.scrollY;
      const persentage = scrolled < MID_HEIGHT ?
        (MID_HEIGHT - scrolled) / MID_HEIGHT :
        0;

      logo.style.transform = `
        translateY(${END.width * persentage - (START.height/2 + START.top) * persentage}px)
        scale(${(END.width / START.width) * persentage + 1})
      `;
      headerBG.style.opacity = 1 - persentage;

    }

    function handleScroll4() {
      requestAnimationFrame(handleScroll3);
    }

    // initial set up
    handleScroll();

    // bind event
    window.addEventListener('scroll', handleScroll);

  }

  // in case the logo is not loaded
  // when script executes
  logo.complete ? allTheMagic() : logo.addEventListener('load', allTheMagic);

})();

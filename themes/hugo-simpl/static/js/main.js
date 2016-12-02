(function() {
  const activeClass = 'is-active';
  const mainNavId = 'main-nav';
  const hamburgerButton = 'ham-button';

  /**
   * Page functions
   */

  /**
   * Simple randomizer for an array
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  function randomFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  /**
   * Builds func that checks inclusion
   * @param  {String[]}  keyOpts
   * @return {Boolean}
   */
  function isOneOf(keyOpts) {
    const options = Array.isArray(keyOpts) ? keyOpts : Array.from(arguments);

    return function(keyValue) {
      if (!keyValue) return false;
      return options.includes(keyValue);
    }
  }
  /**
   * Simple code check on event
   * @param  {integer} c 
   * @return {Boolean}
   */
  function isKeyCode(code) {
    return function(c) {
      event.keyCode === c;
    }
  }
  function isKey(keyOpts, keyCode) {
    const isKeyString = isOneOf(keyOpts);
    const isThisCode = isKeyCode(keyCode)
    return function (e) {
      return isKeyString(e.key) || isThisCode(e.keyCode);
    }
  }
  const isEscapeKey = isKey(['Escape', 'Esc'], 27);
  const isM = isKey(['m'], 77);


  /**
   * Toggle menu class
   * @param  {DomElement} element
   */
  function toggleMenu(element) {
    if (element) {
      element.classList.toggle(activeClass);
    } else {
      document.getElementById(hamburgerButton).classList.toggle(activeClass);
    }
    document.getElementById(mainNavId).classList.toggle(activeClass);
  }
  /**
   * Check if menu is active
   * @return {[type]} [description]
   */
  function menuIsActive() {
    return document.getElementById(hamburgerButton).classList.contains(activeClass);
  }

  /**
   * Fade out the main navigation by changing classes on scroll
   */
  function fadeMainNavOnScroll(navElement) {
    const transparentCls = 'transparent';
    if ( window.pageYOffset > 100 ) {
        navElement.classList.add(transparentCls);
    } else {
        navElement.classList.remove(transparentCls);
    }
  }

  /**
   * Call queue functions on window.onload
   * @type {Array}
   */
  let onloadQueue = [];

  
  /***************
   *
   * Page setup
   *
   **************/
  
  if (!window.isLandingPage) {
    /**
     * On scroll, fade out the navigation
     */
    window.onscroll = function() {
      fadeMainNavOnScroll(document.getElementById(mainNavId));
    }

    /**
     * Setup some nifty shortcodes for fun
     * @param  {window.Event} e
     */
    window.document.onkeydown = function(e) {
      e = e || window.event;
      // toggle menu on 'm' press
      if (isM(e)) toggleMenu();
      // toggle menu on escape if its open
      else if (isEscapeKey(e) && menuIsActive()) toggleMenu(); //
    }

    /**
     * Handle hamburger menu click
     * @param  {Object} element - dom element
     */
    window.onMenuClick = toggleMenu;

  } else {
    //
    // For the root / - Landing page JS
    // 
    const landingPageId = 'landing-page';
    const machineNameId = 'machine-name';
    
    function changeLogoClassWait() {
      const element = document.getElementById(landingPageId);
      setTimeout(function() {
        element.classList.add(randomFromArray(['orange', 'green', 'dark']));
      }, 2000)
    }

    function changeRobotName() {
      const element = document.getElementById(machineNameId);
      setTimeout(function() {
        element.innerHTML = randomFromArray([
          'Judith', 'George', 'Jerry', 'Gladys', 'Mateo'
        ]);
      }, 100)
    }

    // Call on page load
    onloadQueue.push(changeLogoClassWait);
    onloadQueue.push(changeRobotName);

    /**
     * On hover animate the logo
     * @param  {Object} this
     */
    window.toggleAnimation = function(element) {
      element.classList.toggle(animationCls);
    }
  }

  /**
   * Call queued functions after page load (or almost at least)
   */
  window.onload = function() {
    onloadQueue.forEach(function(setupFuncOnLoad) {
      setupFuncOnLoad();
    });
  }

})(this);
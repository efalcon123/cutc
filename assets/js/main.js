(function() {
  "use strict";

  // Function to load external HTML into placeholders
  function loadHTML(elementId, url) {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        const element = document.getElementById(elementId);
        if (element) {
          element.innerHTML = data;
          // After loading the HTML, initialize the burger menu if it's the header
          if (elementId === 'header') {
            initializeBurgerMenu(); // Initialize burger menu after loading the header
          }
        }
      })
      .catch(error => console.error('Error loading HTML:', error));
  }

  // Function to initialize the burger menu and dropdown functionality
  function initializeBurgerMenu() {  
    const burgerIcon = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.navmenu');

    // Initialize burger menu
    console.log(burgerIcon, navMenu);
    if (burgerIcon && navMenu) {
      burgerIcon.addEventListener('click', function() {
        navMenu.classList.toggle('mobile-nav-active');
        burgerIcon.classList.toggle('bi-x');
        burgerIcon.classList.toggle('bi-list');
        document.querySelector('body').classList.toggle('mobile-nav-active');
      });
    }

    // Handle dropdown menu click
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(dropdown => {
      dropdown.addEventListener('click', function(e) {
        e.preventDefault();
        const parentListItem = this.closest('li');  // Find the parent list item
        parentListItem.classList.toggle('active');
        parentListItem.querySelector('ul').classList.toggle('dropdown-active');
      });
    });

    // Close the menu if a non-dropdown item is clicked
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', (e) => {
        const parentListItem = e.target.closest('li');
        // If the clicked item is not part of a dropdown (i.e., does not have the 'dropdown' class)
        if (!parentListItem.classList.contains('dropdown')) {
          if (document.querySelector('.mobile-nav-active')) {
            mobileNavToggle(); // Close the menu
          }
        }
      });
    });

    // Reset the burger menu when clicking hash links (i.e., links with #)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        // Prevent closing the menu on hash links
        if (!e.target.hash) return; // Ensure this is a hash link
        // Only toggle the menu if it's not already active
        if (document.querySelector('.mobile-nav-active') && !e.target.closest('.mobile-nav-toggle')) {
          mobileNavToggle();
        }
      });
    });
  }

  // Function to toggle the mobile navigation
  function mobileNavToggle() {
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle'); // Ensure this element exists
    if (mobileNavToggleBtn) { // Check if the element is available before toggling
      document.querySelector('body').classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    } else {
      console.error('Mobile nav toggle button not found!');
    }
  }

  // Load the header and footer
  const basePath = window.location.origin;

  // Assuming `header` and `footer-placeholder` are the placeholders for dynamic content
  loadHTML('header', `${basePath}/header.html`);
  loadHTML('footer-placeholder', `${basePath}/footer.html`);

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector("video");
    const videoContainer = document.querySelector(".video-container");

    if (video && videoContainer) {
      video.addEventListener("canplaythrough", () => {
        // Add a 'loaded' class to the container when the video is ready to play
        videoContainer.classList.add("loaded");
      });
    } 
  });

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  document.addEventListener("DOMContentLoaded", () => {
    // Check if the current page is the root page
    const isRootPage = window.location.pathname === '/' || window.location.pathname === '/index.html';
  
    const header = document.querySelector('.index-page .header');
  
    if (header) {
      if (!isRootPage) {
        // Set background color to remove transparency if it's not the root page
        header.style.setProperty('--background-color', 'rgba(0, 0, 0, .8)'); // Example: solid white background
      }
    }
  });
})();

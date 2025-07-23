function toggleHeader() {
    const fixHeader = document.querySelector('.header__fix');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > fixHeader.clientHeight) {
        if(!fixHeader.classList.contains('header__fix--hide')) fixHeader.classList.add('header__fix--hide');
    } else {
        if(fixHeader.classList.contains('header__fix--hide')) fixHeader.classList.remove('header__fix--hide');      
    }

    lastScrollY = currentScrollY;
  });
}

toggleHeader();
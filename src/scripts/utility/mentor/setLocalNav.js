export function intLocalNav(){
    const section = document.querySelectorAll('[data-skip]');
    const nav = document.querySelector('.local-nav__list');    

    section.forEach(panel => {
        const id = panel.id;
        const text = panel.dataset.skip;
        const li = document.createElement('li');
        li.className = 'local-nav__item';
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.className = 'local-nav__link';
        a.innerHTML = text;
        li.appendChild(a);
        nav.appendChild(li);
    });
}

export function toggleNav(){
    const btn = document.querySelector('.local-nav__btn');    
    const ctrl = btn.getAttribute('aria-controls');
    const list = document.getElementById(ctrl);        
    const a = document.querySelectorAll('.local-nav__link');
    const main = document.querySelector('.main');
    
    btn.addEventListener('click', () => {
        const hidden = btn.getAttribute('aria-expanded') === "true";
        const toggle = !hidden;
        btn.setAttribute('aria-expanded', toggle.toString());
        !toggle ? list.hidden = true : list.hidden = false;
    });   

    a.forEach(link => {
        link.addEventListener('click', () => {
            list.hidden = true;
            btn.setAttribute('aria-expanded', 'false');
        })
    });

    main.addEventListener('click', () => {
        if(btn.getAttribute('aria-expanded') === "true"){
            list.hidden = true;
            btn.setAttribute('aria-expanded', 'false');
        }
    });
}
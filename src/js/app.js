document.addEventListener('DOMContentLoaded', () => {
    scrollNav();

    navFix();
});

function scrollNav(e) {
    const links = document.querySelectorAll("#nav > a");
    
    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const section = document.querySelector(e.target.attributes.href.value);

            section.scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}

function navFix() {
    const $nav = document.querySelector('.header');

    // create an observer with IntersectionObserver API
    const observer = new IntersectionObserver((entries) => {
        let isVisible = entries[0].isIntersecting;

        if(isVisible) $nav.classList.remove("nav-fixed");
        else if(!isVisible && window.scrollY > 400) $nav.classList.add("nav-fixed");
    });

    // select element 
    observer.observe(document.querySelector(".about"));
}
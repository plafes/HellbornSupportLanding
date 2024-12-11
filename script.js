
document.addEventListener("DOMContentLoaded", function() {
    const paragraphs = document.querySelectorAll('.paragraph-1, .paragraph-2, .paragraph-3');
    const sliders = document.querySelectorAll('.content-slider, .video-container');
    
    setTimeout(() => {
        paragraphs.forEach(p => {
            p.classList.add('section-animate');
            p.classList.add('active');
        });
        sliders.forEach(s => {
            s.classList.add('section-animate');
            s.classList.add('active');
        });
    }, 100);
    // Initialize content slider
    const contentSwiper = new Swiper('.content-slider', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        initialSlide: 0,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            click: function(swiper, event) {
                const clickedSlide = event.target.closest('.swiper-slide');
                if (clickedSlide && !document.fullscreenElement) {
                    const img = clickedSlide.querySelector('img');
                    if (img) {
                        img.requestFullscreen().catch(err => {
                            window.open(img.src, '_blank');
                        });
                    }
                }
            }
        }
    });

    // Initialize video slider
    const videoSwiper = new Swiper('.video-container.swiper-container', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            nextEl: '.video-container .swiper-button-next',
            prevEl: '.video-container .swiper-button-prev',
        }
    });

    const logo = document.querySelector('.logo');
    const teppoLogo = document.querySelector('.teppo-logo');
    const popup = document.querySelector('.social-popup');
    const teppoPopup = document.querySelector('.teppo-popup');

    logo.style.pointerEvents = 'auto';
    teppoLogo.style.pointerEvents = 'auto';

    logo.addEventListener('click', (e) => {
        popup.classList.toggle('active');
        teppoPopup.classList.remove('active');
    });

    teppoLogo.addEventListener('click', (e) => {
        teppoPopup.classList.toggle('active');
        popup.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.logo') && !e.target.closest('.teppo-logo') && 
            !e.target.closest('.social-popup')) {
            popup.classList.remove('active');
            teppoPopup.classList.remove('active');
        }
    });

    // Background slideshow
    let slideIndex = 0;
    const slides = document.getElementsByClassName("slide");

    function showSlides() {
        if (!slides.length) return;
        
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
        }
        
        slideIndex++;
        
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        
        slides[slideIndex - 1].classList.add("active");
    }

    if (slides.length > 0) {
        slides[0].classList.add("active");
    }
    
    setInterval(showSlides, 3000);
});

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.slideshow');
    parallax.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
});

const sections = document.querySelectorAll('.section-animate');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

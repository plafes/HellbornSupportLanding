document.addEventListener("DOMContentLoaded", function() {
    const paragraphs = document.querySelectorAll('.paragraph-1, .paragraph-2, .paragraph-3');
    const sliders = document.querySelectorAll('.content-slider, .video-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-animate', 'active');
            } else {
                entry.target.classList.remove('section-animate', 'active');
            }
        });
    }, { threshold: 0.1 });

    paragraphs.forEach(p => observer.observe(p));
    sliders.forEach(s => observer.observe(s));
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
                        img.requestFullscreen().then(() => {
                            let touchStartX = 0;
                            let touchEndX = 0;
                            
                            document.addEventListener('keydown', function(e) {
                                if (document.fullscreenElement) {
                                    if (e.key === 'ArrowRight') {
                                        swiper.slideNext();
                                    } else if (e.key === 'ArrowLeft') {
                                        swiper.slidePrev();
                                    } else if (e.key === 'Escape') {
                                        document.exitFullscreen();
                                    }
                                }
                            });

                            document.addEventListener('touchstart', function(e) {
                                touchStartX = e.changedTouches[0].screenX;
                            });

                            document.addEventListener('touchend', function(e) {
                                if (document.fullscreenElement) {
                                    touchEndX = e.changedTouches[0].screenX;
                                    if (touchEndX < touchStartX - 50) {
                                        swiper.slideNext();
                                    } else if (touchEndX > touchStartX + 50) {
                                        swiper.slidePrev();
                                    }
                                }
                            });
                        }).catch(err => {
                            window.open(img.src, '_blank');
                        });
                    }
                }
            }
        }
    });

    // Video slider with Swiper
    const videoSwiper = new Swiper('.video-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        grabCursor: false,
        preventClicks: true,
        preventClicksPropagation: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        keyboard: {
            enabled: true,
        },
        touchRatio: 1,
        threshold: 30,
        touchStartPreventDefault: false,
        touchStartForcePreventDefault: false,
        touchMoveStopPropagation: true,
        resistance: true,
        resistanceRatio: 0.85,
        on: {
            touchStart: function(swiper, event) {
                swiper.touchStartX = event.touches[0].clientX;
                swiper.touchStartY = event.touches[0].clientY;
            },
            touchMove: function(swiper, event) {
                if (!swiper.touchStartX) return;
                
                const diffX = event.touches[0].clientX - swiper.touchStartX;
                const diffY = event.touches[0].clientY - swiper.touchStartY;
                
                if (Math.abs(diffX) > Math.abs(diffY)) {
                    event.preventDefault();
                }
            },
            touchEnd: function(swiper, event) {
                swiper.touchStartX = null;
                swiper.touchStartY = null;
            }
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

    // Обработка анимации для социальных иконок на мобильных устройствах
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('touchend', function() {
            this.classList.add('touched');
            setTimeout(() => {
                this.classList.remove('touched');
            }, 700);
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.logo') && !e.target.closest('.teppo-logo') && 
            !e.target.closest('.social-popup')) {
            popup.classList.remove('active');
            teppoPopup.classList.remove('active');
        }
    });

    // Background slideshow
    let bgSlideIndex = 0;
    const bgSlides = document.getElementsByClassName("slide");

    function showBackgroundSlides() {
        if (!bgSlides.length) return;
        
        for (let i = 0; i < bgSlides.length; i++) {
            bgSlides[i].classList.remove("active");
        }
        
        bgSlideIndex = (bgSlideIndex + 1) % bgSlides.length;
        bgSlides[bgSlideIndex].classList.add("active");
    }

    if (bgSlides.length > 0) {
        bgSlides[0].classList.add("active");
    }
    
    setInterval(showBackgroundSlides, 3000);
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
        } else {
            entry.target.classList.remove('active');
            // Сброс анимации
            entry.target.style.animation = 'none';
            entry.target.offsetHeight; // Триггер перерисовки
            entry.target.style.animation = null;
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});
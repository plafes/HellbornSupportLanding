
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

function initializeContentSlider() {
    const sliderImages = document.querySelectorAll('.slider-image');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(index) {
        sliderImages.forEach(img => img.classList.remove('active'));
        currentSlide = (index + sliderImages.length) % sliderImages.length;
        sliderImages[currentSlide].classList.add('active');
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
        nextButton.addEventListener('click', () => showSlide(currentSlide + 1));
    }

    setInterval(() => showSlide(currentSlide + 1), 5000);
}

document.addEventListener("DOMContentLoaded", function() {
    initializeContentSlider();
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

    if (slides.length > 0) {
        slides[0].classList.add("active");
    }
    
    setInterval(showSlides, 3000);

    setTimeout(() => {
        const elements = [document.querySelector('.paragraph-1'), document.querySelector('.content-slider')];
        elements.forEach((el, index) => {
            if (el) {
                setTimeout(() => {
                    el.classList.add('active');
                }, 100 + (index * 100));
            }
        });
    }, 100);

    const paragraphObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                paragraphObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '-50px'
    });

    document.querySelectorAll('.paragraph-2, .paragraph-3').forEach(paragraph => {
        paragraphObserver.observe(paragraph);
    });
});

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.slideshow');
    parallax.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
});

const sections = document.querySelectorAll('.section-animate');
const observerOptions = {
    threshold: 0.25
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

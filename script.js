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
    let touchStartX = 0;
    let touchEndX = 0;

    function showSlide(index) {
        const oldSlide = document.querySelector('.slider-image.active');
        currentSlide = (index + sliderImages.length) % sliderImages.length;
        const newSlide = sliderImages[currentSlide];
        
        if (oldSlide) {
            oldSlide.classList.remove('active');
            oldSlide.classList.add('prev');
            setTimeout(() => {
                oldSlide.classList.remove('prev');
            }, 500);
        }
        newSlide.classList.add('active');
    }

    let touchMoved = false;
    
    const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX;
        touchMoved = false;
        const activeSlide = document.querySelector('.slider-image.active');
        activeSlide.style.transition = 'none';
    };

    const handleTouchMove = (e) => {
        touchMoved = true;
        const currentX = e.touches[0].clientX;
        const difference = currentX - touchStartX;
        const activeSlide = document.querySelector('.slider-image.active');
        
        e.preventDefault();
        activeSlide.style.transform = `translateX(${difference}px)`;
    };

    const handleTouchEnd = (e) => {
        if (!touchMoved) return;
        
        const activeSlide = document.querySelector('.slider-image.active');
        activeSlide.style.transition = 'transform 0.3s ease-out';
        touchEndX = e.changedTouches[0].clientX;
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > 50) {
            if (difference > 0) {
                showSlide(currentSlide + 1);
            } else {
                showSlide(currentSlide - 1);
            }
        } else {
            activeSlide.style.transform = 'translateX(0)';
        }
    };

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
        nextButton.addEventListener('click', () => showSlide(currentSlide + 1));
    }

    const slider = document.querySelector('.content-slider');
    let isTouching = false;
    
    slider.addEventListener('touchstart', handleTouchStart, {passive: true});
    slider.addEventListener('touchmove', handleTouchMove, {passive: false});
    slider.addEventListener('touchend', handleTouchEnd, {passive: true});

    // Only enable auto-slide for desktop
    if (window.innerWidth > 768) {
        setInterval(() => showSlide(currentSlide + 1), 5000);
    }

    // Добавляем обработчик для открытия изображений в полный экран
    sliderImages.forEach(img => {
        img.addEventListener('click', function(e) {
            if (!isTouching) {
                e.preventDefault();
                e.stopPropagation();
                
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    if (window.innerWidth <= 768) {
                        clearInterval(window.sliderInterval);
                    }
                    
                    this.requestFullscreen().catch(err => {
                        window.open(this.src, '_blank');
                    });
                }
            }
        });
        
        img.style.cursor = 'pointer';
    });

    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement && window.innerWidth > 768) {
            window.sliderInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
        }
    });
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

    const firstGroupObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, 100);
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px'
    });

    const firstElements = [document.querySelector('.paragraph-1'), document.querySelector('.content-slider'), document.querySelector('.video-container')];
    firstElements.forEach(el => {
        if (el) {
            firstGroupObserver.observe(el);
        }
    });

    const paragraphObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, 100);
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px'
    });

    setTimeout(() => {
        document.querySelectorAll('.paragraph-2, .paragraph-3').forEach(paragraph => {
            paragraphObserver.observe(paragraph);
        });
    }, 500);

    const videoContainer = document.querySelector('.video-container');
    const videoIframe = document.querySelector('.video-container iframe');

    const videoSlides = document.querySelectorAll('.video-slide');
    const prevVideo = document.querySelector('.prev-video');
    const nextVideo = document.querySelector('.next-video');
    let currentVideo = 0;
    let videoTouchStartX = 0;
    let videoTouchEndX = 0;

    function showVideo(index) {
        videoSlides.forEach(slide => slide.classList.remove('active'));
        currentVideo = (index + videoSlides.length) % videoSlides.length;
        videoSlides[currentVideo].classList.add('active');
    }

    const handleVideoTouchStart = (e) => {
        videoTouchStartX = e.touches[0].clientX;
    };

    const handleVideoTouchEnd = (e) => {
        videoTouchEndX = e.changedTouches[0].clientX;
        const difference = videoTouchStartX - videoTouchEndX;
        const iframes = document.querySelectorAll('.video-slide iframe');
        if (Math.abs(difference) > 50 && !Array.from(iframes).some(iframe => iframe.src.includes('&autoplay=1'))) {
            if (difference > 0) {
                showVideo(currentVideo + 1);
            } else {
                showVideo(currentVideo - 1);
            }
        }
    };

    videoContainer.addEventListener('touchstart', handleVideoTouchStart);
    videoContainer.addEventListener('touchend', handleVideoTouchEnd);

    prevVideo.addEventListener('click', () => {
        const iframes = document.querySelectorAll('.video-slide iframe');
        if (!Array.from(iframes).some(iframe => iframe.src.includes('&autoplay=1'))) {
            showVideo(currentVideo - 1);
        }
    });

    nextVideo.addEventListener('click', () => {
        const iframes = document.querySelectorAll('.video-slide iframe');
        if (!Array.from(iframes).some(iframe => iframe.src.includes('&autoplay=1'))) {
            showVideo(currentVideo + 1);
        }
    });

    videoContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('video-arrow')) {
            const activeVideo = videoSlides[currentVideo].querySelector('iframe');
            window.open(activeVideo.src, '_blank', 'fullscreen=yes');
        }
    });

    // Автоматическое переключение видео
    setInterval(() => {
        const iframes = document.querySelectorAll('.video-slide iframe');
        if (!Array.from(iframes).some(iframe => iframe.src.includes('&autoplay=1'))) {
            showVideo(currentVideo + 1);
        }
    }, 3000);
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
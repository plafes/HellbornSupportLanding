let slideIndex = 0;
const slides = document.getElementsByClassName("slide");

function showSlides() {
    // Проверяем, есть ли слайды
    if (!slides.length) return;

    // Скрываем все слайды
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    // Увеличиваем индекс
    slideIndex++;
    
    // Возвращаемся к первому слайду если достигли конца
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    // Показываем текущий слайд
    slides[slideIndex - 1].classList.add("active");
}

// Запускаем слайдшоу когда страница загружена
document.addEventListener("DOMContentLoaded", function() {
    // Popup functionality
    const logo = document.querySelector('.logo');
    const teppoLogo = document.querySelector('.teppo-logo');
    const popup = document.querySelector('.social-popup');
    const teppoPopup = document.querySelector('.teppo-popup');

    if (window.innerWidth <= 768) {
        logo.style.pointerEvents = 'auto';
        teppoLogo.style.pointerEvents = 'auto';

        logo.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = (e.offsetX - 50) + 'px';
            ripple.style.top = (e.offsetY - 50) + 'px';
            logo.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);
            
            popup.classList.toggle('active');
            teppoPopup.classList.remove('active');
        });

        teppoLogo.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = (e.offsetX - 50) + 'px';
            ripple.style.top = (e.offsetY - 50) + 'px';
            teppoLogo.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);
            
            teppoPopup.classList.toggle('active');
            popup.classList.remove('active');
        });

        [popup, teppoPopup].forEach(p => {
            p.addEventListener('click', (e) => {
                if (e.target === p) {
                    p.classList.remove('active');
                }
            });
        });

        // Закрываем попапы при клике на основной странице
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.logo') && !e.target.closest('.teppo-logo') && 
                !e.target.closest('.social-popup')) {
                popup.classList.remove('active');
                teppoPopup.classList.remove('active');
            }
        });
    }
    // Показываем первый слайд сразу
    if (slides.length > 0) {
        slides[0].classList.add("active");
    }
    
    // Запускаем автоматическую смену каждые 3 секунды
    setInterval(showSlides, 3000);

    // Активация параграфов с небольшой задержкой
    setTimeout(() => {
        document.querySelectorAll('.hero-description p').forEach((p, index) => {
            setTimeout(() => {
                p.classList.add('active');
            }, 100 + (index * 100));
        });
    }, 100);

    // Анимация текста
    const typewriter = document.querySelector('.typewriter');
    typewriter.textContent = 'Добро пожаловать в HELLBORN SUPPORT!';
});

// Добавляем параллакс эффект
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.slideshow');
    parallax.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
});

// Анимация появления секций при скролле
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
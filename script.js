document.addEventListener('DOMContentLoaded', () => {
    const carouselImages = document.querySelector('.carousel-images');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const totalItems = carouselItems.length;
    let currentIndex = 0;

    // Criar os indicadores
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.classList.add('carousel-indicators');
    document.querySelector('.carousel').appendChild(indicatorsContainer);

    carouselItems.forEach((_, index) => {
        const indicator = document.createElement('button');
        if (index === 0) {
            indicator.classList.add('active');
        }
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.carousel-indicators button');

    const updateCarousel = () => {
        carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    };

    // Passagem automática do carrossel
    let autoSlideInterval = setInterval(nextSlide, 30000); // 30 segundos

    // Controles manuais
    const nextButton = document.querySelector('.carousel-control.next');
    const prevButton = document.querySelector('.carousel-control.prev');

    nextButton.addEventListener('click', () => {
        nextSlide();
        clearInterval(autoSlideInterval); // Reseta o timer
        autoSlideInterval = setInterval(nextSlide, 40000);
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        clearInterval(autoSlideInterval); // Reseta o timer
        autoSlideInterval = setInterval(nextSlide, 40000);
    });

    // Controle manual pelos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            clearInterval(autoSlideInterval); // Reseta o timer
            autoSlideInterval = setInterval(nextSlide, 40000);
        });
    });
});

// Fixar a barra de navegação no topo após rolar
window.onscroll = function() {
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const sticky = header.offsetHeight;

    if (window.pageYOffset >= sticky) {
        nav.classList.add('fixed-nav');
    } else {
        nav.classList.remove('fixed-nav');
    }
};

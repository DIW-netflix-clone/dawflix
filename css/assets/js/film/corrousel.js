const slides = document.querySelectorAll('.slide');
let slideIndex = 0;

function showSlide(n) {
    slides[slideIndex].style.display = "none";
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    slides[slideIndex].style.display = "block";
}

// Mostrar la primera diapositiva
showSlide(0);

// Botones de control (opcional)
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

prevBtn.addEventListener('click', () => {
    showSlide(-1);
});

nextBtn.addEventListener('click', () => {
    showSlide(1);
});
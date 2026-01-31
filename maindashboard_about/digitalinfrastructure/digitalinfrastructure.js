// Circular progress animation
document.querySelectorAll('.progress-circle').forEach(circle => {
    let progress = circle.getAttribute('data-progress');
    circle.style.background = `conic-gradient(rgba(255,255,255,0.9) ${progress}%, rgba(255,255,255,0.2) ${progress}% 100%)`;
    circle.textContent = progress + '%';
});

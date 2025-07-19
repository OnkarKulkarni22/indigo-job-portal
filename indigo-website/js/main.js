document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.sample-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Thank you! Your free sample request has been received.");
      form.reset();
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        nameError.textContent = '';
        emailError.textContent = '';
        subjectError.textContent = '';
        messageError.textContent = '';
        const fullName = contactForm.fullName.value.trim();
        const email = contactForm.email.value.trim();
        const subject = contactForm.subject.value.trim();
        const message = contactForm.message.value.trim();
        let isValid = true;
        if (fullName === '') {
            nameError.textContent = 'Full name is required';
            isValid = false;
        } else if (fullName.length < 3) {
            nameError.textContent = 'Name must be at least 3 characters';
            isValid = false;
        }
        if (email === '') {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(email)) {
            emailError.textContent = 'Please enter a valid email';
            isValid = false;
        }
        if (subject === '') {
            subjectError.textContent = 'Subject is required';
            isValid = false;
        } else if (subject.length < 5) {
            subjectError.textContent = 'Subject must be at least 5 characters';
            isValid = false;
        }
        if (message === '') {
            messageError.textContent = 'Message is required';
            isValid = false;
        } else if (message.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            isValid = false;
        }
        if (isValid) {
            contactForm.reset();
            contactForm.style.display = 'none';
            successMessage.style.display = 'flex';

            setTimeout(() => {
                successMessage.style.display = 'none';
                contactForm.style.display = 'flex';
            }, 5000);
        }
    });
    contactForm.fullName.addEventListener('input', function() {
        if (this.value.trim().length >= 3) {
            nameError.textContent = '';
        }
    });
    contactForm.email.addEventListener('input', function() {
        if (isValidEmail(this.value.trim())) {
            emailError.textContent = '';
        }
    });
    contactForm.subject.addEventListener('input', function() {
        if (this.value.trim().length >= 5) {
            subjectError.textContent = '';
        }
    });
    contactForm.message.addEventListener('input', function() {
        if (this.value.trim().length >= 10) {
            messageError.textContent = '';
        }
    });
});
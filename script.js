// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-card, .contact-item, .service-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Email form handling with multiple options
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Show options modal
    showEmailOptions(name, email, subject, message);
});

function showEmailOptions(name, email, subject, message) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'email-modal';
    modal.innerHTML = `
        <div class="email-modal-content">
            <div class="email-modal-header">
                <h3>Choose how to send your email</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="email-modal-body">
                <button class="email-option" onclick="openEmailClient('${name}', '${email}', '${subject}', '${message}')">
                    <i class="fas fa-envelope"></i>
                    Open Email Client
                    <small>Opens your default email app</small>
                </button>
                <button class="email-option" onclick="copyEmailInfo('${name}', '${email}', '${subject}', '${message}')">
                    <i class="fas fa-copy"></i>
                    Copy Email Details
                    <small>Copy info to send manually</small>
                </button>
                <button class="email-option" onclick="openGmail('${name}', '${email}', '${subject}', '${message}')">
                    <i class="fab fa-google"></i>
                    Open Gmail
                    <small>Compose in Gmail web</small>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.close-modal').onclick = () => {
        document.body.removeChild(modal);
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };
}

function openEmailClient(name, email, subject, message) {
    const mailtoLink = `mailto:contact@roshishparajuli.com.np?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    try {
        window.location.href = mailtoLink;
        closeModalAndReset();
        showSuccessMessage('Email client opened! If nothing happened, try copying the email details instead.');
    } catch (error) {
        alert('Unable to open email client. Please try copying the email details instead.');
    }
}

function copyEmailInfo(name, email, subject, message) {
    const emailText = `To: contact@roshishparajuli.com.np
Subject: ${subject}

Name: ${name}
Email: ${email}

Message:
${message}`;
    
    navigator.clipboard.writeText(emailText).then(() => {
        closeModalAndReset();
        showSuccessMessage('Email details copied to clipboard! You can now paste this into your email client.');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = emailText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        closeModalAndReset();
        showSuccessMessage('Email details copied to clipboard!');
    });
}

function openGmail(name, email, subject, message) {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=contact@roshishparajuli.com.np&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    window.open(gmailUrl, '_blank');
    closeModalAndReset();
    showSuccessMessage('Gmail opened in a new tab!');
}

function closeModalAndReset() {
    const modal = document.querySelector('.email-modal');
    if (modal) {
        document.body.removeChild(modal);
    }
    document.getElementById('contact-form').reset();
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        if (document.body.contains(successDiv)) {
            document.body.removeChild(successDiv);
        }
    }, 5000);
}

// Typing animation for hero title
const heroTitle = document.querySelector('.hero-title');
const titleText = "Hi, I'm Roshish Parajuli";
heroTitle.innerHTML = '';

let i = 0;
function typeWriter() {
    if (i < titleText.length) {
        heroTitle.innerHTML += titleText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #667eea;
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);
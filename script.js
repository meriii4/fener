document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Animate hamburger menu
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Add styles for active hamburger icon
    const style = document.createElement('style');
    style.textContent = `
        .menu-toggle span.active:nth-child(1) {
            transform: translateY(9px) rotate(45deg);
        }
        .menu-toggle span.active:nth-child(2) {
            opacity: 0;
        }
        .menu-toggle span.active:nth-child(3) {
            transform: translateY(-9px) rotate(-45deg);
        }
    `;
    document.head.appendChild(style);
    
    // Search functionality
    const searchBox = document.querySelector('.search-box');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn && searchBox) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchBox.value);
        });
        
        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchBox.value);
            }
        });
    }
    
    function performSearch(query) {
        if (query.trim() === '') {
            alert('Lütfen bir arama terimi girin!');
            return;
        }
        
        // In a real application, you would redirect to a search results page
        // For now, we'll just show an alert
        alert(`"${query}" için arama sonuçları gösteriliyor...`);
        // Example of what you might do in production:
        // window.location.href = `/arama?q=${encodeURIComponent(query)}`;
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value;
            
            if (!validateEmail(email)) {
                alert('Lütfen geçerli bir e-posta adresi girin!');
                return;
            }
            
            // Simulate API call to subscribe
            subscribeToNewsletter(email);
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function subscribeToNewsletter(email) {
        // Simulate successful subscription
        alert(`${email} adresiniz bültenimize başarıyla kaydedildi!`);
        
        // In a real application, you would make an API call:
        /*
        fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Bültenimize başarıyla abone oldunuz!');
            } else {
                alert('Bir hata oluştu: ' + data.message);
            }
        })
        .catch(error => {
            alert('Bağlantı hatası, lütfen daha sonra tekrar deneyin.');
            console.error('Error:', error);
        });
        */
        
        // Clear the input field
        document.querySelector('.newsletter-input').value = '';
    }
    
    // Add smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Create a news ticker that pauses on hover
    const newsTicker = document.querySelector('.news-ticker');
    
    if (newsTicker) {
        newsTicker.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        newsTicker.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
    
    // Add hover effects to category cards
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('.category-title').textContent;
            // You could redirect to a category page
            // window.location.href = `/kategori/${category.toLowerCase()}`;
            alert(`${category} kategorisine gidiliyor...`);
        });
    });
    
    // Add authentication modal functionality
    const authButtons = document.querySelectorAll('.auth-btn');
    
    authButtons.forEach(button => {
        button.addEventListener('click', function() {
            const actionType = this.textContent.trim();
            createAuthModal(actionType);
        });
    });
    
    function createAuthModal(type) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.auth-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'auth-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';
        
        const title = document.createElement('h2');
        title.textContent = type === 'GİRİŞ YAP' ? 'Giriş Yap' : 'Üye Ol';
        
        const form = document.createElement('form');
        form.className = 'auth-form';
        
        // Create form fields
        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.placeholder = 'E-posta Adresi';
        emailInput.required = true;
        
        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.placeholder = 'Şifre';
        passwordInput.required = true;
        
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.textContent = type;
        submitBtn.className = 'auth-submit-btn';
        
        // Add elements to form
        form.appendChild(emailInput);
        form.appendChild(passwordInput);
        
        // Add confirm password for registration
        if (type === 'ÜYE OL') {
            const confirmPasswordInput = document.createElement('input');
            confirmPasswordInput.type = 'password';
            confirmPasswordInput.placeholder = 'Şifre Tekrar';
            confirmPasswordInput.required = true;
            form.appendChild(confirmPasswordInput);
        }
        
        form.appendChild(submitBtn);
        
        // Add elements to modal
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(title);
        modalContent.appendChild(form);
        modal.appendChild(modalContent);
        
        // Add modal styles
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .auth-modal {
                display: block;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.7);
                animation: fadeIn 0.3s;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .modal-content {
                background: white;
                margin: 10% auto;
                padding: 25px;
                width: 90%;
                max-width: 450px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                position: relative;
                animation: slideDown 0.4s;
            }
            
            @keyframes slideDown {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .close-btn {
                position: absolute;
                right: 15px;
                top: 10px;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
                color: #777;
                transition: color 0.3s;
            }
            
            .close-btn:hover {
                color: #041e42;
            }
            
            .auth-form {
                display: flex;
                flex-direction: column;
                gap: 15px;
                margin-top: 20px;
            }
            
            .auth-form input {
                padding: 12px 15px;
                border: 1px solid #ddd;
                border-radius: 8px;
                font-size: 16px;
            }
            
            .auth-submit-btn {
                background: linear-gradient(90deg, #041e42 0%, #0a3366 100%);
                color: #ffd200;
                border: none;
                padding: 12px;
                border-radius: 8px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .auth-submit-btn:hover {
                background: linear-gradient(90deg, #0a3366 0%, #041e42 100%);
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            }
        `;
        document.head.appendChild(modalStyle);
        
        // Add to document
        document.body.appendChild(modal);
        
        // Handle close
        closeBtn.addEventListener('click', function() {
            modal.remove();
        });
        
        // Close when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation example
            const email = emailInput.value;
            const password = passwordInput.value;
            
            if (!validateEmail(email)) {
                alert('Lütfen geçerli bir e-posta adresi girin.');
                return;
            }
            
            if (password.length < 6) {
                alert('Şifre en az 6 karakter olmalıdır.');
                return;
            }
            
            if (type === 'ÜYE OL') {
                const confirmPassword = form.querySelector('input[placeholder="Şifre Tekrar"]').value;
                if (password !== confirmPassword) {
                    alert('Şifreler eşleşmiyor.');
                    return;
                }
                
                // Handle registration
                alert('Kayıt işlemi başarılı! Giriş yapabilirsiniz.');
            } else {
                // Handle login
                alert('Giriş başarılı! Hoş geldiniz.');
            }
            
            modal.remove();
        });
    }
    
    // Add image lazy loading
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src') || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            if (!img.hasAttribute('data-src')) {
                img.setAttribute('data-src', img.src);
            }
            imageObserver.observe(img);
        });
    }
    
    // Add custom dropdown menu for mobile
    document.querySelectorAll('.nav-menu > li').forEach(item => {
        item.addEventListener('click', function() {
            // Toggle active class
            this.classList.toggle('nav-active');
            
            // Close mobile menu after navigation
            if (window.innerWidth < 768) {
                setTimeout(() => {
                    navMenu.classList.remove('active');
                    const spans = menuToggle.querySelectorAll('span');
                    spans.forEach(span => span.classList.remove('active'));
                }, 300);
            }
        });
    });
});

// Efeito de Partículas
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar partículas
    if(document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#01eeff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#01eeff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // Efeito Parallax no cabeçalho
    const parallaxBg = document.querySelector('.parallax-bg');
    if(parallaxBg) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            parallaxBg.style.transform = `translateY(${scrollY * 0.5}px)`;
        });
    }

    // Animação das barras de habilidades
    const skillCards = document.querySelectorAll('.skill-card');
    const skillBars = document.querySelectorAll('.skill-bar');

    // Configurar as porcentagens das barras de habilidades
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.setProperty('--percent', percent + '%');
    });

    // Função para animar as barras quando visíveis
    const animateSkillBars = () => {
        skillCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(cardPosition < screenPosition) {
                card.classList.add('animate');
            }
        });
    };

    // Verificar ao carregar e ao rolar
    window.addEventListener('load', animateSkillBars);
    window.addEventListener('scroll', animateSkillBars);

    // Contador de estatísticas animado com efeitos visuais
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    const animateCounter = () => {
        if(counted) return;
        
        const statsSection = document.querySelector('.stats-container');
        if(!statsSection) return;
        
        const statsSectionPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if(statsSectionPosition < screenPosition) {
            statNumbers.forEach((stat, index) => {
                // Adiciona delay para cada estatística aparecer sequencialmente
                setTimeout(() => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    let count = 0;
                    const duration = 2000; // 2 segundos
                    const increment = target / (duration / 16); // 60fps
                    
                    // Adiciona classe para animar o container da estatística
                    const statItem = stat.closest('.stat-item');
                    if(statItem) statItem.classList.add('animate-in');
                    
                    const updateCount = () => {
                        if(count < target) {
                            count += increment;
                            stat.textContent = Math.ceil(count);
                            requestAnimationFrame(updateCount);
                        } else {
                            stat.textContent = target;
                            // Adiciona efeito de destaque quando termina
                            stat.classList.add('highlight');
                            // Anima o ícone associado
                            const icon = statItem?.querySelector('.stat-icon');
                            if(icon) icon.classList.add('pulse');
                        }
                    };
                    
                    updateCount();
                }, index * 200); // Delay escalonado para cada estatística
            });
            
            counted = true;
        }
    };

    // Função para verificar se um elemento está visível na viewport
    const isElementInViewport = (el) => {
        if(!el) return false;
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    };

    window.addEventListener('load', animateCounter);
    window.addEventListener('scroll', animateCounter);
    window.addEventListener('resize', animateCounter);
    
    // Alternar tema claro/escuro
    const themeToggle = document.querySelector('.theme-toggle');

    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            // Atualizar ícone
            const icon = themeToggle.querySelector('i');
            if(document.body.classList.contains('light-mode')) {
                icon.className = 'fas fa-moon';
            } else {
                icon.className = 'fas fa-sun';
            }
            
            // Salvar preferência no localStorage
            const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
        });

        // Verificar tema salvo
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.querySelector('i').className = 'fas fa-moon';
        }
    }

    // Filtro de projetos com animações
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projetoCards = document.querySelectorAll('.projeto-card');
    const projetosGrid = document.querySelector('.projetos-grid');

    // Função para animar os cards quando filtrados
    function animateFilteredCards() {
        projetoCards.forEach((card, index) => {
            if (card.style.display !== 'none') {
                // Reset da animação
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = `fadeIn 0.5s ease-out forwards ${index * 0.1}s`;
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe ativa de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar classe ativa ao botão clicado
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Adiciona classe para animar o grid
            projetosGrid.classList.add('filtering');
            
            setTimeout(() => {
                projetoCards.forEach(card => {
                    if(filter === 'all') {
                        card.style.display = 'block';
                    } else if(card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Anima os cards após filtrar
                animateFilteredCards();
                projetosGrid.classList.remove('filtering');
            }, 300);
        });
    });
    
    // Adiciona efeito de hover 3D aos cards
    projetoCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // Posição X do mouse dentro do card
            const y = e.clientY - rect.top;  // Posição Y do mouse dentro do card
            
            // Calcula a rotação com base na posição do mouse
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Aplica a transformação
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            // Reseta a transformação quando o mouse sai
            this.style.transform = '';
            setTimeout(() => {
                this.style.transition = 'var(--transition-fast)';
            }, 100);
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.1s ease';
        });
    });

    // Slider de depoimentos avançado
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    let testimonialInterval;
    let isAnimating = false;

    const showSlide = (index, direction = 'next') => {
        if (isAnimating) return;
        isAnimating = true;
        
        // Remover classes ativas
        testimonialItems.forEach(item => {
            item.classList.remove('active');
            if (direction === 'next') {
                item.style.transform = 'scale(0.9) translateX(50px)';
            } else {
                item.style.transform = 'scale(0.9) translateX(-50px)';
            }
        });
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        // Adicionar classes ativas ao slide atual
        testimonialItems[index].classList.add('active');
        testimonialItems[index].style.transform = 'scale(1) translateX(0)';
        testimonialDots[index].classList.add('active');
        
        // Adicionar atributos aria para acessibilidade
        testimonialDots.forEach((dot, i) => {
            dot.setAttribute('aria-current', i === index ? 'true' : 'false');
        });
        
        // Resetar o timer de animação
        setTimeout(() => {
            isAnimating = false;
        }, 800); // Corresponde à duração da transição CSS
    };

    const startAutoSlide = () => {
        stopAutoSlide();
        testimonialInterval = setInterval(() => {
            goToNextSlide();
        }, 6000);
    };

    const stopAutoSlide = () => {
        if (testimonialInterval) {
            clearInterval(testimonialInterval);
        }
    };

    const goToNextSlide = () => {
        currentSlide++;
        if (currentSlide >= testimonialItems.length) currentSlide = 0;
        showSlide(currentSlide, 'next');
    };

    const goToPrevSlide = () => {
        currentSlide--;
        if (currentSlide < 0) currentSlide = testimonialItems.length - 1;
        showSlide(currentSlide, 'prev');
    };

    if (prevBtn && nextBtn && testimonialItems.length > 0) {
        // Inicializar o primeiro slide
        showSlide(currentSlide);
        
        // Configurar eventos de clique
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stopAutoSlide();
            goToPrevSlide();
            startAutoSlide();
        });

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stopAutoSlide();
            goToNextSlide();
            startAutoSlide();
        });

        // Adicionar atributos de acessibilidade aos controles
        prevBtn.setAttribute('role', 'button');
        prevBtn.setAttribute('tabindex', '0');
        nextBtn.setAttribute('role', 'button');
        nextBtn.setAttribute('tabindex', '0');
        
        // Adicionar suporte a teclado para os controles
        prevBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                stopAutoSlide();
                goToPrevSlide();
                startAutoSlide();
            }
        });
        
        nextBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                stopAutoSlide();
                goToNextSlide();
                startAutoSlide();
            }
        });

        testimonialDots.forEach((dot, index) => {
            // Adicionar atributos de acessibilidade
            dot.setAttribute('role', 'button');
            dot.setAttribute('tabindex', '0');
            dot.setAttribute('aria-current', index === currentSlide ? 'true' : 'false');
            
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentSlide === index) return;
                stopAutoSlide();
                const direction = index > currentSlide ? 'next' : 'prev';
                currentSlide = index;
                showSlide(currentSlide, direction);
                startAutoSlide();
            });
            
            // Adicionar suporte a teclado
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (currentSlide === index) return;
                    stopAutoSlide();
                    const direction = index > currentSlide ? 'next' : 'prev';
                    currentSlide = index;
                    showSlide(currentSlide, direction);
                    startAutoSlide();
                }
            });
        });

        // Adicionar eventos de toque para dispositivos móveis
        const testimonialContainer = document.querySelector('.testimonial-container');
        let touchStartX = 0;
        let touchEndX = 0;
        
        testimonialContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        testimonialContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe para a esquerda (próximo slide)
                stopAutoSlide();
                goToNextSlide();
                startAutoSlide();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe para a direita (slide anterior)
                stopAutoSlide();
                goToPrevSlide();
                startAutoSlide();
            }
        };
        
        // Pausar o slider quando o mouse estiver sobre ele
        testimonialContainer.addEventListener('mouseenter', stopAutoSlide);
        testimonialContainer.addEventListener('mouseleave', startAutoSlide);
        
        // Iniciar o slider automático
        startAutoSlide();
    }

    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if(menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Botão de voltar ao topo
    const backToTopBtn = document.querySelector('.back-to-top');

    if(backToTopBtn) {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Alternar tema claro/escuro
    const themeToggle = document.querySelector('.theme-toggle');

    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            // Atualizar ícone
            const icon = themeToggle.querySelector('i');
            if(document.body.classList.contains('light-mode')) {
                icon.className = 'fas fa-moon';
            } else {
                icon.className = 'fas fa-sun';
            }
            
            // Salvar preferência no localStorage
            const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
        });

        // Verificar tema salvo
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.querySelector('i').className = 'fas fa-moon';
        }
    }

    // Formulário de contato
    const contactForm = document.querySelector('.contact-form');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulação de envio
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Simulação de sucesso
                const formMessage = document.createElement('div');
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Mensagem enviada com sucesso!';
                
                contactForm.appendChild(formMessage);
                contactForm.reset();
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    formMessage.remove();
                }, 5000);
            }, 2000);
        });
    }

    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Ajuste para o header fixo
                    behavior: 'smooth'
                });
            }
        });
    });
});
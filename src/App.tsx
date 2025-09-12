/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

// --- ICONS (as SVG components) ---
const SocialIcon = () => (
  <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const BrandingIcon = () => (
  <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
);
const EventIcon = () => (
    <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);
const DocumentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);
const InstagramIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const LinkedInIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const WhatsAppIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>);


// --- COMPONENTS ---
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href')?.substring(1);
      const targetElement = document.getElementById(targetId || '');
      if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false); // Close mobile menu after click
    };

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <a href="#home" className="nav-logo" onClick={handleNavClick}>Lume Studio</a>
            <nav>
                <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
                    <li><a href="#services" onClick={handleNavClick}>Servicios</a></li>
                    <li><a href="#portfolio" onClick={handleNavClick}>Portafolio</a></li>
                    <li><a href="#about" onClick={handleNavClick}>Nosotras</a></li>
                    <li><a href="#contact" onClick={handleNavClick}>Contacto</a></li>
                </ul>
            </nav>
            <a href="#contact" className="btn" onClick={handleNavClick}>Trabajemos juntos</a>
            <button className="mobile-nav-toggle" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
        </header>
    );
}

interface TypewriterProps {
    text: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text }) => {
    const [displayText, setDisplayText] = useState('');
    
    useEffect(() => {
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                setDisplayText(text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typing);
            }
        }, 100);
        return () => clearInterval(typing);
    }, [text]);

    return <h1>{displayText}<span className="typing-cursor">|</span></h1>;
}

const Hero = () => {
    return (
        <section id="home" className="hero">
            <video autoPlay loop muted playsInline className="hero-background-video">
                <source src="../src/assets/videos/Video1.mp4" type="video/mp4" />
                Tu navegador no soporta videos.
            </video>
            <div className="hero-content">
                <Typewriter text="Creamos marcas con identidad." />
                <a href="https://wa.me/TUNUMERO" className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">Hablemos por WhatsApp</a>
            </div>
        </section>
    );
}

const Services = () => {
    const services = [
        { icon: <SocialIcon/>, title: "Gestión de redes sociales", description: "Creamos y gestionamos contenido que conecta con tu audiencia y potencia tu marca." },
        { icon: <BrandingIcon/>, title: "Branding & Diseño", description: "Desarrollamos identidades visuales memorables que reflejan la esencia de tu negocio." },
        { icon: <EventIcon/>, title: "Cobertura de eventos", description: "Capturamos los mejores momentos de tus eventos para generar contenido de alto impacto." }
    ];

    return (
        <section id="services" className="services">
            <div className="container">
                <h2>Nuestros Servicios</h2>
                <div className="services-grid">
                    {services.map(s => (
                        <div key={s.title} className="service-card">
                            {s.icon}
                            <h3>{s.title}</h3>
                            <p>{s.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  type: 'image' | 'video';
  src: string;
}

const Portfolio = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<PortfolioItem | null>(null);

  const portfolioItems: PortfolioItem[] = [
    { id: 1, title: "Branding Cosmético", description: "Diseño de identidad visual para marcas cosméticas.", type: "image", src: "../src/assets/fotos/foto1.jpg" },
    { id: 2, title: "Social Media Flatlay", description: "Fotografía creativa para redes sociales.", type: "video", src: "../src/assets/videos/Video2.mp4" },
    { id: 3, title: "Diseño Gráfico", description: "Creación de piezas gráficas únicas.", type: "image", src: "../src/assets/fotos/foto2.jpg" },
    { id: 4, title: "Cobertura de Evento", description: "Capturamos los mejores momentos de tus eventos.", type: "video", src: "../src/assets/videos/Video3.mp4" },
    { id: 5, title: "Producción Zion", description: "Producción audiovisual para clientes destacados.", type: "image", src: "../src/assets/fotos/foto3.jpg" },
    { id: 6, title: "Proceso de Branding", description: "Un vistazo al proceso creativo detrás de nuestras marcas.", type: "video", src: "../src/assets/videos/Video4.mp4" },
  ];

  const openModal = (item: PortfolioItem) => {
    setModalContent(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    // Delay clearing content to allow for closing animation
    setTimeout(() => setModalContent(null), 300);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
         closeModal();
       }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);


  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <h2>Portafolio</h2>
        <div className="portfolio-grid">
          {portfolioItems.map(item => (
            <div
              className="portfolio-item"
              key={item.id}
              onClick={() => openModal(item)}
              role="button"
              tabIndex={0}
              aria-label={`Ver proyecto: ${item.title}`}
            >
              {item.type === 'image' ? (
                <img src={item.src} alt={item.title} loading="lazy" />
              ) : (
                <video autoPlay loop muted playsInline>
                  <source src={item.src} type="video/mp4" />
                  Tu navegador no soporta videos.
                </video>
              )}
              <div className="portfolio-overlay">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && modalContent && (
        <div className="modal" onClick={closeModal} role="dialog" aria-modal="true">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {modalContent.type === 'image' ? (
              <img src={modalContent.src} alt={modalContent.title} />
            ) : (
              <video controls autoPlay loop>
                <source src={modalContent.src} type="video/mp4" />
                Tu navegador no soporta videos.
              </video>
            )}
          </div>
          <button className="modal-close" onClick={closeModal} aria-label="Cerrar modal">✕</button>
        </div>
      )}
    </section>
  );
}

const AboutUs = () => {
    const images = [
        "../src/assets/fotos/foto1.jpg",
        "../src/assets/fotos/foto_quienes_somos_1.jpg",
        "../src/assets/fotos/foto_quienes_somos_2.jpg"
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [images.length]);

    return (
        <section id="about" className="about">
            <div className="container about-content">
                <div className="about-text">
                    <h3>Somos Lume Studio</h3>
                    <p>
                        Apasionadas por la comunicación y el diseño, fundamos Lume para ayudar a marcas como la tuya a brillar. 
                        Combinamos estrategia y creatividad para construir comunidades sólidas y relaciones duraderas. 
                        Nuestro diferencial es un trato cercano y un compromiso total con tus objetivos.
                    </p>
                </div>
                <div className="about-image-container">
                    <img 
                        key={currentImageIndex}
                        src={images[currentImageIndex]} 
                        alt="Fundadoras de Lume Studio" 
                        className="about-image"
                    />
                </div>
            </div>
        </section>
    );
}

const Testimonials = () => {
    const [current, setCurrent] = useState(0);
    const testimonialsData = [
        { name: "Vulcano Group", text: "Lume nos ayudó a definir nuestra voz en redes y a conectar genuinamente con nuestra comunidad. ¡Su visión estratégica es impecable!", image: "../src/assets/fotos/foto_testimonio_vulcano.jpg" },
        { name: "Peluquería Zion", text: "Profesionalismo y creatividad de principio a fin. Los resultados hablan por sí solos.", image: "../src/assets/fotos/foto_testimonio_peluqueria.jpg" },
       // { name: "Cliente 3", text: "Supieron captar nuestra esencia y transmitirla a la perfección. ¡Súper recomendadas!", image: "https://randomuser.me/api/portraits/women/60.jpg" }
    ];

    const nextTestimonial = () => setCurrent(current === testimonialsData.length - 1 ? 0 : current + 1);
    const prevTestimonial = () => setCurrent(current === 0 ? testimonialsData.length - 1 : current - 1);

    return (
        <section id="testimonials">
            <div className="container">
                <h2>Qué dicen nuestros clientes</h2>
                <div className="testimonial-carousel">
                    {testimonialsData.map((t, index) => (
                        <div className={`testimonial-card ${index === current ? 'active' : ''}`} key={t.name}>
                            <img src={t.image} alt={t.name} />
                            <p>"{t.text}"</p>
                            <h4>- {t.name}</h4>
                        </div>
                    ))}
                    <div className="carousel-nav">
                        <button className="carousel-btn prev" onClick={prevTestimonial}>‹</button>
                        <button className="carousel-btn next" onClick={nextTestimonial}>›</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Hablemos</h2>
        <p style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem'}}>
          Para conocer más tu empresa y cómo podemos ayudarte, te invitamos a completar este breve formulario.
          Esto nos permitirá ofrecerte una propuesta personalizada según tus necesidades. 🚀
        </p>
        <div className="contact-actions">
           <a 
             href="https://docs.google.com/forms/d/e/1FAIpQLSdTmmxjZSxLE8xdtcrfqqYsKB-NOyg3Bz1lcRANGOXUS5iAmA/viewform" 
             className="btn" 
             target="_blank" 
             rel="noopener noreferrer"
           >
             <DocumentIcon />
             Obtener Propuesta Personalizada
           </a>
           <a 
             href="https://wa.me/TUNUMERO" 
             className="btn btn-whatsapp" 
             target="_blank" 
             rel="noopener noreferrer"
           >
             <WhatsAppIcon />
             O envíanos un WhatsApp
           </a>
         </div>
      </div>
    </section>
  );
};


const Footer = () => {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href')?.substring(1);
      const targetElement = document.getElementById(targetId || '');
      if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-socials">
                    <a href="https://www.instagram.com/lume.studioar/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon/></a>
                    <a href="#" aria-label="LinkedIn"><LinkedInIcon/></a>
                </div>
                <ul className="footer-links">
                    <li><a href="#services" onClick={handleNavClick}>Servicios</a></li>
                    <li><a href="#portfolio" onClick={handleNavClick}>Portafolio</a></li>
                    <li><a href="#about" onClick={handleNavClick}>Nosotras</a></li>
                    <li><a href="#contact" onClick={handleNavClick}>Contacto</a></li>
                </ul>
                <p>&copy; 2025 Lume Studio. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <AboutUs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<StrictMode><App /></StrictMode>);
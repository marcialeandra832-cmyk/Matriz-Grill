/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useReducedMotion,
  MotionValue 
} from 'motion/react';
import musicaAoVivoImg from './assets/images/galeria/sexta-18-09-card.png';
import eventoLeoZimmerImg from './assets/domingo-11-10-card.png';
import galeriaAmbienteImg from './assets/images/galeria/galeria_ambiente.jpg';
import galeriaMusicaImg from './assets/images/galeria/galeria_musica.jpg';
import galeriaEncontroImg from './assets/images/galeria/galeria_encontro.jpg';
import logoImg from './assets/images/logo.png';
import { 
  Music, 
  Utensils, 
  Beer, 
  MapPin, 
  Instagram, 
  Phone, 
  ChevronRight, 
  ChevronLeft,
  Star, 
  Clock, 
  Menu as MenuIcon, 
  X,
  Flame,
  ArrowUpRight,
  Tv,
  Trophy,
  Wine,
  Soup,
  Apple,
  Smartphone,
  ShoppingBag,
  MessageCircle,
  Car,
  Baby,
  CalendarCheck,
  HelpCircle,
  Ticket
} from 'lucide-react';

// --- Opening Status Helper & Components ---

interface StatusInfo {
  isOpen: boolean;
  text: string;
  shortText: string;
}

function getOpeningStatus(): StatusInfo {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday, ...
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentTimeInMinutes = hour * 60 + minute;
  
  const openTime = 17 * 60; // 17:00
  const closeTime = 22 * 60 + 30; // 22:30
  
  const isOpeningDay = day !== 1; // Not Monday
  const isWithinHours = currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime;
  
  if (isOpeningDay && isWithinHours) {
    return {
      isOpen: true,
      text: "Aberto agora",
      shortText: "Aberto"
    };
  }
  
  // Closed. Determine when it opens next.
  let nextOpenDayText = "hoje";
  
  if (day === 1) {
    // Today is Monday, next open is Tuesday
    nextOpenDayText = "terça-feira";
  } else {
    // Today is Tuesday - Sunday
    if (currentTimeInMinutes < openTime) {
      // It's earlier than 17:00 on an open day
      nextOpenDayText = "hoje";
    } else {
      // It's after 22:30 on an open day
      if (day === 0) {
        // Today is Sunday, Monday is closed, so next is Tuesday
        nextOpenDayText = "terça-feira";
      } else {
        // Next day is an open day (Wednesday to Sunday)
        const daysOfWeek = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
        const nextDayIndex = (day + 1) % 7;
        nextOpenDayText = daysOfWeek[nextDayIndex];
      }
    }
  }
  
  return {
    isOpen: false,
    text: `Fechado agora — abrimos ${nextOpenDayText} às 17h`,
    shortText: "Fechado"
  };
}

const OpenStatusBadge = ({ short = false }: { short?: boolean }) => {
  const [status, setStatus] = useState<StatusInfo>({ isOpen: false, text: "Carregando...", shortText: "Carregando..." });

  useEffect(() => {
    setStatus(getOpeningStatus());

    const interval = setInterval(() => {
      setStatus(getOpeningStatus());
    }, 30000); // Check every 30s to keep it fresh

    return () => clearInterval(interval);
  }, []);

  if (status.text === "Carregando...") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium text-white/40 bg-white/5 animate-pulse whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
        Verificando...
      </span>
    );
  }

  return (
    <span 
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider transition-all duration-300 ${
        status.isOpen 
          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
          : "bg-brand-amber/10 text-brand-amber border border-brand-amber/20"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${status.isOpen ? "bg-emerald-400 animate-pulse" : "bg-brand-amber"}`} />
      {short ? (
        <span>{status.shortText}</span>
      ) : (
        <>
          <span className="inline sm:hidden">{status.shortText}</span>
          <span className="hidden sm:inline">{status.text}</span>
        </>
      )}
    </span>
  );
};

const FloatingWhatsApp = () => {
  return (
    <motion.a
      href="https://wa.me/5549999328763?text=Ol%C3%A1!%20Vim%20pelo%20site%20do%20Matriz%20Grill%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:scale-110 active:scale-95 transition-all duration-300 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      aria-label="Fale conosco no WhatsApp"
    >
      {/* Sutil pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
      <MessageCircle className="w-7 h-7 relative z-10" />
    </motion.a>
  );
};

// --- Components ---

const Logo = ({ className = "h-20 md:h-28" }: { className?: string }) => (
  <div className="flex items-center justify-center select-none">
    <img 
      src={logoImg || "https://i.ibb.co/pjwjH1mG/LOGO-MATRIZ-GRILL-4.png"} 
      alt="Matriz Grill" 
      className={`${className} w-auto object-contain hover:scale-105 transition-transform duration-300 drop-shadow-md`}
      onError={(e) => {
        (e.target as HTMLImageElement).src = "https://i.ibb.co/pjwjH1mG/LOGO-MATRIZ-GRILL-4.png";
      }}
    />
  </div>
);

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden select-none cursor-ew-resize border border-white/10 shadow-2xl group"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={(e) => {
        if (e.touches[0]) handleMove(e.touches[0].clientX);
      }}
    >
      {/* Before Image (Left Side) */}
      <img 
        src="https://i.ibb.co/39ZM6HgK/2.png" 
        alt="Antes - Bar Simples de Madeira em Videira" 
        className="absolute inset-0 w-full h-full object-cover select-none"
        referrerPolicy="no-referrer"
      />
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white border border-white/20 shadow-lg">
          Antes: Bar Simples de Bairro
        </div>
      </div>

      {/* After Image (Right Side, clipped based on slider position) */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
      >
        <img 
          src="https://i.ibb.co/d4cFyB96/5.png" 
          alt="Depois - Matriz Grill Gastropub Moderno" 
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 z-20 bg-brand-amber text-black px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-brand-amber/30 shadow-lg font-mono">
          Depois: Esquina Mais Badalada
        </div>
      </div>

      {/* Divider Line */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-brand-amber z-30 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-amber text-black flex items-center justify-center shadow-2xl border-2 border-white pointer-events-none select-none group-hover:scale-110 transition-transform duration-200">
          <span className="text-sm font-black">↔</span>
        </div>
      </div>
      
      {/* Help Overlay - disappears on drag */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] text-white/80 tracking-widest uppercase pointer-events-none select-none text-center">
        Arraste ou clique para comparar
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#', active: true },
    { name: 'MENU', href: '#cardapio' },
    { name: 'DRINKS', href: '#cardapio' },
    { name: 'LIVE MUSIC', href: '#agenda' },
    { name: 'GALLERY', href: '#galeria' },
  ];

  const whatsappReservationUrl = "https://wa.me/5549999328763?text=Ol%C3%A1%21%20Gostaria%20de%20reservar%20uma%20mesa%20no%20Matriz%20Grill.";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#120a06]/95 backdrop-blur-md shadow-2xl border-b border-amber-900/30' : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent'}`}>
      {/* Top Impact Phrase Bar */}
      <div className="w-full bg-brand-red py-1.5 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <motion.span 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white flex items-center gap-2 whitespace-nowrap"
          >
            <Flame className="w-3.5 h-3.5 fill-brand-amber text-brand-amber animate-pulse" />
            A ESQUINA MAIS BADALADA DA CIDADE
            <Flame className="w-3.5 h-3.5 fill-brand-amber text-brand-amber animate-pulse" />
          </motion.span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-2.5 flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-3 group">
            <Logo className="h-12 sm:h-14 md:h-16" />
          </a>
          <div className="hidden sm:inline-flex">
            <OpenStatusBadge short />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-xs uppercase tracking-wider transition-all duration-200 ${
                link.active 
                  ? 'border border-[#b45309]/80 bg-[#3a1d09]/70 text-white font-semibold px-3.5 py-1.5 rounded' 
                  : 'text-white/80 hover:text-white font-medium px-3 py-1.5 hover:bg-white/5 rounded'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href={whatsappReservationUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-2 px-5 py-2 bg-[#c66a2b] hover:bg-[#b45d22] text-white text-xs font-bold uppercase tracking-wider rounded transition-all duration-300 shadow-md hover:scale-105"
          >
            RESERVAR
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#120a06]/95 backdrop-blur-md p-6 md:hidden flex flex-col gap-4 shadow-2xl border-b border-amber-900/30"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs uppercase font-bold text-white/40">Status do Bar</span>
              <OpenStatusBadge />
            </div>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider py-2 border-b border-white/10 hover:text-brand-amber transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href={whatsappReservationUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-[#c66a2b] text-white text-center font-black uppercase tracking-widest rounded-lg mt-2"
            >
              Reservar Agora
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const whatsappReservationUrl = "https://wa.me/5549999328763?text=Ol%C3%A1%21%20Gostaria%20de%20reservar%20uma%20mesa%20no%20Matriz%20Grill.";

  const destaquesHero = [
    {
      id: 1,
      badgeText: '1',
      title: 'HAMBÚRGUERES ARTESANAIS',
      subtitle: 'Suculentos & Feitos na Chapa',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop',
      href: '#cardapio'
    },
    {
      id: 2,
      badgeText: '2',
      title: 'TÁBUAS DE CARNES',
      subtitle: 'Alcatra, Mignon & Picanha na Chapa',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
      href: '#cardapio'
    },
    {
      id: 3,
      badgeText: '3',
      title: 'MÚSICA AO VIVO',
      subtitle: 'Shows, Artistas & Energia',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop',
      href: '#agenda'
    },
    {
      id: 4,
      badgeText: '4',
      title: 'DRINKS',
      subtitle: 'Clássicos, Gins & Caipirinhas',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=600&auto=format&fit=crop',
      href: '#cardapio'
    },
    {
      id: 5,
      badgeText: '5',
      title: 'CHOPP GELADO',
      subtitle: 'Trincando & Refrescante',
      image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=600&auto=format&fit=crop',
      href: '#cardapio'
    }
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-8 md:pt-32 md:pb-12">
      {/* Background Atmosphere Image with Warm Rustic Grading matching mockup */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop" 
          alt="Matriz Grill Ambiente Gastronômico" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#120a06]/85 via-[#180e08]/75 to-[#0e0704]/95" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-center">
        {/* Main Center Callout */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mt-2 sm:mt-6"
        >
          {/* Official Logo in Hero */}
          <div className="flex justify-center mb-3">
            <Logo className="h-24 sm:h-28 md:h-36 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" />
          </div>

          {/* Eyebrow Badge Destaque */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-amber/15 border border-brand-amber/40 text-brand-amber text-xs sm:text-sm font-black uppercase tracking-[0.22em] mb-4 shadow-lg backdrop-blur-sm">
            <Flame className="w-3.5 h-3.5 fill-brand-amber text-brand-amber animate-pulse" />
            A ESQUINA MAIS BADALADA DA CIDADE
            <Flame className="w-3.5 h-3.5 fill-brand-amber text-brand-amber animate-pulse" />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-white font-bold uppercase tracking-[0.06em] leading-[1.15] drop-shadow-md max-w-5xl mx-auto">
            EXPERIÊNCIA GASTRONÔMICA<br />
            E MÚSICA AO VIVO
          </h1>
          <p className="text-white/85 text-xs sm:text-sm md:text-[15px] font-light text-center max-w-2xl mx-auto mt-3 mb-6 leading-relaxed">
            A esquina mais badalada da cidade para carnes na chapa, burgers artesanais, drinks autorais e chopp trincando de gelado.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
            <a 
              href="#cardapio"
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-[#c66a2b] hover:bg-[#b45d22] text-white text-xs font-bold uppercase tracking-wider rounded shadow-lg shadow-black/40 hover:scale-105 transition-all duration-300"
            >
              VER NOSSO CARDÁPIO
            </a>
            <a 
              href={whatsappReservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-[#c66a2b] hover:bg-[#b45d22] text-white text-xs font-bold uppercase tracking-wider rounded shadow-lg shadow-black/40 flex items-center gap-2 hover:scale-105 transition-all duration-300"
            >
              RESERVAR VIA WHATSAPP
              <MessageCircle className="w-4 h-4 fill-current" />
            </a>
          </div>
        </motion.div>

        {/* NOSSOS DESTAQUES Row */}
        <div className="w-full">
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="font-serif text-sm sm:text-base md:text-lg uppercase tracking-[0.25em] text-white/95 font-semibold">
              NOSSOS DESTAQUES
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 max-w-6xl mx-auto">
            {destaquesHero.map((item) => (
              <a 
                key={item.id}
                href={item.href}
                className="group bg-[#0e0a07]/90 backdrop-blur-sm border border-[#3d2414] hover:border-[#c66a2b] rounded-lg overflow-hidden flex flex-col transition-all duration-300 shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                  <div className="absolute top-2 left-2 w-5 h-5 bg-[#d97706] text-black font-black text-[11px] flex items-center justify-center rounded-sm shadow-md z-10">
                    {item.badgeText}
                  </div>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-3 text-center flex flex-col items-center justify-between flex-1">
                  <div>
                    <h3 className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-white group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-white/60 font-light mt-0.5 mb-2">
                      {item.subtitle}
                    </p>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#d97706] group-hover:text-amber-300 border-b border-[#d97706]/40 pb-0.5 transition-colors">
                    SAIBA MAIS
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-8 sm:mt-10 flex flex-col items-center justify-center opacity-40 hover:opacity-100 transition-opacity"
        >
          <a href="#diferenciais" className="flex flex-col items-center gap-1.5 cursor-pointer group">
            <span className="text-[10px] tracking-[0.25em] uppercase text-white/70 font-semibold group-hover:text-brand-amber transition-colors">
              Explorar
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-brand-amber to-transparent" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const AuthorityMarquee = () => {
  const items = ["MÚSICA AO VIVO", "CHOPP GELADO", "VINHOS SELECIONADOS", "SOPAS & CALDOS", "HAMBÚRGUER ARTESANAL", "PORÇÕES INCRÍVEIS", "DRINKS EXCLUSIVOS", "MELHOR ESQUINA"];
  return (
    <div className="py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden whitespace-nowrap">
      <div className="flex animate-marquee">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-12 items-center px-6">
            {items.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="text-4xl md:text-6xl font-display opacity-10 uppercase tracking-tighter">{item}</span>
                <Star className="w-6 h-6 text-brand-red opacity-20" />
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const BentoGrid = () => {
  return (
    <section id="diferenciais" className="py-20 md:py-32 max-w-7xl mx-auto px-6">
      <div className="text-center mb-12 md:mb-20">
        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-4">A Experiência <span className="text-brand-red">Matriz Grill</span></h2>
        <p className="text-white/50 max-w-xl mx-auto text-sm md:text-base">Onde a tradição do grill encontra a energia da noite videirense.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        {/* Large Item */}
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="md:col-span-2 md:row-span-2 bento-item p-6 md:p-8 flex flex-col justify-end group min-h-[400px] md:min-h-0"
        >
          <img 
            src={musicaAoVivoImg} 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-80 group-hover:scale-110 transition-transform duration-700" 
            alt="Daniel Bonetto e Banda - Música ao Vivo"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Music className="text-brand-red w-10 h-10" />
              <span className="px-3 py-1 bg-brand-red text-[10px] font-bold uppercase tracking-widest rounded-full">Destaque da Semana</span>
            </div>
            <h3 className="text-3xl font-display uppercase mb-2">Daniel Bonetto e Banda</h3>
            <p className="text-white/80 font-medium mb-2">O melhor da música ao vivo, toda sexta-feira, com Daniel Bonetto e banda.</p>
            <div className="flex items-center gap-2 text-brand-wood font-bold text-sm uppercase tracking-widest">
              <Clock className="w-4 h-4" />
              Toda sexta-feira a partir das 20:30h
            </div>
          </div>
        </motion.div>

        {/* Medium Item */}
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 bento-item p-8 flex flex-col justify-center group"
        >
          <img 
            src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1200&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700" 
            alt="Burger"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10">
            <Utensils className="text-brand-wood w-8 h-8 mb-4" />
            <h3 className="text-2xl font-display uppercase mb-2">Hambúrguer Artesanal</h3>
            <p className="text-white/60">Blend exclusivo e ingredientes selecionados para um sabor inesquecível.</p>
          </div>
        </motion.div>

        {/* Small Item 1 */}
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bento-item p-8 flex flex-col justify-center text-center group overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1571767454098-246b94fbcf70?q=80&w=800&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" 
            alt="Chopp Gelado"
            referrerPolicy="no-referrer"
          />
          <div className="relative z-10">
            <Beer className="text-brand-red w-8 h-8 mx-auto mb-4" />
            <h3 className="text-xl font-display uppercase mb-1">Chopp Gelado</h3>
            <p className="text-xs text-white/50">Sempre na temperatura ideal.</p>
          </div>
        </motion.div>

        {/* Small Item 2 */}
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bento-item p-8 flex flex-col justify-center text-center group"
        >
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Rua+Padre+Anchieta+304+Matriz+Videira" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative z-10 block"
          >
            <MapPin className="text-brand-wood w-8 h-8 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-display uppercase mb-1">Localização</h3>
            <p className="text-xs text-white/50">Rua Padre Anchieta, 304</p>
            <span className="text-[10px] text-brand-red font-bold uppercase tracking-widest mt-2 block">Ver no Mapa</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

interface AgendaDay {
  day: string;
  shortDay: string;
  tag: string;
  title: string;
  desc: string;
  disclaimer: string;
  imageUrl: string;
  badge: string;
  accentColor: string;
  whatsappMsg: string;
  objectPosition?: string;
}

interface AgendaCardProps {
  key?: string;
  item: AgendaDay;
  i: number;
  total: number;
  progresso: MotionValue<number>;
  shouldReduceMotion: boolean | null;
}

const AgendaCard = ({ item, i, total, progresso, shouldReduceMotion }: AgendaCardProps) => {
  const fim = (i + 1) / total;
  const sobrando = total - 1 - i;
  const escala = useTransform(progresso, [fim, 1], [1, 1 - sobrando * 0.035]);
  const veu = useTransform(progresso, [fim, 1], [0, sobrando ? 0.62 : 0]);

  return (
    <motion.div
      style={{
        scale: shouldReduceMotion ? 1 : escala,
        zIndex: i + 1,
      }}
      className={`origin-top ${
        shouldReduceMotion
          ? "relative h-auto mb-8 md:mb-12 rounded-3xl md:rounded-[2.5rem] bg-[#0c0c0e] border border-white/10 p-6 md:p-12 overflow-hidden shadow-2xl"
          : "sticky top-0 h-[88svh] rounded-3xl md:rounded-[2.5rem] bg-[#0c0c0e] border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-center p-6 md:p-12"
      }`}
    >
      {/* Dimming veil for stacking cards effect */}
      {!shouldReduceMotion && (
        <motion.div
          style={{ opacity: veu }}
          className="absolute inset-0 bg-[#050505] pointer-events-none z-20 rounded-3xl md:rounded-[2.5rem]"
        />
      )}

      {/* Atmospheric subtle glow matching the day's theme */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.accentColor || 'from-amber-500/20 to-brand-amber/40'} opacity-25 pointer-events-none`} />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 items-center w-full">
        {/* Promotion Poster Image: hidden on mobile, displayed on desktop/tablet */}
        <div className="hidden md:block md:col-span-5 relative group overflow-hidden rounded-2xl border border-white/10 aspect-video md:aspect-square">
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${item.objectPosition || 'object-center'}`}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 bg-brand-red text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md shadow-md">
            {item.badge}
          </div>
        </div>

        {/* Text Information */}
        <div className="md:col-span-7 flex flex-col justify-center text-left">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3.5 py-1.5 rounded-full bg-brand-amber text-black font-black tracking-wider text-[11px] uppercase shadow-md shadow-brand-amber/10">
              {item.day}
            </span>
            <span className="text-brand-amber font-black tracking-[0.2em] text-[10px] uppercase">
              {item.tag}
            </span>
            <span className="md:hidden px-2.5 py-1 rounded-md bg-brand-red text-white text-[9px] font-black uppercase tracking-widest">
              {item.badge}
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white mb-3 md:mb-4">
            {item.title}
          </h3>

          <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed mb-4 md:mb-6">
            {item.desc}
          </p>
          
          <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/5 mb-4 md:mb-6 flex items-start gap-3">
            <Clock className="w-5 h-5 text-brand-amber shrink-0 mt-0.5" />
            <span className="text-xs text-white/50 leading-relaxed font-light">
              <span className="font-bold text-white uppercase block mb-0.5">Regras e Detalhes:</span>
              {item.disclaimer}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`https://wa.me/5549999328763?text=${item.whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 sm:py-4 bg-brand-amber hover:bg-brand-amber/90 text-black font-black uppercase tracking-widest text-xs rounded-full flex items-center justify-center gap-2 shadow-lg shadow-brand-amber/10"
            >
              <Phone className="w-4 h-4 fill-black" />
              Reservar para {item.shortDay}
            </motion.a>
            <a
              href="https://www.instagram.com/matrizgrill.videira/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 sm:py-4 border border-white/10 hover:border-brand-amber text-white font-bold uppercase tracking-widest text-xs rounded-full flex items-center justify-center gap-2 transition-colors"
            >
              <Instagram className="w-4 h-4 text-brand-amber" />
              Ver Programação Completa
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AgendaSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const shouldReduceMotion = useReducedMotion();

  const agendaDays = [
    {
      day: 'Quarta-feira',
      shortDay: 'Quarta',
      tag: 'PROMOÇÃO DE TÁBUAS',
      title: 'Pede a inteira e paga a meia da casa!',
      desc: 'Nossas lendárias tábuas de carne de alto padrão (Alcatra, Filé Mignon ou Picanha) com um desconto imbatível que serve toda a mesa. Perfeito para reunir os amigos ou a família no meio da semana.',
      disclaimer: 'Válido apenas para consumo presencial (no local). Serve de 3 a 4 pessoas fartamente.',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      badge: 'PROMOÇÃO HISTÓRICA',
      accentColor: 'from-amber-500/20 to-brand-amber/40',
      whatsappMsg: 'Ol%C3%A1%21%20Quero%20reservar%20uma%20mesa%20para%20a%20Quarta%20das%20T%C3%A1buas%20%28Pede%20a%20Inteira%2C%20Paga%20a%20Meia%21%29'
    },
    {
      day: 'Quinta-feira',
      shortDay: 'Quinta',
      tag: 'QUINTA BURGER',
      title: '30% OFF em Hambúrgueres Artesanais!',
      desc: 'Os melhores blends artesanais feitos na chapa com um desconto de 30% para você saborear. Pão selado, maionese artesanal e ingredientes frescos de verdade.',
      disclaimer: 'Exceto X-Burger, Burger Cordeiro, Burger Mignon e Burger Vegetariano. Válido apenas para consumo presencial no local.',
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
      badge: '30% DE DESCONTO',
      accentColor: 'from-orange-500/20 to-brand-orange/40',
      whatsappMsg: 'Ol%C3%A1%21%20Gostaria%20de%20reservar%20uma%20mesa%20para%20curtir%20a%20Quinta%20Burger%20com%2030%25%20OFF%21'
    },
    {
      day: 'Sexta-feira (18/09)',
      shortDay: 'Sexta',
      tag: 'MÚSICA AO VIVO',
      title: 'Sexta com Daniel Bonetto e Banda',
      desc: 'Sua sexta-feira com a melhor energia musical de Videira! Um show sensacional com Daniel Bonetto e banda para embalar a noite com muito sertanejo, sucessos e animação.',
      disclaimer: 'Música ao vivo a partir das 20h30 nesta sexta-feira (18/09). Entrada e couvert gratuitos! Guardamos mesas reservadas até as 20h45.',
      imageUrl: musicaAoVivoImg,
      objectPosition: 'object-center',
      badge: 'SHOW AO VIVO - 20:30h',
      accentColor: 'from-brand-red/20 to-brand-red/40',
      whatsappMsg: 'Ol%C3%A1%21%20Gostaria%20de%20reservar%20uma%20mesa%20para%20o%20show%20de%20Sexta-feira%20%2818%2F09%29%20com%20Daniel%20Bonetto%20e%20Banda%21'
    },
    {
      day: '11/10 (Domingo - Véspera de Feriado)',
      shortDay: '11/10 Especial',
      tag: 'SHOW ESPECIAL • VÉSPERA DE FERIADO',
      title: 'Domingo com Léo, Zimmer e Banda',
      desc: 'Super evento de véspera de feriado no Matriz Grill! Show imperdível com Léo, Zimmer e banda ao vivo a partir das 20:30h. Chopp trincando de gelado, porções na chapa e a esquina mais animada da cidade.',
      disclaimer: 'Data especial: 11 de Outubro (Domingo - Véspera de Feriado) a partir das 20:30h. Mesas com lugares limitados — garanta sua reserva com antecedência!',
      imageUrl: eventoLeoZimmerImg,
      objectPosition: 'object-center',
      badge: '11/10 • VÉSPERA DE FERIADO - 20:30h',
      accentColor: 'from-amber-600/20 to-brand-red/40',
      whatsappMsg: 'Ol%C3%A1%21%20Gostaria%20de%20garantir%20minha%20reserva%20para%20o%20Show%20Especial%20de%20V%C3%A9spera%20de%20Feriado%20%2811%2F10%29%20com%20L%C3%A9o%2C%20Zimmer%20e%20Banda%21'
    },
    {
      day: 'Eventos & Celebrações',
      shortDay: 'Eventos',
      tag: 'ANIVERSÁRIOS, EVENTOS E PARCERIAS',
      title: 'Comemore seus Momentos no Matriz Grill',
      desc: 'Venha comemorar seu aniversário, organizar seu evento corporativo, confraternização ou fechar parcerias especiais! Nosso espaço na esquina mais famosa de Videira está de portas abertas para quem quiser reunir amigos, familiares e clientes para viver momentos inesquecíveis.',
      disclaimer: 'Reservas de mesas para comemorações ou reservas exclusivas do espaço são feitas mediante consulta antecipada via WhatsApp.',
      imageUrl: galeriaEncontroImg,
      badge: 'ESPAÇO PARA EVENTOS',
      accentColor: 'from-yellow-600/20 to-yellow-500/40',
      whatsappMsg: 'Ol%C3%A1%21%20Gostaria%20de%20consultar%20informa%C3%A7%C3%B5es%20e%20reservar%20o%20espa%C3%A7o%20para%20meu%20evento%2Fanivers%C3%A1rio%20no%20Matriz%20Grill%21'
    }
  ];

  return (
    <section id="agenda" className="py-20 md:py-32 bg-gradient-to-b from-transparent via-black/40 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-brand-amber font-bold uppercase tracking-widest text-xs mb-3 block">Rotina da Esquina</span>
          <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-4">Agenda da <span className="text-brand-amber italic">Semana</span></h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm md:text-base font-light">As promoções e atrações que tornam o Matriz Grill o ponto de encontro preferido de Videira.</p>
        </div>

        {/* Stacking Cards Container */}
        <div ref={containerRef} className="relative">
          {agendaDays.map((item, index) => (
            <AgendaCard
              key={item.shortDay}
              item={item}
              i={index}
              total={agendaDays.length}
              progresso={scrollYProgress}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};



const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('Porções');
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const menuTabContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (menuTabContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = menuTabContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = menuTabContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      // Wait slightly for layout to settle, then check
      setTimeout(checkScroll, 150);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (menuTabContainerRef.current) {
      const amount = 160;
      menuTabContainerRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth'
      });
    }
  };

  const menuData = {
    'Porções': [
      { name: 'Batata Frita Tradicional 400g', price: 'R$ 30,00', desc: 'Batata palito crocante e sequinha, servida com nossa maionese especial da casa.', image: 'https://images.unsplash.com/photo-1630384066272-17124ff89910?q=80&w=400&auto=format&fit=crop' },
      { name: 'Batata Cheddar e Bacon', price: 'R$ 40,00', desc: 'Batata canoa frita, coberta com creme cheddar cremoso e pedacinhos crocantes de bacon.', image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=400&auto=format&fit=crop' },
      { name: 'Entrevero de Luxo da Casa', price: 'R$ 62,00', desc: 'Combinação na chapa de Alcatra, frango, calabresa defumada, pimentões coloridos e cebola.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop' },
      { name: 'Iscas de Tilápia com Fritas', price: 'R$ 54,00', desc: 'Filé de tilápia empanado super crocante, acompanhado de batata frita e molho tártaro.', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400&auto=format&fit=crop' },
      { name: 'Dadinhos de Tapioca (10 un.)', price: 'R$ 32,00', desc: 'Cubinhos fritos de tapioca com queijo coalho, servidos com geleia de pimenta doce.', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=400&auto=format&fit=crop' }
    ],
    'Hambúrgueres': [
      { name: 'Matriz Burger', price: 'R$ 46,00', desc: 'Pão brioche, blend artesanal 150g, queijo cheddar, bacon, alface, tomate e maionese da casa. Acompanha batata frita.', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=400&auto=format&fit=crop', promo: '30% OFF QUINTA' },
      { name: 'Super Chef Burger', price: 'R$ 47,00', desc: 'Pão australiano, blend 150g, queijo provolone derretido, cebola caramelizada e maionese defumada. Acompanha batata canoa.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop', promo: '30% OFF QUINTA' },
      { name: 'Burger Cheddar Especial', price: 'R$ 40,00', desc: 'Pão brioche, blend 150g, muito cheddar cremoso e cebola caramelizada no shoyu. Acompanha batata palito.', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=400&auto=format&fit=crop', promo: '30% OFF QUINTA' },
      { name: 'Burger Picanha Premium', price: 'R$ 43,00', desc: 'Pão brioche, suculento blend de picanha 180g, queijo prato, cebola roxa grelhada e molho barbecue.', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400&auto=format&fit=crop', promo: '30% OFF QUINTA' }
    ],
    'Tábuas de Carne': [
      { name: 'Tábua Alcatra (Inteira)', price: 'R$ 120,00', desc: 'Alcatra grelhada na chapa fatiada. Acompanha batata frita, pão de alho, farofa especial, cebola grelhada e maionese.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop', promo: 'MEIA NA QUARTA' },
      { name: 'Tábua Filé Mignon (Inteira)', price: 'R$ 145,00', desc: 'Filé Mignon super macio grelhado na chapa. Acompanha batata frita, pão de alho, farofa especial, cebola grelhada e maionese.', image: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=400&auto=format&fit=crop', promo: 'MEIA NA QUARTA' },
      { name: 'Tábua Picanha (Inteira)', price: 'R$ 155,00', desc: 'Picanha fatiada premium grelhada no ponto certo. Acompanha batata frita, pão de alho, farofa, cebola e maionese.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop', promo: 'MEIA NA QUARTA' }
    ],
    'Drinks': [
      { name: 'Lagoa Azul', price: 'R$ 24,00', desc: 'Vodka selecionada, Curaçau Blue, suco de limão espremido na hora e soda refrescante.', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=400&auto=format&fit=crop' },
      { name: 'Drink Avatar', price: 'R$ 28,00', desc: 'Nossa receita secreta e exclusiva da casa, com cores vibrantes e sabor tropical refrescante.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&auto=format&fit=crop' },
      { name: 'Gin Tropical Premium', price: 'R$ 31,00', desc: 'Gin Tanqueray, tônica premium, fatias de maracujá e infusão de frutas amarelas.', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop' },
      { name: 'Negroni Clássico', price: 'R$ 32,00', desc: 'Campari, Gin Gin, Vermute tinto e um toque clássico de casca de laranja.', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=400&auto=format&fit=crop' }
    ],
    'Chopp & Cervejas': [
      { name: 'Caneca de Chopp 340ml', price: 'R$ 15,00', desc: 'O clássico chopp trincando de gelado, servido na caneca congelada.', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=400&auto=format&fit=crop' },
      { name: 'Cerveja Heineken 600ml', price: 'R$ 20,00', desc: 'A cerveja premium puro malte holandesa mais pedida do mundo.', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=400&auto=format&fit=crop' },
      { name: 'Antarctica Original 600ml', price: 'R$ 19,00', desc: 'A cerveja tradicional brasileira, extremamente leve, gelada e equilibrada.', image: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?q=80&w=400&auto=format&fit=crop' }
    ],
    'Vinhos': [
      { name: 'Vinho Cabernet Sauvignon (Taça)', price: 'R$ 18,00', desc: 'Taça de vinho tinto seco encorpado, perfeito para harmonizar com nossas tábuas de carne.', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=400&auto=format&fit=crop' },
      { name: 'Vinho Merlot Nacional (Garrafa)', price: 'R$ 78,00', desc: 'Garrafa de vinho tinto fino de excelente qualidade, frutado, macio e encorpado.', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=400&auto=format&fit=crop' }
    ]
  };

  const fullMenuData = {
    'Porções': [
      { name: 'Batata Frita Tradicional 400g', price: 'R$ 30,00', desc: 'Batata palito crocante e sequinha, servida com nossa maionese especial da casa.', image: 'https://images.unsplash.com/photo-1630384066272-17124ff89910?q=80&w=400&auto=format&fit=crop' },
      { name: 'Batata Frita Cheddar e Bacon', price: 'R$ 40,00', desc: 'Batata canoa crocante coberta com cheddar cremoso e bacon frito bem crocante.', image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=400&auto=format&fit=crop' },
      { name: 'Raquete de Frango e Fritas', price: 'R$ 42,00', desc: 'Frango empanado suculento com batata palito crocante e molho tártaro.', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop' },
      { name: 'Raquete de Frango e Polenta', price: 'R$ 42,00', desc: 'Frango empanado crocante servido com polenta palito frita e maionese.', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop' },
      { name: 'Dadinhos de Tapioca', price: 'R$ 32,00', desc: 'Cubos fritos de tapioca com queijo coalho e geleia de pimenta da casa.', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=400&auto=format&fit=crop' },
      { name: 'Frango Empanado com Queijo', price: 'R$ 48,00', desc: 'Tiras de frango super crocantes cobertas com queijo mussarela derretido e ervas.', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop' },
      { name: 'Polenta Frita Crocante 400g', price: 'R$ 29,00', desc: 'Polenta palito frita por fora e macia por dentro, finalizada com queijo parmesão ralado.', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop' },
      { name: 'Entrevero de Luxo da Casa', price: 'R$ 62,00', desc: 'Alcatra, frango grelhado, calabresa defumada, pimentões e cebola na chapa.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop' },
      { name: 'Iscas de Tilápia com Fritas', price: 'R$ 54,00', desc: 'Filé de tilápia empanado super crocante, acompanhado de batatas fritas.', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400&auto=format&fit=crop' },
      { name: 'Iscas de Tilápia com Polenta', price: 'R$ 50,00', desc: 'Filés de tilápia crocantes servidos com polenta frita.', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400&auto=format&fit=crop' },
      { name: 'Mandioquinha Frita com Queijo', price: 'R$ 29,00', desc: 'Delicioso bolinho de mandioca frita com recheio cremoso de queijo coalho.', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=400&auto=format&fit=crop' },
      { name: 'Linguiça Campeira na Chapa 500g', price: 'R$ 47,00', desc: 'Linguiça de costela servida na chapa com farofa crocante e mostarda.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop' }
    ],
    'Petiscos': [
      { name: 'Frango Acebolado com Fritas', price: 'R$ 48,00', desc: 'Iscas de peito de frango aceboladas na chapa com porção generosa de batatas fritas.', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop' },
      { name: 'Bolinho de Feijoada (8 un.)', price: 'R$ 36,00', desc: 'Bolinho com massa de feijoada recheado com couve refogada e bacon, servido com gomos de laranja.', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=400&auto=format&fit=crop' },
      { name: 'Bolinho de Bacalhau (6 un.)', price: 'R$ 29,00', desc: 'Clássicos bolinhos dourados feitos com legítimo bacalhau e tempero verde fresco.', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400&auto=format&fit=crop' },
      { name: 'Palitos de Mussarela Grelhados (10 un.)', price: 'R$ 36,00', desc: 'Bastões de queijo mussarela empanados e fritos, extremamente crocantes e derretidos.', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=400&auto=format&fit=crop' },
      { name: 'Onion Rings Crocantes 400g', price: 'R$ 34,00', desc: 'Anéis de cebola gigantes empanados em farinha panko, fritos e sequinhos.', image: 'https://images.unsplash.com/photo-1639146504205-53303911c7d1?q=80&w=400&auto=format&fit=crop' },
      { name: 'Coxinha de Frango com Catupiry (6 un.)', price: 'R$ 23,00', desc: 'Massa cremosa de batata recheada com frango desfiado e catupiry original.', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=400&auto=format&fit=crop' },
      { name: 'Tábua de Frios Completa', price: 'R$ 57,00', desc: 'Salaminho italiano, queijo provolone, palmito premium, azeitonas chilenas e pepino.', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=400&auto=format&fit=crop' },
      { name: 'Sopa de Agnoline Tradicional', price: 'R$ 26,00', desc: 'Tradicional sopa com massa recheada de carne e caldo concentrado de galinha caipira.', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=400&auto=format&fit=crop' }
    ],
    'Tábuas de Carne': [
      { name: 'Tábua Alcatra (Meia)', price: 'R$ 85,00', desc: 'Alcatra grelhada na chapa. Acompanha batata frita, pão de alho, farofa especial e maionese.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop' },
      { name: 'Tábua Alcatra (Inteira)', price: 'R$ 120,00', desc: 'Alcatra inteira grelhada na chapa. Acompanha batata frita, pão de alho, farofa especial, cebola grelhada e maionese. (Pede a inteira e paga meia na Quarta-feira!)', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop', promo: 'MEIA NA QUARTA' },
      { name: 'Tábua Filé Mignon (Meia)', price: 'R$ 100,00', desc: 'Filé Mignon grelhado na chapa. Acompanha batata frita, pão de alho, farofa e maionese.', image: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=400&auto=format&fit=crop' },
      { name: 'Tábua Filé Mignon (Inteira)', price: 'R$ 145,00', desc: 'Filé Mignon inteiro na chapa. Acompanha batata frita, pão de alho, farofa, cebola grelhada e maionese. (Pede a inteira e paga meia na Quarta-feira!)', image: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=400&auto=format&fit=crop', promo: 'MEIA NA QUARTA' },
      { name: 'Tábua Picanha (Meia)', price: 'R$ 105,00', desc: 'Picanha fatiada premium na chapa. Acompanha batata frita, pão de alho, farofa e maionese.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop' },
      { name: 'Tábua Picanha (Inteira)', price: 'R$ 155,00', desc: 'Picanha inteira premium na chapa. Acompanha batata frita, pão de alho, farofa, cebola e maionese. (Pede a inteira e paga meia na Quarta-feira!)', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop', promo: 'MEIA NA QUARTA' }
    ],
    'Hambúrgueres': [
      { name: 'X-Burger Clássico', price: 'R$ 20,00', desc: 'Pão brioche, hambúrguer 100g smash, queijo prato derretido e maionese da casa. Acompanha batata.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop' },
      { name: 'Super Chef Burger', price: 'R$ 47,00', desc: 'Pão australiano, suculento blend 150g grelhado, queijo provolone derretido, cebola caramelizada e maionese defumada. Acompanha batata canoa.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop', promo: '30% OFF QUINTA' },
      { name: 'Burger Cheddar Especial', price: 'R$ 40,00', desc: 'Pão brioche, blend 150g, muito creme cheddar cremoso e cebola caramelizada no shoyu. Acompanha batata palito.', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=400&auto=format&fit=crop', promo: '30% OFF QUINTA' },
      { name: 'Burger Picanha Premium', price: 'R$ 43,00', desc: 'Pão brioche, suculento blend de picanha 180g, queijo prato, cebola roxa grelhada e molho barbecue.', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400&auto=format&fit=crop', promo: '30% OFF QUINTA' },
      { name: 'Cordeiro Burger Gourmet', price: 'R$ 48,00', desc: 'Pão brioche, exclusivo blend de carne de cordeiro 150g, queijo coalho, hortelã fresca e molho maionese especial.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop' },
      { name: 'Burger Mignon Supreme', price: 'R$ 44,00', desc: 'Pão de brioche, suculento blend de filé mignon 150g, mussarela dupla, bacon artesanal e molho especial.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop' },
      { name: 'Big Frango Burger', price: 'R$ 35,00', desc: 'Pão de brioche, hambúrguer de frango empanado crocante 150g, alface, tomate e maionese verde.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop', promo: '30% OFF QUINTA' },
      { name: 'Burger El México (Picante)', price: 'R$ 40,00', desc: 'Pão de brioche, blend 150g, queijo prato, pimenta jalapeño fatiada, nachos moídos e guacamole.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop', promo: '30% OFF QUINTA' },
      { name: 'Onion Burger Crocante', price: 'R$ 40,00', desc: 'Pão de brioche, blend 150g, queijo cheddar, anéis de cebola empanados crocantes e molho barbecue.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop', promo: '30% OFF QUINTA' },
      { name: 'Burger Vegetariano da Casa', price: 'R$ 40,00', desc: 'Pão brioche, hambúrguer de grão de bico 150g, queijo prato, alface, tomate, picles e maionese de ervas.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop' },
      { name: 'Egg Burger Clássico', price: 'R$ 39,00', desc: 'Pão brioche, blend 150g, ovo frito com gema mole, queijo cheddar derretido e bacon artesanal.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop', promo: '30% OFF QUINTA' },
      { name: 'Matriz Burger Gigante', price: 'R$ 46,00', desc: 'Nosso clássico campeão de vendas, pão brioche, blend 150g, queijo cheddar, bacon artesanal, alface e tomate. Acompanha fritas.', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=400&auto=format&fit=crop', promo: '30% OFF QUINTA' }
    ],
    'Drinks': [
      { name: 'Lagoa Azul', price: 'R$ 24,00', desc: 'Vodka selecionada, Curaçau Blue, suco de limão e soda refrescante.', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=400&auto=format&fit=crop' },
      { name: 'Green Mint', price: 'R$ 24,00', desc: 'Vodka, licor de menta verde, suco de limão, hortelã e soda refrescante.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&auto=format&fit=crop' },
      { name: 'Drink Avatar', price: 'R$ 28,00', desc: 'Nossa receita exclusiva secreta da casa. Drink azulado, frutado, cítrico e misterioso.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&auto=format&fit=crop' },
      { name: 'Piña Colada', price: 'R$ 28,00', desc: 'Rum branco premium, leite de coco cremoso, suco de abacaxi fresco e leite condensado.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&auto=format&fit=crop' },
      { name: 'Bob Marley (Tricolor)', price: 'R$ 26,00', desc: 'Lindo e saboroso drink em camadas com rum, xarope de romã, suco de laranja e licor de menta.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&auto=format&fit=crop' },
      { name: 'Sex on the Beach', price: 'R$ 24,00', desc: 'Vodka, licor de pêssego, suco de laranja e xarope de groselha doce no fundo.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&auto=format&fit=crop' },
      { name: 'Gin Tônica Clássico', price: 'R$ 27,00', desc: 'Gin Tanqueray, água tônica premium e rodelas aromáticas de limão siciliano.', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop' },
      { name: 'Gin Tropical Premium', price: 'R$ 31,00', desc: 'Gin Tanqueray, água tônica, maracujá fresco, laranja e xarope de frutas tropicais.', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop' },
      { name: 'Gin Red Fruits', price: 'R$ 28,00', desc: 'Gin Tanqueray, água tônica premium, infusão de morango, amora e framboesa silvestre.', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop' },
      { name: 'Aperol Spritz Orange', price: 'R$ 28,00', desc: 'Aperol, espumante Prosecco, água com gás gaseificada e rodela fresca de laranja.', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop' },
      { name: 'Negroni Clássico', price: 'R$ 32,00', desc: 'A combinação italiana clássica e equilibrada de Campari, Gin e Vermute Tinto doce.', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=400&auto=format&fit=crop' }
    ],
    'Cervejas': [
      { name: 'Caneca de Chopp 340ml', price: 'R$ 15,00', desc: 'Nosso famoso chopp artesanal trincando de gelado na caneca congelada.', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=400&auto=format&fit=crop' },
      { name: 'Cerveja Sol Long Neck', price: 'R$ 12,00', desc: 'Cerveja clara lager mexicana leve, refrescante e perfeita para noites quentes.', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=400&auto=format&fit=crop' },
      { name: 'Estrela Galicia Long Neck', price: 'R$ 13,00', desc: 'Premium lager espanhola puro malte com amargor suave e refrescante.', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=400&auto=format&fit=crop' },
      { name: 'Cerveja Heineken Long Neck', price: 'R$ 13,00', desc: 'Tradicional lager puro malte com sua receita consagrada.', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=400&auto=format&fit=crop' },
      { name: 'Cerveja Terezópolis 500ml', price: 'R$ 10,00', desc: 'Cerveja artesanal estilo Gold Lager, extremamente saborosa e encorpada.', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=400&auto=format&fit=crop' },
      { name: 'Heineken 600ml', price: 'R$ 20,00', desc: 'Cerveja premium em garrafa de 600ml perfeita para compartilhar na mesa.', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=400&auto=format&fit=crop' },
      { name: 'Antarctica Original 600ml', price: 'R$ 19,00', desc: 'Clássica cerveja pilsen brasileira servida estupidamente gelada na mesa.', image: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?q=80&w=400&auto=format&fit=crop' }
    ],
    'Sobremesas': [
      { name: 'Mini Churros com Doce de Leite', price: 'R$ 18,00', desc: 'Mini porção de churros fritos sequinhos recheados e servidos com doce de leite cremoso.', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=400&auto=format&fit=crop' },
      { name: 'Petit Gateau de Chocolate', price: 'R$ 21,00', desc: 'Bolinho quente de chocolate com recheio cremoso and derretido, servido com sorvete de creme.', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=400&auto=format&fit=crop' },
      { name: 'Brownie Especial com Sorvete', price: 'R$ 19,00', desc: 'Fatia generosa de brownie de chocolate com castanhas, servido quente com sorvete de creme.', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=400&auto=format&fit=crop' }
    ],
    'Vinhos': [
      { name: 'Vinho Cabernet Sauvignon (Taça)', price: 'R$ 18,00', desc: 'Taça de vinho tinto seco encorpado de uvas selecionadas, ideal para acompanhar nossas saborosas tábuas de carne.', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=400&auto=format&fit=crop' },
      { name: 'Vinho Cabernet Sauvignon (Garrafa)', price: 'R$ 78,00', desc: 'Garrafa de vinho tinto encorpado de uvas selecionadas, para compartilhar e celebrar no melhor ambiente da cidade.', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=400&auto=format&fit=crop' },
      { name: 'Vinho Merlot Nacional (Garrafa)', price: 'R$ 85,00', desc: 'Garrafa de vinho tinto seco, macio e aveludado, com excelentes notas frutadas que harmonizam com nossos hambúrgueres artesanais.', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=400&auto=format&fit=crop' }
    ]
  };

  return (
    <section id="cardapio" className="py-20 md:py-32 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div>
            <span className="text-brand-amber font-bold uppercase tracking-widest text-xs mb-2 block">Destaques da Casa</span>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter">Sabor em <span className="italic text-brand-wood">cada detalhe</span></h2>
          </div>
          <div className="relative flex items-center w-full md:w-auto">
            {showLeftArrow && (
              <button 
                onClick={() => scrollTabs('left')}
                className="absolute left-2 z-10 p-1.5 rounded-full bg-black/90 border border-white/10 text-brand-amber hover:bg-brand-amber hover:text-black transition-all shadow-lg cursor-pointer"
                aria-label="Rolar para esquerda"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            <div 
              ref={menuTabContainerRef}
              className="flex gap-2 overflow-x-auto no-scrollbar pb-2 w-full md:w-auto -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth"
            >
              {Object.keys(menuData).map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-brand-amber text-black shadow-md shadow-brand-amber/10' : 'glass text-white/50 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {showRightArrow && (
              <button 
                onClick={() => scrollTabs('right')}
                className="absolute right-2 z-10 p-1.5 rounded-full bg-black/90 border border-white/10 text-brand-amber hover:bg-brand-amber hover:text-black transition-all shadow-lg cursor-pointer"
                aria-label="Rolar para direita"
              >
                <ChevronRight className="w-4 h-4 animate-pulse" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 md:gap-y-6">
          <AnimatePresence mode="wait">
            {menuData[activeCategory as keyof typeof menuData].map((item, idx) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ delay: idx * 0.05 }}
                className="group flex gap-4 items-center py-4 border-b border-white/5 hover:border-brand-amber/30 transition-colors"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0 border border-white/10 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  {('promo' in item) && (
                    <div className="absolute bottom-1 left-1 bg-brand-red text-white text-[7px] font-black uppercase px-1 py-0.5 rounded">
                      PROMO
                    </div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-base md:text-lg font-display uppercase group-hover:text-brand-amber transition-colors leading-tight">{item.name}</h4>
                    {('promo' in item) && (
                      <span className="text-[8px] bg-brand-amber/10 text-brand-amber border border-brand-amber/20 font-black tracking-widest px-1.5 py-0.5 rounded">
                        {item.promo}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/50 font-light mt-1 line-clamp-2 md:line-clamp-none">{item.desc}</p>
                </div>
                <div className="text-brand-amber font-black text-sm md:text-base whitespace-nowrap">{item.price}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={() => setIsFullMenuOpen(true)}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white hover:text-brand-amber transition-colors uppercase text-xs font-black tracking-widest"
          >
            Ver cardápio completo <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Full Menu Modal */}
      <AnimatePresence>
        {isFullMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsFullMenuOpen(false)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-5xl h-full max-h-[85vh] bg-bg-dark border border-white/10 rounded-3xl overflow-hidden flex flex-col"
            >
              <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center bg-bg-dark/50 backdrop-blur-md sticky top-0 z-10">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tighter text-white">Cardápio <span className="text-brand-amber italic">Completo</span></h3>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Matriz Grill Videira</p>
                </div>
                <button 
                  onClick={() => setIsFullMenuOpen(false)}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-brand-red transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 md:p-10 no-scrollbar">
                {Object.entries(fullMenuData).map(([category, items]) => (
                  <div key={category} className="mb-12">
                    <h4 className="text-brand-amber font-display text-lg md:text-xl uppercase tracking-widest mb-6 border-l-4 border-brand-amber pl-4">{category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                      {items.map((item) => (
                        <div key={item.name} className="flex gap-4 items-center py-3 border-b border-white/5 group text-left">
                          <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-white/10 relative">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            {('promo' in item) && (
                              <div className="absolute bottom-0.5 left-0.5 bg-brand-red text-white text-[6px] font-black uppercase px-1 py-0.5 rounded">
                                PROMO
                              </div>
                            )}
                          </div>
                          <div className="flex-1 pr-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h5 className="text-sm md:text-base font-display uppercase group-hover:text-brand-amber transition-colors">{item.name}</h5>
                              {('promo' in item) && (
                                <span className="text-[7px] bg-brand-amber/10 text-brand-amber border border-brand-amber/20 font-black tracking-widest px-1 py-0.5 rounded">
                                  {item.promo}
                                </span>
                              )}
                            </div>
                            {item.desc && <p className="text-xs text-white/40 font-light mt-0.5 leading-tight">{item.desc}</p>}
                          </div>
                          <div className="text-brand-amber font-black text-sm whitespace-nowrap">{item.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 md:p-8 border-t border-white/10 text-center bg-bg-dark/80 backdrop-blur-md">
                <p className="text-white/40 text-[9px] uppercase tracking-[0.2em] mb-4">Aviso: Preços sujeitos a alteração sem aviso prévio.</p>
                <a 
                  href="#delivery" 
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-amber hover:bg-brand-gold text-black font-black uppercase tracking-widest text-xs rounded-full shadow-lg shadow-brand-amber/10 transition-transform hover:scale-105"
                >
                  Fazer Pedido no AiPede <ShoppingBag className="w-4 h-4 fill-black" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Ricardo Silva", text: "Melhor lugar de Videira! O entrevero é sensacional e a música sempre de primeira.", rating: 5 },
    { name: "Juliana Costa", text: "Ambiente super agradável, drinks muito bem feitos e o atendimento é nota 10.", rating: 5 },
    { name: "Marcos Oliveira", text: "A esquina mais movimentada por um motivo: tudo lá é bom. O chopp tá sempre trincando!", rating: 5 },
  ];

  return (
    <section className="py-20 md:py-32 max-w-7xl mx-auto px-6">
      <div className="text-center mb-12 md:mb-20">
        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-4">O que dizem <span className="text-brand-wood">nossos clientes</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, i) => (
          <motion.div 
            key={i}
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass p-10 rounded-3xl relative"
          >
            <div className="flex gap-1 mb-6">
              {[...Array(review.rating)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-brand-amber text-brand-amber" />)}
            </div>
            <p className="text-lg text-white/70 italic mb-8">"{review.text}"</p>
            <div className="font-display uppercase tracking-widest text-sm">{review.name}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer id="contato" className="pt-24 pb-12 bg-black relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          {/* Info Columns (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-10 text-left">
            <div className="sm:col-span-2">
              <a href="#" className="flex items-center gap-2 mb-6">
                <Logo />
              </a>
              <p className="text-white/60 max-w-md text-base font-light leading-relaxed">
                Situada no coração da cidade, sendo a esquina mais badalada da região. 
                O ponto de encontro oficial de Videira.
              </p>
            </div>

            <div>
              <h4 className="font-display uppercase tracking-widest text-sm mb-4 text-brand-amber">Onde Estamos</h4>
              <ul className="space-y-3 text-white/70 text-sm">
                <li className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 text-brand-amber shrink-0 mt-0.5" />
                  <span>Rua Padre Anchieta 304, Matriz<br />Videira, SC - 89560-000</span>
                </li>
                <li className="flex gap-3 items-center">
                  <Phone className="w-5 h-5 text-brand-amber shrink-0" />
                  <a href="https://wa.me/5549999328763" target="_blank" rel="noopener noreferrer" className="hover:text-brand-amber transition-colors">
                    (49) 99932-8763
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display uppercase tracking-widest text-sm mb-4 text-brand-amber">Horários</h4>
              <ul className="space-y-3 text-white/70 text-sm">
                <li className="flex flex-col gap-0.5">
                  <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Terça a Domingo</span>
                  <span className="text-white/90">17:00h às 22:30h</span>
                </li>
                <li className="flex flex-col gap-0.5">
                  <span className="text-brand-amber text-[10px] uppercase font-bold tracking-widest">Sextas (Música ao Vivo)</span>
                  <span className="text-white/90 font-bold">A partir das 20:30h</span>
                </li>
              </ul>
            </div>

            <div className="sm:col-span-2">
              <h4 className="font-display uppercase tracking-widest text-sm mb-4 text-brand-amber">Siga-nos</h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/matrizgrill.videira/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 glass rounded-full flex items-center justify-center hover:bg-brand-amber hover:text-black transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://wa.me/5549999328763" target="_blank" rel="noopener noreferrer" className="w-11 h-11 glass rounded-full flex items-center justify-center hover:bg-brand-amber hover:text-black transition-colors">
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Google Maps Embed in Footer (5 cols) */}
          <div className="lg:col-span-5 h-[380px] sm:h-[450px] lg:h-[480px] rounded-3xl overflow-hidden glass border border-white/10 relative group shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3554.446824414571!2d-51.1524316!3d-27.0016667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e1506977777777%3A0x7777777777777777!2sR.%20Padre%20Anchieta%2C%20304%20-%20Matriz%2C%20Videira%20-%20SC%2C%2089560-000!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
              className="w-full h-full grayscale invert opacity-80 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-700"
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Rua+Padre+Anchieta+304+Matriz+Videira" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-black/90 hover:bg-brand-amber hover:text-black text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-full border border-white/20 transition-all flex items-center gap-1.5 backdrop-blur-sm"
            >
              Abrir no Maps <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs uppercase tracking-widest">
            © 2026 Matriz Grill - Todos os direitos reservados.
          </p>
          <div className="flex gap-8 text-white/20 text-[10px] uppercase tracking-[0.2em]">
            <button 
              onClick={() => setActiveModal('privacy')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacidade
            </button>
            <button 
              onClick={() => setActiveModal('terms')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Termos
            </button>
          </div>
        </div>
      </div>

      {/* Modern Dialog/Modal with AnimatePresence */}
      <AnimatePresence>
        {activeModal !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-zinc-950 border border-white/10 rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto relative z-10 shadow-2xl scrollbar-thin"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {activeModal === 'privacy' ? (
                <div>
                  <span className="text-brand-amber font-bold text-[10px] uppercase tracking-widest block mb-2">Segurança de Dados</span>
                  <h3 className="font-display text-2xl uppercase tracking-wider text-white mb-6">Política de Privacidade</h3>
                  
                  <div className="space-y-6 text-sm text-white/70 font-light leading-relaxed">
                    <div>
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">1. Coleta de Informações</h4>
                      <p>O Matriz Grill coleta apenas dados fornecidos espontaneamente por você ao realizar reservas de mesa, entrar em contato ou interagir conosco através do WhatsApp e de nossas redes sociais.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">2. Uso dos Dados</h4>
                      <p>Os seus dados de contato são utilizados estritamente para confirmar e gerenciar o agendamento de suas mesas, responder suas dúvidas ou enviar novidades especiais sobre nossa agenda cultural e promoções (quando previamente autorizado por você).</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">3. Confidencialidade e Segurança</h4>
                      <p>Garantimos que suas informações nunca serão comercializadas, alugadas ou compartilhadas com terceiros. Adotamos práticas de segurança adequadas para proteger seus dados contra acessos não autorizados ou perda de informações.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">4. Seus Direitos</h4>
                      <p>A qualquer momento, você pode solicitar a alteração ou a exclusão total dos seus dados de contato de nossos registros enviando uma mensagem simples para o nosso suporte oficial.</p>
                    </div>

                    <div className="pt-4 border-t border-white/5 text-[10px] text-white/40">
                      Última atualização: Julho de 2026. Matriz Grill, Videira SC.
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-brand-amber font-bold text-[10px] uppercase tracking-widest block mb-2">Regras de Convivência</span>
                  <h3 className="font-display text-2xl uppercase tracking-wider text-white mb-6">Termos de Uso</h3>
                  
                  <div className="space-y-6 text-sm text-white/70 font-light leading-relaxed">
                    <div>
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">1. Reservas de Mesa</h4>
                      <p>As reservas dependem da lotação da casa e ficam garantidas até as 20h45. Recomendamos chegar cedo!</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">2. Promoções e Regulamentos</h4>
                      <p>Nossas promoções clássicas (como o <strong>Quinta Burger</strong> com 30% de desconto e o <strong>Pede a Inteira e Paga a Meia de Tábua de Carne</strong>) são exclusivas para consumo no local e de forma presencial. Não são cumulativas com outros benefícios ou cupons ativos.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">3. Consumo de Bebidas Alcoólicas</h4>
                      <p>De acordo com a legislação federal brasileira, a venda e o consumo de bebidas alcoólicas são estritamente proibidos para menores de 18 anos. Poderá ser solicitada a apresentação de um documento oficial de identidade com foto para a liberação do consumo.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">4. Ambiente Familiar</h4>
                      <p>Preservamos um espaço alegre, seguro e integrativo. Reservamo-nos o direito de vetar ou convidar a se retirar indivíduos que apresentem comportamento inadequado, hostil ou que ponha em risco a segurança e integridade de nossos colaboradores e clientes.</p>
                    </div>

                    <div className="pt-4 border-t border-white/5 text-[10px] text-white/40">
                      Última atualização: Julho de 2026. Matriz Grill, Videira SC.
                    </div>
                  </div>
                </div>
              )}

              <button 
                onClick={() => setActiveModal(null)}
                className="mt-8 w-full py-3 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Entendi, Fechar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};

const GallerySection = () => {
  const images = [
    {
      url: galeriaAmbienteImg,
      title: "Ambiente & Gastronomia",
      category: "Experiência Matriz",
      size: "large"
    },
    {
      url: galeriaMusicaImg,
      title: "Música & Descontração",
      category: "Noite em Videira",
      size: "medium"
    },
    {
      url: galeriaEncontroImg,
      title: "O Ponto de Encontro",
      category: "Momentos Especiais",
      size: "medium"
    },
    {
      url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
      title: "Hambúrguer Artesanal",
      category: "Pratos",
      size: "small"
    },
    {
      url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop",
      title: "Parrilla Premium",
      category: "Pratos",
      size: "small"
    },
    {
      url: "https://images.unsplash.com/photo-1571767454098-246b94fbcf70?q=80&w=800&auto=format&fit=crop",
      title: "Chopp Gelado",
      category: "Bebidas",
      size: "small"
    },
    {
      url: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1200&auto=format&fit=crop",
      title: "Porções Generosas",
      category: "Pratos",
      size: "small"
    }
  ];

  return (
    <section id="galeria" className="py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-brand-red font-bold uppercase tracking-widest text-xs mb-4 block underline decoration-brand-red underline-offset-8">Momentos</span>
          <h2 className="font-display text-5xl md:text-8xl uppercase tracking-tighter mb-8 leading-[0.8]">Galeria de <span className="text-brand-wood italic">Experiências</span></h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm md:text-lg font-light">Um olhar sobre o que faz do Matriz Grill a esquina mais desejada da cidade.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[300px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative group overflow-hidden rounded-[2rem] glass border border-white/5 ${
                img.size === 'large' ? 'col-span-2 row-span-2' : 
                img.size === 'medium' ? 'col-span-2' : ''
              }`}
            >
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-left">
                <span className="text-brand-red text-[10px] uppercase font-bold tracking-[0.2em] mb-2">{img.category}</span>
                <h4 className="text-xl font-display uppercase tracking-widest leading-none">{img.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DeliverySection = () => {
  return (
    <section id="delivery" className="py-20 md:py-32 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden border-t border-white/5">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-brand-amber/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-80 h-80 bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 border border-white/10 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 bg-gradient-to-br from-white/[0.01] via-zinc-950/80 to-brand-amber/[0.01]"
        >
          {/* Decorative Corner Light */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-amber/[0.02] rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Visual representation of phone / delivery */}
          <div className="w-full lg:w-2/5 flex justify-center relative">
            <div className="relative w-64 h-[450px] bg-zinc-950 rounded-[3rem] border-4 border-white/10 shadow-2xl p-3 flex flex-col justify-between overflow-hidden">
              {/* Speaker / Camera Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-20 flex items-center justify-center">
                <div className="w-12 h-1 bg-zinc-800 rounded-full" />
              </div>

              {/* Screen Mockup */}
              <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-gradient-to-b from-zinc-950 to-zinc-900 flex flex-col items-center justify-between p-6 pt-10 text-center">
                {/* Header inside Mockup */}
                <div className="flex justify-between items-center w-full text-[10px] text-white/40 font-mono tracking-widest">
                  <span>MATRIZ</span>
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>ABERTO</span>
                  </div>
                </div>

                {/* Center Content Mockup */}
                <div className="my-auto flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red shadow-lg shadow-brand-red/10">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg uppercase tracking-wider text-white">AiPede Delivery</h4>
                    <p className="text-[10px] text-white/50 max-w-[180px] mx-auto mt-1 leading-relaxed">Sabor do Matriz Grill na comodidade da sua casa</p>
                  </div>
                  <div className="px-3 py-1 bg-brand-amber/10 border border-brand-amber/20 rounded-full text-brand-amber text-[9px] font-black uppercase tracking-widest">
                    Hambúrgueres & Porções
                  </div>
                </div>

                {/* Footer inside Mockup */}
                <div className="w-full space-y-2">
                  <div className="h-1 bg-white/5 rounded-full w-2/3 mx-auto" />
                  <div className="h-8 bg-brand-amber rounded-2xl w-full flex items-center justify-center text-[10px] text-black font-black uppercase tracking-widest shadow-lg shadow-brand-amber/10">
                    Ver Restaurante
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing effect behind phone */}
            <div className="absolute inset-0 bg-brand-amber/5 rounded-full blur-2xl -z-10" />
          </div>

          {/* Right Column: Copy & CTAs */}
          <div className="w-full lg:w-3/5 text-center lg:text-left flex flex-col justify-center">
            <span className="text-brand-amber font-bold uppercase tracking-[0.25em] text-xs mb-4 block">Delivery Exclusivo</span>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-6 leading-tight">
              Peça no <br className="hidden md:inline" />
              <span className="text-brand-red">AiPede Delivery</span>
            </h2>
            <p className="text-white/70 text-sm md:text-base font-light leading-relaxed mb-8 max-w-xl">
              Não quer sair da cama ou do sofá? Sem problemas! Nós levamos os melhores grelhados, porções lendárias e lanches de Videira até você através do aplicativo <strong>AiPede Delivery</strong>. Baixe o app e faça seu pedido de forma rápida e segura!
            </p>

            {/* Download Buttons (App Stores) */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              {/* App Store */}
              <a 
                href="https://apps.apple.com/us/app/aipede-app/id1628327208" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 rounded-2xl text-white text-left transition-all duration-300 shadow-md group"
              >
                {/* LINK PROVISÓRIO - CONFIRMAR COM CLIENTE */}
                <Apple className="w-7 h-7 text-white group-hover:text-brand-amber transition-colors" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-white/40 leading-none">Baixar na</span>
                  <span className="text-sm font-bold tracking-tight mt-0.5 leading-none">App Store</span>
                </div>
              </a>

              {/* Google Play */}
              <a 
                href="https://play.google.com/store/apps/details?id=com.donodoapp.aipededelivery" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 rounded-2xl text-white text-left transition-all duration-300 shadow-md group"
              >
                {/* LINK PROVISÓRIO - CONFIRMAR COM CLIENTE */}
                <Smartphone className="w-7 h-7 text-white group-hover:text-brand-amber transition-colors" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-white/40 leading-none">Disponível no</span>
                  <span className="text-sm font-bold tracking-tight mt-0.5 leading-none">Google Play</span>
                </div>
              </a>
            </div>

            {/* Alternative Direct Deep Link / Web link */}
            <div className="border-t border-white/5 pt-6 text-center lg:text-left">
              <span className="text-xs text-white/40 block mb-3 uppercase tracking-wider">Já tem o aplicativo instalado?</span>
              <a 
                href="aipede://" 
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-amber/10 hover:bg-brand-amber text-brand-amber hover:text-black border border-brand-amber/20 hover:border-brand-amber font-black uppercase tracking-widest text-[10px] rounded-full transition-all duration-300 cursor-pointer"
              >
                {/* LINK PROVISÓRIO - CONFIRMAR COM CLIENTE */}
                Abrir App Direto <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const BroadcastListSection = () => {
  return (
    <section className="py-12 bg-black/40 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-amber/[0.02] via-transparent to-brand-red/[0.01] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="glass border border-white/5 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-zinc-950/60 to-zinc-900/60"
        >
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="w-12 h-12 rounded-full bg-brand-amber/10 flex items-center justify-center text-brand-amber shrink-0 border border-brand-amber/20">
              <MessageCircle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-display text-lg md:text-xl uppercase tracking-wider text-white mb-1">Grupo de Resenhas Matriz Grill</h3>
              <p className="text-xs md:text-sm text-white/60 font-light max-w-xl">
                Entre no nosso grupo exclusivo do WhatsApp e receba em primeira mão a nossa programação da semana, novidades, promoções especiais e as melhores resenhas.
              </p>
            </div>
          </div>
          
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://chat.whatsapp.com/JrkpvZwuntW8oRBd3V7EpU"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 bg-zinc-900 hover:bg-brand-amber hover:text-black text-white font-black uppercase tracking-widest text-[10px] rounded-xl border border-white/10 hover:border-brand-amber transition-all duration-300"
          >
            Entrar no Grupo
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      id: "faq-estacionamento",
      icon: <Car className="w-6 h-6 text-brand-amber" />,
      question: "Estacionamento",
      answer: "O estacionamento é realizado de forma simples e gratuita diretamente nas vias públicas ao redor do bar (vagas na rua)."
    },
    {
      id: "faq-criancas",
      icon: <Baby className="w-6 h-6 text-brand-amber" />,
      question: "Crianças",
      answer: "Sim, com certeza! O Matriz Grill possui um ambiente totalmente familiar e perfeito para receber você e toda a sua família."
    },
    {
      id: "faq-reservas",
      icon: <CalendarCheck className="w-6 h-6 text-brand-amber" />,
      question: "Reserva de Mesas",
      answer: "Recomendamos garantir sua mesa com antecedência pelo WhatsApp! As reservas são mantidas até as 20h45. Chegue cedo e aproveite!"
    },
    {
      id: "faq-entrada",
      icon: <Ticket className="w-6 h-6 text-brand-amber" />,
      question: "Couvert Artístico & Entrada",
      answer: "Entrada e couvert artístico são 100% gratuitos! Venha curtir a melhor música ao vivo sem pagar nada a mais por isso."
    }
  ];

  return (
    <section id="faq" className="py-20 md:py-32 bg-zinc-950/60 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-amber/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-amber font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs mb-3 block">FAQ Matriz</span>
          <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tighter text-white">
            Dúvidas <span className="text-brand-amber italic font-light">Frequentes</span>
          </h2>
          <p className="text-white/50 text-xs md:text-sm font-light mt-4 max-w-xl mx-auto leading-relaxed">
            Esclareça suas principais dúvidas sobre estacionamento, couvert, reservas e o funcionamento da nossa casa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={faq.id}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-6 md:p-8 rounded-3xl border border-white/5 hover:border-brand-amber/20 transition-all duration-300 bg-gradient-to-br from-white/[0.01] to-transparent flex gap-5 group"
            >
              <div className="shrink-0 w-12 h-12 rounded-2xl bg-brand-amber/10 flex items-center justify-center border border-brand-amber/20 group-hover:bg-brand-amber/20 transition-colors">
                {faq.icon}
              </div>
              <div>
                <h3 className="font-display text-sm md:text-base uppercase tracking-wider text-white mb-2 group-hover:text-brand-amber transition-colors">
                  {faq.question}
                </h3>
                <p className="text-xs md:text-sm text-white/60 font-light leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-brand-orange selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        <AuthorityMarquee />
        <BentoGrid />
        <AgendaSection />
        <BroadcastListSection />
        <MenuSection />
        <DeliverySection />
        <GallerySection />
        
        {/* Consolidated Master About & History Section */}
        <section id="sobre" className="py-20 md:py-32 max-w-7xl mx-auto px-6 border-t border-white/5">
          {/* Main Unified Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="text-brand-amber font-bold uppercase tracking-widest text-xs mb-3 block">Nossa História & Anfitriões</span>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-6 leading-tight">
              No Coração de Videira
            </h2>
            <p className="text-white/70 text-base font-light leading-relaxed">
              Fundado em <strong>1996</strong> pelo <strong>Seco</strong>, o espaço evoluiu de um tradicional bar de bairro para o novo <strong>Matriz Grill</strong>, inaugurado há 3 anos com a chegada do <strong>Jorge</strong> na gerência, unindo alta gastronomia no grill, chopp gelado e ambiente acolhedor e seguro.
            </p>
          </div>

          {/* Facade & Hosts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center mb-20 md:mb-28">
            {/* Seco & Jorge Hosts Image */}
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              viewport={{ once: true }}
              className="lg:col-span-6 relative"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-amber/10 rounded-full blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl group">
                <img 
                  src="https://i.ibb.co/G4MRGN55/1.png" 
                  alt="Seco & Jorge - Proprietário & Gerência no Matriz Grill" 
                  loading="lazy"
                  className="w-full h-[350px] sm:h-[480px] object-cover hover:scale-[1.02] transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 p-5 glass rounded-2xl border border-white/10 flex items-center justify-between text-left">
                  <div>
                    <span className="text-brand-amber text-[10px] font-black uppercase tracking-widest block mb-1">Anfitriões Matriz</span>
                    <p className="text-xs text-white/90 font-bold uppercase tracking-wider">Seco (Proprietário) & Jorge (Gerente)</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-display text-brand-amber">28+</span>
                    <span className="text-[9px] text-white/50 block uppercase tracking-wider font-medium">Anos de História</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Seco & Jorge Host Card */}
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              viewport={{ once: true }}
              className="lg:col-span-6 text-left"
            >
              <div className="glass p-8 md:p-10 rounded-3xl border border-brand-amber/20 relative overflow-hidden bg-gradient-to-br from-brand-amber/[0.03] to-transparent">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-brand-amber/20 flex items-center justify-center shrink-0 border border-brand-amber/30 text-brand-amber">
                    <Star className="w-6 h-6 fill-brand-amber" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl uppercase tracking-tight text-white">Seco & Jorge</h3>
                    <span className="text-xs text-brand-amber font-bold uppercase tracking-widest">Proprietário & Gerência</span>
                  </div>
                </div>

                <p className="text-white/80 text-sm font-light leading-relaxed mb-6 italic">
                  "Nossa missão é fazer com que você chegue como cliente e saia como parte da nossa família. Garantimos um ambiente acolhedor, animado, seguro e ideal para casais, amigos e toda a família."
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <Clock className="text-brand-amber w-5 h-5 shrink-0" />
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Funcionamento</span>
                        <OpenStatusBadge short />
                      </div>
                      <span className="text-xs uppercase tracking-widest font-black text-white/80">Terça a Domingo: 17h às 22:30h</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Music className="text-brand-amber w-5 h-5 shrink-0" />
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Música ao Vivo</span>
                      <span className="text-xs uppercase tracking-widest font-black text-brand-amber">Sextas-Feiras: a partir de 20:30h</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Interactive Before & After Subsection */}
          <div className="pt-16 border-t border-white/5">
            <div className="text-center mb-12">
              <h3 className="font-display text-2xl md:text-4xl uppercase tracking-tighter">A Transformação da Nossa Esquina</h3>
              <p className="text-white/50 text-sm max-w-xl mx-auto mt-2 font-light">
                Arraste o divisor na imagem abaixo para comparar a antiga estrutura de madeira com a modernidade do nosso gastropub atual.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
              {/* Slider Column */}
              <div className="lg:col-span-7">
                <BeforeAfterSlider />
              </div>

              {/* Text Comparison Cards */}
              <div className="lg:col-span-5 flex flex-col gap-6 text-left">
                <div className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-xs">1</span>
                    <h4 className="font-display uppercase tracking-wider text-white text-sm">Antes: Bar Simples de Madeira</h4>
                  </div>
                  <p className="text-white/60 text-xs font-light leading-relaxed">
                    A estrutura original na esquina da Rua Campos Novos era uma casa de madeira tradicional com venezianas azuis e ambiente simples de bar de bairro.
                  </p>
                </div>

                <div className="glass p-8 rounded-3xl border border-brand-amber/20 relative overflow-hidden group hover:border-brand-amber/30 transition-colors duration-300 bg-gradient-to-br from-brand-amber/[0.03] to-transparent">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-7 h-7 rounded-full bg-brand-amber text-black flex items-center justify-center font-bold text-xs">2</span>
                    <h4 className="font-display uppercase tracking-wider text-brand-amber text-sm">Depois: Gastropub Moderno & Badalado</h4>
                  </div>
                  <p className="text-white/70 text-xs font-light leading-relaxed">
                    Uma renovação completa do espaço: arquitetura moderna e aconchegante com grandes vitrais, acabamento impecável, cortes nobres no grill e atendimento de excelência.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />

        <FAQSection />

        {/* CTA Section */}
        <section className="py-20 md:py-32 px-6">
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto glass rounded-[2rem] md:rounded-[3rem] p-8 md:p-24 text-center relative overflow-hidden border border-white/5"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-amber/5 to-transparent pointer-events-none" />
            <h2 className="font-display text-3xl md:text-6xl uppercase tracking-tighter mb-6 md:mb-8 relative z-10 leading-tight">Pronto para a <br /><span className="text-brand-amber italic">Melhor Noite de Videira?</span></h2>
            <p className="text-white/50 mb-8 md:mb-12 max-w-xl mx-auto relative z-10 text-sm md:text-base">Reserve sua mesa agora mesmo de forma simples e garanta os melhores lugares para o show.</p>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/5549999328763?text=Ol%C3%A1%20Seco%2C%20ol%C3%A1%20Jorge%21%20Quero%20reservar%20uma%20mesa%20para%20esta%20semana%20no%20Matriz%20Grill%21"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-brand-amber to-brand-gold text-black font-black uppercase tracking-widest rounded-full relative z-10 shadow-xl shadow-brand-amber/10 text-xs md:text-sm"
            >
              Reservar Mesa no WhatsApp
              <ChevronRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

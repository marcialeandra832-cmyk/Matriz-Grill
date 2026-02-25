/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Music, 
  Utensils, 
  Beer, 
  MapPin, 
  Instagram, 
  Phone, 
  ChevronRight, 
  Star, 
  Clock, 
  Menu as MenuIcon, 
  X,
  Flame,
  ArrowUpRight
} from 'lucide-react';

// --- Components ---

const Logo = () => (
  <div className="flex flex-col items-center group py-2">
    <div className="relative flex flex-col items-center">
      {/* "Desde 1996" - Small and elegant above the roof */}
      <span className="text-[7px] uppercase tracking-[0.2em] text-white/60 mb-0.5 font-sans font-light italic">Desde 1996</span>
      
      {/* SVG House + Text Container */}
      <div className="relative w-24 h-auto flex flex-col items-center">
        {/* House SVG */}
        <svg viewBox="0 0 100 45" className="w-full h-auto fill-none stroke-white stroke-[1.5]">
          {/* Main Roof */}
          <path d="M10 40 L50 5 L90 40" strokeLinecap="round" strokeLinejoin="round" />
          {/* Chimney */}
          <path d="M30 22 V15 H38 V28" fill="white" stroke="none" />
          {/* Window */}
          <g transform="translate(44, 18)">
            <rect width="12" height="12" fill="white" stroke="none" rx="1" />
            <line x1="6" y1="0" x2="6" y2="12" stroke="black" strokeWidth="0.5" />
            <line x1="0" y1="6" x2="12" y2="6" stroke="black" strokeWidth="0.5" />
          </g>
        </svg>

        {/* MATRIZ Text */}
        <h1 className="text-white font-serif text-2xl tracking-[0.1em] uppercase font-bold -mt-2">
          Matriz
        </h1>
        
        {/* Grill Text - Script Font */}
        <span 
          className="text-brand-red text-3xl -mt-3 leading-none" 
          style={{ fontFamily: "'Alex Brush', cursive", textShadow: '0 0 10px rgba(139, 26, 26, 0.3)' }}
        >
          Grill
        </span>
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#' },
    { name: 'Diferenciais', href: '#diferenciais' },
    { name: 'Cardápio', href: '#cardapio' },
    { name: 'Sobre', href: '#sobre' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass shadow-2xl' : 'bg-gradient-to-b from-bg-dark/90 via-bg-dark/40 to-transparent'}`}>
      {/* Top Impact Phrase Bar */}
      <div className="w-full bg-brand-red py-2 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white flex items-center gap-2 whitespace-nowrap"
          >
            <Flame className="w-3 h-3 fill-white" />
            A esquina mais movimentada de Videira
            <Flame className="w-3 h-3 fill-white" />
          </motion.span>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-500 ${isScrolled ? 'py-3' : 'py-6'}`}>
        <a href="#" className="flex items-center gap-3 group">
          <Logo />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://wa.me/5549999328763" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-brand-red hover:bg-brand-red/90 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all"
          >
            Reservar Mesa
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
            className="absolute top-full left-0 w-full glass p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium py-2 border-b border-white/10"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://wa.me/5549999328763" 
              className="w-full py-4 bg-brand-red text-center font-bold uppercase tracking-widest rounded-xl mt-4"
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
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-40">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1920&auto=format&fit=crop" 
          alt="Bar Atmosphere" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-transparent to-bg-dark" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mt-20 md:mt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] mb-8 uppercase">
            Chegue como <span className="text-brand-red">está</span>,<br />
            aproveite como <span className="italic text-brand-wood">merece</span>.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-10 font-light leading-relaxed">
            Música ao vivo, porções lendárias e o chopp mais gelado da região. 
            Sua noite começa no coração de Videira.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#cardapio"
              className="px-10 py-5 bg-white text-black font-bold uppercase tracking-widest rounded-full flex items-center gap-2 group"
            >
              Ver Cardápio
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/5549999328763"
              className="px-10 py-5 glass text-white font-bold uppercase tracking-widest rounded-full flex items-center gap-2"
            >
              Falar no WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

const AuthorityMarquee = () => {
  const items = ["MÚSICA AO VIVO", "CHOPP GELADO", "HAMBÚRGUER ARTESANAL", "PORÇÕES INCRÍVEIS", "DRINKS EXCLUSIVOS", "MELHOR ESQUINA"];
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
            src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" 
            alt="Marco Aurélio e Amigos - Música ao Vivo Sertaneja"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Music className="text-brand-red w-10 h-10" />
              <span className="px-3 py-1 bg-brand-red text-[10px] font-bold uppercase tracking-widest rounded-full">Destaque da Semana</span>
            </div>
            <h3 className="text-3xl font-display uppercase mb-2">Marco Aurélio & Amigos</h3>
            <p className="text-white/80 font-medium mb-2">O melhor do sertanejo com violão, sanfona e cajon transformando sua noite em um espetáculo.</p>
            <div className="flex items-center gap-2 text-brand-wood font-bold text-sm uppercase tracking-widest">
              <Clock className="w-4 h-4" />
              Sextas a partir das 20:30h
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

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('Porções');
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);

  const menuData = {
    'Porções': [
      { name: 'Batata Frita 400g', price: 'R$ 30,00', desc: 'Batata palito extra crocante com maionese da casa.', image: 'https://images.unsplash.com/photo-1630384066272-17124ff89910?q=80&w=400&auto=format&fit=crop' },
      { name: 'Batata Frita Cheddar e Bacon', price: 'R$ 40,00', desc: 'Batata canoa crocante com cheddar e bacon.', image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=400&auto=format&fit=crop' },
      { name: 'Raquete de Frango e Fritas', price: 'R$ 42,00', desc: 'Frango empanado com fritas + molho da casa.', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop' },
      { name: 'Entrevero da Casa', price: 'R$ 62,00', desc: 'Alcatra, frango, calabresa, pimentão e cebola.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop' },
      { name: 'Tilápia com Batata', price: 'R$ 54,00', desc: 'Tilápia frita com batata palito.', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400&auto=format&fit=crop' },
    ],
    'Hambúrgueres': [
      { name: 'Super Chef', price: 'R$ 47,00', desc: 'Acompanha 150g batata canoa.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop' },
      { name: 'Burger Cheddar', price: 'R$ 40,00', desc: 'Acompanha 150g batata palito.', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=400&auto=format&fit=crop' },
      { name: 'Burger Picanha', price: 'R$ 43,00', desc: 'Acompanha 150g batata canoa.', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400&auto=format&fit=crop' },
      { name: 'Matriz Burger', price: 'R$ 46,00', desc: 'O clássico da casa com 150g de batata.', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=400&auto=format&fit=crop' },
    ],
    'Drinks': [
      { name: 'Lagoa Azul', price: 'R$ 24,00', desc: 'Refrescante e clássico.', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=400&auto=format&fit=crop' },
      { name: 'Avatar', price: 'R$ 28,00', desc: 'Drink exclusivo da casa.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&auto=format&fit=crop' },
      { name: 'Gin Tropical', price: 'R$ 31,00', desc: 'Gin, tônica e frutas tropicais.', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop' },
      { name: 'Negroni', price: 'R$ 32,00', desc: 'Para os paladares mais exigentes.', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=400&auto=format&fit=crop' },
    ],
    'Chopp & Cervejas': [
      { name: 'Caneca de Chopp 340ml', price: 'R$ 15,00', desc: 'O chopp mais gelado da cidade.', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=400&auto=format&fit=crop' },
      { name: 'Heineken 600ml', price: 'R$ 20,00', desc: 'Cerveja premium.', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=400&auto=format&fit=crop' },
      { name: 'Antarctica Original', price: 'R$ 19,00', desc: 'A clássica brasileira.', image: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?q=80&w=400&auto=format&fit=crop' },
    ]
  };

  const fullMenuData = {
    'Porções': [
      { name: 'Batata Frita 400g', price: 'R$ 30,00', desc: 'Batata palito extra crocante com maionese da casa.', image: 'https://images.unsplash.com/photo-1630384066272-17124ff89910?q=80&w=400&auto=format&fit=crop' },
      { name: 'Batata Frita com Cheddar e Bacon', price: 'R$ 40,00', desc: 'Batata canoa crocante com cheddar e bacon.', image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=400&auto=format&fit=crop' },
      { name: 'Raquete de Frango e Fritas', price: 'R$ 42,00', desc: 'Frango empanado com fritas + molho da casa.', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop' },
      { name: 'Raquete de Frango e Polenta', price: 'R$ 42,00', desc: 'Frango empanado com polenta frita.', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop' },
      { name: 'Dadinho de Tapioca', price: 'R$ 32,00', desc: 'Cubos de tapioca com queijo + geleia de pimenta.', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=400&auto=format&fit=crop' },
      { name: 'Frango Empanado com Queijo Mussarela', price: 'R$ 48,00', desc: 'Cubos de frango empanado com queijo + molho da casa.', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop' },
      { name: 'Polenta Frita 400g', price: 'R$ 29,00', desc: 'Polenta palito com queijo mussarela ralado.', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop' },
      { name: 'Entrevero da Casa', price: 'R$ 62,00', desc: 'Alcatra, frango, calabresa, pimentão e cebola.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop' },
      { name: 'Tilápia com Batata', price: 'R$ 54,00', desc: 'Tilápia frita com batata palito.', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400&auto=format&fit=crop' },
      { name: 'Tilápia com Polenta', price: 'R$ 50,00', desc: 'Tilápia frita com polenta palito.', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400&auto=format&fit=crop' },
      { name: 'Mandioquinha Frita', price: 'R$ 29,00', desc: 'Bolinho de mandioca com queijo.', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=400&auto=format&fit=crop' },
      { name: 'Linguiça Campeira 500g', price: 'R$ 47,00', desc: 'Acompanha farofa e molho de mostarda.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop' },
    ],
    'Petiscos': [
      { name: 'Frango Acebolado com Fritas', price: 'R$ 48,00', desc: '', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop' },
      { name: 'Bolinho de Feijoada (8 un.)', price: 'R$ 36,00', desc: '', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=400&auto=format&fit=crop' },
      { name: 'Bolinho de Bacalhau (6 un.)', price: 'R$ 29,00', desc: '', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400&auto=format&fit=crop' },
      { name: 'Palito de Mussarela (10 un.)', price: 'R$ 36,00', desc: '', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=400&auto=format&fit=crop' },
      { name: 'Onion Rings 400g', price: 'R$ 34,00', desc: '', image: 'https://images.unsplash.com/photo-1639146504205-53303911c7d1?q=80&w=400&auto=format&fit=crop' },
      { name: 'Coxinha Frango com Catupiry (6 un.)', price: 'R$ 23,00', desc: '', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=400&auto=format&fit=crop' },
      { name: 'Tábua de Frios', price: 'R$ 57,00', desc: '', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=400&auto=format&fit=crop' },
      { name: 'Camarão Soltinho', price: 'R$ 95,00', desc: '', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=400&auto=format&fit=crop' },
      { name: 'Sopa de Agnoline', price: 'R$ 26,00', desc: '', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=400&auto=format&fit=crop' },
    ],
    'Tábuas de Carne': [
      { name: 'Alcatra (Meia)', price: 'R$ 85,00', desc: 'Acompanha batata frita, pão de alho, farofa, cebola e maionese.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop' },
      { name: 'Alcatra (Inteira)', price: 'R$ 120,00', desc: 'Acompanha batata frita, pão de alho, farofa, cebola e maionese.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop' },
      { name: 'Filé Mignon (Meia)', price: 'R$ 100,00', desc: 'Acompanha batata frita, pão de alho, farofa, cebola e maionese.', image: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=400&auto=format&fit=crop' },
      { name: 'Filé Mignon (Inteira)', price: 'R$ 145,00', desc: 'Acompanha batata frita, pão de alho, farofa, cebola e maionese.', image: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=400&auto=format&fit=crop' },
      { name: 'Picanha (Meia)', price: 'R$ 105,00', desc: 'Acompanha batata frita, pão de alho, farofa, cebola e maionese.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop' },
      { name: 'Picanha (Inteira)', price: 'R$ 155,00', desc: 'Acompanha batata frita, pão de alho, farofa, cebola e maionese.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop' },
    ],
    'Hambúrgueres': [
      { name: 'X-Burger', price: 'R$ 20,00', desc: 'Acompanha 150g de batata.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop' },
      { name: 'Super Chef', price: 'R$ 47,00', desc: 'Acompanha 150g batata canoa.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop' },
      { name: 'Burger Cheddar', price: 'R$ 40,00', desc: 'Acompanha 150g batata palito.', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=400&auto=format&fit=crop' },
      { name: 'Burger Picanha', price: 'R$ 43,00', desc: 'Acompanha 150g batata canoa.', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400&auto=format&fit=crop' },
      { name: 'Cordeiro Burger', price: 'R$ 48,00', desc: 'Acompanha 150g de batata.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop' },
      { name: 'Burger Mignon', price: 'R$ 44,00', desc: 'Acompanha 150g de batata.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop' },
      { name: 'Big Frango', price: 'R$ 35,00', desc: 'Acompanha 150g de batata.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop' },
      { name: 'Burger El México', price: 'R$ 40,00', desc: 'Acompanha 150g de batata.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop' },
      { name: 'Onion Burger', price: 'R$ 40,00', desc: 'Acompanha 150g de batata.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop' },
      { name: 'Burger Vegetariano', price: 'R$ 40,00', desc: 'Acompanha 150g de batata.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop' },
      { name: 'Egg Burger', price: 'R$ 39,00', desc: 'Acompanha 150g de batata.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop' },
      { name: 'Matriz Burger', price: 'R$ 46,00', desc: 'Acompanha 150g de batata.', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=400&auto=format&fit=crop' },
    ],
    'Drinks': [
      { name: 'Lagoa Azul', price: 'R$ 24,00', desc: '', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=400&auto=format&fit=crop' },
      { name: 'Green Mint', price: 'R$ 24,00', desc: '', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&auto=format&fit=crop' },
      { name: 'Avatar', price: 'R$ 28,00', desc: '', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&auto=format&fit=crop' },
      { name: 'Piña Colada', price: 'R$ 28,00', desc: '', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&auto=format&fit=crop' },
      { name: 'Bob Marley', price: 'R$ 26,00', desc: '', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&auto=format&fit=crop' },
      { name: 'Sex on the Beach', price: 'R$ 24,00', desc: '', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&auto=format&fit=crop' },
      { name: 'Gin Tônica', price: 'R$ 27,00', desc: '', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop' },
      { name: 'Gin Tropical', price: 'R$ 31,00', desc: '', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop' },
      { name: 'Gin Red Fruits', price: 'R$ 28,00', desc: '', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop' },
      { name: 'Gin Tônica com Maracujá', price: 'R$ 28,00', desc: '', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop' },
      { name: 'Gin Spritz', price: 'R$ 30,00', desc: '', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop' },
      { name: 'Aperol Orange', price: 'R$ 28,00', desc: '', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop' },
      { name: 'Drink Vivi', price: 'R$ 30,00', desc: '', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop' },
      { name: 'Boulevardier', price: 'R$ 42,00', desc: '', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop' },
      { name: 'Negroni', price: 'R$ 32,00', desc: '', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=400&auto=format&fit=crop' },
      { name: 'Negroni Tanqueray', price: 'R$ 42,00', desc: '', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=400&auto=format&fit=crop' },
      { name: 'Fire Citrus', price: 'R$ 32,00', desc: '', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop' },
      { name: 'Apple Honey', price: 'R$ 32,00', desc: '', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop' },
    ],
    'Cervejas': [
      { name: 'Caneca de Chopp 340ml', price: 'R$ 15,00', desc: '', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=400&auto=format&fit=crop' },
      { name: 'Sol', price: 'R$ 12,00', desc: '', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=400&auto=format&fit=crop' },
      { name: 'Sol s/ Álcool', price: 'R$ 12,00', desc: '', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=400&auto=format&fit=crop' },
      { name: 'Estrela Galicia', price: 'R$ 13,00', desc: '', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=400&auto=format&fit=crop' },
      { name: 'Heineken Long', price: 'R$ 13,00', desc: '', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=400&auto=format&fit=crop' },
      { name: 'Heineken s/ Álcool', price: 'R$ 13,00', desc: '', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=400&auto=format&fit=crop' },
      { name: 'Terezópolis', price: 'R$ 10,00', desc: '', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=400&auto=format&fit=crop' },
      { name: 'Brahma Malzbier', price: 'R$ 13,00', desc: '', image: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?q=80&w=400&auto=format&fit=crop' },
      { name: 'Heineken 600ml', price: 'R$ 20,00', desc: '', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=400&auto=format&fit=crop' },
      { name: 'Antarctica Original', price: 'R$ 19,00', desc: '', image: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?q=80&w=400&auto=format&fit=crop' },
    ],
    'Sobremesas': [
      { name: 'Mini Churros', price: 'R$ 18,00', desc: '', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=400&auto=format&fit=crop' },
      { name: 'Petit Gateau', price: 'R$ 21,00', desc: '', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=400&auto=format&fit=crop' },
      { name: 'Taça de Sorvete', price: 'R$ 18,00', desc: '', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=400&auto=format&fit=crop' },
      { name: 'Brownie', price: 'R$ 19,00', desc: '', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=400&auto=format&fit=crop' },
      { name: 'Café Gelado', price: 'R$ 16,00', desc: '', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=400&auto=format&fit=crop' },
    ]
  };

  return (
    <section id="cardapio" className="py-20 md:py-32 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
          <div>
            <span className="text-brand-red font-bold uppercase tracking-widest text-xs mb-2 block">Cardápio Selecionado</span>
            <h2 className="font-display text-4xl md:text-7xl uppercase tracking-tighter">Sabor em <span className="italic">cada detalhe</span></h2>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 w-full md:w-auto -mx-6 px-6 md:mx-0 md:px-0">
            {Object.keys(menuData).map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-brand-red text-white' : 'glass text-white/50 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 md:gap-y-8">
          <AnimatePresence mode="wait">
            {menuData[activeCategory as keyof typeof menuData].map((item, idx) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.05 }}
                className="group flex gap-4 items-center py-4 md:py-6 border-b border-white/5 hover:border-brand-red/30 transition-colors"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0 border border-white/10">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg md:text-xl font-display uppercase group-hover:text-brand-red transition-colors leading-tight">{item.name}</h4>
                  <p className="text-xs md:text-sm text-white/40 font-light mt-1 line-clamp-1 md:line-clamp-none">{item.desc}</p>
                </div>
                <div className="text-brand-wood font-bold text-base md:text-lg whitespace-nowrap">{item.price}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-20 text-center">
          <button 
            onClick={() => setIsFullMenuOpen(true)}
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest"
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
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsFullMenuOpen(false)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl max-h-full bg-bg-dark border border-white/10 rounded-[2rem] overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-white/10 flex justify-between items-center bg-bg-dark/50 backdrop-blur-md sticky top-0 z-10">
                <h3 className="font-display text-3xl uppercase tracking-tighter">Cardápio <span className="text-brand-red">Completo</span></h3>
                <button 
                  onClick={() => setIsFullMenuOpen(false)}
                  className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-brand-red transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 md:p-12 no-scrollbar">
                {Object.entries(fullMenuData).map(([category, items]) => (
                  <div key={category} className="mb-16">
                    <h4 className="text-brand-red font-display text-2xl uppercase tracking-widest mb-8 border-l-4 border-brand-red pl-4">{category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {items.map((item) => (
                        <div key={item.name} className="flex gap-4 items-center py-4 border-b border-white/5 group">
                          <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="flex-1 pr-4">
                            <h5 className="text-lg font-display uppercase group-hover:text-brand-red transition-colors">{item.name}</h5>
                            {item.desc && <p className="text-xs text-white/40 font-light mt-1">{item.desc}</p>}
                          </div>
                          <div className="text-brand-wood font-bold whitespace-nowrap">{item.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 border-t border-white/10 text-center bg-bg-dark/50 backdrop-blur-md">
                <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4">Preços sujeitos a alteração sem aviso prévio.</p>
                <a 
                  href="https://wa.me/5549999328763" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand-red text-white font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
                >
                  Fazer Pedido no WhatsApp <Phone className="w-4 h-4" />
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
              {[...Array(review.rating)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-brand-red text-brand-red" />)}
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
  return (
    <footer id="sobre" className="pt-32 pb-12 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-8">
              <Logo />
            </a>
            <p className="text-white/40 max-w-sm text-lg font-light leading-relaxed">
              Situada no coração da cidade, sendo a esquina mais movimentada da região. 
              O ponto de encontro oficial de Videira.
            </p>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-widest text-sm mb-8">Onde Estamos</h4>
            <ul className="space-y-4 text-white/50 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-brand-red shrink-0" />
                <span>Rua Padre Anchieta 304, Matriz<br />Videira, SC - 89560-000</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-brand-red shrink-0" />
                <span>(49) 99932-8763</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-widest text-sm mb-8">Horários</h4>
            <ul className="space-y-4 text-white/50 text-sm">
              <li className="flex flex-col gap-1">
                <span className="text-white/30 text-[10px] uppercase font-bold tracking-widest">Terça a Domingo</span>
                <span className="text-white/80">17:00h às 22:30h</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-brand-red text-[10px] uppercase font-bold tracking-widest">Sextas (Música ao Vivo)</span>
                <span className="text-white/80 font-bold">A partir das 20:30h</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-widest text-sm mb-8">Siga-nos</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/matrizgrill.videira/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-brand-red transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/5549999328763" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-brand-red transition-colors">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs uppercase tracking-widest">
            © 2026 Matriz Grill - Todos os direitos reservados.
          </p>
          <div className="flex gap-8 text-white/20 text-[10px] uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
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
        <MenuSection />
        
        {/* Location Section */}
        <section id="localizacao" className="py-20 md:py-32 bg-black/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -50 }}
                viewport={{ once: true }}
              >
                <span className="text-brand-red font-bold uppercase tracking-widest text-xs mb-4 block">Como Chegar</span>
                <h2 className="font-display text-4xl md:text-7xl uppercase tracking-tighter mb-8 leading-tight">A Esquina <br /><span className="text-brand-wood italic">Mais Famosa</span></h2>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="text-brand-red w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg md:text-xl uppercase">Endereço</h4>
                      <p className="text-sm md:text-base text-white/60 font-light">Rua Padre Anchieta 304, Matriz<br />Videira, SC - 89560-000</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center shrink-0">
                      <Clock className="text-brand-red w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg md:text-xl uppercase">Horários</h4>
                      <p className="text-sm md:text-base text-white/60 font-light">Terça a Domingo: 17h às 22:30h</p>
                    </div>
                  </div>
                </div>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.google.com/maps/search/?api=1&query=Rua+Padre+Anchieta+304+Matriz+Videira"
                  target="_blank"
                  className="mt-10 md:mt-12 inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full text-sm"
                >
                  Abrir no Google Maps
                  <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </motion.div>

              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 50 }}
                viewport={{ once: true }}
                className="h-[300px] md:h-[500px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden glass border border-white/10 relative"
              >
                {/* Placeholder for Map - In a real app, use Google Maps Embed API */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3554.446824414571!2d-51.1524316!3d-27.0016667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e1506977777777%3A0x7777777777777777!2sR.%20Padre%20Anchieta%2C%20304%20-%20Matriz%2C%20Videira%20-%20SC%2C%2089560-000!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
                  className="w-full h-full grayscale invert opacity-80"
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-bg-dark/40 to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* About Section with Image */}
        <section id="sobre" className="py-20 md:py-32 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-orange/20 rounded-full blur-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1200&auto=format&fit=crop" 
                alt="Matriz Grill Interior" 
                className="rounded-3xl relative z-10 w-full h-[300px] md:h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 glass p-6 md:p-8 rounded-2xl z-20 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="text-3xl md:text-4xl font-display text-brand-orange">10+</div>
                  <div className="text-[9px] md:text-[10px] uppercase tracking-widest leading-tight text-white/60">Anos de<br />Tradição</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="text-brand-wood font-bold uppercase tracking-widest text-xs mb-4 block">Nossa História</span>
              <h2 className="font-display text-4xl md:text-7xl uppercase tracking-tighter mb-6 md:mb-8 leading-tight">No coração <br /><span className="text-brand-red">de Videira</span></h2>
              <p className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-8">
                O Matriz Grill nasceu da paixão por reunir pessoas em torno de boa comida e música de qualidade. 
                Situado na esquina mais vibrante da cidade, somos o destino preferido para quem busca 
                momentos autênticos, porções que surpreendem e o melhor atendimento da região.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-center gap-3">
                  <Clock className="text-brand-red w-5 h-5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Horário de Funcionamento</span>
                    <span className="text-xs uppercase tracking-widest font-bold">Terça a Domingo: 17h às 22:30h</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Music className="text-brand-red w-5 h-5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Música ao Vivo</span>
                    <span className="text-xs uppercase tracking-widest font-bold">Sextas: 20:30h</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Testimonials />

        {/* CTA Section */}
        <section className="py-20 md:py-32 px-6">
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto glass rounded-[2rem] md:rounded-[3rem] p-8 md:p-24 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-red/10 to-transparent pointer-events-none" />
            <h2 className="font-display text-3xl md:text-7xl uppercase tracking-tighter mb-6 md:mb-8 relative z-10 leading-tight">Pronto para uma <br /><span className="text-brand-red italic">noite inesquecível?</span></h2>
            <p className="text-white/50 mb-8 md:mb-12 max-w-xl mx-auto relative z-10 text-sm md:text-base">Reserve sua mesa agora e garanta o melhor lugar da casa para curtir a música ao vivo.</p>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/5549999328763"
              className="inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-6 bg-brand-red text-white font-bold uppercase tracking-[0.2em] rounded-full relative z-10 shadow-2xl shadow-brand-red/20 text-xs md:text-sm"
            >
              Reservar Via WhatsApp
              <ChevronRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

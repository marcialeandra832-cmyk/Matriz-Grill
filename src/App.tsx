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
  ArrowUpRight,
  Tv,
  Trophy
} from 'lucide-react';

// --- Components ---

const Logo = () => (
  <div className="flex items-center gap-2 py-1 select-none">
    <img 
      src="https://i.ibb.co/Y7Y30C83/LOGO-MATRIZ-GRILL-3.png" 
      alt="Matriz Grill" 
      className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(251,191,36,0.15)] hover:scale-105 transition-all duration-300"
      referrerPolicy="no-referrer"
    />
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
    { name: 'Agenda', href: '#agenda' },
    { name: 'Cardápio', href: '#cardapio' },
    { name: 'Galeria', href: '#galeria' },
    { name: 'Sobre', href: '#sobre' },
  ];

  const whatsappReservationUrl = "https://wa.me/5549999328763?text=Ol%C3%A1%21%20Gostaria%20de%20reservar%20uma%20mesa%20no%20Matriz%20Grill.";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass shadow-2xl' : 'bg-gradient-to-b from-bg-dark/95 via-bg-dark/50 to-transparent'}`}>
      {/* Top Impact Phrase Bar */}
      <div className="w-full bg-brand-red py-2 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white flex items-center gap-2 whitespace-nowrap"
          >
            <Flame className="w-3.5 h-3.5 fill-brand-amber text-brand-amber animate-pulse" />
            A esquina mais badalada da cidade
            <Flame className="w-3.5 h-3.5 fill-brand-amber text-brand-amber animate-pulse" />
          </motion.span>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'}`}>
        <a href="#" className="flex items-center gap-3 group">
          <Logo />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs font-bold tracking-widest text-white/75 hover:text-brand-amber transition-colors uppercase"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={whatsappReservationUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-brand-amber hover:bg-brand-amber/95 text-black text-xs font-black uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg shadow-brand-amber/20 hover:shadow-brand-amber/40 hover:scale-105"
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
            className="absolute top-full left-0 w-full glass p-6 md:hidden flex flex-col gap-4 shadow-2xl"
          >
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
              className="w-full py-4 bg-brand-amber text-black text-center font-black uppercase tracking-widest rounded-xl mt-4"
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
          <h1 className="font-display text-5xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] mb-8 uppercase text-white">
            Chegue como <span className="text-brand-amber">está</span>,<br />
            aproveite como <span className="italic text-brand-wood">merece</span>.
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-xl text-white/70 mb-10 font-sans font-light leading-relaxed">
            Música ao vivo de alta qualidade, porções lendárias na chapa e o chopp mais gelado da região. 
            Sua noite começa no coração e na <span className="font-bold text-white">esquina mais badalada da cidade</span>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/5549999328763?text=Ol%C3%A1%21%20Quero%20falar%20com%20o%20Matriz%20Grill%20para%20tirar%20d%C3%BAvidas%20ou%20fazer%20uma%20reserva%21"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-brand-amber to-brand-gold text-black font-black uppercase tracking-widest rounded-full flex items-center justify-center gap-2 shadow-xl shadow-brand-amber/10 hover:shadow-brand-amber/30 transition-all duration-300"
            >
              <Phone className="w-4 h-4 fill-black" />
              Falar no WhatsApp
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, bg: "rgba(255, 255, 255, 0.05)" }}
              whileTap={{ scale: 0.95 }}
              href="#cardapio"
              className="w-full sm:w-auto px-10 py-5 border border-white/20 hover:border-brand-amber text-white font-bold uppercase tracking-widest rounded-full flex items-center justify-center gap-2 transition-all duration-300"
            >
              Ver Cardápio
              <ChevronRight className="w-4 h-4" />
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

const AgendaSection = () => {
  const [selectedDay, setSelectedDay] = useState('Quarta');

  const agendaDays = [
    {
      day: 'Quarta-feira',
      shortDay: 'Quarta',
      tag: 'PROMOÇÃO DE TÁBUAS',
      title: 'Pede a inteira e paga a meia da casa!',
      desc: 'Nossas lendárias tábuas de carne de alto padrão (Alcatra, Filé Mignon ou Picanha) com um desconto imbatível que serve toda a mesa. Perfeito para reunir os amigos ou a família no meio da semana.',
      disclaimer: 'Válido apenas para consumo presencial (no local). Serve de 3 a 4 pessoas fartamente. OBS: Também fica ativa extraordinariamente em qualquer dia de jogo do Brasil na Copa!',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      badge: 'PROMOÇÃO HISTÓRICA',
      accentColor: 'from-amber-500/20 to-brand-amber/40',
      whatsappMsg: 'Ol%C3%A1%21%20Quero%20reservar%20uma%20mesa%20para%20a%20Quarta%20das%20T%C3%A1buas%20%28Pede%20a%20Inteira%2C%20Paga%20a%20Meia%21%29'
    },
    {
      day: 'Jogos do Brasil na Copa',
      shortDay: 'Copa 🇧🇷',
      tag: 'SELEÇÃO NA TELA & NA BRASA',
      title: 'Transmissão Ao Vivo & Promoção Quarta da Carne!',
      desc: 'Venha torcer pela nossa Seleção na esquina mais badalada da cidade! Transmitimos TODOS os jogos do Brasil ao vivo em nossas TVs para todo o público, com som integrado e o chopp trincando de gelado. E o melhor de tudo: em qualquer dia de jogo do Brasil na Copa, a nossa famosa PROMOÇÃO QUARTA DA CARNE (pede a tábua de carne inteira e paga o valor da meia-porção) estará 100% ATIVA durante toda a partida!',
      disclaimer: 'Promoção de tábuas de carne (Alcatra, Mignon ou Picanha) válida exclusivamente para consumo no local durante a transmissão dos jogos do Brasil na Copa. Não cumulativa com outras promoções.',
      imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop',
      badge: 'TRANSMISSÃO AO VIVO',
      accentColor: 'from-green-600/20 to-brand-amber/40',
      whatsappMsg: 'Ol%C3%A1%21%20Quero%20reservar%20uma%20mesa%20para%20assistir%20ao%20jogo%20do%20Brasil%20na%20Copa%20e%20aproveitar%20a%20promo%C3%A7%C3%A3o%2521'
    },
    {
      day: 'Quinta-feira',
      shortDay: 'Quinta',
      tag: 'QUINTA BURGER',
      title: '30% OFF em Hambúrgueres Artesanais!',
      desc: 'Os melhores blends artesanais grelhados na brasa com um desconto de 30% para você saborear. Pão selado, maionese artesanal e ingredientes frescos de verdade.',
      disclaimer: 'Exceto X-Burger, Burger Cordeiro, Burger Mignon e Burger Vegetariano. Válido apenas para consumo presencial no local.',
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
      badge: '30% DE DESCONTO',
      accentColor: 'from-orange-500/20 to-brand-orange/40',
      whatsappMsg: 'Ol%C3%A1%21%20Gostaria%20de%20reservar%20uma%20mesa%20para%20curtir%20a%20Quinta%20Burger%20com%2030%25%20OFF%21'
    },
    {
      day: 'Sexta-feira',
      shortDay: 'Sexta',
      tag: 'MÚSICA AO VIVO',
      title: 'Sexta Premium com Marco Aurélio & Amigos',
      desc: 'Sua sexta-feira com a melhor energia musical de Videira! Um repertório sertanejo de altíssimo nível, tocado de forma acústica com violão, sanfona e cajon.',
      disclaimer: 'Música ao vivo a partir das 20h30. Couvert artístico cobrado individualmente no caixa. Chegue cedo!',
      imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop',
      badge: 'SHOW AO VIVO - 20:30h',
      accentColor: 'from-brand-red/20 to-brand-red/40',
      whatsappMsg: 'Ol%C3%A1%21%20Gostaria%20de%20reservar%20uma%20mesa%20para%20o%20show%20de%20Sexta-feira%20com%20Marco%20Aur%C3%A9lio%20%26%20Amigos%21'
    },
    {
      day: 'Sazonal & Especiais',
      shortDay: 'Especiais',
      tag: 'EVENTOS E PARCERIAS',
      title: 'Feijoadas Completas & Pagode de Verão',
      desc: 'Sempre trazemos atrações esporádicas aos finais de semana: feijoadas preparadas na brasa com parcerias locais e o famoso Pagode de Verão ao ar livre.',
      disclaimer: 'Eventos anunciados de forma antecipada no nosso Instagram. Consulte os horários ativos para a temporada.',
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
      badge: 'SABER MAIS NO INSTAGRAM',
      accentColor: 'from-yellow-600/20 to-yellow-500/40',
      whatsappMsg: 'Ol%C3%A1%21%20Quero%20saber%20mais%20sobre%20os%20pr%C3%B3ximos%20eventos%20especiais%20e%20sazonais%20do%20Matriz%20Grill%21'
    }
  ];

  const currentAgenda = agendaDays.find(d => d.shortDay === selectedDay) || agendaDays[0];

  return (
    <section id="agenda" className="py-20 md:py-32 bg-gradient-to-b from-transparent via-black/40 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-brand-amber font-bold uppercase tracking-widest text-xs mb-3 block">Rotina da Esquina</span>
          <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-4">Agenda da <span className="text-brand-amber italic">Semana</span></h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm md:text-base font-light">As promoções e atrações que tornam o Matriz Grill o ponto de encontro preferido de Videira.</p>
        </div>

        {/* Copa Alert Ribbon */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12 bg-gradient-to-r from-green-950/40 via-yellow-950/20 to-green-950/40 border border-green-500/20 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 text-center md:text-left justify-between"
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/25">
              <Tv className="w-6 h-6 text-brand-amber animate-pulse" />
            </div>
            <div>
              <h4 className="font-display text-base md:text-lg uppercase tracking-wider text-brand-amber flex items-center justify-center md:justify-start gap-2">
                Copa na Tela, Promo na Mesa! <span className="text-[9px] px-2 py-0.5 bg-green-600 text-white font-black rounded uppercase tracking-widest leading-none">AO VIVO</span>
              </h4>
              <p className="text-xs text-white/70 font-light mt-1">
                TODOS os jogos do Brasil são transmitidos na TV com a <strong>Promoção Quarta da Carne</strong> ativa durante a partida!
              </p>
            </div>
          </div>
          <button 
            onClick={() => setSelectedDay('Copa 🇧🇷')}
            className="px-5 py-2.5 bg-brand-amber hover:bg-brand-gold text-black font-black uppercase tracking-widest rounded-lg text-[10px] transition-all shrink-0 cursor-pointer"
          >
            Ver Detalhes
          </button>
        </motion.div>

        {/* Tab Selection */}
        <div className="flex justify-start md:justify-center gap-2 mb-10 overflow-x-auto no-scrollbar py-2 -mx-6 px-6 md:mx-0 md:px-0">
          {agendaDays.map((item) => (
            <button
              key={item.shortDay}
              onClick={() => setSelectedDay(item.shortDay)}
              className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                selectedDay === item.shortDay
                  ? 'bg-brand-amber text-black shadow-lg shadow-brand-amber/20'
                  : 'glass text-white/50 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.shortDay}
            </button>
          ))}
        </div>

        {/* Selected Day Event Card */}
        <div className="relative glass border border-white/5 rounded-3xl overflow-hidden p-6 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-bg-dark/95 via-bg-dark/98 to-bg-dark opacity-90" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Image / Promotion Poster Theme */}
            <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-white/10 aspect-video lg:aspect-square">
              <img 
                src={currentAgenda.imageUrl} 
                alt={currentAgenda.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-brand-red text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md">
                {currentAgenda.badge}
              </div>
            </div>

            {/* Information */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <span className="text-brand-amber font-black tracking-[0.2em] text-[10px] uppercase mb-2">
                {currentAgenda.tag}
              </span>
              <h3 className="font-display text-2xl md:text-4xl uppercase tracking-tight text-white mb-4">
                {currentAgenda.title}
              </h3>
              <p className="text-white/70 text-sm font-light leading-relaxed mb-6">
                {currentAgenda.desc}
              </p>
              
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-6 flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-amber shrink-0 mt-0.5" />
                <span className="text-xs text-white/50 leading-relaxed font-light">
                  <span className="font-bold text-white uppercase block mb-1">Regras e Detalhes:</span>
                  {currentAgenda.disclaimer}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://wa.me/5549999328763?text=${currentAgenda.whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-brand-amber hover:bg-brand-amber/90 text-black font-black uppercase tracking-widest text-xs rounded-full flex items-center justify-center gap-2 shadow-lg shadow-brand-amber/10"
                >
                  <Phone className="w-4 h-4 fill-black" />
                  Reservar para {currentAgenda.shortDay}
                </motion.a>
                <a
                  href="https://www.instagram.com/matrizgrill.videira/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 border border-white/10 hover:border-brand-amber text-white font-bold uppercase tracking-widest text-xs rounded-full flex items-center justify-center gap-2 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-brand-amber" />
                  Ver Programação Completa
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HostsSection = () => {
  return (
    <section className="py-20 md:py-32 max-w-7xl mx-auto px-6 border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Texts */}
        <div className="lg:col-span-7 text-left">
          <span className="text-brand-amber font-bold uppercase tracking-widest text-xs mb-3 block">Quem Recebe Você</span>
          <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-6">Seco & Jorge <br /><span className="text-brand-wood italic">A Força da Esquina</span></h2>
          <p className="text-white/70 text-base font-light leading-relaxed mb-6">
            Por trás do ambiente contagiante e de cada churrasco impecável na brasa, está o carinho pessoal de quem comanda a casa. 
          </p>
          <p className="text-white/50 text-sm font-light leading-relaxed mb-8">
            O <span className="font-bold text-white">Seco (proprietário)</span>, com sua simpatia inconfundível, e o <span className="font-bold text-white">Jorge (gerente)</span>, garantindo que o atendimento flua de forma impecável, formam o coração do Matriz Grill. 
            Eles criaram um ponto de encontro ideal para jovens adultos, casais e famílias que prezam por boa música e descontração, mas que não abrem mão de segurança e conforto. 
            <span className="block mt-4 font-bold text-brand-amber">Aqui, garantimos um ambiente sempre selecionado, animado e totalmente sem baderna.</span>
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl bg-white/[0.01] border border-white/5">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-amber/10 flex items-center justify-center shrink-0">
                <Star className="text-brand-amber w-5 h-5 fill-brand-amber" />
              </div>
              <div>
                <h4 className="font-display text-xs uppercase text-white mb-1">Acolhimento Real</h4>
                <p className="text-xs text-white/40 font-light">Eles fazem questão de receber pessoalmente cada cliente.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-amber/10 flex items-center justify-center shrink-0">
                <Beer className="text-brand-amber w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-xs uppercase text-white mb-1">Público Selecionado</h4>
                <p className="text-xs text-white/40 font-light">Espaço familiar, seguro e propício para conversas e encontros.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="lg:col-span-5 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-amber/10 to-transparent blur-3xl rounded-full" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 group aspect-[4/5]">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop" 
              alt="Seco e Jorge com atendimento acolhedor" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 p-5 glass rounded-2xl text-left border border-white/10">
              <span className="text-brand-amber text-[9px] font-black uppercase tracking-widest block mb-1">Anfitriões Matriz</span>
              <p className="text-xs text-white/80 font-light italic leading-relaxed">
                "Nossa missão é fazer com que você chegue como cliente e saia como parte da nossa família, sempre com o melhor da noite de Videira."
              </p>
              <span className="text-[9px] text-white/30 block mt-3 text-right uppercase font-bold tracking-widest">— Seco & Jorge</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('Porções');
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);

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
      { name: 'Tábua Alcatra (Inteira)', price: 'R$ 120,00', desc: 'Alcatra grelhada na brasa fatiada. Acompanha batata frita, pão de alho, farofa especial, cebola grelhada e maionese.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop', promo: 'MEIA NA QUARTA' },
      { name: 'Tábua Filé Mignon (Inteira)', price: 'R$ 145,00', desc: 'Filé Mignon super macio grelhado na brasa. Acompanha batata frita, pão de alho, farofa especial, cebola grelhada e maionese.', image: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=400&auto=format&fit=crop', promo: 'MEIA NA QUARTA' },
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
      { name: 'Linguiça Campeira na Brasa 500g', price: 'R$ 47,00', desc: 'Linguiça de costela servida na chapa com farofa crocante e mostarda.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop' }
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
      { name: 'Tábua Alcatra (Meia)', price: 'R$ 85,00', desc: 'Alcatra grelhada na brasa. Acompanha batata frita, pão de alho, farofa especial e maionese.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop' },
      { name: 'Tábua Alcatra (Inteira)', price: 'R$ 120,00', desc: 'Alcatra inteira grelhada na brasa. Acompanha batata frita, pão de alho, farofa especial, cebola grelhada e maionese. (Pede a inteira e paga meia na Quarta-feira!)', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop', promo: 'MEIA NA QUARTA' },
      { name: 'Tábua Filé Mignon (Meia)', price: 'R$ 100,00', desc: 'Filé Mignon grelhado na brasa. Acompanha batata frita, pão de alho, farofa e maionese.', image: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=400&auto=format&fit=crop' },
      { name: 'Tábua Filé Mignon (Inteira)', price: 'R$ 145,00', desc: 'Filé Mignon inteiro na brasa. Acompanha batata frita, pão de alho, farofa, cebola grelhada e maionese. (Pede a inteira e paga meia na Quarta-feira!)', image: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=400&auto=format&fit=crop', promo: 'MEIA NA QUARTA' },
      { name: 'Tábua Picanha (Meia)', price: 'R$ 105,00', desc: 'Picanha fatiada premium na brasa. Acompanha batata frita, pão de alho, farofa e maionese.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop' },
      { name: 'Tábua Picanha (Inteira)', price: 'R$ 155,00', desc: 'Picanha inteira premium na brasa. Acompanha batata frita, pão de alho, farofa, cebola e maionese. (Pede a inteira e paga meia na Quarta-feira!)', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop', promo: 'MEIA NA QUARTA' }
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
      { name: 'Petit Gateau de Chocolate', price: 'R$ 21,00', desc: 'Bolinho quente de chocolate com recheio cremoso e derretido, servido com sorvete de creme.', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=400&auto=format&fit=crop' },
      { name: 'Brownie Especial com Sorvete', price: 'R$ 19,00', desc: 'Fatia generosa de brownie de chocolate com castanhas, servido quente com sorvete de creme.', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=400&auto=format&fit=crop' }
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
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 w-full md:w-auto -mx-6 px-6 md:mx-0 md:px-0">
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
                  href="https://wa.me/5549999328763?text=Ol%C3%A1%21%20Gostaria%20de%20fazer%20um%20pedido%20do%20Card%C3%A1pio%20do%20Matriz%20Grill%21" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-amber hover:bg-brand-gold text-black font-black uppercase tracking-widest text-xs rounded-full shadow-lg shadow-brand-amber/10 transition-transform hover:scale-105"
                >
                  Fazer Pedido no WhatsApp <Phone className="w-4 h-4 fill-black" />
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

const GallerySection = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop",
      title: "Ambiente Acolhedor",
      category: "Ambiente",
      size: "large"
    },
    {
      url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
      title: "Hambúrguer Artesanal",
      category: "Pratos",
      size: "small"
    },
    {
      url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop",
      title: "Música ao Vivo",
      category: "Show",
      size: "small"
    },
    {
      url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop",
      title: "Parrilla Premium",
      category: "Pratos",
      size: "medium"
    },
    {
      url: "https://images.unsplash.com/photo-1571767454098-246b94fbcf70?q=80&w=800&auto=format&fit=crop",
      title: "Chopp Gelado",
      category: "Bebidas",
      size: "small"
    },
    {
      url: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=800&auto=format&fit=crop",
      title: "Noite no Matriz",
      category: "Ambiente",
      size: "small"
    },
    {
      url: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1200&auto=format&fit=crop",
      title: "Porções Generosas",
      category: "Pratos",
      size: "medium"
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

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-brand-orange selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        <AuthorityMarquee />
        <BentoGrid />
        <AgendaSection />
        <MenuSection />
        <GallerySection />
        <HostsSection />
        
        {/* Location Section */}
        <section id="localizacao" className="py-20 md:py-32 bg-black/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -50 }}
                viewport={{ once: true }}
              >
                <span className="text-brand-amber font-bold uppercase tracking-widest text-xs mb-4 block">Como Chegar</span>
                <h2 className="font-display text-4xl md:text-7xl uppercase tracking-tighter mb-8 leading-tight">A Esquina <br /><span className="text-brand-wood italic">Mais Famosa</span></h2>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="text-brand-amber w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-display text-lg md:text-xl uppercase">Endereço</h4>
                      <p className="text-sm md:text-base text-white/60 font-light">Rua Padre Anchieta 304, Matriz<br />Videira, SC - 89560-000</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center shrink-0">
                      <Clock className="text-brand-amber w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="text-left">
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
                  className="mt-10 md:mt-12 inline-flex items-center gap-3 px-8 py-4 bg-brand-amber hover:bg-brand-gold text-black font-black uppercase tracking-widest rounded-full text-xs"
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
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-amber/10 rounded-full blur-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1200&auto=format&fit=crop" 
                alt="Matriz Grill Interior" 
                loading="lazy"
                className="rounded-3xl relative z-10 w-full h-[300px] md:h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 glass p-6 md:p-8 rounded-2xl z-20 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="text-3xl md:text-4xl font-display text-brand-amber">1996</div>
                  <div className="text-[9px] md:text-[10px] uppercase tracking-widest leading-tight text-white/60 text-left">Tradição de<br />Videira</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 text-left"
            >
              <span className="text-brand-amber font-bold uppercase tracking-widest text-xs mb-4 block">Nossa História</span>
              <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-6 md:mb-8 leading-tight">No coração <br /><span className="text-brand-amber">de Videira</span></h2>
              <p className="text-white/70 text-base font-light leading-relaxed mb-6">
                Fundado originalmente em <strong>1996</strong>, o Matriz Grill é um verdadeiro marco histórico da cidade de Videira. Em <strong>2023</strong>, a casa passou por uma completa reestruturação de posicionamento sob a gerência e nova administração de <strong>Seco</strong> e <strong>Jorge</strong>.
              </p>
              <p className="text-white/50 text-sm font-light leading-relaxed mb-8">
                Unindo a rica tradição do grill na brasa com o espírito moderno de música ao vivo acústica, consolidou-se como "a esquina mais badalada da cidade" — o destino preferido para jovens e famílias exigentes que desejam curtir com segurança, comida de alta qualidade e um clima festivo espetacular.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Clock className="text-brand-amber w-5 h-5 shrink-0" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Funcionamento</span>
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
    </div>
  );
}

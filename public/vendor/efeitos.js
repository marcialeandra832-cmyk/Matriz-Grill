(function(){
  var reduz=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desk=window.matchMedia('(min-width: 981px) and (pointer: fine)').matches;
  var pre=document.getElementById('pre');
  function fimPre(){document.body.classList.remove('carregando');try{sessionStorage.setItem('mgPre','1')}catch(e){}}
  if(document.body.classList.contains('sem-pre')||reduz){if(pre)pre.style.display='none';fimPre();}
  else{
    var n=document.getElementById('preNum'),t0=performance.now(),dur=1500;
    (function conta(t){var p=Math.min(1,(t-t0)/dur);n.textContent=Math.round(100*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(conta);else{pre.classList.add('sai');setTimeout(fimPre,250);setTimeout(function(){pre.style.display='none'},1100);}})(t0);
  }
  if(reduz||typeof gsap==='undefined'||typeof ScrollTrigger==='undefined'){document.querySelectorAll('.marquee').forEach(function(m){m.style.display='none'});return;}
  gsap.registerPlugin(ScrollTrigger);

  /* rolagem suave */
  if(typeof Lenis!=='undefined'){
    var lenis=new Lenis({lerp:.09,smoothWheel:true});
    window.__lenis=lenis;
    lenis.on('scroll',ScrollTrigger.update);
    gsap.ticker.add(function(t){lenis.raf(t*1000)});
    gsap.ticker.lagSmoothing(0);
    document.addEventListener('click',function(e){var a=e.target.closest('#rolar');if(a){e.stopImmediatePropagation();lenis.scrollTo(window.innerHeight-60)}},true);
  }

  var ctx=null;
  function montar(area){
    if(ctx){ctx.revert();ctx=null}
    document.querySelectorAll('.chapa.pinado').forEach(function(c){c.classList.remove('pinado')});
    if(!area)return;
    ctx=gsap.context(function(){
      var q=function(sel){return area.querySelectorAll(sel)};
      /* faixa corrida que acelera com a rolagem */
      var trilhoM=area.querySelector('#mTrilho');
      if(trilhoM){
        var mq=gsap.to(trilhoM,{xPercent:-50,duration:28,ease:'none',repeat:-1});
        ScrollTrigger.create({trigger:trilhoM.parentNode,start:'top bottom',end:'bottom top',onUpdate:function(st){var v=st.getVelocity(),d=v<0?-1:1;gsap.to(mq,{timeScale:d*(1+Math.min(Math.abs(v)/250,6)),duration:.3,overwrite:true});gsap.to(mq,{timeScale:d,duration:1.2,delay:.3})}});
      }
      /* abertura: vídeo encolhe e ganha borda ao rolar */
      var hero=area.querySelector('.hero');
      if(hero){
        gsap.to(hero.querySelector('.hero-midia'),{scale:.9,borderRadius:40,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:true}});
        gsap.to(hero.querySelector('.hero-conteudo'),{yPercent:-18,opacity:0,ease:'none',scrollTrigger:{trigger:hero,start:'20% top',end:'bottom top',scrub:true}});
      }
      /* palavras dos títulos subindo */
      q('.titulo,.topo-area .gigante,.atracao .gigante,.data-grande,.esquina h2,.porta .gigante').forEach(function(el){
        quebra(el);
        gsap.from(el.querySelectorAll('.w>span'),{yPercent:115,rotate:5,duration:1.1,ease:'expo.out',stagger:.07,scrollTrigger:{trigger:el,start:'top 88%',once:true}});
      });
      /* fotos que se revelam */
      q('.atracao figure,.recebem figure,.donos figure,.faixa-galera,.evento-esp figure,.colagem figure,.comparar').forEach(function(f){
        var img=f.querySelector('img');
        var tl=gsap.timeline({scrollTrigger:{trigger:f,start:'top 85%',once:true}});
        tl.fromTo(f,{clipPath:'inset(100% 0% 0% 0% round 28px)'},{clipPath:'inset(0% 0% 0% 0% round 28px)',duration:1.4,ease:'expo.out',clearProps:'clipPath'});
        if(img&&!f.classList.contains('comparar'))tl.fromTo(img,{scale:1.35},{scale:1,duration:1.6,ease:'expo.out'},0);
      });
      /* profundidade */
      var esq=area.querySelector('.esquina');
      if(esq)gsap.fromTo(esq.querySelector('img'),{yPercent:-6,scale:1.14},{yPercent:6,scale:1.14,ease:'none',scrollTrigger:{trigger:esq,start:'top bottom',end:'bottom top',scrub:true}});
      /* galeria de pratos na horizontal, com curva 3D conforme a velocidade */
      var chapa=area.querySelector('.chapa'),tr=chapa&&chapa.querySelector('.trilho');
      /* No Safari a galeria fica no modo simples (rolagem lateral com as setas): o modo "preso" calculava
         a distância errada ali e os pratos saíam da tela. */
      var safari=/^((?!chrome|chromium|android|crios|fxios|edg|opr).)*safari/i.test(navigator.userAgent);
      var pratos=tr?tr.querySelectorAll('.prato'):[];
      /* distância medida pelos próprios cartões (do primeiro ao último), com limite de segurança */
      var dist=function(){
        if(!pratos.length)return 0;
        var a=pratos[0].getBoundingClientRect(),b=pratos[pratos.length-1].getBoundingClientRect(),pad=parseFloat(getComputedStyle(tr).paddingLeft)||24;
        var d=(b.right-a.left)+pad*2-window.innerWidth+48;
        return (isFinite(d)&&d>0)?Math.min(d,pratos.length*420):0;
      };
      if(desk&&chapa&&tr&&!safari&&dist()>0){
        chapa.classList.add('pinado');
        gsap.to(tr,{x:function(){return -dist()},ease:'none',scrollTrigger:{trigger:chapa,start:'top top',end:function(){return '+='+dist()},pin:true,scrub:1,invalidateOnRefresh:true,
          onUpdate:function(st){var v=gsap.utils.clamp(-22,22,st.getVelocity()/-120);gsap.to(pratos,{rotateY:v,transformPerspective:1000,duration:.5,overwrite:'auto'})},
          onLeave:function(){gsap.to(pratos,{rotateY:0,duration:.6})},onLeaveBack:function(){gsap.to(pratos,{rotateY:0,duration:.6})}}});
      }
    },area);
    ScrollTrigger.refresh();
  }
  function quebra(el){
    if(el.dataset.split)return; el.dataset.split='1';
    (function anda(no){
      Array.prototype.slice.call(no.childNodes).forEach(function(c){
        if(c.nodeType===3){
          var partes=c.textContent.split(/(\s+)/),frag=document.createDocumentFragment();
          partes.forEach(function(p){ if(!p)return; if(/^\s+$/.test(p)){frag.appendChild(document.createTextNode(' '));return;} var w=document.createElement('span');w.className='w';var i=document.createElement('span');i.textContent=p;w.appendChild(i);frag.appendChild(w); });
          no.replaceChild(frag,c);
        } else if(c.nodeType===1 && c.tagName!=='BR' && !c.classList.contains('w')){anda(c);}
      });
    })(el);
  }

  if(desk){
    /* cursor */
    document.documentElement.classList.add('tem-cursor');
    var cur=document.getElementById('cur'),qx=gsap.quickTo(cur,'x',{duration:.35,ease:'power3'}),qy=gsap.quickTo(cur,'y',{duration:.35,ease:'power3'});
    window.addEventListener('pointermove',function(e){qx(e.clientX);qy(e.clientY)});
    document.addEventListener('pointerover',function(e){
      var ver=e.target.closest('.peca,.prato,.miniaturas button,.atracao figure,.evento-esp figure');
      var link=!ver&&e.target.closest('a,button,input[type=range]');
      cur.classList.toggle('ver',!!ver);cur.classList.toggle('link',!!link);
    });
    /* cartões em 3D */
    document.querySelectorAll('.prato figure,.peca,.atracao figure,.donos figure,.recebem figure,.evento-esp figure,.porta').forEach(function(el){
      el.classList.add('tilt');
      var forca=el.classList.contains('porta')?4:10;
      el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
        el.style.setProperty('--gx',(x*100)+'%');el.style.setProperty('--gy',(y*100)+'%');
        gsap.to(el,{rotateY:(x-.5)*forca*2,rotateX:(.5-y)*forca*2,transformPerspective:900,duration:.5,ease:'power3.out'});});
      el.addEventListener('pointerleave',function(){gsap.to(el,{rotateY:0,rotateX:0,duration:.9,ease:'elastic.out(1,.5)'})});
    });
    /* botões magnéticos */
    document.querySelectorAll('.btn-mel,.rolar,.nav .reservar').forEach(function(b){
      b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.25,y:(e.clientY-r.top-r.height/2)*.35,duration:.4,ease:'power3.out'})});
      b.addEventListener('pointerleave',function(){gsap.to(b,{x:0,y:0,duration:.7,ease:'elastic.out(1,.4)'})});
    });
  }
  window.__fxArea=function(id){montar(document.getElementById(id))};
  montar(document.querySelector('.area.ativa'));
  window.addEventListener('load',function(){ScrollTrigger.refresh()});
})();

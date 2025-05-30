const items = [
   { img: '/imgs/mockups/suco.png',
    title: 'Rótulos para Sucos',
    desc: 'Acabamento brilhante que valoriza sua marca e resiste à umidade da refrigeração.'
   },
  { img: '/imgs/mockups/picole.png',
    title: 'Rótulos para Picolés',
    desc: 'Impressão resistente ao frio e umidade, ideal para produtos congelados.'
  },
   { img: '/imgs/mockups/adesivos.png',
    title: 'Adesivos Personalizados',
    desc: 'Perfeito para ação de marketing, campanhas eleitorais e identificação em veículos, roupas e vitrines.'
  },
  { img: '/imgs/mockups/panfleto.png',
    title: 'Panfletos Promocionais',
    desc: 'Impressão em alta qualidade para divulgar seus produtos e serviços.'
  },
  { img: '/imgs/mockups/cartao.png',
    title: 'Cartões de Visita',
    desc: 'Design profissional e impressão de alta definição para causar uma ótima primeira impressão.'
  },
  { img: '/imgs/mockups/desinfetante.png',
    title: 'Rótulos para Produtos de Limpeza',
    desc: 'Alta resistência a produtos químicos e umidade, garantindo segurança e durabilidade.'
  },
  { img: '/imgs/mockups/copo.png',
    title: 'Copo Ecológico',
    desc: 'Perfeitos para personalização de copos descartáveis e reutilizáveis em eventos ou marcas.'
  },
  { img: '/imgs/mockups/bobina.png',
    title: 'Impressão em Bobina',
    desc: 'Ideal para grandes tiragens, com agilidade e compatibilidade para diversos sistemas de envase.'
  },
  { img: '/imgs/mockups/garrafa.png',
    title: 'Rótulos para Garrafas de Vidro',
    desc: 'Design sofisticado com excelente aderência para bebidas e produtos premium.'
  },
  { img: '/imgs/mockups/geleia.png',
    title: 'Rótulos para Potes de Vidro',
    desc: 'Rótulos charmosos e resistentes, ideais para produtos artesanais como geleias e conservas.'
  },
  { img: '/imgs/mockups/carne.png',
    title: 'Rótulos para Embalagens de Carne',
    desc: 'Etiquetas resistentes à umidade e baixas temperaturas, ideais para produtos resfriados ou congelados.'
  },
  { img: '/imgs/mockups/pao.png',
    title: 'Rótulos para Panificados',
    desc: 'Perfeitos para destacar produtos de padaria e confeitaria com visual apetitoso e informativo.'
  }
];

const slider = document.getElementById('product-slider');
let index = 0;
let visibleCount = 4;
let itemWidth = 0;
let autoplayInterval = null;
let resumeTimeout = null;

function renderSliderItems() {
  slider.innerHTML = '';
  const screenWidth = window.innerWidth;
  visibleCount = screenWidth < 640 ? 2 : 4;

  const fullItems = items.concat(items); 

  for (const item of fullItems) {
    const el = document.createElement('div');
    el.className = 'min-w-[50%] sm:min-w-[25%] p-2 box-border';
    el.innerHTML = `
<div class="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
  <img src="${item.img}" alt="${item.title}" class="w-full h-128 object-cover">
  <div class="p-4 flex flex-col flex-1 justify-between">
    <div>
      <h3 class="font-bold text-lg text-gray-800">${item.title}</h3>
      <p class="text-gray-600 text-sm mb-4">${item.desc}</p>
    </div>
    <a href="/loja/produto.html?produto=${encodeURIComponent(item.title)}" class="mt-auto inline-block bg-purple-900 hover:bg-purple-800 text-white text-sm px-4 py-2 rounded-full text-center transition">
      Saiba mais
    </a>
  </div>
</div>
`;
    slider.appendChild(el);
  }

  requestAnimationFrame(() => {
    if (slider.children.length > 0) {
      itemWidth = slider.children[0].offsetWidth;
      updateSlidePosition(false);
    }
  });
}

function updateSlidePosition(animate = true) {
  if (itemWidth === 0 && slider.children.length > 0) {
      itemWidth = slider.children[0].offsetWidth;
  }
  if (itemWidth === 0) return;

  slider.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none'; 
  slider.style.transform = `translateX(-${index * itemWidth}px)`; 
}

function nextSlide() {
  index++;

  if (index === items.length) { 
    updateSlidePosition(true); 
    setTimeout(() => {
      index = 0; 
      updateSlidePosition(false); 
    }, 500); 
  } else {
    updateSlidePosition(true); 
  }
}

function prevSlide() {
  index--;
  if (index < 0) {
    slider.style.transition = 'none';
    slider.style.transform = `translateX(-${items.length * itemWidth}px)`;
    index = items.length - 1;
    void slider.offsetHeight;

    updateSlidePosition(true);
  } else {
    updateSlidePosition(true);
  }
}

function pauseAutoplay() {
  clearInterval(autoplayInterval);
  clearTimeout(resumeTimeout);
  resumeTimeout = setTimeout(() => {
    autoplayInterval = setInterval(nextSlide, 2500); 
  }, 5000);
}

document.getElementById('nextBtn').addEventListener('click', () => {
  pauseAutoplay();
  nextSlide();
});

document.getElementById('prevBtn').addEventListener('click', () => {
  pauseAutoplay(); 
  prevSlide();
});

renderSliderItems();
autoplayInterval = setInterval(nextSlide, 2500); 


window.addEventListener('resize', () => {
  renderSliderItems(); 
  index = 0; 
  updateSlidePosition(false); 

  clearInterval(autoplayInterval);
  clearTimeout(resumeTimeout);
  autoplayInterval = setInterval(nextSlide, 2500);
});

if (typeof Hammer !== 'undefined') { 
  const hammer = new Hammer(slider); 
  hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL }); 

  hammer.on('swipeleft', () => {
    pauseAutoplay();
    nextSlide();
  });

  hammer.on('swiperight', () => {
    pauseAutoplay(); 
    prevSlide();
  });
} else {
  console.warn('Hammer.js não carregado. Funcionalidade de swipe não estará disponível.');
}
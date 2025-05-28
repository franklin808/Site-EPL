    const urlParams = new URLSearchParams(window.location.search);
    const nomeProduto = urlParams.get('produto');

    const produtos = {
      'Rótulos para Sucos': {
        desc: 'Acabamento brilhante que valoriza sua marca e resiste à umidade da refrigeração.',
        infoextra: 'suco',
        baseImg: 'suco'
      },
      'Rótulos para Picolés': {
        desc: 'Impressão resistente ao frio e umidade, ideal para produtos congelados.',
        infoextra: 'a',
        baseImg: 'picole'
      },
      'Adesivos Personalizados': {
        desc: 'Perfeito para ação de marketing, campanhas eleitorais e identificação em veículos, roupas e vitrines.',
        infoextra: 'a',
        baseImg: 'adesivos'
      },
      'Panfletos Promocionais': {
        desc: 'Impressão em alta qualidade para divulgar seus produtos e serviços.',
        infoextra: 'a',
        baseImg: 'panfleto'
      },
      'Cartões de Visita': {
        desc: 'Design profissional e impressão de alta definição para causar uma ótima primeira impressão.',
        infoextra: 'a',
        baseImg: 'copo'
      },
      'Rótulos para Produtos de Limpeza': {
        desc: '',
        infoextra: 'a',
        baseImg: 'desinfetante'
      },
      'Copo Ecológico': {
        desc: 'Acabamento brilhante que valoriza sua marca e resiste à umidade da refrigeração.',
        infoextra: 'a',
        baseImg: 'copo'
      },
      'Impressão em Bobina': {
        desc: '',
        infoextra: 'a',
        baseImg: 'bobina'
      },
      'Rótulos para Garrafas de Vidro': {
        desc: 'Design sofisticado com excelente aderência para bebidas e produtos premium.',
        infoextra: 'a',
        baseImg: 'garrafa'
      },
      'Rótulos para Potes de Vidro': {
        desc: 'Rótulos com qualidade e resistentes, ideais para produtos artesanais como geleias e conservas.',
        infoextra: 'a',
        baseImg: 'geleia'
      },
      'Rótulos para Embalagens de Carne': {
        desc: 'Etiquetas resistentes à umidade e baixas temperaturas, ideais para produtos resfriados ou congelados.',
        infoextra: 'a',
        baseImg: 'carne'
      },
      'Rótulos para Panificados': {
        desc: 'Perfeitos para destacar produtos de padaria e confeitaria com visual apetitoso e informativo.',
        infoextra: 'a',
        baseImg: 'pao'
      },
    };

    const produto = produtos[nomeProduto];

    if (produto) {
      document.getElementById('titulo').textContent = nomeProduto;
      document.getElementById('descricao').textContent = produto.desc;

      const base = produto.baseImg;
      const imgDir = '/imgs/mockups/';
      const imagemPrincipal = document.getElementById('imagem-principal');
      const thumbnailsContainer = document.getElementById('thumbnails');

      let imagens = [];
      let index = 1;

      function verificarImagem(url) {
        return new Promise(resolve => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = url;
        });
      }

      async function carregarImagens() {
        while (true) {
          const nomeArquivo = index === 1 ? `${base}.png` : `${base}${index}.png`;
          const caminhoCompleto = imgDir + nomeArquivo;

          const existe = await verificarImagem(caminhoCompleto);
          if (!existe) break;

          imagens.push(caminhoCompleto);
          index++;
        }

        if (imagens.length > 0) {
          imagemPrincipal.src = imagens[0];
          imagemPrincipal.alt = nomeProduto;

          imagens.forEach((imgUrl, i) => {
            const thumb = document.createElement('img');
            thumb.src = imgUrl;
            thumb.alt = nomeProduto + ' thumbnail ' + (i + 1);
            thumb.className = 'h-20 w-20 object-cover rounded-md border cursor-pointer hover:border-purple-500';
            thumb.addEventListener('click', () => {
              imagemPrincipal.src = imgUrl;
            });
            thumbnailsContainer.appendChild(thumb);
          });
        } else {
          imagemPrincipal.src = imgDir + 'erro404.png';
          imagemPrincipal.alt = 'Imagem não disponível';
        }
      }

      carregarImagens();
    } else {
      document.getElementById('titulo').textContent = 'Produto não encontrado';
      document.getElementById('descricao').textContent = 'Não foi possível localizar este produto.';
      document.getElementById('imagem-principal').src = '/imgs/erro404.png';
    }
    const urlParams = new URLSearchParams(window.location.search);
    const nomeProduto = urlParams.get('produto');

    const produto = produtos[nomeProduto];

    if (produto) {
      document.getElementById('titulo').textContent = nomeProduto;
      document.getElementById('descricao').textContent = produto.desc;

      const base = produto.baseImg;
      const imgDir = '/imgs/webp/';
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
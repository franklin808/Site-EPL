async function enviarMensagem(nome, email, telefone, mensagem) {
    const { data, error } = await supabase
      .from('contatos')
      .insert([{ nome, email, telefone, mensagem }]);

    if (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Ops! Não conseguimos enviar sua mensagem agora. Por favor, tente novamente em alguns instantes ou entre em contato por outro canal.');
    } else {
      console.log('Mensagem enviada:', data);
      alert('Mensagem enviada com sucesso! Obrigado pelo contato, responderemos em breve.');
    }
  }

  document.querySelector('#contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const telefone = document.querySelector('#telefone').value;
    const mensagem = document.querySelector('#mensagem').value;

    await enviarMensagem(nome, email, telefone, mensagem);
    e.target.reset();
  });
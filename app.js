// Inicializa o Supabase (certifique-se de que a URL e a key estão corretas)
const supabaseUrl = 'https://sfkhdqefmazimmscmjeg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNma2hkcWVmbWF6aW1tc2NtamVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MDcxNjgsImV4cCI6MjA2MTk4MzE2OH0.SQ2qzm2uKwWpKglu1EeyyGPOu13X_fg5bU5B-NURD5Q'; // Substitua pela chave completa
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Aguarda o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cadastro-form');
  const mensagem = document.getElementById('mensagem');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Coleta os dados do formulário
    const nome = document.getElementById('nome').value.trim();
    const produto = document.getElementById('produto').value.trim();
    const preco = parseFloat(document.getElementById('preco').value);
    const pais = document.getElementById('pais').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const telefone = document.getElementById('telefone').value.trim();

    // Feedback visual
    mensagem.textContent = 'Enviando...';
    mensagem.style.color = '#333';

    // Envia os dados para o Supabase
    const { data, error } = await supabase
      .from('mercados')
      .insert([{ nome, produto, preco, pais, cidade, bairro, endereco, telefone }]);

    if (error) {
      mensagem.textContent = '❌ Erro ao cadastrar: ' + error.message;
      mensagem.style.color = 'red';
    } else {
      mensagem.textContent = '✅ Cadastro realizado com sucesso!';
      mensagem.style.color = 'green';
      form.reset();
    }
  });
});



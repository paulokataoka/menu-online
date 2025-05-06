const supabaseUrl = 'https://sfkhdqefmazimmscmjeg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNma2hkcWVmbWF6aW1tc2NtamVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MDcxNjgsImV4cCI6MjA2MTk4MzE2OH0.SQ2qzm2uKwWpKglu1EeyyGPOu13X_fg5bU5B-NURD5Q'; // sua chave
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey); // ← CORREÇÃO


const input = document.getElementById('pesquisa');
const btnPesquisar = document.getElementById('btn-pesquisar');
const resultado = document.getElementById('resultado');

async function buscarProdutos(termo) {
  resultado.innerHTML = '<p>🔎 Buscando...</p>';

  const { data, error } = await supabase
    .from('mercados')
    .select('*')
    .ilike('produto', `%${termo}%`);

  // Debug visual e no console
  console.log('DEBUG → data:', data);
  console.log('DEBUG → error:', error);

  if (error) {
    resultado.innerHTML = `
      <p style="color:red;">❌ Erro na consulta Supabase: ${error.message}</p>
      <pre>${JSON.stringify(error, null, 2)}</pre>
    `;
    return;
  }

  if (!data || data.length === 0) {
    resultado.innerHTML = `
      <p>⚠️ Nenhum produto encontrado.</p>
      <p><strong>Termo pesquisado:</strong> "${termo}"</p>
    `;
    return;
  }

  resultado.innerHTML = `
    <p>✅ ${data.length} produto(s) encontrado(s) para: <strong>${termo}</strong></p>
    <hr style="margin: 20px 0;">
    ${data.map(item => `
      <div style="margin-bottom: 20px; border-bottom: 1px solid #30363d; padding-bottom: 10px;">
        <strong>${item.produto}</strong><br/>
        Preço: R$ ${parseFloat(item.preco).toFixed(2)}<br/>
        Mercado: ${item.nome}<br/>
        Local: ${item.bairro}, ${item.cidade} - ${item.pais}<br/>
        Endereço: ${item.endereco}<br/>
        Telefone: ${item.telefone || 'Não informado'}
      </div>
    `).join('')}
  `;
}

btnPesquisar.addEventListener('click', () => buscarProdutos(input.value));

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    buscarProdutos(input.value);
  }
});



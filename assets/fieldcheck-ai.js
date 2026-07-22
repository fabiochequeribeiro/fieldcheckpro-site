(function () {
  const question = document.getElementById('ai-question');
  const answer = document.getElementById('ai-answer');
  const send = document.getElementById('ai-send');
  if (!question || !answer || !send) return;
  document.querySelectorAll('.ai-examples button').forEach((button) => button.addEventListener('click', () => { question.value = button.textContent; question.focus(); }));
  send.addEventListener('click', async () => {
    const value = question.value.trim();
    if (value.length < 3) { answer.textContent = 'Escreva uma pergunta mais completa.'; answer.classList.add('visible'); return; }
    send.disabled = true; send.textContent = 'Analisando...'; answer.textContent = '';
    try {
      const manifest = await fetch('/downloads/app-manifest.json', { cache: 'no-store' }).then((response) => response.json());
      const response = await fetch(manifest.ai_api_url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: value, source: 'site' }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Assistente indisponível.');
      answer.textContent = payload.answer;
    } catch (error) { answer.textContent = `${error.message} Você também pode falar com nosso atendimento humano.`; }
    finally { answer.classList.add('visible'); send.disabled = false; send.textContent = 'Perguntar'; }
  });
})();

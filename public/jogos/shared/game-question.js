export function askGameQuestion({ title, prompt, options, answer, hint, explanation }, onContinue) {
  const dialog = document.createElement('dialog');
  dialog.className = 'game-question';
  dialog.setAttribute('aria-labelledby', 'game-question-title');
  dialog.setAttribute('aria-describedby', 'game-question-prompt');
  dialog.innerHTML = `
    <h2 id="game-question-title"></h2>
    <p id="game-question-prompt"></p>
    <div class="game-question-options"></div>
    <p class="game-question-feedback" role="status"></p>
    <button type="button" class="game-question-continue" hidden>Continuar</button>
  `;

  dialog.querySelector('h2').textContent = title;
  dialog.querySelector('#game-question-prompt').textContent = prompt;
  const choices = dialog.querySelector('.game-question-options');
  const feedback = dialog.querySelector('.game-question-feedback');
  const continueButton = dialog.querySelector('.game-question-continue');

  options.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = option;
    button.addEventListener('click', () => {
      const correct = index === answer;
      feedback.dataset.correct = String(correct);
      feedback.textContent = correct ? `Acertou! ${explanation}` : `Tente de novo. ${hint}`;
      button.dataset.correct = String(correct);
      if (correct) {
        for (const choice of choices.children) choice.disabled = true;
        continueButton.hidden = false;
        continueButton.focus();
      }
    });
    choices.append(button);
  });

  dialog.addEventListener('keydown', (event) => event.stopPropagation());
  dialog.addEventListener('cancel', (event) => event.preventDefault());
  continueButton.addEventListener('click', () => {
    dialog.close();
    dialog.remove();
    onContinue();
  });
  document.body.append(dialog);
  dialog.showModal();
}

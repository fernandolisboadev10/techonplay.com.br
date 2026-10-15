// Turns a ```prompt fenced block into a box with a copy button (the click handler lives in PostLayout.astro).
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default function remarkPromptBox({ label = 'Prompt', button = '📋 Copiar prompt' } = {}) {
  return (tree) => {
    let n = 0;
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (child.type === 'code' && child.lang === 'prompt') {
          const id = `prompt-${n++}`;
          return {
            type: 'html',
            value: `<div class="prompt-box"><div class="prompt-box-bar"><span>${label}</span><button type="button" class="copy-btn" data-copy-target="${id}">${button}</button></div><pre id="${id}" class="prompt-text">${esc(child.value)}</pre></div>`,
          };
        }
        walk(child);
        return child;
      });
    };
    walk(tree);
  };
}

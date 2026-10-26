// Scroll reveal. Progressive enhancement: content is visible by default; `html.js-motion` (set in
// BaseLayout only when reduced motion is off) hides [data-reveal] elements, and this file shows them.
// Motion is imported lazily, so pages without [data-reveal] never download it.
import { motionTokens as t } from './motion-tokens';

const root = document.documentElement;

function giveUp() {
  root.classList.add('motion-failed'); // CSS shows every [data-reveal] again
}

async function init() {
  if (!root.classList.contains('js-motion')) return;
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!items.length) return;

  const failTimer = window.setTimeout(giveUp, 3000);
  try {
    const { animate, inView, stagger } = await import('./motion-lib');
    window.clearTimeout(failTimer);

    const small = window.matchMedia('(max-width: 600px)').matches;
    const dist = small ? t.distance.small : t.distance.medium;
    const transition = { duration: t.duration.slow, ease: t.easing.smooth };
    const up = [`translateY(${dist}px)`, 'translateY(0px)'];

    // When the animation ends, hand control back to CSS (class, no inline styles) so hover transforms keep working.
    const settle = (els: HTMLElement[], anim: { finished: Promise<unknown> }) =>
      anim.finished.then(() =>
        els.forEach((e) => {
          e.classList.add('is-in');
          e.style.removeProperty('opacity');
          e.style.removeProperty('transform');
        }),
      );

    inView(
      items,
      (el) => {
        const kind = el.dataset.reveal || 'up';
        if (kind === 'group') {
          const kids = Array.from(el.children) as HTMLElement[];
          settle(kids, animate(kids, { opacity: [0, 1], transform: up }, { ...transition, delay: stagger(t.stagger) }));
          return;
        }
        const from = kind === 'fade' ? {} : kind === 'scale' ? { transform: ['scale(0.98)', 'scale(1)'] } : { transform: up };
        settle([el], animate(el, { opacity: [0, 1], ...from }, transition));
      },
      { margin: '0px 0px -8% 0px' },
    );
  } catch {
    window.clearTimeout(failTimer);
    giveUp();
  }
}

init();

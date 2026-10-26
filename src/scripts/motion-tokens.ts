// Motion system: the only place with timing, easing and distance numbers for JS animations.
// CSS counterparts live in global.css (--dur-*, --ease-*); keep both in sync.
export const motionTokens = {
  duration: { fast: 0.2, normal: 0.45, slow: 0.6 },
  easing: { smooth: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  distance: { small: 10, medium: 18 },
  stagger: 0.05,
};

// Link rules for posts (see "Regras de links" in CLAUDE.md):
// - at most MAX_BODY_EXTERNAL distinct external links in the body (before the references block)
// - no external link in the first EARLY_ZONE of the body; internal links come first
// - the references block at the end ("Fontes", "Fontes consultadas", "Referências") has no limit
export const MAX_BODY_EXTERNAL = 3;
export const EARLY_ZONE = 0.3;

const REFS_RE = /^(?:#{1,6}\s+)?\**(?:Fontes|Referências)(?:\s+consultadas)?\s*:?\**\s*(?=\[|$)/im;
const LINK_RE = /(?<!!)\[([^\]]*)\]\(([^)\s]+)\)/g;

export const isExternal = (u) =>
  /^https?:\/\//.test(u) && !/^https?:\/\/(www\.)?techonplay\.com(\.br)?(\/|$)/.test(u);

export function splitBody(body) {
  const i = body.search(REFS_RE);
  return i === -1 ? { main: body, refs: '' } : { main: body.slice(0, i), refs: body.slice(i) };
}

export function bodyLinks(main) {
  return [...main.matchAll(LINK_RE)].map((m) => ({
    text: m[1],
    url: m[2],
    index: m.index,
    length: m[0].length,
    pos: m.index / Math.max(main.length, 1),
  }));
}

export { LINK_RE };

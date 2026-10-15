import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'blog'>;

// Scheduling rule: a post goes live once its `date` has passed. The site is static, so a scheduled
// workflow rebuilds it at the publishing hours (see .github/workflows/deploy.yml) and posts dated
// in the future stay out of every listing, page, feed and sitemap until then.
// In `astro dev` drafts and scheduled posts are shown so they can be previewed; builds are unchanged.
export const isPublished = ({ data }: Pick<Post, 'data'>): boolean =>
  import.meta.env.DEV || (!data.draft && data.date.getTime() <= Date.now());

// Feed rule: a post's position is its latest activity, the newer of the creation date (`date`)
// and the last edit (`updated`). Ties fall back to the creation date, then to the slug, so the
// order is always deterministic. Give same-day posts a time (e.g. 2026-09-30T15:40:00-03:00)
// to control the order between them.
export const activityTime = (post: Post): number =>
  Math.max(post.data.date.getTime(), post.data.updated?.getTime() ?? 0);

export const sortByActivity = (posts: Post[]): Post[] =>
  [...posts].sort(
    (a, b) =>
      activityTime(b) - activityTime(a) ||
      b.data.date.getTime() - a.data.date.getTime() ||
      a.id.localeCompare(b.id),
  );

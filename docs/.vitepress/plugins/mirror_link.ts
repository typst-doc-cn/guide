import MarkdownIt from 'markdown-it';

import { PROFILE, type Profile } from '../config_profile';
import { removePrefix } from '../util';

/** A replaceable URL prefix. */
type Prefix = `https://${string}/`;

// `default` is mandatory, others are optional.
const MIRROR_REGISTRY: (Partial<Record<Profile, Prefix>> & {
  default: Prefix;
})[] = [
  {
    default: 'https://typst-doc-cn.github.io/guide/',
    cloudflare: 'https://guide.typst.dev/',
    vercel: 'https://typst.dev/guide/',
    netlify: 'https://luxury-mochi-9269a9.netlify.app/',
  },
  {
    default: 'https://typst-doc-cn.github.io/tutorial/',
    cloudflare: 'https://tutorial.typst.dev/',
    vercel: 'https://typst.dev/tutorial/',
  },
  {
    default: 'https://typst-doc-cn.github.io/docs/',
    cloudflare: 'https://docs.typst.dev/',
    vercel: 'https://typst.dev/docs/',
  },
  {
    default: 'https://typst-doc-cn.github.io/news/',
    cloudflare: 'https://news.typst.dev/',
    vercel: 'https://typst.dev/news/',
  },
  {
    default: 'https://typst-doc-cn.github.io/clreq/',
    netlify: 'https://gap.zhtyp.art/',
  },
];

/**
 * Transform a given URL. Returns null if unchanged.
 */
function transform(url: string): string | null {
  for (const mirror of MIRROR_REGISTRY) {
    if (PROFILE !== 'default' && PROFILE in mirror) {
      if (url.startsWith(mirror.default)) {
        return mirror[PROFILE] + removePrefix(url, mirror.default);
      }
    }
    if (url === mirror.default.slice(0, -1)) {
      // This warning should always be shown, regardless of the profile.
      console.warn(
        `Only links with trailing slashes can be replaced with a mirror, but found ${url}. Please add a trailing slash.`,
      );
    }
  }
  return null;
}

/** Transform a given URL to the mirror selected via the profile. */
export function toMirror(url: Prefix): Prefix;
export function toMirror(url: string): string {
  return transform(url) ?? url;
}

export default function mirror_link(md: MarkdownIt): void {
  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const href = token.attrGet('href');
    const no_mirror = token.attrGet('data-no-mirror') === 'true';

    if (href !== null && !no_mirror) {
      const mirrored = transform(href);
      if (mirrored !== null) {
        token.attrSet('href', mirrored);
      }
    }

    return defaultRender(tokens, idx, options, env, self);
  };
}

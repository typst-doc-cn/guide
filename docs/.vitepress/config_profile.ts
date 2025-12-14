import { env } from 'node:process';

export type Profile = 'default' | 'netlify' | 'cloudflare' | 'vercel';

export const PROFILE: Profile =
  (env.VP_PROFILE as Profile | undefined) ?? 'default';
// VP stands for VitePress.

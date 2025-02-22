export function makeTags(tags: string | string[] | undefined): string[] {
  if (!tags) {
    return [];
  } else if (typeof tags === 'string') {
    return [tags];
  } else {
    return tags.sort();
  }
}

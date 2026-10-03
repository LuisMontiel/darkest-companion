import { describe, expect, it } from 'vitest';
import { getProvisionWikiUrl } from './provisionLinks';

describe('provision wiki links', () => {
  it('links provision labels to their official wiki pages', () => {
    expect(getProvisionWikiUrl('Food')).toBe('https://darkestdungeon.wiki.gg/wiki/Food');
    expect(getProvisionWikiUrl('Medicinal Herb')).toBe('https://darkestdungeon.wiki.gg/wiki/Medicinal_Herbs');
    expect(getProvisionWikiUrl('Dog Treats')).toBe('https://darkestdungeon.wiki.gg/wiki/Dog_Treats');
    expect(getProvisionWikiUrl('Skeleton Keys')).toBe('https://darkestdungeon.wiki.gg/wiki/Skeleton_Key');
  });

  it('does not link non-provision activators', () => {
    expect(getProvisionWikiUrl('Nothing')).toBeUndefined();
  });
});

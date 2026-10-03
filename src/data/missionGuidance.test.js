import { describe, expect, it } from 'vitest';
import { LENGTHS, LOCATIONS } from '../ducks/mission';
import { getExpeditionLengthGuidance, getLocationGuidance } from './missionGuidance';

describe('mission guidance data', () => {
  it('provides hero advice and source links for every selectable location', () => {
    LOCATIONS.forEach(location => {
      const guidance = getLocationGuidance(location);

      expect(guidance.heroes.length).toBeGreaterThan(0);
      expect(guidance.sources).toHaveLength(2);
      expect(guidance.heroes.every(hero => hero.image.startsWith('./images/heroes/'))).toBe(true);
      expect(guidance.heroes.every(hero => hero.imageSource.includes('darkestdungeon.wiki.gg/wiki/File:'))).toBe(true);
    });
  });

  it('provides camping and planning advice for every expedition length', () => {
    LENGTHS.forEach(length => {
      expect(getExpeditionLengthGuidance(length)).toMatchObject({
        campCount: expect.any(Number),
        summary: expect.any(String),
        tips: expect.any(Array),
        sources: expect.arrayContaining([
          expect.objectContaining({ label: 'Official wiki.gg' }),
          expect.objectContaining({ label: 'Fandom wiki' }),
        ]),
      });
    });
  });

  it('marks recommendations inferred from zone mechanics as synergies', () => {
    const plagueDoctor = getLocationGuidance('cove').heroes.find(({ name }) => name === 'Plague Doctor');

    expect(plagueDoctor.recommendationType).toBe('synergy');
  });
});

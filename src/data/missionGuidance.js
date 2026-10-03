const source = (label, url) => ({ label, url });

const heroPortraitFiles = {
  crusader: 'Crusader.png',
  'grave-robber': 'Grave_Robber.png',
  'bounty-hunter': 'BountyHunter.png',
  houndmaster: 'Hound_Master.png',
  hellion: 'Hellion.png',
  flagellant: 'The_Flagellant.png',
  jester: 'Jester.png',
  'plague-doctor': 'Plague_Doctor.png',
  occultist: 'Occultist.png',
  leper: 'Leper.png',
};

const wikiLocationSources = location => [
  source('Official wiki.gg', `https://darkestdungeon.wiki.gg/wiki/${location}#Party_Composition`),
  source('Fandom wiki', `https://darkestdungeon.fandom.com/wiki/${location}#Party_Composition`),
];

const hero = (name, image, reason, wikiPage, recommendationType = 'guide') => ({
  name,
  image: `./images/heroes/${image}.png`,
  imageSource: `https://darkestdungeon.wiki.gg/wiki/File:${heroPortraitFiles[image]}`,
  reason,
  wikiPage: `https://darkestdungeon.wiki.gg/wiki/${wikiPage}`,
  recommendationType,
});

const locationGuidance = {
  ruins: {
    notes: [
      'Bleed is less effective because skeletons have very high Bleed resistance.',
    ],
    heroes: [
      hero('Crusader', 'crusader', 'Deals bonus damage to the common Unholy enemies.', 'Crusader_(Darkest_Dungeon)'),
      hero('Grave Robber', 'grave-robber', 'Can act quickly to stop Bone Courtiers before their stress attacks.', 'Grave_Robber_(Darkest_Dungeon)'),
    ],
    sources: wikiLocationSources('Ruins'),
  },
  warrens: {
    notes: [
      'Bleed attacks are useful against the area’s enemies; Blight is less effective.',
    ],
    heroes: [
      hero('Bounty Hunter', 'bounty-hunter', 'Bonus damage against Human enemies; pairs well with the Houndmaster’s Beast bonuses.', 'Bounty_Hunter_(Darkest_Dungeon)'),
      hero('Houndmaster', 'houndmaster', 'Bonus damage against Beast enemies, which are common in the Warrens.', 'Houndmaster_(Darkest_Dungeon)'),
      hero('Hellion', 'hellion', 'An effective front-line choice with Bleed attacks.', 'Hellion_(Darkest_Dungeon)'),
      hero('Flagellant', 'flagellant', 'An effective front-line choice with Bleed attacks.', 'Flagellant_(Darkest_Dungeon)'),
      hero('Jester', 'jester', 'Can apply Bleed to multiple enemies and help relieve stress.', 'Jester_(Darkest_Dungeon)'),
    ],
    sources: wikiLocationSources('Warrens'),
  },
  weald: {
    notes: [
      'Bleed, debuff and move skills are effective; Blight is less effective against the high resistances here.',
    ],
    heroes: [
      hero('Plague Doctor', 'plague-doctor', 'Battlefield Medicine cures Blight and Bleed, both common in the Weald.', 'Plague_Doctor_(Darkest_Dungeon)'),
      hero('Occultist', 'occultist', 'Can reduce the damage of the Unclean Giant’s heavy attack.', 'Occultist_(Darkest_Dungeon)'),
      hero('Leper', 'leper', 'Can reduce the damage of the Unclean Giant’s heavy attack.', 'Leper_(Darkest_Dungeon)'),
      hero('Houndmaster', 'houndmaster', 'Target Whistle is useful against the fungi.', 'Houndmaster_(Darkest_Dungeon)'),
    ],
    sources: wikiLocationSources('Weald'),
  },
  cove: {
    notes: [
      'Blight is effective and Bleed is less effective. Stun resistance and PROT on front-line heroes are useful.',
    ],
    heroes: [
      hero('Occultist', 'occultist', 'Deals bonus damage against Eldritch enemies.', 'Occultist_(Darkest_Dungeon)'),
      hero('Plague Doctor', 'plague-doctor', 'Her Blight attacks match the Cove’s low Blight resistance.', 'Plague_Doctor_(Darkest_Dungeon)', 'synergy'),
    ],
    sources: wikiLocationSources('Cove'),
  },
};

const expeditionLengthGuidance = {
  short: {
    campCount: 0,
    summary: 'A handful of rooms; the least risky and least rewarding length.',
    tips: [
      'Camping is not available, so no camping skills can be used to recover or prepare.',
    ],
  },
  medium: {
    campCount: 1,
    summary: 'A larger dungeon with branches and greater supply needs.',
    tips: [
      'One Firewood is provided for a single camp.',
      'Boss missions are always Medium length.',
    ],
  },
  long: {
    campCount: 2,
    summary: 'A much larger dungeon with more branches and dead ends, especially at higher difficulty.',
    tips: [
      'Two Firewood are provided; plan where to camp and bring ample food and torches.',
      'Careful exploration and stress management are essential.',
    ],
  },
};

const expeditionSources = [
  source('Official wiki.gg', 'https://darkestdungeon.wiki.gg/wiki/Expeditions#Expedition_length'),
  source('Fandom wiki', 'https://darkestdungeon.fandom.com/wiki/Expedition#Expedition_length'),
];

export function getLocationGuidance(location) {
  return locationGuidance[location];
}

export function getExpeditionLengthGuidance(length) {
  const guidance = expeditionLengthGuidance[length];

  return guidance ? { ...guidance, sources: expeditionSources } : undefined;
}

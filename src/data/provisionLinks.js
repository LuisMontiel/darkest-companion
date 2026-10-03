const wikiPagesByProvisionLabel = {
  Antivenom: 'Antivenom',
  Antivenoms: 'Antivenom',
  Bandage: 'Bandage',
  Bandages: 'Bandage',
  'Dog Treats': 'Dog_Treats',
  Firewood: 'Firewood',
  Food: 'Food',
  'Holy Water': 'Holy_Water',
  'Holy Waters': 'Holy_Water',
  'Medicinal Herb': 'Medicinal_Herbs',
  'Medicinal Herbs': 'Medicinal_Herbs',
  Shovel: 'Shovel',
  Shovels: 'Shovel',
  'Skeleton Key': 'Skeleton_Key',
  'Skeleton Keys': 'Skeleton_Key',
  Torch: 'Torch',
  Torches: 'Torch',
};

export function getProvisionWikiUrl(label) {
  const page = wikiPagesByProvisionLabel[label];
  return page ? `https://darkestdungeon.wiki.gg/wiki/${page}` : undefined;
}

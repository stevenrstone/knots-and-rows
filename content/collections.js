const collectionsOrder = [
  'Cotton',
  'Handpaints',
  'Lumos',
  'Speckles',
  'Tonals',
  'Accessories',
  'Prints',
];

const sortCollections = (collections) => {
  let arbitrarySortValue = collections.length;
  const sortedCollections = collections.map((collection) => {
    const newIndex = collectionsOrder.indexOf(collection.title);
    if (newIndex >= 0) {
      return {
        ...collection,
        sort: collectionsOrder.indexOf(collection.title),
      };
    }
    arbitrarySortValue += 1;
    return {
      ...collection,
      sort: arbitrarySortValue,
    };
  });
  return sortedCollections.sort((a, b) => a.sort - b.sort);
};

export { collectionsOrder, sortCollections };

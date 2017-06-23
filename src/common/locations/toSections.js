import { sortListByMode } from '../__lib/utils';

export default ({ categories, locations, match, sortMode }) => {
  // console.log('locations to sections vars', categories, locations, match);
  let ids = {},
    noCategoryIndex,
    { category } = match.params;
  if (category) {
    categories = categories.filter(item => item.id === category);
  } else {
    categories = sortListByMode(categories, sortMode.name);
  }
  let sections = categories.map((item, i) => {
    ids[item.id] = i;
    return {
      ...item,
      data: [],
    };
  });

  locations.forEach(item => {
    let index = ids[item.category];
    if (index === undefined) {
      if (category) return;
      if (noCategoryIndex === undefined) {
        noCategoryIndex =
          sections.push({
            name: 'No category',
            id: 'No-category',
            data: [],
          }) - 1;
      }
      index = noCategoryIndex;
    }
    item.coords = item.coords.replace(/,\s*/, ', ');
    sections[index].data.push(item);
  });
  sections = sections.filter(item => item.data.length);
  sections.forEach(section => {
    section.data = sortListByMode(section.data, sortMode.name);
  });
  return sections;
};

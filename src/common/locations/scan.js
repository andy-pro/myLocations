const scan = (categories, locations) => {

  /*
    dataBlod = {
      categoryId_1: {category1, rows: {location1Id: {}, locationId2: {}, ...}},
    }
    sectionIds = [categoryId_1, ...]
    rowIds = [[locationId1, ...], [locationIdN, ...]]  
  */
  
  // console.log('Categories', JSON.stringify(categories));

  let dataBlob = {},
      sectionIds = [],
      rowIds = [[]]  

  if (categories.length && locations.length) {

    // categories.concat([{name: 'No category', id: 0}])
    [{name: 'No category', id: 0}].concat(categories)
      .forEach((item, index) => {
        let id = item.id
        dataBlob[id] = {
          ...item,
          count: 0,
          rows: {},
          // index: index + 1,
          index
        }
        sectionIds.push(id)
        rowIds.push([])
      })

    // console.log('SectionIds', JSON.stringify(sectionIds));

    locations.forEach(item => {
      let { id, category=0 } = item,
          section = dataBlob[category],
          index = section ? section.index : 0
      // console.log('section', JSON.stringify(section));
      if (!index) section = dataBlob[0] // without category
      // console.log('===index===', index, item.name, item.category);
      rowIds[index].push(id)
      section.rows[id] = item
      section.count++
    })
  
  }

  // console.log('=== result of scan ===');console.log('dataBlob:', JSON.stringify(dataBlob,null,2));console.log('sectionIds:', JSON.stringify(sectionIds));console.log('rowIds:', JSON.stringify(rowIds));
  return { dataBlob, sectionIds, rowIds }

}

export default scan

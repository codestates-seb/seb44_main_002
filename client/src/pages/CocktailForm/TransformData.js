// tags -> degree / flavor
export const divisionTags = (tags) => {
  const degreeMapping = {
    '# 도수 높음': 'frequency_high',
    '# 도수 보통': 'frequency_medium',
    '# 도수 낮음': 'frequency_low',
  };

  const flavorMapping = {
    '# 단맛': 'sweet',
    '# 새콤': 'sour',
    '# 쓴맛': 'bitter',
  };

  let degreeResult = null;
  const flavorResult = [];

  for (const item of tags) {
    const tag = item.tag;
    if (degreeMapping[tag]) {
      degreeResult = degreeMapping[tag];
    } else if (flavorMapping[tag]) {
      flavorResult.push({ tag: flavorMapping[tag] });
    } else {
      console.log('태그들이 없음');
    }
  }

  return { degree: degreeResult, flavor: flavorResult };
};

// 베이스 술 변환
export const transformLiquor = (liquor) => {
  const liquorMapping = {
    럼: 'rum',
    리큐르: 'liqueur',
    위스키: 'whiskey',
    보드카: 'vodka',
    데낄라: 'tequila',
    진: 'gin',
  };

  const transformedLiquor = liquorMapping[liquor] || liquor;

  return transformedLiquor;
};

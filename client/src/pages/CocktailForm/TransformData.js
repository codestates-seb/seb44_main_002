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

// 속재료 분리
export const transformBaseIngredients = (baseIngredients) => {
  const baseIngredientsMapping = {
    소금: '소금',
    설탕: '설탕',
    레몬즙: '레몬즙',
    라임즙: '라임즙',
    과일음료: '과일음료',
    탄산음료: '탄산음료',
    민트: '민트',
    얼음: '얼음',
    우유: '우유',
  };

  const transformedbaseIngredients = baseIngredients.map((item) => {
    const ingredientName = item.ingredient;
    const mappedIngredient = baseIngredientsMapping[ingredientName];
    return { ingredient: mappedIngredient || ingredientName };
  });

  return transformedbaseIngredients;
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

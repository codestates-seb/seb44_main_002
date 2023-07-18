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

// 속재료 한글 -> 영어
export const transformIngredients = (ingredients) => {
  const ingredientsMapping = {
    소금: 'salt',
    설탕: 'sugar',
    레몬즙: 'lemonSqueeze',
    라임즙: 'limeSqueeze',
    과일음료: 'beverage',
    탄산음료: 'soda',
    민트: 'mint',
    얼음: 'ice',
    우유: 'milk',
  };

  const transformedIngredients = ingredients.map((item) => {
    const ingredientName = item.ingredient;
    const mappedIngredient = ingredientsMapping[ingredientName];
    return { ingredient: mappedIngredient || ingredientName };
  });

  return transformedIngredients;
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

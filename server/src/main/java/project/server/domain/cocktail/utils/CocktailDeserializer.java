package project.server.domain.cocktail.utils;

import project.server.domain.cocktail.dto.CocktailDto;
import project.server.domain.cocktail.embed.category.CategoryMapper;
import project.server.domain.cocktail.embed.ingredient.Ingredients;
import project.server.domain.cocktail.embed.liquor.LiquorMapper;
import project.server.domain.cocktail.embed.rate.Rate;
import project.server.domain.cocktail.embed.recipe.Recipe;
import project.server.domain.cocktail.embed.tag.Tag;
import project.server.domain.cocktail.embed.tag.TagDto;
import project.server.domain.cocktail.embed.tag.TagMapper;
import project.server.domain.cocktail.embed.tag.Tags;
import project.server.domain.cocktail.entity.Cocktail;

import java.util.List;
import java.util.stream.Collectors;

public class CocktailDeserializer {

    public static Cocktail postDtoToEntity(CocktailDto.Post dto) {
        List<Tag> tags =dto.getFlavor().stream()
                .map(TagDto.Post::getTag)
                .map(TagMapper::map)
                .collect(Collectors.toList());
        tags.add(TagMapper.map(dto.getDegree()));

        return Cocktail.builder()
                .name(dto.getName())
                .imageUrl(dto.getImageUrl())
                .recipe(new Recipe(dto.getRecipe()))
                .tags(new Tags(tags))
                .category(CategoryMapper.map(dto.getLiquor()))
                .rate(new Rate())
                .liquor(LiquorMapper.map(dto.getLiquor()))
                .ingredients(new Ingredients(dto.getBaseIngredients(), dto.getAdditionalIngredients()))
                .build();
    }
}

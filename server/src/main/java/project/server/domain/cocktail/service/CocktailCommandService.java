package project.server.domain.cocktail.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.domain.cocktail.embed.tag.Tag;
import project.server.domain.cocktail.embed.tag.TagMapper;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.repository.CocktailRepository;
import project.server.domain.user.entity.User;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CocktailCommandService {

    private final CocktailRepository cocktailRepository;

    public CocktailCommandService(CocktailRepository cocktailRepository) {
        this.cocktailRepository = cocktailRepository;
    }

    @Transactional
    public Cocktail create(User user, Cocktail cocktail) {
        cocktail.assignUser(user);
        user.write(cocktail);
        return cocktailRepository.save(cocktail);
    }

    @Transactional
    public void delete(Cocktail cocktail) {
        cocktailRepository.delete(cocktail);
    }

    @Transactional
    public void modify(Cocktail cocktail, CocktailDto.Patch patch) {
        List<Tag> tags = patch.getFlavor().stream()
                .map(flavor -> TagMapper.map(flavor.getTag()))
                .collect(Collectors.toList());
        tags.add(TagMapper.map(patch.getDegree()));

        cocktail.modify(patch, tags);
    }
}

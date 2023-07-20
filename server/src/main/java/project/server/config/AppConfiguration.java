package project.server.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import project.server.domain.cocktail.embed.category.Category;
import project.server.domain.cocktail.embed.ingredient.Ingredients;
import project.server.domain.cocktail.embed.liquor.Liquor;
import project.server.domain.cocktail.embed.rate.Rate;
import project.server.domain.cocktail.embed.recipe.Recipe;
import project.server.domain.cocktail.embed.tag.Tag;
import project.server.domain.cocktail.embed.tag.Tags;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.repository.CocktailRepository;
import project.server.domain.user.User;
import project.server.domain.user.UserRepository;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AppConfiguration implements InitializingBean {

    private final UserRepository userRepository;
    private final CocktailRepository cocktailRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void afterPropertiesSet() throws Exception{
        init();
    }

    private void init() {
        createTestUsers();
        createCocktails();
    }

    public void createTestUsers(){
        User test1 = new User();
        test1.setName("test1");
        test1.setEmail("test1@test.com");
        test1.setPassword(passwordEncoder.encode("test1234"));
        test1.setGender("male");
        test1.setAge(29);
        userRepository.save(test1);

        User test2 = new User();
        test2.setName("test2");
        test2.setEmail("test2@test.com");
        test2.setPassword(passwordEncoder.encode("test1234"));
        test2.setGender("female");
        test2.setAge(31);
        userRepository.save(test2);

        User test3 = new User();
        test3.setName("test3");
        test3.setEmail("test3@test.com");
        test3.setPassword(passwordEncoder.encode("test1234"));
        test3.setGender("female");
        test3.setAge(34);
        userRepository.save(test3);

        User admin = new User();
        admin.setName("admin");
        admin.setEmail("shworud29@gmail.com");
        admin.setPassword(passwordEncoder.encode("test1234"));
        admin.setGender("male");
        admin.setAge(29);
        admin.setRoles(List.of("USER", "ADMIN"));
        userRepository.save(admin);
    }

    public void createCocktails(){
        Cocktail cocktail1 = Cocktail.builder().
                name("test1")
                .recipe(new Recipe(List.of("1", "2"), 0))
                .category(Category.CATEGORY1)
                .liquor(Liquor.RUM)
                .ingredients(new Ingredients(List.of()))
                .tags(new Tags(List.of(Tag.BITTER, Tag.FREQUENCY_MEDIUM)))
                .imageUrl("https://cocktail-project.s3.ap-northeast-2.amazonaws.com/%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%85%E1%85%A9%E1%84%83%E1%85%B3.jpeg")
                .rate(new Rate())
                .build();
        User user1 = userRepository.findById(1L).get();
        cocktail1.assignUser(user1);
        cocktailRepository.save(cocktail1);

        Cocktail cocktail2 = Cocktail.builder().
                name("test2")
                .recipe(new Recipe(List.of("1", "2"), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.WHISKEY)
                .imageUrl("https://cocktail-project.s3.ap-northeast-2.amazonaws.com/%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%85%E1%85%A9%E1%84%83%E1%85%B3.jpeg")
                .ingredients(new Ingredients(List.of()))
                .rate(new Rate())
                .tags(new Tags(List.of(Tag.SWEET, Tag.FREQUENCY_MEDIUM)))
                .build();
        User user2 = userRepository.findById(3L).get();
        cocktail2.assignUser(user2);
        cocktailRepository.save(cocktail2);

        Cocktail cocktail3 = Cocktail.builder().
                name("test3")
                .recipe(new Recipe(List.of("1", "2", "3"), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.WHISKEY)
                .imageUrl("https://cocktail-project.s3.ap-northeast-2.amazonaws.com/%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%85%E1%85%A9%E1%84%83%E1%85%B3.jpeg")
                .ingredients(new Ingredients(List.of()))
                .rate(new Rate())
                .tags(new Tags(List.of(Tag.SWEET, Tag.FREQUENCY_MEDIUM)))
                .build();
        User user3 = userRepository.findById(3L).get();
        cocktail3.assignUser(user3);
        cocktailRepository.save(cocktail3);
    }
}

//package project.server.global.config;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.InitializingBean;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//import project.server.domain.cocktail.embed.category.Category;
//import project.server.domain.cocktail.embed.ingredient.Ingredients;
//import project.server.domain.cocktail.embed.liquor.Liquor;
//import project.server.domain.cocktail.embed.rate.Rate;
//import project.server.domain.cocktail.embed.recipe.Recipe;
//import project.server.domain.cocktail.embed.tag.Tag;
//import project.server.domain.cocktail.embed.tag.Tags;
//import project.server.domain.cocktail.entity.Cocktail;
//import project.server.domain.cocktail.repository.CocktailRepository;
//import project.server.domain.user.entity.User;
//import project.server.domain.user.repository.UserRepository;
//
//import java.util.ArrayList;
//import java.util.LinkedHashSet;
//import java.util.List;
//import java.util.Set;
//
//@Component
//@RequiredArgsConstructor
//public class AppConfiguration implements InitializingBean {
//
//    private final UserRepository userRepository;
//    private final CocktailRepository cocktailRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    @Override
//    public void afterPropertiesSet() throws Exception {
//        init();
//    }
//
//    private User selectRandomUser(List<User> users) {
//        int index = (int) (Math.random()*users.size());
//        if(index == users.size()){
//            index--;
//        }
//        return users.get(index);
//    }
//}
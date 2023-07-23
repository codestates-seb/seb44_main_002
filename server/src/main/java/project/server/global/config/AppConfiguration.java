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
//    private void init() {
//        patchTestUsers();
//    }
//
//    public void patchTestUsers() {
//        userRepository.delete(userRepository.findById(8L).get());
//
//        User admin = userRepository.findById(1L).get();
//        admin.setProfileImageUrl("https://cocktail-project.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB+%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%91%E1%85%B5%E1%86%AF.jpeg");
//        userRepository.save(admin);
//
//        User jk = userRepository.findById(2L).get();
//        jk.setProfileImageUrl("https://cocktail-project.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB+%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%91%E1%85%B5%E1%86%AF.jpeg");
//        userRepository.save(jk);
//
//        User mj = userRepository.findById(3L).get();
//        mj.setProfileImageUrl("https://cocktail-project.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB+%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%91%E1%85%B5%E1%86%AF.jpeg");
//        userRepository.save(mj);
//
//        User cw = userRepository.findById(4L).get();
//        cw.setProfileImageUrl("https://cocktail-project.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB+%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%91%E1%85%B5%E1%86%AF.jpeg");
//        userRepository.save(cw);
//
//        User ty = userRepository.findById(5L).get();
//        ty.setProfileImageUrl("https://cocktail-project.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB+%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%91%E1%85%B5%E1%86%AF.jpeg");
//        userRepository.save(ty);
//
//        User sm = userRepository.findById(6L).get();
//        sm.setProfileImageUrl("https://cocktail-project.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB+%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%91%E1%85%B5%E1%86%AF.jpeg");
//        userRepository.save(sm);
//
//        User eh = userRepository.findById(7L).get();
//        eh.setProfileImageUrl("https://cocktail-project.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB+%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%91%E1%85%B5%E1%86%AF.jpeg");
//        userRepository.save(eh);
//
//        User test = new User();
//        test.setName("test");
//        test.setEmail("test@test.com");
//        test.setPassword(passwordEncoder.encode("test1234"));
//        test.setGender("male");
//        test.setAge(25);
//        test.setRoles(List.of("USER"));
//        userRepository.save(test);
//    }
//
//    public void createCocktails() {
//        User user1 = userRepository.findById(1L).get();
//        User user2 = userRepository.findById(2L).get();
//        User user3 = userRepository.findById(3L).get();
//        User user4 = userRepository.findById(4L).get();
//        User user5 = userRepository.findById(5L).get();
//        User user6 = userRepository.findById(6L).get();
//        User user7 = userRepository.findById(7L).get();
//
//        List<User> users = new ArrayList<>(List.of(user1, user2, user1, user3, user1, user4, user1, user5, user1, user6, user1, user7));
//
//        User choosenUser;
//
//        Cocktail paloma = Cocktail.builder()
//                .category(Category.CATEGORY1)
//                .liquor(Liquor.TEQUILA)
//                .name("팔로마")
//                .imageUrl("https://i.namu.wiki/i/YBIxjp_RnDjVtDLZeNwUl-8PDS6Og3zx1ORo8-eIdAF0J7FRpfTzDnu0tKbFivb-IT7acNmWOr9a8a1VI68_qzRYHz-Unn_QMWy8XYeISPMGOT48YyC5SJ4Q7DP8aMencSCaBALK_qfeUlWVnR3qKg.webp")
//                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("라임즘", "자몽소다", "라임", "얼음"))))
//                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다."
//                        , "데킬라 50ml를 넣어줍니다."
//                        , "라임즙 20ml를 넣어줍니다."
//                        , "자몽소다를 잔에 가득 채웁니다."
//                        , "가니시를 라임 웨지로 마무리합니다.")
//                        , 0))
//                .tags(new Tags(List.of(Tag.FREQUENCY_HIGH, Tag.SWEET, Tag.SOUR)))
//                .rate(new Rate())
//                .build();
//
//        choosenUser = selectRandomUser(users);
//        paloma.assignUser(choosenUser);
//        cocktailRepository.save(paloma);
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
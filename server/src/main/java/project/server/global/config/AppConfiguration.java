//package project.server.global.config;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.InitializingBean;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//import project.server.domain.bookmark.repository.BookmarkRepository;
//import project.server.domain.cocktail.repository.CocktailRepository;
//import project.server.domain.user.entity.User;
//import project.server.domain.user.repository.UserRepository;
//
//import java.util.List;
//
//@Component
//@RequiredArgsConstructor
//public class AppConfiguration implements InitializingBean {
//
//    private final UserRepository userRepository;
//    private final CocktailRepository cocktailRepository;
//    private final BookmarkRepository bookmarkRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    @Override
//    public void afterPropertiesSet() throws Exception {
//        init();
//    }
//
//    private void init() {
//        List<User>users = userRepository.findAll();
//        for(User user : users){
//            user.deleteAllBookmarks();
//            userRepository.save(user);
//        }
//        bookmarkRepository.deleteAll();
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
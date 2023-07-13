package project.server.domain.bookmark.service;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.bookmark.entity.Bookmark;
import project.server.domain.bookmark.repository.BookmarkRepository;
import project.server.domain.user.User;
import project.server.domain.user.UserService;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

import java.util.List;

@Service
public class BookmarkReadService {

    private final UserService userService;
    private final BookmarkRepository bookmarkRepository;

    public BookmarkReadService(UserService userService, BookmarkRepository bookmarkRepository) {
        this.userService = userService;
        this.bookmarkRepository = bookmarkRepository;
    }

    @Transactional(readOnly = true)
    public Bookmark findBookmarkByCocktailId(long cocktailId) {
        return bookmarkRepository.findByCocktailId(cocktailId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.BOOKMARK_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public List<Bookmark> readBestCocktails() {
        return bookmarkRepository.findBestCocktails();
    }

    @Transactional(readOnly = true)
    public List<Bookmark> readRecommendCocktails(String email) {
        User user = userService.findUserByEmail(email);
        Pageable pageable = PageRequest.ofSize(5).withPage(0);
        return bookmarkRepository.findRecommendCocktails(getUserAgeGroup(user),
                user.getGender(),
                pageable);
    }

    private int getUserAgeGroup(User user) {
        return user.getAge() / 10 * 10;
    }
}

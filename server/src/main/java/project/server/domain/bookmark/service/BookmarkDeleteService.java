package project.server.domain.bookmark.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.bookmark.entity.Bookmark;
import project.server.domain.bookmark.repository.BookmarkRepository;
import project.server.domain.user.User;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

@Service
public class BookmarkDeleteService {

    private final BookmarkRepository bookmarkRepository;

    public BookmarkDeleteService(BookmarkRepository bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
    }

    @Transactional
    public void delete(User user, Bookmark bookmark){
        if(!user.isBookmarked(bookmark.getCocktailId())){
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_USER);
        }
        bookmarkRepository.delete(bookmark);
    }
}

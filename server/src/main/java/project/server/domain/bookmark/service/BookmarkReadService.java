package project.server.domain.bookmark.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.bookmark.entity.Bookmark;
import project.server.domain.bookmark.repository.BookmarkRepository;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

@Service
public class BookmarkReadService {

    private final BookmarkRepository bookmarkRepository;

    public BookmarkReadService(BookmarkRepository bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
    }

    @Transactional(readOnly = true)
    public Bookmark findBookmarkByUserIdAndCocktailId(long userId, long cocktailId) {
        return bookmarkRepository.findByUserIdAndCocktailId(userId, cocktailId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.BOOKMARK_NOT_FOUND));
    }
}

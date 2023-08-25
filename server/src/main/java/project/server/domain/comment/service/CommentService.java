package project.server.domain.comment.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.service.CocktailQueryService;
import project.server.domain.comment.CommentSerializer;
import project.server.domain.comment.dto.CommentDto;
import project.server.domain.comment.entity.Comment;
import project.server.domain.comment.repository.CommentRepository;
import project.server.domain.user.entity.User;
import project.server.domain.user.service.UserService;
import project.server.global.exception.BusinessLogicException;
import project.server.global.exception.ExceptionCode;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final CommentSerializer commentSerializer;
    private final CocktailQueryService cocktailQueryService;
    private final UserService userService;

    public CommentService(CommentRepository commentRepository,
                          CommentSerializer commentSerializer, CocktailQueryService cocktailQueryService, UserService userService) {
        this.commentRepository = commentRepository;
        this.commentSerializer = commentSerializer;
        this.cocktailQueryService = cocktailQueryService;
        this.userService = userService;
    }

    @Transactional
    public CommentDto.Response createComment(String email, Long cocktailId, CommentDto.Post post) {
        User user = userService.findUserByEmail(email);
        Cocktail cocktail = cocktailQueryService.readCocktail(cocktailId);
        Comment comment = post.postToEntity();
        comment.setUser(user);
        Comment savedComment = commentRepository.save(comment);
        cocktail.addComment(savedComment);
        return commentSerializer.entityToResponse(savedComment);
    }

    @Transactional(readOnly = true)
    public CommentDto.Response readComment(long commentId) {
        Comment comment = findCommentById(commentId);
        return commentSerializer.entityToResponse(comment);
    }

    @Transactional
    public CommentDto.Response updateComment(String email, long commentId, CommentDto.Patch patch) {
        User user = userService.findUserByEmail(email);
        Comment comment = findCommentById(commentId);
        if(!user.hasAuthority(comment.getUserId())){
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_USER);
        }
        comment.setContent(patch.getContent());
        return commentSerializer.entityToResponse(comment);
    }

    @Transactional
    public void deleteComment(String email, long commentId, long cocktailId) {
        User user = userService.findUserByEmail(email);
        Comment comment = findCommentById(commentId);
        if(!user.hasAuthority(comment.getUserId())){
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_USER);
        }
        Cocktail cocktail = cocktailQueryService.readCocktail(cocktailId);
        cocktail.removeComment(comment);
        commentRepository.delete(comment);
    }

    @Transactional(readOnly = true)
    public Comment findCommentById(long commentId) {
        return commentRepository.findById(commentId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }
}

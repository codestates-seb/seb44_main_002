package project.server.domain.comment.service;

import org.springframework.stereotype.Service;
import project.server.domain.cocktail.service.CocktailService;
import project.server.domain.comment.dto.CommentDto;
import project.server.domain.comment.entity.Comment;
import project.server.domain.user.UserService;
import project.server.domain.comment.repository.CommentRepository;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

@Service
public class CommentService {
    private final UserService userService;
    private final CocktailService cocktailService;
    private final CommentRepository commentReposiotry;

    public CommentService(UserService userService,
                          CocktailService cocktailService,
                          CocktailService cocktailService1, CommentRepository commentReposiotry) {
        this.userService = userService;
        this.cocktailService = cocktailService1;
        this.commentReposiotry = commentReposiotry;
    }

    public CommentDto.Response createComment(CommentDto.Post post) {
        Comment comment = post.postToEntity();
        Comment savedComment = commentReposiotry.save(comment);
        return savedComment.entityToResponse();
    }

    public CommentDto.Response readComment(long commentId) {
        Comment comment = findCommentById(commentId);
        return comment.entityToResponse();
    }

    public Comment findCommentById(long commentId) {
        return commentReposiotry.findById(commentId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

    public Comment updateComment(CommentDto.Patch Patch) {
        Comment comment = findCommentById(Patch.getCommentId());
        comment.setContent(Patch.getContent());
        return commentReposiotry.save(comment);
    }

    public void deleteComment(long commentId) {
        Comment comment = findCommentById(commentId);
        commentReposiotry.delete(comment);
    }
}

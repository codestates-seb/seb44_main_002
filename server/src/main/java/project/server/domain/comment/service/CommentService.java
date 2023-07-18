package project.server.domain.comment.service;

import org.springframework.stereotype.Service;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.service.CocktailService;
import project.server.domain.comment.dto.CommentDto;
import project.server.domain.comment.entity.Comment;
import project.server.domain.comment.repository.CommentRepository;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final CocktailService cocktailService;

    public CommentService(CommentRepository commentRepository,
                          CocktailService cocktailService) {
        this.commentRepository = commentRepository;
        this.cocktailService = cocktailService;
    }

    public CommentDto.Response createComment(Long cocktailId, CommentDto.Post post) {
        Cocktail cocktail = cocktailService.findCocktailById(cocktailId);
        Comment comment = post.postToEntity();
        Comment savedComment = commentRepository.save(comment);
        return savedComment.entityToResponse();
    }

    public CommentDto.Response readComment(long commentId) {
        Comment comment = findCommentById(commentId);
        return comment.entityToResponse();
    }

    public CommentDto.Response saveComment(long commentId) {
        Comment comment = findCommentById(commentId);
        Comment savedComment = commentRepository.save(comment);
        return savedComment.entityToResponse();
    }

    public Comment findCommentById(long commentId) {
        return commentRepository.findById(commentId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

    public CommentDto.Response updateComment(Long commentId, CommentDto.Patch patch) {
        Comment comment = findCommentById(commentId);
        comment.setContent(patch.getContent());
        Comment savedComment = commentRepository.save(comment);
        return savedComment.entityToResponse();
    }

    public void deleteComment(long commentId) {
        Comment comment = findCommentById(commentId);
        commentRepository.delete(comment);
    }
}

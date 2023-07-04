package project.server.domain.comment.service;

import org.springframework.stereotype.Service;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.repository.CocktailRepository;
import project.server.domain.comment.dto.CommentDto;
import project.server.domain.comment.entity.Comment;
import project.server.domain.comment.repository.CommentRepository;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final CocktailRepository cocktailRepository;

    public CommentService(CommentRepository commentRepository,
                          CocktailRepository cocktailRepository) {
        this.commentRepository = commentRepository;
        this.cocktailRepository = cocktailRepository;
    }

    public CommentDto.Response createComment(Cocktail cocktailId, CommentDto.Post post) {
        Cocktail cocktail = cocktailRepository.findById(cocktailId.getCocktailId()).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.COCKTAIL_NOT_FOUND)
        );
        post.setCocktail(cocktail);
        Comment comment = post.postToEntity();
        Comment savedComment = commentRepository.save(comment);
        return savedComment.entityToRespose();
    }

    public CommentDto.Response readComment(long commentId) {
        Comment comment = findCommentById(commentId);
        return comment.entityToRespose();
    }

    public Comment findCommentById(long commentId) {
        return commentRepository.findById(commentId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

    public Comment updateComment(CommentDto.Patch patch) {
        Comment comment = findCommentById(patch.getCommentId());
        comment.setContent(patch.getContent());
        return commentRepository.save(comment);
    }

    public void deleteComment(long commentId) {
        Comment comment = findCommentById(commentId);
        commentRepository.delete(comment);
    }
}

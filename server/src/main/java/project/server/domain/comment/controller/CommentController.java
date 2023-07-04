package project.server.domain.comment.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.server.domain.comment.dto.CommentDto;
import project.server.domain.comment.entity.Comment;
import project.server.domain.comment.service.CommentService;
import project.server.domain.cocktail.entity.Cocktail;

import javax.validation.Valid;

@RestController
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity postComment(@PathVariable Cocktail cocktailId, @RequestBody CommentDto.Post post) {
        CommentDto.Response response = commentService.createComment(cocktailId, post);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id")
                                       @Valid @RequestBody CommentDto.Patch patch) {
        Comment response = commentService.updateComment(patch);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") long commentId) {
        CommentDto.Response response = commentService.readComment(commentId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") long commentId) {
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

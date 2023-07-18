package project.server.domain.comment.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import project.server.domain.comment.dto.CommentDto;
import project.server.domain.comment.service.CommentService;
import project.server.domain.user.AuthManager;
import project.server.utils.UnsignedPermission;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;
    private final AuthManager authManager;

    public CommentController(CommentService commentService, AuthManager authManager) {
        this.commentService = commentService;
        this.authManager = authManager;
    }

    @PostMapping("/{cocktail-id}")
    public ResponseEntity postComment(Authentication authentication,
                                      @PathVariable("cocktail-id") @Positive Long cocktailId,
                                      @Valid @RequestBody CommentDto.Post post) {
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        CommentDto.Response response = commentService.createComment(email, cocktailId, post);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive Long commentId,
                                       @Valid @RequestBody CommentDto.Patch patch) {
        CommentDto.Response response = commentService.updateComment(commentId, patch);
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

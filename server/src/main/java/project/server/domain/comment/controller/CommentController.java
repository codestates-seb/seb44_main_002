package project.server.domain.comment.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import project.server.domain.comment.dto.CommentDto;
import project.server.domain.comment.service.CommentService;
import project.server.global.auth.service.AuthManager;
import project.server.global.utils.UnsignedPermission;

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
    public ResponseEntity patchComment(Authentication authentication,
                                       @PathVariable("comment-id") @Positive long commentId,
                                       @Valid @RequestBody CommentDto.Patch patch) {
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        CommentDto.Response response = commentService.updateComment(email, commentId, patch);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") long commentId) {
        CommentDto.Response response = commentService.readComment(commentId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(Authentication authentication,
                                        @PathVariable("comment-id") long commentId,
                                        @RequestParam("cocktail-id") long cocktailId) {
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        commentService.deleteComment(email, commentId, cocktailId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

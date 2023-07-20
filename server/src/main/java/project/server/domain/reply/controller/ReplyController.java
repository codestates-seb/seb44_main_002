package project.server.domain.reply.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import project.server.domain.reply.dto.ReplyDto;
import project.server.domain.reply.service.ReplyService;
import project.server.domain.user.AuthManager;
import project.server.utils.UnsignedPermission;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/replies")
public class ReplyController {
    private final ReplyService replyService;
    private final AuthManager authManager;

    public ReplyController(ReplyService replyService, AuthManager authManager) {
        this.replyService = replyService;
        this.authManager = authManager;
    }

    @PostMapping("/{comment-id}")
    public ResponseEntity postReply(Authentication authentication,
                                    @PathVariable("comment-id") @Positive Long commentId,
                                    @Valid @RequestBody ReplyDto.Post post) {
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        ReplyDto.Response response = replyService.createReply(email, commentId, post);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PatchMapping("/{reply-id}")
    public ResponseEntity patchReply(@PathVariable("reply-id") @Positive Long replyId,
                                     @Valid @RequestBody ReplyDto.Patch patch) {
        ReplyDto.Response response = replyService.updateReply(replyId, patch);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{reply-id}")
    public ResponseEntity deleteReply(@PathVariable("reply-id") @Positive Long replyId) {
        replyService.deleteReply(replyId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

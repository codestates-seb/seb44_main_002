package project.server.domain.reply.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.server.domain.reply.dto.ReplyDto;
import project.server.domain.reply.service.ReplyService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/replies")
public class ReplyController {
    private final ReplyService replyService;

    public ReplyController (ReplyService replyService) {
        this.replyService = replyService;
    }

    @PostMapping("/{comment-id}")
    public ResponseEntity postReply(@PathVariable ("comment-id") @Positive Long commentId,
                                    @Valid @RequestBody ReplyDto.Post post) {
        ReplyDto.Response response = replyService.createReply(commentId, post);
        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchReply(@PathVariable("comment-id") @Positive Long replyId,
                                     @Valid @RequestBody ReplyDto.Patch patch) {
        ReplyDto.Response response = replyService.updateReply(replyId, patch);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity getReply(@PathVariable("comment-id") @Positive Long replyId) {
        ReplyDto.Response response = replyService.readReply(replyId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteReply(@PathVariable("comment-id") @Positive Long replyId) {
        replyService.deleteReply(replyId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

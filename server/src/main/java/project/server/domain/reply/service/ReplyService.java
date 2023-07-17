package project.server.domain.reply.service;

import org.springframework.stereotype.Service;
import project.server.domain.comment.entity.Comment;
import project.server.domain.comment.service.CommentService;
import project.server.domain.reply.repository.ReplyRepository;
import project.server.domain.reply.dto.ReplyDto;
import project.server.domain.reply.entity.Reply;
import project.server.domain.user.User;
import project.server.domain.user.UserService;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ReplyService {
    private final ReplyRepository replyRepository;
    private final CommentService commentService;
    private final UserService userService;

    public ReplyService(ReplyRepository replyRepository,
                        CommentService commentService,
                        UserService userService) {
        this.replyRepository = replyRepository;
        this.commentService = commentService;
        this.userService = userService;
    }

    public ReplyDto.Response createReply(String email, long commentId, ReplyDto.Post post) {
        User user = userService.findUserByEmail(email);
        Comment comment = commentService.findCommentById(commentId);
        Reply reply = post.postToEntity();
        reply.setCommentId(commentId);
        reply.setUserName(user.getName());
        reply.setUserId(user.getUserId());
        Reply savedReply = replyRepository.save(reply);
        comment.addReply(savedReply);
        return savedReply.entityToResponse();
    }


    public ReplyDto.Response updateReply(Long replyId, ReplyDto.Patch patch) {
        Reply reply = findReplyById(replyId);
        reply.setContent(patch.getContent());
        return reply.entityToResponse();
    }

    public Reply findReplyById(long replyId) {
        return replyRepository.findById(replyId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.REPLY_NOT_FOUND));
    }

    public void deleteReply(long replyId) {
        Reply reply = findReplyById(replyId);
        Comment comment = commentService.findCommentById(reply.getCommentId());
        List<Reply> replies = comment.getReplies();
        replies.remove(replyId);
        comment.setReplies(replies);
        commentService.saveComment(comment.getCommentId());
        replyRepository.delete(reply);
    }
    
}

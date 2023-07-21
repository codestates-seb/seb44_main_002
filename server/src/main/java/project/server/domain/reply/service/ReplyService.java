package project.server.domain.reply.service;

import org.springframework.stereotype.Service;
import project.server.domain.comment.entity.Comment;
import project.server.domain.comment.service.CommentService;
import project.server.domain.reply.ReplySerializer;
import project.server.domain.reply.repository.ReplyRepository;
import project.server.domain.reply.dto.ReplyDto;
import project.server.domain.reply.entity.Reply;
import project.server.domain.user.entity.User;
import project.server.domain.user.service.UserService;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

import javax.transaction.Transactional;

@Service
@Transactional
public class ReplyService {
    private final ReplyRepository replyRepository;
    private final ReplySerializer replySerializer;
    private final CommentService commentService;
    private final UserService userService;

    public ReplyService(ReplyRepository replyRepository,
                        ReplySerializer replySerializer, CommentService commentService,
                        UserService userService) {
        this.replyRepository = replyRepository;
        this.replySerializer = replySerializer;
        this.commentService = commentService;
        this.userService = userService;
    }

    public ReplyDto.Response createReply(String email, long commentId, ReplyDto.Post post) {
        User user = userService.findUserByEmail(email);
        Comment comment = commentService.findCommentById(commentId);
        Reply reply = post.postToEntity();
        reply.setCommentId(commentId);
        reply.setUser(user);
        Reply savedReply = replyRepository.save(reply);
        comment.addReply(savedReply);
        return replySerializer.entityToResponse(savedReply);
    }

    public ReplyDto.Response updateReply(String email, Long replyId, ReplyDto.Patch patch) {
        User user = userService.findUserByEmail(email);
        Reply reply = findReplyById(replyId);
        verifyUser(user, reply);
        reply.setContent(patch.getContent());
        return replySerializer.entityToResponse(reply);
    }

    public Reply findReplyById(long replyId) {
        return replyRepository.findById(replyId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.REPLY_NOT_FOUND));
    }

    public void deleteReply(long replyId) {
        Reply reply = findReplyById(replyId);
        Comment comment = commentService.findCommentById(reply.getCommentId());
        comment.deleteReply(reply);
        replyRepository.delete(reply);
    }

    private void verifyUser(User user, Reply reply) {
        if(!user.hasAuthority(reply.getUserId())){
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_USER);
        }
    }
}


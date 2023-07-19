package project.server.domain.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.server.domain.comment.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}

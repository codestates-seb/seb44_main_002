package project.server.domain.reply.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.server.domain.reply.entity.Reply;

public interface ReplyRepository extends JpaRepository<Reply, Long> {
}

package project.server.domain.bookmark.embed;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {

    @Column(updatable = false)
    private long userId;

    @Column(updatable = false)
    private int ageGroup;

    @Column(updatable = false)
    private String gender;
}

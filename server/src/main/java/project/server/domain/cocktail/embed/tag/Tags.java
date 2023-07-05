package project.server.domain.cocktail.embed.tag;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Embeddable
@NoArgsConstructor
@Getter
public class Tags {

    @ElementCollection(fetch = FetchType.LAZY)
    @Enumerated(value = EnumType.STRING)
    @CollectionTable(
            name = "cocktail_tag",
            joinColumns = @JoinColumn(name = "cocktail_id"))
    @Column(name = "tag")
    private List<Tag> tags;

    public Tags(List<TagDto.Post> tags) {
        this.tags = tags.stream()
                .map(TagDto.Post::getTag)
                .map(Tag::valueOf)
                .collect(Collectors.toList());
    }

    public List<TagDto.Response> createResponseList() {
        return tags.stream()
                .map(Enum::name)
                .map(this::createResponseDto)
                .collect(Collectors.toList());
    }

    private TagDto.Response createResponseDto(String tag) {
        return new TagDto.Response(tag);
    }

    public Tag getRandomTag() {
        return tags.get((int) (Math.random() * tags.size()));
    }
}

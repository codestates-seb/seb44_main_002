package project.server.domain.cocktail.embed.tag;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
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

    public Tags(List<Tag>tags){
        this.tags = tags;
    }

    public List<TagDto.Response> createResponseDtoList() {
        return tags.stream()
                .map(Tag::getTag)
                .map(this::createResponseDto)
                .collect(Collectors.toList());
    }

    public Tag getRandomTag() {
        return tags.get((int) (Math.random() * tags.size()));
    }

    public boolean containsAll(List<Tag> tags) {
        return new HashSet<>(this.tags).containsAll(tags);
    }

    private TagDto.Response createResponseDto(String tag) {
        return new TagDto.Response(tag);
    }

    public void add(Tag degree) {
        tags.add(degree);
    }
}

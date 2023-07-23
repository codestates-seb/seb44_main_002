package project.server.global.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class MultiResponseDto<T> {
    private final List<T> data;

    public MultiResponseDto(List<T> data) {
        this.data = data;
    }
}

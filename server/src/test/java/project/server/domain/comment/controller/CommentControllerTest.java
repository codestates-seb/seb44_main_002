package project.server.domain.comment.controller;

import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.comment.dto.CommentDto;
import project.server.domain.comment.entity.Comment;
import project.server.domain.comment.service.CommentService;

import java.time.LocalDateTime;
import java.util.ArrayList;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles(profiles = "server")
public class CommentControllerTest {
    @MockBean
    private CommentService commentService;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;

    @DisplayName("댓글 등록")
    @Test
    @WithMockUser
    void postCommentTest() throws Exception {
        // given
        CommentDto.Post commentDto = new CommentDto.Post();

        CommentDto.Response response = CommentDto.Response.builder()
                    .userId(1L)
                    .commentId(1L)
                    .userName("a")
                    .content("post comment test")
                    .replies(new ArrayList<>())
                    .createdAt(LocalDateTime.now())
                    .build();

        when(commentService.createComment(Mockito.anyString(), Mockito.anyLong(), Mockito.any(CommentDto.Post.class))).thenReturn(response);

        String content = gson.toJson(commentDto);

        // when
        ResultActions actions =
                mockMvc.perform(
                        post("/comments/1")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );
        // then
        actions
                .andExpect(status().isCreated());
    }

    @DisplayName("댓글 수정")
    @Test
    @WithMockUser
    void patchCommentTest() throws Exception {
        // given
        CommentDto.Patch commentDto = new CommentDto.Patch();
        commentDto.setContent("patch comment test");

        Comment response = new Comment();
        response.setCommentId(1L);
        response.setContent("patch comment test");
        response.setCocktail(Cocktail.builder().build());
        response.setUserId(1L);
        response.setUserName("a");
        response.setCreatedAt(LocalDateTime.now());
        response.setModifiedAt(LocalDateTime.now());
        response.setReplies(new ArrayList<>());

        String content = gson.toJson(commentDto);
        when(commentService.updateComment(Mockito.anyLong(), Mockito.any(CommentDto.Patch.class))).thenReturn(response.entityToResponse());

        // when
        ResultActions actions =
                mockMvc.perform(
                        patch("/comments/1")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        // then
        actions
                .andExpect(status().isOk());
    }

    @DisplayName("댓글 조회")
    @Test
    void getCommentTest() throws Exception {
        // given
        Comment comment = new Comment();
        comment.setCommentId(1L);
        comment.setContent("let see the commentssss");
        comment.setCocktail(Cocktail.builder().build());
        comment.setUserId(1L);
        comment.setUserName("a");
        comment.setCreatedAt(LocalDateTime.now());
        comment.setModifiedAt(LocalDateTime.now());
        comment.setReplies(new ArrayList<>());

        when(commentService.readComment(Mockito.anyLong())).thenReturn(comment.entityToResponse());

        // when
        ResultActions actions =
                mockMvc.perform(
                        get("/comments/1")
                                .accept(MediaType.APPLICATION_JSON)
                );

        // then
        actions.andExpect(status().isOk());
    }

    @DisplayName("댓글 삭제")
    @Test
    void deleteCommentTest() throws Exception{
        ResultActions actions =
                mockMvc.perform(
                        delete("/comments/1")
                );

        actions.andExpect(status().isNoContent());
    }
}
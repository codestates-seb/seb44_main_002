package project.server.domain.reply.controller;

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
import project.server.domain.reply.TaggedUserInfo;
import project.server.domain.reply.dto.ReplyDto;
import project.server.domain.reply.entity.Reply;
import project.server.domain.reply.service.ReplyService;

import java.time.LocalDateTime;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles(profiles = "server")
public class ReplyControllerTest {
    @MockBean
    private ReplyService replyService;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;

    @DisplayName("답글 등록")
    @Test
    @WithMockUser
    void postReplyTest() throws Exception {
        // given
        ReplyDto.Post replyDto = new ReplyDto.Post();
        ReplyDto.Response response = ReplyDto.Response.builder()
                .replyId(1L)
                .userId(1L)
                .userName("a")
                .taggedUserInfo(new TaggedUserInfo())
                .content("post reply test")
                .createdAt(LocalDateTime.now())
                .modifiedAt(LocalDateTime.now())
                .build();

        when(replyService.createReply(Mockito.anyString(), Mockito.anyLong(), Mockito.any(ReplyDto.Post.class))).thenReturn(response);
        String content = gson.toJson(replyDto);

        // when
        ResultActions actions =
                mockMvc.perform(
                        post("/replies/1")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        // then
        actions.andExpect(status().isCreated());
    }

    @DisplayName("답글 수정")
    @Test
    @WithMockUser
    void patchReplyTest() throws Exception {
        // given
        ReplyDto.Patch replyDto = new ReplyDto.Patch();
        replyDto.setContent("patch reply test");

        Reply response = new Reply();
        response.setReplyId(1L);
        response.setUserId(1L);
        response.setUserName("a");
        response.setTaggedUserInfo(new TaggedUserInfo());
        response.setContent("patch reply test");
        response.setCreatedAt(LocalDateTime.now());
        response.setModifiedAt(LocalDateTime.now());

        String content = gson.toJson(replyDto);
        when(replyService.updateReply(Mockito.anyLong(), Mockito.any(ReplyDto.Patch.class))).thenReturn(response.entityToResponse());

        // when
        ResultActions actions =
                mockMvc.perform(
                        patch("/replies/1")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        // then
        actions.andExpect(status().isOk());
    }

    @DisplayName("답글 삭제")
    @Test
    void deleteReplyTest() throws Exception {
        ResultActions actions =
                mockMvc.perform(
                        delete("/replies/1")
                );

        actions.andExpect(status().isNoContent());
    }
}

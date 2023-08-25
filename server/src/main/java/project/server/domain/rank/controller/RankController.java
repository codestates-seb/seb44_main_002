package project.server.domain.rank.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.server.domain.rank.dto.RankDto;
import project.server.domain.rank.service.RankService;
import project.server.global.auth.service.AuthManager;
import project.server.global.utils.UnsignedPermission;

@RestController
@RequestMapping("/rank")
@Slf4j
public class RankController {

    private final RankService rankService;
    private final AuthManager authManager;

    public RankController(RankService rankService, AuthManager authManager) {
        this.rankService = rankService;
        this.authManager = authManager;
    }

    @GetMapping("/unsigned")
    public ResponseEntity getRankForUnsignedUsers(){
        log.info("# RankController#getRankForUnsignedUsers 실행");
        RankDto.UnsignedResponse response = rankService.readRankForUnsignedUser();
        log.info("# RankController#getRankForUnsignedUsers 완료");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/signed")
    public ResponseEntity getRankForSignedUsers(Authentication authentication){
        log.info("# RankController#getRankForSignedUsers 실행");
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        RankDto.SignedResponse response = rankService.readRankForSignedUser(email);
        log.info("# RankController#getRankForSignedUsers 완료");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

package project.server.domain.recommend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.server.domain.recommend.service.RecommendService;
import project.server.domain.recommend.dto.RecommendDto;
import project.server.global.auth.service.AuthManager;
import project.server.global.utils.UnsignedPermission;

@RestController
@RequestMapping("/recommend")
@Slf4j
public class RecommendController {

    private final RecommendService recommendService;
    private final AuthManager authManager;

    public RecommendController(RecommendService recommendService, AuthManager authManager) {
        this.recommendService = recommendService;
        this.authManager = authManager;
    }

    @GetMapping("/unsigned")
    public ResponseEntity getRecommendCocktailsForUnsignedUsers(){
        log.info("# 비로그인 사용자용 추천 칵테일 목록 조회");
        RecommendDto.UnsignedResponse response = recommendService.readRecommendCocktailsForUnsignedUser();
        log.info("# 비로그인 사용자용 추천 칵테일 목록 조회 완료");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/signed")
    public ResponseEntity getRecommendCocktailsForSignedUsers(Authentication authentication){
        log.info("# 로그인 사용자용 추천 칵테일 목록 조회");
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        RecommendDto.SignedResponse response = recommendService.readRecommendCocktailsForSignedUser(email);
        log.info("# 로그인 사용자용 추천 칵테일 목록 조회 완료");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

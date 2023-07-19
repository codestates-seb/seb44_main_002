package project.server.domain.follow.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import project.server.domain.follow.service.FollowService;
import project.server.domain.user.AuthManager;
import project.server.utils.UnsignedPermission;

@RestController
@RequestMapping("/follow")
public class FollowController {

    private final FollowService followService;
    private final AuthManager authManager;

    public FollowController(FollowService followService, AuthManager authManager) {
        this.followService = followService;
        this.authManager = authManager;
    }

    @PostMapping("create/{user-id}")
    public ResponseEntity postFollow(Authentication authentication,
                                     @PathVariable("user-id") long userId){
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        followService.createFollow(email, userId);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("cancel/{user-id}")
    public ResponseEntity deleteFollow(Authentication authentication,
                                       @PathVariable("user-id") long userId){
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        followService.removeFollow(email, userId);
        return ResponseEntity.noContent().build();
    }
}

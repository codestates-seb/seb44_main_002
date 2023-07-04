//package project.server.auth.controller;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import project.server.auth.dto.LoginDto;
//import project.server.auth.jwt.JwtTokenizer;
//import project.server.domain.user.UserRepository;
//
//import javax.validation.Valid;
//
//@RestController
//@Slf4j
//@RequestMapping("/auth")
//public class AuthController {
//    private final AuthenticationManager authenticationManager;
//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final JwtTokenizer jwtTokenizer;
//
//    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenizer jwtTokenizer) {
//        this.authenticationManager = authenticationManager;
//        this.userRepository = userRepository;
//        this.passwordEncoder = passwordEncoder;
//        this.jwtTokenizer = jwtTokenizer;
//    }
//
//    @PostMapping("/signin")
//    public ResponseEntity authenticateUser(@Valid @RequestBody LoginDto requestBody) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(requestBody.getEmail(),requestBody.getPassword()));
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//    }
//}

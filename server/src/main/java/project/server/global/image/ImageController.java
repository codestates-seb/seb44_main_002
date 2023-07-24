package project.server.global.image;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Slf4j
public class ImageController {

    private final ImageService imageService;

    public ImageController (ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/upload/users")
    public ResponseEntity userProfileImageUpload(@RequestParam("file") MultipartFile file) {
        ImageDto.Response response = imageService.uploadUserProfileImage(file);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/upload/cocktails")
    public ResponseEntity cocktailProfileImageUpload(@RequestParam("file") MultipartFile file) {
        log.info("# 이미지 등록");
        ImageDto.Response response = imageService.uploadCocktailImage(file);
        log.info("# 이미지 등록 완료");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}

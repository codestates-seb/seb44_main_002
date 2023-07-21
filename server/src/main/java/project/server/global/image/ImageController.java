package project.server.global.image;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Positive;

@RestController
public class ImageController {

    private final ImageService imageService;

    public ImageController (ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/upload/users/{user-id}")
    public ResponseEntity userProfileImageUpload(@RequestParam("file") MultipartFile file,
                                   @PathVariable("user-id") @Positive long userId) {
        ImageDto.Response response = imageService.uploadUserProfileImage(file, userId);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/upload/cocktails")
    public ResponseEntity cocktailProfileImageUpload(@RequestParam("file") MultipartFile file) {
        ImageDto.Response response = imageService.uploadCocktailImage(file);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}

package project.server;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import project.server.domain.cocktail.service.CocktailService;
import project.server.domain.user.User;
import project.server.domain.user.UserService;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

@Service
@Slf4j
public class ImageService {

    @Value("${cloud.aws.s3.bucket}")
    public String S3_BUCKET_NAME;

    private final UserService userService;
    private final S3Client s3Client;

    public ImageService(UserService userService, S3Client s3Client) {
        this.userService = userService;
        this.s3Client = s3Client;
    }

    @Transactional
    public ImageDto.Response uploadUserProfileImage(MultipartFile file, long userId) {
        if (file.isEmpty()) {
            // 파일이 없는 경우 처리
            throw new BusinessLogicException(ExceptionCode.IMAGE_UPLOAD_EXCEPTION);
        }

        String objectKey = StringUtils.cleanPath(file.getOriginalFilename());


        try {
            // S3에 업로드
            s3Client.putObject(PutObjectRequest.builder()
                    .bucket(S3_BUCKET_NAME)
                    .key(objectKey)
                    .build(), RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            // Member 조회
            User user = userService.findUser(userId);

            // 파일 저장 경로 설정
            String filePath = "s3://" + S3_BUCKET_NAME + "/" + objectKey;

            // Member에 파일 경로 저장
            user.setProfileImageUrl(filePath);
            System.out.println("objectKey :" + objectKey);
            // 업로드 완료 후 추가 처리
            log.info("# Image upload Success");
            return new ImageDto.Response(filePath);


        } catch (IOException e) {
            // 업로드 중 에러 발생 시 처리
            throw new BusinessLogicException(ExceptionCode.IMAGE_UPLOAD_EXCEPTION);
        }
    }

    @Transactional
    public ImageDto.Response uploadCocktailImage(MultipartFile file) {
        if (file.isEmpty()) {
            // 파일이 없는 경우 처리
            throw new BusinessLogicException(ExceptionCode.IMAGE_UPLOAD_EXCEPTION);
        }

        String objectKey = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // S3에 업로드
            s3Client.putObject(PutObjectRequest.builder()
                    .bucket(S3_BUCKET_NAME)
                    .key(objectKey)
                    .build(), RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            // 파일 저장 경로 설정
            String filePath = "s3://" + S3_BUCKET_NAME + "/" + objectKey;

            // 업로드 완료 후 추가 처리
            log.info("# Image upload Success");
            return new ImageDto.Response(filePath);


        } catch (IOException e) {
            // 업로드 중 에러 발생 시 처리
            throw new BusinessLogicException(ExceptionCode.IMAGE_UPLOAD_EXCEPTION);
        }
    }
}

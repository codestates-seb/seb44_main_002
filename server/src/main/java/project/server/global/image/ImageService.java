package project.server.global.image;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import project.server.global.exception.BusinessLogicException;
import project.server.global.exception.ExceptionCode;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
@Slf4j
public class ImageService {

    @Value("${cloud.aws.s3.bucket}")
    public String S3_BUCKET_NAME;

    private final S3Client s3Client;

    public ImageService(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    @Transactional
    public ImageDto.Response uploadUserProfileImage(MultipartFile file) {
        if (file.isEmpty()) {
            // 파일이 없는 경우 처리
            throw new BusinessLogicException(ExceptionCode.IMAGE_UPLOAD_EXCEPTION);
        }

        String objectKey = LocalDateTime.now() + StringUtils.cleanPath(file.getOriginalFilename());


        try {
            // S3에 업로드
            s3Client.putObject(PutObjectRequest.builder()
                    .bucket(S3_BUCKET_NAME)
                    .key(objectKey)
                    .build(), RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            // 파일 저장 경로 설정
            String filePath = "https://" + S3_BUCKET_NAME + ".s3.ap-northeast-2.amazonaws.com/" + objectKey;

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
            log.info("# 이미지 파일이 없음");
            throw new BusinessLogicException(ExceptionCode.IMAGE_UPLOAD_EXCEPTION);
        }

        String objectKey = LocalDateTime.now() + StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // S3에 업로드
            s3Client.putObject(PutObjectRequest.builder()
                    .bucket(S3_BUCKET_NAME)
                    .key(objectKey)
                    .build(), RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            // 파일 저장 경로 설정
            String filePath = "https://" + S3_BUCKET_NAME + ".s3.ap-northeast-2.amazonaws.com/" + objectKey;

            // 업로드 완료 후 추가 처리
            log.info("# Image upload Success");
            return new ImageDto.Response(filePath);


        } catch (IOException e) {
            // 업로드 중 에러 발생 시 처리
            log.info("# 이미지 업로드 중 에러 발생");
            throw new BusinessLogicException(ExceptionCode.IMAGE_UPLOAD_EXCEPTION);
        }
    }
}

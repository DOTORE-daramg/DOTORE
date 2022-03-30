package com.daram.dotore.api.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import com.daram.dotore.api.request.ProfileUpdateReq;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigInteger;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@PropertySource("classpath:s3.properties")
@Service
public class AwsS3Service {
    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    /**
     * 프로필 이미지 업로드
     * S3버킷에 파일을 업로드하는 함수
     * 파일, 경로, request(사용자 주소, String)
     * 파일이 업로드된 경로(주소)를 반환
     */
    public String uploadFiles(MultipartFile multipartFile, String dirName, ProfileUpdateReq profileUpdateReq) throws IOException {
        File uploadFile = convert(multipartFile)  // 파일 변환할 수 없으면 에러
                .orElseThrow(() -> new IllegalArgumentException("error: MultipartFile -> File convert fail"));
        return upload(uploadFile, dirName, profileUpdateReq.getAddress());
    }

    public String upload(File uploadFile, String filePath,String address) {
        //String fileName = filePath + "/" + UUID.randomUUID() + uploadFile.getName();   // S3에 저장된 파일 이름
        String fileName = filePath + "/" + address + "&" + uploadFile.getName();   // S3에 저장된 파일 이름
        String uploadImageUrl = putS3(uploadFile, fileName); // s3로 업로드
        removeNewFile(uploadFile);
        return uploadImageUrl;
    }

    /**
     * 작품 업로드
     * S3버킷에 파일을 업로드하는 함수
     * 파일, 경로, request(사용자 주소, String)
     * 파일이 업로드된 경로(주소)를 반환
     */
    public String uploadItem(MultipartFile multipartFile, String dirName, BigInteger tokenId,String address) throws IOException {
        File uploadFile = convert(multipartFile)  // 파일 변환할 수 없으면 에러
                .orElseThrow(() -> new IllegalArgumentException("error: MultipartFile -> File convert fail"));
        return uploadMintedItem(uploadFile, dirName, tokenId, address);
    }

    public String uploadMintedItem(File uploadFile, String filePath, BigInteger tokenId,String address) {
        String fileName = filePath + "/" + tokenId + "&" + address;   // S3에 저장된 파일 이름
        String uploadImageUrl = putS3(uploadFile, fileName); // s3로 업로드
        removeNewFile(uploadFile);
        return uploadImageUrl;
    }

    // S3로 업로드
    private String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    // 로컬에 저장된 이미지 지우기
    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            System.out.println("File delete success");
            return;
        }
        System.out.println("File delete fail");
    }

    // 로컬에 파일 업로드 하기
    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(System.getProperty("user.dir") + "/" + file.getOriginalFilename());
        if (convertFile.createNewFile()) { // 바로 위에서 지정한 경로에 File이 생성됨 (경로가 잘못되었다면 생성 불가능)
            try (FileOutputStream fos = new FileOutputStream(convertFile)) { // FileOutputStream 데이터를 파일에 바이트 스트림으로 저장하기 위함
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

    /**
     * 프로필 이미지 file 삭제
     * @param fileKey
     */
    public void delete(String fileKey) {
        String key = fileKey.replace("https://dotore.s3.ap-northeast-2.amazonaws.com/profile/", "");
        amazonS3Client.deleteObject(bucket, key);
    }

    /**
     * 민팅 전 파일 업로드 후 이미지 url 전달
     * S3버킷에 파일을 업로드하는 함수
     * 파일이 업로드된 경로(주소)를 반환
     */
    public String BeforeMint(MultipartFile multipartFile, String dirName) throws IOException {
        File uploadFile = convert(multipartFile)  // 파일 변환할 수 없으면 에러
            .orElseThrow(() -> new IllegalArgumentException("error: MultipartFile -> File convert fail"));
        return uploadBeforeMint(uploadFile,dirName);
    }

    public String uploadBeforeMint(File uploadFile, String dirName) {
        String fileName = dirName + "/" + UUID.randomUUID() + "&" + uploadFile.getName();   // S3에 저장된 파일 이름
        String uploadImageUrl = putS3(uploadFile, fileName); // s3로 업로드
        removeNewFile(uploadFile);
        return uploadImageUrl;
    }
}

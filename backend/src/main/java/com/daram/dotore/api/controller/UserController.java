package com.daram.dotore.api.controller;

import com.daram.dotore.api.response.BaseRes;
import com.daram.dotore.api.service.UserService;
import com.daram.dotore.db.entity.Users;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@Api(value = "유저 로그인 API", tags = {"UserController"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/login/{address}")
    @ApiOperation(value = "로그인", notes = "지갑 연동 시 회원 테이블에 해당 유저에 존재하는지 확인")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = BaseRes.class),
        @ApiResponse(code = 500, message = "Fail", response = BaseRes.class),
    })
    public ResponseEntity<BaseRes> login(@PathVariable String address) {
        Users user = userService.getUserByAddress(address);

        // 존재하지 않은 아이디인 경우, insert
        if (user == null) {
            user = userService.insertUser(address);
            if (user == null) {
                return ResponseEntity.status(500).body(BaseRes.of("Fail"));
            }
        }
        return ResponseEntity.status(200).body(BaseRes.of("Success"));
    }
}

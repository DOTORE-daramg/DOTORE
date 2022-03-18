package com.daram.dotore.api.service;

import com.daram.dotore.db.entity.Users;

public interface UserService {

    Users getUserByAddress(String address);

    Users insertUser(String address);
}

package com.niit.userservice.service;

import com.niit.userservice.domain.User;

public interface IUserService {

    public User addUser(User user);
    public User logIn(String email,String password);

    User updatePassword(User user,String email );
    User updateUserData(String email,User user);

}

package com.niit.userservice.service;

import com.niit.userservice.domain.User;

import java.util.Map;

public interface ISecurity {

    public Map<String,String> tokenGenerate(User user);
}

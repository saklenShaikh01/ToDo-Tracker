package com.niit.userservice.controller;

import com.niit.userservice.domain.User;
import com.niit.userservice.service.ISecurity;
import com.niit.userservice.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/userService")
//@CrossOrigin
public class UserController {

    IUserService iUserService;
    ISecurity iSecurity;
@Autowired
    public UserController(IUserService iUserService, ISecurity iSecurity) {
        this.iUserService = iUserService;
        this.iSecurity = iSecurity;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user){
    return new ResponseEntity<>(iUserService.addUser(user), HttpStatus.CREATED);
    }
    @PutMapping("/update/{email}")
    public ResponseEntity<?>updatePassword(@RequestBody User user,@PathVariable String email)
    {
        return new ResponseEntity<>(iUserService.updatePassword(user,email),HttpStatus.ACCEPTED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){
        User result=iUserService.logIn(user.getEmail(),user.getPassword());
        if(result!=null)
        {
            Map<String,String> key=iSecurity.tokenGenerate(user);
            return new ResponseEntity<>(key,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("Authentication failed",HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/updateUser/{email}")
    public ResponseEntity<?> updateUser(@PathVariable String email, @RequestBody User user) {

            return new ResponseEntity<>(iUserService.updateUserData(email,user), HttpStatus.CREATED);

    }

}

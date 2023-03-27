package org.niit.todotracker.todoservice.proxy;

import org.niit.todotracker.todoservice.domain.User;

import org.niit.todotracker.todoservice.domain.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="user-service", url="localhost:8091")
public interface UserProxy {

    @PostMapping("/api/userService/register")
    ResponseEntity<?> register(@RequestBody User user);

    @PutMapping("api/userService/updateUser/{email}")
    ResponseEntity<?> updateUser(@PathVariable String email, @RequestBody User user);

    @PutMapping("api/userService/update/{email}")
    public ResponseEntity<?>updatePassword(@RequestBody UserDTO user, @PathVariable String email);


}

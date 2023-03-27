package org.niit.todotracker.todoservice.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import org.niit.todotracker.todoservice.domain.Category;
import org.niit.todotracker.todoservice.domain.Todo;
import org.niit.todotracker.todoservice.domain.TodoTemp;
import org.niit.todotracker.todoservice.domain.User;
import org.niit.todotracker.todoservice.service.ITodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.util.Set;

@RestController
@RequestMapping("/api/userTodo")
//@CrossOrigin(origins = "*",allowedHeaders = "*")
public class UserTodoController {

   private ITodoService todoService;

   @Autowired
    public UserTodoController(ITodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping("/register")
    public ResponseEntity<?>register(@RequestBody User user){
       return new ResponseEntity<>(todoService.registerUser(user),HttpStatus.CREATED);
    }

    @GetMapping("/allUser")
    public ResponseEntity<?> getAllUsers(){
       return new ResponseEntity<>(todoService.getAllUsers(), HttpStatus.OK);
    }



    @PostMapping("/addTodo/{email}")
    public ResponseEntity<?> addUsersTodoToList(@RequestBody Todo todo, @PathVariable String email){
        System.out.println(email);
        return new ResponseEntity<>(todoService.addUsersTodoToList(todo,email), HttpStatus.OK);
    }



    @GetMapping("/allTodos/{email}")
    public ResponseEntity<?> getTodosFromList(@PathVariable String email){
        return new ResponseEntity<>(todoService.getAllTodosOfUser(email), HttpStatus.OK);
    }
    @PutMapping("/updateTodo/{email}")
    public ResponseEntity<?> updateTodo(@PathVariable String email, @RequestBody Todo todo){
//        System.out.println(todo);
       return new ResponseEntity<>(todoService.modifyUserTodo(email,todo),HttpStatus.OK);
    }
    @GetMapping("/otp/{email}")
    public ResponseEntity<?>getOtp(@PathVariable String email)
    {
        return new ResponseEntity<>(todoService.verifyOtp(email),HttpStatus.CREATED);
    }

    @PutMapping("/update/{email}")
    public ResponseEntity<?>updatePassword(@RequestBody User user,@PathVariable String email)
    {
        return new ResponseEntity<>(todoService.updatePassword(email,user),HttpStatus.OK);
    }
    @PutMapping("/updateuser/{email}")
    public ResponseEntity<?>updateUser(@RequestBody User user,@PathVariable String email)
    {
        return new ResponseEntity<>(todoService.updateUserData(email,user),HttpStatus.OK);
    }

    @GetMapping("/getUser/{email}")
    public ResponseEntity<?> getUserId(@PathVariable String email){
        return new ResponseEntity<>(todoService.searchUserByEmail(email), HttpStatus.OK);
    }

@DeleteMapping("/deleteTodo/{email}/{todoId}")
public ResponseEntity<?> deleteTodo(@PathVariable String email,@PathVariable String todoId){
       return new ResponseEntity<>(todoService.deleteTodo(email,todoId),HttpStatus.OK);
}

    @GetMapping("/getTodo/{categoryName}")
    public ResponseEntity<?> findTodoByCategoryName(@PathVariable String categoryName){
//        System.out.println(todoService.findUserByTodoByCategoryName(categoryName));
       return new ResponseEntity<>(todoService.findUserByTodoByCategoryName(categoryName),HttpStatus.OK);
    }

    @GetMapping("/getTodo1/{emailid}/{categoryName}")
    public ResponseEntity<?> findTodoByCategoryName1(@PathVariable String emailid, @PathVariable String categoryName){
//        System.out.println(todoService.findUserByTodoByCategoryName(categoryName));
        return new ResponseEntity<>(todoService.findUserByTodoByCategoryName1(emailid,categoryName),HttpStatus.OK);
    }
    @GetMapping("/getTodo2/{emailid}/{todoId}")
    public ResponseEntity<?> getTodoById(@PathVariable String emailid, @PathVariable String todoId){
       return new ResponseEntity<>(todoService.findTodoByTodoId(emailid,todoId),HttpStatus.OK);
    }

}

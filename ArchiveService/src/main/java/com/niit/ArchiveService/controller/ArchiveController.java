package com.niit.ArchiveService.controller;


import com.niit.ArchiveService.domain.Todo;
import com.niit.ArchiveService.domain.User;
import com.niit.ArchiveService.service.IArchiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/api/archiveService")
public class ArchiveController {

    IArchiveService iArchiveService;
@Autowired
    public ArchiveController(IArchiveService iArchiveService) {
        this.iArchiveService = iArchiveService;
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user)  {
        return new ResponseEntity<>(iArchiveService.registerUser(user), HttpStatus.CREATED);}




    @PostMapping("/addTodo/{email}")
    public ResponseEntity<?> addUsersTodoToList(@RequestBody Todo todo, @PathVariable String email){
    System.out.println(email);
        return new ResponseEntity<>(iArchiveService.addUsersTodoToList(todo,email), HttpStatus.OK);

    }
    @PostMapping("/addCompletedTodo/{email}")
    public ResponseEntity<?> addUsersCompletedTodoToList(@RequestBody Todo todo, @PathVariable String email){
        System.out.println(email);
        return new ResponseEntity<>(iArchiveService.addUsersCompletedTodoToList(todo,email), HttpStatus.OK);

    }


    @GetMapping("/allTodos/{email}")
    public ResponseEntity<?> getTodosFromList(@PathVariable String email){
        return new ResponseEntity<>(iArchiveService.getAllTodosOfUser(email), HttpStatus.OK);
    }
    @GetMapping("/allCompletedTodos/{email}")
    public ResponseEntity<?> getCompletedTodosFromList(@PathVariable String email){
        System.out.println(email);
        return new ResponseEntity<>(iArchiveService.getAllCompletedTodosOfUser(email), HttpStatus.OK);
    }

    @DeleteMapping("/deleteTodo/{email}/{todoId}")
    public ResponseEntity<?> deleteTodo(@PathVariable String email,@PathVariable String todoId){
        return new ResponseEntity<>(iArchiveService.deleteTodo(email,todoId),HttpStatus.OK);
    }

    @GetMapping("/loggedUser")
    public ResponseEntity<?> getUserId(HttpServletRequest request){
        String userEmail = (String) request.getAttribute("email");
        return new ResponseEntity<>(iArchiveService.searchUserByEmail(userEmail), HttpStatus.OK);
    }
    @GetMapping("/getarchiveTodo/{emailid}/{todoId}")
    public ResponseEntity<?> getTodoById(@PathVariable String emailid, @PathVariable String todoId){
        return new ResponseEntity<>(iArchiveService.findTodoByTodoId(emailid,todoId),HttpStatus.OK);
    }

    @GetMapping("/getcompleteTodo/{emailid}/{todoId}")
    public ResponseEntity<?> getTodoCompleteById(@PathVariable String emailid, @PathVariable String todoId){
        return new ResponseEntity<>(iArchiveService.findCompleteTodoByTodoId(emailid, todoId),HttpStatus.OK);
    }

}

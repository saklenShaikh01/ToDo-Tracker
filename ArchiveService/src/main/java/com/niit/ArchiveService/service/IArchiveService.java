package com.niit.ArchiveService.service;

import com.niit.ArchiveService.domain.Todo;
import com.niit.ArchiveService.domain.User;
import com.niit.ArchiveService.domain.completedTodos;

import java.util.List;
import java.util.Set;

public interface IArchiveService {
    User registerUser(User user);
    List<Todo> findCompleteTodoByTodoId(String eid,String todoId);
    List<Todo> findTodoByTodoId(String eid, String todoId);
    Set<Todo> getAllTodosOfUser(String email);
    Set<Todo> getAllCompletedTodosOfUser(String email);
    public boolean deleteTodo(String email,String todoId);
    User addUsersTodoToList(Todo todo, String email);
    User addUsersCompletedTodoToList(Todo todo, String email);

    User searchUserByEmail(String email);







//    Set<Todo> getDeletedTodo(String emailId) ;
//    Set<Todo> getCompletedTodo(String emailId) ;
//    Set<Category> getDeletedCategory(String emailId) ;
//    Set<Category> getCompletedCategory(String emailId) ;
}

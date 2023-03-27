package org.niit.todotracker.todoservice.service;


import org.niit.todotracker.todoservice.domain.Category;
import org.niit.todotracker.todoservice.domain.Todo;
import org.niit.todotracker.todoservice.domain.User;

import javax.mail.MessagingException;
import java.util.List;
import java.util.Set;

public interface ITodoService {


   User updateUserData(String email, User user) ;
   User modifyUserTodo(String email,Todo todo) ;
   int generateOtp();
   String verifyOtp(String email);
   User updatePassword(String email, User user);
   List<Todo> categorizeByStartDate(String userEmail);
   List<Todo> categorizeByEndDate(String userEmail);

   List<Todo> categorizeByPriority(String userEmail);
   List<Todo> getTodosWithNearDueDate(String userEmail) ;

   List<Todo> getTodosWithOverDue(String userEmail) ;


   public boolean deleteTodo(String email,String todoId);


   public List<User> findUserByTodoByCategoryName(String categoryName);

   public List<Todo> findUserByTodoByCategoryName1(String eid,String categoryName);
   public List<Todo> findTodoByTodoId(String eid,String todoId);

   User registerUser(User user);
   List<User> getAllUsers();

   User addUsersTodoToList(Todo todo, String email);

   Set<Todo> getAllTodosOfUser(String email);

   User searchUserByEmail(String email);
}

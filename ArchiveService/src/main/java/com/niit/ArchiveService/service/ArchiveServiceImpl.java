package com.niit.ArchiveService.service;

import com.niit.ArchiveService.domain.Todo;
import com.niit.ArchiveService.domain.User;
import com.niit.ArchiveService.domain.completedTodos;
import com.niit.ArchiveService.repository.ArchiveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ArchiveServiceImpl implements IArchiveService{

    ArchiveRepository archiveRepository;
@Autowired
    public ArchiveServiceImpl(ArchiveRepository archiveRepository) {
        this.archiveRepository = archiveRepository;
    }

    @Override
    public User registerUser(User user) {
       if(archiveRepository.findById(user.getEmail()).isEmpty()){
           return archiveRepository.save(user);
       }
       return null;
    }



    @Override
    public Set<Todo> getAllTodosOfUser(String email) {
        if(archiveRepository.findById(email).isEmpty()){
            return null;
        }
        return archiveRepository.findById(email).get().getTodos();
    }
    @Override
    public Set<Todo> getAllCompletedTodosOfUser(String email) {
        if(archiveRepository.findById(email).isEmpty()){
            return null;
        }
        System.out.println(archiveRepository.findById(email).get().getCompletedTodos());
        return archiveRepository.findById(email).get().getCompletedTodos();
    }
    @Override
    public List<Todo> findTodoByTodoId(String eid,String todoId) {
        User user=archiveRepository.findById(eid).get();
        List<Todo> res=new ArrayList<Todo>();
        for (Todo t:user.getTodos()){
            if (t.getTodoId().equalsIgnoreCase(todoId)){
                res.add(t);
            }
        }
        return res;
    }
    @Override
    public List<Todo> findCompleteTodoByTodoId(String eid,String todoId) {
        User user=archiveRepository.findById(eid).get();
        List<Todo> res=new ArrayList<Todo>();
        for (Todo t:user.getCompletedTodos()){
            if (t.getTodoId().equalsIgnoreCase(todoId)){
                res.add(t);
            }
        }
        return res;
    }
    @Override
    public boolean deleteTodo(String email, String todoId) {
        User user=archiveRepository.findById(email).get();
        Set<Todo> todoList=user.getTodos();
        Iterator<Todo> iterator=todoList.iterator();
        while(iterator.hasNext())
        {
            Todo todo=iterator.next();
            if(todo.getTodoId().equals(todoId))
            {
                iterator.remove();
            }
        }
        user.setTodos(todoList);
        archiveRepository.save(user);
        return true;
    }






    @Override
    public User addUsersTodoToList(Todo todo, String email) {
        String todoId = UUID.randomUUID().toString();
        todo.setTodoId(todoId);
        if (archiveRepository.findById(email).isPresent()) {
            User user = archiveRepository.findById(email).get();
            Set<Todo> allTodos = user.getTodos();
            if (user.getTodos() != null) {
                boolean check = false;
                for (Todo todos : allTodos) {
                    if (todos.getTodoTitle().equals(todo.getTodoTitle())) {
                        check = true;

                        break;
                    }
                }
                if (!check) {
                    todo.setStatus(true);
                    allTodos.add(todo);
                    user.setTodos(allTodos);
                }

            } else {
                user.setTodos(new HashSet<>());
                user.getTodos().add(todo);
            }
            return archiveRepository.save(user);
        }
        return null;
    }
    @Override
    public User addUsersCompletedTodoToList(Todo todo, String email) {
        String todoId = UUID.randomUUID().toString();
        todo.setTodoId(todoId);
        if (archiveRepository.findById(email).isPresent()) {
            User user = archiveRepository.findById(email).get();
//            List <completedTodos> allTodos = user.getTodos();
            Set <Todo> allTodos=user.getCompletedTodos();
            if (user.getCompletedTodos() != null) {
                boolean check = false;
                for (Todo todos : allTodos) {
                    if (todos.getTodoTitle().equals(todo.getTodoTitle())) {
                        check = true;

                        break;
                    }
                }
                if (!check) {
                    todo.setStatus(true);
                    allTodos.add(todo);
                    user.setCompletedTodos(allTodos);
                }

            } else {

                user.setCompletedTodos(new HashSet<>());
                user.getCompletedTodos().add(todo);
            }
            return archiveRepository.save(user);
        }
        return null;
    }
    @Override
    public User searchUserByEmail(String email) {
        return archiveRepository.findById(email).get();
    }


}

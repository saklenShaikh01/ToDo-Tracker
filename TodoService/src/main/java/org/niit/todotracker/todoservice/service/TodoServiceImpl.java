package org.niit.todotracker.todoservice.service;


import org.niit.todotracker.todoservice.domain.Todo;
import org.niit.todotracker.todoservice.domain.User;

import org.niit.todotracker.todoservice.domain.UserDTO;
import org.niit.todotracker.todoservice.proxy.ArchiveProxy;
import org.niit.todotracker.todoservice.proxy.UserProxy;
import org.niit.todotracker.todoservice.rabbit.EmailDTO;
import org.niit.todotracker.todoservice.rabbit.MailProducer;
import org.niit.todotracker.todoservice.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
public class TodoServiceImpl implements ITodoService {

    IUserRepository userRepository;

    private SequenceGenerator sequenceGenerator;
//    private JavaMailSender javaMailSender;

    private ArchiveProxy archiveProxy;

    UserProxy proxy;
    MailProducer mailProducer;
    @Autowired
    public TodoServiceImpl(IUserRepository userRepository, SequenceGenerator sequenceGenerator, ArchiveProxy archiveProxy, UserProxy proxy, MailProducer mailProducer) {
        this.userRepository = userRepository;
        this.sequenceGenerator = sequenceGenerator;
        this.archiveProxy = archiveProxy;
        this.proxy = proxy;
        this.mailProducer = mailProducer;

    }





    @Override
    public User updateUserData(String email, User user) {
        if (userRepository.findById(email).isEmpty()) {
            return null;
        }
        User user1 = userRepository.findById(email).get();
//        user1.setPassword(user.getPassword());
//        user1.setProfile(user.getProfile());
        user1.setFullName(user.getFullName());
        user1.setEmail(user.getEmail());
        user1.setContact(user.getContact());
        userRepository.save(user);
        proxy.updateUser(email, user);
        return user1;
    }

    @Override
    public int generateOtp() {
        int otp= ThreadLocalRandom.current().nextInt(1000,9999);



        return otp;
    }

    @Override
    public String verifyOtp(String email) {
        int otp = generateOtp();

        mailProducer.sendEmailDtoToQueue(new EmailDTO(email, "OTP From Todo App " + otp,
                "OTP"));
        return otp + "";

    }

    @Override
    public User updatePassword(String email, User user) {
        if(userRepository.findById(email).isEmpty())
        {
            return null;
        }

        User isExist = userRepository.findById(email).get();
        UserDTO dto = new UserDTO(user.getEmail(), user.getPassword());
        proxy.updatePassword(dto,email);
        isExist.setEmail(user.getEmail());
        isExist.setPassword(user.getPassword());
        return userRepository.save(isExist);
    }



    @Override
    public User modifyUserTodo( String email,Todo todo) {
        if (userRepository.findById(email).isPresent()) {
            User user = userRepository.findById(email).get();
            Set<Todo> todoList = user.getTodos();
            Todo todo2 = null;
            for (Todo todo1 : todoList) {
                if (todo1.getTodoId().equalsIgnoreCase(todo.getTodoId())) {
                    todo2 = todo1;
                    break;
                }
            }
            if (todo2 == null) {
                return null;
            } else {
                user.getTodos().remove(todo2);
                todoList.add(todo);
                user.setTodos(todoList);
                System.out.println(user);
                return userRepository.save(user);

            }
        } else {
            return null;
        }
    }

    @Override
    public List<Todo> categorizeByStartDate(String email) {
        if (userRepository.existsById(email)) {
            return userRepository.findById(email).get().getTodos()
                    .stream().sorted(Comparator.comparing(Todo::getStartDate)).collect(Collectors.toList());

        }
        return null;
    }

    @Override
    public List<Todo> categorizeByEndDate(String email) {
        if (userRepository.existsById(email)) {
            return userRepository.findById(email).get().getTodos()
                    .stream().sorted(Comparator.comparing(Todo::getEndDate)).collect(Collectors.toList());
        }
        return null;
    }

    @Override
    public List<Todo> categorizeByPriority(String email) {
        if (userRepository.existsById(email)) {
            return userRepository.findById(email).get().getTodos()
                    .stream().sorted(Comparator.comparing(Todo::getPriority)).collect(Collectors.toList());
        }
        return null;
    }



    Comparator<Todo> dueDateComparator = ((todo1, todo2) -> {
        DateFormat format = new SimpleDateFormat("dd/MM/yyyy");
        LocalDate dueDate1 = todo1.getEndDate().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        LocalDate dueDate2 = todo2.getEndDate().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        if (dueDate1.isBefore(dueDate2)) {
            return -1;
        }
        if (dueDate1.isAfter(dueDate2)) {
            return 1;
        }
        return 0;
    });



    @Override
    public List<Todo> getTodosWithNearDueDate(String email) {
        DateFormat format = new SimpleDateFormat("dd/MM/yyyy");
        Optional<User> user = userRepository.findById(email);
        if (user.isEmpty()) {
          return null;
        }
        Set<Todo> allTodos = user.get().getTodos();
        List<Todo> todosNearingDueDate = new ArrayList<>();
        for (Todo todo : allTodos) {
            if (todo.isStatus()) {
                continue;
            }
            LocalDate dueDate =todo.getEndDate().toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();
            LocalDate tomorrowDate = LocalDate.now().plusDays(1);
            if (dueDate.isAfter(tomorrowDate) || dueDate.isBefore(LocalDate.now())){
                continue;
            } else {
                todosNearingDueDate.add(todo);
            }
        }
        return todosNearingDueDate.stream().sorted(dueDateComparator).collect(Collectors.toList());
    }

    @Override
    public List<Todo> getTodosWithOverDue(String email) {
        DateFormat format = new SimpleDateFormat("dd/MM/yyyy");
        Optional<User> user = userRepository.findById(email);
        if (user.isEmpty()) {
           return null;
        }
        Set<Todo> allTodos = user.get().getTodos();
        List<Todo> todosOverDue = new ArrayList<>();
        for (Todo todo : allTodos) {
            if (todo.isStatus()) {
                continue;
            }
            LocalDate dueDate =todo.getEndDate().toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();
            if (dueDate.isBefore(LocalDate.now())) {
                todosOverDue.add(todo);
            }
        }
        return todosOverDue.stream().sorted(dueDateComparator).collect(Collectors.toList());
    }


    @Override
    public boolean deleteTodo(String email, String todoId) {
        User user=userRepository.findById(email).get();
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
        userRepository.save(user);
        return true;
    }

    @Override
    public List<User> findUserByTodoByCategoryName(String categoryName) {
        if (userRepository.findAllByCategoryName(categoryName).isEmpty()){
            return null;
        }
//        System.out.println(userRepository.findByCategoryName(categoryName));
        return userRepository.findAllByCategoryName(categoryName);
    }

    @Override
    public List<Todo> findUserByTodoByCategoryName1(String eid, String categoryName) {
        User user = userRepository.findById(eid).get();
        //Set<Todo> result= new TreeSet<Todo>();
        List<Todo> result= new ArrayList<Todo>();
        for(Todo t : user.getTodos()){
            if(t.getCategoryName().equalsIgnoreCase(categoryName)){
                result.add(t);
            }
        }
        return result;
    }

    @Override
    public List<Todo> findTodoByTodoId(String eid,String todoId) {
       User user=userRepository.findById(eid).get();
       List<Todo> res=new ArrayList<Todo>();
       for (Todo t:user.getTodos()){
           if (t.getTodoId().equalsIgnoreCase(todoId)){
               res.add(t);
           }
       }
       return res;
    }


    @Override
    public User registerUser(User user) {

        if(userRepository.findById(user.getEmail()).isPresent()){
            return null;
        }
        proxy.register(user);
        archiveProxy.register(user);
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    @Override
    public User addUsersTodoToList(Todo todo, String email) {
        String todoId = UUID.randomUUID().toString();
        todo.setTodoId(todoId);
        if (userRepository.findById(email).isPresent()) {
            User user = userRepository.findById(email).get();
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
                    allTodos.add(todo);
                    user.setTodos(allTodos);
                }

            } else {
                user.setTodos(new HashSet<>());
                user.getTodos().add(todo);
            }
            return userRepository.save(user);
        }
        return null;
    }



    @Override
    public Set<Todo> getAllTodosOfUser(String email) {
        if(userRepository.findById(email).isEmpty()){
            return null;
        }
        return userRepository.findById(email).get().getTodos();
    }


    @Override
    public User searchUserByEmail(String email) {

        return userRepository.findById(email).get();
    }
}

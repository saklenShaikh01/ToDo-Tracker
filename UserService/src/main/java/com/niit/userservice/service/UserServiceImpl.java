package com.niit.userservice.service;

import com.niit.userservice.domain.User;
import com.niit.userservice.rabbit.EmailDTO;
import com.niit.userservice.rabbit.MailProducer;
import com.niit.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService{
    UserRepository userRepository;
    @Autowired
    MailProducer mailProducer;
@Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User addUser(User user) {
    if(userRepository.findById(user.getEmail()).isEmpty()){
        User user1= userRepository.save(user);
        EmailDTO emailDTO=new EmailDTO(user1.getEmail(),"Dear User,\n" +
                "Welcome to Todo Tracker Web Application,\n" +
                "You have Successfully registered to Todo Tracker Web Application.\n" +
                "Please Login from Web Application to activate your account.\n" +
                "Regards,\n" +
                "ToDo Tracker,\n" +
                "CEO","Successfully Registration");
        mailProducer.sendEmailDtoToQueue(emailDTO);
        return user1;
    }else
        return null;
    }
    @Override
    public User updatePassword(User user,String email )
    {
        if(userRepository.findById(email).isEmpty())
        {
            return null;
        }

        User isExist = userRepository.findById(email).get();
        isExist.setEmail(user.getEmail());
        isExist.setPassword(user.getPassword());
        return userRepository.save(isExist);
    }
    @Override
    public User logIn(String email,String password) {
       if(userRepository.findById(email).isEmpty()){
           return null;
       }else {
           User user=userRepository.findById(email).get();
           if(user.getEmail().equals(email)&& user.getPassword().equals(password)){
               return user;
           }
       }
        return null;
    }

    @Override
    public User updateUserData(String email, User user) {
        if (userRepository.findById(email).isEmpty()){
          return null;
        }
        User user1 =userRepository.findById(email).get();
        user1.setPassword(user.getPassword());
        userRepository.save(user1);
        return user1;
    }
}

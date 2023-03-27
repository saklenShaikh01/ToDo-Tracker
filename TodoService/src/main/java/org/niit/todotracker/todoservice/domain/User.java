package org.niit.todotracker.todoservice.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;
import java.util.Set;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
private String fullName;
    private String profile;
    private String contact;
    @Id
    private String email;
    private String password;
    private String confirmPassword;
   private List<String> priority;
//    private Set<Category> categorySet;
    private Set<Todo> todos;

}

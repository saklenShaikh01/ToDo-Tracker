package com.niit.ArchiveService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import java.util.List;
import java.util.Set;
@Document
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {

    @Id
    private String email;
    private Set<Todo> todos;
    private Set<Todo> completedTodos;
}

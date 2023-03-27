package org.niit.todotracker.todoservice.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

import java.util.Date;
import java.util.List;
import java.util.Set;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class Todo {
//    @Transient
//    public static final String SEQUENCE_NAME="task_sequence";
    @Id
   private String todoId;
   private String todoTitle;
  private   String todoDesc;
  private Date startDate;
    private Date endDate;
    private String categoryName;
    private boolean status;
    private String priority;
//   Set<Category> categorySet;
//   String categoryName;

}

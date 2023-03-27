package com.niit.ArchiveService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.Date;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class completedTodos {
    @Id
    private String todoId;
    private String todoTitle;
    private   String todoDesc;
    private Date startDate;
    private Date endDate;
    private String categoryName;
    private boolean status=false;
    private String priority;
}

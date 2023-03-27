package com.niit.userservice.rabbit;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class EmailDTO {
    private String receiver,messageBody,subject;
}

package com.niit.MailService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmailData {
    private String receiver,messageBody,subject,attachment;
}

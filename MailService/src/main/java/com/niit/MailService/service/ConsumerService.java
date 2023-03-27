package com.niit.MailService.service;

import com.niit.MailService.domain.EmailData;
import org.springframework.stereotype.Service;

@Service
public interface ConsumerService {

    public String sendEmail(EmailData emailData);

}

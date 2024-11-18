package com.upshift.spring.config

import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.JavaMailSenderImpl
import org.springframework.stereotype.Component
import org.springframework.web.servlet.support.ServletUriComponentsBuilder

@Component
class AppModule {
    fun mailSender(): JavaMailSender = JavaMailSenderImpl()

    fun getAppUrl(): String = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString()
}

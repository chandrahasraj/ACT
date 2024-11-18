package com.upshift.spring.service

import com.upshift.spring.entity.PasswordResetToken
import com.upshift.spring.entity.UserDO
import com.upshift.spring.repository.PasswordTokenRepository
import com.upshift.spring.repository.UserRepository
import org.springframework.mail.SimpleMailMessage
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import java.util.*

@Service
class PasswordService(
    private val userRepository: UserRepository,
    private val passwordTokenRepository: PasswordTokenRepository,
) {
    fun createPasswordResetTokenForUser(
        email: String,
        contextPath: String,
    ): SimpleMailMessage {
        val token: String = UUID.randomUUID().toString()
        val user =
            userRepository
                .findByEmail(email)
                .map { user ->
                    passwordTokenRepository.save(PasswordResetToken(token, user))
                    user
                }.orElseThrow { UsernameNotFoundException("User not found") }

        return constructResetTokenEmail(contextPath, Locale.US, token, user)
    }

    private fun constructResetTokenEmail(
        contextPath: String,
        locale: Locale,
        token: String,
        user: UserDO,
    ): SimpleMailMessage {
        val url = "$contextPath/user/changePassword?token=$token"
        return constructEmail("Reset Password", "Reset Password for \r\n$url", user)
    }

    private fun constructEmail(
        subject: String,
        body: String,
        user: UserDO,
    ): SimpleMailMessage {
        val email = SimpleMailMessage()
        email.subject = subject
        email.text = body
        email.setTo(user.email)
        email.from = System.getProperty("support.email") ?: "raj.chandrahas@gmail.com"
        return email
    }
}

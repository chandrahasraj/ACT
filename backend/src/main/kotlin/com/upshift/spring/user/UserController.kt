package com.upshift.spring.user

import com.upshift.spring.config.AppModule
import com.upshift.spring.model.input.UserInput
import com.upshift.spring.model.output.UserOutput
import com.upshift.spring.service.PasswordService
import com.upshift.spring.service.UserService
import jakarta.validation.Valid
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/user")
@Suppress("MaximumLineLength")
class UserController(
    @Autowired private val userService: UserService,
    @Autowired private val passwordService: PasswordService,
    @Autowired private val appModule: AppModule,
) {
    private val logger = LoggerFactory.getLogger(UserController::class.java)

    @PostMapping("/signup")
    fun signup(
        @Valid @RequestBody userInput: UserInput,
    ): ResponseEntity<Any> {
        val savedUser = userService.save(userInput)
        return ResponseEntity.ok(mapOf("token" to savedUser.token))
    }

    @GetMapping("/profile")
    @PreAuthorize("hasAnyAuthority('STANDARD_USER', 'PRIVILEGED_USER', 'ADMIN_USER')")
    @Suppress("MaximumLineLength")
    fun getProfile(): ResponseEntity<Any> {
        val principal =
            SecurityContextHolder.getContext().authentication.principal
                as org.springframework.security.core.userdetails.User
        return ResponseEntity.ok(userService.findByUsername(principal.username))
    }

    @PostMapping("/update")
    @PreAuthorize("hasAnyAuthority('STANDARD_USER', 'PRIVILEGED_USER', 'ADMIN_USER')")
    fun update(
        @Valid @RequestBody userInput: UserInput,
    ): ResponseEntity<UserOutput> = ResponseEntity.ok(userService.update(userInput))

    @PostMapping("/resetPassword")
    fun resetPassword(
        @RequestParam("email") userEmail: String,
    ): ResponseEntity<Any> {
        logger.info("Resetting password for user: $userEmail")
        appModule.mailSender().send(
            passwordService.createPasswordResetTokenForUser(userEmail, appModule.getAppUrl()),
        )
        return ResponseEntity.ok("Reset Email Sent!")
    }
}

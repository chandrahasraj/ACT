package com.upshift.spring.user

import com.upshift.spring.model.UserInput
import com.upshift.spring.model.UserOutput
import com.upshift.spring.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/user")
class UserController(
    @Autowired private val userService: UserService
) {

    @PostMapping("/signup")
    fun signup(@RequestBody userInput: UserInput): ResponseEntity<Any> {
        val savedUser = userService.save(userInput)
        return ResponseEntity.ok(mapOf("token" to savedUser.token))
    }


    @GetMapping("/profile")
    @PreAuthorize("hasAnyAuthority('STANDARD_USER', 'ADMIN_USER')")
    fun getProfile(): ResponseEntity<Any> {
        val principal =
            SecurityContextHolder.getContext().authentication.principal as org.springframework.security.core.userdetails.User
        return ResponseEntity.ok(userService.findByUsername(principal.username))
    }

    @PostMapping("/update")
    @PreAuthorize("hasAnyAuthority('STANDARD_USER', 'ADMIN_USER')")
    fun update(@RequestBody userInput: UserInput): ResponseEntity<UserOutput> {
        return ResponseEntity.ok(userService.update(userInput))
    }
}
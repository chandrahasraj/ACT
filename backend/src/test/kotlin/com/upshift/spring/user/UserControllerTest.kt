package com.upshift.spring.user

import com.nhaarman.mockitokotlin2.any
import com.nhaarman.mockitokotlin2.doReturn
import com.nhaarman.mockitokotlin2.whenever
import com.upshift.spring.model.RoleBO
import com.upshift.spring.model.input.UserInput
import com.upshift.spring.model.output.UserOutput
import com.upshift.spring.service.UserService
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.MockitoAnnotations
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.User

class UserControllerTest {

    @Mock
    private lateinit var userService: UserService

    @InjectMocks
    private lateinit var userController: UserController

    @BeforeEach
    fun setup() {
        MockitoAnnotations.openMocks(this)
    }

    @Test
    fun `signup should return token`() {
        val userInput = UserInput("fisrtName", "lastName", "username", "email@example.com", "password")
        val userOutput = UserOutput(1, "username", "email@example.com", setOf(RoleBO("STANDARD_USER")), "token")
        whenever(userService.save(any())).doReturn(userOutput)

        val response = userController.signup(userInput)

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(mapOf("token" to "token"), response.body)
    }

    @Test
    fun `getProfile should return user profile`() {
        val principal = User("username", "password", emptyList())
        SecurityContextHolder.getContext().authentication =
            UsernamePasswordAuthenticationToken(principal, null, emptyList())

        val userOutput = UserOutput(1, "username", "email@example.com", setOf(RoleBO("STANDARD_USER")), "token")
        whenever(userService.findByUsername("username")).doReturn(userOutput)

        val response = userController.getProfile()

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(userOutput, response.body)
    }

    @Test
    fun `update should update user profile`() {
        val principal = User("username", "password", emptyList())
        SecurityContextHolder.getContext().authentication =
            UsernamePasswordAuthenticationToken(principal, null, emptyList())
        val userInput = UserInput("fisrtName", "lastName", "username", "newemail@example.com", "newpassword")
        val updatedUserOutput = UserOutput(1, "username", "newemail@example.com", setOf(RoleBO("STANDARD_USER")), "newtoken")
        whenever(userService.update(any())).doReturn(updatedUserOutput)

        val response = userController.update(userInput)

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(updatedUserOutput, response.body)
    }
}

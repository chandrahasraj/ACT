package com.upshift.spring.model.input

import com.upshift.spring.model.RoleBO
import jakarta.validation.constraints.NotBlank

data class UserInputToUpdate(
    var firstName: String = "",
    var lastName: String = "",
    @NotBlank
    var username: String = "",
    @NotBlank
    var roles: Set<RoleBO>? = null,
)

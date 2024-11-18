package com.upshift.spring.model.input

import com.upshift.spring.model.RoleBO
import jakarta.validation.constraints.NotBlank

data class UserInput(
    @NotBlank
    var firstName: String = "",
    @NotBlank
    var lastName: String = "",
    @NotBlank
    var institution: String = "",
    @NotBlank
    var dob: String = "",
    @NotBlank
    var username: String = "",
    @NotBlank
    var email: String? = null,
    @NotBlank
    var password: String? = null,
    @NotBlank
    var teamMembers: List<TeamMember>? = null,
    @NotBlank
    var mentorName: String = "",
    @NotBlank
    var mentorEmail: String = "",
    @NotBlank
    var roles: Set<RoleBO>? = null,
)

data class TeamMember(
    @NotBlank
    var fullName: String = "",
    @NotBlank
    var emailId: String = ""
)

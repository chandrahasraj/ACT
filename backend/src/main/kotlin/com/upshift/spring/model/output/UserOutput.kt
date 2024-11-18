package com.upshift.spring.model.output

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.upshift.spring.model.RoleBO

@JsonIgnoreProperties(ignoreUnknown = true)
data class UserOutput(
    var id: Long? = null,
    var username: String? = null,
    var email: String? = null,
    var roles: Set<RoleBO>? = null,
    var token: String? = null,
)

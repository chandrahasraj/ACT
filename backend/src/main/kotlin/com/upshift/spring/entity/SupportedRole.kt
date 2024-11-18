package com.upshift.spring.entity

enum class SupportedRole(
    val roleType: String,
    val typeId: Int,
) {
    STANDARD_USER("STANDARD_USER", 0),
    PRIVILEGED_USER("PRIVILEGED_USER", 1),
    ADMIN_USER("ADMIN_USER", 2),
}

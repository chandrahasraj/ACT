package com.upshift.spring.entity

import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.OneToOne
import java.time.LocalDateTime
import java.time.temporal.ChronoUnit

@Entity
data class PasswordResetToken(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private val id: Long? = null,
    private val token: String? = null,
    @OneToOne(targetEntity = UserDO::class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private val user: UserDO? = null,
    private val expiryDate: LocalDateTime? = null,
) {
    constructor(token: String, user: UserDO) :
        this(null, token, user, LocalDateTime.now().plus(1, ChronoUnit.DAYS))

    fun isExpired(): Boolean = expiryDate?.isBefore(LocalDateTime.now()) ?: true
}

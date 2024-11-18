package com.upshift.spring.repository

import com.upshift.spring.entity.PasswordResetToken
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface PasswordTokenRepository : CrudRepository<PasswordResetToken, Int> {
    fun findByToken(token: String): PasswordResetToken?
}

package com.upshift.spring.entity

import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank

@Entity
@Table(name = "app_role")
data class Institution(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    @NotBlank
    var institution: InstitutionType? = null
)

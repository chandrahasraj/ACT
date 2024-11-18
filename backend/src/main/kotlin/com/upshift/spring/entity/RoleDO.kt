package com.upshift.spring.entity

import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import jakarta.validation.constraints.NotBlank

@Entity
@Table(name = "app_role")
class RoleDO(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    @NotBlank
    @Column(name = "access_role", updatable = false)
    var accessRole: SupportedRole? = SupportedRole.STANDARD_USER,
    @ManyToOne(cascade = [CascadeType.MERGE], fetch = FetchType.EAGER, targetEntity = UserDO::class)
    var userDO: UserDO? = null,
)

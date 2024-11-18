package com.upshift.spring.mapper

import com.upshift.spring.entity.UserDO
import org.mapstruct.BeanMapping
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.NullValueCheckStrategy
import org.mapstruct.NullValuePropertyMappingStrategy

@Mapper(nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS, componentModel = "spring")
interface UserDoToUserDoMapper {
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "email", source = "userDo.email", defaultExpression = "java(existingUserDo.getEmail())")
    @Mapping(target = "password", source = "userDo.password", defaultExpression = "java(existingUserDo.getPassword())")
    @Mapping(target = "username", source = "userDo.username", defaultExpression = "java(existingUserDo.getUsername())")
    @Mapping(target = "id", source = "userDo.id", defaultExpression = "java(existingUserDo.getId())")
    @Mapping(target = "institution", source = "userDo.institution", defaultExpression = "java(existingUserDo.getInstitution())")
    @Mapping(target = "dob", source = "userDo.dob", defaultExpression = "java(existingUserDo.getDob())")
    @Mapping(target = "mentorName", source = "userDo.mentorName", defaultExpression = "java(existingUserDo.getMentorName())")
    @Mapping(target = "mentorEmail", source = "userDo.mentorEmail", defaultExpression = "java(existingUserDo.getMentorEmail())")
    @Mapping(target = "teamMembers", source = "userDo.teamMembers", defaultExpression = "java(existingUserDo.getTeamMembers())")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    fun mapUserDoToUserDo(
        userDo: UserDO,
        existingUserDo: UserDO,
    ): UserDO
}

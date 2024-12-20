package com.upshift.spring.config

import com.upshift.spring.security.JWTAuthenticationFilter
import com.upshift.spring.security.JWTAuthorizationFilter
import com.upshift.spring.security.TokenProvider
import com.upshift.spring.service.AppAuthenticationManager
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
class WebConfig(
    val authenticationManager: AppAuthenticationManager,
    val tokenProvider: TokenProvider,
    @Autowired
    @Qualifier("delegatedAuthenticationEntryPoint")
    private val authEntryPoint: AuthenticationEntryPoint,
) {
    companion object {
        private const val MAX_AGE_SECS: Long = 3600
    }

    @Bean
    @Throws(Exception::class)
    fun filterChain(http: HttpSecurity): SecurityFilterChain =
        http
            .cors { config ->
                config.configurationSource(
                    UrlBasedCorsConfigurationSource().also { cors ->
                        CorsConfiguration().apply {
                            allowedOrigins = listOf("*")
                            allowedMethods = listOf("POST", "PUT", "DELETE", "GET", "OPTIONS", "HEAD")
                            allowedHeaders =
                                listOf(
                                    "Authorization",
                                    "Content-Type",
                                    "X-Requested-With",
                                    "Accept",
                                    "Origin",
                                    "Access-Control-Request-Method",
                                    "Access-Control-Request-Headers",
                                )
                            exposedHeaders =
                                listOf(
                                    "Access-Control-Allow-Origin",
                                    "Access-Control-Allow-Credentials",
                                    "Authorization",
                                    "Content-Disposition",
                                )
                            maxAge = MAX_AGE_SECS
                            cors.registerCorsConfiguration("/**", this)
                        }
                    },
                )
            }.csrf { csrf -> csrf.disable() }
            .sessionManagement { sessionManagement ->
                sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }.authorizeHttpRequests { authorizeRequests ->
                authorizeRequests
                    .requestMatchers("/api/**")
                    .permitAll()
                    .requestMatchers(HttpMethod.GET, "/actuator/health/**")
                    .permitAll()
                    .requestMatchers(HttpMethod.GET, "/actuator/info/**")
                    .permitAll()
                    .requestMatchers(HttpMethod.POST, "/login")
                    .permitAll()
                    .anyRequest()
                    .authenticated()
            }.addFilter(JWTAuthenticationFilter(authenticationManager, tokenProvider))
            .addFilter(JWTAuthorizationFilter(authenticationManager, tokenProvider))
            .exceptionHandling { exceptionHandling ->
                exceptionHandling.authenticationEntryPoint(authEntryPoint)
            }.build()
}

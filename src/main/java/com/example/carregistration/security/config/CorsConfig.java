package com.example.carregistration.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer getCorsConfiguration() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping(("/api/**"))
                        .allowedOrigins("*") // can be "http://localhost:8080" etc
                        .allowedMethods("*") // can be "GET", "POST", "DELETE" etc
                        .allowedHeaders("*");
            }
        };
    }
}

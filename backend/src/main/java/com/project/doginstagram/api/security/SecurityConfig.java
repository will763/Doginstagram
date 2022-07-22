package com.project.doginstagram.api.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

///olhar depois


@Configuration
public class SecurityConfig {
    @Value("${security.config.PREFIX}")
    public static String PREFIX ;
    @Value("${security.config.KEY}")
    public static String KEY;
}

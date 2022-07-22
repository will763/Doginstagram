package com.project.doginstagram.api.config.service;

import com.project.doginstagram.api.entity.Users;
import com.project.doginstagram.api.services.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    UsersService usersService;

    @Override
    public UserDetails loadUserByUsername(String username) {

        try {
            Optional<Users> optional = usersService.findByUsername(username);
            return optional.get();
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found");
        }
    }
}

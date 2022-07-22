package com.project.doginstagram.api.dto.users;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUsers {
    private String name;
    private String username;
    private String emailPhone;
    private String password;
}

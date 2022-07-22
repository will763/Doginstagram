package com.project.doginstagram.api.dto.users;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GetUser {

    private String id;
    private String name;
    private String username;
    private String emailPhone;
    private String profile;
    private String biography;
    private int publications;
    private List<GetUser> followers;
    private List<GetUser> following;
}

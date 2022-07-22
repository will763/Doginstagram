package com.project.doginstagram.api.security;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter @Setter
@ToString
public class JWTObject {

    private String subject;
    private String claim;
    private Date issuedAt;
}

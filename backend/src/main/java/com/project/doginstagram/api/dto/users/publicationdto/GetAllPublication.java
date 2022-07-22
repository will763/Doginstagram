package com.project.doginstagram.api.dto.users.publicationdto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GetAllPublication {

    private Long id;
    private String legend;
    private String url;
    private Integer likes;
    private String username;
}

package com.project.doginstagram.api.dto.users.publicationdto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreatePublication {

    private String legend;
    private String url;

}

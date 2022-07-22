package com.project.doginstagram.api.controller;

import com.project.doginstagram.api.dto.users.publicationdto.GetAllPublication;
import com.project.doginstagram.api.dto.users.publicationdto.UpdatePublication;
import com.project.doginstagram.api.entity.Users;
import com.project.doginstagram.api.security.JWTCreator;
import com.project.doginstagram.api.security.JWTObject;
import com.project.doginstagram.api.services.PublicationService;
import com.project.doginstagram.api.services.UsersService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@NoArgsConstructor
@RestController
@Controller
@RequestMapping("api/v1/publication")
public class PublicationController {

    @Autowired
    ModelMapper mapper;

    @Autowired
    UsersService usersService;

    @Autowired
    PublicationService publicationService;

    @PostMapping("/new")
    public ResponseEntity addPublication(@RequestParam("legend") String legend, @RequestParam("file") MultipartFile file, HttpServletRequest request) {
        String token = request.getHeader(JWTCreator.HEADER_AUTHORIZATION);

        if (token != null && !token.isEmpty()) {
            JWTObject tokenObject = JWTCreator.Reverse(token);

            Optional<Users> user = usersService.findById(tokenObject.getSubject());
            if (user.isPresent()) {
                publicationService.save(file,legend,user.get().getId());
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity deleteImageProfile(@PathVariable Long id) {

            try {
                publicationService.delete(id);
                return ResponseEntity.ok().build();
            }catch (Exception e){
                return ResponseEntity.ok().build();
            }

    }

    @GetMapping(value = "/update/likes/{id}")
    public ResponseEntity updateLikePublication(@PathVariable Long id) {
        try {
            publicationService.updateLikePublication(id);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping("/update/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody UpdatePublication body) {

        try {
            publicationService.updatePublication(id, body.getLegend());
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping()
    public ResponseEntity ListAllPublication(HttpServletRequest request) {
        String token = request.getHeader(JWTCreator.HEADER_AUTHORIZATION);

        if (token != null && !token.isEmpty()) {
            JWTObject tokenObject = JWTCreator.Reverse(token);

            List<GetAllPublication> list = publicationService.getAllPublications(tokenObject.getSubject());
            if (list.isEmpty()){
                return ResponseEntity.ok().build();
            }

            List<GetAllPublication> publications = new ArrayList<>();

            for( int i = list.size() - 1; i >= 0; i--){
                GetAllPublication element = list.get(i);
                publications.add(element);
            }

            return ResponseEntity.ok().body(publications);
        } else {
           return ResponseEntity.ok().build();
        }

    }

}



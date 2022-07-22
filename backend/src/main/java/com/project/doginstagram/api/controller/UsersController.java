package com.project.doginstagram.api.controller;

import com.project.doginstagram.api.dto.users.CreateUsers;
import com.project.doginstagram.api.dto.users.EditUser;
import com.project.doginstagram.api.dto.users.GetUser;
import com.project.doginstagram.api.dto.users.LoginUsers;
import com.project.doginstagram.api.entity.Users;
import com.project.doginstagram.api.repository.UsersRepository;
import com.project.doginstagram.api.security.JWTCreator;
import com.project.doginstagram.api.security.JWTObject;
import com.project.doginstagram.api.services.FilesStorageService;
import com.project.doginstagram.api.services.UsersService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Date;
import java.util.Optional;

@AllArgsConstructor
@NoArgsConstructor
@RestController
@Controller
@RequestMapping("api/v1/users")
public class UsersController {

    private static final Logger logger = LoggerFactory.getLogger(UsersController.class);

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    UsersService usersService;

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    FilesStorageService filesStorageService;
    @Autowired
    ModelMapper mapper;

    @GetMapping(value = "/profile/image")
    @ResponseBody
    public ResponseEntity<String> getFile(HttpServletRequest request) {
        String token =  request.getHeader(JWTCreator.HEADER_AUTHORIZATION);

        if (token != null && !token.isEmpty()) {
            JWTObject tokenObject =  JWTCreator.Reverse(token);

            String resource = filesStorageService.load(tokenObject.getSubject());
            if(resource == null) {
               return ResponseEntity.ok().build();
            }
            return ResponseEntity.ok()
                    .body(resource);

        }else {
            throw new RuntimeException("User not found");
        }

    }

    @DeleteMapping(value = "/profile/delete/image")
    public ResponseEntity deleteImageProfile(HttpServletRequest request) {
        String token =  request.getHeader(JWTCreator.HEADER_AUTHORIZATION);

        if (token != null && !token.isEmpty()) {
            JWTObject tokenObject =  JWTCreator.Reverse(token);

            try {
                filesStorageService.delete(tokenObject.getSubject());
                return ResponseEntity.status(HttpStatus.OK).build();
            } catch (Exception e){
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
            }


        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

    }

    @PostMapping(value = "/profile/image/upload")
    public ResponseEntity addImageProfile(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        String token =  request.getHeader(JWTCreator.HEADER_AUTHORIZATION);
        String message = "";

        if (token != null && !token.isEmpty()){
            JWTObject tokenObject =  JWTCreator.Reverse(token);

            try {
                String filename = filesStorageService.save(file, tokenObject.getSubject());

                Optional<Users> user = usersService.findById(tokenObject.getSubject());
                if (user.isPresent()){
                    user.get().setProfile(filename);
                    usersRepository.save(user.get());
                }

                message = "Uploaded the file successfully: " + file.getOriginalFilename();
                return ResponseEntity.status(HttpStatus.OK).body(message);
            } catch (Exception e) {
                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
            }


        } else {
             return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
          }
    }

    @GetMapping(value = "/profile")
    public ResponseEntity getUser(HttpServletRequest request) {
        String token =  request.getHeader(JWTCreator.HEADER_AUTHORIZATION);

        if (token != null && !token.isEmpty()) {
            JWTObject tokenObject =  JWTCreator.Reverse(token);

            Optional<Users> user = usersService.findById(tokenObject.getSubject());
            if (user.isPresent()) {
                return ResponseEntity.ok().body(mapper.map(user, GetUser.class));
                } else {
                    return ResponseEntity.badRequest().body("User not found");
                }
            } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping(value = "/profile/edit")
    public ResponseEntity updateUser(@RequestBody @Valid EditUser editUser, HttpServletRequest request) {
        String token =  request.getHeader(JWTCreator.HEADER_AUTHORIZATION);

        if (token != null && !token.isEmpty()) {
            JWTObject tokenObject =  JWTCreator.Reverse(token);

            Optional<Users> user = usersService.findById(tokenObject.getSubject());
            if (user.isPresent()) {
                try {
                    usersService.updateUser(editUser, user.get());
                    return ResponseEntity.ok().build();
                }catch (Exception e){
                    return ResponseEntity.badRequest().body(e.getMessage());
                }
            } else {
                return ResponseEntity.badRequest().body("User not found");
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("/new")
    public ResponseEntity createUser(@RequestBody @Valid CreateUsers createUsers) {
        Users user = mapper.map(createUsers, Users.class);
        try {
            CreateUsers newUser = mapper.map(usersService.Create(user), CreateUsers.class);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("User was created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }

    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid LoginUsers loginUsers) {

        Optional<Users> optional = usersService.findByUsername(loginUsers.getUsername());
        if (optional.isEmpty()){
            return ResponseEntity.badRequest().body("Username not found.");
        }

        try{
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                    new UsernamePasswordAuthenticationToken(
                            loginUsers.getUsername(), loginUsers.getPassword()
                    );
            Authentication authentication = authenticationManager
                    .authenticate(usernamePasswordAuthenticationToken);
            JWTObject jwtObject = new JWTObject();

            jwtObject.setIssuedAt(new Date());
            jwtObject.setClaim(optional.get().getUsername());
            jwtObject.setSubject(optional.get().getId());
            String token = JWTCreator.Generate(jwtObject);
            return ResponseEntity.status(HttpStatus.OK)
                    .header(HttpHeaders.AUTHORIZATION, token)
                    .body(token);

        }catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid password.");
        }
    }

//    @GetMapping(value = "/profile/publications")
//    public ResponseEntity getUserPublications(HttpServletRequest request) {
//        String token =  request.getHeader(JWTCreator.HEADER_AUTHORIZATION);
//
//        if (token != null && !token.isEmpty()) {
//            JWTObject tokenObject =  JWTCreator.Reverse(token);
//
//            Optional<Users> user = usersService.findByUsername(tokenObject.getSubject());
//            if (user.isPresent()) {
//                Users users = user.get();
//                List<CreatePublication> publication = users.getPublications().stream()
//                        .map(x -> mapper.map(x,CreatePublication.class)).collect(Collectors.toList());
//
//                return ResponseEntity.ok().body(publication);
//            } else {
//                return ResponseEntity.badRequest().body("User not found");
//            }
//        } else {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
//        }
//    }
}

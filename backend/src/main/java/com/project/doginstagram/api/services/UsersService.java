package com.project.doginstagram.api.services;

import com.project.doginstagram.api.dto.users.EditUser;
import com.project.doginstagram.api.entity.Users;
import com.project.doginstagram.api.repository.UsersRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Service
public class UsersService {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    PublicationService publicationService;

    @Autowired
    ModelMapper mapper;

    @Autowired
    BCryptPasswordEncoder encoder;

    public Users Create(Users user) throws Exception {
        String username = user.getUsername();
        String emailPhone = user.getEmailPhone();

        Optional<Users> userByName = usersRepository.findByUsername(username);
        Optional<Users> userByEmailOrPhone = usersRepository.findByEmailPhone(emailPhone);

        if (userByName.isPresent()){throw new Exception("Username already exists.");}

        if (userByEmailOrPhone.isPresent()){throw new Exception("Mobile number or email are already being used.");}

        String uuid = UUID.randomUUID().toString();
        user.setId(uuid);
        user.setPassword(encoder.encode(user.getPassword()));

        return usersRepository.save(user);
    }

    public Users updateUser(EditUser editUser, Users user) throws Exception {
        String username = editUser.getUsername();
        String emailPhone = editUser.getEmailPhone();

        Optional<Users> userByName = usersRepository.findByUsername(username);
        Optional<Users> userByEmailOrPhone = usersRepository.findByEmailPhone(emailPhone);

        if (userByName.isPresent()){throw new Exception("Username already exists.");}

        if (userByEmailOrPhone.isPresent()){throw new Exception("Mobile number or email are already being used.");}

        user.setName(editUser.getName());
        user.setUsername(editUser.getUsername());
        user.setEmailPhone(editUser.getEmailPhone());
        user.setBiography(editUser.getBiography());

        return usersRepository.save(user);
    }

    public Optional<Users> findByUsername(String userName) {
        return usersRepository.findByUsername(userName);
    }

    public Optional<Users> findByEmailPhone(String emailOrPhone){
        return usersRepository.findByEmailPhone(emailOrPhone);
    }

    public Optional<Users> findById(String id){
        int length = publicationService.getAllPublications(id).size();
        Optional<Users> user = usersRepository.findById(id);
        user.ifPresent(users -> users.setPublications(length));
        return user;
    }

    public void addNewProfileImage(String username, String url) {
        usersRepository.updateProfileImage(username, url);
    }

    public void deleteProfileImage(String username) {
        usersRepository.deleteProfileImage(username);
    }



}

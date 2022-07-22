package com.project.doginstagram.api.services;

import com.project.doginstagram.api.entity.Users;
import com.project.doginstagram.api.repository.UsersRepository;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class FilesStorageService {

    @Autowired
    UsersRepository usersRepository;
    private final Path root = Paths.get("profiles");

    public void init(){
        try {
            Files.createDirectory(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    public String save(MultipartFile file, String id ) {

        String filename = id + file.getOriginalFilename();
        Optional<Users> user = usersRepository.findById(id);

        if (user.isPresent()){
            if (user.get().getProfile() != null){
                try {
                    Files.delete(root.resolve(user.get().getProfile()));
                }catch (IOException e) {
                    throw new RuntimeException("Could not delete the file!");
                }
            }
            try {
                Files.copy(file.getInputStream(),this.root.resolve(filename));
                user.get().setProfile(filename);
                usersRepository.save(user.get());

                return filename;
            } catch (Exception e) {
                throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public String load( String id) {
        Optional<Users> user = usersRepository.findById(id);

        if (user.isPresent()) {
            if (user.get().getProfile() == null) {
                return null;
            }
            try {
                String extension =  FilenameUtils.getExtension(root.resolve(user.get().getProfile()).toString());
                String url = "data:image/"+extension+";base64,";
                byte[] bytes = Files.readAllBytes(root.resolve(user.get().getProfile()));
                return url + Base64.getEncoder().encodeToString(bytes);


            }catch (IOException e) {
                throw new RuntimeException("Error: " + e.getMessage());
            }

        } else {
             throw new RuntimeException("User not found");
         }

    }

    public void delete( String id) {
        Optional<Users> user = usersRepository.findById(id);
        if (user.isPresent()) {
            if (user.get().getProfile() != null) {
                try {
                    Files.delete(root.resolve(user.get().getProfile()));
                    user.get().setProfile(null);
                    usersRepository.save(user.get());
                }catch (IOException e) {
                    throw new RuntimeException("Could not delete the file!");
                }
            }
        }
    }
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(root.toFile());
    }

    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.root, 1).filter(path -> !path.equals(this.root)).map(this.root::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }
}

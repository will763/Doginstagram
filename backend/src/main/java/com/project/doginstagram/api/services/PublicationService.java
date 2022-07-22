package com.project.doginstagram.api.services;

import com.project.doginstagram.api.dto.users.publicationdto.GetAllPublication;
import com.project.doginstagram.api.entity.Publication;
import com.project.doginstagram.api.entity.Users;
import com.project.doginstagram.api.repository.PublicationRepository;
import com.project.doginstagram.api.repository.UsersRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@NoArgsConstructor
@AllArgsConstructor
@Service
public class PublicationService {

    private final Path root = Paths.get("publications");

    @Autowired
    UsersRepository usersRepository;
    @Autowired
    PublicationRepository publicationRepository;

    public void save(MultipartFile file, String legend, String id){
        Optional<Users> user = usersRepository.findById(id);

        if (user.isPresent()){
            try {
                String uuid = UUID.randomUUID().toString();
                String filename = id + uuid + file.getOriginalFilename();
                Files.copy(file.getInputStream(), this.root.resolve(filename));
                Publication publication = new Publication();
                publication.setLegend(legend);
                publication.setUrl(filename);
                publication.setUserId(id);
                publication.setLikes(0);
                publicationRepository.save(publication);
            } catch (Exception e) {
                throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public List<GetAllPublication> getAllPublications(String id) {
        Optional<Users> user = usersRepository.findById(id);
        if (user.isEmpty()){
            throw new RuntimeException("User not found");
        }

       List<Publication> publications = publicationRepository.findAllByUserId(id);

        return publications.stream().map(publication -> {
            GetAllPublication getAllPublication = new GetAllPublication();

            String extension =  FilenameUtils.getExtension(root.resolve(publication.getUrl()).toString());
            String url = "data:image/"+extension+";base64,";
            try {
                byte[] bytes = Files.readAllBytes(root.resolve(publication.getUrl()));
                getAllPublication.setUrl(url + Base64.getEncoder().encodeToString(bytes));
                getAllPublication.setLegend(publication.getLegend());
                getAllPublication.setLikes(publication.getLikes());
                getAllPublication.setUsername(user.get().getUsername());
                getAllPublication.setId(publication.getId());
                return getAllPublication;
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage());
            }
        }).collect(Collectors.toList());
    }

    public void delete( Long id) {
        Optional<Publication> publication = publicationRepository.findById(id);
        if (publication.isPresent()) {
                try {
                    Files.delete(root.resolve(publication.get().getUrl()));
                    publicationRepository.deleteById(id);
                }catch (IOException e) {
                    throw new RuntimeException("Could not delete the file!");
                }
            }
    }

    public void updatePublication( Long id, String legend) {
        Optional<Publication> publication = publicationRepository.findById(id);
        if (publication.isPresent()) {
            try {
                publication.get().setLegend(legend);
                publicationRepository.save(publication.get());
            }catch (Exception e) {
                throw new RuntimeException(e.getMessage());
            }
        }
    }

    public void updateLikePublication( Long id) {
        Optional<Publication> publication = publicationRepository.findById(id);
        if (publication.isPresent()) {
            try {
                publication.get().setLikes(
                        publication.get().getLikes() + 1
                );
                publicationRepository.save(publication.get());
            }catch (Exception e) {
                throw new RuntimeException(e.getMessage());
            }
        }
    }

    public void deletePublication(Long id){
        publicationRepository.deleteById(id);
    }

    public List<Publication> getAllPublication(){
        return publicationRepository.findAll();
    }
}

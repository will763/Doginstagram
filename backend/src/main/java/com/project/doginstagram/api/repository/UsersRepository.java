package com.project.doginstagram.api.repository;

import com.project.doginstagram.api.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {

    Optional<Users> findByUsername(String userName);

    Optional<Users> findByEmailPhone(String emailPhone);

    Optional<Users> findById(String id);

    @Modifying
    @Query("UPDATE Users SET profile = ?2 WHERE username = ?1")
    void updateProfileImage(String username, String url);

    @Modifying
    @Query("UPDATE Users SET profile = null WHERE username = ?1")
    void deleteProfileImage(String username);
}

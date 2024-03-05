package com.openclassrooms.starterjwt.services;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    UserRepository userRepository;

    @Test
    public void givenAnUser_whenFindById_thenShouldUseUserRepositoryAndFindTheSameUser() {
        // GIVEN
        User givenUser = new User();
        givenUser.setId(99L);
        givenUser.setEmail("find-by-id@mail.com");
        givenUser.setLastName("By-Id");
        givenUser.setFirstName("Find");
        givenUser.setPassword("pass");
        givenUser.setAdmin(true);
        givenUser.setCreatedAt(LocalDateTime.now());
        givenUser.setUpdatedAt(null);
        when(userRepository.findById(99L)).thenReturn(Optional.of(givenUser));

        // WHEN
        UserService userService = new UserService(this.userRepository);
        User userByService = userService.findById(99L);

        // THEN
        verify(userRepository).findById(99L);
        assertThat(userByService).isEqualTo(givenUser);
    }

    @Test
    public void givenAnUser_whenDelete_thenShouldUseUserRepositoryAndDeleteTheUser(){
        // GIVEN
        User givenUser = new User();
        givenUser.setId(98L);
        givenUser.setEmail("delete-by-id@mail.com");
        givenUser.setLastName("By-Id");
        givenUser.setFirstName("Delete");
        givenUser.setPassword("pass");
        givenUser.setAdmin(false);
        givenUser.setCreatedAt(LocalDateTime.now());
        givenUser.setUpdatedAt(null);
        User deletedUser = null;
        when(userRepository.findById(98L)).thenReturn(Optional.empty());

        // WHEN
        UserService userService = new UserService(this.userRepository);
        userService.delete(98L);
        deletedUser = userService.findById(98L);

        // THEN
        verify(userRepository).deleteById(98L);
        assertThat(deletedUser).isEqualTo(null);
    }
}
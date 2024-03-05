package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SessionServiceTest {
    @Mock
    SessionRepository sessionRepository;

    @Mock
    UserRepository userRepository;

    @Test
    public void givenASession_whenGetById_thenShouldUseSessionRepositoryAndFindTheSameSession() {
        // GIVEN
        Session givenSession = new Session();
        givenSession.setId(111L);
        givenSession.setName("Session-By-Id");
        givenSession.setDate(new Date());
        givenSession.setTeacher(new Teacher(121L, "Of the Session", "Teacher", LocalDateTime.now(), null));
        givenSession.setDescription("Get the session");
        givenSession.setCreatedAt(LocalDateTime.now());
        givenSession.setUpdatedAt(null);
        when(sessionRepository.findById(givenSession.getId())).thenReturn(Optional.of(givenSession));

        // WHEN
        SessionService sessionService = new SessionService(sessionRepository, userRepository);
        Session sessionByService = sessionService.getById(givenSession.getId());

        // THEN
        verify(sessionRepository).findById(givenSession.getId());
        assertThat(sessionByService).isEqualTo(givenSession);
    }

    @Test
    public void givenSessions_whenFindAll_thenShouldUseSessionRepositoryAndFindAllTheSessions() {
        // GIVEN
        List<Session> givenSessions = new ArrayList<>();
        List<User> givenUsers = new ArrayList<>();
        Teacher givenTeacher = new Teacher(141L, "Of the Session", "Teacher", LocalDateTime.now(), null);
        givenUsers.add(new User(151L, "user-one@mail.com","One", "User", "pass", false, LocalDateTime.now(), null));
        givenSessions.add(new Session(131L, "First session", new Date(), "The first of the list", givenTeacher, givenUsers, LocalDateTime.now(), null));
        givenSessions.add(new Session(132L, "Second session", new Date(), "The second of the list", givenTeacher, givenUsers, LocalDateTime.now(), null));
        givenSessions.add(new Session(133L, "Third session", new Date(), "The third of the list", givenTeacher, givenUsers, LocalDateTime.now(), null));
        when(sessionRepository.findAll()).thenReturn(givenSessions);

        // WHEN
        SessionService sessionService = new SessionService(sessionRepository, userRepository);
        List<Session> sessionsByService = sessionService.findAll();

        // THEN
        verify(sessionRepository).findAll();
        assertThat(sessionsByService).isEqualTo(givenSessions);
        assertThat(sessionsByService).size().isEqualTo(3);
        assertThat(sessionsByService.size()).isEqualTo(givenSessions.size());
    }

    @Test
    public void givenASession_whenCreate_shouldUseSessionRepositoryAndCreateTheSession() {
        // GIVEN
        Session givenSession = new Session();
        givenSession.setId(111L);
        givenSession.setName("Session-By-Id");
        givenSession.setDate(new Date());
        givenSession.setTeacher(new Teacher(121L, "Of the Session", "Teacher", LocalDateTime.now(), null));
        givenSession.setDescription("Get the session");
        givenSession.setCreatedAt(LocalDateTime.now());
        givenSession.setUpdatedAt(null);
        when(sessionRepository.save(givenSession)).thenReturn(givenSession);

        // WHEN
        SessionService sessionService = new SessionService(sessionRepository, userRepository);
        Session sessionByService = sessionService.create(givenSession);

        // THEN
        verify(sessionRepository).save(givenSession);
        assertThat(sessionByService).isEqualTo(givenSession);
    }

    @Test
    public void givenASession_whenDelete_thenShouldUseSessionRepositoryAndDeleteTheSession(){
        // GIVEN
        Session givenSession = new Session();
        List<User> givenUsers = new ArrayList<>();
        givenSession.setId(110L);
        givenSession.setName("To Delete");
        givenSession.setDate(new Date());
        givenSession.setTeacher(new Teacher(141L, "Of the Session", "Teacher", LocalDateTime.now(), null));
        givenSession.setUsers(givenUsers);
        givenSession.setCreatedAt(LocalDateTime.now());
        givenSession.setUpdatedAt(null);

        // WHEN
        SessionService sessionService = new SessionService(sessionRepository, userRepository);
        sessionService.delete(givenSession.getId());

        // THEN
        verify(sessionRepository).deleteById(givenSession.getId());
    }

    @Test
    public void givenASession_whenUpdate_shouldUseSessionRepositoryAndUpdateTheSession () {
        // GIVEN
        Session givenSession = new Session();
        givenSession.setId(111L);
        givenSession.setName("Session-By-Id");
        givenSession.setDate(new Date());
        givenSession.setTeacher(new Teacher(121L, "Of the Session", "Teacher", LocalDateTime.now(), null));
        givenSession.setDescription("Get the session");
        givenSession.setCreatedAt(LocalDateTime.now());
        givenSession.setUpdatedAt(null);
        when(sessionRepository.save(givenSession)).thenReturn(givenSession);

        // WHEN
        SessionService sessionService = new SessionService(sessionRepository, userRepository);
        Session sessionByService = sessionService.update(givenSession.getId(), givenSession);

        // THEN
        verify(sessionRepository).save(givenSession);
        assertThat(sessionByService).isEqualTo(givenSession);
    }

    @Test
    public void givenASessionAndAnUser_whenParticipate_shouldUseSessionRepositoryAndAddTheUserInTheSession() {
        // GIVEN
        Session givenSession = new Session();
        givenSession.setId(111L);
        givenSession.setName("Session-Updated");
        givenSession.setDate(new Date());
        givenSession.setTeacher(new Teacher(121L, "Of the Session", "Teacher", LocalDateTime.now(), null));
        givenSession.setDescription("Update the session");
        givenSession.setCreatedAt(LocalDateTime.now());
        givenSession.setUpdatedAt(null);
        List<User> givenUsers = new ArrayList<>();
        givenUsers.add(new User(151L, "user-one@mail.com","One", "User", "pass", false, LocalDateTime.now(), null));
        givenSession.setUsers(givenUsers);
        User userWhoParticipates = new User(152L, "user-two@mail.com","Two", "User", "pass", false, LocalDateTime.now(), null);
        when(sessionRepository.findById(givenSession.getId())).thenReturn(Optional.of(givenSession));
        when(userRepository.findById(userWhoParticipates.getId())).thenReturn(Optional.of(userWhoParticipates));

        // WHEN
        SessionService sessionService = new SessionService(sessionRepository, userRepository);
        sessionService.participate(givenSession.getId(),userWhoParticipates.getId());

        // THEN
        verify(sessionRepository).findById(givenSession.getId());
        verify(userRepository).findById(userWhoParticipates.getId());
        assertThat(givenSession.getUsers().size()).isEqualTo(2);
    }

    @Test
    public void givenASessionAndAnUser_whenNoLongerParticipate_shouldUseSessionRepositoryAndDeleteTheUserFromTheSession() {
        // GIVEN
        Session givenSession = new Session();
        givenSession.setId(111L);
        givenSession.setName("Session-Updated");
        givenSession.setDate(new Date());
        givenSession.setTeacher(new Teacher(121L, "Of the Session", "Teacher", LocalDateTime.now(), null));
        givenSession.setDescription("Update the session");
        givenSession.setCreatedAt(LocalDateTime.now());
        givenSession.setUpdatedAt(null);
        List<User> givenUsers = new ArrayList<>();
        givenUsers.add(new User(151L, "user-one@mail.com","One", "User", "pass", false, LocalDateTime.now(), null));
        User givenUserToRemove = new User(152L, "user-two@mail.com","Two", "User", "pass", false, LocalDateTime.now(), null);
        givenUsers.add(givenUserToRemove);
        givenSession.setUsers(givenUsers);
        when(sessionRepository.findById(givenSession.getId())).thenReturn(Optional.of(givenSession));

        // WHEN
        SessionService sessionService = new SessionService(sessionRepository, userRepository);
        sessionService.noLongerParticipate(givenSession.getId(),givenUserToRemove.getId());

        // THEN
        verify(sessionRepository).findById(givenSession.getId());
        assertThat(givenSession.getUsers().size()).isEqualTo(1);
    }
}

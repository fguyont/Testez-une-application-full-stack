package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.repository.TeacherRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TeacherServiceTest {

    @Mock
    TeacherRepository teacherRepository;

    @Test
    public void givenATeacher_whenFindById_thenShouldUseTeacherRepositoryAndGetTheSameTeacher() {
        // GIVEN
        Teacher givenTeacher = new Teacher();
        givenTeacher.setId(90L);
        givenTeacher.setLastName("By-Id");
        givenTeacher.setFirstName("Find");
        givenTeacher.setCreatedAt(LocalDateTime.now());
        givenTeacher.setUpdatedAt(null);
        when(teacherRepository.findById(givenTeacher.getId())).thenReturn(Optional.of(givenTeacher));

        // WHEN
        TeacherService teacherService = new TeacherService(this.teacherRepository);
        Teacher teacherByService = teacherService.findById(givenTeacher.getId());

        // THEN
        verify(teacherRepository).findById(givenTeacher.getId());
        assertThat(teacherByService).isEqualTo(givenTeacher);
    }

    @Test
    public void givenTeachers_whenFindAll_thenShouldUseTeacherRepositoryAndFindAllTheSameTeachers() {
        // GIVEN
        List<Teacher> givenTeachers = new ArrayList<>();

        givenTeachers.add(new Teacher(91L, "Teacher", "First", LocalDateTime.now(), null));
        givenTeachers.add(new Teacher(92L, "Teacher", "Second", LocalDateTime.now(), null));
        givenTeachers.add(new Teacher(93L, "Teacher", "Third", LocalDateTime.now(), null));

        TeacherService teacherService = new TeacherService(teacherRepository);
        when(teacherRepository.findAll()).thenReturn(givenTeachers);

        // WHEN
        List<Teacher> teachersByService = teacherService.findAll();

        // THEN
        verify(teacherRepository).findAll();
        assertThat(teachersByService).isEqualTo(givenTeachers);
        assertThat(teachersByService.size()).isEqualTo(3);
        assertThat(teachersByService.size()).isEqualTo(givenTeachers.size());
    }

}
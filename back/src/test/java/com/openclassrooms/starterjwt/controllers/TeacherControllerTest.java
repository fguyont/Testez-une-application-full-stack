package com.openclassrooms.starterjwt.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.security.test.context.support.WithMockUser;
import static org.hamcrest.Matchers.is;

@SpringBootTest
@AutoConfigureMockMvc
public class TeacherControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser
    public void whenGetATeacher_thenShouldGetTeacherDetails() throws Exception {
        mockMvc.perform(get("/api/teacher/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)));
    }

    @Test
    @WithMockUser
    public void whenGetANonExistingTeacher_thenShouldNotFound() throws Exception {
        mockMvc.perform(get("/api/teacher/-100000"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser
    public void whenGetATeacherWithABadUrl_thenShouldBadRequest() throws Exception {
        mockMvc.perform(get("/api/teacher/session"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser
    public void whenGetAllTheTeachers_thenShouldGetAllTheTeachers() throws Exception {
        mockMvc.perform(get("/api/teacher"))
                .andExpect(status().isOk());
    }
}

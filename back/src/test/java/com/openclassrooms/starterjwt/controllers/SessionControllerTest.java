package com.openclassrooms.starterjwt.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.starterjwt.dto.SessionDto;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
@AutoConfigureMockMvc
public class SessionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Order(3)
    @Test
    @WithMockUser
    public void whenGetSession_thenShouldGetSessionDetails() throws Exception {
        mockMvc.perform(get("/api/session/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)));
    }

    @Order(4)
    @Test
    @WithMockUser
    public void whenGetSession_thenShouldNotFoundSession() throws Exception {
        mockMvc.perform(get("/api/session/-1000"))
                .andExpect(status().isNotFound());
    }

    @Order(5)
    @Test
    @WithMockUser
    public void whenGetSession_thenShouldBadRequest() throws Exception {
        mockMvc.perform(get("/api/session/teacher"))
                .andExpect(status().isBadRequest());
    }

    @Order(6)
    @Test
    @WithMockUser
    public void whenGetAllSessions_thenShouldFindAllSessions() throws Exception {
        mockMvc.perform(get("/api/session"))
                .andExpect(status().isOk());
    }

    @Order(1)
    @Test
    public void whenGetAllSessionsWithoutBeingLogged_thenShouldUnauthorized() throws Exception {
        mockMvc.perform(get("/api/session"))
                .andExpect(status().isUnauthorized());
    }

    @Order(2)
    @Test
    @WithMockUser
    public void whenCreateASession_thenShouldCreateASession() throws Exception {
        SessionDto sessionDto = new SessionDto();
        sessionDto.setName("Session for beginners");
        sessionDto.setDate(new Date());
        sessionDto.setTeacher_id(1L);
        sessionDto.setDescription("For beginners not experts !");
        String jsonRequest = objectMapper.writeValueAsString(sessionDto);

        mockMvc.perform(post("/api/session")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isOk());
    }

    @Order(8)
    @Test
    @WithMockUser
    public void whenUpdateASession_thenShouldUpdateASession() throws Exception {
        SessionDto sessionDto = new SessionDto();
        sessionDto.setName("New Session for beginners");
        sessionDto.setDate(new Date());
        sessionDto.setTeacher_id(1L);
        sessionDto.setDescription("I repeat for beginners !");
        String jsonRequest = objectMapper.writeValueAsString(sessionDto);

        mockMvc.perform(put("/api/session/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isOk());
    }

    @Order(7)
    @Test
    @WithMockUser
    public void whenUpdateASessionWithoutAName_thenShouldBadRequest() throws Exception {
        SessionDto sessionDto = new SessionDto();
        sessionDto.setName("");
        sessionDto.setDate(new Date());
        sessionDto.setTeacher_id(1L);
        sessionDto.setDescription("I repeat for beginners !");
        String jsonRequest = objectMapper.writeValueAsString(sessionDto);

        mockMvc.perform(put("/api/session/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isBadRequest());
    }

    @Order(17)
    @Test
    @WithMockUser
    public void whenDeleteASession_thenShouldDelete() throws Exception {
        mockMvc.perform(delete("/api/session/1"))
                .andExpect(status().isOk());
    }

    @Order(16)
    @Test
    @WithMockUser
    public void whenDeleteASessionWithABadUrl_thenShouldBadRequest() throws Exception {
        mockMvc.perform(delete("/api/session/teacher"))
                .andExpect(status().isBadRequest());
    }

    @Order(15)
    @Test
    @WithMockUser
    public void whenDeleteANonExistingSession_thenShouldNotFound() throws Exception {
        mockMvc.perform(delete("/api/session/-999"))
                .andExpect(status().isNotFound());
    }

    @Order(9)
    @Test
    @WithMockUser
    public void whenParticipateASession_thenShouldParticipate() throws Exception {
        mockMvc.perform(post("/api/session/1/participate/1"))
                .andExpect(status().isOk());
    }

    @Order(10)
    @Test
    @WithMockUser
    public void whenParticipateASessionWithABadUrl_thenShouldBadRequest() throws Exception {
        mockMvc.perform(post("/api/session/1/participate/teacher"))
                .andExpect(status().isBadRequest());
    }

    @Order(13)
    @Test
    @WithMockUser
    public void whenParticipateASessionWithANonExistingSession_thenShouldNotFound() throws Exception {
        mockMvc.perform(post("/api/session/-999/participate/1"))
                .andExpect(status().isNotFound());
    }

    @Order(14)
    @Test
    @WithMockUser
    public void whenNoLongerParticipateASession_thenShouldNoLongerParticipate() throws Exception {
        mockMvc.perform(delete("/api/session/1/participate/1"))
                .andExpect(status().isOk());
    }

    @Order(12)
    @Test
    @WithMockUser
    public void whenNoLongerParticipateASessionWithABadUrl_thenShouldBadRequest() throws Exception {
        mockMvc.perform(delete("/api/session/1/participate/teacher"))
                .andExpect(status().isBadRequest());
    }

    @Order(11)
    @Test
    @WithMockUser
    public void whenNoLongerParticipateASessionWithANonExistingSession_thenShouldNotFound() throws Exception {
        mockMvc.perform(delete("/api/session/-999/participate/1"))
                .andExpect(status().isNotFound());
    }

}

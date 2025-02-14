package com.openclassrooms.starterjwt.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser
    public void whenGetUser_thenReturnsUserDetails() throws Exception {
        mockMvc.perform(get("/api/user/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.email", is("yoga@studio.com")));
    }

    @Test
    @WithMockUser
    public void whenGetUser_thenReturnsNotFoundError() throws Exception {
        mockMvc.perform(get("/api/user/-100000"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser
    public void whenGetUserWithBadUrl_thenIsBadRequest() throws Exception {
        mockMvc.perform(delete("/api/user/session"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser
    public void whenDeleteUserAsNonAdmin_thenIsUnauthorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/api/user/2")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }
}
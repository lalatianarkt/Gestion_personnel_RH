package com.rh.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.rh.Model.User;
import com.rh.Service.UserService;

public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public String authentify(@RequestBody User user) {
        try {
                
            return "Créée avec succès";
        } catch (Exception e) {
            e.printStackTrace();
            return "Erreur lors de la création: " + e.getMessage();
        }
    }
} 


package com.rh.manage.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rh.manage.Service.InfosProfessionnellesService;

@RestController
@RequestMapping("/api/infosPro")
public class InfosProfessionnellesController {

    @Autowired
    private InfosProfessionnellesService infosProService;

    @GetMapping("/check-matricule/{matricule}")
    public boolean checkMatricule(@PathVariable String matricule) {
        return infosProService.isMatriculeExists(matricule);
    }
}


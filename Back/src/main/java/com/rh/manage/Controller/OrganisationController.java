package com.rh.manage.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rh.manage.Dto.OrganisationDTO;
import com.rh.manage.Model.Employe;
import com.rh.manage.Service.OrganisationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/organisation")
public class OrganisationController {
    @Autowired
    OrganisationService organisationService;

    // @GetMapping
    // public ResponseEntity<List<OrganisationDTO>> getAllOrganisation() {
    //     try {
    //         List<OrganisationDTO> organisations = organisationService.getAllOrganisation();
    //         return ResponseEntity.ok(organisations);
    //     } catch (RuntimeException e) {
    //         // Retourne un status 500 avec le message d'erreur
    //         return ResponseEntity.status(500).body(null);
    //     }
    // }
}

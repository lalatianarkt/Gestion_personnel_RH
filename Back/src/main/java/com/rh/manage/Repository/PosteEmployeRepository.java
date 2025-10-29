package com.rh.manage.Repository;

import com.rh.manage.Model.PosteEmploye;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PosteEmployeRepository extends JpaRepository<PosteEmploye, String> {

    // Récupérer tous les postes d'un employé
    List<PosteEmploye> findByEmployeId(String employeId);

    // Récupérer tous les employés d'un poste
    List<PosteEmploye> findByPosteId(String posteId);
}

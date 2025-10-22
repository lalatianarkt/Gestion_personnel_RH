package com.rh.manage.Service;

import com.rh.manage.Model.Employe;
import com.rh.manage.Model.InfosProfessionnelles;
import com.rh.manage.Model.TypeUser;
import com.rh.manage.Model.User;
import com.rh.manage.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired 
    private InfosProfessionnellesService infosProfessionnellesService;

    @Autowired 
    private EmployeService employeService;

    @Autowired 
    private TypeUserService typeUserService;
    
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public Optional<User> findByEmployeId(String employeId) {
        return userRepository.findByEmployeId(employeId);
    }
    
    public User save(User user) {
        return userRepository.save(user);
    }
    
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    public void deleteById(String id) {
        userRepository.deleteById(id);
    }

    public User authenticate(User userRequest) {
        // 1️⃣ Récupérer l'utilisateur par email
        Optional<User> optionalUser = userRepository.findByEmail(userRequest.getEmail());
        
        if (optionalUser.isEmpty()) {
            System.out.println("⚠️ Aucun utilisateur trouvé avec cet email !");
            return null;
        }

        User utilisateur = optionalUser.get();

        // 2️⃣ Vérifier le mot de passe (BCrypt)
        if (!BCrypt.checkpw(userRequest.getPassword(), utilisateur.getPassword())) {
            System.out.println("❌ Mot de passe incorrect !");
            return null;
        }

        // 3️⃣ Retourner l'utilisateur trouvé
        return utilisateur;
    }


    public User registerUser(User user) {
        // 0️⃣ Vérifier que l'email n'est pas vide
        if(user.getEmail() == null || user.getEmail().isBlank()) {
            throw new RuntimeException("L'email ne peut pas être vide");
        }

        // // 0️⃣ Vérifier que l'email a un format correct simple
        // String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
        // if(!user.getEmail().matches(emailRegex)) {
        //     throw new RuntimeException("L'email n'a pas un format valide");
        // }

        // // 1️⃣ Vérifier si l'email existe déjà dans la base
        // if(userRepository.existsByEmail(user.getEmail())) {
        //     throw new RuntimeException("Email déjà utilisé");
        // }
        
        // user = userRepository.findByEmail(user.getEmail()).get();
        Employe employe = employeService.getByEmail(user.getEmail()).get(); 
        user.setEmploye(employe);
        System.out.println("hereeeeeeeeeeeeeeeeeeeeeeeeeeee : " + user.getEmail());

        // 2️⃣ Vérifier que le matricule existe
        Optional<InfosProfessionnelles> infosProOpt = infosProfessionnellesService
                .findByMatricule(user.getEmploye().getInfosProfessionnelles().getMatricule());
        if(infosProOpt.isEmpty()) {
            throw new RuntimeException("Le matricule n'existe pas dans InfosProfessionnelles");
        }

        InfosProfessionnelles infosPro = infosProOpt.get();

        // 3️⃣ Vérifier qu'aucun user n'a déjà cet employé
        if(userRepository.existsByEmploye_Id(infosPro.getId())) {
            throw new RuntimeException("Un utilisateur est déjà associé à ce matricule");
        }

        TypeUser typeUser = typeUserService.getTypeUserById(user.getTypeUser().getId()).get();
        user.setTypeUser(typeUser);

        // 4️⃣ Hasher le mot de passe
        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedPassword);

        // 5️⃣ Remplir les dates
        // user.setCreatedAt(LocalDateTime.now());

        System.out.println("débogage+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        System.out.println("email received : " + user.getEmail());
        System.out.println("password received : " + user.getPassword());
        System.out.println("typeUser : " + user.getTypeUser().getCreatedAt());
        System.out.println("matricule : " + user.getEmploye().getInfosProfessionnelles().getDateEmbauche());
        System.out.println("employé : " + user.getEmploye().getId());



        System.out.println("débogage+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

        // 6️⃣ Lier l'employé
        // user.setEmploye(infosPro.getEmploye()); // si relation OneToOne User <-> Employe

        // 7️⃣ Enregistrer dans la base
        return userRepository.save(user);
    }




    

    
}
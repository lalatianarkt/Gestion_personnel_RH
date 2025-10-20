package com.rh.Service;

import com.rh.Model.User;
import com.rh.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
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



    

    
}
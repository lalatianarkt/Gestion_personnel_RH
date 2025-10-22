package com.rh.manage.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public String sendTokenEmail(String recipientEmail) {
        // Générer un token aléatoire
        String token = UUID.randomUUID().toString();

        // Créer le message
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("rakotovaolalatiana2@gmail.com"); // votre email
        message.setTo(recipientEmail);
        message.setSubject("Validation de votre compte");
        message.setText("Voici votre code de validation : " + token + "\nCe code est valide pour 30 secondes.");

        // Envoyer l'email
        mailSender.send(message);
        return token;
    }
}

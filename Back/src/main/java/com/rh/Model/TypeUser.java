package com.rh.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "type_user")
public class TypeUser {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(name = "type", length = 50, nullable = false, unique = true)
    private String type;  
    
}
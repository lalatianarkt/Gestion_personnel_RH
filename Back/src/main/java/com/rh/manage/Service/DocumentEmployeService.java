package com.rh.manage.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.rh.manage.Model.DocumentEmploye;
import com.rh.manage.Model.Employe;
import com.rh.manage.Model.TypeDocument;
import com.rh.manage.Repository.DocumentEmployeRepository;
import com.rh.manage.Repository.EmployeRepository;
import com.rh.manage.Repository.TypeDocumentRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DocumentEmployeService {

    @Autowired
    private DocumentEmployeRepository documentEmployeRepository;

    @Autowired
    private EmployeRepository employeRepository;

    @Autowired
    private TypeDocumentRepository typeDocumentRepository;

    private final Path rootLocation = Paths.get("uploads");

    // Récupérer tous les documents d'un employé avec les types
    public List<DocumentEmploye> getDocumentsByEmployeId(String employeId) {
        return documentEmployeRepository.findDocumentsWithTypeByEmployeId(employeId);
    }

    // Récupérer les documents d'un employé par type
    public List<DocumentEmploye> getDocumentsByEmployeIdAndType(String employeId, String typeDocumentId) {
        return documentEmployeRepository.findByEmployeIdAndTypeDocumentId(employeId, typeDocumentId);
    }

    // Récupérer tous les types de documents
    public List<TypeDocument> getAllTypeDocuments() {
        return typeDocumentRepository.findAllByOrderByIntitule();
    }

    // Télécharger un document
    public DocumentEmploye uploadDocument(String employeId, String typeDocumentId, MultipartFile file) throws IOException {
        // Vérifier que l'employé existe
        Employe employe = employeRepository.findById(employeId)
                .orElseThrow(() -> new RuntimeException("Employé non trouvé"));

        TypeDocument typeDocument = null;
        if (typeDocumentId != null && !typeDocumentId.isEmpty()) {
            typeDocument = typeDocumentRepository.findById(typeDocumentId)
                    .orElseThrow(() -> new RuntimeException("Type de document non trouvé"));
        }

        // Créer le répertoire s'il n'existe pas
        if (!Files.exists(rootLocation)) {
            Files.createDirectories(rootLocation);
        }

        // Générer un nom de fichier unique
        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String newFilename = System.currentTimeMillis() + "_" + employeId + fileExtension;
        Path destinationFile = rootLocation.resolve(Paths.get(newFilename)).normalize().toAbsolutePath();

        // Sauvegarder le fichier
        Files.copy(file.getInputStream(), destinationFile);

        // Créer l'entité DocumentEmploye
        DocumentEmploye document = new DocumentEmploye();
        document.setNomFichier(originalFilename);
        document.setCheminFichier(destinationFile.toString());
        document.setEmploye(employe);
        document.setTypeDocument(typeDocument);
        document.setDateUpload(LocalDateTime.now());

        return documentEmployeRepository.save(document);
    }

    // Supprimer un document
    public void deleteDocument(String documentId) throws IOException {
        DocumentEmploye document = documentEmployeRepository.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Document non trouvé"));

        // Supprimer le fichier physique
        Path filePath = Paths.get(document.getCheminFichier());
        if (Files.exists(filePath)) {
            Files.delete(filePath);
        }

        // Supprimer l'entrée en base
        documentEmployeRepository.delete(document);
    }

    // Récupérer le fichier pour téléchargement
    public DocumentEmploye downloadDocument(String documentId) {
        return documentEmployeRepository.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Document non trouvé"));
    }

    // Récupérer le contenu du fichier
    public byte[] getFileContent(String documentId) throws IOException {
        DocumentEmploye document = downloadDocument(documentId);
        Path filePath = Paths.get(document.getCheminFichier());
        return Files.readAllBytes(filePath);
    }
}

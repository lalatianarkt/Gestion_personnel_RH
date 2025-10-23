package com.rh.manage.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.rh.manage.Model.DocumentEmploye;
import com.rh.manage.Model.TypeDocument;
import com.rh.manage.Service.DocumentEmployeService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*")
public class DocumentEmployeController {

    @Autowired
    private DocumentEmployeService documentEmployeService;

    // Récupérer tous les documents d'un employé
    @GetMapping("/employe/{employeId}")
    public ResponseEntity<List<DocumentEmploye>> getDocumentsByEmploye(@PathVariable String employeId) {
        try {
            List<DocumentEmploye> documents = documentEmployeService.getDocumentsByEmployeId(employeId);
            return ResponseEntity.ok(documents);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } 
    }

    // Récupérer les documents d'un employé par type
    @GetMapping("/employe/{employeId}/type/{typeDocumentId}")
    public ResponseEntity<List<DocumentEmploye>> getDocumentsByEmployeAndType(
            @PathVariable String employeId, 
            @PathVariable String typeDocumentId) {
        try {
            List<DocumentEmploye> documents = documentEmployeService.getDocumentsByEmployeIdAndType(employeId, typeDocumentId);
            return ResponseEntity.ok(documents);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Récupérer tous les types de documents
    @GetMapping("/types")
    public ResponseEntity<List<TypeDocument>> getAllTypeDocuments() {
        try {
            List<TypeDocument> types = documentEmployeService.getAllTypeDocuments();
            return ResponseEntity.ok(types);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Télécharger un nouveau document
    @PostMapping("/upload")
    public ResponseEntity<DocumentEmploye> uploadDocument(
            @RequestParam("employeId") String employeId,
            @RequestParam(value = "typeDocumentId", required = false) String typeDocumentId,
            @RequestParam("file") MultipartFile file) {
        try {
            DocumentEmploye savedDocument = documentEmployeService.uploadDocument(employeId, typeDocumentId, file);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedDocument);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // Télécharger (download) un document
    @GetMapping("/download/{documentId}")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable String documentId) {
        try {
            DocumentEmploye document = documentEmployeService.downloadDocument(documentId);
            byte[] fileContent = documentEmployeService.getFileContent(documentId);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", document.getNomFichier());
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

            return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Voir un document (ouvrir dans le navigateur)
    @GetMapping("/view/{documentId}")
    public ResponseEntity<byte[]> viewDocument(@PathVariable String documentId) {
        try {
            DocumentEmploye document = documentEmployeService.downloadDocument(documentId);
            byte[] fileContent = documentEmployeService.getFileContent(documentId);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("inline", document.getNomFichier());

            return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Supprimer un document
    @DeleteMapping("/{documentId}")
    public ResponseEntity<Void> deleteDocument(@PathVariable String documentId) {
        try {
            documentEmployeService.deleteDocument(documentId);
            return ResponseEntity.noContent().build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Récupérer un document par son ID
    @GetMapping("/{documentId}")
    public ResponseEntity<DocumentEmploye> getDocumentById(@PathVariable String documentId) {
        try {
            DocumentEmploye document = documentEmployeService.downloadDocument(documentId);
            return ResponseEntity.ok(document);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
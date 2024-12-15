package ma.project.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ma.project.demo.Client;
import ma.project.demo.entities.Voiture;
import ma.project.demo.repositories.VoitureRepository;
import ma.project.demo.service.ClientService;

@RestController
public class VoitureController {
	@Autowired
	VoitureRepository voitureRepository;
	@Autowired
	ClientService clientService;
	
	@GetMapping(value = "/voitures", produces = {"application/json"})
	public ResponseEntity<Object> findAll() {
	    try {
	        List<Voiture> voitures = voitureRepository.findAll();
	        
	        // Associer un client à chaque voiture
	        for (Voiture voiture : voitures) {
	            voiture.setClient(clientService.clientById(voiture.getId_client()));
	        }
	        
	        return ResponseEntity.ok(voitures);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Error fetching voitures: " + e.getMessage());
	    }
	}

	
	@GetMapping("/voitures/{id}")
	public ResponseEntity<Object> findById(@PathVariable Long id) {
		try {
			Voiture voiture = voitureRepository.findById(id).orElseThrow(() -> new Exception("Voiture introuvable"));
			voiture.setClient(clientService.clientById(voiture.getId_client()));
			return ResponseEntity.ok(voiture);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Voiture not found with ID : " + id);
		}
	}
	
	@GetMapping("/voitures/client/{id}")
	public ResponseEntity<List<Voiture>> findByClient(@PathVariable Long id) {
	    try {
	        Client client = clientService.clientById(id);
	        if (client != null) {
	            List<Voiture> voitures = voitureRepository.findByClientId(id);
	            return ResponseEntity.ok(voitures);
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	        }
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	}

	@PostMapping("/voitures/{clientId}")
	public ResponseEntity<Object> save(@PathVariable Long clientId, @RequestBody Voiture voiture) {
	    try {
	        // Fetch the client details using the clientService
	        Client client = clientService.clientById(clientId);
	        if (client != null) {
	            // Set the fetched client in the voiture object
	            voiture.setClient(client);

	            // Save the Voiture with the associated Client
	            voiture.setId_client(clientId);
	            voiture.setClient(client);
	            Voiture savedVoiture = voitureRepository.save(voiture);

	            return ResponseEntity.ok(savedVoiture);
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                .body("Client not found with ID: " + clientId);
	        }
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	            .body("Error saving voiture: " + e.getMessage());
	    }
	}

	@PutMapping("/voitures/{id}")
	public ResponseEntity<Object> update(@PathVariable Long id, @RequestBody Voiture updatedVoiture) {
	    try {
	        Voiture existingVoiture = voitureRepository.findById(id)
	            .orElseThrow(() -> new Exception("Voiture not found with ID: " + id));

	        // Update only the non-null fields from the request body
	        if (updatedVoiture.getMatricule() != null && !updatedVoiture.getMatricule().isEmpty()) {
	            existingVoiture.setMatricule(updatedVoiture.getMatricule());
	        }

	        if (updatedVoiture.getMarque() != null && !updatedVoiture.getMarque().isEmpty()) {
	            existingVoiture.setMarque(updatedVoiture.getMarque());
	        }

	        if (updatedVoiture.getModel() != null && !updatedVoiture.getModel().isEmpty()) {
	            existingVoiture.setModel(updatedVoiture.getModel());
	        }

	        // Save the updated Voiture
	        Voiture savedVoiture = voitureRepository.save(existingVoiture);

	        return ResponseEntity.ok(savedVoiture);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	            .body("Error updating voiture: " + e.getMessage());
	    }
	}


}

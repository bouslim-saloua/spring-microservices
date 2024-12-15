package ma.project.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ma.project.demo.entities.Client;
import ma.project.demo.repositories.ClientRepository;

@RestController
public class ClientController {
	@Autowired
	ClientRepository clientRepository;
	
	@GetMapping("/clients")
	public List<Client> findAll() {
		return clientRepository.findAll();
	}
	
	@GetMapping("/clients/{id}")
	public Client findById(@PathVariable Long id) throws Exception {
		return clientRepository.findById(id).orElseThrow(() -> new Exception("Client non trouvé"));
	}
	
	@PostMapping("/clients")
	public Client saveClient(@RequestBody Client client) {
		return clientRepository.save(client);
	}

}

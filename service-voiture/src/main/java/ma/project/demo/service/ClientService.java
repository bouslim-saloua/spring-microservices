package ma.project.demo.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import ma.project.demo.Client;

@FeignClient(name="SERVICE-CLIENT")
public interface ClientService {
	@GetMapping(path="/clients/{id}")
	public Client clientById(@PathVariable Long id);
}

package ma.project.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

import ma.project.demo.entities.Client;
import ma.project.demo.repositories.ClientRepository;

@EnableDiscoveryClient
@SpringBootApplication
public class ClientApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClientApplication.class, args);
		
	}
	@Bean
	CommandLineRunner initialiserBaseH2(ClientRepository ClientRepository) {
		return args -> {
			ClientRepository.save(new Client(null, "Rabab SELIMANU", 23f));
			ClientRepository.save(new Client(null, "Amal RAMI", 22f));
			ClientRepository.save(new Client(null, "Samir SAFI", 22f));
		};
	}
	

}

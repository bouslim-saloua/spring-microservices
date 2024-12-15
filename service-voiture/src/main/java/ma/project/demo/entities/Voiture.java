package ma.project.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.project.demo.Client;

@Entity
@Data
public class Voiture {
	@Id
	@GeneratedValue
	private Long id;
	private String marque;
	private String matricule;
	private String model;
	private Long id_client;
	@Transient
	@ManyToOne
	private Client client;
	public Voiture(Long id, String marque, String matricule, String model, Long id_client, Client client) {
		super();
		this.id = id;
		this.marque = marque;
		this.matricule = matricule;
		this.model = model;
		this.id_client = id_client;
		this.client = client;
	}
	
	public Voiture() {}
	
	

}

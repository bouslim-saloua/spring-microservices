package ma.project.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ma.project.demo.entities.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long>{

}

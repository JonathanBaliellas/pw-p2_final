package pw.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import pw.backend.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer>, JpaSpecificationExecutor<Cliente>{
    @Query(value = "SELECT * FROM cliente WHERE email =?1 AND senha =?2", nativeQuery = true)
    Optional<Cliente> logar(String email, String senha);

    @Query(value = "SELECT * FROM cliente WHERE email =?1", nativeQuery = true)
    Optional<Cliente> recuperarSenha(String email);
}

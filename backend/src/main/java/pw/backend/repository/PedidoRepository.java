package pw.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import pw.backend.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Integer>, JpaSpecificationExecutor<Pedido>{
    @Query(value = "SELECT * FROM pedido WHERE cliente_id = ?1", nativeQuery = true)
    List<Pedido> findByCliente(int cliente_id);
}

package pw.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import pw.backend.model.PedidoProduto;

public interface PedidoProdutoRepository extends JpaRepository<PedidoProduto, Integer>, JpaSpecificationExecutor<PedidoProduto>{
    @Query(value = "SELECT * FROM pedido_produto WHERE pedido_id =?1", nativeQuery = true)
    List<PedidoProduto> listarProdutos(int pedido_id);
}

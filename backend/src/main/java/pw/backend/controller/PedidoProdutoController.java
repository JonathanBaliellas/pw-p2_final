package pw.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pw.backend.model.PedidoProduto;
import pw.backend.repository.PedidoProdutoRepository;

@RestController
@CrossOrigin("*")
public class PedidoProdutoController {
    @Autowired
    PedidoProdutoRepository repository;

    @PostMapping("/api/pedido-produto")
    public ResponseEntity<String> inserir(@RequestBody PedidoProduto produto){
        repository.save(produto);
        String msg = "Produto inserido com sucesso no pedido";
        return ResponseEntity.ok(msg);
    }
    @PutMapping("/api/pedido-produto")
    public ResponseEntity<String> atualizar(@RequestBody PedidoProduto produto){
        repository.save(produto);
        String msg = "Produto atualizado com sucesso no pedido";
        return ResponseEntity.ok(msg);
    }
    @GetMapping("/api/pedido-produto/{id}")
    public ResponseEntity<PedidoProduto> consultar(@PathVariable int id){
        Optional<PedidoProduto> produto = repository.findById(id);
        if (produto.isPresent()) {
            return ResponseEntity.ok(produto.get());
        } else {
            return ResponseEntity.ok(new PedidoProduto());
        }
    }
    @GetMapping("/api/pedido-produto/lista")
    public ResponseEntity<List<PedidoProduto>> listar(){
        List<PedidoProduto> lista = repository.findAll();
        return ResponseEntity.ok(lista);
    }
    @GetMapping("/api/pedido-produto/listar/{id}")
    public ResponseEntity<List<PedidoProduto>> listarPedido(@PathVariable int id){
        List<PedidoProduto> lista = repository.listarProdutos(id);
        if (lista.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(lista);

        }
    }
    @DeleteMapping("/api/pedido-produto/{id}")
    public ResponseEntity<String> excluir(@PathVariable int id){
        repository.deleteById(id);
        String msg = "Produto excluído com sucesso";
        return ResponseEntity.ok(msg);
    }
}

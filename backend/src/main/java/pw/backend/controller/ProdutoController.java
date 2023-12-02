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

import pw.backend.model.Produto;
import pw.backend.repository.ProdutoRepository;

@RestController
@CrossOrigin("*")
public class ProdutoController {
    @Autowired
    ProdutoRepository repository;

    @PostMapping("/api/produto")
    public ResponseEntity<String> inserir(@RequestBody Produto produto){
        repository.save(produto);
        String msg = "Produto inserido com sucesso";
        return ResponseEntity.ok(msg);
    }
    @PutMapping("/api/produto")
    public ResponseEntity<String> atualizar(@RequestBody Produto produto){
        repository.save(produto);
        String msg = "Produto atualizado com sucesso: " + produto.getDescricao();
        return ResponseEntity.ok(msg);
    }
    @GetMapping("/api/produto/{id}")
    public ResponseEntity<Produto> consultar(@PathVariable int id){
        Optional<Produto> produto = repository.findById(id);
        if (produto.isPresent()) {
            return ResponseEntity.ok(produto.get());
        } else {
            return ResponseEntity.ok(new Produto());
        }
    }
    @GetMapping("/api/produto/lista")
    public ResponseEntity<List<Produto>> listar(){
        List<Produto> lista = repository.findAll();
        return ResponseEntity.ok(lista);
    }
    @DeleteMapping("/api/produto/{id}")
    public ResponseEntity<String> excluir(@PathVariable int id){
        repository.deleteById(id);
        String msg = "Produto excluído com sucesso";
        return ResponseEntity.ok(msg);
    }
}

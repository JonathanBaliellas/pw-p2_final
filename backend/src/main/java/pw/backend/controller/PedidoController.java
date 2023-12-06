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

import pw.backend.model.Pedido;
import pw.backend.repository.PedidoRepository;

@RestController
@CrossOrigin("*")
public class PedidoController {
    @Autowired
    PedidoRepository repository;

    @PostMapping("/api/pedido")
    public ResponseEntity<String> inserir(@RequestBody Pedido pedido){
        repository.save(pedido);
        String msg = "Pedido inserido com sucesso";
        return ResponseEntity.ok(msg);
    }
    @PostMapping("/api/pedido2")
    public ResponseEntity<Integer> inserir2(@RequestBody Pedido pedido){
        // String pedidoInserido =  repository.save(pedido).toString();
        Pedido pedidoInserido = repository.save(pedido);
        // String msg = "Pedido inserido com sucesso";
        return ResponseEntity.ok(pedidoInserido.getId());
    }
    @PutMapping("/api/pedido")
    public ResponseEntity<String> atualizar(@RequestBody Pedido pedido){
        repository.save(pedido);
        String msg = "Pedido atualizado com sucesso";
        return ResponseEntity.ok(msg);
    }
    @GetMapping("/api/pedido/{id}")
    public ResponseEntity<Pedido> consultar(@PathVariable int id){
        Optional<Pedido> pedido = repository.findById(id);
        if (pedido.isPresent()) {
            return ResponseEntity.ok(pedido.get());
        } else {
            return ResponseEntity.ok(new Pedido());
        }
    }
    @GetMapping("/api/pedido/lista/{cliente_id}")
    public ResponseEntity<List<Pedido>> listar(@PathVariable int cliente_id){
        List<Pedido> lista = repository.findByCliente(cliente_id);
        return ResponseEntity.ok(lista);
    }
    @DeleteMapping("/api/pedido/{id}")
    public ResponseEntity<String> excluir(@PathVariable int id){
        repository.deleteById(id);
        String msg = "Pedido excluído com sucesso";
        return ResponseEntity.ok(msg);
    }
}

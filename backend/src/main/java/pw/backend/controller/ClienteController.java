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

import pw.backend.model.Cliente;
import pw.backend.repository.ClienteRepository;

@RestController
@CrossOrigin("*")
public class ClienteController {
    @Autowired
    ClienteRepository repository;

    @PostMapping("/api/cliente")
    public ResponseEntity<String> inserir(@RequestBody Cliente cliente){
        repository.save(cliente);
        String msg = "Cliente inserido com sucesso";
        return ResponseEntity.ok(msg);
    }
    @PostMapping("/api/cliente/login")
    public ResponseEntity<Cliente> logar(@RequestBody Cliente cliente){
        Optional<Cliente> retorno = repository.logar(cliente.getEmail(), cliente.getSenha());
        if (retorno.isPresent()) {
            return ResponseEntity.ok(retorno.get());
        } else {
            return ResponseEntity.ok(new Cliente());
        }
    }
    @PostMapping("/api/cliente/recuperar-senha")
    public ResponseEntity<Cliente> recuperarSenha(@RequestBody Cliente cliente){
        Optional<Cliente> retorno = repository.recuperarSenha(cliente.getEmail());
        if (retorno.isPresent()) {
            return ResponseEntity.ok(retorno.get());
        } else {
            return ResponseEntity.ok(new Cliente());
        }
    }
    @PutMapping("/api/cliente")
    public ResponseEntity<String> atualizar(@RequestBody Cliente cliente){
        repository.save(cliente);
        String msg = "Cliente atualizado com sucesso";
        return ResponseEntity.ok(msg);
    }
    @GetMapping("/api/cliente/{id}")
    public ResponseEntity<Cliente> consultar(@PathVariable int id){
        Optional<Cliente> cliente = repository.findById(id);
        if (cliente.isPresent()) {
            return ResponseEntity.ok(cliente.get());
        } else {
            return ResponseEntity.ok(new Cliente());
        }
    }
    @GetMapping("/api/cliente/lista")
    public ResponseEntity<List<Cliente>> listar(){
        List<Cliente> lista = repository.findAll();
        return ResponseEntity.ok(lista);
    }
    @DeleteMapping("/api/cliente/{id}")
    public ResponseEntity<String> excluir(@PathVariable int id){
        repository.deleteById(id);
        String msg = "Cliente excluído com sucesso";
        return ResponseEntity.ok(msg);
    }
}

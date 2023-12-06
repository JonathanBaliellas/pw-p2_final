package pw.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "pedido_produto")
public class PedidoProduto {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int pedido_id;
    private int produto_id;
    private double valor;
    private double quant;
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int getPedido_id() {
        return pedido_id;
    }
    public void setPedido_id(int pedido_id) {
        this.pedido_id = pedido_id;
    }
    public int getProduto_id() {
        return produto_id;
    }
    public void setProduto_id(int produto_id) {
        this.produto_id = produto_id;
    }
    public double getValor() {
        return valor;
    }
    public void setValor(double valor) {
        this.valor = valor;
    }
    public double getQuant() {
        return quant;
    }
    public void setQuant(double quant) {
        this.quant = quant;
    }
    
}

create schema mintz;
use mintz;

-- Select
select * from cliente;
select * from produto;
select * from pedido;
select * from pedido_produto;

-- Insert
insert into produto
	(descricao, descricao_preco, imagem, preco, quant_estoque)
values
	("Mouse gamer", 439.00, "À vista no PIX", "/assets/mouse-3.jpg", 15 ),
	("Monitor muito bom", 1200.50, "À vista no PIX", "/assets/monitor-1.jpg", 10 ),
	("Teclado excelente", 749.99, "À vista no PIX", "/assets/teclado-1.jpg", 10 ),
	("Fone 7.1", 599.99, "À vista no PIX", "/assets/fone-de-ouvido-2.jpg", 10 ),
	("Fone bluetooth", 299.99, "À vista no PIX", "/assets/fone-de-ouvido-1.jpg", 10 ),
	("Fone de ouvido bom", 399.99, "À vista no PIX", "/assets/fone-de-ouvido-3.jpg", 10 ),
	("HD 1TB", 499.99, "À vista no PIX", "/assets/hd.jpg", 10 ),
	("Combo de placa de vídeos", 18449.99, "À vista no PIX", "/assets/placa-video.jpg", 10 ),
	("Processador Ryzen", 1000, "À vista no PIX", "/assets/processador.jpg", 10 ),
	("Notebook bom", 2500, "À vista no PIX", "/assets/laptop-1.jpg", 10 ),
	("Notebook excelente", 4500, "À vista no PIX", "/assets/laptop-2.jpg", 10 ),
	("Mouse barato", 20, "À vista no PIX", "/assets/mouse-1.png", 10 ),
	("Mouse ótimo", 200, "À vista no PIX", "/assets/mouse-2.jpg", 10 ),
	("Mouse pequeno", 50, "À vista no PIX", "/assets/mouse-4.jpg", 10 ),
	("Teclado bom", 159.99, "À vista no PIX", "/assets/teclado-2.jpg", 10);
  /* 
Linguagem de programação WEB
Sistemas de Informação
CEULP ULBRA
Santhiago Dionizio Pinto
santhiagosdp@gmail.com
*/

 CREATE TABLE [dbo].[Receitas](
	id int NOT NULL primary key IDENTITY(1,1),
	nome varchar(64) NOT NULL,
	chefe varchar(64) ,
	tipo int,
	tempo time (4) ,
	preparo nvarchar(1500),
	foreign key (tipo) references Tipo (id)
)


CREATE TABLE [dbo].[Tipo](
	id int NOT NULL primary key IDENTITY(1,1),
	nome varchar(64) NOT NULL,
	obs nvarchar (100)
)

insert into Tipo (nome)
values ('salada')

insert into Tipo (nome)
values('entrada')

insert into Tipo (nome)
values('prato')

insert into Tipo (nome)
values('principal')

insert into Tipo (nome)
values('sobremesa')


insert into Receitas (nome,chefe,tipo,tempo,preparo)
values ('Risoto de Galinha','Santhiago D.',1, '00:35',
'Refogue a galinha em pedaços numa panela com 1 colher de óleo quente,
tempero caseiro, vinagre e pimenta. Cozinhe até ficar macia. Prepare
uma receita de arroz simples. Retire a galinha do fogo e remova a carne
dos ossos, desfiando. Com 1 colher de manteiga, 1 colher de óleo, 3 tomates
picados, a massa de tomate, a cebola ralada e os pimentões bem picados, faça
o molho deixando cozinhar durante 15 minutos.  Depois, passe o molho na peneira.
Leve de novo ao fogo, junte a galinha desfiada e as ervilhas. Deixe ferver um pouco.
Arrume numa travessa as camadas de arroz, galinha, ovos cozidos e queijo ralado.
Assim, sucessivamente, até completar a travessa.')

insert into Receitas (nome,chefe,tipo,tempo,preparo)
values ('Rocambole de Frango','fabio arcanjo',19, '00:50',
'Ingredientes
•	500g de peito de frango moído
•	1 ovo
•	1 pacote de creme de cebola
•	1 colher de sopa de salsa picada
•	50g de bacon picado
•	4 fatias de presunto
•	100g de requeijão cremoso
•	50g de azeitonas pretas sem caroço picadas
•	margarina e molho de soja
Modo de Preparo
• Misture os 5 primeiros ingredientes. Abra em um retângulo de mais ou menos 15x25cm.
• Espalhe o presunto e sobre ele o requeijão cremoso e as azeitonas. Enrole como rocambole, feche bem e coloque em um refratário raso com a margarina e o molho de soja. 
• Leve ao micro em P.Alta de 15 a 18 minutos, invertendo a posição na metade do tempo.
• Deixe 10 minutos no tempo de espera. Decore a gosto. 
')
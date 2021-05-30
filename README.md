![login](https://user-images.githubusercontent.com/26775889/116541483-e6d7f800-a8c1-11eb-9369-cc371da58381.png)
![Mapa](https://user-images.githubusercontent.com/26775889/116541487-e6d7f800-a8c1-11eb-8f93-8e0f09bd98f8.png)
![pedidos](https://user-images.githubusercontent.com/26775889/116541493-e8092500-a8c1-11eb-8d18-2afb61490ec4.png)
![relatorio-graficos](https://user-images.githubusercontent.com/26775889/116541494-e8092500-a8c1-11eb-9deb-465c91619a66.png)
![relatorios-de-vendas](https://user-images.githubusercontent.com/26775889/116541496-e8a1bb80-a8c1-11eb-8518-11d6785a6005.png)
![usuarios_adm](https://user-images.githubusercontent.com/26775889/116541498-e8a1bb80-a8c1-11eb-9622-05105a4228df.png)
![whats](https://user-images.githubusercontent.com/26775889/116541522-ed666f80-a8c1-11eb-8038-a386dcb1a1ae.png)
Módulos do sistema administrativo web:
# [ x ] 1. Cadastro de usuários administrativos da empresa
Os usuários só podem ser adicionado pelo ADM. com privilégios = adm
Etapas para adicionar:
Menu > Configurações > Usuários > Adicionar



# [  ] 2. Controle de permissões de acesso por grupos de usuário



# [ x ] 3. Cadastro de clientes
Os clientes podem ser adicionados pelo ADM Geral como tanto pelo ADM Comum.
+ Etapas para adicionar
Menu > Meus Clientes > Adicionar Cliente
   3. 1. Classificação e Badges de clientes - O cliente é gold, diamante ...

# [ x ] 4. Cadastro de entregadores
Apenas o administrador master pode adicionar motoboys
+ Etapas para adicionar:
Menu > Motoboys > Apertar no icone botão  ' + ' 

# [x] 5. Gestão de pedidos = Fila de pedidos (por canais/todos, por status)
Todos os tipos de admin podem cadastrar o pedido
- O pedido não pode ser removido
Etapas para cadastrar pedido sem selecionar usuário da lista
+ Menu > Pedidos >  Cadastrar novo pedido
Cadastrar pedido para usuário da lista
+ Menu > Meus Clientes > Cadastrar Pedido
[ ] 6. Lançamento manual por canais extra-app pelo administrativo - Quando o  cliente fizer por outro meio, o pedido tem que ser laç. pelo adm. (4 horas)
[x] 7. Cadastro de produtos
[x] 8. ** Gestão de cupons de desconto
[ ] 9. Gestão de estoques: Os produtos serão distribuidos aos entregadores que terão seus próprios estoques e com base na distância do pedido serão demandados para as entregas. (72 h)
[ ] a. Cadastro de estoques vinculados a entregadores ou da empresa
[ ] b. Entrada
[ ] c. Saída
[ ] d. Transferência de produtos entre estoques (ADM)

[x] 10. ** Parâmetros: 
[x] a. Formas de pagamento 
[x] i. Cartão de Crédito
[x] ii . Cartão de Débito
[x] iii. Transferência
[ ] iv. Fiado - Quando o cliente é diamante, faz a venda, mas da um prazo para pagar. (Prazo definido pelo adm) (5 horas)
[x] v. Dinheiro
Cliente -
[x] b. **Status de entregas
[x] i.   Rascunho - Histórico de compras
[x] ii.  Pedido Confirmado
[x] iii. Em Entrega
[x] iv.  Entrega/ Status do pagamento (confirmado/pendente) - Para os motoboys (3 dias)
[ ] v.   Entregador Pago - Para motoboy: (Pela empresa?) (2 horas)
[x] c. ** Status de Entregador (Se ele está online ou se ta nos conformes para trabalhar)
[ ] i.    Aguardando validação
[ ] ii.   Ativo
[ ] iii.  Inativo
[x] d. ** Status de Cliente (2 horas)
[ ] i.   Ativo
[ ] ii.  Inativo
[ ] e.   Contas bancárias (2 horas)
[ ] f. ** Canais de Vendas: adicionar função / coluna na lista de pedidos (48 h)
[ ] i.    Whatsapp
[ ] ii.   Aplicativo do cliente
[ ] iii.  Redes Sociais
[ ] iv.   Telefone/Central
[ ] g.   Categorias de clientes: (administradas manualmente e internamente pelo administrativo, o cliente não tem acesso) (1 hora)

i. Diamante
1. Pode pagar fiado / promoção mês de Aniversário
ii. Ouro
1. promoção mês de Aniversário: (Terá um checkbox para deixar prom. ativa/desativada pro adm)
iii. Prata
iv. Bronze


11. Financeiro (336 h)
a. Lançamentos bancários das contas
b. Lançamento de pagamentos dos clientes
c. Controle de vendas no Fiado
d. Consolidação de caixa com banco
e. Gestão de comissionamento de entregadores
i. Pagamento de comissão por entrega de cada entregador, definida manualmente pelo administrador a cada período

12. Relatórios (7 dias)
a. Posição de estoque
b. Posição de caixa
[ ] c. Vendas por Entregadores / por período (2 horas)
[ ] d. Vendas por Canais / por período (2 horas)
[ ] e. Vendas por forma de pagamento / por período (2 horas)

Aplicativo para o cliente (Consumidor) 
1. Cadastro de clientes - Inc. (15 dias)
a. Via cadastro manual 
[ ] b. Via redes sociais (Gmail, Facebook, Instagram)
[x] c. Cadastro de endereços
[x] i. Pegar automaticamente via localização
[ ] ii.Pegar os dados do endereço via cep
[x] iii.Cadastro de diferentes endereços (casa, trabalho, outro)
[ ] d. Confirmação de cadastro via SMS (TOKEN)
[ ] e. Confirmação de aceite de termos de uso
[x] 2. Login
[x] 3. **Recuperação de senha via código de segurança / sms
[x] 4. Loja Virtual / Fazer pedido
[x] a. Produtos - quantidade - adicionar a sacola
[x] b. Fechar sacola
[x] i. adicionar ou não cupom de desconto
[x] ii. Observação
[x] iii. Selecionar endereço
[x] iv. Forma de pagamento (** Não será pago via aplicativo e sim manualmente presencialmente)
[ ] c. Localizar entregadores mais próximos (estilo uber) aguardando
[x] confirmação e mostrar acompanhamento da entrega (item 6)
[x] 5. Meus pedidos (Anteriores)
[x] 6. Acompanhar pedidos (Em andamento)
[x] a. Status / Onde está meu pedido
[x] b. Previsão de entrega

Aplicativo do Entregador:
[x]1. Login / Senha (pré cadastro no sistema administrativo ou site)
[ ]2. Entregas realizadas por período - Inc. (2 horas)


[x] 4. ** Estou disponível para entregas: (Ativar / Desativar)
[x] a. Pedidos próximos a mim para aceite (estilo motorista do uber, esperando pedidos)
[x] b. Lista de entregas aceitas a serem feitas, organizadas com base na distância de cada uma
[x] c. Confirmação de entrega
[x] i. Informar forma de pagamento (pode mudar com base na informada inicialmente pelo cliente)
ii. ** Se for em dinheiro a confirmação de depósito na conta da empresa será feita manualmente fora do aplicativo pelo entregador. Ao finalizar o dia identificar qual o valor depositado e em qual conta

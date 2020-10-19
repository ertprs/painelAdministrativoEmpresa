import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosSistemaService {

  private usuarioSelecionado: any;
  private permissoes: [
    {
      name: 'Pedidos',
      children: [
        {name: 'Abrir e fechar o sistema'},
        {name: 'Acesso aos pedidos do dia atual'},
        {name: 'Acesso a pedidos por período'},
      ]
    },
    {
      name: 'Meus clientes',
      children: [
        {name: 'Baixar lista em excel'},
        {name: 'Remover cliente'},
        {name: 'Acessar menu ded opções'},
      ]
    },

    {
      name: 'Entregas',
      children: [
        {name: 'Acessar status de entregas'},
        {name: 'Atualizar status de entregas'},
      ]
    },

    {
      name: 'Mapa',
      children: [
        {name: 'Visualizar mapa'},
      ]
    },


    {
      name: 'Notificações',
      children: [
        {name: 'Remover'},
      ]
    },

    {
      name: 'Estoque',
      children: [
        {name: 'Enviar estoque'},
        {name: 'Adicionar estoque'},
        {name: 'Retirar estoque estoque'},
        {name: 'Transferir estoque'},
        {name: 'Adicionar nova logística'},
        {name: 'Adicionar estoque de logística'},
        {name: 'Acessar auditoria'},
      ]
    },

    {
      name: 'Relatórios',
      children: [
        {name: 'Histórico de vendas'},
        {name: 'Histórico de caixa'},
        {name: 'Posição de estoque'},
      ]
    },

    {
      name: 'Financeiro',
      children: [
        {name: 'Conciliação bancária'},
        {name: 'Consolidação de cartões'},
        {name: 'Consolidação de dinheiro'},
        {name: 'Controle de fiado'},
        {name: 'Comissão por entrega'},
        {name: 'Consolidação financeira'},
      ]
    },

    {
      name: 'Fechar caixa',
      children: [
        {name: 'Finalizar caixa do dia'},
      ]
    },

    {
      name: 'Painel',
      children: [
        {name: 'Cardápio'},
        {name: 'Item Cardápio'},
        {name: 'Categoria adicional'},
        {name: 'Item adicional'},
        {name: 'Avaliações'},
        {name: 'Configuração de funcionamento delivery'},
        {name: 'Gráficos de relatórios'},
        {name: 'Iniciar sistema com data retroativa'},
        {name: 'Organização entregador'},
        {name: 'Organização - Adicionar item'},
        {name: 'Organização - remover item'},
      ]
    },

    {
      name: 'Configurações especiais',
      children: [
        {name: 'Cidades'},
        {name: 'Bairros'},
        {name: 'Galeria'},
        {name: 'Motoboys'},
        {name: 'Formas de pagamento'},
        {name: 'Itens de pagamento'},
        {name: 'Bancos'},
        {name: 'Usuários app'},
        {name: 'Usuários administrativos do sistema'},
        {name: 'Cupons'},
        {name: 'Notificações'},
        {name: 'Pagamento online'},
      ]
    },



  ];

  constructor() { }

  setUsuario(usuario: any) { this.usuarioSelecionado = usuario; }
  getUsuario() { return this.usuarioSelecionado; }
  
  getTEste() { return 'this.usuarioSelecionado'; }

  setPermissoes(permissoes: any) { this.permissoes = permissoes; }
  getPermissoessuario() { return this.permissoes; }
}

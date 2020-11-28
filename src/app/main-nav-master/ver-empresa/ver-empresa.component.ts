import { CrudServicoService } from 'src/app/crud-servico.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource, MatTreeNestedDataSource } from '@angular/material/tree';
import { ServicoService } from 'src/app/servico.service';
import { UsuariosAdmService } from 'src/app/usuarios/usuarios-adm.service';


interface FoodNode {
      name: string;
      children?: FoodNode[];
    }


@Component({
  selector: 'app-ver-empresa',
  templateUrl: './ver-empresa.component.html',
  styleUrls: ['./ver-empresa.component.css']
})


export class VerEmpresaComponent implements OnInit {

  dadosLoja: any;
  form: FormGroup;
  locaisEntrega = new MatTreeNestedDataSource<any>();
  treeControlL = new NestedTreeControl<any>(node => node.bairros);

  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();

constructor(private route: ActivatedRoute, private fb: FormBuilder, private servico: ServicoService, private crud: CrudServicoService,
            public us: UsuariosAdmService, private router: Router) { }

ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.dadosLoja = params;
      console.log(params);

      this.form = this.fb.group({
        id: [this.dadosLoja.id],
        nome: [this.dadosLoja.nome],
        imagem: [this.dadosLoja.imagem],
        capa: [this.dadosLoja.capa],
        email: [this.dadosLoja.email],
        senha: [this.dadosLoja.senha],
        telefone: [this.dadosLoja.telefone],
        cnpj: [this.dadosLoja.cnpj],
        cpf: [this.dadosLoja.cpf],
        rua: [this.dadosLoja.rua],
        numero: [this.dadosLoja.numero],
        bairro: [this.dadosLoja.bairro],
        cidade: [this.dadosLoja.cidade],
        coordenadas: [this.dadosLoja.coordenadas],
        politica: [this.dadosLoja.politica],
        descricao: [this.dadosLoja.descricao],
      });

      this.consultaEmpresa();
    } );

  }

  consultaEmpresa() {
    const accallback = () => {

      const r = this.servico.getRespostaApi();

      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); }

      if (this.dadosLoja.permissoes) {
        console.log('Loja com permissoes');
        console.log(r.resultado);
        this.dataSource.data = r.resultado.permissoes;
        this.locaisEntrega  = r.resultado.locais_entrega;
      } else {

        this.dataSource.data = this.us.getPermissoessuario();

      }
    };
    this.crud.post_api('consulta_empresa', accallback, this.dadosLoja.id);

  }

  onClickSalvar() {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
        this.servico.mostrarMensagem(r.detalhes);
      }
      console.log(r);
    };
    this.crud.post_api('att_dados_loja', accallback, this.form.value);

  }

  onClickSalvarPerm(dataSource) {
    const accallback = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
        this.servico.mostrarMensagem(r.detalhes);
      }
    };
    this.crud.post_api('attPermissoesLoja', accallback, {id: this.dadosLoja.id, perm: dataSource._data._value});

  }

  removerLoja(senhaR) {

    const accallback = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
        this.servico.mostrarMensagem(r.detalhes);
        this.router.navigate(['/admin/lojas']);
      }
    };
    this.crud.post_api('removerLoja', accallback, {id: this.dadosLoja.id, senha: senhaR});
  }

  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
  hasChildL = (_: number, node: any) => !!node.bairros && node.bairros.length > 0;

}

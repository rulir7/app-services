import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContatoService } from './contato.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  contatos: any[] = [];
  contatosPaginados: any[] = []; // Apenas os contatos visíveis na página
  nome: string = '';
  email: string = '';
  fone: string = '';
  contatoEditando: any = null;

  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  page = 1;

  constructor(private service: ContatoService) {}

  ngOnInit(): void {
    this.carregarContatos();
  }

  carregarContatos(): void {
    this.service.getContatos().subscribe((data) => {
      this.contatos = data;
      this.totalPages = Math.ceil(this.contatos.length / this.pageSize);
      this.carregarContatosPaginados();
    });
  }

  carregarContatosPaginados(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.contatosPaginados = this.contatos.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  inserir(): void {
    if (this.nome && this.email && this.fone) {
      let novoContato = {
        nome: this.nome,
        email: this.email,
        fone: this.fone,
      };
      if (this.contatoEditando) {
        this.service
          .update(this.contatoEditando.id, novoContato)
          .subscribe(() => {
            this.contatoEditando = null;
            this.limparCampos();
            this.carregarContatos();
          });
      } else {
        this.service.save(novoContato).subscribe(() => {
          this.limparCampos();
          this.carregarContatos();
        });
      }
    }
  }

  excluir(id: any): void {
    this.service.delete(id).subscribe(() => {
      this.carregarContatos();
    });
  }

  editar(contato: any): void {
    this.contatoEditando = contato;
    this.nome = contato.nome;
    this.email = contato.email;
    this.fone = contato.fone;
  }

  limparCampos(): void {
    this.nome = '';
    this.email = '';
    this.fone = '';
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.carregarContatosPaginados();
    }
  }
}

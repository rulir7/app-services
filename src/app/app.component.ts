import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContatoService } from './contato.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  contatos: any[] = [];
  nome: any;
  email: any;
  fone: any;
  contatoEditando: any = null;

  constructor(private service: ContatoService) {}

  ngOnInit(): void {
    this.service.getContatos().subscribe((data) => {
      this.contatos = data;
    });
  }

  //modelo do inserir contato do exemplo, com os dados preenchidos
  // inserir() {
  //   let contato = {
  //     nome: 'teste',
  //     email: 'teste@gmail.com',
  //     fone: '47 98888-7777',
  //   };
  //   console.log(contato);
  //   this.service.save(contato).subscribe((data) => {
  //     console.log(data);
  //   });
  //   this.ngOnInit();
  // }

  inserir() {
    if (this.nome && this.email && this.fone) {
      let novoContato = {
        nome: this.nome,
        email: this.email,
        fone: this.fone,
      };
      if (this.contatoEditando) {
        // Se estiver editando, chama o update
        this.service
          .update(this.contatoEditando.id, novoContato)
          .subscribe(() => {
            this.contatoEditando = null;
            this.limparCampos();
            this.ngOnInit();
          });
      } else {
        // Se não estiver editando, adiciona um novo contato
        this.service.save(novoContato).subscribe(() => {
          this.limparCampos();
          this.ngOnInit();
        });
      }
    }
  }

  excluir(id: any) {
    this.service.delete(id).subscribe(() => {
      this.ngOnInit();
    });
  }

  editar(contato: any) {
    this.contatoEditando = contato;
    this.nome = contato.nome;
    this.email = contato.email;
    this.fone = contato.fone;
  }

  limparCampos() {
    this.nome = '';
    this.email = '';
    this.fone = '';
  }
}

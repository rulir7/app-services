import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  private apiUrl = 'http://localhost:3000/contatos';

  constructor(private client: HttpClient) {}

  getContatos(): Observable<any> {
    return this.client.get<any[]>(this.apiUrl);
  }
  save(contato: any): Observable<any> {
    return this.client.post<any>(this.apiUrl, contato);
  }

  update(id: number, contato: any): Observable<any> {
    // Mesmo ajuste para update
    return this.client.put<any>(`${this.apiUrl}/${id}`, contato);
  }

  delete(id: number): Observable<any> {
    // E também para delete
    return this.client.delete<any>(`${this.apiUrl}/${id}`);
  }
}

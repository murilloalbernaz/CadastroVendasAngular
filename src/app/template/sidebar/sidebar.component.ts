import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuarioLogado?: string;

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.usuarioLogado = this.auth.getUsuarioAutenticado();
  }

  logout(){
    this.auth.encerrarSecao();
    this.route.navigate(['/login'])
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User
  loginError: boolean = false;
  cadastrando: boolean = false;
  mensagemSucesso?: string;
  mensagemsErrors: string[] = [];

  constructor(private router: Router, private userService: AuthService) { 
    this.user  = new User();
  }

  onSubmit(){
    if(this.cadastrando == true){
      this.userService.cadastrarUser(this.user)
        .subscribe(
          response =>{
            this.mensagemSucesso = 'Cadastro Realizado com Sucesso. Porfavor realizar Login'
            this.cadastrando = false
            this.loginError = false
          },
          error =>{ 
            this.mensagemsErrors = error.error.erros
          }
        )
    }else{
      this.userService
              .logar(this.user)
              .subscribe(
                response =>{
                  const access_token = JSON.stringify(response);
                  localStorage.setItem('access_token', access_token)
                  this.router.navigate(['/home']);
                },
                erroResponse =>{
                  this.loginError = true
                }
              )
    }
  }

  preparaCadastrar(event: Event){
    event.preventDefault();
    this.cadastrando=true;
  }

  cancelaCadastro(){
    this.cadastrando = false;
  }
}

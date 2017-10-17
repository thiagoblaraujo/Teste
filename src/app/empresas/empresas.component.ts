import { Component, OnInit } from '@angular/core';
import {EmpresasService} from "./shared/empresa.service";
import {Empresa} from "./shared/empresa";

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  private empresas: Empresa[] = [];

  constructor(private empresasService: EmpresasService) { }

  ngOnInit() {
    this.empresasService.getEmpresas()
      .subscribe(data => this.empresas = data);
  }

  deleteEmpresa(empresa){
    if (confirm("Are you sure you want to delete " + empresa.name + "?")) {
      var index = this.empresas.indexOf(empresa);
      this.empresas.splice(index, 1);

      this.empresasService.deleteEmpresa(empresa.id)
        .subscribe(null,
          err => {
            alert("Could not delete user.");
            // Revert the view back to its original state
            this.empresas.splice(index, 0, empresa);
          });
    }
  }

}

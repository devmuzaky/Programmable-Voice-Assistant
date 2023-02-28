import {Component, OnInit} from '@angular/core';
import {ScriptData} from "../interfaces/script-data";
import {ScriptsTableService} from "../services/scripts-table.service";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-script-table',
  templateUrl: './scripts-table.component.html',
  styleUrls: ['./scripts-table.component.scss']
})
export class ScriptsTableComponent implements OnInit {

  productDialog: boolean;

  script: ScriptData;

  selectedProducts: ScriptData[];

  submitted: boolean;

  statuses: any[];

  scripts: ScriptData[];
  Delete = 'Delete';
  products: any;

  constructor(private scriptsTableService: ScriptsTableService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService
  ) {

  }

  ngOnInit(): void {
    // this.scripts = this.scriptsTableService.getScripts();
    this.statuses = [
      {label: 'Select Status', value: null},
      {label: 'Private', value: 'PRIVATE'},
      {label: 'Public', value: 'PUBLIC'}
    ];
  }

  openNew() {
    this.script = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.scripts = this.scripts.filter(val => !this.selectedProducts.includes(val));
        this.selectedProducts = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
    });
  }

  editProduct(script: ScriptData) {
    this.script = {...script};
    this.productDialog = true;
  }

  deleteProduct(product: ScriptData) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.scripts = this.scripts.filter(val => val.id !== product.id);
        this.script = {};
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.script.name.trim()) {
      if (this.script.id) {
        this.scripts[this.findIndexById(this.script.id)] = this.script;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
      } else {
        this.script.id = this.createId();
        this.script.picture = 'script-placeholder.svg';
        this.scripts.push(this.script);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
      }

      this.scripts = [...this.scripts];
      this.productDialog = false;
      this.script = {};
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.scripts.length; i++) {
      if (this.scripts[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): number {
    let id = 1;
    for (let script of this.scripts) {
      id = Math.max(id, script.id + 1);
    }

    return id;
  }


}

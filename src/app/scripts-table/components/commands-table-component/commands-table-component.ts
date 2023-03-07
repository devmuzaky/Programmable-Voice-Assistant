import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Command} from '../../interfaces/command.model';
import {CommandService} from '../../services/command.service';
import {ConfirmationService, MessageService} from "primeng/api";
import {HttpEvent, HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-commands-table-component',
  templateUrl: './commands-table-component.html',
  styleUrls: ['./commands-table-component.scss']
})
export class CommandsTableComponent implements OnInit {

  @ViewChild('iconUpload') fileUpload: any;

  @ViewChild('paramNum') paramNum: any;
  marketplaceFlag = false;

  commandDialog: boolean;

  commands: Command[];

  command: Command;

  selectedCommands: Command[];
  acceptedFiles: string = ".js, .py";

  submitted: boolean;
  scriptType = [{
    label: '.py', value: '.py'
  }, {
    label: '.js', value: '.js'
  }];
  status = [{
    label: 'Public', value: 'Public'
  }, {
    label: 'Private', value: 'Private'
  }];
  private progress: number;
  private message: string;
  private fileInfos: any;

  constructor(private commandService: CommandService, private messageService: MessageService, private confirmationService: ConfirmationService,) {
  }

  ngOnInit() {
    this.commandService.getCommands().subscribe(data => {
      this.commands = data;
    }, error => console.error(error));
  }

  openNew() {
    this.command = {
      parameters: ['', '', '', '', '']
    };
    this.submitted = false;
    this.commandDialog = true;

    setTimeout(() => {
      document.querySelector<HTMLInputElement>('.parametersNumber .p-inputnumber-input').disabled = true;
    }, 1000);
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commands = this.commands.filter(val => !this.selectedCommands.includes(val));
        this.selectedCommands = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
    });
  }

  editProduct(command: Command) {
    this.command = {...command};
    this.commandDialog = true;
  }

  deleteProduct(product: Command) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commands = this.commands.filter(val => val.id !== product.id);
        this.command = {};
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.commandDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.command.name.trim()) {
      if (this.command.id) {
        this.commands[this.findIndexById(this.command.id)] = this.command;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
      } else {
        this.command.id = this.createId();
        this.command.icon = 'product-placeholder.svg';
        this.commands.push(this.command);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
      }

      this.commands = [...this.commands];
      this.commandDialog = false;
      this.command = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.commands.length; i++) {
      if (this.commands[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onUploadIcon($event: any) {
    for (const file of $event.files) {
      this.uploadFile(file);
    }
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});

  }

  onClearIconSelection() {
    this.fileUpload.clear();
  }

  onStateChange() {
    this.command.parameters = ['', '', '', '', ''];
  }

  openMarketplaceDialog() {
    this.marketplaceFlag = true;
  }

  private uploadFile(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    this.commandService.uploadIcon(formData).subscribe((event: HttpEvent<any>) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.message = 'Upload success.';
        this.fileInfos = this.commandService.getFiles();
      }
    }, err => {
      this.progress = 0;
      this.message = 'Could not upload the file!';
      this.fileInfos = this.commandService.getFiles();
    });
  }



  closeMarketplace() {
    this.marketplaceFlag = false;
  }
}

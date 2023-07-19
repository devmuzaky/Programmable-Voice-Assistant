import {Component, OnInit} from '@angular/core';
import {Command} from '../../interfaces/command.model';
import {CommandService} from '../../services/command.service';
import {ConfirmationService, MessageService} from "primeng/api";


@Component({
  selector: 'app-command-management',
  templateUrl: './command-management.component.html',
  styleUrls: ['./command-management.component.scss']
})
export class CommandManagement implements OnInit {
  showCreateCommandForm: boolean;
  marketplaceFlag = false;
  command: Command = {
    name: '',
    description: '',
    icon: null,
    script: null,
    requirements: null,
    scriptType: '',
    parameters: [
      {name: '', type: '', order: 0},
      {name: '', type: '', order: 1},
      {name: '', type: '', order: 2},
      {name: '', type: '', order: 3}
    ],
    patterns: ['', '', '', ''],
    patternsNumber: 1
  };
  commands: Command[];
  selectedCommands: Command[];

  constructor(private commandService: CommandService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit() {
    this.commandService.getMyCommands().subscribe(
      (data: Command[]) => {
        this.commands = data;
      },
      error => {
        console.error(error)
      }
    );
  }

  openMarketplace() {
    this.marketplaceFlag = true;
  }

  closeMarketplace() {
    this.marketplaceFlag = false;
  }

  openCreateCommandForm() {
    this.showCreateCommandForm = true;
    setTimeout(() => {
      document.querySelectorAll<HTMLInputElement>('.disable-select-input-number .p-inputnumber-input')
        .forEach((element) => element.disabled = true)
    }, 200);
  }

  CloseCreateCommandForm() {
    this.showCreateCommandForm = false;
  }

  deleteSelectedCommands() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected commands?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commands = this.commands.filter(val => !this.selectedCommands.includes(val));
        this.selectedCommands = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Commands Deleted',
          life: 3000
        });
      }
    });
  }
}

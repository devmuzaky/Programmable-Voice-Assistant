import {Component, OnInit} from '@angular/core';
import {ModalServiceService} from "../services/modal-service.service";

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit {

  isOpen = false;

  constructor(private modalService: ModalServiceService) {

  }

  ngOnInit(): void {
    this.modalService.isModalOpen.subscribe(() => {
      this.isOpen = !this.isOpen;
    });
  }

  toggleModal() {
    this.isOpen = !this.isOpen;
  }
}

import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  d: any;
  m: any;
  i: number = 0;
  Fake = ['Hi there, I\'m Zaky and you?', 'Nice to meet you', 'How are you?', 'Not too bad, thanks', 'What do you do?', 'That\'s awesome', 'I think you\'re a nice person', 'Why do you think that?', 'Can you explain?', 'Anyway I\'ve gotta go now', 'It was a pleasure chat with you', 'Bye', ':)']
  messages = [];

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('click', ['$event']) onClick(event) {
    if (event.target.classList.contains('message-submit')) {
      this.insertMessage();
    }
  }

  @HostListener('document:keydown', ['$event']) handleKeydown(event: KeyboardEvent) {

    if (event.key === 'Enter') {
      this.insertMessage();
      event.preventDefault();
      return false;
    }
  }

  updateScrollbar() {
    const messages = this.elementRef.nativeElement.querySelector('.messages-content');
    messages.scrollTop = messages.scrollHeight;
  }

  setDate() {
    this.d = new Date();
    if (this.m != this.d.getMinutes()) {
      this.m = this.d.getMinutes();
      const timestamp = document.createElement('div');
      timestamp.className = 'timestamp';
      timestamp.textContent = `${this.d.getHours()}:${this.m}`;
      const messages = document.querySelectorAll('.message');
      const lastMessage = messages[messages.length - 1];
      lastMessage?.appendChild(timestamp);
    }
  }

  insertMessage() {
    let msg = (document.querySelector('.message-input') as HTMLInputElement).value;
    if (msg.trim() === '') {
      return false;
    }
    this.messages.push({message: msg, personal: true});
    this.setDate();
    (document.querySelector('.message-input') as HTMLInputElement).value = '';
    this.updateScrollbar();

    setTimeout(() => {
      this.fakeMessage();
    }, 1000 + (Math.random() * 20) * 100);

  }

  fakeMessage() {
    if ((document.querySelector('.message-input') as HTMLInputElement).value !== '') {
      return false;
    }
    const message = document.createElement('div');
    message.className = 'message loading new';

    const span = document.createElement('span');
    message?.appendChild(span);
    let container = document.querySelector('.message-container');
    container?.appendChild(message);
    this.updateScrollbar();

    setTimeout(() => {
      const loadingMessage = document.querySelector('.loading') as HTMLElement;
      loadingMessage?.parentNode?.removeChild(loadingMessage);
      this.messages.push({message: this.Fake[this.i], personal: false});
      this.setDate();
      this.updateScrollbar();
      this.i++;
    }, 1000 + (Math.random() * 20) * 100);

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.fakeMessage();
    }, 100);
  }
}

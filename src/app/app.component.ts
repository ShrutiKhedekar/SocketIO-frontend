import { Component } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  message: string;
  messages = [];

  constructor(
    private chatService: ChatService
  ) { }

  sendMessage() {

    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message) => {
        console.log(message)
        this.messages.push(message);
      });
  }
}
import { Component } from '@angular/core';
import { ChatService } from './chat.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  message: string;
  messages = [];
  data = [];
  emailInfo = [];

  constructor(
    private chatService: ChatService,
    private http: Http,
  ) { }

  sendMessage() {

    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    //For socket chat
    // this.chatService
    //   .getMessages()
    //   .subscribe((message) => {
    //     console.log(message)
    //     this.messages.push(message);
    //   });

    this.http.get("http://localhost:5000/emails/emails").map((res) => res.json()).subscribe(p => {


      // this.data = p.data;

      this.emailInfo = [];



      p.data.map(x => {
         console.log(x)

         let obj = {};

         //email body
        //  let text;
        // if (x['payload'] && x['payload']['parts'].length != 0) {
        //   let info = x['payload']['parts'][0]['parts'][0].body.data;
        //   let buff = new Buffer(info, 'base64');
        //    text = buff.toString();
        // }

        // obj['text'] = text;
        obj['snippet'] = x['snippet'].substring(0, 28) + "...";
        obj['dateTime'] = new Date(parseInt(x.internalDate));


        let from = x['payload']['headers'].filter((i)  => i.name == 'From' );
        let sub = x['payload']['headers'].filter((i)  => i.name == 'Subject');

        obj['subject'] = sub[0].value;
        obj['from'] = from[0].value;

        this.emailInfo = [...this.emailInfo, obj];
        
      })


      console.log(this.emailInfo)
    })

  }
}

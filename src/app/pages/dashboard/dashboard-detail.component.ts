import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { AssistantService } from '../../services/assistant.service';
import { ChatStreamService } from '../../components/knx-chat-stream/chat-stream.service';
import { AssistantConfig } from './../../models/assistant';
import { ChatMessage } from './../../components/knx-chat-stream/chat-message';
import { Profile } from '../../models';
<<<<<<< HEAD
<<<<<<< HEAD
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'knab-dashboard-detail',
  templateUrl: 'dashboard-detail.component.html',
  styleUrls: ['dashboard-detail.component.scss'],
=======

@Component({
  template: `
    <div class="container knx-container-dashboard">
      <div class="row">
        <div class="col-md-8">
          <h2>Maak een keuze</h2>
          
        </div>
        <div class="col-md-4">
          <knx-chat-stream [options]="chatConfig" [messages]="chatMessages"></knx-chat-stream>
        </div>
      </div>
    </div>
  `
>>>>>>> 0d3cdfc... refactor(dashboard): add detail page for each product
=======
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'knab-dashboard-detail',
  templateUrl: 'dashboard-detail.component.html',
  styleUrls: ['dashboard-detail.component.scss'],
>>>>>>> 3b84335... refactor(dashboard): add dashboard detail component
})
export class DashboardDetailComponent implements OnInit, AfterViewInit {
  insuranceType: string;
  profile: Profile;
  chatConfig: AssistantConfig;
  chatMessages: Array<ChatMessage> = [];

  constructor(private profileService: ProfileService,
              private assistantService: AssistantService,
<<<<<<< HEAD
<<<<<<< HEAD
              private chatNotifierService: ChatStreamService,
              private route: ActivatedRoute) {

=======
              private chatNotifierService: ChatStreamService) {
>>>>>>> 0d3cdfc... refactor(dashboard): add detail page for each product
=======
              private chatNotifierService: ChatStreamService,
              private route: ActivatedRoute) {

>>>>>>> 3b84335... refactor(dashboard): add dashboard detail component
    this.chatConfig = assistantService.config;
    this.chatConfig.avatar.title = 'Expert verzekeringen';
  }

  ngOnInit() {

<<<<<<< HEAD
<<<<<<< HEAD
    this.route.data.subscribe(x=> {
      this.insuranceType = x.insuranceType;
    });
=======
    // TODO: get the insurance type parameter
    this.insuranceType = 'auto';
>>>>>>> 0d3cdfc... refactor(dashboard): add detail page for each product
=======
    this.route.data.subscribe(x=> {
      this.insuranceType = x.insuranceType;
    });
>>>>>>> 3b84335... refactor(dashboard): add dashboard detail component

    this.chatNotifierService.addMessage$.subscribe(
      message => {
        // replace messages instead of pushing
        this.chatMessages = [message];
      });

    this.profileService.getUserProfile()
      .subscribe(x => {
        this.profile = x;

      });
  }

  ngAfterViewInit() {
    this.chatNotifierService.addTextMessage(`Wat wil je doen met je ${this.insuranceType} verzekering?`);
  }
}

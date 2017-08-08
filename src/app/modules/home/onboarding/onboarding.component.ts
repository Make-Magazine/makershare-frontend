import { Component, OnInit } from '@angular/core';
import { InfoCard } from '../../../core/models/cards/info-card';
import { Auth } from '../../auth0/auth.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html'
})

export class OnboardingComponent implements OnInit {
  infoCards: InfoCard[] = [
    <InfoCard>{
      title: 'Portfolios',
      subtitle: 'From Passion to Profession',
      description: 'Your Maker Portfolio organizes and documents your work, whether you’re a weekend Maker or a professional. Tell the story behind each project: what inspired you, what went right or wrong, what will you make next?'
    },
    <InfoCard>{
      title: 'Missions',
      subtitle: 'Making that Matters',
      description: 'Participating in a mission means using your skills to positively impact people’s lives. On Maker Share, you find missions that allow you to join others and focus your projects on an objective.'
    },
    <InfoCard>{
      title: 'Learning Workshops',
      subtitle: 'Push Your Progress',
      description: 'Learn new skills and acquire new capabilities as a maker. Maker Share workshops guide you through learning paths on topics like electronics, robotics, Internet of Things and more.'
    },
    <InfoCard>{
      title: 'Get Started',
      subtitle: 'Create Your Maker Portfolio',
      button: 'Add a project',
      action: () => {
        this.auth.login();
      }
    }
  ];

  constructor(public auth: Auth) {
  }

  ngOnInit() {
  }
}

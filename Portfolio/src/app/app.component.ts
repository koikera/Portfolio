import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, NgZone, OnInit, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Experience } from './models/experience';
import { Education } from './models/education';
import { Language } from './models/language';
import { Expertise } from './models/expertise';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Portfolio';
  public job: string = 'Fullstack Developer';
  public job_text: string = '';
  public job_list: string[] = [];
  public experiences: Experience[] = [
     {
        title: 'Junior Full Stack',
        location: 'Brazil',
        date: '2021 - 2024',
        description: 'I was responsible for training young apprentices and spearheading the creation of several portals. I was recognized for consistently delivering high-quality project outcomes.'
      },
      {
        title: 'Another Job Title',
        location: 'Location',
        date: '2019 - 2021',
        description: 'Description of responsibilities and achievements in this job.'
      }
  ]
  public educations: Education[] = [
    {
        title: 'UNIP University - Brazil',
        location: 'Brazil',
        date: '2020 - 2022',
        description: 'Associate degree in Systems Development Analyst'
      }
  ]
  public languages: Language[] = [
    {
      type: "Portuguese"
    },
    {
      type: "English (Intermedium)"
    },
    {
      type: "Spain (basic)"
    }
  ]
  public expertises: Expertise[] = [
    {
      type: "Experienced in optimizing processes to increase productivity and delivery speed"
    },
    {
      type: "Creativity"
    },
    {
      type: "UX"
    },
    {
      type: "Negotiation"
    },
    {
      type: "Critical Thinking"
    },
    {
      type: "Leadership"
    }
  ]

  constructor(private zone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit() {
    this.job_list = this.job.split('');

    this.zone.runOutsideAngular(() => {
      this.typeWriterEffect();
    });

  }

  typeWriterEffect() {
  let i = 0;
  const interval = setInterval(() => {
    if (i >= this.job_list.length) {
      clearInterval(interval);
      setTimeout(() => this.typeDeleteEffect(), 1000);
      return;
    }
    this.zone.run(() => {
      this.job_text += this.job_list[i];
    });
    i++;
  }, 150);
}

typeDeleteEffect() {
  let i = this.job_list.length - 1;
  const interval = setInterval(() => {
    if (i < 0) {
      clearInterval(interval);
      setTimeout(() => this.typeWriterEffect(), 1000);
      return;
    }
    this.zone.run(() => {
      this.job_text = this.job_text.slice(0, -1);
    });
    i--;
  }, 150);
}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
          navbar?.classList.add('scrolled');
        } else {
          navbar?.classList.remove('scrolled');
        }
      });
    }
  }




}
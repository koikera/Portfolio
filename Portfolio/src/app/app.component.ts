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
      title: 'Young Apprentice – Governance',
      location: 'Tivit, Brazil',
      date: '2019 - 2021',
      description: `Handled governance manual processes and daily spreadsheet updates. 
      Proposed and developed a Power Apps & Power Automate solution to digitize the analyst recognition process, 
      integrating it with Power BI and eliminating a manual paper-based system. 
      Collaborated on a Data Lake project to automate governance workflows using Python for ELT pipelines 
      (ITSM API → AWS S3 → BI dashboards).`
    },
    {
      title: 'Junior Full Stack Developer',
      location: 'Tivit, Brazil',
      date: '2021 - Present',
      description: `Initially maintained and modernized a legacy communication portal, 
      redesigning it with .NET 5, Angular 12, and Microsoft Teams/WhatsApp APIs after Kaizala deprecation. 
      Led the development of a WhatsApp webhook service in .NET 6 with Clean Architecture and Docker, 
      and contributed to a Zabbix management platform using Python, Angular, and Docker. 
      Currently focused on maintaining and improving existing projects, 
      migrating legacy .NET systems to the updated stack, 
      and leading the redevelopment of the communication portal.`
    }
  ];
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

projects = [
  {
    title: 'Project One',
    techStack: [
      { name: 'Angular', icon: 'devicon-angularjs-plain' },
      { name: 'Bootstrap', icon: 'devicon-bootstrap-plain' }
    ],
    description: 'A sleek portfolio site showcasing my skills and projects with responsive design and animations.',
    link: 'https://github.com/username/project-one'
  },
  {
    title: 'Project Two',
    techStack: [
      { name: 'Node.js', icon: 'devicon-nodejs-plain' },
      { name: 'Express', icon: 'devicon-express-original' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain' }
    ],
    description: 'Backend API for a task management app with JWT authentication and real-time updates.',
    link: 'https://github.com/username/project-two'
  },
  {
    title: 'Project Three',
    techStack: [
      { name: 'React', icon: 'devicon-react-original' },
      { name: 'Redux', icon: 'devicon-redux-original' },
      { name: 'TailwindCSS', icon: 'devicon-tailwindcss-plain' }
    ],
    description: 'E-commerce frontend with product filters, cart functionality and smooth user experience.',
    link: ''
  }
];


  openedProjectIndex: number | null = null;

  toggleDescription(index: number) {
    if (this.openedProjectIndex === index) {
      this.openedProjectIndex = null;
    } else {
      this.openedProjectIndex = index;
    }
  }


}
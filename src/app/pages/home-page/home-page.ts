import { Component } from '@angular/core';
//Components
import { HeroComponent } from '../../components/hero-component/hero-component';
import { FindMeOnComponent } from '../../components/find-me-on-component/find-me-on-component';
import { ProjectsComponent } from '../../components/projects-component/projects-component';
import { ContactMe } from '../../components/contact-me/contact-me';

@Component({
  selector: 'app-home-page',
  imports: [HeroComponent,FindMeOnComponent,ProjectsComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {

}

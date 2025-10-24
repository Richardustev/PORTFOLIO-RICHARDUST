import { Component, HostListener } from '@angular/core';

interface ProjectSlide {
  image: string;
  alt: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  slides: ProjectSlide[];
  hasLink: boolean;
  gradient: string;
  // NUEVO: Propiedad para el link específico del proyecto
  link: string;
}

@Component({
  selector: 'app-projects-component',
  templateUrl: './projects-component.html',
  styleUrl: './projects-component.css'
})
export class ProjectsComponent {
  isModalOpen = false;
  currentProjectIndex = 0;
  currentSlideIndex = 0;

  projects: Project[] = [
    // Hogwarts API
    {
      id: 0,
      title: 'hogwartsAPI Django-Angular',
      description: 'Simple Hogwarts RestAPI. You can insert, update, and delete the houses with their students. POSTGRES SQL.',
      technologies: ['Python', 'Django', 'PostgreSQL', 'Angular', 'TypeScript', 'HTML', 'CSS', 'Bootstrap', 'REST API', 'Git'],
      slides: [
        { image: 'assets/0/1.png', alt: 'Project 0 Image 1' },
        { image: 'assets/0/2.png', alt: 'Project 0 Image 2' },
        { image: 'assets/0/3.png', alt: 'Project 0 Image 3' }
      ],
      hasLink: true,
      // LINK ESPECÍFICO
      link: 'https://github.com/Richardustev/hogwartsAPI_django_angular',
      gradient: 'from-blue-600 to-purple-700'
    },
    // ANGULAR & DJANGO pokeApi
    {
      id: 1,
      title: 'Angular & Django pokeApi',
      description: 'Pokedex powered by PokeApi and Angular. Backend to register and Login with Django. Also added some security with authGuard.',
      technologies: ['Python', 'Django', 'PostgreSQL', 'Angular', 'TypeScript', 'HTML', 'CSS', 'Bootstrap', 'REST API', 'Git'],
      slides: [
        { image: 'assets/3/1.png', alt: 'Project 1 Image 1' },
        { image: 'assets/3/2.png', alt: 'Project 1 Image 2' },
        { image: 'assets/3/3.png', alt: 'Project 1 Image 3' },
        { image: 'assets/3/4.png', alt: 'Project 1 Image 3' },
      ],
      hasLink: true,
      // LINK ESPECÍFICO
      link: 'https://github.com/Richardustev/Angular_Django_PokeApi_Pokedex',
      gradient: 'from-purple-600 to-pink-700'
    },
    // DJANGO & POSTGRES LOGIN
    {
      id: 2,
      title: 'Django & Postgres simple login',
      description: 'Simple login base to recycle in future projects.',
      technologies: ['Python', 'Django', 'PostgreSQL', 'Angular',  'REST API', 'Git', 'TypeScript', 'HTML', 'CSS', 'Materialize'],
      slides: [
        { image: 'assets/1/1.png', alt: 'Project 1 Image 1' },
        { image: 'assets/1/2.png', alt: 'Project 1 Image 2' },
        { image: 'assets/1/3.png', alt: 'Project 1 Image 3' },
        { image: 'assets/1/4.png', alt: 'Project 1 Image 4' },
      ],
      hasLink: true,
      // LINK ESPECÍFICO
      link: 'https://github.com/Richardustev/DJANGO_POSTGRESQL_SIMPLE_LOGIN',
      gradient: 'from-green-600 to-teal-700'
    },
    // DJANGO & MYSQL API
    {
      id: 3,
      title: 'Django & MySQL API',
      description: 'Learning to make REST APIs with Django and MySQL.',
      technologies: ['Python', 'Django', 'MySQL', 'REST API', 'Git'],
      slides: [
        { image: 'assets/2/1.png', alt: 'Project 2 Image 1' },
      ],
      hasLink: true,
      // LINK ESPECÍFICO
      link: 'https://github.com/Richardustev/DJANGO_MySQL_API',
      gradient: 'from-purple-600 to-pink-700'
    },
    // DJANGO & MYSQL LOGIN API
    {
      id: 4,
      title: 'Django & MySQL login API',
      description: 'Register, Login and update you user!.',
      technologies: ['Python', 'Django', 'MySQL', 'REST API', 'Git'],
      slides: [
        { image: 'assets/4/1.png', alt: 'Project 4 Image 1' },
      ],
      hasLink: true,
      // LINK ESPECÍFICO
      link: 'https://github.com/Richardustev/DJANGO_MySQL_LOGIN',
      gradient: 'from-purple-600 to-pink-700'
    }
  ];

  get currentProject(): Project | undefined {
    return this.projects[this.currentProjectIndex];
  }

  getGradientClass(index: number): string {
    return this.projects[index]?.gradient || 'from-blue-600 to-purple-700';
  }

  openCarousel(projectIndex: number): void {
    this.currentProjectIndex = projectIndex;
    this.currentSlideIndex = 0;
    this.isModalOpen = true;
  }

  closeCarousel(): void {
    this.isModalOpen = false;
  }

  changeSlide(direction: number): void {
    if (!this.currentProject) return;

    this.currentSlideIndex += direction;

    if (this.currentSlideIndex >= this.currentProject.slides.length) {
      this.currentSlideIndex = 0;
    } else if (this.currentSlideIndex < 0) {
      this.currentSlideIndex = this.currentProject.slides.length - 1;
    }
  }

  getCurrentSlide(): ProjectSlide {
    return this.currentProject?.slides[this.currentSlideIndex] ||
              { image: '', alt: 'Image not available' };
  }

  onModalClick(event: Event): void {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeCarousel();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.isModalOpen) {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          this.changeSlide(-1);
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.changeSlide(1);
          break;
        case 'Escape':
          event.preventDefault();
          this.closeCarousel();
          break;
      }
    }
  }
}

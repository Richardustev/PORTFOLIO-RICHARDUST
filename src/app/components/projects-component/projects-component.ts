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
  projectLink = 'https://github.com/ricardoaraujo/task-app';

  projects: Project[] = [
    {
      id: 0,
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution with payment integration and admin dashboard.',
      technologies: ['Python', 'Django', 'PostgreSQL'],
      slides: [
        { image: 'profile.jpg', alt: 'Project 1 Image 1' },
        { image: 'https://via.placeholder.com/800x500/1e40af/ffffff?text=Project+1+Image+2', alt: 'Project 1 Image 2' },
        { image: 'https://via.placeholder.com/800x500/1d4ed8/ffffff?text=Project+1+Image+3', alt: 'Project 1 Image 3' }
      ],
      hasLink: false,
      gradient: 'from-blue-600 to-purple-700'
    },
    {
      id: 1,
      title: 'Energy Monitoring System',
      description: 'Real-time energy consumption tracking with predictive analytics.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      slides: [
        { image: 'https://via.placeholder.com/800x500/047857/ffffff?text=Project+2+Image+1', alt: 'Project 2 Image 1' },
        { image: 'https://via.placeholder.com/800x500/059669/ffffff?text=Project+2+Image+2', alt: 'Project 2 Image 2' }
      ],
      hasLink: false,
      gradient: 'from-green-600 to-teal-700'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates and team features.',
      technologies: ['Vue.js', 'Express', 'MySQL'],
      slides: [
        { image: 'https://via.placeholder.com/800x500/7c3aed/ffffff?text=Project+3+Image+1', alt: 'Project 3 Image 1' },
        { image: 'https://via.placeholder.com/800x500/8b5cf6/ffffff?text=Project+3+Image+2', alt: 'Project 3 Image 2' }
      ],
      hasLink: true,
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

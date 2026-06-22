import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object  , private viewportScroller: ViewportScroller) {}
  
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Wait for hydration to complete
    setTimeout(() => {
      this.initializeAnimations();
    }, 100);
  }

  private initializeAnimations(): void {

    // Reveal Animation
    const revealObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal')
      .forEach(el => revealObserver.observe(el));

    // Skill Bar Animation
    const barObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          (entry.target as Element)
            .querySelectorAll('.skill-bar-fill')
            .forEach((bar) => {

              const element = bar as HTMLElement;
              const percentage = element.dataset['pct'];

              if (percentage) {
                element.style.width = `${percentage}%`;
              }
            });
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.glow-card')
      .forEach(card => barObserver.observe(card));

    // Badge Animation
    document.querySelectorAll('.badge-animate')
      .forEach((badge) => {
        (badge as HTMLElement).style.animationPlayState = 'paused';
      });

    const badgeObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          (entry.target as Element)
            .querySelectorAll('.badge-animate')
            .forEach((badge) => {
              (badge as HTMLElement).style.animationPlayState = 'running';
            });
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.glow-card')
      .forEach(card => badgeObserver.observe(card));

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]')
      .forEach(anchor => {

        anchor.addEventListener('click', (event) => {

          const href = anchor.getAttribute('href');

          if (!href) {
            return;
          }

          const target = document.querySelector(href);

          if (target) {
            event.preventDefault();

            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
  }


scrollToSection(id: string): void {
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

 
download() {
  const link = document.createElement('a');

  link.href = 'Nilesh.pdf';
  link.download = 'Nilesh Resume.pdf';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

sendMail(): void {
  window.location.href = 'mailto:thakren76@gmail.com';
}
}
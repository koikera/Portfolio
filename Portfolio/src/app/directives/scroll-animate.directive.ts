import { Directive, ElementRef, Renderer2, AfterViewInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true
})
export class ScrollAnimateDirective implements AfterViewInit {

  @Input() animationClass: string = 'animate';
  @Input() threshold: number = 0.2;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.el.nativeElement.classList.add(this.animationClass);

      return; // se não for navegador, não cria o observer
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // entrou na viewport -> adiciona animação
            this.renderer.addClass(this.el.nativeElement, this.animationClass);
          } else {
            // saiu da viewport -> remove animação
            this.renderer.removeClass(this.el.nativeElement, this.animationClass);
          }
        });
      },
      { threshold: this.threshold }
    );

    observer.observe(this.el.nativeElement);
  }
}

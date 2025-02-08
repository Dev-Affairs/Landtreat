import { Directive, ElementRef, Renderer2, Inject, PLATFORM_ID, HostListener, AfterViewInit } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';

@Directive({
  selector: '[appFitContent]'
})
export class FitContentDirective implements AfterViewInit {
  private originalWidth!: string;
  private measuringSpan: HTMLElement | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.adjustWidthToFitContent();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.adjustWidthToFitContent();
    }
  }

  private adjustWidthToFitContent(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
  
    const inputElement = this.el.nativeElement;
    this.cleanUpSpan();  // Ensures previous spans are cleaned
  
    this.measuringSpan = this.renderer.createElement('span');
    this.renderer.setStyle(this.measuringSpan, 'position', 'absolute');
    this.renderer.setStyle(this.measuringSpan, 'visibility', 'hidden');
    this.renderer.setStyle(this.measuringSpan, 'height', 'auto');
    this.renderer.setStyle(this.measuringSpan, 'width', 'auto');
    this.renderer.setStyle(this.measuringSpan, 'white-space', 'nowrap');
  
    // Apply input styles to span
    const styles = window.getComputedStyle(inputElement);
    this.renderer.setStyle(this.measuringSpan, 'font-size', styles.fontSize);
    this.renderer.setStyle(this.measuringSpan, 'font-family', styles.fontFamily);
    this.renderer.setStyle(this.measuringSpan, 'font-weight', styles.fontWeight);
  
    this.renderer.appendChild(this.document.body, this.measuringSpan);
    this.renderer.setProperty(this.measuringSpan, 'textContent', inputElement.placeholder);
  
    setTimeout(() => {
      if (!this.measuringSpan) return;
      this.originalWidth = `${this.measuringSpan.offsetWidth + 30}px`;
      this.renderer.setStyle(inputElement, 'width', this.originalWidth);
      console.log(this.originalWidth); // Log the measured width
      this.cleanUpSpan();
    }, 200);
  }
  
  private cleanUpSpan(): void {
    if (this.measuringSpan) {
      this.renderer.removeChild(this.document.body, this.measuringSpan);
      this.measuringSpan = null;
    }
  }

  @HostListener('focus', ['$event.target'])
  onFocus(target: HTMLInputElement): void {
    gsap.to(target,{
      width:"7.5vw",
      background:"#d8d8d8",
      borderRadius:"25px",
    })
    this.renderer.addClass(target,"style-placeholder")
  }

  @HostListener('blur', ['$event.target'])
  onBlur(target: HTMLInputElement): void {
    gsap.to(target,{
      width:this.originalWidth,
      background:"transparent",
      height:"fit-content",
      borderRadius:0,
      padding:0
    })
    this.renderer.removeClass(target,"style-placeholder")
    
  }
}


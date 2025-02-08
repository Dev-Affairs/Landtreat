// import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';

// @Directive({
//   selector: '[appDynamicEvent]',
// })
// export class DynamicEventDirective  implements OnInit,OnChanges{
//   @Input() appDynamicEvent!: string; // Input for event type like 'click', 'mouseover', etc.
//   @Output() eventTriggered: EventEmitter<Event> = new EventEmitter();

//   private currentEventListener: Function | null = null;

//   constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['appDynamicEvent']) {
//       this.attachEvent();
//     }
//   }
  
//   ngOnInit(): void {
//   }
//   private attachEvent(): void {
//     // Remove any existing event listener
//     if (this.currentEventListener) {
//       this.currentEventListener();
//       this.currentEventListener = null;
//     }

//     // Attach a new event listener if the event type is valid
//     if (this.appDynamicEvent) {
//       this.currentEventListener = this.renderer.listen(this.elementRef.nativeElement, this.appDynamicEvent, (event: Event) => {
//         this.eventTriggered.emit(event);
//       });
//     }
//   }

//   ngOnDestroy(): void {
//     // Ensure we clean up by removing the event listener when the directive is destroyed
//     if (this.currentEventListener) {
//       this.currentEventListener();
//     }
//   }
// }

import { Directive, Input, Output, EventEmitter, ElementRef, Renderer2, OnChanges, SimpleChanges, OnDestroy, HostListener } from '@angular/core';

// Define a type for common DOM event types
type DomEventType = 'click' | 'mouseover' | 'mouseout' | 'keydown' | 'keyup';

@Directive({
  selector: '[dynamicEvent]'
})
export class DynamicEventDirective implements OnChanges, OnDestroy {
  test = "onFocus"
  
  @Input() dynamicEvent!: DomEventType; // Restrict input to defined type
  @Output() eventTriggered: EventEmitter<Event> = new EventEmitter();

  private currentEventType: DomEventType | null = null;
  private currentEventListener: Function | null = null;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dynamicEvent']) {
      this.attachEvent();
    }
  }

  private attachEvent(): void {
    // Check if the event type has changed
    if (this.currentEventType === this.dynamicEvent) {
      return; // Skip re-attaching if the type hasn't changed
    }

    // Remove any existing event listener
    if (this.currentEventListener) {
      this.currentEventListener();
      this.currentEventListener = null;
    }

    // Validate event type and attach a new event listener if valid
    if (this.dynamicEvent && this.isValidEventType(this.dynamicEvent)) {
      this.currentEventType = this.dynamicEvent;
      this.currentEventListener = this.renderer.listen(this.elementRef.nativeElement, this.dynamicEvent, (event: Event) => {
        this.eventTriggered.emit(event);
      });
    } else {
      console.error(`Unsupported event type: ${this.dynamicEvent}`);
    }
  }

  private isValidEventType(type: string): boolean {
    // Optionally, refine this validation based on more exhaustive event types or specific requirements
    const validTypes: string[] = ['click', 'mouseover', 'mouseout', 'keydown', 'keyup'];
    return validTypes.includes(type);
  }

  private handleEvent(event: Event): void {
    // Trigger the custom event emission
    this.eventTriggered.emit(event);

    // Special handling for focus event
    if (event.type === 'focus' && event.target instanceof HTMLInputElement) {
      this.animateElement(event.target);
    }
  }

  private animateElement(target: HTMLInputElement): void {
    gsap.to(target, {
      width: "7.5vw",
      background: "#d8d8d8",
      borderRadius: "25px",
    });
    this.renderer.addClass(target, "style-placeholder");
  }


  ngOnDestroy(): void {
    // Clean up by removing the event listener
    if (this.currentEventListener) {
      this.currentEventListener();
    }
  }
}


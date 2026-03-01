import { Directive, HostListener, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAnimetable]',
  standalone: false,
})
export class AnimetableDirective {
  constructor(private el: ViewContainerRef) {
    console.log(el.element.nativeElement as HTMLElement);
  }

  @HostListener('click')
  onClick() {
    console.log('clicked');
    (this.el.element.nativeElement as HTMLElement).classList.add(
      'scale-animation'
    );
    setTimeout(
      () =>
        (this.el.element.nativeElement as HTMLElement).classList.remove(
          'scale-animation'
        ),
      500
    );
  }
}

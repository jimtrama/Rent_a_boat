import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Boat } from './models/boat.model';
import { ModalService } from './services/modal.service';
import { BladesService } from './services/blades.service';
import { Rockets } from './animation_bullets/rockets';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnInit {
  private prevScrollTop = 0;
  private ctx!: CanvasRenderingContext2D | null;
  public width = 700;
  public height = 700;
  public img!: HTMLImageElement;

  constructor(
    public modalService: ModalService,
    private bladesService: BladesService,
    private meta: Meta,
    private title: Title,
  ) {}
  ngOnInit(): void {
    (document.getElementById('canvas') as HTMLCanvasElement).width =
      window.innerWidth - 150;
    (document.getElementById('canvas') as HTMLCanvasElement).height =
      window.innerHeight;
    this.title.setTitle('Rent a Boat in Halkidiki | Rent A Boat');

    this.meta.updateTag({
      name: 'description',
      content:
        'Book luxury boats, yachts and speedboats in Vourvourou at the best prices.',
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'rent boat, vourvourou rental, greece boats , medusa rent a boat, vourvourou rent a boat',
    });
  }

  ngAfterViewInit(): void {
    document
      .getElementsByTagName('app-root')[0]
      .addEventListener('scroll', (e) => {
        const currentScroll = (e.target as HTMLElement).scrollTop;
        if (
          this.prevScrollTop < currentScroll &&
          !this.bladesService.rotating
        ) {
          this.bladesService.rotateLeft.next();
        } else {
          this.bladesService.rotateRight.next();
        }
        this.prevScrollTop = currentScroll;
      });
    this.ctx = (
      document.getElementById('canvas') as HTMLCanvasElement
    ).getContext('2d');
    this.img = document.getElementById('source-img') as HTMLImageElement;

    this.playAnimation();
  }
  rockets: Rockets | undefined = undefined;
  private playAnimation() {
    if (!this.rockets) this.rockets = new Rockets('canvas');
    this.rockets.run();
    setTimeout(() => {
      this.rockets?.stop();
    }, 10000);
  }
}

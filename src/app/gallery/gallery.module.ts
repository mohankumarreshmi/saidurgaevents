import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { Gallery } from './gallery.service';
import { OverlayModule } from './overlay/overlay.module';
import { GalleryComponent } from './gallery.component';

@NgModule({
    declarations: [
        CarouselComponent,
        GalleryComponent
    ],
    imports: [
        CommonModule,
        OverlayModule
    ],
    exports: [
        CarouselComponent
    ],
    providers: [
        Gallery
    ],
    bootstrap: [
        
    ],
    entryComponents: [
        CarouselComponent
    ]
})
export class IvyGalleryModule { }

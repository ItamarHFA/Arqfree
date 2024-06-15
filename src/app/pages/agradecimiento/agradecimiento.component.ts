import { Component } from '@angular/core';

@Component({
  selector: 'app-agradecimiento',
  templateUrl: './agradecimiento.component.html',
  styleUrls: ['./agradecimiento.component.css']
})
export class AgradecimientoComponent {

  descargarEbook() {
    const link = document.createElement('a');
    link.href = 'assets/Ebook.pdf';  // Cambia el path según donde se almacene el archivo
    link.download = 'Ebook.pdf';
    link.click();
  }
}

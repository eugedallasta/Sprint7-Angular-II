import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor(public modal: NgbModal) { }

  message1: string = "paginas";
  message2: string = "idiomas";
  ngOnInit(): void { }
  abrirModal(content: TemplateRef<string>) {
    this.modal.open(content, { centered: true, size: 'xl' });

  }

}

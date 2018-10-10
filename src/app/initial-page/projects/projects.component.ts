import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  @Output() invest = new EventEmitter();
  projects = [
    { name: 'Residencial Araucárias',
      description: 'Residencial Araucarias: o terceiro projeto no URBE.ME em parceria com a incorporadora HPR. O empreendimento localiza-se na cidade de Uberlândia o município que mais cresce no estado de Minas Gerais.',
      rentabilidadeGarantida: 20000,
      rentabilidadeFinal: 20000,
      captacaoAtual: 20000,
      captacaoNecessaria: 30000,
      valorDeCota: 2000,
      rentabilidadeMensalMedia: 20000,
      tempoDeRetorno: 123,
      prazoParaFinalizarCaptacao: '10/10/2019'
    },
    { name: 'Residencial Araucárias 2',
      description: 'Residencial Araucarias: o terceiro projeto no URBE.ME em parceria com a incorporadora HPR. O empreendimento localiza-se na cidade de Uberlândia o município que mais cresce no estado de Minas Gerais.',
      rentabilidadeGarantida: 40000,
      rentabilidadeFinal: 40000,
      captacaoAtual: 40000,
      captacaoNecessaria: 40000,
      valorDeCota: 4000,
      rentabilidadeMensalMedia: 40000,
      tempoDeRetorno: 133,
      prazoParaFinalizarCaptacao: '10/10/2020'
    }
  ];

  selectedProjectIndex = 0;

  ngOnInit() {
  }

  selectProject(projectIndex) {
    this.selectedProjectIndex = projectIndex;
  }

  getPercentage(project) {
    const percentage = (project.captacaoAtual / project.captacaoNecessaria)*100;
    return Math.round(percentage * 100) / 100;
  }

  onInvest() {
    this.invest.emit(true);
  }

}

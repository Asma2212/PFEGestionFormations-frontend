import { Component, OnInit } from '@angular/core';
import { Formation } from 'app/models/Formation';
import { Formateur } from 'app/models/Formateur';
import { Candidat } from 'app/models/Candidat';
import { Department } from 'app/models/Departement';
import { SessionFormation } from 'app/models/SessionFormation';
import { FormationService } from 'app/services/formation.service';
import { FormateurService } from 'app/services/formateur.service';
import { CandidatService } from 'app/services/candidat.service';
import { SessionFormationService } from 'app/services/SessionFormation.service';
import * as Chartist from 'chartist';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  multiAxisData: any;

  chartOptions: any;

  multiAxisOptions: any;

  subscription: Subscription;
  data: any;
  formations : Formation[];
  sessions : SessionFormation[] ;
  formateurs : Formateur[];
  candidats : Candidat[] ;
nbFormations : number ;
nbSessions : number ;
nbFormateurs : number ;
nbCandidats : number ;
depInf : Department ;
depGE : Department ;
depGM : Department ;
depGC : Department ;
depPIE : any[] = [] ;
filterC : Candidat[];
c : Candidat;

  //config: AppConfig;

  constructor(private formationService : FormationService, private sessionService : SessionFormationService,private formateurService : FormateurService,private candidatService : CandidatService) {}

  ngOnInit() {
this.formationService.getAllFormations().toPromise().then(d=>{
  this.formations = d 
  this.nbFormations = d.length;
})
  this.sessionService.getSessions().toPromise().then(d=>{
    this.sessions = d
    this.nbSessions = d.length
    
  })
  this.candidatService.getAllCandidats().toPromise().then(d => {
      this.candidats = d;
      this.nbCandidats = d.length

  })
  this.formateurService.getAllFormateurs().toPromise().then(d => {
    this.formateurs = d;
    this.nbFormateurs = d.length
})
while (this.candidats[0]) {
this.c = this.candidats[0];
this.filterC = this.candidats.filter(can => can.department = this.c.department)
//.....
}


    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    this.multiAxisData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
          label: 'Dataset 1',
          backgroundColor: [
              '#EC407A',
              '#AB47BC',
              '#42A5F5',
              '#7E57C2',
              '#66BB6A',
              '#FFCA28',
              '#26A69A'
          ],
          yAxisID: 'y',
          data: [65, 59, 80, 81, 56, 55, 10]
      }, {
          label: 'Dataset 2',
          backgroundColor: '#78909C',
          yAxisID: 'y1',
          data: [28, 48, 40, 19, 86, 27, 90]
      }]
  };

  this.multiAxisOptions = {
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          },
          tooltips: {
              mode: 'index',
              intersect: true
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              type: 'linear',
              display: true,
              position: 'left',
              ticks: {
                  min: 0,
                  max: 100,
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y1: {
              type: 'linear',
              display: true,
              position: 'right',
              grid: {
                  drawOnChartArea: false,
                  color: '#ebedef'
              },
              ticks: {
                  min: 0,
                  max: 100,
                  color: '#495057'
              }
          }
      }
  };

  this.updateChartOptions();
    const dataDailySalesChart: any = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
            [12, 17, 7, 17, 23, 18, 38]
        ]
    };
    this.data = {
      labels: ['A','B','C','D'],
      datasets: [
          {
              data: [300, 50, 100,40],
              backgroundColor: [
                  "#42A5F5",
                  "#66BB6A",
                  "#FFA726",
                  "black"
              ],
              hoverBackgroundColor: [
                  "#64B5F6",
                  "#81C784",
                  "#FFB74D",
                  "black"
              ]
          }
      ]
  };

   const optionsDailySalesChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
        labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
        series: [
            [230, 750, 450, 300, 280, 240, 200, 190]
        ]
    };

   const optionsCompletedTasksChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
    }

    var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    var datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    var optionswebsiteViewsChart = {
        axisX: {
            showGrid: false
        },
        low: 0,
        high: 1000,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
}

  updateChartOptions() {
          this.applyDarkTheme();

  }

  applyDarkTheme() {


      this.multiAxisOptions = {
          plugins: {
              legend: {
                  labels: {
                      color: '#ebedef'
                  }
              },
              tooltips: {
                  mode: 'index',
                  intersect: true
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: '#ebedef'
                  },
                  grid: {
                      color: 'rgba(255,255,255,0.2)'
                  }
              },
              y: {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      min: 0,
                      max: 100,
                      color: '#ebedef'
                  },
                  grid: {
                      color: 'rgba(255,255,255,0.2)'
                  }
              },
              y1: {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  grid: {
                      drawOnChartArea: false,
                      color: 'rgba(255,255,255,0.2)'
                  },
                  ticks: {
                      min: 0,
                      max: 100,
                      color: '#ebedef'
                  }
              }
          }
      };

  }

  applyLightTheme() {


      this.multiAxisOptions = {
          plugins: {
              legend: {
                  labels: {
                      color: '#495057'
                  }
              },
              tooltips: {
                  mode: 'index',
                  intersect: true
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: '#495057'
                  },
                  grid: {
                      color: '#ebedef'
                  }
              },
              y: {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      min: 0,
                      max: 100,
                      color: '#495057'
                  },
                  grid: {
                      color: '#ebedef'
                  }
              },
              y1: {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  grid: {
                      drawOnChartArea: false,
                      color: '#ebedef'
                  },
                  ticks: {
                      min: 0,
                      max: 100,
                      color: '#495057'
                  }
              }
          }
      };
  }

  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };


}

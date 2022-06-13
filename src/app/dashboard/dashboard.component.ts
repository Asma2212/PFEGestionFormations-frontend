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
import { Observable, Subscription } from 'rxjs';
import { SessionService } from 'app/services/session.service';
import { Rating } from 'app/models/Rating';
import { UploadFileService } from 'app/services/upload-file.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sessRating: SessionFormation;
  seRate: SessionFormation[] = [];

  multiAxisData: any;

  chartOptions: any;

  multiAxisOptions: any;

  subscription: Subscription;
  data: any;
  formations: Formation[];
  sessions: SessionFormation[];
  formateurs: Formateur[];
  candidats: Candidat[];
  nbFormations: number;
  nbSessions: number;
  nbFormateurs: number;
  nbCandidats: number;
  depInf: Department;
  depGE: Department;
  depGM: Department;
  depGC: Department;
  depPIE: any[] = [];
  filterC: Candidat[];
  c: Candidat;
  myLabels: any[] = []
  myData: any[] = []
  mybackground: any[] = []
  myHoverBackground: any[] = []
  depCand: Candidat[];
  sessList: SessionFormation[] = []
  sessListFilter: SessionFormation[] = []
  colorsBackground: any = ["#42A5F5", "#66BB6A", "#FFA726", "violet"];
  colorsHover: any = ["#64B5F6", "#81C784", "#FFB74D", "rgb(255, 183, 255)"]
  i: number = 0;
  m: number = 0;
  monthData: any[] = []
  monthDataCand: any[] = []
  nbCand: number = 0
  formationsThisMonth: Formation[]
  nbFormationMonth: number;
  formateursThisMonth: Formateur[]
  nbFormateurMonth: number;
  candidatsThisMonth: Candidat[]
  nbCandidatMonth: number;
  sessionsThisMonth: SessionFormation[]
  nbSessionMonth: number;
  rat: Rating[];
  resSess: Rating[] = [];
  r: Rating = {
    id: 0,
    sessionId: 0,
    username: "",
    rating: 0
  };
  idSE: number;
  somme: number = 0;
  rat1: Rating[];
  nb: number = 0;
  n: number = 0;
  fileInfos: Observable<any>;
  s1: number = 0;
  //config: AppConfig;

  constructor(private formationService: FormationService, private sessionService: SessionFormationService, private formateurService: FormateurService, private candidatService: CandidatService, private sessionS: SessionService, private uploadService: UploadFileService) { }

  ngOnInit() {
    this.fileInfos = this.uploadService.getFiles();
    this.formationService.getAllFormations().subscribe(d => {
      this.formations = d
      this.formationsThisMonth = this.formations.filter(f => new Date(f.createdDate) <= new Date() && new Date(f.createdDate).getMonth() == new Date().getMonth())
      this.nbFormationMonth = this.formationsThisMonth.length
      this.nbFormations = d.length;
    })
    this.sessionService.getSessions().subscribe(d => {
      this.sessions = d
      this.sessionsThisMonth = this.sessions.filter(s => new Date(s.dateDebSession) <= new Date() && new Date(s.dateDebSession).getMonth() == new Date().getMonth())
      this.nbSessionMonth = this.sessionsThisMonth.length
      this.nbSessions = d.length
      this.sessList = d.filter(s => new Date().getFullYear == new Date(s.dateDebSession).getFullYear)
      while ((this.sessList[0]) || (this.m > 7)) {

        this.sessListFilter = this.sessList.filter(s => new Date(s.dateDebSession).getMonth() == this.m)

        this.monthData.push(this.sessListFilter.length)
        this.sessList = this.sessList.filter(s => new Date(s.dateDebSession).getMonth() != this.m)
        this.nbCand = 0
        this.sessListFilter.forEach(s => {
          this.nbCand = this.nbCand + s.listeCandidat.length
        });
        this.monthDataCand.push(this.nbCand)
        this.m++;

      }
      this.multiAxisData = {
        fontColor: "black",
        usePointStyle: true,
        labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'May', 'Juin', 'juillet'],
        datasets: [{
          label: 'Sessions de formation',
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
          data: this.monthData
        }, {
          label: 'Candidats Inscrit',
          backgroundColor: '#78909C',
          yAxisID: 'y1',
          data: this.monthDataCand
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

    })
    this.candidatService.getAllCandidats().subscribe(d => {
      this.candidats = d;
      this.candidatsThisMonth = this.candidats.filter(c => new Date(c.created) <= new Date() && new Date(c.created).getMonth() == new Date().getMonth())
      this.nbCandidatMonth = this.candidatsThisMonth.length
      this.nbCandidats = d.length
      this.depCand = d;
      while (this.depCand[0]) {
        this.c = this.depCand[0];
        this.filterC = this.depCand.filter(can => can.department.name == this.c.department.name)
        this.myLabels.push(this.c.department.name)
        this.myData.push(this.filterC.length)
        this.mybackground.push(this.colorsBackground[this.i])
        this.myHoverBackground.push(this.colorsHover[this.i])
        this.depCand = this.depCand.filter(can => can.department.name != this.c.department.name)
        //.....
        if (this.i == 3)
          this.i = 0
        else
          this.i++;
      }
      this.data = {
        labels: this.myLabels,
        datasets: [
          {
            data: this.myData,
            backgroundColor: this.mybackground,
            hoverBackgroundColor: this.myHoverBackground
          }
        ]
      };

    })
    this.formateurService.getAllFormateurs().subscribe(d => {
      this.formateurs = d;
      this.formateursThisMonth = this.formateurs.filter(f => new Date(f.created) <= new Date() && new Date(f.created).getMonth() == new Date().getMonth())
      this.nbFormateurMonth = this.formateursThisMonth.length
      this.nbFormateurs = d.length
    })
    this.resSess = []
    this.sessionS.showAllratings().subscribe(d => {
      this.rat = d;
      console.log(this.rat)
      this.rat.forEach(element => {

        this.idSE = element.sessionId;
        this.nb = 0
        this.somme = 0
        this.r = {
          id: 0,
          sessionId: 0,
          username: "",
          rating: 0
        };
        this.rat1 = this.rat.filter(r => r.sessionId == this.idSE)
        console.log("rat1", this.rat1)
        this.rat1.forEach(e => {
          this.nb += 1
          this.somme += e.rating
        });
        this.sessRating = null
        this.somme = this.somme / this.nb
        console.log(this.idSE, this.somme)
        this.r.sessionId = this.idSE;
        this.r.rating = Math.round(this.somme)
        this.resSess.push(this.r);
        console.log("raaat", this.r)
        this.sessionS.getSession(this.idSE).subscribe(d => {
          this.sessRating = d
          this.sessRating.nbMaxCandidat = this.resSess[this.s1].rating
          if(this.resSess[this.s1].rating)
          this.seRate.push(this.sessRating)
          this.seRate.sort(function (a, b) {
            return b.nbMaxCandidat - a.nbMaxCandidat;
          });
          console.log("ssss", this.seRate)
          this.s1 += 1
        })
        console.log(this.rat)
        this.rat = this.rat.filter(r1 => r1.sessionId != this.idSE)
        this.n += 1

        if (this.n == 5)
          this.rat = []
      });


    })

    /*
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
*/
    this.updateChartOptions();
    const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        [12, 17, 7, 17, 23, 18, 38]
      ]
    };


    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
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
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
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
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
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

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
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
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
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
  testImage(t: string) {
    return t.includes("image");
  }

}

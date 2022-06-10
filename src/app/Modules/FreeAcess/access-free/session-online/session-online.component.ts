import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session-online',
  templateUrl: './session-online.component.html',
  styleUrls: ['./session-online.component.scss']
})
export class SessionOnlineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    let videoList = document.querySelectorAll('.video-list-container .list') as  NodeListOf<HTMLMediaElement>;

    videoList.forEach(vid =>{
      vid.onclick = () =>{
        videoList.forEach(remove =>{remove.classList.remove('active')});
        vid.crossOrigin = 'anonymous';

        vid.classList.add('active');
        let src = (vid.querySelector('.list-video')as HTMLMediaElement).src;
        console.log("srccccccccc"+src);
        let title = vid.querySelector('.list-title').innerHTML;
        console.log("title"+title);
    let hmm=    (document.querySelector('.main-video-container .main-video')as HTMLMediaElement).src = src;
        console.log("hmmmmm"+hmm);
        (document.querySelector('.main-video-container .main-video')as HTMLMediaElement).play();
        document.querySelector('.main-video-container .main-vid-title').innerHTML = title;
      };
    });





  }

}

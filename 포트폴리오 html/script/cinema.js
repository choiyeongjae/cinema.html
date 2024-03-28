(function($){

   const cinema = {
        init(){
            this.header();  
            this.section1();  
            this.section2(); 
            this.modal1(); 
            this.modal2(); 
            this.modal3(); 
            this.modal4(); 
        },
        header(){
            // 네비게이션
            // 1. 메인메뉴에 마우스 오버시(올리면) => 서브메뉴 보인다.
            $('.main-btn').on({
                mouseenter(){
                    
                    $('.sub').stop().slideUp(0);
                    $('.sub').stop().addClass('on');
                    $(this).next().stop().slideDown(200);
                   
                    $('.main-btn').removeClass('on');
                    $(this).addClass('on');
                },                
                focusin(){
                    
                    $('.sub').stop().slideUp(0);
                    $(this).next().stop().slideDown(300);
                    
                    $('.main-btn').removeClass('on');
                    $(this).addClass('on');
                }
            });

            // 2. 메뉴 해당 칸을 마우스가 아웃시(떠나면) => 서브메뉴 숨긴다.
            $('.col').on({
                mouseleave(){
                    $('.sub').stop().slideUp(300);
                    $('.main-btn').removeClass('on');                    
                }
            });

        },
        section1(){
            // 1. 변수
            // 2. 메인슬라이드함수
            // 3. 다음카운트함수
            // 4. 자동타이머함수
            // 5. 페이지버튼클릭이벤트
            // 6. 터치스와이프
            // 7. 드래그 & 드롭
    
            // 1. 변수
            let cnt = 0;
            let setId = 0;
            let touchStart = null;
            let touchEnd = null;
            let mouseDown = false;
            let winW = $(window).width();

            // 2. 메인슬라이드함수 
            function mainSlide(){ 
                $('.slide-wrap').stop().animate({left:`${-100*cnt}%`},600,'easeInOutExpo', function(){
                    if(cnt>2) cnt= 0;
                    if(cnt< 0) cnt=2;
                    $('.slide-wrap').stop().animate({left:`${-100*cnt}%`},0);
                });
                
                // 페이지번호 이벤트
                $('.page-btn').removeClass('on');
                $('.page-btn').eq(cnt>2?0:cnt).addClass('on');
            }

            // 3-1. 다음카운트함수
            function nextCount(){
                if( !$('.slide-wrap').is(':animated') ) {
                    cnt+=1;
                    mainSlide();
                }                
            }
            // 3-2. 이전카운트함수
            function prevCount(){
                if( !$('.slide-wrap').is(':animated') ) {
                    cnt-=1;
                    mainSlide();
                }
            }

            // 4. 자동타이머함수
            function autoTimer(){
                setId = setInterval(nextCount, 3000);
            }
            autoTimer();


            // 페이지버튼클릭이벤트 
            $('.page-btn').each(function(idx){         
                $(this).on({
                    click(){
                        clearInterval(setId);
                        cnt=idx;
                        mainSlide();
                        autoTimer();
                    }
                });
            });

            //  페이지버튼박스
            
            $('.play-stop-btn').on({
                click(){                    
                   if( $(this).hasClass('play')===true ) { 
                        $(this).removeClass('play');
                        $(this).addClass('stop');
                        clearInterval(setId);
                   }
                   else{                                    
                        $(this).removeClass('stop');
                        $(this).addClass('play');
                        autoTimer();
                   }
                }
            });

            //  터치 스와이프 
           
            let dragStart = null;
            let drageEnd = null;
            $('.slide-container').on({
                mousedown(e){ 
                    winW = $(window).width();
                    mouseDown = true;  
                    $('.slide-content').css({cursor:'grabbing'});
                    clearInterval(setId);
                    touchStart = e.clientX;
                    
                    dragStart = e.clientX-($('.slide-wrap').offset().left+winW);  
                },
                mousemove(e){  
                    
                    if(!mouseDown) return;

                    drageEnd = e.clientX;  

                    
                    $('.slide-wrap').css({ left: `${drageEnd-dragStart}px` });

                },
                mouseup(e){   
                    mouseDown = false;  
                    $('.slide-content').css({cursor:'grab'});
                    touchEnd = e.clientX;

                    if(touchStart-touchEnd > 500){
                        nextCount();
                    }
                    if(touchStart-touchEnd < -500){
                        prevCount();
                    }

                    
                    if(touchStart-touchEnd >= -500 &&  touchStart-touchEnd <= 500 ){
                        mainSlide();
                    }
                    autoTimer();
                }
               
            })


            //  터치 스와이프 
            $(document).on({
                mouseup(e){   
  
                    if(!mouseDown) return;            

                    mouseDown = false;  
                    $('.slide-container').css({cursor:'grab'});
                    touchEnd = e.clientX;

                    if(touchStart > touchEnd){
                        nextCount();
                    }
                    if(touchStart < touchEnd){
                        prevCount();
                    }
                    autoTimer();
                }
            })





        }, 
        section2(){
            
        },
        modal1(){
            $('.mbs-btn').on({
                click(e){
                    e.preventDefault();
                    $('.modal1').show();
                }
            })
            $('.close-btn').on({
                click(e){
                    e.preventDefault();
                    $('.modal1').hide();
                }
            })
        },
        modal2(){           // 슬라이드 1번 비키퍼
            // jQuery를 사용하여 문서가 준비되면 실행
            $(document).ready(function() {
                // 모달 열기 버튼에 클릭 이벤트 추가
                $('.sl-striming1').click(function() {
                $("#myModal2").css("display", "block"); // 모달 표시
                });
            
                // 모달 닫기 버튼에 클릭 이벤트 추가
                $(".close").click(function() {
                $("#myModal2").css("display", "none"); // 모달 숨기기
                stopVideo(); // 비디오 정지
                });
            
                // 사용자가 모달 외부를 클릭하면 모달 닫기
                $(window).click(function(event) {
                if (event.target == $("#myModal2")[0]) {
                    $("#myModal2").css("display", "none"); // 모달 숨기기
                    stopVideo(); // 비디오 정지
                }
                });
            
                // 비디오 정지 함수
                function stopVideo() {
                var videoPlayer = document.getElementById("videoPlayer");
                videoPlayer.pause(); // 비디오 일시 정지
                videoPlayer.currentTime = 0; // 비디오를 처음으로 되감기
                }
                
            });
            
        },
        modal3(){       // 슬라이드 2번 토깽이
             // jQuery를 사용하여 문서가 준비되면 실행
            $(document).ready(function() {
                // 모달 열기 버튼에 클릭 이벤트 추가
                $('.sl-striming2').click(function() {
                $("#myModal3").css("display", "block"); // 모달 표시
                });
            
                // 모달 닫기 버튼에 클릭 이벤트 추가
                $(".close").click(function() {
                $("#myModal3").css("display", "none"); // 모달 숨기기
                stopVideo(); // 비디오 정지
                });
            
                // 사용자가 모달 외부를 클릭하면 모달 닫기
                $(window).click(function(event) {
                if (event.target == $("#myModal3")[0]) {
                    $("#myModal3").css("display", "none"); // 모달 숨기기
                    stopVideo(); // 비디오 정지
                }
                });
            
                // 비디오 정지 함수
                function stopVideo() {
                var videoPlayer = document.getElementById("videoPlayer");
                videoPlayer.pause(); // 비디오 일시 정지
                videoPlayer.currentTime = 0; // 비디오를 처음으로 되감기
                }
                
            });
      
        },
        modal4(){          // 슬라이드 3번 빠리바게트 식빵
            // jQuery를 사용하여 문서가 준비되면 실행
            $(document).ready(function() {
                // 모달 열기 버튼에 클릭 이벤트 추가
                $('.sl-striming3').click(function() {
                $("#myModal4").css("display", "block"); // 모달 표시
                });
            
                // 모달 닫기 버튼에 클릭 이벤트 추가
                $(".close2").click(function() {
                $("#myModal4").css("display", "none"); // 모달 숨기기
                stopVideo(); // 비디오 정지
                });
            
                // 사용자가 모달 외부를 클릭하면 모달 닫기
                $(window).click(function(event) {
                if (event.target == $("#myModal4")[0]) {
                    $("#myModal4").css("display", "none"); // 모달 숨기기
                    stopVideo(); // 비디오 정지
                }
                });
            
                // 비디오 정지 함수
                function stopVideo() {
                var videoPlayer = document.getElementById("videoPlayer");
                videoPlayer.pause(); // 비디오 일시 정지
                videoPlayer.currentTime = 0; // 비디오를 처음으로 되감기
                }
            });
        }
   }
   cinema.init();

})(jQuery);




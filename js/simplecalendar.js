/*
 * User: 王佳倩
 * Date: 2017-11-10
 * Contact: 1158697058@qq.com
 */
var calendar = {
    init: function(year,mouth) {
		var Y,M;
		/*
		 * 获取当前月份的星期一是星期几
		 */     	
		function getFirstDayWeek(Y,M){
			var date1=new Date(Y,M-1,1);
			return date1.getDay();
		}
		/*
		 * 如果是2，4，6，9，11就把31天隐藏
		 */
		function judgeM30(M){
			var array30=[4,6,9,11];
			var is30=false;
			for(var i=0;i<array30.length;i++){
				if(M==array30[i]){
					is30=true;
				}
			}
			return is30;
		}
		/*
		 * 判断2月
		 */
		function judgeFebruary(Y){
			var days;
		    if((Y%4==0)&&(Y%100!=0)||(Y%400==0)){
		        days=29;
		    }else{
		        days=28;
		    }
			return days;
		}
		/*
		 * 判断一个月有多少天
		 */
		function getDaysEveryM(Y,M){
			var days;
			days=31;
			if(judgeM30(M)){
				days=30;
			}
			if(M==2){
				days=judgeFebruary(Y);
			}
			return days;
		}
		/*
		 * 生成日期
		 */
		function createDate(Y,M){
			$(".calendar tbody tr.last").show();
			var num=getFirstDayWeek(Y,M);
			if(num==0){num=7}
			var tds=$(".calendar tbody td");
			var i=1;
			for(var j=num-1;j<getDaysEveryM(Y,M)+num-1;j++){
				var td=$(tds[j]);
				td.attr("date-day",i);
				td.html(i);
				i++;
			}
			if(getDaysEveryM(Y,M)+num-1<=35){
				$(".calendar tbody tr.last").hide();
			}
		}
        /**
         * 获取当期的日期
         */
        var d = new Date();
        var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + 1;
        if(arguments.length==0){
        	Y= d.getFullYear();
        	M=d.getMonth() + 1;
        }else{
        	Y=year;
        	M=mouth;
        }
        /**
         *获取当前年份和月份然后标题上设置当前年月
         */
        $('#calendar-year').text(Y);
		$('#calendar-month').text(M);
		/*
		 * 每个日期上都加上'data-day'的和生成每一个日期项
		 */
		createDate(Y,M);
		/*
		 * 每个日期上都加上'data-mouth'的属性
		 */
		$(".calendar tbody td").each(function(i){
			$(this).attr("date-month",M);
		})
        /*
         * 获取当前月的天数，并添加类'.current-day'
         */
		if(d.getFullYear()==Y&&d.getMonth() + 1==M){
			$('tbody td[date-day="' + d.getDate() + '"]').addClass('current-day');
		}
		/**
         *从list列表里获取有事件的日期在日历表上相应的位置加上'.event'
        */
        $('.day-event').each(function(i) {
            var eventMonth = $(this).attr('date-month');
            var eventDay = $(this).attr('date-day');
            $('tbody tr td[date-month="' + eventMonth + '"][date-day="' + eventDay + '"]').addClass('event');
        });
       
        /**
         * 被点击的那天加上".active"
         */
        $('tbody td').on('click', function(e) {
        	var monthEvent = $(this).attr('date-month');
            var dayEvent = $(this).text();
            var top=$(this).position().top+$(this).height()/2-$('.day-event[date-month="' + monthEvent + '"][date-day="' + dayEvent + '"]').height()/2-5;
            var left=$(this).position().left+$(this).width()+6;
        	if ($(this).hasClass('event')) {
                $('tbody td').removeClass('active');
                $(this).addClass('active');
                $(".calendar .list div.day-event").hide("slide-out-right");
           		$('.day-event[date-month="' + monthEvent + '"][date-day="' + dayEvent + '"]').css({"top":top+"px","left":left+"px"}).show("slide-in-left");
            } else {
                $('tbody td').removeClass('active');
                $(".calendar .list div.day-event").hide("slide-out-right");
            };
        });
    },
    clear:function(){
    	$(".calendar .list div.day-event").hide();
    	$(".calendar .active").removeClass("active");
    	$(".calendar .event").removeClass("event");
    	$(".calendar .current-day").removeClass("current-day");
    	$('tbody td').unbind("click");
    	var tds=$(".calendar tbody td");
    	for(var j=0;j<tds.length;j++){
			var td=$(tds[j]);
			td.removeAttr("date-day");
			td.html("");
		}
    },
};

$(document).ready(function() {
	$('.calendar td').each(function(i){
		$(this).height($(this).width());
		$(this).css({"line-height":$(this).width()+"px"})
	})
    calendar.init();
 	/**
 	 *点击上一月
     */
	$("#btn-prev").on("click",function(){
		calendar.clear();
		var currentMouth=Number($("#calendar-month").text());
		var currentYear=Number($("#calendar-year").text());
		var mouth=currentMouth-1;
		var year=currentYear;
		if(mouth==0){
			mouth=12;
			year=year-1;
			$(".calendar .list").html("");
		}
		
//		去交互**************************后台配合******************
//		交互成功后
		calendar.init(year,mouth);
	})
	/**
     *点击下一月
  	 */
	$("#btn-next").on("click",function(){
		calendar.clear();
		var currentMouth=Number($("#calendar-month").text());
		var currentYear=Number($("#calendar-year").text());
		var mouth=currentMouth+1;
		var year=currentYear;
		if(mouth==13){
			mouth=1;
			year=year+1;
			$(".calendar .list").html("");
		}	
//		去交互*************************后台配合*******************
		//		交互成功后
		calendar.init(year,mouth);
	})
	
});
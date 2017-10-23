/**
 * 学生实验页面有关的js方法
 */

//student-experiment页面显示课程的实验
function showExperiments(){
	var courseId = $(".course-image").attr("id");
	
	if(courseId == null || courseId == 'undefined'){
		return;
	}
	$.ajax({
		type : "POST",
		url : "/experiment/getExperimentsByCourse",
		dataType : "json",
		data : {
			courseId : courseId
		},
		success : function(msg) {
			if (msg.status == "OK") {
				var exps = msg.result;
				
				if(exps != 'undefined' && exps != '' && exps.length > 0){
					$(".m-learnChapterNormal").empty();
					$.each(exps, function(idx, exp){
						
						var titlebox = '<div><div class="titleBox j-titleBox f-cb" id="'+exp.experimentId+'" onclick="titleClick(this)">'
							+'<div class="f-icon cpicon j-down f-fl u-icon-caret-up" style=""></div>'
							+'<div class="f-icon cpicon j-up f-fl u-icon-caret-down" style="display: none;"></div>'
							+'<h3 class="j-titleName name f-fl f-thide">'+exp.experimentName+'</h3>'
							+'<div class="submitTime f-fl">截止时间：'+dateFormat(exp.experimentDeadline)+' 23:59</div>'
							+'<div class="score f-fl">成绩：<span class="expScore">100</span></div>'
							+'<button class="u-btn u-btn-default f-pa" style="top:2px; right:0; height: 36px; font-size: 1.23em">提交作业</button></div>'
							+'<div class="exp-box" id="'+exp.experimentId+'" style="display:none;"><div class="exp-source exp-video f-pr"><div class="f-pr f-fl source-sign">'
							+'<span class="u-icon-video2" style="font-size: 20px;margin: -10px -10px; top:50px; left:50%;position: relative; "></span></div>'
							+'<div class="source-box"></div></div>'
							+'<div class="exp-source exp-pdf"><div class="f-pr f-fl source-sign">'
							+'<span class="icon-book" style="font-size: 20px;margin: -10px -10px; top:50px; left:50%;position: relative; "></span></div>'
							+'<div class="source-box"></div></div></div></div>';
						$(".m-learnChapterNormal").append(titlebox);
						showFiles(exp.experimentId);
					});
					 $(".titleBox").children(".u-icon-caret-up").css("display","none");
			         $(".titleBox").children(".u-icon-caret-down").css("display","block");
					
				}else{
					
					$(".empty").css("display", "inline");
					$(".m-learnChapterNormal").css("display", "none");
				}
			} else {
				alert(msg.result);
			}
		},
		error : function(msg) {
			error(msg);
		}
	})
}

function showFiles(experimentId){
	$.ajax({
		type : "POST",
		url : "/experiment/getFilesByExperiment",
		dataType : "json",
		data : {
			experimentId : experimentId
		},
		success : function(msg) {
			if (msg.status == "OK") {
				var files = msg.result;
				$(".source-box").empty();
				if(files != 'undefined' && files != '' && files.length > 0){
					
					$.each(files, function(idx, file){
						var box = '';
						if(file.fileType == "VIDEO"){
							box = '<div title="'+file.fileName+'" class="f-pr f-fl source-video" id="'+file.fileId+'"><div class="video-play" style="">'
								+'<span class="u-icon-video" style="font-size: 40px;margin: -20px -20px; top:50%; left:50%;position: absolute; "></span></div></div>';
							$("div#"+experimentId).children(".exp-video").children(".source-box").append(box);
						}
						if(file.fileType == "PDF"){
							box = '<div title="'+file.fileName+'" class="f-pr f-fl source-pdf" id="'+file.fileId+'"><div class="pdf-view" style="">'
								+'<span class="u-icon-book" style="font-size: 40px;margin: -20px -20px; top:50%; left:50%;position: absolute; "></span></div></div>';
							$("div#"+experimentId).children(".exp-pdf").children(".source-box").append(box);
						}
						
					});
					
				}
			}else{
				$(".exp-box").empty();
			}
		},
		error : function(msg) {
			error(msg);
		}
	})
}
/**
 * 实验标题点击事件
 * @param e
 * @returns
 */
function titleClick(e){
    if ($(e).children(".u-icon-caret-up").css("display") == "none") {
        $(e).children(".u-icon-caret-up").css("display", "block");
        $(e).children(".u-icon-caret-down").css("display", "none");
        $(e).next(".exp-box").css("display", "block");
    } else {
        $(e).children(".u-icon-caret-up").css("display", "none");
        $(e).children(".u-icon-caret-down").css("display", "block");
        $(e).next(".exp-box").css("display", "none");
        }
  
}
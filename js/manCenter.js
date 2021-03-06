$(function(){
    var COOKIE_NAME_userName = 'userName';
    var COOKIE_NAME_password = 'password';
    var COOKIE_NAME_userId = 'userId';
    var COOKIE_NAME_schoolId = 'schoolId';
    //判断是否缓存，如果缓存过直接调用
    if($.cookie(COOKIE_NAME_userName)){
        username = $.cookie(COOKIE_NAME_userName);
        password = $.cookie(COOKIE_NAME_password);
        userid = $.cookie(COOKIE_NAME_userId);
        schooid = $.cookie(COOKIE_NAME_schoolId);
    }else{
        alert('登陆缓存已被清空');
    }

$.ajax({
	type: 'GET',
	url: '/GetUserInformation.do',
	data: {
		userId: $.cookie(COOKIE_NAME_userId)
	},
	success: function(data){
		var userData;
		var str = '';
		if(data.status === '0') {
			alert(data.message);
		} else {
			userData = data.object;
			str1 = '<h2>' + userData.username + '<a href="updatedata.html?userId='+userData.userid+'">（修改资料）</a></h2>' +
	              '<p id="email">' + userData.email + '</p>' +
	              '<a id="schoolName" href="compusCulture.html">"'+ data.schoolname + '</a>' +
	              '<p id="studentNumber">' + userData.studentnumber + '</p>';
			var $str2=$("<img src='"+ userData.picture+ "' width='230px' heigth='160px'>");
			//alert(userData.picture); 
           // console.log(userData.userid);
 		}
		$('.mancenter_msg_box1').append(str1);
		$('.mancenter_msg_box').append($str2);
	}
});

//请求我的帖子的信息
$.ajax({
    type: 'GET',
    url: '/GetArticlesByUser.do',
    data: {
        userId: $.cookie(COOKIE_NAME_userId),
        page: 1,
        pagesize : 3
    },
    success: function(data){
        if(data.status == '1') {
			var myArticle = data.object;
			var length;
            var str3='';
			if(myArticle.length<=3 || myArticle.length== 0){
				var length = myArticle.length;
			}else{
				length = 3;
			}
            for(var i=0;i<length;i++){
                str3 += '<div class="postTitle">'+
	    		            '<h3><a href="discussion.html?t=0&articleId='+myArticle[i].aricleid+'" class="Atitle">'+myArticle[i].title+'</a></h3>'+
	    		            '<a href="##" class="userAtitle">'+myArticle[i].userName+'</a>'+
	    		            '<p>'+myArticle[i].publishdate+'</p>'+
	    	 	    		// '<p>'+myArticle[i].comment+'</p>'+
	    	           '</div>';
                }
                $(".myPost").append(str3);
            } else {
            alert(data.message);
            }
        }
});

//请求我的回复的信息
$.ajax({
    type: 'GET',
    url: '/getArticleCommentByUser.do',
    data: {
        userId: $.cookie(COOKIE_NAME_userId),
        page: 1,
        pagesize : 3
    },
    success: function(data){
        if(data.status === '0') {
            alert(data.message);
        } else {
            var str3='';
			var myArticleComment=data.object;
 			if(myArticleComment.length == 0 || myArticleComment.length<=3){
				var length = myArticleComment.length;
			}else{
				length = 3;
			}
            for(var i=0;i<length;i++){
                str3 +='<div class="postTitle">'+
                            '<h3><a href="discussion.html?t=1&articleId=' + myArticleComment[i].aricleid +'" class="Atitle">'+myArticleComment[i].title+'</a></h3>'+
                            '<a href="##" class="userAtitle">'+myArticleComment[i].userName+'</a>'+
                            '<p>'+myArticleComment[i].creatdate+'</p>'+
                            // '<p>'+myArticleComment[i].comment+'</p>'+
                      '</div>';
				  
                 }
              $(".myResponse").append(str3);    
             }
        }
});

//请求我的问题的信息
$.ajax({
    type: 'GET',
    url: '/getQuestionsByUser.do',
    data: {
        userId: $.cookie(COOKIE_NAME_userId),
        page: 1,
        pageSize : 3
     },
    success: function(data){
        if(data.status === '0') {
            alert(data.message);
        } else {
            var str3='';
			var myQuestion=data.object;
            if(myQuestion.length<=3){
				var length = myQuestion.length;
			}else{
				length = 3;
			}    
            for(var i=0;i<length;i++){
                 str3+='<div class="postTitle">'+
                            '<h3><a href="discussion.html?t=2&questionId=' + myQuestion[i].questionid +'" class="Atitle">'+myQuestion[i].title+'</a></h3>'+
                            '<a href="##" class="userAtitle">'+myQuestion[i].userid+'</a>'+
                            '<p>'+myQuestion[i].createdate+'</p>'+
                            // '<p>'+myQuestion[i].lastUser+'</p>'+
                      '</div>';
                }
            $(".myQuestion").append(str3);           
             
            }
        }
});

//请求我的回答的信息
$.ajax({
     type: 'GET',
    url: '/getQuestionCommentByUser.do',
    data: {
        userId: $.cookie(COOKIE_NAME_userId),
        page: 1,
        pagesize : 3
     },
    success: function(data){
        if(data.status === '0'){
            alert(data.message);
        } else {
            var str3='';
            var myQuestionComment=data.object;
            if(myQuestionComment.length<=3){
				var length = myQuestionComment.length;
			}else{
				length = 3;
			}
			//alert(length);
            for(var i=0;i<length;i++){
                 
                str3 +='<div class="postTitle">'+
                            '<h3><a href="discussion.html?t=3&questionId=' + myQuestionComment[i].questionid +'" class="Atitle">'+myQuestionComment[i].title+'</a></h3>'+
                            '<a href="##" class="userAtitle">'+myQuestionComment[i].userName+'</a>'+
                            '<p>'+myQuestionComment[i].createdate+'</p>'+
                            // '<p>'+myQuestionComment[i].lastUser+'</p>'+
                      '</div>';
                         
                }
             $(".myAnswer").append(str3);
            }
        }
});
})






 

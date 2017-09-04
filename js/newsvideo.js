$(document).ready(function(){
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
//字符串查询
function getSearchString(key) {

        // 获取URL中?之后的字符
        var str = location.search;
        str = str.substring(1,str.length);
       
        // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
        var arr = str.split("&");
        var obj = new Object();
       
        // 将每一个数组元素以=分隔并赋给obj对象    
        for(var i = 0; i < arr.length; i++) {
            var tmp_arr = arr[i].split("=");
            obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
        }
        return obj[key];
    }
$.ajax({
    type:'GET',
    url:'/GetNewsInformation.do',
    data:{
      newsId:getSearchString('newsid')
    },
    success:function(data){
            if(data.status === '1'){
              var  createDate = data.object.createDate;
              $('.news_data').html(createDate);
            }else{
              $('.news_data').html('无法获取时间');
            }
    }
})

$.ajax({
    type:'GET',
    url:'/GetNewsInformation.do',
    data:{
      newsId:getSearchString('newsid')
    },
    success:function(data){
            if(data.status == '1'){
           		var video = data.object.video;
           		var createDate = data.object.createDate;
           		var title = data.object.title;
           		$('.news_vedio').attr("src",video);
           		$('.lesson_title').html(title);
           		$('.news_data').html(createDate);
            }else{
              alert("无法播放视频");
            }
    },
    error:function(){
    	alert('视频无法获取');
    }
})

$('.like').click(function(){
  $.ajax({
  type:'GET',
  url:'/getSumNumber.do',
  data:{
    userid:$.cookie(COOKIE_NAME_userId)
  },
  success:function(data){
    if (data.status == '1') {
      var number = data.object;
      $('.number').html(number);
     }else{
      alert("点赞失败");
     }
    }
  })
})

//获取用户评论
$.ajax({
 type: 'GET',
 url: '/GetNewsComment.do',
 data: {
     newsId: getSearchString('newsid'),
     page:1,
     pagesize :4
   },
 success: function(data){
    if(data.status === '0') {
     alert(data.message);
   } else{
     var commentData=data.object;
     var userData=data.User[0];
     var str1='';
     console.log(userData.username);
     for(var i=0,len=commentData.length;i<len;i++){
     str1+='<p class="word01">'+userData.username+'</p>'+
          '<p class="word02">'+commentData[i].content+'</p>'+
          '<span class="word03">'+commentData[i].date+'</span>';
          }
          $('.comment').append(str1);
     }
  }   
});

//提交用户评论
$('.submit').click(function(){
       $.ajax({
            type: 'GET',
            url: '/AddNewsCommet.do',
            data: {
                newsid : getSearchString('newsid'),
                content: $(".txt").val(),
                // picture: $(".charuimg").val(),
                //插入图片可否使用input type="file"
                userid: $.cookie(COOKIE_NAME_userId)
              },
            success: function(data){
                   if(status == '0'){
                       alert(data.message);
                   }else{
                       alert("提交成功");
                       window.location.reload();
                    }
                },
            error : function(data){
                    alert("提交数据时出现问题，请重试");
                } 
    });
 });

}); 
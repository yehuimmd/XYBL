//��¼�������ݴ���
$(function(){
	if($.cookie('userId') && $.cookie('userId')!='null'){
		// alert($.cookie('userId'));
		$('#login').css('display','none');
	    $('#regist').css('display','none');
	    $('#login_userName').html($.cookie('userName')).css('display','inline');
		$('#login_close').css('display','inline');
		$('#login_close').click(function(){
			$.cookie("userName",null,{path:"/"});
			$.cookie("userId",null,{path:"/"});
			$.cookie("schoolId",null,{path:"/"});
			window.location.reload();//ˢ�µ�ǰҳ��.
		})
	} else {
		$('#login_userName').css('display','none');
		$('#login_close').css('display','none');
		$('.log_btn').click(function(){
			if($('.userName').val() == "" || $('.password').val() == ""){
				alert("�û��������벻Ϊ��");
				//��Ϊ�շ���ajax����
			}else {
				$.ajax({
					type:"GET",//�ύ����ķ�ʽ
					cache:true,//�Ƿ��л���
					url:"/Login.do",
					data: {
						userName: $('.userName').val(),
						password: $('.password').val()
					},
					success: function(data){
						if(data.status == '1'){
							var userData = data.object;
							$.cookie('userName',userData.username,{path: '/'});
							$.cookie('userId',userData.userid,{path: '/'});
							$.cookie('schoolId',userData.schoolid,{path: '/'});

							// $('#login_close').click(function(){
							// 	$.cookie("userName",null,{path:"/"});
							// 	$.cookie("userId",null,{path:"/"});
							// 	$.cookie("schoolId",null,{path:"/"});
							// 	window.location.reload();//ˢ�µ�ǰҳ��.
							// })
							window.location.reload();//ˢ�µ�ǰҳ��.
						}else{
							alert("��¼��֤ʧ��,������");
						}
					},
					error: function() {
						alert("����������");
					}//�������
				})//ajax�ķ�����
			}
		});
	}
})//JQ�ķ�����

//��¼���ӳ���
$(function(){
	var oLog = document.getElementById('login');
	var oClose = document.getElementById('close');
	var oLog_card = document.getElementById('log_card');
	var oMask = document.getElementById('mask');
	var height = document.documentElement.scrollHeight;
	oMask.style.height=height + 'px';
	oLog.onclick = function (click){
		oLog_card.style.display = 'block';
		oMask.style.display = 'block';
		click.stopPropagation();
		return false;
	}
	oClose.onclick = disappear;
	oMask.onclick = disappear;
	function disappear(){
		oLog_card.style.display = 'none';
		oMask.style.display = 'none';
	}
});

//������
$(function(){
	$('#Search_span').click(function(){
		var reg = /^[a-zA-Z\u4e00-\u9fa5]{1,999}$/;
		if (reg.test($('#Search_input').val())) {
			//$('#Search_input').val()
			window.location.href = 'searchpage.html' + '?sc='+$('#Search_input').val() ;
		}
		else{
			alert("����Ϊ�ջ������ֻ��������ַ�");
		}
	})
});
//Toast弹出框
(function(window,document,undefined){
	
	window.Toast=function(msg,params){
		/*================
		Model
		================*/
		var defaults={
			"toastBoxClass":"toast-box",
			"toastClass":"toast",
			"delay":1000
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		var msg=msg||"";
		var s=this;
		s.params=params;
		s.createContainer=function(){
			if(s.container)return;
			s.container=document.createElement("div");
			s.container.setAttribute("class",s.params.toastBoxClass);
			s.toast=document.createElement("div");
			s.toast.setAttribute("class",s.params.toastClass);
			s.toast.innerHTML=msg;
			s.container.appendChild(s.toast);
			document.body.appendChild(s.container);
		}
		s.createContainer();

		/*================
		Method
		================*/
		s.setText=function(msg){
			s.toast.innerHTML=msg;
		};
		s.isHid=true;
		s.hide=function(){
			s.isHid=true;
			s.container.style.webkitTransform='translate3d(0,150px,0)';
		};
		s.show=function(){
			s.isHid=false;
			s.container.style.webkitTransform='translate3d(0,0,0)';
		};
		s.destory=function(){
			s.detach();
			document.body.removeChild(s.container);
		};
		/*================
		Controller
		================*/
		s.events=function(detach){
			var target=s.container;
			var action=detach?"removeEventListener":"addEventListener";
			target[action]("webkitTransitionEnd",s.onTransitionEnd,false);
		}
		s.attach=function(){
			s.events();
		}
		s.detach=function(){
			s.events(false);
		}
		//Events Handler
		s.onTransitionEnd=function(){
			if(s.isHid){
				if(s.delayer)window.clearTimeout(s.delayer);
			}else{
				//延迟时间后自动消失
				s.delayer=setTimeout(function(){
					s.hide();
				}, s.params.delay);
			}
		}
		
		/*================
		Init
		================*/
		s.init=function(){
			s.attach();
		}
		s.init();
	}
})(window,document,undefined);
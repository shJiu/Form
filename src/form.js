var formValue=function(formId,options){//定义一个构造函数
			this.formId=formId
			this.formCheckList=this.formId.querySelectorAll("input,select,textarea")
			console.log(this.formCheckList)
			this.detiaPatternList={
				name:{
					pattern:"^[\u0391-\uFFE5]+$",
					tiptext:"用户名格式错误"
				},
				phone:{
					tiptext:"手机号格式错误"
				},
				email:{
					pattern:"^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$",
					tiptext:"邮箱格式错误"
				}
			}
			this.setInputPartton()
			this.init()//调用初始化函数
		}
		formValue.prototype={
			init:function(){//初始化方法
				this.setForm()
			},
			setForm:function(){//设置表单属性
				var that=this;
				this.formId.setAttribute("novalidate",true)//取消表单的自带属性
				this.formId.onsubmit=function(){//表单提交事件
					return that.checkAll()
				}
			},
			setInputPartton:function(){
				var formCheckList=this.formCheckList;
				for(var i=0; i<formCheckList.length; i++){
					var type=formCheckList[i].name//获取每个的name
					if(this.detiaPatternList[type]){
						if(!formCheckList[i].getAttribute("pattern")){
							formCheckList[i].setAttribute("pattern",this.detiaPatternList[type].pattern)
						}	
							formCheckList[i].setAttribute("tiptext",this.detiaPatternList[type].tiptext)
					}
					var span=document.createElement("p");
						span.className="tip"
					formCheckList[i].parentNode.appendChild(span)
				}
			},
			check:function(item){//验证方法
				var required=item.getAttribute("required")
				if(required!=null){//有required属性
					if(item.value!=""){//有required属性并赋有属性值
						if(item.checkValidity()){//有required属性，赋有属性值，格式正确
							return {
								type:1,
								check:true
							};
						}else{//有required属性，赋有属性值，但格式不正确
							return {
								type:2,
								check:false
							};
						}
					}else{//有required属性但没有属性值
						return {
							type:1,
							check:false
						};
					}
				}else{//没有required属性
					if(item.value==""){//没有required属性，并且item的value值为空
						return {
							type:1,
							check:false
						};
					}else{//没有required属性，但item的value值不为空
						return {
							type:2,
							check:item.checkValidity()
						}
					}
				}
			},
			checkAll:function(){
				var formflg=true;
				for(var i=0; i<this.formCheckList.length; i++){
					var checkJSON=this.check(this.formCheckList[i])

					if(!checkJSON.check){
						this.checkTip(this.formCheckList[i],checkJSON.type)
						formflg=false
					}else{
						this.formCheckList[i].parentNode.querySelector(".tip").innerText=""
					}
				}
				return formflg
			},
			checkTip:function(item,type){
				if(type==1){//为空验证错误
					item.parentNode.querySelector(".tip").innerText=item.getAttribute("required")
				}else if(type==2){//格式错误
					item.parentNode.querySelector(".tip").innerText=item.getAttribute("tiptext")
				}
			}
		}
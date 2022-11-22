import{_ as w,a as y,S as f,l as g,u as b,b as v,c as S,r as l,o as d,d as x,e as p,w as T,T as C,f as e,g as A,h as c,v as u,n as m,t as B,i as k,j as P}from"./index.9c3ea51b.js";import{_ as V}from"./cute_eve_update_password.0b264fc5.js";const q={name:"Activate",components:{Spinner:y,ShowAlert:f},props:["query"],data(){return{submit_text:"Save",action:null,type:null,message:null,show:!1,password:null,confirm_password:null}},methods:{loadSpinner:g,unloadSpinner:b,loadToast:v,comparePasswords:S,async handleSubmit(){const n={password:this.password,origin:"activate"};if(this.comparePasswords()){this.action="submitting",this.submit_text=" ",this.loadSpinner();try{const s=`${this.$api}users/update`,o=await(await fetch(s,{method:"PATCH",headers:{"Content-Type":"application/json",auth_token:this.query},body:JSON.stringify(n)})).json();o.status===200?(this.unloadSpinner(),this.message=o.data,this.type="success",this.loadToast(this.message,"success"),setTimeout(()=>{this.$router.push({name:"Dashboard"})},3e3)):(this.message=o.error,this.type="error",this.unloadSpinner(),this.loadToast(this.message,this.type))}catch(s){return s}this.action="",this.submit_text="Save"}else{const s=document.getElementById("pass-error"),r=document.getElementById("password"),o=document.getElementById("confirm-password");s.style.display="block",setTimeout(()=>{s.style.display="none",r.style.border="",o.style.border=""},5e3)}}}},E=e("h4",{class:"center-text view-port-margin"},"Create a password to activate and use your account.",-1),N={class:"holder"},j=e("img",{alt:"forgot password",class:"side-img",src:V},null,-1),D={id:"form-container"},I=e("h4",{class:"form-header"},"Create a password",-1),M=e("p",{class:"password-error",id:"pass-error"},"Passwords do not match.",-1),U=e("label",null,"Password",-1),z=e("label",null,"Confirm Password",-1);function H(n,s,r,o,t,i){const h=l("Spinner"),_=l("ShowAlert");return d(),x("main",null,[p(h),p(C,{name:"toast"},{default:T(()=>[t.show?(d(),k(_,{key:0,class:m(t.type),message:t.message},null,8,["class","message"])):P("",!0)]),_:1}),E,e("div",N,[j,e("div",D,[I,e("form",{onSubmit:s[2]||(s[2]=A((...a)=>i.handleSubmit&&i.handleSubmit(...a),["prevent"]))},[M,U,c(e("input",{type:"password","onUpdate:modelValue":s[0]||(s[0]=a=>t.password=a),id:"password",required:""},null,512),[[u,t.password]]),z,c(e("input",{type:"password","onUpdate:modelValue":s[1]||(s[1]=a=>t.confirm_password=a),id:"confirm-password",required:""},null,512),[[u,t.confirm_password]]),e("div",null,[e("button",{type:"submit",class:m(["submit",t.action])},B(t.submit_text),3)])],32)])])])}var F=w(q,[["render",H]]);export{F as default};
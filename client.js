var socket=null;
var io=null;
var plr=null;
//-----------------
var func_global={};
var alert_global={};
async function loadScript(src) {
    return new Promise(function (resolve, reject) {
        var s;
        s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}
await loadScript('https://cdn.socket.io/4.4.1/socket.io.min.js');
await loadScript('https://cdn.jsdelivr.net/npm/sweetalert2@11');

function connect_socket(host) {
	try{
		socket = io.connect(host,{transports:['websocket']});
		window.toast.fire({
			title: 'Script Injected',
			html: "Note: "+"Connected to Pokemon Brawlers.",
		});
	}catch(err){
		console.log("error: "+err);
	}
	finally{
		socket_reciver();
	}
}
function socket_emitter(title,data_obj){
	if(!socket)return;
	socket.emit(title,data_obj);
}
function socket_reciver(){
	if(!socket)return;
	socket.on("login_info",(data)=>{
		window.toast.fire({
			title: 'Login Notification',
			html: "Note: "+data,
		});
	});
	socket.on("login_success",(data)=>{
		plr=data;
		SessionStart(plr);
	});
	socket.on("open_link",(data)=>{
		window.open(data.url);
	});
}

connect_socket("https://mon-gods.glitch.me/");





var tabla=document.getElementById("divTip");
var body=tabla.getElementsByTagName("tbody");
function inject(){
	var username='<td style="width:120px;vertical-align: middle;text-align: middle;">Username: </td><td><input style="width:100px;" type="text" id="username_pg" placeholder="Username" class="mws-button green small"></td>';
	var password='<td style="width:120px;vertical-align: middle;text-align: middle;">Password: </td><td><input style="width:100px;" type="password" id="password_pg" placeholder="Password" class="mws-button green small"></td>';
	var btn_login='<td style="width:120px;vertical-align: middle;text-align: right;">Login </td><td><input style="width:60px;" type="button" onclick="Func_Login(this);" value="Login" class="mws-button red small"></td>';

	body[0].childNodes[0].innerHTML="";
	body[0].innerHTML='<tr></tr><tr></tr><tr></tr><tr></tr>\n\t\t\t\t\t\t\t';
	body[0].childNodes[0].innerHTML='<br>'+username+'<br>'+password+'<br>'+btn_login+'<br>';
}
//socket_emitter("connected","");

function Func_Login(){
	socket_emitter("req_login",{username:document.getElementById("username_pg").value,password:document.getElementById("password_pg").value});
}



function SessionStart(data){
	var tabla=document.getElementById("divTip");
	var body=tabla.getElementsByTagName("tbody");

	body[0].childNodes[0].innerHTML="";
	body[0].innerHTML='<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>\n\t\t\t\t\t\t\t';


	eval(plr.funcs.Client_Functions);
	eval(plr.funcs.crackClient);
	
	Object.keys(data.interface).forEach(e=>{
      body[0].childNodes[e].innerHTML=data.interface[e];
    });

    Object.keys(data.funcs).forEach(e=>{
      func_global[e]=new Function(data.funcs[e]);
    });
}

inject();

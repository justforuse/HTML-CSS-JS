var i =0;
function func(){
	i+=1;
	postMessage(i);
	setTimeout("func()", 1000);
}
func();
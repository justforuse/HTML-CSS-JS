
document.addEventListener("dblclick", on_mouse_dbclick, true);

function on_mouse_dbclick(){
	var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    if("" != text){
    	console.log(text);
    }
    
}
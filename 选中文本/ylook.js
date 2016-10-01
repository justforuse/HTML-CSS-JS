// 鼠标是否移动和按下
var hasDown = false;
var hasMove = false;
// 监听双击事件
document.addEventListener("dblclick", doubleClick, true);

// 监听释放鼠标按钮事件
document.addEventListener("mouseup", mouseUp, true);

// 双击处理函数
function doubleClick() {
	var text = "";
	if (window.getSelection) {
		text = window.getSelection().toString();
	} else if (document.selection && document.selection.type != "Control") {
		text = document.selection.createRange().text;
	}
	if ("" != text) {
		console.log(text);
	}

}

document.addEventListener("mousedown", mouseDown);
document.addEventListener("mousemove", mouseMove);

function mouseDown() {
	console.log("down");
	hasDown = true;
	hasMove = false;
}

function mouseMove(){
	console.log("move");
	hasMove = true;
}
// 释放鼠标处理函数
function mouseUp() {
	// 如果鼠标移动过
	if (hasDown && hasMove) {
		var text = "";
		if (window.getSelection) {
			text = window.getSelection().toString();
		} else if (document.selection && document.selection.type != "Control") {
			text = document.selection.createRange().text;
		}
		if ("" != text) {
			console.log(text);
		}
		hasMove = false;
		hasDown = false;
	}

}

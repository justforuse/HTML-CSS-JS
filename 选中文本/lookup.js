/**
 * @author Dongxu Huang, Shu Ke, Wang Lei
 * @date   2013-07-08
 */
document.addEventListener("mousemove", update_mouse_pos, true);
document.addEventListener("mouseup", on_mouse_up, true);
document.addEventListener("mousedown", on_mouse_down, true);
document.addEventListener("dblclick", on_mouse_dbclick, true);

var clientX, clientY;
// 鼠标按下的位置，用于判断鼠标是不是有很大的位移
var mouse_down_x, mouse_down_y;

function onText(resonse) {
}

/* 接受到取词通知时候的回调函数 */
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if(request.action == "onmsg") {
		var word = get_word_by_mouse();
		if (word.text && word.text.length > 0) {
			if (word.text > 300) {
				if (word.pos == -1) {
					word.text = word.substring(0, 300);
				} else {
					var start = Math.max(0, word.pos - 150);
					var end = Math.min(word.text.length, word.pos + 150);
					if (start == 0) {
						end = start + 300;
					} else if (end == word.text.length) {
						start = end - 300;
					}
					word.pos = word.pos - start;
					word.text = word.substring(start, end);
				}
			}
			chrome.extension.sendRequest({action:"word", msg: word.text, offset: word.pos}, onText)  //返回后台，发送词语
		}
  }
});
function update_mouse_pos(event) {
  clientX = event.clientX, clientY = event.clientY;
}

/* 得到鼠标位置所指的词语 */
function get_word_by_mouse() {
	var ret = { text: "", pos: -1};
	if (clientY  == 0 || clientY == 0) {
		return ret;
	}
	var r = document.caretRangeFromPoint(clientX, clientY);
	if (!r) {
		return ret;
	}
	if (r.startContainer.data) {
		var rcText = null;
		if (r.startContainer.getBoundingClientRect) {
			rcText = r.startContainer.getBoundingClientRect();
		} else if (r.startContainer.parentElement && r.startContainer.parentElement.getBoundingClientRect) {
			rcText = r.startContainer.parentElement.getBoundingClientRect();
		}
		if (rcText == null || (rcText && rcText.left < clientX && clientX < rcText.right && rcText.top < clientY && clientY < rcText.bottom)) {
			ret.text = r.startContainer.data;
			ret.pos = r.startOffset;
			return ret;
		}
	}
	return ret;
}
;

function on_mouse_down(event) {
    mouse_down_x = event.clientX;
    mouse_down_y = event.clientY;
}

function on_mouse_up(event) {
    if ( Math.abs(event.clientX - mouse_down_x) > 2 || Math.abs(event.clientY - mouse_down_y) > 2)
    {
        var sText = document.selection == undefined ? document.getSelection().toString():document.selection.createRange().text;
        if (sText != "")
        {
            // todo: 字符串过长的问题.
            if (sText.length > 100)
                sText = sText.substr(0, 100);
            chrome.extension.sendRequest({action:"stroke", msg:sText}, onText);
            console.log(sText);
        }
    }
}

function on_mouse_dbclick(event) {
    var sText = document.selection == undefined ? document.getSelection().toString():document.selection.createRange().text;
    if (sText != "")
    {
        // todo: 字符串过长的问题.
        if (sText.length > 100)
            sText = sText.substr(0, 100);
        chrome.extension.sendRequest({action:"stroke", msg:sText}, onText);
        console.log(sText);
    }
}

/*设置全局变量*/
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');//canvas的2d上下文
var using = false; //全局变量
var lastDot = {"x":undefined, "y":undefined}//全局hash表
var usingEraser = false;
/****全局变量可以传进任何一个函数内部,且可以在任何地方对它赋值****/
/****设置在函数内部的变量只能在函数内使用***/

/***主要代码-默认使用画笔*****/
autoSetCanvasSize();

eraser.onclick = function(){
  usingEraser = true;
  tool.className = 'tool active';
}
brush.onclick = function(){
  usingEraser = false;
  tool.className = 'tool';
}

listenToMouse();

/*************自定义函数工具************/

/*画line*/
function drawLine(x1,y1,x2,y2){
  context.beginPath();
  context.strokeStyle = 'red';
  context.lineWidth = 4 ;
  context.moveTo(x1,y2); //起点
  context.lineTo(x2,y2); //终点
  context.stroke();
}
/*画圆闲置*/
function drawCircle(x,y,radius){
  context.beginPath();
  context.fillStyle = 'red';
  context.lineJoin = "round";
  context.arc(x, y, radius, 0, 2*Math.PI);
  context.fill();
}
/*JS设置画布宽高-全屏显示-需实参*/
function setCanvasSize(canvas){
 var pageWidth = document.documentElement.clientWidth; 
 var pageHeight =document.documentElement.clientHeight;
 canvas.width = pageWidth;
 canvas.height = pageHeight;
}
/*自动设置画布宽高-不需参*/
function autoSetCanvasSize(){
  setCanvasSize(canvas);
  window.onresize = function(){
    setCanvasSize(canvas);
  }
}
/*监听鼠标动作-不需参*/
function listenToMouse(){
  //1.0按下鼠标
  canvas.onmousedown = function(xxx){
   using = true;
   var x = xxx.clientX; //(clientX,clientY)是相对于视口的坐标
   var y = xxx.clientY;
   if(!usingEraser){
       lastDot = {"x":x,"y":y} //把鼠标按下的点存到全局变量里了,哪里都能用
   } else{
       context.clearRect(x-5,y-5,10,10);//橡皮的大小规模
   }
}
  //2.0移动鼠标
  canvas.onmousemove = function(xxx){
    var x = xxx.clientX;
    var y = xxx.clientY;
    if(using){
        if(!usingEraser){
            var newDot = {"x" : x ,"y": y }
            drawLine(lastDot.x,lastDot.y,newDot.x,newDot.y);
            lastDot = newDot;
        }else{
            context.clearRect(x-5,y-5,10,10);//橡皮的大小
            }
    }else{
        return
    }
}
  
//3.0松开鼠标
  canvas.onmouseup = function(){
    using = false;
  }
}




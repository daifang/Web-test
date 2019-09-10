        //绘制 灰色矩形
        function rec(ctx){
            var a = ctx.createImageData(799,411);
            for(var i = 0 ;i<a.data.length;i+=4){
                a.data[i] = 150;
                a.data[i+1] = 150;
                a.data[i+2] = 150;
                a.data[i+3] = 255;//不透明
            }
            ctx.putImageData(a,0,0);
        }
      
      //画⚪ 进行刮卡
        function move(ctx,event,fun){
            if(mouse){//控制刮卡效果
                //定位鼠标坐标
                var XY = fun.getBoundingClientRect();//这个方法 自己搜的
                var X = event.clientX - XY.left;
                var Y = event.clientY - XY.top;
                var XX = X*(fun.width/XY.width);
                var YY = Y*(fun.height/XY.height);
                ctx.beginPath();
                ctx.arc(XX,YY,30,0,2*Math.PI);
                ctx.globalCompositeOperation = 'destination-out';
                ctx.fill();
                ctx.closePath();
                judge(ctx);
                clear(judge(ctx),ctx);
                //显示 百分比 , 如果变化太快 有点难看 ，所以设置一个时间间隔
                setInterval((function(dc){
                    var p = dc.getElementById('p');
                    p.innerHTML ='当前: '+ judge(ctx).toFixed(2)*100+'%';
                    })(document),500);
            }
                //console.log(X,Y);
        }
        //判断 85% 阈值
        function judge(ctx){
            var j = 0;
            var a1 = ctx.getImageData(0,0,799,411).data;
                for(let i = 3 ; i < a1.length ; i += 4){
                    if(a1[i] == 0){
                        j++;//计算透明像素个数
                    }
                }
            var jud = j/(a1.length/4);//比例，因为 a1 是每四个元素 控制一个像素(r,g,b,a) ，所以要判断透明比例，要用透明
                                    //像素除以不透明像素，所以要除以一个4
            return jud;
        }
        //清除,遍历一遍，把所有像素的 A设为 0
        function clear(jud,ctx){
            var a = ctx.getImageData(0,0,799,411);
            if( jud>=0.85){ 
                for(let i = 0 ; i<a.data.length ; i+=4){
                    a.data[i+3] = 0;
                }
                ctx.putImageData(a,0,0);
            }
        }


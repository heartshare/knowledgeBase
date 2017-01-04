(function($){$.toJSON=function(o){if(typeof(JSON)=="object"&&JSON.stringify){return JSON.stringify(o)}var type=typeof(o);if(o===null){return"null"}if(type=="undefined"){return undefined}if(type=="number"||type=="boolean"){return o+""}if(type=="string"){return $.quoteString(o)}if(type=="object"){if(typeof o.toJSON=="function"){return $.toJSON(o.toJSON())}if(o.constructor===Date){var month=o.getUTCMonth()+1;if(month<10){month="0"+month}var day=o.getUTCDate();if(day<10){day="0"+day}var year=o.getUTCFullYear();var hours=o.getUTCHours();if(hours<10){hours="0"+hours}var minutes=o.getUTCMinutes();if(minutes<10){minutes="0"+minutes}var seconds=o.getUTCSeconds();if(seconds<10){seconds="0"+seconds}var milli=o.getUTCMilliseconds();if(milli<100){milli="0"+milli}if(milli<10){milli="0"+milli}return'"'+year+"-"+month+"-"+day+"T"+hours+":"+minutes+":"+seconds+"."+milli+'Z"'}if(o.constructor===Array){var ret=[];for(var i=0;i<o.length;i++){ret.push($.toJSON(o[i])||"null")}return"["+ret.join(",")+"]"}var pairs=[];for(var k in o){var name;var type=typeof k;if(type=="number"){name='"'+k+'"'}else{if(type=="string"){name=$.quoteString(k)}else{continue}}if(typeof o[k]=="function"){continue}var val=$.toJSON(o[k]);pairs.push(name+":"+val)}return"{"+pairs.join(", ")+"}"}};$.evalJSON=function(src){if(typeof(JSON)=="object"&&JSON.parse){return JSON.parse(src)}return eval("("+src+")")};$.secureEvalJSON=function(src){if(typeof(JSON)=="object"&&JSON.parse){return JSON.parse(src)}var filtered=src;filtered=filtered.replace(/\\["\\\/bfnrtu]/g,"@");filtered=filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]");filtered=filtered.replace(/(?:^|:|,)(?:\s*\[)+/g,"");if(/^[\],:{}\s]*$/.test(filtered)){return eval("("+src+")")}else{throw new SyntaxError("Error parsing JSON, source is not valid.")}};$.quoteString=function(string){if(string.match(_escapeable)){return'"'+string.replace(_escapeable,function(a){var c=_meta[a];if(typeof c==="string"){return c}c=a.charCodeAt();return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)})+'"'}return'"'+string+'"'};var _escapeable=/["\\\x00-\x1f\x7f-\x9f]/g;var _meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"}})(jQuery);(function(b){b.dimensions={version:"@VERSION"};b.each(["Height","Width"],function(d,c){b.fn["inner"+c]=function(){if(!this[0]){return}var f=c=="Height"?"Top":"Left",e=c=="Height"?"Bottom":"Right";return this.is(":visible")?this[0]["client"+c]:a(this,c.toLowerCase())+a(this,"padding"+f)+a(this,"padding"+e)};b.fn["outer"+c]=function(f){if(!this[0]){return}var h=c=="Height"?"Top":"Left",e=c=="Height"?"Bottom":"Right";f=b.extend({margin:false},f||{});var g=this.is(":visible")?this[0]["offset"+c]:a(this,c.toLowerCase())+a(this,"border"+h+"Width")+a(this,"border"+e+"Width")+a(this,"padding"+h)+a(this,"padding"+e);return g+(f.margin?(a(this,"margin"+h)+a(this,"margin"+e)):0)}});b.each(["Left","Top"],function(d,c){b.fn["scroll"+c]=function(e){if(!this[0]){return}return e!=undefined?this.each(function(){this==window||this==document?window.scrollTo(c=="Left"?e:b(window)["scrollLeft"](),c=="Top"?e:b(window)["scrollTop"]()):this["scroll"+c]=e}):this[0]==window||this[0]==document?self[(c=="Left"?"pageXOffset":"pageYOffset")]||b.boxModel&&document.documentElement["scroll"+c]||document.body["scroll"+c]:this[0]["scroll"+c]}});b.fn.extend({position:function(){var h=0,g=0,f=this[0],i,c,e,d;if(f){e=this.offsetParent();i=this.offset();c=e.offset();i.top-=a(f,"marginTop");i.left-=a(f,"marginLeft");c.top+=a(e,"borderTopWidth");c.left+=a(e,"borderLeftWidth");d={top:i.top-c.top,left:i.left-c.left}}return d},offsetParent:function(){var c=this[0].offsetParent;while(c&&(!/^body|html$/i.test(c.tagName)&&b.css(c,"position")=="static")){c=c.offsetParent}return b(c)}});function a(c,d){return parseInt(b.curCSS(c.jquery?c[0]:c,d,true))||0}})(jQuery);(function(a){a.fn.draggable=function(c){function b(f){a.data(f.data.target,"draggable").options.onStartDrag(f);return false}function d(j){var i=j.data;var h=i.startLeft+j.pageX-i.startX;var g=i.startTop+j.pageY-i.startY;if(j.data.parnet!=document.body){if(a.boxModel==true){h+=a(j.data.parent).scrollLeft();g+=a(j.data.parent).scrollTop()}}var f=a.data(j.data.target,"draggable").options;if(f.axis=="h"){a(i.target).css("left",h)}else{if(f.axis=="v"){a(i.target).css("top",g)}else{a(i.target).css({left:h,top:g})}}a.data(j.data.target,"draggable").options.onDrag(j);return false}function e(f){a(document).unbind(".draggable");a.data(f.data.target,"draggable").options.onStopDrag(f);return false}return this.each(function(){a(this).css("position","absolute");var g;var i=a.data(this,"draggable");if(i){i.handle.unbind(".draggable");g=a.extend(i.options,c)}else{g=a.extend({},a.fn.draggable.defaults,c||{})}if(g.disabled==true){a(this).css("cursor","default");return}var h=null;if(typeof g.handle=="undefined"||g.handle==null){h=a(this)}else{h=(typeof g.handle=="string"?a(g.handle,this):h)}a.data(this,"draggable",{options:g,handle:h});h.bind("mousedown.draggable",{target:this},j);h.bind("mousemove.draggable",{target:this},k);function j(n){if(f(n)==false){return}var l=a(n.data.target).position();var m={startLeft:l.left,startTop:l.top,startX:n.pageX,startY:n.pageY,target:n.data.target,parent:a(n.data.target).parent()[0]};a(document).bind("mousedown.draggable",m,b);a(document).bind("mousemove.draggable",m,d);a(document).bind("mouseup.draggable",m,e)}function k(l){if(f(l)){a(this).css("cursor","move")}else{a(this).css("cursor","default")}}function f(u){var v=a(h).offset();var q=a(h).outerWidth();var n=a(h).outerHeight();var p=u.pageY-v.top;var s=v.left+q-u.pageX;var m=v.top+n-u.pageY;var o=u.pageX-v.left;return Math.min(p,s,m,o)>g.edge}})};a.fn.draggable.defaults={handle:null,disabled:false,edge:0,axis:null,onStartDrag:function(){},onDrag:function(){},onStopDrag:function(){}}})(jQuery);(function(a){a.fn.resizable=function(c){function b(f){a.data(f.data.target,"resizable").options.onStartResize(f);return false}function d(m){var l=m.data;var g=a.data(l.target,"resizable").options;var k=l.target;if(l.dir.indexOf("e")!=-1){var h=l.startWidth+m.pageX-l.startX;if(a.boxModel==false){h+=l.deltaWidth}h=Math.min(Math.max(h,g.minWidth),g.maxWidth);a(k).css("width",h+"px")}if(l.dir.indexOf("s")!=-1){var f=l.startHeight+m.pageY-l.startY;if(a.boxModel==false){f+=l.deltaHeight}f=Math.min(Math.max(f,g.minHeight),g.maxHeight);a(k).css("height",f+"px")}if(l.dir.indexOf("w")!=-1){var h=l.startWidth-m.pageX+l.startX;if(a.boxModel==false){h+=l.deltaWidth}if(h>=g.minWidth&&h<=g.maxWidth){var j=l.startLeft+m.pageX-l.startX;a(k).css({left:j+"px",width:h+"px"})}}if(l.dir.indexOf("n")!=-1){var f=l.startHeight-m.pageY+l.startY;if(a.boxModel==false){f+=l.deltaHeight}if(f>=g.minHeight&&f<=g.maxHeight){var i=l.startTop+m.pageY-l.startY;a(k).css({top:i+"px",height:f+"px"})}}a.data(m.data.target,"resizable").options.onResize(m);return false}function e(f){a(document).unbind(".resizable");a.data(f.data.target,"resizable").options.onStopResize(f);return false}return this.each(function(){var g=null;var i=a.data(this,"resizable");if(i){a(this).unbind(".resizable");g=a.extend(i.options,c||{})}else{g=a.extend({},a.fn.resizable.defaults,c||{})}if(g.disabled==true){return}a.data(this,"resizable",{options:g});var k=this;a(this).bind("mousemove.resizable",l).bind("mousedown.resizable",j);function l(n){var m=f(n);if(m==""){a(k).css("cursor","default")}else{a(k).css("cursor",m+"-resize")}}function j(o){var m=f(o);if(m==""){return}var n={target:this,dir:m,startLeft:h("left"),startTop:h("top"),startX:o.pageX,startY:o.pageY,startWidth:a(k).width(),startHeight:a(k).height(),deltaWidth:a(k).outerWidth()-a(k).width(),deltaHeight:a(k).outerHeight()-a(k).height()};a(document).bind("mousedown.resizable",n,b);a(document).bind("mousemove.resizable",n,d);a(document).bind("mouseup.resizable",n,e)}function f(q){var n="";var r=a(k).offset();var o=a(k).outerWidth();var m=a(k).outerHeight();var p=g.edge;if(q.pageY>r.top&&q.pageY<r.top+p){n+="n"}else{if(q.pageY<r.top+m&&q.pageY>r.top+m-p){n+="s"}}if(q.pageX>r.left&&q.pageX<r.left+p){n+="w"}else{if(q.pageX<r.left+o&&q.pageX>r.left+o-p){n+="e"}}return n}function h(m){var n=parseInt(a(k).css(m));if(isNaN(n)){return 0}else{return n}}})};a.fn.resizable.defaults={disabled:false,minWidth:10,minHeight:10,maxWidth:10000,maxHeight:10000,edge:5,onStartResize:function(){},onResize:function(){},onStopResize:function(){}}})(jQuery);
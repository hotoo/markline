define("markline/0.5.3/markline",["jquery/2.1.1/jquery"],function(t,e,a){function r(t){return"[object String]"===Object.prototype.toString.call(t)}function n(t,e){this.element=t;var a=o(e);this.timeline=new c(this.element,a)}function s(t){if(!t)return new Date;var e=/^(\d{4})(?:[/-](\d{1,2})(?:[/-](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2}))?)?)?)?)?$/,a=t.match(e);if(a){var r=a[1],n=parseInt(a[2]||1,10)-1,s=a[3]||1,i=a[4]||0,l=a[5]||0,o=a[6]||0;return new Date(r,n,s,i,l,o)}}function i(t){var e=/^\d{4}$/,a=/^\d{4}[\/\-]\d{1,2}$/,r=s(t);return e.test(t)?r.setYear(r.getFullYear()+1):a.test(t)&&(11===r.getMonth()?(r.setYear(r.getFullYear()+1),r.setMonth(0)):r.setMonth(r.getMonth()+1)),r}function l(t,e){var a=/!\[([^\]]*)\]\(([^\)]+)\)/g,r=/\[([^\]]*)\]\(([^\)]+)\)/g,n=/(\*\*|__)(.*?)\1/g,s=/(\*|_)(.*?)\1/g,i=/(\~\~?)(.*?)\1/g,l=/(^|[^a-zA-Z0-9])@([^\s\t,\(\)\[\]\{\}]+)/g,o=/\{@mention\}/gi,c=/(?:^|[\s\t])\#([^\s\t]+)/g,p=t.replace(a,'<a href="$2" class="img" title="$1" target="_blank">$1</a>');return p=p.replace(r,'<a href="$2" target="_blank">$1</a>'),p=p.replace(n,"<strong>$2</strong>"),p=p.replace(s,"<em>$2</em>"),p=p.replace(i,"<del>$2</del>"),e.mention&&(p=p.replace(l,function(t,a,r){var n=e.mention||d;return a+'<a href="'+n.replace(o,r)+'" target="_blank">@'+r+"</a>"})),p=p.replace(c,function(t,a){var r,n=e.tags||e.tag||{};if(n.hasOwnProperty(a)){var s=(n[a]||"").split(/,[\s\t]+/),i=s[0],l=s[1];r=' style="color:'+i+";background-color:"+l+';"'}return'<span class="tags"'+r+">#"+a+"</span>"})}function o(t){function e(t){for(;d.body.hasOwnProperty(t);)t+=" ";y=l(t,d.meta),d.body[y]=[],b=!0}for(var a,n,o,c=t.split(/\r\n|\r|\n/),d={title:"",meta:{},body:{}},p=/^#\s+(.*)$/,u=/^[\-\*]\s+([^:]+):\s*(.*)$/,h=/^[\s\t]+[\-\*]\s+([^:]+):\s*(.*)$/,f=/^\-{2,}$/,m=/^##+\s+(.*)$/,v=/^[\*\-]\s+(([0-9\/\-]+)(?:~([0-9\/\-]*))?)\s+(.*)$/,g=/^\s+[\*\-]\s+(([0-9\/\-]+)(?:~([0-9\/\-]*))?)\s+(.*)$/,y="",b=!1,$=!1,j=0,_=c.length;_>j;j++){var w,k=c[j];if(w=k.match(p))d.title=l(w[1],d.meta);else if(!b&&(w=k.match(u))){var q=w[1],x=w[2];d.meta[q]=x,n=q,o=x,$=!0}else if(!b&&(w=k.match(h))){r(d.meta[n])&&(d.meta[n]={"default":o});var q=w[1],x=w[2];d.meta[n][q]=x,$=!0}else if(k.match(f))e("");else if(w=k.match(m)){var Y=w[1];e(Y)}else if(w=k.match(v)){d.body[y]||(d.body[y]=[]);var F=w[2],O=void 0===w[3]?F:w[3],M=w[4],D={date:w[1],"date-start":s(F),"date-end":i(O),name:l(M,d.meta),events:[]};d.body[y].push(D),a=D,b=!0}else if(w=k.match(g)){var P=w[1],S=w[2],T=void 0===w[3]?S:w[3],I=w[4];a.events.push({date:P,"date-start":s(S),"date-end":i(T),name:l(I,d.meta)}),b=!0}}return d}var c=t("markline/0.5.3/timeline"),d=(t("jquery/2.1.1/jquery"),"https://github.com/{@mention}");n.prototype.render=function(){this.timeline.render()},a.exports=n}),define("markline/0.5.3/timeline",["jquery/2.1.1/jquery"],function(t,e,a){function r(t,e){this._element=i(t),this.title=e.title||"",this.meta=e.meta||{},this.body=e.body||{}}function n(t){return parseInt(t/864e5*o/365.24,10)}function s(t){return"[object Function]"===Object.prototype.toString.call(t)}var i=t("jquery/2.1.1/jquery"),l=30,o=100;r.prototype._process=function(t,e){if(e)for(var a in t)if(t.hasOwnProperty(a)){var r=t[a];s(e["group:start"])&&e["group:start"].call(this,a,r);for(var n=0,i=r.length;i>n;n++){var l=r[n];if(s(e["line:start"])&&e["line:start"].call(this,l),l.events)for(var o=0,c=l.events.length;c>o;o++)s(e.event)&&e.event.call(this,l.events[o]);s(e["line:stop"])&&e["line:stop"].call(this,l)}s(e["group:stop"])&&e["group:stop"].call(this,a,r)}},r.prototype.render=function(){var t,e;this._process(this.body,{"line:start":function(a){var r=a["date-start"],n=a["date-end"];(!t||t>r)&&(t=r),(!e||n>e)&&(e=n)}});var a=t.getFullYear(),r=e.getFullYear()+2;t=new Date(a,0,1);for(var s=['<div class="dates">',"<ol>"],o=a,c=0;r>=o;o++,c++)s.push("<li><label>",o,"show"===this.meta.age?" ("+c+")":"","</label></li>");s.push("</ol>","</div>");var d=['<div class="events" id="events">'],p=0;this._process(this.body,{"group:start":function(t){d.push('<div class="groups">',"<label>",t,"</label>","<ol>")},"group:stop":function(){d.push("</ol>","</div>")},"line:start":function(e){var a=e["date-start"],r=e["date-end"],s=n(a-t)+l;p=a;var i=n(r-a);8>i&&(i=8),d.push('<li style="margin-left:',s,'px;">',"<div>",'<ol style="width:',i,'px;">')},"line:stop":function(t){d.push("</ol>","<time>",t.date,"</time>","<label>",t.name,"</label>","</div>","</li>")},event:function(t){var e=n(t["date-start"]-p),a=n(t["date-end"]-t["date-start"]);8>a&&(a=8,e-=4),d.push('<li style="left:',e,"px;width:",a,'px" title="',t.date," ",t.name,'"></li>')}});this._element.addClass("markline"),this._element.on("scroll",function(){var t=i(this),e=i("> header",this);e.css({left:t.scrollLeft(),bottom:-t.scrollTop()});var a=i(".dates",this);a.css({top:t.scrollTop()});var r=i(".groups > label",this);r.css({left:t.scrollLeft()-90})}),this._element.append(["<header>",this.title,"</header>"].join("")),this._element.append(s.join("")),this._element.append(d.join(""))},a.exports=r});
(function(){var a={};(function(){function b(a,c,d){var e=Object.create(a.prototype),f=/xyz/.test(function(){xyz})?/\bparent\b/:/.*/;d=d||{};for(var g in d){var h=d[g],i=e[g];typeof i=="function"&&typeof h=="function"&&f.test(h)?e[g]=function(a,b){return function(){var c=this.parent;this.parent=b;var d=a.apply(this,arguments);return this.parent=c,d}}(h,i):e[g]=h}e.typename=c;var j=function(){e.init&&e.init.apply(this,arguments)};return j.prototype=e,j.prototype.constructor=j,j.extend=function(a,c){return typeof a=="object"&&(c=a,a="anonymous"),b(j,a,c)},j}a.object=b(Object,"Object",{})})(),function(){var b=Array.prototype,c=Object.prototype,d=a.lib={};d.isFunction=function(a){return c.toString.call(a)=="[object Function]"},d.isArray=Array.isArray||function(a){return c.toString.call(a)=="[object Array]"},d.isString=function(a){return c.toString.call(a)=="[object String]"},d.isObject=function(a){return a===Object(a)},d.groupBy=function(a,b){var c={},e=d.isFunction(b)?b:function(a){return a[b]};for(var f=0;f<a.length;f++){var g=a[f],h=e(g,f);(c[h]||(c[h]=[])).push(g)}return c},d.toArray=function(a){return Array.prototype.slice.call(a)},d.without=function(a){var b=[];if(!a)return b;var c=-1,e=a.length,f=d.toArray(arguments).slice(1);while(++c<e)f.indexOf(a[c])===-1&&b.push(a[c]);return b},d.extend=function(a,b){for(var c in b)a[c]=b[c];return a},d.repeat=function(a,b){var c="";for(var d=0;d<b;d++)c+=a;return c},d.map=function(a,c){var d=[];if(a==null)return d;if(b.map&&a.map===b.map)return a.map(c);for(var e=0;e<a.length;e++)d[d.length]=c(value,e);return a.length===+a.length&&(d.length=a.length),d}}(),function(){var b=a.lib,c={abs:function(a){return Math.abs(a)},batch:function(a,b,c){var d=[],e=[];for(var f=0;f<a.length;f++)f%b===0&&e.length&&(d.push(e),e=[]),e.push(a[f]);if(e.length){if(c)for(var f=e.length;f<b;f++)e.push(c);d.push(e)}return d},capitalize:function(a){return a=a.toLowerCase(),a[0].toUpperCase()+a.slice(1)},center:function(a,c){c=c||80;if(a.length>=c)return a;var d=c-a.length,e=b.repeat(" ",d/2-d%2),f=b.repeat(" ",d/2);return e+a+f},"default":function(a,b){return a?a:b},dictsort:function(a,b,c){c=c||"key"},escape:function(a){return a.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},filesizeformat:function(a,b){},first:function(a){return a[0]},forceescape:function(a){},format:function(a){var c=b.toArray(arguments).slice(1)},groupby:function(a,c){return b.groupBy(a,c)},indent:function(a,b,c){b=b||4},join:function(a,b,c){b=b||""},last:function(a){},length:function(a){return a.length},list:function(a){},lower:function(a){},pprint:function(a){},random:function(a){},replace:function(a,b,c,d){},reverse:function(a){},round:function(a,b,c){c=c||"common"},safe:function(a){},slice:function(a,b,c){},sort:function(a,b,c,d){},string:function(a){return a.toString()},striptags:function(a){},sum:function(a,b,c){},title:function(a){return a.toUpperCase()},trim:function(a){},truncate:function(a,b,c,d){b=b||255,d=d||"..."},upper:function(a){return a.toUpperCase()},urlize:function(a,b,c){},wordcount:function(a){},wordwrap:function(a,b,c){b=b||79},xmlattr:function(a,b){},"float":function(a,b){},"int":function(a,b){}};c.d=c.default,c.e=c.escape,a.filters=c}(),function(){var b=a.object,c=b.extend({init:function(a){this.variables={},this.parent=a},addVariable:function(a,b){this.variables[a]=b},lookup:function(a){var b=this.parent;return this.variables[a]||b&&b.lookup(a)},push:function(){return new c(this)},pop:function(){return this.parent}});a.runtime={Frame:c}}(),function(){var b=a.lib,c=a.object,d=a.compiler,e=a.filters,f=a.loaders,g=a.runtime.Frame,h=c.extend({init:function(a){a?this.loaders=b.isArray(a)?a:[a]:f.FileSystemLoader?this.loaders=[new f.FileSystemLoader]:this.loaders=[new f.HttpLoader],this.filters=e,this.cache={}},addFilter:function(a,b){this.filters[a]=b},getFilter:function(a){return this.filters[a]},getTemplate:function(a,b){var c=null,d=this.cache[a],e;if(!d||!d.isUpToDate()){for(var f=0;f<this.loaders.length;f++)if(c=this.loaders[f].getSource(a))break;if(!c)throw new Error("template not found: "+a);this.cache[a]=new j(c.src,this,c.path,c.upToDate,b)}return this.cache[a]},registerPrecompiled:function(a){for(var b in a)this.cache[b]=new j({type:"code",obj:a[b]},this,b,function(){return!0},!0)},express:function(a){var c=this;a.render=function(d,e,f){var g={};b.isFunction(e)&&(f=e,e={}),g=b.extend(g,a.locals),e._locals&&(g=b.extend(g,e._locals)),g=b.extend(g,e);var h=c.getTemplate(d).render(e);f(null,h)}}}),i=c.extend({init:function(a,b){this.ctx=a,this.blocks={};for(var c in b)this.addBlock(c,b[c])},lookup:function(a){return this.ctx[a]},getVariables:function(){return this.ctx},addBlock:function(a,b){this.blocks[a]=this.blocks[a]||[],this.blocks[a].push(b)},getBlock:function(a){if(!this.blocks[a])throw new Error('unknown block "'+a+'"');return this.blocks[a][0]},getSuper:function(a,b,c){var d=(this.blocks[b]||[]).indexOf(c),e=this.blocks[b][d+1],f=this;return function(){if(d==-1||!e)throw new Error('no super block available for "'+b+'"');return e(a,f)}}}),j=c.extend({init:function(a,c,d,e,f){this.env=c||new h;if(b.isObject(a))switch(a.type){case"code":this.tmplProps=a.obj;break;case"string":this.tmplStr=a.obj}else{if(!b.isString(a))throw new Error("src must be a string or an object describing the source");this.tmplStr=a}this.path=d,this.upToDate=e||function(){return!1},f?this._compile():this.compiled=!1},render:function(a,b){this.compiled||this._compile();var c=new i(a||{},this.blocks);return this.rootRenderFunc(this.env,c,b||new g)},isUpToDate:function(){return this.upToDate()},_compile:function(){var a;if(this.tmplProps)a=this.tmplProps;else{var b=new Function(d.compile(this.tmplStr,this.env));a=b()}this.blocks=this._getBlocks(a),this.rootRenderFunc=a.root,this.compiled=!0},_getBlocks:function(a){var b={};for(var c in a)c.slice(0,2)=="b_"&&(b[c.slice(2)]=a[c]);return b}});a.environment={Environment:h,Template:j}}();var b=a.environment,c=a.compiler,d=a.parser,e=a.lexer,f=a.loaders;window.nunjucks={},window.nunjucks.Environment=b.Environment,window.nunjucks.Template=b.Template,window.nunjucks.loaders=f,window.nunjucks.compiler=c,window.nunjucks.parser=d,window.nunjucks.lexer=e,window.nunjucks.require=function(b){return a[b]}})();
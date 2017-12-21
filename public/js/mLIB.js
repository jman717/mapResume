
var _base_host = "http://localhost:3085";

function Class() { }
Class.prototype.construct = function() {};
Class.__asMethod__ = function(func, superClass) {    
    return function() {
        var currentSuperClass = this.$;
        this.$ = superClass;
        var ret = func.apply(this, arguments);        
        this.$ = currentSuperClass;
        return ret;
    };
};

Class.extend = function(def) {
    var classDef = function() {
        if (arguments[0] !== Class) {this.construct.apply(this, arguments); }
    };
    
    var proto = new this(Class);
    var superClass = this.prototype;
    
    for (var n in def) {
        var item = def[n];                        
        
        if (item instanceof Function) {
            item = Class.__asMethod__(item, superClass);
        }
        
        proto[n] = item;
    }

    proto.$ = superClass;
    classDef.prototype = proto;    
    classDef.extend = this.extend;        
    return classDef;
};

String.prototype.xmlValue=function(vNodeName){   
	if(Undef(vNodeName))return;
	try{
		var fretVal = '';
		var fsnode = '<' + vNodeName + '>';
		var fenode = '</' + vNodeName + '>';
		var fx = this.split(fsnode);
		if(fx.length > 1){
			var fv = fx[1].split(fenode);
			if(fv.length > 0){
				return fv[0];
			}
		}
		return fretVal;
	}catch(e){
		alert('error xmlValue(): '+e.message);
		return fretVal;
	}
}	

function Undef(o){
	return typeof(o)=='undefined'||o==''||o==null
};
var xmlhttp=false;
 try {
  xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
 } catch (e) {
  try {
   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  } catch (E) {
   xmlhttp = false;
  }
 }
function disableAnchor(obj, disable){
	try {
		if(disable){
			var href = obj.getAttribute("href");
			if(href && href != "" && href != null){
				 obj.setAttribute('href_bak', href);
			}
			obj.removeAttribute('href');
			obj.style.color="silver";
		}else{
			if(!Undef(obj.attributes['href_bak']))obj.setAttribute('href', obj.attributes['href_bak'].nodeValue);
			obj.style.color="blue";
		}
  }catch(e){
		alert('disableAnchor error: ' + e.message);
  }
}
function isTrue(o){
	return o.toLowerCase()=='yes'||o==1||o==true||o.toLowerCase()=='true'||o=='1'
}; 
if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
	try {
		xmlhttp = new XMLHttpRequest();
	} catch (e) {
		xmlhttp=false;
	}
}
if (!xmlhttp && window.createRequest) {
	try {
		xmlhttp = window.createRequest();
	} catch (e) {
		xmlhttp=false;
	}
}
function isObject(v_o){
	return typeof(v_o)=="object" || !Undef(v_o);
}
function getFullHttp(v_url){
	if(Undef(v_url))return '';
	v_url=unescape(v_url);
	var f_pos=v_url.indexOf('http');
	if(f_pos<0)return uBase+v_url;
	else return v_url;
}
function getObjectByName(v_arr,v_name,v_xLevel){   
	var f_retVal;
	if(!v_xLevel) v_xLevel = 0;
//alert(f_item+' level('+v_level+')=('+v_xLevel+') typeof('+typeof(v_arr)+')');
	if(typeof(v_arr) == 'object') { //Array/Hashes/Objects 
		for(var f_item in v_arr) {
//alert('getObjectByName item('+f_item+')');
			try{
				var f_value = v_arr[f_item];
//alert('f_value typeof('+typeof(f_value)+') f_value('+f_value+') name('+v_name+') level('+v_xLevel+') f_item('+f_item+')');				
				if(f_item==v_name){return f_value;}
				if(typeof(f_value) == 'object') { //If it is an array,
//alert(f_item+' level('+typeof(f_value)+') name('+v_name+')');
					f_count=v_xLevel+1;
					f_retVal=getObjectByName(f_value,v_name,f_count);
					if(f_retVal!=null){
						if(Undef(f_retVal.length)){return [f_retVal];}
						return f_retVal;
					}
				}
			}catch(e){
				alert('error getObjectByName: '+e.message);
			}
		}
	}
	return null;
}
function varDump(variable, maxDeep)
{
    var deep = 0;
    var maxDeep = maxDeep || 0;

    function fetch(object, parent)
    {
        var buffer = '';
        deep++;

        for (var i in object) {
            if (parent) {
                objectPath = parent + '.' + i;
            } else {
                objectPath = i;
            }

            buffer += objectPath + ' (' + typeof object[i] + ')';

            if (typeof object[i] == 'object') {
                buffer += "\n";
                if (deep < maxDeep) {
                    buffer += fetch(object[i], objectPath);
                }
            } else if (typeof object[i] == 'function') {
                buffer += "\n";
            } else if (typeof object[i] == 'string') {
                buffer += ': "' + object[i] + "\"\n";
            } else {
                buffer += ': ' + object[i] + "\n";
            }
        }

        deep--;
        return buffer;
    }

    if (typeof variable == 'object') {
        return fetch(variable);
    }

    return '(' + typeof variable + '): ' + variable + "\n";
}

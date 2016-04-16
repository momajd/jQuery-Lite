/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var DOMNodeCollection = __webpack_require__ (1);
	
	
	
	window.$l = function(arg){
	  if (typeof arg === 'function') {
	    this.onload = arg;
	  } else if(typeof arg === 'string'){
	    //this is for css selector
	    var matches = document.querySelectorAll(arg);
	    var arrMatch = [];
	    for(var i=0; i < matches.length;i++){
	      arrMatch[i] = matches[i];
	    }
	    return new DOMNodeCollection(arrMatch);
	  } else if (arg instanceof Object) {
	    // if (!(arg instanceof Array)) {
	    //   var arg = [arg];
	    // }
	    return new DOMNodeCollection([arg]);
	  }
	
	
	};
	
	
	window.$l.extend = function(){
	  var args = Array.prototype.slice.call(arguments);
	  return args.reduce(function(element,acc){ return Object.assign(element,acc); });
	};
	
	
	
	window.$l.ajax = function(options){
	  var defaults = {type: "GET",
	  url:undefined,
	  success: function(data){ console.log("success!");
	  console.log( data);
	  },
	  error: function(){console.log("not successful =(");}};
	
	  var final = window.$l.extend(defaults,options);
	
	  var xhr = new XMLHttpRequest;
	
	  xhr.open(final.type, final.url);
	  xhr.responseType = "json";
	  xhr.onload = function(){
	    console.log(xhr.status); // for status info
	    if(xhr.status === 200){
	      final.success( xhr.response);
	    }else{
	      final.error();
	    }
	    // console.log(xhr.responseType); //the type of data that was returned
	    // console.log(xhr.response);
	  };
	
	  xhr.send();
	
	
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	function DOMNodeCollection(arrHTMLelements){
	  this.arrHTMLelements = arrHTMLelements;
	
	
	
	}
	
	
	DOMNodeCollection.prototype.html = function(string){
	  if((typeof string) === "string"){
	    this.arrHTMLelements.forEach (function(el) {
	      el.innerHTML = string;
	    });
	    return this.arrHTMLelements;
	  } else {
	    return this.arrHTMLelements[0];
	  }
	};
	
	DOMNodeCollection.prototype.empty = function(){
	  return this.html("");
	};
	
	DOMNodeCollection.prototype.append = function(args){
	  var outerHtml;
	
	  if (typeof args === 'string') {
	    outerHtml = [args];
	  } else if (args instanceof DOMNodeCollection) {
	    outerHtml = args.arrHTMLelements.map (function (arg) {
	      return arg.outerHTML;
	    });
	  } else {
	    outerHtml = [args.outerHTML];
	  }
	
	 this.arrHTMLelements.forEach(function(inner){
	   outerHtml.forEach(function(outer){
	     inner.innerHTML += outer;
	   });
	 });
	 return this.arrHTMLelements;
	};
	
	DOMNodeCollection.prototype.attr = function(attrName, attrValue) {
	  if (arguments.length < 2) {
	    return this.arrHTMLelements[0].getAttribute(attrName);
	  } else {
	     this.arrHTMLelements.forEach(
	       function(a){
	         a.setAttribute(attrName,attrValue);
	       });
	    return this.arrHTMLelements;
	  }
	};
	
	DOMNodeCollection.prototype.addClass = function(className){
	  this.arrHTMLelements.forEach (function(object) {
	    object.classList.add(className);
	  });
	  return this.arrHTMLelements;
	};
	
	DOMNodeCollection.prototype.removeClass = function(className){
	  this.arrHTMLelements.forEach (function(object) {
	    object.classList.remove(className);
	  });
	  return this.arrHTMLelements;
	};
	
	DOMNodeCollection.prototype.children = function(){
	  return this.arrHTMLelements.map( function(parent){
	    return parent.children;
	  });
	};
	
	DOMNodeCollection.prototype.parent = function(){
	  var res=[];
	  this.arrHTMLelements.forEach( function(child){
	    var parent = child.parentNode;
	    if( !(res.indexOf(parent) > -1) ) {res.push(parent);}
	  });
	  return res;
	};
	
	
	DOMNodeCollection.prototype.find = function(selectors){
	  var res = [];
	  this.arrHTMLelements.forEach(function(nodeList){
	    var allfinds = nodeList.querySelectorAll(selectors);
	    for( var i = 0 ; i < allfinds.length ; i ++) {
	      res.push(allfinds[i]);
	    }
	  });
	  return res;
	};
	
	// (function () {
	//   $('li').on("click", function() {
	//     console.log("clicked");
	//     alert("you clicked a list");
	//   });
	// })();
	
	DOMNodeCollection.prototype.on = function (eventType, callback) {
	  this.arrHTMLelements.forEach(function (element) {
	    element.addEventListener(eventType, callback);
	  });
	};
	
	DOMNodeCollection.prototype.remove = function(){
	this.arrHTMLelements.forEach(function(el){el.remove();});
	};
	
	DOMNodeCollection.prototype.extend = function(){
	  
	
	};
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=jquery_lite.js.map
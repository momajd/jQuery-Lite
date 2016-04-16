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

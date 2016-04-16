var DOMNodeCollection = require ('./js/dom_node_collection');



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

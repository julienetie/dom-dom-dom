#Soucouyant v0.2

A small SVG DOM selector library, (can also be used for HTML). It's similar to jquery's Sizzle but organised and easier to use naively. Declare all selectors within the o0(); function first (all in one place at the top of your document), then use any defined selector as a property, either natively, with API (chaining), or within the API (to apply modifications to collections).

e.g.,

  o0(['customName', 'selectorType', 'selector'],[...],..);
  var someVar = o0.customName.set('fill','red');
___
##Organised selector config
####Get element by Id
    o0(['mainContent', 'id', 'main-content'],
    
####Get 1st element by tag
  ['rectangle', 'tag', 'rect'],
####Gets collection by tag
  ['divisions', 'tag', 'div', 'col'],
####Gets  element by tag of index 3
  ['fourthCirc', 'tag', 'circle', 'col', 3],
####Gets collection by tag, loops though all (with o0 only) 
  ['allPaths', 'tag', 'path', 'all'],
####Gets last element in collection by tag
  ['lastPolygon', 'tag', 'polygon', 'last'],

####Gets third from last element in collection by tag
  ['faultyLight', 'tag', 'ellipse', 'last', -2],
####tag & class are interchangeable
  ['myClass', 'class', 'thing2', 'col', 2]);
##Use selectors:
  o0.mainContent.style.fill = 'yellowgreen';
  o0.rectangle.set('stroke','blue');
  o0.divisions[0].innerHTML = 'This is a div';
  

####Use natively
  var navBar = o0.rectangle;
      navBar.style.fill = '#cc0000';
    
    const faultyLight = o0.faultyLight;
      faultyLight.set( 'stroke-dasharray', '30');

####Use within the API for loops, "sets all" [coming soon] paths in collection
  o0(o0.allPaths).set('d', 'M150 0 L75 200 L225 200 Z'); 
___
## set

Sets the elements attributes as an attribute/ value pair or as a series of 
attribute/ value pairs within an object.

  o0(element).set('fill','blue');
   
  o0(element).set({fill: 'blue', stroke: 'rgba(255,100,100,0.5)'});
___
## get

Gets the elements attribute/s via attribute or a series of attributes that returns an array, object or string. (Defaults to array)

  o0(element).get('fill'); 
####// blue
  

  o0(element).get('fill', 'stroke', 'width', []});
  
####// ['blue', 'rgba(255,100,100,0.5)', '200']

  o0(element).get('fill', 'stroke', 'width'}, {});
  
####// { fill: 'blue', stroke: 'rgba(255,100,100,0.5)', width: '200'}
  
  o0(element).get('fill', 'stroke', 'width'}, '');

####// "fill: 'blue', stroke: 'rgba(255,100,100,0.5)', width: '200'"

___
(MIT)
Copyright (c) 2015 Julien Etienne

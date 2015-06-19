

#Soucouyant

An SVG Geometry library 
(Alpha/ unstable)

IE9 +
Edge
Chrome
Firefox
Safari 6 +
Opera (blink)



## Goals & considerations

- Manipulate attributes of SVG shapes & elements
- Animations via CSS3
- Practical geometrical methods for drawing & animating
- Text auto-wrap polyfill & shim
- Animate via the Web Animations API - (not coming soon)
- Method chaining
- Component wireframing language
- Left click on a shape and download as an SVG file for editing in Inkscape or AI  
- Grid, guides and ruler
- wireframe mode, (ideal for prototyping)
- Design within the browser using control points, save to file, stored locally.
- Accessibility API

---
## Current API

### Soucouyant select  o0() 

A tiny efficient selector engine for SVG elements. (can be used for HTML)

    // Organised selector config
    o0(['mainContent', 'id', 'main-content'], // Gets element by Id
      ['rectangle', 'tag', 'rect'],      // Gets element by tag
      ['divisions', 'tag', 'div', 'col'],      // Gets collection by tag
      ['fourthCirc', 'tag', 'circle', 'col', 3],    // Gets  element by tag of index 3 
      ['allPaths', 'tag', 'path', 'all'],        // Gets collection by tag, loops though all (with API)
      ['lastPolygon', 'tag', 'polygon', 'last'],          // Gets last element in collection by tag
      ['faultyLight', 'tag', 'ellipse', 'last', -2],         // Gets third from last element in collection by tag 
      ['myClass', 'class', 'thing2', 'col', 2]); // tag & class are interchangeable

    // To use
    o0.mainContent.style.fill = 'yellowgreen';
    o0.rectangle.set('stroke','blue');
    o0.divisions[0].innerHTML = 'This is a div';
    o0(o0.allPaths).set('d', 'M150 0 L75 200 L225 200 Z'); // sets all paths in collection
    o0.faultyLight.set( 'stroke-dasharray', '30');

---
### .set()

Sets the elements attributes as an attribute/ value pair or as a series of 
attribute/ value pairs within an object.

    o0(element).set('fill','blue');
    
    o0(element).set({fill: 'blue', stroke: 'rgba(255,100,100,0.5)'});

---
### .get()

Gets the elements attribute/s via attribute or a series of attributes that returns an array, object or string. (Defaults to array)

    o0(element).get('fill'); // blue
    
    o0(element).get('fill', 'stroke', 'width', []});  //  ['blue', 'rgba(255,100,100,0.5)', '200']
    
    o0(element).get('fill', 'stroke', 'width'}, {});  //  { fill: 'blue', stroke: 'rgba(255,100,100,0.5)', width: '200'}
    
    o0(element).get('fill', 'stroke', 'width'}, '');  //  "fill: 'blue', stroke: 'rgba(255,100,100,0.5)', width: '200'"

---
### Method chaining
Reference DOM elements via the Soucouyant selector engine or directly

    o0(someElement).set('fill', 'url(#grad1)').set('cy', '70').get('cx');

---
### o0.loop()

Non-conflicting  **requestAnimationFrame** loops. An implementation based on [animation-frame](https://github.com/kof/animation-frame). 

    var loop = new o0.loop();
      loop.request(someAnimation);
      loop.cancel(someAnimation);


    

---

(MIT)
Julien Etienne © 2015

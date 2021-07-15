/**
 * webapp-menu 2.2.5 [https://github.com/angrycat9000/webapp-menu#readme]
 * 
 * The MIT License (MIT)
 *
 * Copyright (c) 2021 Mark Dane
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * 
 * ============================    Dependencies     ==============================
 * 
 * 
 * tiny-emitter 2.1.0 [https://github.com/scottcorgan/tiny-emitter#readme]
 * 
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 Scott Corgan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 *
 * ---------------------------------------------------------------------------
 */

 var itemStyle = `.item {
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  box-sizing: border-box;
  background: var(--menu-item-background, #fff);
  border: 0;
  padding: 11px 16px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 3rem;
  width: 100%;
  cursor: pointer;
}
.item::-moz-focus-inner {
  border: 0;
}
.item:focus {
  outline: var(--menu-focus-width, 4px) solid transparent;
  outline-offset: calc(-1 * var(--menu-focus-width, 4px));
  box-shadow: inset 0 0 0 var(--menu-focus-width, 4px) var(--menu-focus-color, #5B6FC8);
}
.item:hover {
  background: var(--menu-hover-background, rgba(64, 196, 255, 0.5));
}
.item:active {
  background: var(--menu-pressed-background, #40C4FF);
}

.icon {
  height: 1.5rem;
  width: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0.25rem;
}
.icon svg {
  fill: currentColor;
  width: 1.5rem;
  height: 1.5rem;
}

.label {
  text-align: left;
  display: flex;
  flex-grow: 1;
  flex-basis: 100%;
  padding: 0 0.25rem;
}

[aria-disabled=true] .label, [aria-disabled=true] .icon {
  opacity: 0.8;
  font-style: italic;
}

[data-icon=false] .icon {
  display: none;
}

[data-label=false] .label {
  display: none;
}

[data-round-top-right] {
  border-top-right-radius: var(--menu-border-radius, 0.125rem);
}

[data-round-top-left] {
  border-top-left-radius: var(--menu-border-radius, 0.125rem);
}

[data-round-bottom-left] {
  border-bottom-left-radius: var(--menu-border-radius, 0.125rem);
}

[data-round-bottom-right] {
  border-bottom-right-radius: var(--menu-border-radius, 0.125rem);
}`;

var style = `.menu {
  border-radius: var(--menu-border-radius, 0.125rem);
  border-radius: calc(var(--menu-border-radius, 0.125rem) + var(--menu-border-width, 1px));
  border: var(--menu-border-width, 1px) var(--menu-border-style, solid) var(--menu-border-color, #a0a0a0);
  background: var(--menu-background, #e9e9e9);
  box-shadow: var(--menu-shadow, none);
  padding: 0;
  margin: 0;
  position: relative;
  display: inline-block;
  pointer-events: auto;
}

.menu-inner {
  display: inline-block;
}

:host {
  border-radius: var(--menu-border-radius, 0.125rem);
  color: #202020;
  font-family: sans-serif;
  z-index: 1;
  pointer-events: none;
}

.menu.animation-show__second,
.menu.animation-hide__second {
  transition: opacity 0.4s, transform 0.4s;
}

.menu.animation-show__first,
.menu.animation-hide__second {
  transform: var(--menu-transition-transform, scale3d(0.8, 0.8, 1));
  opacity: var(--menu-transition-opacity, 0);
}

.menu.animation-show__second,
.menu.animation-hide__first {
  transform: scale3d(1, 1, 1);
  opacity: 1;
}`;

var style$1 = `.menu-toolbar.menu-outer {
  display: inline-block;
}

.menu-toolbar .menu-inner {
  display: flex;
  flex-direction: row;
}`;

var style$2 = `.menu-popup.menu-outer {
  display: inline-block;
}

.menu-inner {
  width: 100%;
}

:host {
  position: absolute;
}`;

var style$3 = `.menu-outer {
  overflow: hidden;
  display: block;
}

.menu-inner {
  width: 100%;
  display: inline-block;
  position: relative;
  overflow: visible;
}

.top-level-scroller {
  height: 100%;
}

:host {
  display: block;
  width: 18rem;
  max-height: 80vh;
}

.animation-stack__active {
  transition: transform 0.4s;
}

.animate-height {
  transition: height 0.4s;
}`;

var style$4 = `.submenu-outer {
  position: absolute;
  top: 0;
  width: 100%;
  transform: translateX(100%);
  box-sizing: border-box;
}

.submenu-inner {
  width: 100%;
  overflow-y: auto;
  padding-top: 3rem;
  box-sizing: border-box;
}

.back {
  position: fixed;
  top: 0;
  width: 100%;
}`;

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

var tinyEmitter = E;
var TinyEmitter = E;
tinyEmitter.TinyEmitter = TinyEmitter;

/**
*
*/
function addEventMember(object) {
  object.events = new tinyEmitter();
}

/**
*
*/
function addEventFunctions(proto) {
  proto.on = on;
  proto.off = off;
}

/**
*
*/
function on() {
  return this.events.on.apply(this.events, arguments);
}

/**
*
*/
function off() {
  return this.events.off.apply(this.events, arguments);
}

/**
 * @author Mark Dane
 */

/**
 * @typedef TransitionEvent
 * @property {Transition} animation transition that generated this event
 * @property {Boolean} isFastForward 
 * @property {function} cancel
 */
function transitionEvent(transition) {
    return  {
        transition, 
        isFastForward:false,
    };
}

/**
 * Aid in transitioning elements between states using CSS transitions.  
 * * Requests animations frames and handles subscriptions to transition events.
 * * Manages adding and removing CSS classes at different points in transition.
 * * Provides callbacks for attributes that can't set in stylesheets beforehand.
 */
class Transition {
    constructor(target, cssName) {
        this.target = target;
        this.cssName = cssName;
        this.startFunc = null;
        this.finishedFunc = null;
        addEventMember(this);
    
        /** 
         * Ignore any transitions that occur on children if true.  
         * @property {boolean} ignoreChildren 
         */
        this.ignoreChildren = true;
    }

    /**
     * Start the transition on the next animation frame
     */
    play() {
        this.frame = window.requestAnimationFrame(()=>this.firstFrame());
    }

    /**
     * Execute the all actions associated with the transition in the next animation frame  
     * Useful if you don't want an animation to appear, but still want all the side effects
     * of the event listeners to happen
     */
    fastForward() {
        this.frame = window.requestAnimationFrame(()=>this.immediate());
    }

    /**
     * Execute all the frame events immediately.  Does not wait for an animation frame.
     */
    immediate() {
        this.frame = 0;
        this._timeout = 0;
        const event = transitionEvent(this);
        event.isFastForward = true;

        this.events.emit('firstframe', event);
        this.events.emit('secondframe', event);
        this.events.emit('complete', event);
    }

    cleanup() {
        if(this.frame) {
            window.cancelAnimationFrame(this.frame);
            this.frame = 0;
        }
        if(this.timeout) {
          //window.cancelTimeout(this.timeout);
          window.clearTimeout(this.timeout);
          this.timeout = 0;
        }
        if(this.startFunc) {
            this.target.removeEventListener('transtionstart', this.startFunc);
            this.startFunc = null;
        }
        if(this.finishedFunc) {
            this.target.removeEventListener('transitionend', this.finishedFunc);
            this.target.removeEventListener('transitioncanceled', this.finishedFunc);
            this.finishedFunc = null;
        }
        this.target.classList.remove(this.getCSSClass('first'), this.getCSSClass('second'), this.getCSSClass('active'));
    }

    getCSSClass(state) {
        return `${this.cssName}__${state}`;
    }
    
    firstFrame() {
        this.frame = 0;
        this.transitionStarted = false;
        this.startFunc = (e)=>{
            if(e.target === this.target ||  ! this.ignoreChildren)
                this.transitionStarted = true;
        };
        this.target.addEventListener('transitionstart', this.startFunc);

        this.finishedFunc = this.complete.bind(this);
        this.target.addEventListener('transitionend', this.finishedFunc);
        this.target.addEventListener('transitioncanceled',this.finishedFunc);

        this.target.classList.add(this.getCSSClass('first'), this.getCSSClass('active'));
        this.events.emit('firstframe', transitionEvent(this));

        if( ! this.wasStopped)
            this.frame = window.requestAnimationFrame(()=>this.secondFrame());
    }

    secondFrame() {
        this.frame = 0;
        this.target.classList.remove(this.getCSSClass('first'));
        this.target.classList.add(this.getCSSClass('second'));
        this.events.emit('secondframe', transitionEvent(this));

        if( ! this.wasStopped)
            this.timeout = window.setTimeout(this.checkOnTransition.bind(this), 50);
    }

    /*  Check if the transition has really started after 50 ms.  If it hasn't started
        there was a problem with the setup and it will never start. */
    checkOnTransition() {
        this.timeout = 0;
        if( ! this.transitionStarted) {
            console.warn('Transition failed to start for: ', this.cssName, this.target);
            this.cleanup();
            this.events.emit('complete', transitionEvent(this));
        }
    }

    complete(e) {
        if(this.ignoreChildren && e.target !== this.target)
            return;
        
        this.cleanup();
        this.events.emit('complete', transitionEvent(this));
    }
}

addEventFunctions(Transition.prototype);

/**
 * First animation frame after .play() or .fastForward() was called.
 * @event Transition#firstframe
 * @type {TransitionEvent}
 */

/**
 * Second animation frame after .play().
 * @event Transition#secondframe
 * @type {TransitionEvent}
 */

/**
 * The stop() method was called to halt the transition.
 * @event Transition#stopped
 * @type {TransitionEvent}
 */

/**
 * After transition has finished.  Does not occur if stop() was called.
 * @event Transition#complete
 * @type {TransitionEvent}
 */


/**
 * 
 */
class Exit extends Transition {
    constructor(target) {
        super(target, 'exit');
        this.on('complete', this.removeOnComplete, this);
    }

    removeOnComplete(e) {
        if(this.target.parentElement)
            this.target.parentElement.removeChild(this.target);
    }
}

/**
 * 
 */
class Enter extends Transition {
    constructor(target, host, cssName='enter') {
        if( ! (host instanceof HTMLElement))
            throw new Error('Must provide an HTMLElement for the target to be added.');

        super(target, cssName);
        this.host = host;
        this.on('firstframe', this.addTarget, this);
    }

    addTarget() {
        this.host.appendChild(this.target);
    }
}

var Animation = {
    Transition,
    Enter,
    Exit
};

/**
 * @return {DOMRect}
 */
function getWindowBounds() {
  return {
    left: window.scrollX,
    right: window.innerWidth + window.scrollX,
    top: window.scrollY,
    bottom: window.innerHeight + window.scrollY,
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

function positionAtPointWithin(menu, x, y, containerElement, verticalMargin) {
  const position = positionPopup(menu.getBoundingClientRect(), containerElement.getBoundingClientRect(), x, y, verticalMargin, 'center');
  return apply(menu, position);
}

function positionAtPoint(menu, x, y, verticalMargin = 16) {
  const position = positionPopup(menu.getBoundingClientRect(), getWindowBounds(), x, y, verticalMargin, 'center');
  return apply(menu, position);
}

function positionForButton(menu, button, padding = 8) {
  const container = getWindowBounds();
  const buttonRect = button.getBoundingClientRect();
  const offset = buttonRect.height / 2 + padding;
  const y = buttonRect.top + buttonRect.height / 2 + window.scrollY;
  const x = buttonRect.left + window.scrollX;
  const menuRect = menu.getBoundingClientRect();

  const position = positionPopup(menuRect, container, x, y, offset, 'left');
  return apply(menu, position);
}

/**
 * @return {PositionValue}
 */
function positionPopup(menuRect, containerRect, x, y, verticalPadding, align = 'left') {
  const yAbove = y - verticalPadding;
  const yBelow = y + verticalPadding;

  const bounds = {
    min: {
      x: containerRect.left,
      y: containerRect.top
    },
    max: {
      x: containerRect.right,
      y: containerRect.bottom
    }
  };

  let margin = 8;
  bounds.min.x += margin;
  bounds.min.y += margin;
  bounds.max.x -= margin;
  bounds.max.y -= margin;

  let point = {
    x: ('center' == align) ? x - menuRect.width / 2 : x
  };


  if (point.x < bounds.min.x)
    point.x = bounds.min.x;
  if (point.x > bounds.max.x - menuRect.width)
    point.x = bounds.max.x - menuRect.width;

  let d2 = bounds.max.y - (yBelow + menuRect.height);
  let d1 = yAbove - (bounds.min.y + menuRect.height);

  if (d2 >= 0)
    point.y = yBelow;
  else if (d1 >= 0)
    point.y = yAbove - menuRect.height;
  else if (d1 > d2)
    point.y = bounds.min.y;
  else
    point.y = bounds.max.y - menuRect.height;

  return {
    top: Math.round(point.y),
    left: Math.round(point.x),
    position: 'absolute',
    transformOrigin: (point.y > y ? 'top ' : 'bottom ') + align
  };
}

/**
 * Apply this position to the menu element.
 * @param {HTMLElement} element
 * @param {PositionValue} posigtion
 */
function apply(element, position) {

  // Find the closest parent that has a positioning context and save its position because
  // the menu will be positioned inside of it.
  let offsetLeft = 0, offsetTop = 0;
  let parent = element.parentElement;
  while(parent) {
    const style = window.getComputedStyle(parent);
    if('absolute' === style.position || 'relative'  === style.position || 'fixed' === style.position) {
        const rect = parent.getBoundingClientRect();
        offsetLeft = rect.left;
        offsetTop = rect.top;
        break;
    }
    parent = parent.parentElement;
  }

  for (let prop of ['top', 'bottom', 'left', 'right']) {
    let value = position[prop];
    if ('undefined' === typeof value)
      value = '';
    else if ('number' === typeof value) {
      const offset = ('top' === prop || 'bottom' === prop)  ? offsetTop : offsetLeft;
      value = (value - offset) + 'px';
    }
    element.style[prop] = value;
  }

  element.style.position = ('undefined' === typeof position.position) ? '' : position.position;


  if(element.shadowRoot) {
    const menu = element.shadowRoot.querySelector('.menu');
    if(menu)
      menu.style.transformOrigin = position.transformOrigin || '';
  }

  return position;
}

const Position = {

  /** 
   * Shows the menu left aligned to element.  Displays above the element if there
   * is not enough room above.
   * @param {HTMLElement} button
   * @return {PositionFunction}
   */
  WithElement: function (button) {
    return (menu) => positionForButton(menu, button)
  },

  /** 
   * Absolutely position the element at the given X and Y values
   * @param {number} left
   * @param {number} top
   * @return {PositionFunction}
   */
  Absolute: function (left, top) {
    return (menu) => apply(menu, {
      position: 'absolute',
      left,
      top
    })
  },

  /** 
   * Clear the inline position styles on the element.
   * @property {PositionFunction} None 
   */
  None: (e) => apply(e, {}),

  /** 
   * Shows the menu centered above or below the point given by top and left.  
   * Contained within the window viewport
   * @param {number} left
   * @param {number} top
   * @return {PositionFunction}
   */
  AtPoint: function (left, top, verticalMargin = 16) {
    return (menu) => positionAtPoint(menu, left, top, verticalMargin)
  },

  /**
   * Show the menu centered above or below the point but contained
   * within the provided element
   * @param {number} left
   * @param {number} top
   * @param {HTMLElement} container
   * @return {PositionFunction}
   */
  AtPointWithin: function(left, top, container, verticalMargin = 16) {
    return (menu)=> positionAtPointWithin(menu, left, top, container, verticalMargin)
  }

};

function getTrueFalse(element, attributeName, defaultValue) {
    if( ! element.hasAttribute(attributeName))
        return defaultValue;

    const value = element.getAttribute(attributeName);
    if(value == 'false' || value == 'no')
        return false;
    if(value == 'true' || value == 'yes')
        return true;

    return defaultValue;
}

function setTrueFalse(element, attributeName, value) {
    const boolValue = ('yes' == value || 'true' == value) ? true : Boolean(value);
    element.setAttribute(attributeName, boolValue);
    return boolValue;
}

function getString(element, attributeName, defaultValue) {
    if( ! element.hasAttribute(attributeName))
        return defaultValue;
    return element.getAttribute(attributeName);
}

function setString(element, attributeName, value) {
    if(value)
        element.setAttribute(attributeName, value);
    else
        element.removeAttribute(attributeName);
    return value;
}

function getExists(element, attributeName) {
    return element.hasAttribute(attributeName);
}
function setExists(element, attributeName, value) {
    if(value)
        element.setAttribute(attributeName, '');
    else
        element.removeAttribute(attributeName);
}

var Attributes = {
    getString,
    setString,
    getTrueFalse,
    setTrueFalse,
    getExists,
    setExists
};

class ReusableStyleSheet {
    constructor(styleText) {
        this.text = styleText;
        this.sheet = null;
        this.template= null;
    }

    init(shadow) {
        if(shadow.adoptedStyleSheets) {
            try {
                this.sheet = new CSSStyleSheet();
                this.sheet.replaceSync(this.text);
            } catch (e) {
                this.sheet = null;
            }
        }

        if( ! this.sheet) {
            this.template = document.createElement('template');
            this.template.innerHTML = `<style>${this.text}</style>`;
        }
    }

    addToShadow(shadow) {
        if( ! this.sheet && ! this.element)
            this.init(shadow);

        if(this.sheet)
            shadow.adoptedStyleSheets = [...shadow.adoptedStyleSheets, this.sheet];
        else
            shadow.appendChild(this.template.content.cloneNode(true));
    }
}

/**
 * @callback iconFactoryFunction
 * @param {string} name
 * @return {HTMLElement}
 */

 /**
  * Occurs when an item in a toolbar is activated via a keypress or click.
  * @event wam-activate
  * @type {CustomEvent}
  * @property {Item} detail.item
  * @property {Menu} detail.menu
  * @property {Event} detail.source
  */

 /**
  * Item in a menu or toolbar.
  * @fires wam-activate
  */
class Item extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});
        Item.stylesheet.addToShadow(shadow);

        const button = Item.template.content.cloneNode(true);
        shadow.appendChild(button);

        /** @property {function} action */
        this.action = null;

        /** @property {object} data */
        this.data = null;
    }

    /**
     * Create an Item object from an object with a set of properties
     */
    static create(options) {
        const type = options.type || Item;
        const item = document.createElement(type.tagName);
        item.set(options);
        return item;
    }

    focus() {
        const button =  this.shadowRoot.querySelector('button');
        button.focus();
    }

    /**
     * @param {object} props
     * @param {string} [props.label]
     * @param {Node|string} [props.icon]
     * @param {boolean} [props.disabled]
     * @param {boolean} [props.showToolbarLabel]
     * @param {itemActivateFunction} [props.action]
     * @param {object} [props.data]
     * @param {string} [props.id]
     */
    set(props) {
        if( ! props)
            return;
 
        if('undefined' != props.label || 'undefined' != props.label2)
            this.setLabel(props.label, props.label2);
        
        if('undefined' != props.icon)
            this.setIcon(props.icon);

        for(let prop of ['disabled', 'showToolbarLabel', 'action', 'data', 'id']) {
            if('undefined' != typeof props[prop])
                this[prop] = props[prop];
        }
    }

    /**
     * @param {Node|string} label
     * @param {Node|string} [label2]
     */
    setLabel(label, label2) {
        this.clearSlot('label');

        if( ! label && ! label2)
            return;

        if( ! label2) {
            const l0 = stringToNode(label);
            l0.setAttribute('slot', 'label');
            this.appendChild(l0);
            return;
        }

        const l0 = document.createElement('div');
        l0.setAttribute('slot', 'label');
        l0.appendChild(stringToNode(label));
        l0.appendChild(stringToNode(label2));

        this.appendChild(l0);
    }

    /**
     * @param {Node|string} icon
     */
    setIcon(icon) {
        this.clearSlot('icon');
        if( ! icon)
            return;

        if(icon instanceof Node) {
            icon.setAttribute('slot', 'icon');
            this.appendChild(icon);
            return;
        }

        let iconElement;
        if(this.parentElement && this.parentElement.iconFactory) {
            iconElement = this.parentElement.iconFactory(icon);
        } else {
            iconElement = document.createElement('span');
        }

        iconElement.setAttribute('slot', 'icon');
        iconElement.setAttribute('data-icon-factory-arg', icon);
        this.appendChild(iconElement);
    }

    /** 
     * @property {string} showToolbarLabel
     * 
     */
    get showToolbarLabel() {return Attributes.getExists(this, 'showtoolbarlabel');}
    set showToolbarLabel(value) {return Attributes.setExists(this, 'showtoolbarlabel', value);}

    get hasIcon () {
        return null !==  this.querySelector('[slot=icon]');
    }

    /**
     * @typedef ItemAppearance
     * @property {boolean} hideIcon
     * @property {boolean} hideLabel
     * @property {boolean} roundTop
     * @property {boolean} roundBottom
     * @property {boolean} roundLeft
     * @property {boolean} roundRight
     */

    /**
     * Allow Menu containers to tweak the appearance of this item.  Unless you are implementing a
     * new Menu subclass, you probably should not call this.
     * @param {ItemAppearance} appearance
     */
    setAppearance(config){
        const button = this.shadowItem;
        Attributes.setTrueFalse(button, 'data-icon', ! config.hideIcon);
        Attributes.setTrueFalse(button, 'data-label', ! config.hideLabel);
        Attributes.setExists(button, 'data-round-top-right', config.roundTop || config.roundRight);
        Attributes.setExists(button, 'data-round-top-left', config.roundTop || config.roundLeft);
        Attributes.setExists(button, 'data-round-bottom-right', config.roundBottom || config.roundRight);
        Attributes.setExists(button, 'data-round-bottom-left', config.roundBottom || config.roundLeft);
        Attributes.setString(button, 'title', config.hideLabel ? this.label : '');
    }

    updateFactoryIcon() {
        const slotContents = this.querySelector('[slot=icon]');
        if(null === slotContents)
            return;

        const oldIcon = slotContents.getAttribute('data-icon-factory-arg');
        if( ! oldIcon)
            return;

        this.setIcon(oldIcon);   
    }

    connectedCallback() {
        this.updateFactoryIcon();
    }

    static get observedAttributes() 
    {
      return ['disabled', 'isdefaultfocus', 'label', "data"];
    }

    attributeChangedCallback(name, oldValue, newValue) 
    {
      const hasValue = newValue !== null;
      switch (name) 
      {
        case 'disabled':
          this.shadowRoot.querySelector('button').setAttribute('aria-disabled', hasValue);
          break;
        case 'isdefaultfocus':
          this.shadowRoot.querySelector('button').setAttribute('tabindex', null == newValue ? -1 : 0);
          break;
        case 'label': 
          const labelSlot = this.shadowRoot.querySelector('slot[name=label]');
          while(labelSlot.firstChild)
            labelSlot.removeChild(labelSlot.firstChild);
          labelSlot.appendChild(document.createTextNode(newValue));
          break;
        case "data":
          this.data = newValue;
          break;
      }
    }

    /** @property {boolean} disabled true if the item is disabled */
    get disabled() {return Attributes.getExists(this, 'disabled')}
    set disabled(value) {return Attributes.setExists(this ,'disabled', value)}

    /**
     * @property {boolean} isDefaultFocus True if the item is the one to recieve focus when the user
     *                                    tabs into the parent menu
     */
    get isDefaultFocus() {return '0' == this.shadowItem.getAttribute('tabindex')}
    set isDefaultFocus(value) {this.shadowItem.setAttribute('tabindex', value ? '0' : '-1');}


    /** 
     * @property {string} label Set the value of the label.  This is overridden if there is an element
     *                             with ```slot="label"``` provided as a child.
     */
    get label() {
        const labelElement = this.querySelector('[slot=label]');
        return labelElement ? labelElement.innerText : this.shadowRoot.querySelector('slot[name=label]').innerText
    }
    set label(value) {return Attributes.setString(this, 'label', value)}

    clearSlot(name) {
        const items = this.querySelectorAll(`[slot=${name}]`);
        for(let item of items)
            this.removeChild(item);
    }

    /**
     * @property  {HTMLElement} shadowItem The button in the ShadowDOM that represents this item.
     * @readonly
     */
    get shadowItem() {return this.shadowRoot.querySelector('button.item')}

    static fromEvent(event) {
        const path = event.composedPath();
        for(let element of path) {
            if(element instanceof Item)
                return element;
        }
        return null;
    }
}
Object.defineProperty(Item, 'tagName', {value:'wam-item'});
Object.defineProperty(Item, 'stylesheet', {value: new ReusableStyleSheet(itemStyle)});
var template = null;
Object.defineProperty(Item, 'template', {get:function(){
    if(template)
        return template;

    template = document.createElement('template');
    template.innerHTML = 
        `<button class="item" role="menuitem" tabindex="-1">
            <span class="icon" aria-hidden="true"><slot name="icon"></slot></span>
            <span class="label"><slot name="label">!? Missing Label !?</slot></span>
        </button>`;
    return template;
}});

/**
 * @param {Node|string} str
 * @return {Node}
 * @private
 */
function stringToNode(str, tag='span') {
    if(str instanceof Node) 
        return str;
        
    const span = document.createElement(tag);
    span.appendChild(document.createTextNode(str));
    return span;
}

let id = 0;
function nextId() {
    return `wam-id-${++id}`;
}

function convertToItem(obj) {
    return (obj instanceof Item) ? obj : Item.create(obj);
}

/**
 * Provide access to the children of the menu via JavaScript.
 */
class ItemCollection {
    constructor(owner, shadowContainer) {
        this.owner = owner;
    }

    /**
     * @param {number} index
     * @return {Item|null}
     */
    atIndex(i) {
        let j = 0;
        for(let e = this.owner.firstElementChild; null != e;  e = e.nextElementSibling) {
            if( ! (e instanceof Item))
                continue;

            if(j == i)
                return e;

            ++j;
        }
        return null;
    }

    /**
     * @param {Item} item
     * @return {number} Index of the item.  -1 if the item is not found
     */
    indexOf(item) {
        for(let i = 0, e = this.owner.firstElementChild; null != e; e = e.nextElementSibling, ++i) {
            if(e == item)
                return i;
        }
        return -1;
    }

    /**
     * @param {Item|object} newItem
     * @param {Item|number} exisiting
     */
    insertBefore(newItem, exisiting) {
        const nextItem = 'number' == typeof exisiting ?  this.atIndex(exisiting) : existing;
        const newNode = convertToItem(newItem);
        return this.owner.insertBefore(newNode, nextItem);
    }

    /**
     *  @param {Item|object} item 
     */
    append(item) {
        const rValue = this.owner.appendChild(convertToItem(item));
        return rValue;
    }

    /** 
     * @param {Item|number} item 
     */
    remove(item) {
        if('number' == typeof item)
            item = this.atIndex(item);

        if(item instanceof Item && item.parentElement == owner)
            this.owner.removeChild(item);
        
    }
    
    /** 
     * @property {number} 
     */
    get length() {
        let l = 0;
        for(let e of this.owner.children) {
            if(e instanceof Item)
                ++l;
        }
        return l;
    }

    /**
     * Remove all items
     */
    removeAll() {
        let node =this.owner.firstChild;
        while(node) {
            const next = node.nextSibling;
            if(node instanceof Item)
                this.owner.removeChild(node);
            node = next;
        }
    }

    /** 
     * Replace the existing items with the set provided.
     * @see Item.set
     * @param {Array<Item|object>} items
     */
    set(items) {
        items = items.map(convertToItem);
        this.removeAll();

        for(let i of items)
            this.owner.appendChild(i);
    }

    *[Symbol.iterator]() {
        for(let e of this.owner.children)
            if(e instanceof Item)
                yield e;
    }
}

class TabList {
    constructor(source) {
        this.array = source || [];
        if( ! Array.isArray(source))
            this.array = Array.from(source);
        
    }

    get length() {return this.array.length}

    get first() {return (0 == this.array.length) ? null : this.array[0];}

    get last() {return (0 == this.array.length) ? null : this.array[this.array.length-1];}

    get defaultFocusItem() {return this.array.find(item=>item.isDefaultFocus)}

    next(item) {
        const index = this.array.indexOf(item);
        if (index < 0)
            return this.first;
        const nextIndex = (index + 1) % this.array.length;
        return this.array[nextIndex];
    }

    previous(item) {
        const index = this.array.indexOf(item);
        if (index < 0)
            return this.last;
        const prevIndex = (index - 1 + this.array.length) % this.array.length;
        return this.array[prevIndex];
    }

    *[Symbol.iterator]() {
        for(let e of this.array)
            yield e;
    }
}

class CloseTriggerFlags {
    constructor(parent) {
        this._parent = parent;
        this._escape = this._pointerDownOutside = this._itemActivate = true;
    }

    /**
     * Menu will close if the user presses the Escape key
     * @property {boolean}
     */
    get escape() {return this._escape}
    set escape(value) {this._escape = value; this.updateAttribute();}

    /** 
     * Menu will close if the focus moves outside of the menu
     * @property {boolean}
     * @deprecated
     */
    get lostFocus() {return false}
    set lostFocus(value) {}

    /**
     * 
     */
    get pointerDownOutside() {return this._pointerDownOutside}
    set pointerDownOutside(value) {this._pointerDownOutside = value; this.updateAttribute();}

    /**
     * Menu will close when an item is activated.  
     * Does not include items that perform internal menu navigation such as 
     * opening a sub menu.
     * @property {boolean}
     */
    get itemActivate() {return this._itemActivate}
    set itemActivate(value) {this._itemActivate = value; this.updateAttribute();}

    /** 
     * Set the menu to close on any of the potential close events: escape, lost focus,
     * or activating an item.
     */
    all() {this._escape = this._pointerDownOutside = this._itemActivate = true;}

    /**
     * Ignore the potential close events.  A call to  #Menu.close must
     * be made to close the menu.
     */
    none() {this._escape = this._pointerDownOutside = this._itemActivate = false;}

    /**
     * Update the element attribute based on the internal values of this object.
     *  @private
     */
    updateAttribute() {
        const str = this.toString();
        this._parent.setAttribute('closeon', str);    
    }

    /**
     * Update the internal properties of this menu based on the element attribute value
     * @private
     */
    updateInternal() {
        this.fromString(this._parent.getAttribute('closeon'));
    }

    fromString(str) {
        if( ! str) {
            this._escape = true;
            this._pointerDownOutside = true;
            this._itemActivate = true;
        }

        const array = str.toLowerCase().split(',').map(s=>s.trim());
        if(0 == array.length || (1 == array.length && 'none' == array[0])) {
            this._escape = false;
            this._pointerDownOutside = false;
            this._itemActivate = false;
        } else if ( 1 == array.length && 'all' == array[0]) {
            this._escape = true;
            this._pointerDownOutside = true;
            this._itemActivate = true;
        } else {
            this._escape =  !! array.find(s=>s=='escape');
            this._pointerDownOutside = !! array.find(s=>s=='pointerdownoutside');
            this._itemActivate = !! array.find(s=>s=='itemactivate');
        }
    }

    toString() {
        const values = [];
        if(this.escape)
            values.push('escape');

        if(this.pointerDownOutside)
            values.push('pointerdownoutside');

        if(this.itemActivate)
           values.push('itemactivate');

        if(3 == values.length)
            return 'all';
        if(0 == values.length)
            return 'none';

        return values.join(',');
    }
}

/**
 * @enum Direction
 */
const Direction  = {
    TopToBottom: 'v',
    LeftToRight: 'h',
};

/**
 * Occurs when a menu element is opened.
 * @event wam-open
 * @type {CustomEvent}
 * @property {Menu} detail.menu
 */

/**
 * Occurs when a menu element is closed.
 * @event wam-close
 * @type {CustomEvent}
 * @property {Menu} detail.menu
 */

/**
 * Base class for list of items that are menus. Ie. that use arrow keys to move between a list of items.
 * @fires wam-open
 * @fires wam-close
 */
class Menu extends HTMLElement {

    constructor() 
    {
        super();

        const shadow = this.attachShadow({mode: 'open'});
        Menu.stylesheet.addToShadow(shadow);
        const outer = document.createElement('div');
        outer.style.display='none';
        outer.className = 'menu menu-outer';
        outer.setAttribute('role', 'menu');
        const inner = document.createElement('div');
        inner.className = 'menu-inner';
        const slot = document.createElement('slot');
        inner.appendChild(slot);
        outer.appendChild(inner);
        shadow.appendChild(outer);

        shadow.querySelector('slot').addEventListener('slotchange', this.updateAllItems.bind(this));

        /**
         * Caller editable list of items. 
         * 
         * Subclasses may add or filter items with the Menu#displayItems and Menu#interativeItems properies.
         * @see Menu#interactiveItems
         * @property {ItemCollection} items 
         */
        this.items = new ItemCollection(this);

        /**
         * @property {Direction}
         */
        this.direction = Direction.TopToBottom;

        /** 
         * Events that will cause the menu to close
         * @property {CloseTriggerFlags} closeOn
         */
        Object.defineProperty(this, 'closeOn', {value:new CloseTriggerFlags(this)});

        this.addEventListener('keydown', Menu.onKeyDown);
        this.addEventListener('keypress', Menu.onKeyPress);
        this.addEventListener('click', Menu.onClick);

        this._state = this._previousState = 'closed';
        this._windowResizeFunc = (e)=>{this.onWindowResize(e);};
        this._windowPointerFunc = (e)=>{this.onWindowPointerDown(e);};

        /** @property {PositionFunction} position */
        this._position = Position.None;

        this.onClickControlledByEventListeners = this.onClickControlledByEventListeners.bind(this);
    }

    /**
     * @param {class} type
     * @param {Array<Item>} items
     */
    static create(type, items) {
        if( ! type.tagName)
            throw new Error('Type to create must extend Menu and must have a tagName attribute');

        const menu = document.createElement(type.tagName);
        
        if(Array.isArray(items))
            menu.items.set(items);

        return menu;
    }

    /** 
     * Items that can be cycled through using the arrow keys.
     * 
     * Subclasses may use this to remove non-tabbable items (eg. seperators).  Typically
     * a subset of Menu#displayedItems
     * 
     * @see Menu#items
     * @see Menu#displayedItems
     * @property {TabList} interactiveItems
     */
    get interactiveItems() {return this.displayItems;}

    /**
     * Items that are visible to the user. 
     * 
     * Subclasses may use this to add items like seperators or default options.
     * 
     * @see Menu#items
     * @see Menu#displayedItems
     */
    get displayItems() {return new TabList(this.items);}

    /** @property {boolean} useAnimation */
    get useAnimation() {return Attributes.getTrueFalse(this, 'useanimation', true)}
    set useAnimation(value) {Attributes.setTrueFalse(this, 'useanimation', value);}

    /**
     * @property {boolean} isOpen
     */
    get isOpen() {return Attributes.getExists(this, 'open')};
    set isOpen(value) {Attributes.setExists(this, 'open', value);}
    
    /**
     * @property {HTMLElement} controlledBy Element that controls this this menu.
     */
    get controlledBy () {
        const id = this.getAttribute('controlledBy');
        if( ! id)
            return null;
        return this.getElementById(id);
    }
    set controlledBy(value) {
        if( ! value)
            Attributes.setString(this, 'controlledby', null);
        else {
            if( ! value.id)
                value.id = nextId();
            this.setAttribute('controlledBy', value.id);
        }
    }

    get position() {return this._position}
    set position(value) {
        this._position = value;
        if(this.isOpen)
            this.applyPosition();
    }

    /** @property {iconFactoryFunction} iconFactory */
    get iconFactory() {return this._iconFactory}
    set iconFactory(value) {
        this._iconFactory = value;
        for(let item of this.items)
            item.updateFactoryIcon();
    }

    static get observedAttributes() {
        return ['open', 'closeon', 'controlledby'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {

            case 'open':
                if(null != newValue && 'false' != newValue)
                    this.open();
                else
                    this.close();
                break;

            case 'controlledby':
                this.setControlledByElement(this.getElementById(newValue));
                break;

            case 'closeon':
                this.closeOn.updateInternal();    
        }
    }

    /**
     * @param {HTMLElement} element
     * @return {Menu} Get the Menu object that this element is contained in
     */
    static fromElement(element) {
        while(element &&  ! (element instanceof Menu)) {
            element = element.parentElement;
        }
        return element;
    }
    
    isFocusWithin() {
        let focused = document.activeElement;
        while(focused) {
            if(focused === this)
                return true;
            focused = focused.parentElement;
        }
        return false;  
    }

    onPointerDownOutside() {
        if(this.closeOn.pointerDownOutside && 'open' == this.state )
            this.close();
    }

    /**
     * If the menu is opened, closed, or in transition.  Public callers use isOpen
     * @property {string} state;
     * @private
     */
    get state() {return this._state;}
    set state(value) {
        this._state = value;
        
        this.isOpen = 'open' == value || 'opening' == value;
    }

    startTransition(transition) {
        window.requestAnimationFrame(()=>{
            if( ! this.useAnimation)
                transition.immediate();
            else
                transition.firstFrame();
        });
        return transition;
    }

    applyPosition() {
        if(this.position && 'function' == typeof this.position)
            this.position(this);
    }

    /**
     * @return {Transition} null if the menu is already open.  Otherwise a Transition.
     */
    open() {
        if('open' == this.state|| 'opening' == this.state)
            return null;

        const event = new CustomEvent('wam-menu-open', {
            bubbles:true,
            cancelable:false,
            detail: {
                menu: this,
            }
        });

        this.dispatchEvent(event);

        this.previousFocus = this.parentElement ? document.activeElement : null;
        this.state = 'opening';

        const menuElement = this.shadowRoot.querySelector('.menu');


        let anim = new Animation.Transition(menuElement, 'animation-show');
        anim.on('firstframe', (e)=>{
            menuElement.style.display = '';
            this.applyPosition();
            if(this.controlledBy)
                this.controlledBy.setAttribute('aria-expanded', this.isOpen);

            window.addEventListener('resize', this._windowResizeFunc);
            window.addEventListener('touchstart', this._windowPointerFunc);
            window.addEventListener('mousedown', this._windowPointerFunc);
        });
        anim.on('secondframe',()=>{
            this.setFocusOn(this.focusItem);
        });

        anim.on('complete',()=>{
            this.state = 'open';
        });

        return this.startTransition(anim);
    }

    /**
     * @return {Transition} Null if it is already closed
     */
    close() {
        if(this.state == 'closed' || this.state == 'closing')
            return null;
    
        const event = new CustomEvent('wam-menu-close', {
            bubbles:true,
            cancelable:false,
            detail: {
                menu: this,
            }
        });
        this.dispatchEvent(event);

        this.state = 'closing';

        let anim = new Animation.Transition(this.shadowRoot.querySelector('.menu'), 'animation-hide');
        anim.on('firstframe',(e)=>{
            window.removeEventListener('resize', this._windowResizeFunc);
            window.removeEventListener('touchstart', this._windowPointerFunc);
            window.removeEventListener('mousedown', this._windowPointerFunc);
        });

        anim.on('secondframe', ()=>{
            if(this.previousFocus && ( ! document.activeElement || document.activeElement === document.body || this.isFocusWithin()))
                this.previousFocus.focus();
            
            this.previousFocus = null;
            this.setFocusOn(null);
        });

        anim.on('complete', ()=>{
            if(this.state != 'closing')
                return;

            this.state = 'closed';
            this.shadowRoot.querySelector('.menu').style.display = 'none';
        });

        return this.startTransition(anim);
    }

    /**
     * @return {HTMLElement|null} focused item in this menu or null if the focus is outside of this parent
     */
    getFocused() {
        const focused = document.activeElement;
        const menu = Menu.fromElement(focused);
        if(menu != this)
            return null;
        
        return focused;
    }

    onWindowPointerDown(e) 
    {
      const fromElement = Menu.fromElement(e.target);
      if(this.closeOn.pointerDownOutside && this !== fromElement)
      {
        this.close();
      }
    }

    onWindowResize() {
        if(this.isOpen)
            this.applyPosition();
    }

    connectedCallback() {
        this._resizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this._resizeListener);

        const controlledBy = this.getAttribute('controlledBy');
        if(controlledBy)
            this.setControlledByElement(this.getElementById(controlledBy));
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this._resizeListener);
        this.releaseControlledByElement();
    }
    
    /**
     * @property {Item} focusItem 
     */
    set focusItem(item) {
        for(let element of this.interactiveItems) {
            element.isDefaultFocus = (item == element);
        }
    }
    get focusItem() {
        const items = this.interactiveItems;
        return items.defaultFocusItem || items.first;
    }

    /**
     * Set the focused element of the current list.  Modifies tab index of items so
     * only the focused element has tabindex=0.  Others have tabindex=-1
     * @param {HTMLElement} item
     */
    setFocusOn(item) {
        this.focusItem = item;
        if(item)
            item.focus();
    }

    static onClick(e) {
        let menu = Menu.fromElement(e.currentTarget);
        if(menu)
            menu.onClick(e);
    }

    onClick(e) {
        const item = Item.fromEvent(e);
        if(item)
            this.activate(item, e);
    }

    static onKeyPress(e) {
        e.currentTarget.onKeyPress(e);
    }

    onKeyPress(e) {
        const key = e.key.toLowerCase();
        const matching = this.interactiveItems.array.filter(i=>i.label[0].toLowerCase() == key);
        if(0 == matching.length)
            return;
        const tablist = new TabList(matching);
        const next = tablist.next(tablist.defaultFocusItem);
        this.setFocusOn(next);
    }

    static onKeyDown(e) {
        e.currentTarget.onKeyDown(e);
    }

    onKeyDown(e) {
        let item = this.getFocused();
        if( ! item)
            return;
    
        if('ArrowLeft' == e.key && Direction.LeftToRight == this.direction) {
            this.setFocusOn(this.interactiveItems.previous(item));
            e.preventDefault();
        } else if ('ArrowUp' == e.key && Direction.TopToBottom == this.direction) {
            this.setFocusOn(this.interactiveItems.previous(item));
            e.preventDefault();
         } else if('ArrowRight' == e.key && Direction.LeftToRight == this.direction) {
            this.setFocusOn(this.interactiveItems.next(item));
            e.preventDefault();
        } else if('ArrowDown' == e.key && Direction.TopToBottom == this.direction) {
            this.setFocusOn(this.interactiveItems.next(item));
            e.preventDefault();
        } else if('Escape' == e.key && this.closeOn.escape) {
            this.close();
        }
    }

    /**
     * @param {Item} item
     */
    activate(item, initiatingEvent) {
        if(item.disabled)
            return;

        const event = new CustomEvent('wam-item-activate', {
            bubbles:true,
            cancelable: true,
            detail: {
                item: item,
                menu: this,
                source:initiatingEvent
            }
        });

        if('function' == typeof item.action)
            item.action(event);

        const closeMenu = item.dispatchEvent(event);
        
        if(this.closeOn.itemActivate && closeMenu)
            this.close();    
    }

    releaseControlledByElement() {
        const handlers = this._controlledByEventListeners;
        if( ! handlers || ! handlers.target)
            return;

        const controlledBy = handlers.target;
        controlledBy.removeAttribute('aria-haspopup');
        controlledBy.removeAttribute('aria-expanded');
        controlledBy.removeAttribute('aria-controls');
        controlledBy.removeEventListener('click', handlers.onClick);
        controlledBy.removeEventListener('keydown', handlers.onKeyDown);

        handlers.target = null;
        this.position = Position.None;
    }

    onClickControlledByEventListeners(e)
    {
      this.isOpen = ! this.isOpen;
    }

    get controlledByEventListeners() {
        if( ! this._controlledByEventListeners) {
            this._controlledByEventListeners = {
                onClick: this.onClickControlledByEventListeners,
                onKeyDown: (e)=>{
                    if(this.isOpen )
                        return;

                    switch (e.key) {
                        case ' ':
                        case 'Enter':
                        case 'ArrowDown':
                            this.focusItem = this.interactiveItems.first;
                            this.open();
                            e.preventDefault();
                            break;

                        case 'ArrowUp': 
                            this.focusItem = this.interactiveItems.last;
                            this.open();
                            e.preventDefault();
                            break;
                    }
                }
            };
        }   
        return this._controlledByEventListeners;
    }

    setControlledByElement(element) {
        this.releaseControlledByElement();

        if( !element)
            return;

        if( ! this.id)
            this.id = nextId();

        const listeners = this.controlledByEventListeners;

        listeners.target = element;
        element.setAttribute('aria-haspopup', 'true');
        element.setAttribute('aria-expanded', this.isOpen);
        element.setAttribute('aria-controls', this.id);
        element.addEventListener('click', listeners.onClick);
        element.addEventListener('keydown', listeners.onKeyDown);

        this.position = Position.WithElement(element);
    }

    /**
     * @param {Item} item
     * @param {number} index
     * @param {Array<Items>} items
     */
    updateItem(item, index, items) {}

    updateAllItems() {
        const items = Array.from(this.items);
        items.forEach(this.updateItem, this);
    }

    getElementById(id) {
        let root = this.getRootNode();
        if(root.shadowRoot)
            root = root.shadowRoot;
        else
            root = window.document;
        return root.getElementById(id);
    }
}
/** 
 * Set this as a fallback for any newly created Menu objects to use as the icon factory
 */
Menu.defaultIconFactory = null;
Object.defineProperty(Menu, 'stylesheet', {value: new ReusableStyleSheet(style)});

class Toolbar extends Menu {
    constructor() {
        super();

        Toolbar.stylesheet.addToShadow(this.shadowRoot);
        this.shadowRoot.querySelector('.menu').classList.add('menu-toolbar');

        this.direction = Direction.LeftToRight;
    }

    static create(items) {
        return Menu.create(Toolbar, items);
    }

    updateItem(item, i , items) {
        item.setAppearance({
            hideIcon: false,
            hideLabel: ! item.hasAttribute('showtoolbarlabel'),
            roundLeft: 0 == i,
            roundRight: i == items.length - 1
        });
    }

}
Object.defineProperty(Toolbar, 'tagName', {value: 'wam-toolbar'});
Object.defineProperty(Toolbar, 'stylesheet', {value: new ReusableStyleSheet(style$1)});

class Popup extends Menu {
    constructor() {
        super();

        Popup.stylesheet.addToShadow(this.shadowRoot);
        this.shadowRoot.querySelector('.menu').classList.add('menu-popup');
    }

    static create(items) {
        return Menu.create(Popup, items)
    }

    updateItem(item, i , items) {
        item.setAppearance({
            hideIcon: ! this._hasIcons,
            hideLabel: false,
            roundTop: 0 == i,
            roundBottom: i == items.length - 1
        });
    }

    updateAllItems() {
        this._hasIcons = false;
        for(let item of this.items) {
            if(item.hasIcon) {
                this._hasIcons = true;
                break;
            }
        }
        super.updateAllItems();
    }
}
Object.defineProperty(Popup, 'tagName', {value: 'wam-popup'});
Object.defineProperty(Popup, 'stylesheet', {value: new ReusableStyleSheet(style$2)});

var backSvgIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\"/></svg>";
var nestedSvgIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>";

function svgIconFromString(text) {
    const div = document.createElement('div');
    div.innerHTML = text;
    div.firstElementChild.setAttribute('aria-hidden', 'true');
    return div.firstElementChild;
}

const Icon = {};
Object.defineProperty(Icon, 'Back', {get:()=>svgIconFromString(backSvgIcon)} );
Object.defineProperty(Icon, 'Nested', {get:()=>svgIconFromString(nestedSvgIcon)});

class NestedMenu extends Menu {
    constructor() {
        super();
        const shadow = this.shadowRoot;
        NestedMenu.stylesheet.addToShadow(shadow);

        const menuRoot = shadow.querySelector('.menu');
        menuRoot.classList.add('menu-nestedmenu');

        const scroller = document.createElement('div');
        scroller.className = 'top-level-scroller';
        menuRoot.appendChild(scroller);
        scroller.appendChild(shadow.querySelector('.menu-inner'));

        this.stack = [];
    }

    static create(items) {
        return Menu.create(NestedMenu, items);
    }

    get displayItems() {
        const source = this.topSubMenu ? [this.topSubMenu.backItem, ...this.topSubMenu.items] : this.items;
        return new TabList(source);
    }

    get topSubMenu() {
        if(0 == this.stack.length)
            return null;
        return this.stack[this.stack.length - 1];
    }

    get currentMenu() {
        if(0 == this.stack.length)
            return this;
        return this.stack[this.stack.length - 1];
    }

    activate(item, sourceEvent) {
        if(item.disabled)
            return;

        if(item instanceof SubMenuItem) {
            if(-1 != this.interactiveItems.array.indexOf(item)) // don't open if this this is a parent item
             this.openChild(item);
        } else if(this.topSubMenu && item == this.topSubMenu.backItem)
            this.closeChild(item, sourceEvent);
        else
            super.activate(item, sourceEvent);
    }

    onKeyDown(e) {
        super.onKeyDown(e);

        let item = this.getFocused();
        if( ! item)
            return;

        if('ArrowRight' == e.key && item instanceof SubMenuItem) {
            this.activate(item, e);
        } else if('ArrowLeft' == e.key && this.topSubMenu && item == this.topSubMenu.backItem) {
            this.activate(item, e);
        }
    }

    popAll() {
        const container = this.shadowRoot.querySelector('.menu-outer');
        container.style.height = this.autoResize ? '' : '100%';
        const slider = this.shadowRoot.querySelector('.menu-inner');
        slider.style.transform = `translate3d(0,0,0)`;

        while(this.stack.length) {
            const closed = this.stack.pop();
            closed.isOpen = false;
        }

        container.setAttribute('data-depth', this.stack.length);
    }

    open() {
        const anim = super.open();
        if( ! anim)
            return null;

        this.popAll();

        return anim;
    }

    /**
     * 
     */
    openChild(item, sourceEvent) {
        const event = new CustomEvent('wam-submenu-open', {
            bubbles:true,
            detail: {
                item: item,
                menu: this,
                source: sourceEvent
            }
        });

        if( ! item.dispatchEvent(event))
            return;

        this.stack.push(item);
        item.isOpen = true;
        return this.startTransition(this.stackChanged());
    }

    /**
     * @return {Transition}
     */
    closeChild(sourceEvent) {
        if(0 == this.stack.length)
            return;

        const target = this.topSubMenu;

        const event = new CustomEvent('wam-submenu-close', {
            bubbles:true,
            detail: {
                item: target,
                menu: this,
                source: sourceEvent
            }
        });

        if( ! target.dispatchEvent(event))
            return null;

        const closed = this.stack.pop();

        const anim = this.stackChanged(closed);

        return this.startTransition(anim);
    }

    getFocused() {
        let focused = super.getFocused();
        // if it is a submenu, check it has a focused item (ie. the back button)
        if(focused instanceof SubMenuItem 
            && focused.shadowRoot.activeElement 
            && focused.shadowRoot.activeElement instanceof Item)
            focused = focused.shadowRoot.activeElement;

        //make sure that focused isn't in a different submenu frame
        if(this.interactiveItems.array.indexOf(focused) < 0)
            return null;
        return focused;
    }

    getMenuContentElement(i) {
        if(0 == i)
            return this.shadowRoot.querySelector('.top-level-scroller');
        if(i > this.stack.length)
            return 0;
        
        const frame = this.stack[i-1];
        return frame.shadowRoot.querySelector('.submenu-inner');
    }

    /**
     * @param {function} beforeHeightResolved any code that needs to get run before
     *                                          after the animation, but before the final 
     *                                          height of the container is resolved
     */
    stackChanged(itemToClose) {
        const container = this.shadowRoot.querySelector('.menu-outer');
        const slider = this.shadowRoot.querySelector('.menu-inner');
        const scroller = this.getMenuContentElement(this.stack.length);
        const resize = this.autoResize;

        const tls = this.shadowRoot.querySelector('.top-level-scroller');
        const scrollTop =  -1 * tls.scrollTop || tls.style.top || '0';

        const anim = new Animation.Transition(slider, 'animation-stack');
        anim.ignoreChildren = false;
        anim.on('firstframe',()=>{
            // For sub menus, the top-level-scroller should be disabled
            // to prevent double scrollbars.  Keep the same visual
            // position by changing the relative position by the scrollTop
            if(this.stack.length) {
                tls.style.top = tls.scrollTop ? `-${tls.scrollTop}px` : '';
                tls.style.position = 'relative';
                tls.style.overflowY = 'visible';
            }

            // Set the height in frame one so it will never be unset
            // in frame two.  The animation only works going from one height
            // value to another.  Not from unset to a value
            if(resize)
                container.style.height = container.clientHeight;
        });
        anim.on('secondframe',()=>{
            const width = container.clientWidth;
            const offset = width * this.stack.length;

            if(resize) {
                const lastVisibleItem = this.currentMenu.displayItems.last;
                const desiredHeight = lastVisibleItem.offsetTop + lastVisibleItem.getBoundingClientRect().height;
                const maxHeight = window.innerHeight - this.getBoundingClientRect().top - 8;
                container.style.maxHeight = Math.ceil(maxHeight) + 'px';
                container.style.height = Math.ceil(desiredHeight) + 'px';
                if(this.useAnimation)
                    container.classList.add('animate-height');
            }
   
            slider.style.transform = `translate3d(${(-offset)}px,0,0)`;
        });
        anim.on('complete',()=>{            
            if(itemToClose)
                itemToClose.isOpen = false;  

            /* 
               Resizes the current list to be the same height as the container so it scrolls properly.
               This needs to be fired after the height transition for this.element has complete because
               it uses the final value of the height.  That value isn't available until after the
               transition has completed.  It might also have been capped by max-height
            */
            const resolvedHeight = container.clientHeight;
            if(resize) {
                container.classList.remove('animate-height');
                container.style.height = resolvedHeight + 'px';
            }
            scroller.style.height = resolvedHeight + 'px';

            // After the transition is complete, enable scrolling on the top level.
            // The previous scroll offset was stored as a relative top position.
            // Needs to be after to prevent scrollbars from showing during the transition
            if(0 == this.stack.length) {
                const top = tls.style.top ? tls.style.top.match(/\d+/)[0] : '0';
                tls.style.top = '';
                tls.style.position = '';
                tls.style.overflowY = 'auto';
                tls.scrollTop =  top;
            }

            // If we set focus before the transition is complete, the browser tries to move the focus
            // element into view immediatly which breaks the animation
            this.setFocusOn(itemToClose || this.focusItem);
        });

        return anim;
    }

    updateItem(item, i , items) {
        item.setAppearance({
            hideIcon: ! this._hasIcons,
            hideLabel: false,
            roundTop: 0 == i,
            roundBottom: i == items.length - 1
        });
    }

    updateItems() {
        this._hasIcons = false;
        for(item of this.items) {
            if(item.hasIcon) {
                this._hasIcons = true;
                break;
            }
        }
        super.setItemStyles();
    }

    /** @property {boolean} autoResize Will the menu grow bigger or smaller for sub menus*/
    get autoResize() {return Attributes.getTrueFalse(this, 'autoresize', true)}
    set autoResize(value) {Attributes.setTrueFalse(this, 'autoresize', value, true);}

    static get observedAttributes() {
        return Menu.observedAttributes.concat(['autoresize']);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if('autoresize' == name && 'false' == newValue) {
            const container = this.shadowRoot.querySelector('.menu-outer');
            if( ! container.style.height)
                container.style.height = '100%';
        }
    }
}
Object.defineProperty(NestedMenu, 'tagName', {value: 'wam-nestedmenu'});
Object.defineProperty(NestedMenu, 'stylesheet', {value: new ReusableStyleSheet(style$3)});

/**
 * Occurs when an submenu item is opened
 * @event wam-submenu-open
 * @type {CustomEvent}
 * @property {Item} detail.item
 * @property {Menu} detail.menu
 * @property {Event} detail.source
 */

/**
 * Occurs when an submenu item is closed
 * @event wam-submenu-close
 * @type {CustomEvent}
 * @property {Item} detail.item
 * @property {Menu} detail.menu
 * @property {Event} detail.source
 */

class SubMenuItem extends Item {
    constructor() {
        super();

        const shadow = this.shadowRoot;
        SubMenuItem.stylesheet.addToShadow(shadow);
        
        const outer = document.createElement('div');
        outer.className = 'submenu-outer';
        outer.style.display = 'none';
        outer.setAttribute('role', 'menu');
        outer.id = nextId();
        const inner = document.createElement('div');
        inner.className = 'submenu-inner';

        const back = Item.create({icon:Icon.Back, label:'Back'});
        back.shadowItem.setAttribute('aria-label', 'Back to previous level');
        back.classList.add('back');
        inner.appendChild(back);

        const slot = document.createElement('slot');
        //slot.addEventListener('slotchange', this.updateItems.bind(this));
        inner.appendChild(slot);
        outer.appendChild(inner);
        shadow.appendChild(outer);

        this.shadowItem.appendChild(Icon.Nested);
        this.shadowItem.setAttribute('aria-controls', outer.id);
        this.shadowItem.setAttribute('aria-expanded', false);
        
        /** */
        this.items = new ItemCollection(this, inner);
    }

    get shadowMenu() {return this.shadowRoot.querySelector('[role=menu]');}

    /** @property {Item} backItem Back button item from the shadow DOM */
    get backItem() {
        return this.shadowRoot.querySelector('wam-item');
    }

    get displayItems() {return new TabList([this.backItem].concat(Array.from(this.items)))}

    get topMenu() {
        let e = this.parentElement;
        while(e && ! (e instanceof NestedMenu))
            e = e.parentElement;

        return e;
    }

    /**
     * Determine if this is an action on the child items (instead of the open root item)
     * @param {Array<Node>} targetPath
     * @return {boolean}
     */
    isChildItem(targetPath) {
        if( ! targetPath)
            return false;

        for(let item of targetPath) {
            if(item == this)
                return false;
            if(item instanceof Item)
                return true;
        }
        return false;
    }

    get scrollTop() {return this.shadowRoot.querySelector('.submenu-inner').scrollTop;}
    set scrollTop(value) {this.shadowRoot.querySelector('.submenu-inner').scrollTop = value;}

    /** @property {boolean} isOpen */
    get isOpen() {return this.shadowMenu.style.display != 'none';}
    set isOpen(isOpen) {
        this.shadowItem.setAttribute('aria-expanded', isOpen);
        const submenu = this.shadowMenu;

        if( ! isOpen) {
            submenu.style.display = 'none';
            this.shadowRoot.querySelector('.submenu-inner').style.height  ='';
        } else {
            const top = this.topMenu.shadowRoot.querySelector('.top-level-scroller').scrollTop;
            submenu.style.display = '';
            submenu.style.top = top + 'px';
        }
    }
}
Object.defineProperty(SubMenuItem, 'tagName', {value:'wam-submenu'});
Object.defineProperty(SubMenuItem, 'stylesheet', {value: new ReusableStyleSheet(style$4)});

/*
    TreeList is deprecated used NestedMenu instead.  This is provided for 
    backwards compatibility with version 2.0

    Remove this class when bumping to version 3.0
*/
class TreeList extends NestedMenu {}
Object.defineProperty(TreeList, 'tagName', {value: 'wam-treelist'});

const menuExport = {Item, SubMenuItem, Popup, Toolbar, Position, Menu, Direction, NestedMenu, TreeList};

for(let e in menuExport) {
    const c = menuExport[e];
    if(c.tagName) {
        window.customElements.define(c.tagName, c);
        console.debug(`Registering <${c.tagName}>` );
    }
}

export default menuExport;

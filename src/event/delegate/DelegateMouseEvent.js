/**
 * @providesModule DelegateMouseEvent
 * @typechecks
 */

var BrowserEnv = require('BrowserEnv');
var DelegateUIEvent = require('DelegateUIEvent');

/**
 * @interface MouseEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var MouseEventInterface = {
  screenX: null,
  screenY: null,
  clientX: null,
  clientY: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  button: function(event) {
    // Webkit, Firefox, IE9+
    // which:  1 2 3
    // button: 0 1 2 (standard)
    var button = event.button;
    if ('which' in event) {
      return button;
    }
    // IE<9
    // which:  undefined
    // button: 0 0 0
    // button: 1 4 2 (onmouseup)
    return button === 2 ? 2 : button === 4 ? 1 : 0;
  },
  buttons: null,
  relatedTarget: function(event) {
    return event.relatedTarget || (
      event.fromElement === event.srcElement ?
        event.toElement :
        event.fromElement
    );
  },
  // "Proprietary" Interface.
  pageX: function(event) {
    return 'pageX' in event ?
      event.pageX :
      event.clientX + BrowserEnv.currentPageScrollLeft;
  },
  pageY: function(event) {
    return 'pageY' in event ?
      event.pageY :
      event.clientY + BrowserEnv.currentPageScrollTop;
  }
};

/**
 * @param {object} reactEventType See `EventPluginHub`.
 * @param {string} reactTargetID ID of the target component.
 * @param {object} nativeEvent Native browser event.
 * @extends {DelegateUIEvent}
 */
function DelegateMouseEvent(reactEventType, reactTargetID, nativeEvent) {
  DelegateUIEvent.call(this, reactEventType, reactTargetID, nativeEvent);
}

DelegateUIEvent.augmentClass(DelegateMouseEvent, MouseEventInterface);

module.exports = DelegateMouseEvent;

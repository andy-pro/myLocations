// not work in production! why?
let touchDetector1 = () => {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
};

// https://github.com/john-doherty/long-press
/*
let touchDetector2 = () =>
  'ontouchstart' in window ||
  navigator.MaxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;
*/

export default os => {
  const isTouch = touchDetector1();
  os.isTouchDevice = isTouch;
  os.touchEvents = {
    onMouseDown: isTouch ? 'onTouchStart' : 'onMouseDown',
    onMouseOut: isTouch ? 'onTouchCancel' : 'onMouseOut',
    onMouseUp: isTouch ? 'onTouchEnd' : 'onMouseUp',
  };
  // alert(JSON.stringify(os.touchEvents));
};

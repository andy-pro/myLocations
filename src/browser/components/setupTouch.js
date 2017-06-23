function touchDetector() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
}

export default os => {
  const isTouch = touchDetector();
  os.isTouchDevice = isTouch;
  os.touchEvents = {
    onMouseDown: isTouch ? 'onTouchStart' : 'onMouseDown',
    onMouseOut: isTouch ? 'onTouchCancel' : 'onMouseOut',
    onMouseUp: isTouch ? 'onTouchEnd' : 'onMouseUp',
  };
};

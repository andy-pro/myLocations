export default os => {
  os.subscribe = (type, handler) => {
    switch (type) {
      case 'hardwareBackPress':
        // document.onkeydown = e => {
        //   if (Number(e.keyCode) === 27 && handler) {
        //     return handler();
        //   }
        // };
        break;

      default:
        break;
    }
  };
};

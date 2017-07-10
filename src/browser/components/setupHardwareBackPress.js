/*
    document.onkeydown = e => {
      // console.log('e.keyCode', e.keyCode);

      // esc
      if (e.keyCode == 27 && this.props.command) { 
        this.props.resetMenu()
        return false;
      }

      // delete
      if (e.keyCode == 46 && this.props.entry) {
        let { entry } = this.props.entry
        deleteConfirm(entry.name, () => this.props.categoryAction(entry.id, 'remove'))
        return false;
      }
      
    }

*/

export default os => {
  os.subscribe = (type, handler) => {
    switch (type) {
      case 'hardwareBackPress':
        document.onkeydown = e => {
          if (Number(e.keyCode) === 27 && handler) {
            return !handler();
          }
        };
        break;

      default:
        break;
    }
  };
};

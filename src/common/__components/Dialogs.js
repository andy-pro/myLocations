import { Alert } from '../components';

/* =============  Dialog helpers  ================== */

export const deleteConfirm = (entry, cb) => {
  Alert.alert(
    `Delete entry "${entry}"`,
    'Are you shure?',
    [{ text: 'Cancel', style: 'cancel' }, { text: 'OK', onPress: cb }],
    { cancelable: false }
  );
};

export const deleteDamaged = info => {
  if (info instanceof Array) {
    info = info.join('\n');
  }
  Alert.alert('Warning! The following entries are corrupted and will be removed:', info);
};

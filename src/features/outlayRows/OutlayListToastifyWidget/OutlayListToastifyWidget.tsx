import { ToastContainer } from 'react-toastify';
import { Portal } from '~/ui/Portal';

import 'react-toastify/dist/ReactToastify.css';

export function OutlayListToastifyWidget() {
  return (
    <Portal>
      <ToastContainer theme={'dark'} position={'bottom-right'} />
    </Portal>
  );
}

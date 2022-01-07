import { ModalType } from '../../util/types';
import styles from './addDeviceComponent.module.css';

type Props = {
  toggleModal: (action: ModalType) => void
}

const AddDeviceComponent = ({ toggleModal }: Props) => {
  return (
    <button className={styles["button-styles"]} onClick={() => toggleModal("CREATE")}>Create device</button>
  )
}

export default AddDeviceComponent

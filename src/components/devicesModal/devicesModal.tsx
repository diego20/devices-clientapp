import { useState } from 'react';
import ReactDOM from 'react-dom';
import { ModalType, DataType, PossibleDeviceTypes } from '../../util/types';
import styles from './devicesModal.module.css';

const fieldTypes = {
  deviceName: "Device name",
  type: "Type",
  hddCapacity: "HDD Capacity (GB)"
}

const validateNumber = (value: string, fieldName: string) => {
  if (isNaN(Number(value))) throw new Error(`Value is not a valid number. Check field ${fieldName}`);
}

const validateNotNull = (value: string, fieldName: string) => {
  if (value === "") throw new Error(`There is no text in input. Check field: ${fieldName}`);
}

const root = document.getElementById("root")!;

type Props = {
  modalState: ModalType,
  cancelFormUpdate: () => void,
  selectedDevice: DataType,
  setUpdatedDevice: (device: DataType) => void
};

const DevicesModal = ({ modalState, cancelFormUpdate, selectedDevice, setUpdatedDevice }: Props) => {

  const [localForm, setLocalForm] = useState({ ...selectedDevice });

  /**
   * Sets data in the localForm object using the key passed in params
   * @param e HTML Event
   * @param key Key to update value in object
   */
  const setData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: keyof DataType) => {
    e.preventDefault();
    const value = e.target.value;
    setLocalForm({ ...localForm, ...{ [key]: value } })
  };

  /**
   * Validates relevant fields for non-null and valid numeric values.
   * If successful updated prop with valid object
   * @param e HTML Event
   */
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      validateNotNull(localForm.hdd_capacity, fieldTypes.hddCapacity);
      validateNumber(localForm.hdd_capacity, fieldTypes.hddCapacity);
      validateNotNull(localForm.system_name, fieldTypes.deviceName);
      setUpdatedDevice(localForm);
    }
    catch (e) {
      alert(e);
    }
  };

  return modalState !== "CLOSE" ? ReactDOM.createPortal((
    <div className={styles['modal-container']}>
      <div className={styles["modal-card"]}>
        <div className={styles["modal-title"]}>
          <h2>{(modalState === "CREATE" && "Create new device") || (modalState === "UPDATE" && "Update device")}</h2>
        </div>
        <form onSubmit={(e) => submitForm(e)}>
          <div className={styles["input-section"]}>
            <label className={styles["align-left"]}>{fieldTypes.deviceName}*</label>
            <input type="text" value={localForm.system_name} onChange={(e) => setData(e, "system_name")} />
            <label className={styles["align-left"]}>{fieldTypes.type}*</label>
            <select value={localForm.type} onChange={(e) => setData(e, "type")}>
              {Object.keys(PossibleDeviceTypes).map(type => (
                <option key={type} value={type}>
                  {PossibleDeviceTypes[type]}
                </option>
              ))}
            </select>
            <label className={styles["align-left"]}>{fieldTypes.hddCapacity}*</label>
            <input type="text" value={localForm.hdd_capacity} onChange={(e) => setData(e, "hdd_capacity")} />
          </div>
          <div className={styles["button-section"]}>
            <button type='submit' className={`${styles["btn"]} ${styles["btn-success"]}`}>
              {(modalState === "CREATE" && "Create") || (modalState === "UPDATE" && "Update")}
            </button>
            <button type='button' className={`${styles["btn"]} ${styles["btn-cancel"]}`} onClick={cancelFormUpdate}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ), root) :
    null
}

export default DevicesModal

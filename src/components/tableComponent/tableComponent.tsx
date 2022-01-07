import Edit from "../../assets/edit";
import Trash from "../../assets/trash";
import { DataType } from "../../util/types";
import styles from "./tableComponent.module.css";

type Props = {
  deviceList: DataType[],
  editDevice: (device: DataType) => void,
  removeDevice: (id: string) => void
}

const TableComponent = ({ deviceList, editDevice, removeDevice }: Props) => {
  return (
    <>
      <h2>Available devices</h2>
      <div className={styles["table-container"]}>
        <table>
          <thead className={styles["row-header-height"]}>
            <tr>
              <th className={styles["text-left"]}>
                System Name
              </th>
              <th className={styles["text-left"]}>
                Type
              </th>
              <th className={styles["text-left"]}>
                HDD Capacity (GB)
              </th>
            </tr>
          </thead>
          <tbody>
            {deviceList.map(device => (
              <tr key={device.id} className={styles["row-body-height"]}>
                <td>
                  <span>{device.system_name}</span>
                </td>
                <td>
                  <span>{device.type}</span>
                </td>
                <td>
                  <span>{device.hdd_capacity}</span>
                </td>
                <td>
                  <span onClick={() => editDevice(device)}>
                    <Edit styles={styles["edit-icon"]} />
                  </span>
                  <span onClick={() => removeDevice(device.id!)}>
                    <Trash styles={styles["trash-icon"]} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TableComponent;
// <a href="https://iconscout.com/icons/edit" target="_blank">Edit Icon</a> by <a href="https://iconscout.com/contributors/eva-icons" target="_blank">Akveo</a>
// <a href="https://iconscout.com/icons/trash" target="_blank">Trash Icon</a> by <a href="https://iconscout.com/contributors/unicons" target="_blank">Unicons Font</a>
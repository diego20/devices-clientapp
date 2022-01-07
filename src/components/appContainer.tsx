import FilterSortComponent from "./filterSortComponent/filterSortComponent";
import styles from './appContainer.module.css';
import TableComponent from "./tableComponent/tableComponent";
import { useCallback, useEffect, useState } from "react";
import AddDeviceComponent from "./addDeviceComponent/addDeviceComponent";
import DevicesModal from "./devicesModal/devicesModal";
import { ModalType, DataType, PossibleDeviceTypes, PossibleSortCriteria } from "../util/types";
import { Api } from "../api/api";

/**
 * Sorts an array according to data types
 * @param {string} sortCriteria Criteria to sort the array
 * @param {DataType[]} arrayToSort Array to sort
 * @returns Returns a new, sorted array
 */
const sortDataArray = (sortCriteria: string, arrayToSort: DataType[]) => {
  if (sortCriteria === PossibleSortCriteria.systemName.dataKey) {
    const dataKey = PossibleSortCriteria.systemName.dataKey as keyof Omit<DataType, "id">;
    arrayToSort.sort((a, b) => {
      if (a[dataKey].toLowerCase() > b[dataKey].toLowerCase()) {
        return 1;
      }
      if (b[dataKey].toLowerCase() > a[dataKey].toLowerCase()) {
        return -1;
      }
      return 0;
    });
  }
  else if (sortCriteria === PossibleSortCriteria.hddCapacity.dataKey) {
    const dataKey = PossibleSortCriteria.hddCapacity.dataKey as keyof DataType;
    arrayToSort.sort((a, b) => {
      if (Number(a[dataKey]) > Number(b[dataKey])) {
        return 1;
      }
      if (Number(b[dataKey]) > Number(a[dataKey])) {
        return -1;
      }
      return 0;
    });
  }
  return arrayToSort;
}

const initialSortCriteria = PossibleSortCriteria.systemName.dataKey;

type Props = {
  modalState: ModalType,
  setModalState: React.Dispatch<React.SetStateAction<ModalType>>
};

/**
 * Container of all device functionality
 * @param modalState State of the modal that creates/updates devices
 * @param setModalState Modifier of modal state
 * @returns Returns corresponding JSX
 */
const AppContainer = ({ modalState, setModalState }: Props) => {

  const [dataFetched, setDataFetched] = useState<DataType[]>([]);
  const [filteredAndSortedData, setFilteredAndSortedData] = useState<DataType[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedSortCriteria, setSelectedSortCriteria] = useState<string>(initialSortCriteria);

  /**
   * Gets updated BD data
   */
  const getApiData = async () => {
    try {
      const data = await Api.getDevices();
      setDataFetched(data);
    }
    catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    getApiData();
  }, []);

  /**
   * Updates selected filter
   * @param {string} userSelection Filter criteria inputted by user
   */
  const updateFilter = (userSelection: string) => {
    setSelectedFilter(userSelection);
  };

  /**
   * Updates selected sort criteria
   * @param {keyof DataType} sortCriteria Criteria to sort data
   */
  const updateSortingCriteria = (sortCriteria: string) => {
    setSelectedSortCriteria(sortCriteria);
  }

  /**
   * Sorts data when a new filter, sort criteria or data change happens 
   */
  const sortData = useCallback((filteredData) => {
    const sortedData = sortDataArray(selectedSortCriteria, filteredData);
    setFilteredAndSortedData([...sortedData]);
  }, [selectedSortCriteria]);

  /**
   * Filters data when a new filter, sort criteria or data change happens 
   */
  const filterData = useCallback(() => {
    const filteredData = selectedFilter === "" ? dataFetched : dataFetched.filter(element => element.type === selectedFilter);
    sortData(filteredData);
  }, [dataFetched, selectedFilter, sortData]);

  useEffect(() => {
    filterData()
  }, [filterData]);


  // --------------------------
  // Modal CRUD actions
  // --------------------------

  /**
   * Base skeleton for with DataType structure. Has to have a set type
   */
  const baseDeviceStructure: DataType = {
    hdd_capacity: "",
    system_name: "",
    type: "WINDOWS_WORKSTATION"
  };

  const [editingDevice, setEditingDevice] = useState<DataType>(baseDeviceStructure);

  /**
   * Toggles modal.
   * If not closed, closes it and resets baseDeviceStructire to have clean fields when editing another device
   * Else if has a modalType, set it.
   * @param {ModalType} modalType Modal state to be set
   */
  const toggleModal = (modalType?: ModalType) => {
    if (modalState !== "CLOSE") {
      setModalState("CLOSE");
      setEditingDevice(baseDeviceStructure)
    }
    else if (modalType) setModalState(modalType);
  };

  /**
   * Submits update or create action with updatedDevice.
   * Then, re-fetches to get updated DB data.
   * Finally, closes modal.
   * @param {DataType} updatedDevice Device with information to be stored
   */
  const submitDevice = async (updatedDevice: DataType) => {
    if (modalState === "UPDATE") {
      // Update
      try {
        await Api.updateDevice(updatedDevice);
        await getApiData();
      }
      catch (e) {
        alert(e);
      }
    } else if (modalState === "CREATE") {
      // New
      try {
        await Api.createDevice(updatedDevice);
        await getApiData();
      }
      catch (e) {
        alert(e);
      }
    }
    toggleModal();
  };

  /**
   * Removes device by id.
   * Then, re-fetches to get updated DB data.
   * @param {string} id Id to delete
   */
  const removeDevice = async (id: string) => {
    try {
      await Api.removeDevice(id);
      await getApiData();
    }
    catch (e) {
      alert(e);
    }
  };

  /**
   * Opens modal in editing mode.
   * Replaces baseDeviceStructure with device to edit
   * @param {DataType} device Device with info to edit
   */
  const openEditModal = (device: DataType) => {
    setEditingDevice(device);
    toggleModal("UPDATE");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles["options-bar"]}>
          <FilterSortComponent possibleDeviceTypes={PossibleDeviceTypes} PossibleSortCriteria={PossibleSortCriteria} selectedFilter={selectedFilter} setSelectedFilter={updateFilter} selectedSortCriteria={selectedSortCriteria} setSelectedSortCriteria={updateSortingCriteria} />
          <AddDeviceComponent toggleModal={toggleModal} />
        </div>
        <TableComponent deviceList={filteredAndSortedData} editDevice={openEditModal} removeDevice={removeDevice} />
      </div>
      {modalState !== "CLOSE" &&
        <DevicesModal modalState={modalState} cancelFormUpdate={toggleModal} selectedDevice={editingDevice} setUpdatedDevice={submitDevice} />
      }
    </>
  )
};

export default AppContainer;

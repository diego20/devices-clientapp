export type ModalType = "CREATE" | "UPDATE" | "CLOSE";

export type DataType = {
  id?: string,
  system_name: string,
  type: string,
  hdd_capacity: string
};

export type SortCriteria = {
  systemName: {
    labelName: string,
    dataKey: string
  },
  hddCapacity: {
    labelName: string,
    dataKey: string
  }
};

export type FilterSortCriteria = Record<string, string>;

export const PossibleDeviceTypes: FilterSortCriteria = {
  "WINDOWS_WORKSTATION": "Windows Workstation",
  "MAC": "Mac",
  "WINDOWS_SERVER": "Windows Server"
};

export const PossibleSortCriteria: SortCriteria = {
  systemName: {
    labelName: "System Name",
    dataKey: "system_name"
  },
  hddCapacity: {
    labelName: "HDD Capacity",
    dataKey: "hdd_capacity"
  }
};
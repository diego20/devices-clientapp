import { DataType } from "../util/types";

const root = "http://localhost:3000";

const getDevices = async (): Promise<DataType[]> => {
  try {
    const json = await fetch(`${root}/devices`);
    const data = json.json();
    return data;
  }
  catch (e: any) {
    throw new Error("Error fetching data. Check server");
  }
};

const createDevice = async (device: DataType): Promise<DataType[]> => {
  try {
    const json = await fetch(`${root}/devices`, {
      method: "POST", headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        system_name: device.system_name,
        type: device.type,
        hdd_capacity: device.hdd_capacity
      })
    });
    const data = json.json();
    return data;
  }
  catch (e: any) {
    throw new Error("Error creating device. Check errors");
  }
};

const updateDevice = async (device: DataType): Promise<DataType[]> => {
  try {
    const json = await fetch(`${root}/devices/${device.id}`, {
      method: "PUT", headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        system_name: device.system_name,
        type: device.type,
        hdd_capacity: device.hdd_capacity
      })
    });
    const data = json.json();
    return data;
  }
  catch (e: any) {
    throw new Error("Error creating device. Check errors");
  }
};

const removeDevice = async (id: string): Promise<DataType[]> => {
  try {
    const json = await fetch(`${root}/devices/${id}`, {
      method: "DELETE", headers: {
        "Content-type": "application/json"
      }
    });
    const data = json.json();
    return data;
  }
  catch (e: any) {
    throw new Error("Error creating device. Check errors");
  }
};

export const Api = { getDevices, createDevice, updateDevice, removeDevice };
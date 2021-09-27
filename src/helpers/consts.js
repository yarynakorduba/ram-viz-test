export const MEMORY_MODE = {
  READ: "1",
  WRITE: "0",
};

export const MEMORY_STATE = {
  ENABLED: "1",
  DISABLED: "0",
};

export const PINS = {
  RAS: "RAS",
  CAS: "CAS",
  CLOCK: "clock",
  DATA: "data",
  ADDRESS: "address",
  ENABLED: "enabled",
  READ_WRITE: "readWrite",
};

export const PIN_STATE = {
  ON: "1",
  OFF: "0",
};

export const VIEW_OPTIONS = [
  { value: "table", label: "Table View" },
  { value: "matrix", label: "Matrix View" },
];

// styling consts
export const PIN_HEIGHT = 20;
export const DEFAULT_PIN_WIDTH = 80;
export const PIN_LABEL_MARGIN = 3;
export const SIGNIFICANCE_TEXT_WIDTH = 25;

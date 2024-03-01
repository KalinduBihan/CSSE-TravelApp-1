const stops = [
  { key: "0", value: "Rathnapura" },
  { key: "1", value: "Kuruwita" },
  { key: "2", value: "Ehaliyagoda" },
  { key: "3", value: "Awissawella" },
  { key: "4", value: "Hanwella" },
  { key: "5", value: "Nawagamuwa" },
  { key: "6", value: "Kaduwela" },
];

const price = [
  { key: "0", value: 30 },
  { key: "1", value: 70 },
  { key: "2", value: 100 },
  { key: "3", value: 190 },
  { key: "4", value: 240 },
  { key: "5", value: 280 },
  { key: "6", value: 340 },
];

const priceAssign = (key) => {
  return price[key].value;
};

const cityAssign = (key) => {
  return stops[key].value;
};

const getRandomStopKey = () => {
  const randomIndex = Math.floor(Math.random() * stops.length);
  return stops[randomIndex].key;
};

export { priceAssign, cityAssign, getRandomStopKey };

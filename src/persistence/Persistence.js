function put(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

function get(key, defaultValue) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
}

export default {
  put,
  get
};

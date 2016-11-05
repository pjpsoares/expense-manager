var formatter = new Intl.NumberFormat(
  'pt-PT',
  {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }
);

function format(value) {
  return formatter.format(value);
}

export default {
  format
};

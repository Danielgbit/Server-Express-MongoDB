module.exports = {
    // Helper para generar un rango de números
    range: function (start, end) {
      const result = [];
      for (let i = start; i <= end; i++) {
        result.push(i);
      }
      return result;
    },
    // Helper para restar dos números
    subtract: function (a, b) {
      return a - b;
    },
    // Helper para sumar dos números
    add: function (a, b) {
      return a + b;
    },
    // Helper para comparar si un número es mayor que otro
    gt: function (a, b) {
      return a > b;
    },
    // Helper para comparar si un número es menor que otro
    lt: function (a, b) {
      return a < b;
    },
    // Helper para comparar si dos valores son iguales
    eq: function (a, b) {
      return a === b;
    },
    sumar: (a, b) => a + b,
    restar: (a, b) => a - b,
}

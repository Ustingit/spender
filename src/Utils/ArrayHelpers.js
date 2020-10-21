export let groupBy = function(arr, key) {
    return arr.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
};

export let getMaxByKey = function(arr, key) {
    return arr.sort((a,b) => b[key] - a[key])[0][key];
}
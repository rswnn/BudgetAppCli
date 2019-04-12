const fs = require('fs');

var ambilBudget = () => {
  try {
    var uangMasukString = fs.readFileSync('data-budget.json');
    return JSON.parse(uangMasukString);
  } catch (e) {
    return []
  }
}

var simpanBudget = (uangMasuk) => {
  fs.writeFileSync('data-budget.json', JSON.stringify(uangMasuk));
}

var pemasukan = (hasil, keterangan, jumlah) => {
  var uangMasuk = ambilBudget();
  var Masuk = function (hasil, keterangan, jumlah){
    this.hasil = hasil;
    this.keterangan = keterangan;
    this.jumlah = jumlah
  }
  var Keluar = function (hasil, keterangan, jumlah){
    this.hasil = hasil;
    this.keterangan = keterangan;
    this.jumlah = jumlah
  }

  var keteranganSama = uangMasuk.filter((e) => e.keterangan === keterangan);
  var uang;
  if (keteranganSama.length === 0) {
    if (hasil === 'masuk'){
      uang = new Masuk(hasil, keterangan, jumlah);
    } else if (hasil === 'keluar') {
      uang = new Keluar(hasil, keterangan, jumlah)
    }
    uangMasuk.push(uang)
    simpanBudget(uangMasuk);
    return uang;
  }
};

var hapus = (keterangan) => {
  var budget = ambilBudget();
  var hapusBudget = budget.filter((e) => e.keterangan !== keterangan);
  simpanBudget(hapusBudget);
  return budget.length !== hapusBudget.length;
}

var daftar = () => {
  return ambilBudget();
}
var logBudget = (budget) => {
  console.log('------------');
  console.log(budget.hasil);
  console.log(budget.keterangan);
  console.log(budget.jumlah);
}

module.exports = {
  pemasukan,
  hapus,
  daftar,
  logBudget,
}

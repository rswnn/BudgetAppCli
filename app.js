
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const budget = require('./budget.js');

const argv = yargs.argv;

var command = argv._[0];

if (command === 'budget') {
  var budgets = budget.pemasukan(argv.hasil, argv.keterangan, argv.jumlah) ;
  if (budgets) {
    console.log('budget baru');
    console.log('------------');
    console.log(budgets.keterangan);
    console.log(budgets.jumlah);
  } else {
    console.log('budget sudah diinput atau cek daftar input');
  }
} else if (command === 'hapus') {
  var cek = budget.hapus(argv.keterangan);
  var message = cek ? 'keterangan budget dihapus' : 'keterangan budget tidak ada';
  console.log(message);
} else if (command === 'daftar') {
  var semuaDaftar = budget.daftar();
  semuaDaftar.forEach((el) => budget.logBudget(el));
} else if (command === 'total') {
  var cari = budget.daftar();
  var masuk = cari.filter((el) => {
    return el.hasil === 'masuk';
  })
  var inc = masuk.reduce((total, amount) => total + amount.jumlah, 0);
  var keluar = cari.filter((el) => el.hasil === 'keluar');
  var exp = keluar.reduce((total, amount) => total + amount.jumlah, 0);

  console.log(`\nTotal uang Masuk : ${inc}\nTotal Uang Keluar : ${exp}\nBudget Anda : ${inc > exp  ? 'Jangan lupa untuk ditabungkan' : 'Jangan boros boros ya !!!'}`);
} else {
  console.log('tidak sesuai dengan keyword !!!!');
}

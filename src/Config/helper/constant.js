let saldo_normal_akutansi = [
    'Debit','Kredit'
]
let kelompok_akutansi = [
    'Asset','Kewajiban',
    'Modal','Pendapatan',
    'Beban'
]
let tipe_akutansi = [
    'Aktiva Lancar','Aktiva Tetap',
    'Aktiva Tidak Berwujud','Kewajiban',
    'Ekuitas','Pendapatan','Beban'
]
const ConvertToRp = (val) => {
    if (val == 0) {
        return 'Rp. ' + val.toString().replace(".", ",")
    }
    if (val) {
        const num = parseInt(val).toFixed(0)
        const rp = new Intl.NumberFormat('id-ID', {
        }).format(num)

        return 'Rp. ' + rp.toString()
    }
    return
}
export {
    ConvertToRp,
    saldo_normal_akutansi,
    kelompok_akutansi,
    tipe_akutansi
}
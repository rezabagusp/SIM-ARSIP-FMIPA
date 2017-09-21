var sequelize = require('../connection')
var Surat = sequelize.import(__dirname + '/../models/surat.model')
var moment = require('moment')
var Client = require('node-rest-client').Client
var client = new Client()

class NilaiMutu {
	contructor() {

	}
	GetNilaiMutu(data, res) {
		console.log('masuk')
		Surat
			.findOne({
				where: {
					id: data.params.id,
					asal_surat: 'Internal',
					tipe_surat: 'Masuk'
				},
				attributes: ['tanggal_terima_surat', 'tanggal_selesai_surat']
			})
			.then((surat) => {
				surat = JSON.parse(JSON.stringify(surat))
				client.get("https://www.googleapis.com/calendar/v3/calendars/en.indonesian%23holiday%40group.v.calendar.google.com/events?orderBy=startTime&singleEvents=true&timeMax="+ surat.tanggal_selesai_surat +"&timeMin="+ surat.tanggal_terima_surat +"&timeZone=Asia%2FJakarta&fields=items(start%2Fdate%2Csummary)&key=AIzaSyBSxWLe3wwZCpwLxjyu_k3psgoET-xFY8E", (Holiday, res) => {
					let min = 0
					for(let i=0; i < Holiday.items.length; i++) {
						if(new Date(Holiday.items[i].start.date).getDay() > 0 && new Date(Holiday.items[i].start.date).getDay() < 6) {
							min++
						}
					}
					let total = new Date(moment(surat.tanggal_selesai_surat).format('YYY-MM-DD')) - new Date(moment(surat.tanggal_terima_surat).format('YYY-MM-DD'))
					total /= (24*60*60*1000)
					total -= Math.floor(total/7)*2 + min
				})
			})
	}
}

module.exports = new NilaiMutu
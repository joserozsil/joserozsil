axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

var app = new Vue({
    el: '#index',
    http: {
        emulateJSON: true,
        emulateHTTP: true
    },
    mounted() {
        this.saveView()
        console.log(new Date().getTime())
    },
    data: {
        database: firebase.database()
    },
    methods: {
        saveView() {
            firebase.database().ref('/statistics/').once('value')
                .then((snapshot) => {
                    let value = null
                    let response = snapshot.val()
                    value = parseInt(response.views)
                    firebase.database().ref('statistics/').update({
                        views: value + 1
                    })
                })
        },
        downloadCv() {
            firebase.database().ref('/statistics/').once('value')
                .then((snapshot) => {
                    let value = null
                    let response = snapshot.val()
                    value = parseInt(response.downloads)
                    firebase.database().ref('statistics/').update({
                        downloads: value + 1
                    })
                })
        }
    }
})
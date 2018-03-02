axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';


var app = new Vue({
    el: '#index',
    http: {
        emulateJSON: true,
        emulateHTTP: true
    },
    mounted() {


        this.saveView()
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
            firebase.database().ref('/statistics/').once('value')
                .then((snapshot) => {
                    let data = []
                    axios.get('http://api.wipmania.com/json')
                        .then((response) => {
                            console.log(response.data);
                            data = response.data;

                        })
                        .catch(function(error) {
                            console.log(error);
                        });

                    let object = {
                        "country": data.address.country,
                        "lat": data.latitude,
                        "long": data.longitude
                    };
                    firebase.database().ref('statistics/country').push(object)
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
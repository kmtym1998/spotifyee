$(function(){
    function ajax_track(param){
        $.ajax({
            data: {
                id: param,
                flag: 'track'
            },
            type: 'post',
            dataType: 'json',
            url: '../../backend/_track'
        }).done(function(data){
            $('#track-wrapper').prepend(
                '<img id="album_img" src="' + data.album.images[0].url + '">'
            );
            data.artists.forEach(function(artist){
                $('#track-description').prepend(
                    '<b>Artist:</b> <a href="../artist/?id=' + artist.id + '">' + artist.name + '</a><br>'
                );
            });
            $('#track-description').append(
                '<b>Album Name:</b> <a href="../album/?id=' + data.album.id + '">' + data.album.name + '</a><br>' +
                '<b>Duration:</b> ' + toHms(data.duration_ms) + '<br>' +
                '<b>Popularity:</b> ' + data.popularity + '<br>'
            );

            $('title').html(data.name);
            $('#title').html(data.name);
            
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log("エラーが発生しました。ステータス：" + jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    }
    function ajax_audioFeature(param){
        $.ajax({
            data: {
                id: param,
                flag: 'audioFeature'
            },
            type: 'post',
            dataType: 'json',
            url: '../../backend/_track'
        }).done(function(data){
            const keys = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];
            const modes = ['Minor', 'Major'];
            $('#track-description').append(
                '<b>Key:</b> ' + keys[data.key]+ '<br>' +
                '<b>Mode:</b> ' + modes[data.mode] + '<br>' +
                '<b>Time Signature:</b> ' + data.time_signature + '<br>' +
                '<b>Tempo:</b> ' + data.tempo + '<br>' +
                '<b>Loudness:</b> ' + data.loudness + '<br>'
            );
            display_graph([data.danceability, data.energy, data.speechiness, data.acousticness, data.instrumentalness, data.liveness, data.valence]);
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log("エラーが発生しました。ステータス：" + jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    }
    function ajax_audioAnalysis(param){
        $.ajax({
            data: {
                id: param,
                flag: 'audioAnalysis'
            },
            type: 'post',
            dataType: 'json',
            url: '../../backend/_track'
        }).done(function(data){
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log("エラーが発生しました。ステータス：" + jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    }

    const param = location.search.substr(4);

    function toHms(t) {
        t /= 1000;
        t = Math.floor(t);
        var hms = "";
        var h = Math.floor(t / 3600);
        var m = Math.floor(t % 3600 / 60);
        var s = Math.floor(t % 60);


        if (h > 0) {
            hms = h + ":" + padZero(m) + ":" + padZero(s);
        } else if (m > 0) {
            hms = padZero(m) + ":" + padZero(s);
        } else {
            hms = "00" + ":" + s;
        }

        return hms;

        function padZero(v) {
            if (v < 10) {
                return "0" + v;
            } else {
                return v;
            }
        }
    }

    ajax_track(param);
    ajax_audioFeature(param);
    //ajax_audioAnalysis(param);


    function display_graph(data){
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['danceability', 'energy', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence'],
                datasets: [{
                    label: 'Audio Feature',
                    data: data,
                    backgroundColor: [
                        'rgba(104, 190, 141, 0.2)', //danceability
                        'rgba(105, 154, 191, 0.2)', //energy
                        'rgba(142, 105, 191, 0.2)', //speechiness
                        'rgba(105, 105, 105, 0.2)', //acousticness
                        'rgba(191, 105, 154, 0.2)', //instrumentalness
                        'rgba(191, 142, 105, 0.2)', //liveness
                        'rgba(154, 191, 105, 0.2)'  //valence
                    ],
                    borderColor: [
                        'rgba(104, 190, 141, 1)', //danceability
                        'rgba(105, 154, 191, 1)', //energy
                        'rgba(142, 105, 191, 1)', //speechiness
                        'rgba(105, 105, 105, 1)', //acousticness
                        'rgba(191, 105, 154, 1)', //instrumentalness
                        'rgba(191, 142, 105, 1)', //liveness
                        'rgba(154, 191, 105, 1)'  //valence
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMax: 1.0,
                            suggestedMin: 0,
                            stepSize: 0.1
                        }
                    }]
                }
            }
        });
    }

    var c = document.getElementById("myChart");
    const window_width = window.innerWidth;
    const window_height = window.innerHeight;

    if(window_width > 700){
    }else{
        $('#track-description').before('<br>');
        const chart = document.getElementById('myChart');
        chart.width = 140;
        chart.height = 140;
    }

});




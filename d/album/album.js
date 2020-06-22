$(function(){
    const param = location.search.substr(4);
    function ajax_album(param){
        $.ajax({
            data: {
                id: param,
                flag: 'album'
            },
            dataType: 'json',
            type: 'post',
            url: '../../backend/_album'
        }).done(function(data){
            $('#album-wrapper').append(
                '<img id="album-img" src="' + data.images[0].url + '" alt="">' +
                '<div id="album-description">' +
                '</div>'
            );
            data.artists.forEach(function(artist){
                $('#album-description').eq(-1).prepend(
                    '<b>Artist:</b> <a href="../artist/?id=' + artist.id + '">' + artist.name + '</a><br>'
                );
            });
            $('#album-description').eq(-1).append(
                    '<b>Release Date:</b> ' + data.release_date + '<br>' +
                    '<b>Album Type:</b> ' + data.album_type + '<br>' +
                    '<b>Popularity:</b> ' + data.popularity + '<br>' +
                    '<b>Label:</b> ' + data.label + '<br>' +
                    '<b>Copyrights:</b> ' + data.copyrights[0].text + '<br>'
            );
            $('title').html(data.name);
            $('#title').html(data.name);
                
        }).fail(function(jqXHR, textStatus, errorThrown){
                console.log("エラーが発生しました。ステータス：" + jqXHR.status);
                console.log(textStatus);
                console.log(errorThrown);
        });
    }
    function ajax_albumTracks(param){
        $.ajax({
            data: {
                id: param,
                flag: 'albumTracks'
            },
            dataType: 'json',
            type: 'post',
            url: '../../backend/_album'
        }).done(function(data1){

            data1.items.forEach(function(track){
                $.ajax({
                    data: {
                        id: track.id,
                        flag: 'track-popularity'
                    },
                    type: 'post',
                    dataType: 'text',
                    url: '../../backend/_track'
                }).done(function(data2){
                    $('#albumTracks-wrapper').append(
                        '<div class="albumTrack">' +
                            '<a class="albumTrack-name" href="../track?id=' + track.id + '">' + track.name + '</a><br>' +
                            '<div class="albumTrack-description"></div>' +
                        '</div>'
                    );
                    track.artists.forEach(function(artist){
                        $('.albumTrack-description').eq(-1).append(
                            '<b>Artist: </b><a href="../artist/?id=' + artist.id + '">' + artist.name + '</a><br>'
                        );
                    });
                    $('.albumTrack-description').eq(-1).append(
                        '<b>Popularity: </b>' + data2 + '<br>'
                    );
                    $('.albumTrack-description').eq(-1).append(
                        '<b>Duration: </b>' + toHms(track.duration_ms) + '<br>'
                    );
                });
            });
        }).fail(function(jqXHR, textStatus, errorThrown){
                console.log("エラーが発生しました。ステータス：" + jqXHR.status);
                console.log(textStatus);
                console.log(errorThrown);
        });
    }
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

    ajax_album(param);
    ajax_albumTracks(param);

    

    // const albumTrack_height = 

    if($('.albumTrack').length < 2 && $(window).width < $(window).height){
        $('#body').height($(windwow).height + 'px');
    }
    console.log($('#albumTrack-wrapper'));

});
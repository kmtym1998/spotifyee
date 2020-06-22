$(function(){
    const param = location.search.substr(4);
    function ajax_playlist(param){
        $.ajax({
            data: {
                id: param,
                flag: 'playlist'
            },
            dataType: 'json',
            type: 'post',
            url: '../../backend/_playlist'
        }).done(function(data){
            $('#playlist-wrapper').append(
                '<img id="playlist-img" src="' + data.images[0].url + '" alt="">' +
                '<div id="playlist-description">' +
                    '<b>Owner: </b>' + data.owner.display_name + '<br>' +
                    '<b>Followers: </b>' + data.followers.total + '<br>' +
                    '<b>Collaborative: </b>' + data.collaborative + '<br>' +
                    '<span class="playlist-description-description"><b>Description: </b>' + data.description + '</span><br>' +
                '</div>'
            );

            const tracks = data.tracks.items;
            tracks.forEach(function(track_){
                var added_at = track_.added_at.substr(0, 10);
                var track = track_.track;
                console.log(added_at);

                $('#playlistTracks-wrapper').append(
                    '<div class="playlistTrack">' +
                        '<img class="playlistTrack-img" src="' + track.album.images[0].url + '" alt="">' +
                        '<div class="playlistTrack-description">' +
                            '<span class="playlistTrack-name"><a href="../track/?id=' + track.id + '">' + track.name + '</a></span><br>' +
                        '</div>'
                );

                track.artists.forEach(function(artist){
                    $('.playlistTrack-description').eq(-1).append(
                        '<b>Artist: </b><a href="../artist/?id=' + artist.id + '">' + artist.name + '</a><br>'
                    );
                });
                $('.playlistTrack-description').eq(-1).append(
                    '<b>Duration: </b>' + toHms(track.duration_ms) + '<br>' +
                    '<b>Popularity: </b>' + track.popularity + '<br>' +
                    '<b>Added At: </b>' + added_at + '<br>'
                );
            });
            $('title').html(data.name);
            $('#title').html(data.name);

        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log("エラーが発生しました。ステータス：" + jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    }
    function ajax_playlistTracks(param){
        $.ajax({
            data: {
                id: param,
                flag: 'playlistTracks'
            },
            dataType: 'json',
            type: 'post',
            url: '../../backend/_playlist'
        }).done(function(data){
            console.log(data);
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

    ajax_playlist(param);
});
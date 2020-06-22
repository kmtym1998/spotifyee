$(function(){

    function extend_height(height){
        $('#body').css('height', height + 1000 + 'px');
    }

    function set_img_url(array){
        if(array.length == 0){
            return 'img/unset_artistPic.png';
        }else{
            return array[0].url;
        }
    }

    function displaying_fadeIn(flag){
        if(flag == 1){
            $('#albums').fadeIn(1000);
        }else if(flag == 2){
            $('#artists').fadeIn(1000);
        }else if(flag == 3){
            $('#playlists').fadeIn(1000);
        }else if(flag == 4){
            $('#tracks').fadeIn(1000);
        }
    }

    function displaying_fadeOut(flag){
        if(flag == 1){
            $('#albums').fadeOut(1000);
        }else if(flag == 2){
            $('#artists').fadeOut(1000);
        }else if(flag == 3){
            $('#playlists').fadeOut(1000);
        }else if(flag == 4){
            $('#tracks').fadeOut(1000);
        }
    }

    function append_album_info(items){
        $('#albums').html('');
        items.forEach(function(item){
            $('#albums').append(
                '<div class="result-wrapper album-wrapper">' +
                    '<img src=' + item.images[0].url + ' alt="" width="200px" height="200px">' +

                    '<div class="result-inner album-inner">' +
                        '<span class="title-album">Title: <a href="d/album?id=' + item.id + '" target="_blank">' + item.name + '</a></span> <br>' +
                        'Artist: <a href="d/artist?id=' + item.artists[0].id + '" target="_blank">' + item.artists[0].name + '</a> <br>' +
                        'Release Date: ' + item.release_date + '<br>' +
                        'Total Tracks: ' + item.total_tracks + '<br>' +
                        'Album Type: ' + item.album_type + '<br>' +
                        'ID: ' + item.id + '<br>' +
                    '</div>' +
                '</div>'
            );
        });
    }

    function append_artist_info(items){
        $('#artists').html('');
        items.forEach(function(item){
            $('#artists').append(
                '<div class="result-wrapper artist-warpper">' +
                    '<img src="' + set_img_url(item.images) + '" alt="" width="200px" height="200px">' +
        
                    '<div class="result-inner artist-inner">' +
                        'Name: <a href="d/artist?id=' + item.id + '" target="_blank">' + item.name + '</a><br>' +
                        'Followers: ' + item.followers.total + '<br>' +
                        'Popularity: ' + item.popularity + '<br>' +
                        'Type: ' + item.type + '<br>' +
                        'ID: ' + item.id + '<br>' + 
                    '</div>' +
                '</div>'
            );
        });
    }

    function append_playlist_info(items){
        $('#playlists').html('');
        items.forEach(function(item){
            $('#playlists').append(
                '<div class="result-wrapper playlist-warpper">' +
                    '<img src="' + item.images[0].url + '" alt="" width="200px" height="200px">' +
            
                    '<div class="result-inner playlist-inner">' +
                        'Name: <a href="d/playlist?id=' + item.id + '" target="_blank">' + item.name + '</a><br>' +
                        'Owner: ' + item.owner.display_name + '<br>' +
                        'Owner-Type: ' + item.owner.type + '<br>' +
                        'Collaborative: ' + item.collaborative + '<br>' +
                        'Type: ' + item.type + '<br>' +
                        'ID: ' + item.id + '<br>' +
                        '<span class="description">Description: ' + item.description + '</span><br>' +
                    '</div>' +
                '</div>'
            );
        });
    }

    function append_track_info(items){
        $('#tracks').html('');
        items.forEach(function(item){
            $('#tracks').append(
                '<div class="result-wrapper track-warpper">' +
                    '<img src="' + item.album.images[0].url + '" alt="" width="200px" height="200px">' +

                    '<div class="result-inner track-inner">' +
                        'Name: <a href="d/track?id=' + item.id + '" target="_blank">' + item.name + '</a><br>' +
                    '</div>' +
                '</div>'
            );
            item.artists.forEach(function(artist){
                $('.track-inner').eq(-1).append(
                        'Artist: <a href="d/artist?id=' + artist.id + '" target="_blank">' + artist.name + '</a><br>'
                );
            });
            $('.track-inner').eq(-1).append(
                       ' Duration: ' + toHms(item.duration_ms) + '<br>' +
                        'Popularity: ' + item.popularity + '<br>' +
                        'Type: ' + item.type + '<br>' +
                        'Explicit: ' + item.explicit + '<br>' +
                        'ID: ' + item.id + '<br>'
            );
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

    var width = 0;

    $('.submit').on('click', function(){

        const flag = $('#lamp').attr('class').substr(-1);
        displaying_fadeOut(flag);

        const q = $('.text').val();
        if(q != ''){
            $.ajax({
                url: 'backend/search',
                type: 'post',
                dataType: 'json',
                data: {
                    q: q
                }
            }).done(function(data){
                append_album_info(data.album.albums.items);
                append_artist_info(data.artist.artists.items);
                append_playlist_info(data.playlist.playlists.items);
                append_track_info(data.track.tracks.items);
                displaying_fadeIn(flag);
                
                if(window.innerWidth > 699){
                    width = $('.tab-buttons').width() - 320;
                    $('.description').css('max-width', width + 'px');
                }

                extend_height($('#results-wrapper').height());
            }).fail(function(jqXHR, textStatus, errorThrown){
                console.log("エラーが発生しました。ステータス：" + jqXHR.status);
                console.log(textStatus);
                console.log(errorThrown);
            });
        }
    });





    
});
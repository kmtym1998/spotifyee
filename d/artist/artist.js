$(function(){
    const param = location.search.substr(4);
    function set_img_url(array){
        if(array.length == 0){
            return '../../img/unset_artistPic.png';
        }else{
            return array[0].url;
        }
    }
    function ajax_artist(param){
        $.ajax({
            data: {
                id: param,
                flag: 'artist'
            },
            type: 'post',
            dataType: 'json',
            url: '../../backend/_artist'
        }).done(function(data){
            $('#artist-wrapper').prepend(
                '<img id="artist-img" src="' + set_img_url(data.images) + '" alt="">'
            );
            $('#artist-description').append(
                '<b>Genres:</b> ' + data.genres[0]
            );
            for(var i = 1; i < data.genres.length; i++){
                $('#artist-description').append(
                    ', ' + data.genres[i]
                );
            }
            $('#artist-description').append(
                '<br>' +
                '<b>Popularity:</b> ' + data.popularity + '<br>' +
                '<b>Followers:</b> ' + data.followers.total + '<br>'
            );
            set_height_to_main_img('artist');

            $('title').html(data.name);
            $('#title').html(data.name);
            
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log("エラーが発生しました。ステータス：" + jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    }
    function ajax_artistAlbums(param){
        $.ajax({
            data: {
                id: param,
                flag: 'artistAlbums'
            },
            type: 'post',
            dataType: 'json',
            url: '../../backend/_artist'
        }).done(function(data){

            const items = data.items;
            if(items.length == 0){
                $('#title-recentAlbums').css('display', 'none');
                $('#recentAlbums-wrapper').css('display', 'none');
            }
            items.forEach(function(album){
                $('#recentAlbums-wrapper').append(
                    '<div class="recentAlbum">' +
                        '<a href="../album/?id=' + album.id + '">' +
                            '<img class="recentAlbum-img" src="' + set_img_url(album.images) + '" alt="">' + '<br>' +
                            '<span class="recentAlbum-name">' + album.name + '</span>' + '<br>' +
                        '</a>' +
                    '</div>'
                );
            });
            
            
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log("エラーが発生しました。ステータス：" + jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    }
    function ajax_artistTopTracks(param){
        $.ajax({
            data: {
                id: param,
                flag: 'artistTopTracks'
            },
            type: 'post',
            dataType: 'json',
            url: '../../backend/_artist'
        }).done(function(data){

            const bestTrack = data.tracks[0]
            $('#topTracks-wrapper').prepend(
                '<div id="bestTrack">' +
                    '<a href="../track/?id=' + bestTrack.id + '">' +
                        '<img id="bestTrack-img" src="' + set_img_url(bestTrack.album.images) + '" alt="">' + '<br>' +
                        '<span id="bestTrack-name">' + bestTrack.name + '</span>' + '<br>' +
                    '</a>' +
                '</div>'
            );

            for(var i = 1; i < data.tracks.length; i++){
                $('#topTracks-but-bestTrack').append(
                    '<div class="topTrack">' +
                        '<a href="../track/?id=' + data.tracks[i].id + '">' +
                            '<img class="topTrack-img" src="' + set_img_url(data.tracks[i].album.images) + '" alt="">' + '<br>' +
                            '<span class="topTrack-name">' + data.tracks[i].name + '</span>' + '<br>' +
                        '</a>' +
                    '</div>'
                );
            }


        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log("エラーが発生しました。ステータス：" + jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    }
    function ajax_artistRelatedArtists(param){
        $.ajax({
            data: {
                id: param,
                flag: 'artistRelatedArtists'
            },
            type: 'post',
            dataType: 'json',
            url: '../../backend/_artist'
        }).done(function(data){
            var i = 0;
            data.artists.forEach(function(artist){
                $('#relatedArtists-wrapper').append(
                    '<div class="relatedArtist">' +
                        '<a href="?id=' + artist.id + '">' +
                            '<img class="relatedArtist-img" src="' + set_img_url(artist.images) + '" alt="">' + '<br>' +
                            '<span class="relatedArtist-name">' + artist.name + '</span>' + '<br>' +
                        '</a>' +
                    '</div>'
                );
                set_height_to_relatedArtist_img();
            });
            
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log("エラーが発生しました。ステータス：" + jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    }
    function set_height_to_main_img(string){ //正方形以外の画像をゆるさない
        const width = $(window).width()*0.3;
        const height = width;
        if(height > 640){
            $('#' + string + '-img').css('width', '640px');
            $('#' + string + '-img').css('height', '640px');
        }else{
            $('#' + string + '-img').css('width', width + 'px');
            $('#' + string + '-img').css('height', height + 'px');
        }
    }
    function set_height_to_relatedArtist_img(){
        const width = $(window).width()*0.2;
        const height = width;
        if(height > 200){
            $('.relatedArtist-img').eq(-1).css('width', '200px');
            $('.relatedArtist-img').eq(-1).css('height', '200px');
        }else{
            $('.relatedArtist-img').eq(-1).css('width', width + 'px');
            $('.relatedArtist-img').eq(-1).css('height', height + 'px');
        }

    }

    ajax_artist(param);
    ajax_artistAlbums(param);
    ajax_artistTopTracks(param);
    ajax_artistRelatedArtists(param);

    $(window).resize(function(){
        set_height_to_main_img('artist');
        const width = $(window).width()*0.2;
        const height = width;
        if(height > 200){
            $('.relatedArtist-img').css('width', '200px');
            $('.relatedArtist-img').css('height', '200px');
        }else{
            $('.relatedArtist-img').css('width', width + 'px');
            $('.relatedArtist-img').css('height', height + 'px');
        }
    });
});

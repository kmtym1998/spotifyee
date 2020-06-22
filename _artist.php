<?php
    $id = filter_input(INPUT_POST, 'id');
    $flag = filter_input(INPUT_POST, 'flag');
    if($id == null || !($flag == 'artist' || $flag == 'artistTopTracks' || $flag == 'artistAlbums' || $flag == 'artistRelatedArtists')){
        echo json_encode([$id, $flag]);
        exit();
    }
    header("Content-Type: application/json; charset=UTF-8");

    require_once('SearchContent.php');
    $search = new SearchContent('', 1);

    if($flag == 'artist'){
        $artist_obj = $search->getArtist($id);
        $artist_array = get_object_vars($artist_obj);
        echo json_encode($artist_array);
        exit();
    }elseif($flag == 'artistAlbums'){
        $artistAlbums_obj = $search->getArtistAlbums($id);
        $artistAlbums_array = get_object_vars($artistAlbums_obj);
        echo json_encode($artistAlbums_array);
        exit();
    }elseif($flag == 'artistTopTracks'){
        $artistTopTracks_obj = $search->getArtistTopTracks($id);
        $artistTopTracks_array = get_object_vars($artistTopTracks_obj);
        echo json_encode($artistTopTracks_array);
    }elseif($flag == 'artistRelatedArtists'){
        $artistRelatedArtists_obj = $search->getArtistRelatedArtists($id);
        $artistRelatedArtists_array = get_object_vars($artistRelatedArtists_obj);
        echo json_encode($artistRelatedArtists_array);
    }else{
        echo json_encode([]);
        exit();
    }
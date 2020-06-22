<?php

    header("Content-Type: application/json; charset=UTF-8");
    $q = filter_input(INPUT_POST, 'q');

    require_once('SearchContent.php');
    $search = new SearchContent($q, 15);

    $albums_obj = $search->getResults_album();
    $albums_array = get_object_vars($albums_obj);

    $artists_obj = $search->getResults_artist();
    $artists_array = get_object_vars($artists_obj);
    
    $playlists_obj = $search->getResults_playlist();
    $playlists_array = get_object_vars($playlists_obj);

    $tracks_obj = $search->getResults_track();
    $tracks_array = get_object_vars($tracks_obj);

    $data = [
        'album' => $albums_array,
        'artist' => $artists_array,
        'playlist' => $playlists_array,
        'track' => $tracks_array
    ];

    echo json_encode($data);
    exit();
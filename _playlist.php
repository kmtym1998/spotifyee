<?php
    $id = filter_input(INPUT_POST, 'id');
    $flag = filter_input(INPUT_POST, 'flag');
    if($id == null || !($flag == 'playlist' || $flag == 'playlistTracks')){
        echo json_encode([$id, $flag]);
        exit();
    }
    header("Content-Type: application/json; charset=UTF-8");

    require_once('SearchContent.php');
    $search = new SearchContent('', 1);

    if($flag == 'playlist'){
        $playlist_obj = $search->getplaylist($id);
        $playlist_array = get_object_vars($playlist_obj);
        echo json_encode($playlist_array);
        exit();
    }elseif($flag == 'playlistTracks'){
        $playlistTracks_obj = $search->getPlaylistTracks($id);
        $playlistTracks_array = get_object_vars($playlistTracks_obj);
        echo json_encode($playlistTracks_array);
        exit();
    }
<?php
    $id = filter_input(INPUT_POST, 'id');
    $flag = filter_input(INPUT_POST, 'flag');
    if($id == null || !($flag == 'album' || $flag == 'albumTracks')){
        echo json_encode([$id, $flag]);
        exit();
    }
    header("Content-Type: application/json; charset=UTF-8");

    require_once('SearchContent.php');
    $search = new SearchContent('', 1);

    if($flag == 'album'){
        $album_obj = $search->getAlbum($id);
        $album_array = get_object_vars($album_obj);
        echo json_encode($album_array);
        exit();
    }elseif($flag == 'albumTracks'){
        $albumTracks_obj = $search->getAlbumTracks($id);
        $albumTracks_array = get_object_vars($albumTracks_obj);
        echo json_encode($albumTracks_array);
        exit();
    }
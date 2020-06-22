<?php

    $id = filter_input(INPUT_POST, 'id');
    $flag = filter_input(INPUT_POST, 'flag');
    if($id == null || !($flag == 'track' || $flag == 'audioAnalysis' || $flag == 'audioFeature' || $flag == 'track-popularity')){
        echo json_encode([$id, $flag]);
        exit();
    }
    header("Content-Type: application/json; charset=UTF-8");

    require_once('SearchContent.php');
    $search = new SearchContent('', 1);

    if($flag == 'track' || $flag == 'track-popularity'){
        $track_obj = $search->getTrack($id);

        if($flag == 'track-popularity'){
            echo $track_obj->popularity;
            exit();
        }else{
            $track_array = get_object_vars($track_obj);
            echo json_encode($track_array);
            exit();
        }
    }elseif($flag == 'audioFeature'){
        $audioFeature_obj = $search->getAudioFeature($id);
        $audioFeature_array = get_object_vars($audioFeature_obj);
        echo json_encode($audioFeature_array);
        exit();
    }elseif($flag == 'audioAnalysis'){
        $audioAnalysis_obj = $search->getAudioAnalysis($id);
        $audioAnalysis_array = get_object_vars($audioAnalysis_obj);
        echo json_encode($audioAnalysis_array);
    }else{
        echo json_encode([]);
        exit();
    }
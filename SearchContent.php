<?php
    require_once('vendor/autoload.php');

    //認証コードフローを使わないでSpotifyAPIにアクセス。
    //Spotifyのカタログ情報を検索するのに使うクラス。
    class SearchContent{

        private $result = [];
        private $query = '';
        private $limit;
        private $Spotifyapi;

        public function __construct($query, $limit){
            $this->query = $query;
            $this->limit = $limit;
            $this->Spotifyapi = $this->access()[0];
            if($query === ''){
                $this->result = [];
            }
        }

        private function access(){
            require_once('vendor/autoload.php');
            //これがないとSpotifyにユーザ認証してもらえない
            //アクセストークンの取得
            $session = new SpotifyWebAPI\Session(
                'XXXXXXX',
                'XXXXXXX'
            );
            $api = new SpotifyWebAPI\SpotifyWebAPI();
            $session->requestCredentialsToken();
            $accessToken = $session->getAccessToken();
            $api->setAccessToken($accessToken);
            //認証コードフローじゃない方の認証。ユーザの情報にアクセスしないやつ。
            ///////////ここまでアクセストークンの処理

            return [$api, $session];
        }

        //検索結果の表示
        public function getResults_album(){
            $this->result['albums'] = $this->Spotifyapi->search($this->query, 'album', ['limit' => $this->limit]);
            return $this->result['albums'];
        }
        public function getResults_artist(){
            $this->result['artists'] = $this->Spotifyapi->search($this->query, 'artist', ['limit' => $this->limit]);
            return $this->result['artists'];
        }
        public function getResults_playlist(){
            $this->result['playlists'] = $this->Spotifyapi->search($this->query, 'playlist', ['limit' => $this->limit]);
            return $this->result['playlists'];
        }
        public function getResults_track(){
            $this->result['tracks'] = $this->Spotifyapi->search($this->query, 'track', ['limit' => $this->limit]);
            return $this->result['tracks'];
        }
        public function getResult_All(){
            $this->getResult_Album($this->Spotifyapi);
            $this->getResult_Artist($this->Spotifyapi);
            $this->getResult_Playlist($this->Spotifyapi);
            $this->getResult_Track($this->Spotifyapi);
            return $this->result;
        }
        public function getQuery(){
            return $this->query;
        }

        //Album
        public function getAlbum($id){
            return $this->Spotifyapi->getAlbum($id);
        }
        public function getAlbumTracks($id){
            return $this->Spotifyapi->getAlbumTracks($id, ['limit'=>50]);
        }

        //Artist
        public function getArtist($id){
            return $this->Spotifyapi->getArtist($id);
        }
        public function getArtistAlbums($id){
            return $this->Spotifyapi->getArtistAlbums($id, ['limit' => 20, 'album_type' => 'album', 'country' => 'JP']);
        }
        public function getArtistTopTracks($id){
            return $this->Spotifyapi->getArtistTopTracks($id, ['country' => 'JP']);
        }
        public function getArtistRelatedArtists($id){
            return $this->Spotifyapi->getArtistRelatedArtists($id);
        }

        //Playlist
        public function getPlaylist($id){
            return $this->Spotifyapi->getPlaylist($id);
        }
        public function getPlaylistTracks($id){
            return $this->Spotifyapi->getPlaylistTracks($id, ['limit'=>50]);
        }

        //Track
        public function getTrack($id){
            return $this->Spotifyapi->getTrack($id);
        }
        public function getAudioAnalysis($id){
            return $this->Spotifyapi->getAudioAnalysis($id);
        }
        public function getAudioFeature($id){
            return $this->Spotifyapi->getAudioFeatures([$id])->audio_features[0];
        }


        public function getSeeds(){
            return $this->Spotifyapi->getGenreSeeds();
        }

    }

<?php
namespace App\Config;

use Arr;

class Content
{

            
    /**
     * Get CMS content configuration
     *
     * @access public                
     * @return array
    */
    public static function get() {
    //<editor-fold defaultstate="collapsed" desc="get"> 
        $config = [];
        
        /*
        |--------------------------------------------------------------------------
        |                             homepage_firstBox
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="homepage_firstBox"> 
        $config['homepage_firstBox'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
            'data' => function ($data) {
                return [
                    'link' => Arr::get($data, 'link', ''),
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];
        //</editor-fold>
            
        /*
        |--------------------------------------------------------------------------
        |                             homepage_left_first_box
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="homepage_left_first_box"> 
        $config['homepage_left_first_box'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
            'data' => function ($data) {
                return [
                    'link' => Arr::get($data, 'link', ''),
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];
                
        
        return $config;
    //</editor-fold>
    }
    
}
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
        |                             welcome_banner
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="welcome_banner"> 
        $config['welcome_banner'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
        ];
        //</editor-fold> 
            
        /*
        |--------------------------------------------------------------------------
        |                             motocross_tyres
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="motocross_tyres"> 
        $config['motocross_tyres'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                    'button_title' => Arr::get($data, 'button_title', ''),
                ];
            },
            'data' => function ($data) {
                return [
                    'link' => Arr::get($data, 'link', ''),
                ];
            },
        ];

        //</editor-fold>
        
        return $config;
    }  
}
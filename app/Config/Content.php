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
        |                             right_image_box
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="right_image_box"> 
        $config['right_image_box'] = [  
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
        |                             bottom_left_card
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="bottom_left_card"> 
        $config['bottom_left_card'] = [  
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
        |                             bottom_right_card
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="bottom_right_card"> 
        $config['bottom_right_card'] = [  
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
            
        /*
        |--------------------------------------------------------------------------
        |                             customize_your_look_left
        |--------------------------------------------------------------------------|
        */ 
            
        //<editor-fold defaultstate="collapsed" desc="customize_your_look_left"> 
        $config['customize_your_look_left'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title_left' => Arr::get($data, 'title_left', ''),
                    'content_left' => Arr::get($data, 'content_left', ''),
                    'button_title_left' => Arr::get($data, 'button_title_left', ''),
                ];
            },
            'data' => function ($data) {
                return [
                    'link_left' => Arr::get($data, 'link_left', ''),
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];
        //</editor-fold>
            
        /*
        |--------------------------------------------------------------------------
        |                             customize_your_look_right
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="customize_your_look_right"> 
        $config['customize_your_look_right'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title_right' => Arr::get($data, 'title_right', ''),
                    'content_right' => Arr::get($data, 'content_right', ''),
                    'button_title_right' => Arr::get($data, 'button_title_right', ''),
                ];
            },
            'data' => function ($data) {
                return [
                    'link_right' => Arr::get($data, 'link_right', ''),
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             contact_form
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="contact_form"> 
        $config['contact_form'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'social_media1' => Arr::get($data, 'social_media1', ''),
                    'social_media2' => Arr::get($data, 'social_media2', ''),
                    'social_media3' => Arr::get($data, 'social_media3', ''),
                    'social_media4' => Arr::get($data, 'social_media4', ''),
                ];
            },
            'data' => function ($data) {
                return [
                    'link_to_media1' => Arr::get($data, 'link_to_media1', ''),
                    'link_to_media2' => Arr::get($data, 'link_to_media2', ''),
                    'link_to_media3' => Arr::get($data, 'link_to_media3', ''),
                    'link_to_media4' => Arr::get($data, 'link_to_media4', ''),
                ];
            },
        ];
        //</editor-fold>    
        return $config;
    }  
}
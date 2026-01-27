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
        |                             contacts_hero
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="contacts_hero"> 
        $config['contacts_hero'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             price_calculator_content
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="price_calculator_content"> 
        $config['price_calculator_content'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                    'disclaimer' => Arr::get($data, 'disclaimer', ''),
                ];
            },
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             price_calculator_hero
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="price_calculator_hero"> 
        $config['price_calculator_hero'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             blog_hero
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="blog_hero"> 
        $config['blog_hero'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             certificates_content
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="certificates_content"> 
        $config['certificates_content'] = [  
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
        |                             about_us_divider_2
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="about_us_divider_2"> 
        $config['about_us_divider_2'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'content' => $content,
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             about_us_our_info
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="about_us_our_info"> 
        $config['about_us_our_info'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'right_title' => Arr::get($data, 'right_title', ''),
                    'left_title' => Arr::get($data, 'left_title', ''),
                    'left_content' => Arr::get($data, 'left_content', ''),
                    'right_content' => Arr::get($data, 'right_content', ''),
                    'box_1' => Arr::get($data, 'box_1', ''),
                    'box_2' => Arr::get($data, 'box_2', ''),
                    'box_3' => Arr::get($data, 'box_3', ''),
                    'box_4' => Arr::get($data, 'box_4', ''),
                ];
            },
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             about_us_divider
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="about_us_divider"> 
        $config['about_us_divider'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'content' => $content,
                ];
            },
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             about_us_hero
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="about_us_hero"> 
        $config['about_us_hero'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             building_hero
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="building_hero"> 
        $config['building_hero'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             renovation_hero
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="renovation_hero"> 
        $config['renovation_hero'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             check_info
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="check_info"> 
        $config['check_info'] = [  
            'data' => function ($data) {
                return [
                    'phone' => Arr::get($data, 'phone', ''),
                    'email' => Arr::get($data, 'email', ''),
                    'address' => Arr::get($data, 'address', ''),
                    'sia' => Arr::get($data, 'sia', ''),
                    'reg_nr' => Arr::get($data, 'reg_nr', ''),
                    'work_time' => Arr::get($data, 'work_time', ''),
                ];
            },
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             home_questions
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="home_questions"> 
        $config['home_questions'] = [  
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
        |                             reviews_content
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="reviews_content"> 
        $config['reviews_content'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                ];
            },
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             calculator_block_content
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="calculator_block_content"> 
        $config['calculator_block_content'] = [  
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
        |                             home_selection
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="home_selection"> 
        $config['home_selection'] = [  
            'media' => [
                'images' => 2,
            ],  
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             home_divider
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="home_divider"> 
        $config['home_divider'] = [  
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
        |                             home_hero
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="home_hero"> 
        $config['home_hero'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
                
        
        return $config;
    //</editor-fold>
    }
    
}
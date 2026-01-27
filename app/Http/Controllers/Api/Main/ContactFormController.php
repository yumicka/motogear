<?php

namespace App\Http\Controllers\Api\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;

use Mail;

class ContactFormController extends Controller
{
    /**
    * Constructor
    *
    * @return void
    */
    public function __construct()
    {


    }
    
    /**
    * Method name
    *
    * @access public          
    * @param  int $id - item id    
    * @return string json
    {
        "msg"=>"Method response",        
    }
    */
    public function send(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="send">
        $auth_user = auth()->user();  

        //validation
        $rules = [
//            'name' => 'required|string',
//            'email' => 'required|email',
//            'phone' => 'required|string',
//            'message' => 'required|string',
        ];
        $validate = Response::validate($request->all(), $rules);
        if ($validate) return $validate;
        
//        \App\Logic\Main\Expenses\ExpensesItems::sendOffer($expenses);
        
        $response = \App\Logic\Main\Expenses\ExpensesItems::calculateExpenses($request);

        return Response::success($response);          
    //</editor-fold>
    }
    
    public function final_send(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="final_send">
        $auth_user = auth()->user();  

        //validation
        $rules = [
//            'name' => 'required|string',
//            'email' => 'required|email',
//            'phone' => 'required|string',
//            'message' => 'required|string',
        ];
        $validate = Response::validate($request->all(), $rules);
        if ($validate) return $validate;
        
        \App\Logic\Main\Expenses\ExpensesItems::sendOffer($request->expenses, $request->email, $request->full_name, $request->phone);
        
        $response = [
            'msg' => 'Your message is sent!',              
        ];

        return Response::success($response);          
    //</editor-fold>
    }
    
    public function contact_form(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="final_send">
        $auth_user = auth()->user();  

        //validation
        $rules = [
//            'name' => 'required|string',
//            'email' => 'required|email',
//            'phone' => 'required|string',
//            'message' => 'required|string',
        ];
        $validate = Response::validate($request->all(), $rules);
        if ($validate) return $validate;
        
        $response = [
            'msg' => 'Your message is sent!',              
        ];

        return Response::success($response);          
    //</editor-fold>
    }

}
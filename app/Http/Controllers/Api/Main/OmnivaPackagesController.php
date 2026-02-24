<?php

namespace App\Http\Controllers\Api\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use DB;

class OmnivaPackagesController extends Controller
{
    public function list(Request $request)
    {
        $packages = DB::table('omniva_packages')
            ->select('ZIP', 'NAME', 'A0_NAME')
            ->orderBy('NAME')
            ->get();

        return response()->json([
            'response' => [
                'rows' => $packages,
            ],
        ]);
    }
}

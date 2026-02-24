<?php
namespace App\Logic\Main;
use DB;

class OmnivaPackages
{
    public static function import()
    {
        $jsonData = file_get_contents('https://www.omniva.lv/locations.json');
        $locations = json_decode($jsonData, true);

        if (!$locations) {
            die("Error while trying go get data! \n");
        }

        foreach ($locations as $loc) {
            DB::table('omniva_packages')->updateOrInsert(
                [
                    'ZIP' => $loc['ZIP'] ?? null,
                ],
                [
                    'NAME' => $loc['NAME'] ?? '',
                    'A0_NAME' => $loc['A0_NAME'] ?? '',
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }
    }
}
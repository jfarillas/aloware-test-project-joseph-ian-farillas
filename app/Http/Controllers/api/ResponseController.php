<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;
use Illuminate\Support\Facades\Auth;
use App\User;

class ResponseController extends Controller
{
    public function sendResponse($message, $request = NULL, $id = NULL, $bearerToken = NULL)
    {
        return response()->json([
            'message' => $message,
            'id' => (!is_null($id)) ? $id : NULL,
            'status_code' => 200])
            ->withCallback($request->input('callback'))
            ->withHeaders([]);
    }

    public function sendResponseData($response, $request = NULL)
    {
        return response()
            ->json($response)
            ->withCallback($request->input('callback'));
    }

    public function sendError($error, Int $code = 404)  
    {
    	$response = [
            'error' => $error,
        ];
        return response()->json(['message' => $response, 'status_code' => $code]);
    }
}

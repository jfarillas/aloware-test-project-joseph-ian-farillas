<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function() {
    Route::group(['middleware' => ['guest:api']], function () {
        Route::get('comments', [
            'as' => 'comment.list',
            'uses' => 'api\CommentController@index'
        ]);
        Route::get('comment/{id}', [
            'as' => 'comment.show',
            'uses' => 'api\CommentController@show'
        ]);
        Route::post('comment', [
            'as' => 'comment.store',
            'uses' => 'api\CommentController@store'
        ]);
        Route::post('reply', [
            'as' => 'comment.reply',
            'uses' => 'api\CommentController@replyStore'
        ]);
    });
});

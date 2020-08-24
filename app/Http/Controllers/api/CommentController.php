<?php
declare(strict_types=1);

namespace App\Http\Controllers\api;

use App\Http\Controllers\api\ResponseController as ResponseController;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Comment;
use App\Traits\ValidationTrait;
use Validator;
use Exception;

class CommentController extends ResponseController
{
    use ValidationTrait;

    /**
     * Display comments listing and its replies.
     *
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try {
            // Upto 3 levels in nested comments
            $comments = Comment::where('parent_id', 0)
            ->with('replies.replies')
            ->get();
            return $this->sendResponseData($comments, $request);

        } catch (Exception $e) {
            // Return error response if something goes wrong
            return $this->sendError($e->getMessage(), 401);
        }
    }

    /**
     * Display a specific comment listing and its replies.
     *
     * @param \Illuminate\Http\Request  $request
     * @param int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request, $id): JsonResponse
    {
        try {
            // Upto 3 levels in nested comments
            $comment = Comment::where('id', $id)
            ->with('replies')
            ->get();
            return $this->sendResponseData($comment, $request);

        } catch (Exception $e) {
            // Return error response if something goes wrong
            return $this->sendError($e->getMessage(), 401);
        }
    }

    /**
     * Store a newly created comment.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        // Validate first the fields
        $rules = [
            'name' => 'required',
            'comment' => 'required'
        ];

        $validationErrors = $this->validationRules($request->all(), $rules, 'Invalid data given');
        
        if ($validationErrors->getOriginalContent()) {
            return $validationErrors;
        } else {
            // If no validation errors, store the comment
            try {
                $input = $request->all();
                $comment = Comment::create($input);
                $id = $comment->id;
                $message = 'Comment created successfully.';
                return $this->sendResponse($message, $request, $id);
            } catch (Exception $e) {
                // Return error response if something goes wrong
                return $this->sendError($e->getMessage(), 401);
            }
        }

        
    }

    public function replyStore(Request $request)
    {
        // Validate the reply fields
        $rules = [
            'name' => 'required',
            'comment' => 'required'
        ];

        $this->validationRules($request->all(), $rules, 'Invalid data given');

        try {

            // Save a comment's reply 
            $reply = new Comment();
            $input = $request->all();
            $reply->name = $input['name'];
            $reply->comment = $input['comment'];
            $id = $input['id'];
            $reply->parent_id = $id;
            $res = Comment::find($id);
            $res->comments()->save($reply);
            $message = 'Comment created successfully.';
            return $this->successfulResponse([
                'message' => $message,
                'id' => (!is_null($id)) ? $id : NULL,
                'status_code' => 200]
            );

        } catch (Exception $e) {
            // Otherwise, throw an error
            return $this->response->withException($e);
        }

    }
}

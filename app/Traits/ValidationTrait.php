<?php
 
namespace App\Traits;

use Exception;
use Illuminate\Http\JsonResponse;
 
trait ValidationTrait {
 
    /**
     * Validate rules.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param array $rules
     * @param string $errorMsg
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function validationRules($request, $rules, $errorMsg): JsonResponse 
    {
      $validator = $this->getValidationFactory()->make($request, $rules);

      if ($validator->fails()) {
          // Return error response if validation failed
          return response()->json([
              'message' => $errorMsg,
              'errors' => $validator->errors()
          ]);
      } else {
        return response()->json([]);
      }
    }
 
}
<?php

    namespace App\Http\Controllers\Api;

    use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
    use Illuminate\Foundation\Validation\ValidatesRequests;
    use Illuminate\Routing\Controller as BaseController;
    use KennedyOsaze\LaravelApiResponse\Concerns\RendersApiResponse;

    class ApiController extends BaseController
    {
        use AuthorizesRequests, ValidatesRequests, RendersApiResponse;

        //    Successful Responses
        //    return $this->okResponse('This is a random message', $data = null, $headers = []);
        //    return $this->createdResponse('This is a random message', $data = null, $headers = []);
        //    return $this->acceptedResponse($message, $data, $headers);
        //    return $this->noContentResponse();
        //    return $this->successResponse($message, $data = null, $status = 200, $headers = []);
        //
        //// Successful Responses for \Illuminate\Http\Resources\Json\JsonResource
        //    return $this->resourceResponse($jsonResource, $message, $status = 200, $headers = []);
        //    return $this->resourceCollectionResponse($resourceCollection, $message, $wrap = true, $status = 200, $headers = []);
        //
        //// Error Responses
        //    return $this->unauthenticatedResponse('Unauthenticated message');
        //    return $this->badRequestResponse('Bad request error message', $error = null);
        //    return $this->forbiddenResponse($message);
        //    return $this->notFoundResponse($message);
        //    return $this->clientErrorResponse($message, $status = 400, $error = null, $headers = []);
        //    return $this->serverErrorResponse($message);
        //    return $this->validationFailedResponse($validator, $request = null, $message = null);
        //
        //    $messages = ['name' => 'Name is not valid'];
        //    $this->throwValidationExceptionWhen($condition, $messages);

    }

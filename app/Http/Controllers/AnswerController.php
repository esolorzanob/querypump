<?php namespace Todo\Http\Controllers;

use Illuminate\Http\Request;
use Todo\Http\Requests;
use Todo\Answer;

class AnswerController extends Controller
{

    private $request;

    function __construct(Request $request)
    {
        $this->request = $request;
    }


    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return Answer::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        $input = $this->request->all();
        $answer = new Answer($input);
        if (!$answer->save()) {
            abort(500, "Saving failed.");
        }
        return $answer;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function show($id)
    {
        return Answer::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return Response
     */
    public function update($id)
    {         
        $answer = Answer::find($id);
		$answer->response_user = $this->request->input('response_user');
        $answer->answer = $this->request->input('answer');
        $answer->comment = $this->request->input('comment');
        $answer->question_id = $this->request->input('question_id');
        if (!$answer>save()) {
            abort(500, "Saving failed");
        }
        return $answer;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id)
    {
        return Answer::destroy($id);
    }

}

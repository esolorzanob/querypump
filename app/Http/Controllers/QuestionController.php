<?php namespace Todo\Http\Controllers;

use Illuminate\Http\Request;
use Todo\Http\Requests;
use Todo\Question;

class QuestionController extends Controller
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
        $questions = Question::all();
        foreach($questions as $question){
            $question->posting_user = $question->user->username; 
        } 
        return $questions;
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
        $question = new Question($input);
        if (!$question->save()) {
            abort(500, "Saving failed.");
        }
        return $question;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function show($id)
    {
        $question = Question::find($id);
        $question->posting_user = $question->user->username;
        return $question;
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
        $question = Question::find($id);
		$question->posting_user = $this->request->input('posting_user');
        $question->body = $this->request->input('body');
        $question->answers = $this->request->input('answers');
        $question->enable_comments = $this->request->input('enable_comments');
        $question->category = $this->request->input('category');
        if (!$question>save()) {
            abort(500, "Saving failed");
        }
        return $question;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id)
    {
        return Question::destroy($id);
    }

}

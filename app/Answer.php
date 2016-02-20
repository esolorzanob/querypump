<?php namespace Todo;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model {
	
	protected $table = 'answers';
	
	protected $fillable = [
       'response_user',
		'answer',
		'comment',
		'question_id'			
    ];
	public function user()
    {
        return $this->belongsTo('Todo\User','response_user','id');
    }
	public function question()
    {
        return $this->belongsTo('Todo\Question','question_id','id');
    }
}

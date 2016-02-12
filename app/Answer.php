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

}

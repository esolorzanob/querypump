<?php namespace Todo;

use Illuminate\Database\Eloquent\Model;

class Question extends Model {
	
	protected $table = 'questions';
	
	protected $fillable = [
       'posting_user',
		'body',
		'answers',
		'enable_comments',
		'category'		
    ];

}
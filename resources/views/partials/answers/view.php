<div ng-controller="AnswerController">
    <table class="table-bordered table-striped table-hover" ng-init="find()">
       <tr>
        <th>#</th>
        <th>Response User</th>
        <th>Answer</th>
        <th>Comment</th>
        <th>Date answered</th>
      </tr>
      <tr ng-repeat="answer in answers">
          <td>{{answer.id}}</td>
          <td>{{answer.response_user}}</td>
          <td>{{answer.answer}}</td> 
          <td>{{answer.comment}}</td>          
          <td>{{answer.created_at}}</td>                 
    </table>
</div>



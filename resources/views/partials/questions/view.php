<div ng-controller="QuestionController">
    <table class="table-bordered table-striped table-hover" ng-init="find()">
       <tr>
        <th>#</th>
        <th>Question</th>
        <th>Date Posted</th>
        <th>Posted by</th>
      </tr>
      <tr ng-repeat="question in questions">
          <td>{{question.id}}
          <td>{{question.body}}</td> 
          <td>{{question.created_at}}</td>
          <td>{{question.posting_user}}</td>
        
    </table>
</div>



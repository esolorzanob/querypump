<div ng-controller="QuestionController">
    <script type="text/ng-template" id="myModalContent.html">
        <div class="modal-header">
        
          <div class="title-container">
            <h3 class="modal-title">Question #{{id}}</h3>
            <h4 class="modal-subtitle">Posted by {{posting_user}}</h2>
          </div>
          <div class="image-container">
            <img ng-src="{{imgName}}" class="modal-img-category"></img>
            <p>{{category}}</p>
         </div>
        
        </div>
        
        <div class="modal-body">
            <p>{{body}}</p>
            <ul>
                <li class = "modal-li" ng-repeat="option in options">
                    <a href="#" ng-click="$event.preventDefault(); selected.item = option">{{ option }}</a>
                </li>
            </ul>
            Selected: <b>{{ selected.item }}</b>
            <div ng-show="comments == 1">
            <p>Write a comment</p>
            <textArea ng-model="comment"></textArea>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" type="button" ng-click="ok()">OK</button>
            <button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button>
        </div>
    </script>
    <table class="table-bordered table-striped table-hover" ng-init="find()">
       <tr>
        <th>#</th>
        <th>Category</th>
        <th>Question</th>
        <th>Date Posted</th>
        <th>Posted by</th>
        <th>Check Results</th>
        <th>Answer</th>
      </tr>
      <tr ng-repeat="question in questions">
          <td>{{question.id}}</td>
          <td>{{question.category}}</td>
          <td>{{question.body}}</td> 
          <td>{{question.created_at}}</td>
          <td>{{question.posting_user}}</td>
          <td><a href="answers/view/question_id-{{question.id}}">#</a></td>
          <td><a ng-click="open('sm',question)" href="javascript:void(0)" ng-show="!question.responded">#</a></td>
    </table>
    <a ng-click="test()">#</a>
</div>



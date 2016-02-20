<div ng-controller="AnswerController">
    <div>
        <h1>Question #{{question.id}}</h1>
        <h2>Results<h2>
    </div>
    <div>
        <section>
            <h3>General information</h3>
            <p>Total answers: {{answers.length}}</p>
            <p>Total male answers: {{data.gender[0].value}}</p>
            <p>Total female answers: {{data.gender[1].value}}</p>
        </section>
    </div>
    
    <fusioncharts
    width="300" 
    height="200"
    type="column2d"
    datasource="{{myDataSource}}"
    ng-show="show"
    ></fusioncharts>
    <a ng-click="loadData()">#</a>
    
    <table class="table-bordered table-striped table-hover" ng-init="findGroup()">
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



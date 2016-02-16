<div ng-controller="QuestionController" ng-init="getAuthenticatedUser()">
    <div ng-show="authenticatedUser == null">
        <h1>You have to log in to create a question</h1>
    </div>
    
    <form class="form-horizontal" ng-submit="create(answerOptions)" name="questionForm" ng-show="authenticatedUser != null" novalidate>
        <fieldset>
            <div class="form-group">
                <div class="col-md-5">
                    <label>Select a category</label>
                    <select ng-model="category" id="category" name="category"  required>
						        <option selected disabled>Select a Category</option>
						        <option>Funny</option>
								<option>Science</option>
								<option>Sports</option>
								<option>Men</option>
								<option>Women</option>
								<option>Animals</option>
								<option>Health</option>
								<option>Love</option>
                                <option>Politics</option>
                                <option>Relationships</option>
                                <option>Other</option>
						        </select>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-5">
                    <label>Write the body of the question</label>
                    <textArea id="body" name="body" placeholder="Body of the question" class="form-control input-md"
                           ng-model="body" required></textArea>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-5">
                <a href="javascript:void(0)" ng-click="addOption()" class="btn btn-primary">Add an answer option</a>
                 </div>
            </div>
             <div class="form-group" ng-repeat="option in answerOptions">
               
                <div class="col-md-5" >
                    <input id="option.answer" name="option.answer" type="text" placeholder="Answers" class="form-control input-md"
                           ng-model="option.answer" required>
                </div>
                <a href="javascript:void(0)" ng-click="removeOption($index)" class="btn btn-warning" ng-show="$index != answerOptions.length">Remove this option</a>
            </div>
             <div class="form-group">
                <div class="col-md-5">
                   
                    <input type="checkbox" ng-model="comments" id="check_comments" /> Enable comments from responders
                   
                </div>
            </div>
            
            <div class="form-group">
                <div class="col-md-5">
                    <input type="submit" id="submit" ng-disabled="questionForm.$invalid" name="submit" class="btn btn-primary"/>
                </div>
            </div>
        </fieldset>
    </form>
</div>



<div ng-controller="QuestionController" ng-init="getAuthenticatedUser()">
    <form class="form-horizontal" ng-submit="create()" novalidate>
        <fieldset>
            <div class="form-group">
                <div class="col-md-5">
                    <input id="body" name="body" type="text" placeholder="Body of the question" class="form-control input-md"
                           ng-model="body" required>
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-5">
                    <input id="answers" name="answers" type="text" placeholder="Answers" class="form-control input-md"
                           ng-model="answers" required>
                </div>
            </div>
             <div class="form-group">
                <div class="col-md-5">
                    <input id="comments" name="comments" type="text" placeholder="Comments" class="form-control input-md"
                           ng-model="enable_comments" required>
                </div>
            </div>
             <div class="form-group">
                <div class="col-md-5">
                    <input id="category" name="category" type="text" placeholder="category" class="form-control input-md"
                           ng-model="category" required>
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-5">
                    <input type="submit" id="submit" name="submit" class="btn btn-primary"/>
                </div>
            </div>
        </fieldset>
    </form>
</div>



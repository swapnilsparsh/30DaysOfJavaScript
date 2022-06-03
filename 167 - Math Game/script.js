angular.module('app', []).controller('GameCtrl', ['$scope', '$timeout', function($scope, $timeout){
	$scope.variables = {};
	$scope.correct = 0;
	$scope.wrong = 0;
	$scope.timer = 0;
	_start = false;
	_end = false;
	var _answer = null;
	var _answerCorrect = null;
	var _sym = ['-','+','÷','x'];
	
	function _initialize() {
		$scope.variables = {
			'x': Math.floor(Math.random() * (10)) + 1,	
			'y': Math.floor(Math.random() * (10)) + 1,
		};	
		$scope.symbol = _sym[Math.round(Math.random()*3)];
		switch ($scope.symbol) {
			case '-':
				_answer = $scope.variables.x - $scope.variables.y;
				break;
			case '+':
				_answer = $scope.variables.x + $scope.variables.y;
				break;
			case 'x':
				_answer = $scope.variables.x * $scope.variables.y;
				break;
			default:
				var x = $scope.variables.x;
				$scope.variables.x = x * $scope.variables.y;
				_answer = x;
				break
		}
		_answerCorrect = null;
		$scope.answer = null;
	}
	

	angular.extend($scope, {
		isAnswer: function (){
			return _answerCorrect === true;
		},
		isIncorrect: function (){
			return _answerCorrect === false;
		},
		accuracy: function(){
			return $scope.correct / ($scope.correct + $scope.wrong) * 100;
		},
		noGame: function(){
			return !_start && !_end;
		},
		startGame: function(){
			_start = true;
			_end = false;
			$scope.correct = 0;
			$scope.wrong = 0;
			$scope.timer = 0;
			$timeout($scope.increaseTimer, 1000);
		},
		playingGame: function(){
			return _start && !_end;
		},
		endGame: function() {
			return _start && _end;
		},
		increaseTimer: function(){
			$scope.timer++;
			if($scope.timer == 60){
				_end = true;
			} else {
				$timeout($scope.increaseTimer, 1000);
			}
		},
		checkAnswer: function(){
			_answerCorrect = parseInt($scope.answer) == _answer;
			if(_answerCorrect) {
				$scope.correct++;
				_initialize()
			}else{
				$scope.wrong++;
				$scope.answer = null;
			}
		}
	});
	
	_initialize();
}
																				]);
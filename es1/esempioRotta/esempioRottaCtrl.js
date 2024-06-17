angular.module('arxivar.plugins.controller').controller('esempioRottaCtrl', 
	[
		'$scope', '$timeout','$uibModal','_', 'moment', 'params', 'arxivarResourceService' , 'arxivarUserServiceCreator' , 'arxivarRouteService' , 'arxivarDocumentsService' , 'arxivarNotifierService' ,  'esempioRotta', 
		function ($scope,$timeout,$uibModal, _, moment, params, arxivarResourceService , arxivarUserServiceCreator , arxivarRouteService , arxivarDocumentsService , arxivarNotifierService, esempioRotta) {
			$scope.aoos = [];
			$scope.aooSelected = params.queryParams;
			// arxivarResourceService.get('BusinessUnits')
								
			// $scope.$watch('aooSelected',(newVal, oldVal)=>{					
			// });
			


				// const modalScope=$uibModal.open({
				// 	controller:['$scope',
				// 	($scope)=>{												
				// 		$scope.cancel=()=>{
				// 			$scope.$dismiss('KO');
				// 		}

				// 		$scope.ok=()=>{
				// 			$scope.$close('OK');
				// 		}
				// 	}],
				// 	templateUrl:'myModalContent.html'					
				// })
			

}]);

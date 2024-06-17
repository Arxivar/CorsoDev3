angular.module('arxivar.plugins.controller').controller('esempioRottaCtrl', 
	['$scope', '$timeout','$uibModal','_', 'moment', 'params', 'arxivarResourceService' , 'arxivarUserServiceCreator' , 'arxivarRouteService' , 'arxivarDocumentsService' , 'arxivarNotifierService' ,  'esempioRotta', 
		function ($scope,$timeout,$uibModal, _, moment, params, arxivarResourceService , arxivarUserServiceCreator , arxivarRouteService , arxivarDocumentsService , arxivarNotifierService, esempioRotta) {
			arxivarResourceService.get('BusinessUnits')
				.then(function(aoos){												
					if(params.queryParams){						
						const aooSelected = _.find(aoos,{code:params.queryParams})
						if(!_.isNil(aooSelected)){						
							$scope.aooSelected = params.queryParams						
						}else{
							arxivarNotifierService.notifyError('Aoo '+params.queryParams+' non trovata')
						}						
					}
					$timeout(()=>{
						$scope.aoos=aoos;
					})
				})
				$scope.$watch('aooSelected',(newVal, oldVal)=>{
					console.log('newVal',newVal)
					console.log('oldVal',oldVal)
					if(!_.isNil(newVal)  ){
						const mode=0;
						arxivarResourceService.get('DocumentTypes/'+mode+'/mode?businessUnitCode='+newVal)
							.then((classes)=>{
								$scope.classes=classes;
							})
					}

				});
				$scope.show=(cl)=>{
					const modalScope=$uibModal.open({
						controller:['$scope', 'item',
						($scope, item)=>{			
							$scope.item=item;									
							$scope.cancel=()=>{
								$scope.$dismiss('KO');
							}

							$scope.ok=()=>{
								$scope.$close('OK');
							}
						}],
						templateUrl:'myModalContent.html',
						resolve:{
							item:()=>{
								return cl
							}
						}
					});
					modalScope.result.then((res)=>{
							console.log(res)
						})
						.catch((err)=>{
							console.log('dismiss'+err)
						})
				}		
}]);

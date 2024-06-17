import { LoDashStatic } from 'lodash';
import {routeType} from './rottaCliente';

angular.module('arxivar.plugins.controller').controller('rottaClienteCtrl', [
    '$scope','_','params', 'arxivarResourceService' , 'arxivarUserServiceCreator' , 'arxivarRouteService' , 'arxivarDocumentsService' , 'arxivarNotifierService' , 'rottaCliente',
    ($scope: any, _:LoDashStatic, params: IRouteParams , arxivarResourceService: IArxivarResourceService , arxivarUserServiceCreator: IArxivarUserServiceCreator , arxivarRouteService: IArxivarRouteService , arxivarDocumentsService: IArxivarDocumentsService , arxivarNotifierService: IArxivarNotifierService, rottaCliente: routeType) => {    
		console.log('###params',params);
        $scope.queryParams=params.queryParams;
		// arxivarResourceService.get('profiles/'+params.queryParams+'/schema/true',{
			// hideUserMessageError: false,
			// openloader: true
		// });
		

    } 
]);

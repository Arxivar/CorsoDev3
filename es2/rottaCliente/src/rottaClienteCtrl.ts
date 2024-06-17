import { LoDashStatic } from 'lodash';
import { routeType } from './rottaCliente';

angular.module('arxivar.plugins.controller').controller('rottaClienteCtrl', [
  '$scope',
  '_',
  'params',
  'arxivarResourceService',
  'arxivarUserServiceCreator',
  'arxivarRouteService',
  'arxivarDocumentsService',
  'arxivarNotifierService',
  'rottaCliente',
  (
    $scope: any,
    _: LoDashStatic,
    params: IRouteParams,
    arxivarResourceService: IArxivarResourceService,
    arxivarUserServiceCreator: IArxivarUserServiceCreator,
    arxivarRouteService: IArxivarRouteService,
    arxivarDocumentsService: IArxivarDocumentsService,
    arxivarNotifierService: IArxivarNotifierService,
    rottaCliente: routeType
  ) => {
    console.log('###params', params);
    $scope.queryParams = params.queryParams;
    const setting = _.find(rottaCliente.plugin.customSettings, {
      name: 'viewId',
    });
    const viewId = setting.value as string;
    $scope.from = null; //per usare ng-show
    arxivarResourceService
      .get('profiles/' + params.queryParams + '/schema/true', {
        hideUserMessageError: false,
        openloader: true,
      })
      .then((profilo) => {
        console.log('###profilo', profilo);
        $scope.from = _.find(profilo.fields, { name: 'From' }).value;
        if (!_.isNil($scope.from)) {
          console.log('###from', $scope.from);
          $scope.url = arxivarRouteService.getSearchURLWithParams({
            maxResults: 100,
            fields: [
              {
                name: 'To',
                operator: 1,
                value1: { modality: 1, values: [$scope.from.contactId] },
              },
              {
                name: 'DocumentType',
                operator: 3,
                value1: 3,
              },
            ],
          });
          $scope.urlView = arxivarRouteService.getViewURLWithParams(
            {
              maxResults: 100,
              redirectResults: true,
              fields: [
                {
                  name: 'To',
                  operator: 1,
                  value1: { modality: 1, values: [$scope.from.contactId] },
                },
              ],
            },
            viewId
          );
          $scope.urlProfile = arxivarRouteService.getURLProfileReadonly(
            parseInt(params.queryParams)
          );
        } else {
          arxivarNotifierService.notifyError('Nessun cliente richiedente');
        }
      });
  },
]);

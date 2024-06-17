import { LoDashStatic } from 'lodash';

angular.module('arxivar.plugins').factory('comandoCliente', [
  'PluginCommand',
  'arxivarResourceService',
  'arxivarUserServiceCreator',
  'arxivarRouteService',
  'arxivarDocumentsService',
  'arxivarNotifierService',
  '_',
  (
    PluginCommand: IPluginCommand,
    arxivarResourceService: IArxivarResourceService,
    arxivarUserServiceCreator: IArxivarUserServiceCreator,
    arxivarRouteService: IArxivarRouteService,
    arxivarDocumentsService: IArxivarDocumentsService,
    arxivarNotifierService: IArxivarNotifierService,
    _: LoDashStatic
  ) => {
    // MANDATORY settings in order for the plugin to work.
    const requiredSettings: IRequiredSettings = {
      id: '8b443356-a195-4b84-a495-25d4cc60427d', // Unique plugin identifier (type: string)
      name: 'comandoCliente', // Plugin name. Spaces special characters not allowed (type: string)
      icon: 'fas fa-bullseye',
      label: 'Comando Cliente', // User Interface label (type: string)
      description: 'Comando cliente', // Plugin description (type: string)
      author: 'nicola', // Plugin author (type: string)
      minVersion: '2.0.0', // Minimun portal version this plugin supports. (type: string, format example: 0.0.1)
      requireRefresh: false, // If this plugin requires grid data refresh (type boolean. Default: false)
      useTypescript: true, // If this plugin use typescript compiler (type boolean. Default: false)
    };

    // OPTIONAL settings. These objects require the following properties: name, description, defaultValue and type.
    // Allowed types are: string, number, boolean or date (Date type is a string UTC ISO 8601 (https://it.wikipedia.org/wiki/ISO_8601) format
    const customSettings: ICustomSettings[] = [
      {
        name: 'pluginId',
        description: 'pluginId',
        defaultValue: '57040fea-3e82-4521-b299-8329ad365e46',
        type: 'string',
      },
    ];

    // OPTIONAL settings for specific users. These objects require the following properties: name, description, defaultValue and type.
    // Allowed types are: string, number, boolean or date (Date type is a string UTC ISO 8601 (https://it.wikipedia.org/wiki/ISO_8601) format
    const userSettings: IUserSettings[] = [
      //{name: '', description: '', defaultValue:'', type: 'string'},
    ];

    const myPlugin = new PluginCommand(
      requiredSettings,
      customSettings,
      userSettings
    );

    // This function is a promise with asyncronous logic to determine if this plugin can run. Input parameters: array of docnumbers (params.docnumbers), flag locked (params.locked only in F2)
    // Output parameter: Promise of bool
    myPlugin.canRun = (params) => {
      return Promise.resolve(
        params.hasOwnProperty('docnumbers') && params.docnumbers.length === 1
      );
    };

    // This function is a promise with asyncronous run logic. Input parameters: array of docnumbers (params.docnumbers), flag locked (params.locked only in F2)
    // Output parameter type expected: Promise of any
    myPlugin.run = (params) => {
      return myPlugin.canRun(params).then((canRun) => {
        if (canRun) {
          const docNumber = params.docnumbers[0];
          const setting = _.find(myPlugin.customSettings, { name: 'pluginId' });
          const pluginId = setting.value as string;
          window.location.href =
            arxivarRouteService.getURLPluginRoute(pluginId) +
            '?queryParams=' +
            docNumber;
        }
      });
    };
    return { plugin: myPlugin };
  },
]);

import { LoDashStatic } from 'lodash';

angular.module('arxivar.plugins').factory('CheckPDFUpload', [
  'PluginProfilation',
  'arxivarResourceService',
  '$uibModal',
  '_',
  'arxivarNotifierService',
  function (
    PluginProfilation: IPluginProfilation,
    arxivarResourceService: IArxivarResourceService,
    $uibModal: any,
    _: LoDashStatic,
    arxivarNotifierService: IArxivarNotifierService
  ) {
    // MANDATORY settings in order for the plugin to work.
    const requiredSettings: IRequiredSettings = {
      id: '8315a392-a3cb-4a0f-9a53-3ce2c3365d93', // Unique plugin identifier (type: string)
      name: 'CheckPDFUpload', // Plugin name. Spaces special characters not allowed (type: string)
      icon: 'fas fa-file-pdf',
      label: 'CheckPDFUpload label', // User Interface label (type: string)
      description: 'CheckPDFUpload description', // Plugin description (type: string)
      author: 'Able Tech', // Plugin author (type: string)
      minVersion: '2.7.0', // Minimun portal version this plugin supports. (type: string, format example: 0.0.1)
      useTypescript: true, // If this plugin use typescript compiler (type boolean. Default: false)
    };

    // OPTIONAL settings. These objects require the following properties: name, description, defaultValue and type.
    // Allowed types are: string, number, boolean or date (Date type is a string UTC ISO 8601 (https://it.wikipedia.org/wiki/ISO_8601) format
    const customSettings: ICustomSettings[] = [
      // { name: 'deleteFile', description: 'deleteFile', defaultValue: false, type: 'boolean' },
    ];

    // OPTIONAL settings for specific users. These objects require the following properties: name, description, defaultValue and type.
    // Allowed types are: string, number, boolean or date (Date type is a string UTC ISO 8601 (https://it.wikipedia.org/wiki/ISO_8601) format
    const userSettings: IUserSettings[] = [
      //{name: '', description: '', defaultValue:'', type: 'string'},
    ];

    const myPlugin = new PluginProfilation(
      requiredSettings,
      customSettings,
      userSettings
    );

    // This function is a promise with asyncronous logic to determine if this plugin can run.
    // Input parameters: array of fields (params.fields), value of docnumber (params.docnumber only in edit profile),array of files (params.files)
    // Output parameter: Promise of bool
    myPlugin.canRun = function (params) {
      return Promise.resolve(
        (params.hasOwnProperty('fields') ? params.fields.length >= 1 : false) &&
          (params.hasOwnProperty('files') ? params.files.length >= 1 : false)
      );
    };

    // This function is a promise with asyncronous run logic.
    // Input parameters: array of fields (params.fields), value of docnumber (params.docnumber only in edit profile),array of files (params.files)
    // Output parameter: Promise of object with 2 props: fields => array of fields (only the fields to change) and files => array of files (replace the files on profilation)
    myPlugin.run = function (params) {
      return myPlugin.canRun(params).then(function (canRun) {
        if (canRun) {
          const pdfFiles = params.files.filter((file) => {
            return file.name.endsWith('.pdf');
          });
          const deletedFiles = params.files
            .filter((file) => {
              return !file.name.endsWith('.pdf');
            })
            .map((f) => f.name);

          if (deletedFiles && deletedFiles.length > 0) {
            arxivarNotifierService.notifyWarning(
              `Eliminati: ${deletedFiles.join(' ')}`
            );
          }
          return { fields: params.fields, files: pdfFiles };
        }
        return null;
      });
    };

    return { plugin: myPlugin };
  },
]);

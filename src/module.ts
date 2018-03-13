import InstanaDatasource from './datasource';
import {InstanaQueryCtrl} from './query_ctrl';
import {InstanaConfigCtrl} from './config_ctrl';

class InstanaAnnotationsQueryCtrl {
  static templateUrl = 'partials/annotations.editor.html';
}

export {
  InstanaDatasource as Datasource,
  InstanaQueryCtrl as QueryCtrl,
  InstanaConfigCtrl as ConfigCtrl,
  InstanaAnnotationsQueryCtrl as AnnotationsQueryCtrl,
};

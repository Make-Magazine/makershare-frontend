import { ViewService } from '../../../CORE/d7services';

export interface SortingSet {
  sort_order: "ASC" | "DESC",
  sort_by: string,
}

export class SortBySortingSet {
  private _SortSet: SortingSet;
  _viewService: ViewService;
  constructor(set: SortingSet, viewService: ViewService) {
    this._SortSet = set;
    this._viewService = viewService;
  }

  Sort(ViewName: string, Pages: number, categoryId?: number, comapnyFilter?: string) {
    var Params = [['page', Pages], ['sort_by', this._SortSet.sort_by], ['sort_order', this._SortSet.sort_order]];
    if (categoryId) {
      Params.push(['category', categoryId]);
    }
    if (comapnyFilter) {
      Params.push(['orgs_type', comapnyFilter]);
    }
    return this._viewService.getView(ViewName, Params);
  }
}




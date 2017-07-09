//exports for components
export { CommentService } from './comment/comment.service';
export { FileService } from './file/file.service';
export { FlagService } from './flag/flag.service';
export { MainService } from './main/main.service';
export { NodeService } from './node/node.service';
export { PmService } from './pm/pm.service';
export { ProfileService } from './profile/profile.service';
export { SolrService } from './solr/solr.service';
export { StatisticsService } from './statistics/statistics.service';
export { TaxonomyService } from './taxonomy/taxonomy.service';
export { UserService } from './user/user.service';
export { ViewService } from './view/view.service';
export { VocabularyService } from './vocabulary/vocabulary.service';

//imports
import { CommentService } from './comment/comment.service';
import { FileService } from './file/file.service';
import { FlagService } from './flag/flag.service';
import { MainService } from './main/main.service';
import { NodeService } from './node/node.service';
import { PmService } from './pm/pm.service';
import { ProfileService } from './profile/profile.service';
import { SolrService } from './solr/solr.service';
import { StatisticsService } from './statistics/statistics.service';
import { TaxonomyService } from './taxonomy/taxonomy.service';
import { UserService } from './user/user.service';
import { ViewService } from './view/view.service';
import { VocabularyService } from './vocabulary/vocabulary.service';

//array of providers for root module or shared module
export const D7ServicesForRoot = [
  TaxonomyService,
  FileService,
  PmService,
  NodeService,
  MainService,
  UserService,
  ViewService,
  FlagService,
  StatisticsService,
  ProfileService,
  SolrService
];
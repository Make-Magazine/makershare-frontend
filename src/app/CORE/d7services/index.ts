// exports for components
export { CommentService } from 'app/CORE/d7services/comment/comment.service';
export { FileService } from 'app/CORE/d7services/file/file.service';
export { FlagService } from 'app/CORE/d7services/flag/flag.service';
export { MainService } from 'app/CORE/d7services/main/main.service';
export { NodeService } from 'app/CORE/d7services/node/node.service';
export { PmService } from 'app/CORE/d7services/pm/pm.service';
export { ProfileService } from 'app/CORE/d7services/profile/profile.service';
export { SolrService } from 'app/CORE/d7services/solr/solr.service';
export {
  StatisticsService,
} from 'app/CORE/d7services/statistics/statistics.service';
export { TaxonomyService } from 'app/CORE/d7services/taxonomy/taxonomy.service';
export { UserService } from 'app/CORE/d7services/user/user.service';
export { ViewService } from 'app/CORE/d7services/view/view.service';
export {
  VocabularyService,
} from 'app/CORE/d7services/vocabulary/vocabulary.service';
// imports
import { CommentService } from 'app/CORE/d7services/comment/comment.service';
import { FileService } from 'app/CORE/d7services/file/file.service';
import { FlagService } from 'app/CORE/d7services/flag/flag.service';
import { MainService } from 'app/CORE/d7services/main/main.service';
import { NodeService } from 'app/CORE/d7services/node/node.service';
import { PmService } from 'app/CORE/d7services/pm/pm.service';
import { ProfileService } from 'app/CORE/d7services/profile/profile.service';
import { SolrService } from 'app/CORE/d7services/solr/solr.service';
import { StatisticsService } from 'app/CORE/d7services/statistics/statistics.service';
import { TaxonomyService } from 'app/CORE/d7services/taxonomy/taxonomy.service';
import { UserService } from 'app/CORE/d7services/user/user.service';
import { ViewService } from 'app/CORE/d7services/view/view.service';
import { VocabularyService } from 'app/CORE/d7services/vocabulary/vocabulary.service';

// array of providers for root module or shared module
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
  SolrService,
  CommentService,
  VocabularyService,
];

export const QueryHome =
  "query($id: String) { dashboard(id: $id) { taskCount platformCount itemCount userCount}}";

export const QueryUsers =
  "query($first: Int, $skip: Int) {users(first: $first, skip: $skip, orderBy: time, orderDirection: desc) { id userId reputation deposit taskCount makeItemCount auditCount guard }}";

export const QueryPlatforms =
  "query { platforms {id name platformId authorityModule rateCountsToProfit rateAuditorDivide boxCount}}";

/************************************************/
export const QueryRequires = "query { requires {id notes }}";

export const QueryWhitelistedTokens =
  "query { whitelistedTokens {id symbol decimal} }";
export const QueryWhitelistedAuditAndDetectionModules =
  "query {whitelistedAuditModules{id name} whitelistedDetectionModules{id name}}";

/************************************************/
export const QueryTasks =
  "query($first: Int, $skip: Int) {tasks(first: $first, skip: $skip, orderBy: start, orderDirection: desc) { id requires { notes } strategy currency {symbol} amount auditModule {id} detectionModule {id} state }}";

export const QuerySpecialTask =
  "query($id: String) {task(id: $id){applicant {id} box{orderId platform{name}}  requires { id notes } strategy currency {symbol} amount start deadline source auditModule{id name} detectionModule{id name} state itemCount adopted {id} items{id requires{notes} supporterCount opponentCount state cid fingerprint } }}";

export const QueryItems =
  "query($first: Int, $skip: Int) {items(first: $first, skip: $skip, orderBy: time, orderDirection: desc) {id task{id} requires{notes} supporterCount opponentCount state cid fingerprint }}";

export const QuerySpecialItem =
  "query($id: String) {item(id: $id) { task{id source auditModule{id name} detectionModule{id name}} maker{id} supporterCount opponentCount cid fingerprint time requires{notes} versionCount state audits{time attitude auditor{id userId reputation } } }}";

export const QuerySpecialRequireWithItems =
  "query($id: String) {require(id: $id) {notes registrant taskCount itemCount time items{id task{id} requires{notes} supporterCount opponentCount state cid fingerprint } } } ";

export const QuerySpecialRequireWithTasks =
  "query($id: String) {require(id: $id) {notes registrant taskCount itemCount time tasks{id requires { notes } strategy currency {symbol} amount auditModule {id} detectionModule {id} state } } } ";
/************************************************/

export const QuerySpecialUser =
  "query($id: String) {user(id: $id) { id userId time reputation deposit guard tasks {id box{orderId platform{name} } state source  } }}";

export const QueryUserOwnTasks =
  "query($id: String) { user(id: $id) { tasks(orderBy: time, orderDirection: desc){ id box{orderId platform{name} } state source} }}";

export const QueryUserOwnItems =
  "query($id: String) { user(id: $id) { itemsOwner(orderBy: time, orderDirection: desc) {id cid task{id box{orderId}} state} }}";

export const QueryUserOwnAudits =
  "query($id: String) { user(id: $id) { audits(orderBy: time, orderDirection: desc) { item{id cid task{id} state} attitude} }}";

/************************************************/

export const QueryLockedToken =
  "query($id: String) { reward(id: $id) { locked }}";

export const QueryHome =
  "query($id: String) { dashboard(id: $id) { taskCount platformCount itemCount userCount}}";

export const QueryTasks =
  "query($first: Int, $skip: Int) {tasks(first: $first, skip: $skip, orderBy: start, orderDirection: desc) { id requires { notes } strategy currency {symbol} amount auditModule detectionModule state }}";

export const QuerySpecialTask =
  "query($id: String) {task(id: $id){applicant {id} box{orderId platform{name}}  requires { notes } strategy currency {symbol} amount start deadline source auditModule detectionModule state itemCount adopted }}";

export const QueryTaskWithLanguage =
  "query($first: Int, $skip: Int, $requireId: String) {language(id: $requireId) {applications(irst: $first, skip: $skip, orderBy: start, orderDirection: desc){id applicant {id} video { realId orderId platform {name}} language{notes} amount strategy{notes} subtitleCount start deadline source}} }";

export const QueryItems =
  "query($first: Int, $skip: Int) {items(first: $first, skip: $skip, orderBy: time, orderDirection: desc) {id task{id} requires{notes} supporterCount opponentCount state cid fingerprint }}";

export const QuerySpecialItem =
  "query($id: String) {item(id: $id) { task{id source auditModule detectionModule} maker{id} supporterCount opponentCount cid fingerprint time requires{notes} versionCount state}}";

export const QuerySubtitleWithLanguage =
  "query($first: Int, $skip: Int, $languageId: String) {language(id: $languageId){subtitles(first: $first, skip: $skip, orderBy: time, orderDirection: desc) {id application{id start source deadline strategy{notes} video{platform{name}}} language{notes} supporterCount dissenterCount maker{id} fingerprint cid}} }";

export const QueryUsers =
  "query($first: Int, $skip: Int) {users(first: $first, skip: $skip, orderBy: time, orderDirection: desc) { id userId reputation deposit taskCount makeItemCount auditCount guard }}";

// export const QueryUser =
//   "query($id: BigInt) {user(id: $id) { id time adoptedCount reputation deposit }}";

export const QueryUserOwn =
  "query($id: String) { user(id: $id) { applications(orderBy: start, orderDirection: desc){id video{id platform {name}} strategy{notes} amount adopted{id} source language{notes} deadline} subtitlesOwner(orderBy: time, orderDirection: desc) {id cid supporterCount dissenterCount state application{id strategy{notes} video{platform{id} orderId}} language{notes}} audits(orderBy: time, orderDirection: desc) { subtitle{id cid application{id strategy{notes} video{platform{id} orderId}} language{notes} state} attitude} }}";

export const QueryUserOwnApplication =
  "query($id: String) { user(id: $id) { applications(orderBy: start, orderDirection: desc){ id video{id platform {name}} strategy{notes} amount adopted{id} source language{notes} } }}";

export const QueryUserOwnSubtitle =
  "query($id: String) { user(id: $id) { subtitlesOwner(orderBy: time, orderDirection: desc) {id cid supporterCount dissenterCount state application{id} language{notes}} }}";

export const QueryUserOwnAudit =
  "query($id: String) { user(id: $id) { audits(orderBy: time, orderDirection: desc) { subtitle{id cid application{id} language{notes} state} attitude } }}";

export const QueryPlatforms =
  "query { platforms {id name platformId authorityModule rateCountsToProfit rateAuditorDivide boxCount}}";

export const QueryLanguages = "query { languages {id notes }}";

export const QueryLockedToken =
  "query($id: String) { reward(id: $id) { locked }}";

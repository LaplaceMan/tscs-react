export const QueryHome =
  "query($id: String, $first: Int, $date: String) { dashboard(id: $id) { applicationCount platformCount subtitleCount userCount}  applications(first: $first, orderBy: start, orderDirection: desc) { id applicant {id} video { realId orderId platform {name}} language {notes} amount strategy{notes} subtitleCount start deadline source} subtitles(first: $first, orderBy: time, orderDirection: desc) {id application{id subtitleCount start deadline strategy{notes} video{platform{name}}} language{notes} supporterCount dissenterCount maker{id} fingerprint cid } dayData(id: $date) {applicationCount subtitleCount platformCount userCount}}";

export const QueryApplication =
  "query($first: Int, $skip: Int) {applications(first: $first, skip: $skip, orderBy: start, orderDirection: desc) { id applicant {id} video { realId orderId platform {name}} language {notes} amount strategy{notes} subtitleCount start deadline source}}";

// export const QueryApplicationWithLanguage =
//   "query($first: Int, $skip: Int, $languageId: String) {applications(first: $first, skip: $skip, orderBy: start, orderDirection: desc, where: {language_: {id: $languageId}}) { id applicant {id} video { realId orderId platform {name}} language{notes} amount strategy{notes} subtitleCount start deadline source}}";
export const QueryApplicationWithLanguage =
  "query($first: Int, $skip: Int, $languageId: String) {language(id: $languageId) {applications(irst: $first, skip: $skip, orderBy: start, orderDirection: desc){id applicant {id} video { realId orderId platform {name}} language{notes} amount strategy{notes} subtitleCount start deadline source}} }";

export const QuerySubtitle =
  "query($first: Int, $skip: Int) {subtitles(first: $first, skip: $skip, orderBy: time, orderDirection: desc) {id application{id start deadline source strategy{notes} video{platform{name}}} language{notes} supporterCount dissenterCount maker{id} fingerprint cid }}";

export const QuerySubtitleWithLanguage =
  "query($first: Int, $skip: Int, $languageId: String) {language(id: $languageId){subtitles(first: $first, skip: $skip, orderBy: time, orderDirection: desc) {id application{id start source deadline strategy{notes} video{platform{name}}} language{notes} supporterCount dissenterCount maker{id} fingerprint cid}} }";

export const QueryUser =
  "query($id: BigInt) {user(id: $id) { id time adoptedCount reputation deposit }}";

export const QueryUserOwn =
  "query($id: String) { user(id: $id) { applications(orderBy: start, orderDirection: desc){id video{id platform {name}} strategy{notes} amount adopted{id} source language{notes} deadline} subtitlesOwner(orderBy: time, orderDirection: desc) {id cid supporterCount dissenterCount state application{id strategy{notes} video{platform{id} orderId}} language{notes}} audits(orderBy: time, orderDirection: desc) { subtitle{id cid application{id strategy{notes} video{platform{id} orderId}} language{notes} state} attitude} }}";

export const QueryUserOwnApplication =
  "query($id: String) { user(id: $id) { applications(orderBy: start, orderDirection: desc){ id video{id platform {name}} strategy{notes} amount adopted{id} source language{notes} } }}";

export const QueryUserOwnSubtitle =
  "query($id: String) { user(id: $id) { subtitlesOwner(orderBy: time, orderDirection: desc) {id cid supporterCount dissenterCount state application{id} language{notes}} }}";

export const QueryUserOwnAudit =
  "query($id: String) { user(id: $id) { audits(orderBy: time, orderDirection: desc) { subtitle{id cid application{id} language{notes} state} attitude } }}";

export const QueryPlatforms = "query { platforms {id name}}";

export const QueryLanguages = "query { languages {id notes}}";

export const QueryLockedToken =
  "query($id: String) { reward(id: $id) { locked }}";

export const QuerySpecialApplication =
  "query($id: String){application(id: $id) {applicant{id} subtitleCount video {orderId platform {name}} language {notes} start deadline source strategy {notes} deadline adopted {id} subtitles {id maker {id reputation deposit} supporterCount dissenterCount cid fingerprint  } } } ";

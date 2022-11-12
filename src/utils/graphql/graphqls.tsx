export const QueryHome = "query($id: String, $first: Int, $date: String) { dashboard(id: $id) { applicationCount platformCount subtitleCount userCount}  applications(first: $first, orderBy: start, orderDirection: asc) { id applicant {id} video { realId orderId platform {name}} language {notes} amount strategy{notes} subtitleCount start deadline source} subtitles(first: $first, orderBy: time, orderDirection: asc) {id application{id subtitleCount start deadline strategy{notes} video{platform{name}}} language{notes} supporterCount dissenterCount maker{id} fingerprint cid } dayData(id: $date) {applicationCount subtitleCount platformCount userCount}}"

export const QueryApplication = "query($first: Int, $skip: Int) {applications(first: $first, skip: $skip, orderBy: start, orderDirection: asc) { id applicant {id} video { realId orderId platform {name}} language {notes} amount strategy{notes} subtitleCount start deadline source}}"

export const QuerySubtitle = "query($first: Int, $skip: Int) {subtitles(first: $first, skip: $skip, orderBy: time, orderDirection: asc) {id application{id subtitleCount start deadline strategy{notes} video{platform{name}}} language{notes} supporterCount dissenterCount maker{id} fingerprint cid }}"

export const QueryUser = "query($id: BigInt) {user(id: $id) { id time adoptedCount reputation deposit }}"

export const QueryUserOwn = "query($id: String) { user(id: $id) { applications(orderBy: start, orderDirection: asc){id video{id platform {name}} strategy{notes} amount adopted{id} source language{notes}} subtitlesOwner(orderBy: start, orderDirection: asc) {id cid supporterCount dissenterCount state application{id} language{notes}} audits(orderBy: start, orderDirection: asc) { subtitle{id cid application{id} language{notes} state} attitude} }}"

export const QueryUserOwnApplication = "query($id: String) { user(id: $id) { applications(orderBy: start, orderDirection: asc){id video{id platform {name}} strategy{notes} amount adopted{id} source language{notes}} }"

export const QueryUserOwnSubtitle = "query($id: String) { user(id: $id) { subtitlesOwner(orderBy: start, orderDirection: asc) {id cid supporterCount dissenterCount state application{id} language{notes}} }"

export const QueryUserOwnAudit = "query($id: String) { user(id: $id) { audits(orderBy: start, orderDirection: asc) { subtitle{id cid application{id} language{notes} state} attitude}} }"
# Murmes Front-end Demo

[Murmes](https://murmes.gitbook.io/murmes-protocol/) is a blockchain-based tokenized subtitling crowdsourcing system. It is dedicated to solving the problem of "language silos" in the current video media platform. Through a complete set of trading mechanisms and economic models, video creators, subtitle makers, viewers, and investors are connected in an open, transparent, and multi-profit ecosystem.

This front-end implements the main functions in the Murmes protocol:

- Submit applications.
- Upload subtitles.
- Audit (evaluation) subtitles.
- Token transfer and authorization (Zimu and VT).
- Pledge and withdrawal (User join).
- Pre-settlement and settlement.

# Running locally

## Install Dependencies

`git clone https://github.com/LaplaceMan/tscs-react.git`

`npm install`

## Start-up

`npm run dev`

## Build

`npm run build`

# Future and need to be fixed

- [ ] 语言 -> 申请（字幕） 平台 -> 视频 申请 -> 字幕
- [ ] 解决 Hook 的 BUG（初步认为是使用 Apollo 造成的冲突，不影响 Demo 使用）

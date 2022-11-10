import React, { useContext } from "react";
import { Tabs, Empty } from "antd";
import { SiEthereum } from "react-icons/si";
import { WalletContext } from "../context/WalletContext";
import { shortenAddress } from "../utils/tools"
import { OwnAssetCard, OwnApplicationCard, OwnSubtitleCard, OwnAuditCard } from "../components"
import { ZIMU_TOKEN } from "../utils/contracts"

const NoItems = () => {
  return (
    <div className="flex flex-col mx-auto my-10">
      <Empty description={false} />
      <div className="flex flex-col max-w-[360px] mx-auto text-center">
        <span className="font-bold text-2xl">No items to display</span>
        <span className="text-[#696969] text-base mt-1">
          Please refresh the page to try again or submit a new transaction.
        </span>
      </div>
    </div>
  );
};

const Personal = (): React.ReactElement => {
  const { accountState } = useContext(WalletContext)

  const Assets = () => {
    return (
      <div className="flex flex-wrap items-center sm:justify-around md:justify-start">
        {OwnAssetCard({ name: 'Zimu', balance: '20K', type: 'ERC20', issuser: 'TSCS', address: ZIMU_TOKEN[accountState.network] })}
        {OwnAssetCard({ name: 'DefaultVT', balance: '20K', type: 'ERC1155', issuser: 'TSCS', address: ZIMU_TOKEN[accountState.network] })}
      </div>
    );
  }

  const Applications = () => {
    return (
      <div className="flex flex-wrap items-center sm:justify-around md:justify-start">
        {OwnApplicationCard({ name: 'None', type: 'OT0', price: '20.37K', state: '0', source: 'test.com', videoId: '1', applyId: '1', language: 'cn' })}
      </div>
    )
  }

  const Subtitles = () => {
    return (
      <div className="flex flex-wrap items-center sm:justify-around md:justify-start">
        {OwnSubtitleCard({ subtitleId: '10', cid: 'Qmasfsdfdsfsd', support: '50', oppose: '5', state: 'Normal', applyId: '1', language: 'cn' })}
      </div>
    )
  }

  const Audits = () => {
    return (
      <div className="flex flex-wrap items-center sm:justify-around md:justify-start">
        {OwnAuditCard({ subtitleId: '10', cid: 'Qmasfsdfdsfsd', state: 'Normal', applyId: '1', language: 'cn', attitude: 'Support' })}
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      <div
        className="h-[250px] md:h-[270px] mt-[8px] ring ring-black ring-offset-4 bg-center bg-cover"
        style={{
          backgroundImage: `url("https://i.seadn.io/gae/P3RpreFAUcZIt1FeVB-y2o95x3zw7DWBU9dXsihVsgdfElfZcl0_8g601ydvtTaOIIN6Pae0VXmZTuN_xictxe6_DsCmR0pO_dSFZg?auto=format&w=1920")`,
        }}
      >
        <div className="mt-40 flex justify-center mx-[60px] align-bottom">
          <img
            className="shrink-0 w-32 h-32 md:w-36 md:h-36 rounded-xl shadow"
            src={
              "http://api.btstu.cn/sjtx/api.php?lx=c1&format=images"
            }
          />
        </div>
      </div>
      <div className="flex flex-col items-center mt-11 mb-3 md:mt-10">
        <div className="text-3xl font-bold">Lulu</div>
        <div className="flex text-base font-medium text-[#696969] items-center">
          <SiEthereum className="mr-1 mt-0.5" />
          {accountState.address ? shortenAddress(accountState.address) : '0x0000...0000'}
        </div>
      </div>
      <Tabs
        defaultActiveKey="1"
        tabBarGutter={50}
        centered
        size="large"
        items={[
          {
            label: <div className="font-semibold text-lg ">Applications</div>,
            key: "1",
            children: Applications(),
          },
          {
            label: <div className="font-semibold text-lg">Subtitles</div>,
            key: "2",
            children: Subtitles(),
          },
          {
            label: <div className="font-semibold text-lg">Audited</div>,
            key: "3",
            children: Audits(),
          },
          {
            label: <div className="font-semibold text-lg">Assets</div>,
            key: "4",
            children: Assets(),
          },
        ]}
      />
    </div>
  );
};
export default Personal;

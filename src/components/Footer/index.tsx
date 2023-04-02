import React from "react";
import { discord, github, telegram, twitter } from "../../assets";
const footerLinkIcon = (src: string, link: string, key: React.Key) => {
  return (
    <a href={link} key={key} target="_blank" rel="noopener noreferrer">
      <img src={src} className="mr-3 w-6" />
    </a>
  );
};

const iconItem = [
  { src: discord, link: "" },
  { src: github, link: "https://github.com/LaplaceMan/tscs-contracts" },
  { src: telegram, link: "" },
  { src: twitter, link: "https://twitter.com/laplaceman1007" },
];

const DefaultFooter = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row">
        {iconItem.map((item, index) =>
          footerLinkIcon(item.src, item.link, index)
        )}
      </div>
      <div className="flex text-sm mt-3">
        Copyright © 2023 Heichen. All rights reserved.
      </div>
    </div>
  );
};

export default DefaultFooter;

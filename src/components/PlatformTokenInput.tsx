import React, { useCallback } from "react";
import { getPlatforms, platformTokens } from "../utils/platforms";
import { FromToData, Platform, Token } from "../utils/types";
import { Dropdown } from "./Dropdown";

type Props = {
  fromToData: FromToData;
  setFromToData: (fromToData: FromToData) => void;
  enabledPlatformNames: string[];
};

const PlatformTokenInput = ({
  fromToData,
  setFromToData,
  enabledPlatformNames,
}: Props) => {
  const {
    from: { platformName: fromPlatformName, token: fromToken },
    to: { platformName: toPlatformName, token: toToken },
  } = fromToData;

  const enabledPlatforms = getPlatforms().filter((platform) =>
    enabledPlatformNames.includes(platform.name)
  );

  const fromPlatform: Platform | undefined = enabledPlatforms.find(
    (platform) => platform.name === fromPlatformName
  );

  const toPlatform: Platform | undefined = enabledPlatforms.find(
    (platform) => platform.name === toPlatformName
  );

  const fromTokens = fromPlatform ? platformTokens(fromPlatform) : [];
  const toTokens = toPlatform ? platformTokens(toPlatform) : [];

  const handleFromPlatformChange = useCallback((platformName: string) => {
    const platform: Platform | undefined = enabledPlatforms.find(
      (platform) => platform.name === platformName
    );

    if (!platform) return;

    const platformAvailableTokens = platformTokens(platform);

    const newToken = platformTokens(platform).includes(fromToken)
      ? fromToken
      : platformAvailableTokens[0];

    setFromToData({
      ...fromToData,
      from: { token: newToken, platformName },
    });
  }, []);

  const handleToPlatformChange = useCallback((platformName: string) => {
    const platform: Platform | undefined = enabledPlatforms.find(
      (platform) => platform.name === platformName
    );

    if (!platform) return;

    const platformAvailableTokens = platformTokens(platform);

    const newToken = platformAvailableTokens.includes(fromToken)
      ? fromToken
      : platformAvailableTokens[0];

    setFromToData({
      ...fromToData,
      to: { token: newToken, platformName },
    });
  }, []);

  const handleFromTokenChange = (token: string) => {
    setFromToData({
      ...fromToData,
      from: { ...fromToData.from, token: token as Token },
    });
  };
  const handleToTokenChange = (token: string) => {
    setFromToData({
      ...fromToData,
      to: { ...fromToData.to, token: token as Token },
    });
  };

  return (
    <>
      <div className="flex-1">
        <Dropdown
          options={enabledPlatformNames}
          onChange={handleFromPlatformChange}
          value={fromPlatformName}
          label="From this platform"
        />
        <Dropdown
          options={fromTokens}
          onChange={handleFromTokenChange}
          value={fromToken}
          label="Token"
        />
      </div>
      <div className="flex-1">
        <Dropdown
          options={enabledPlatformNames}
          onChange={handleToPlatformChange}
          value={toPlatformName}
          label="To this platform"
        />

        <Dropdown
          options={toTokens}
          onChange={handleToTokenChange}
          value={toToken}
          label="Token"
        />
      </div>
    </>
  );
};

export default PlatformTokenInput;

import { platformTokens } from "./utils/platforms";
import { FromToData, Platform, Token } from "./utils/types";

type Props = {
  fromToData: FromToData;
  setFromToData: (fromToData: FromToData) => void;
  enabledPlatforms: Platform[];
};

const PlatformTokenInput = ({
  fromToData,
  setFromToData,
  enabledPlatforms,
}: Props) => {
  const platformNames = enabledPlatforms.map((platform) => platform.name);

  const {
    from: { platformName: fromPlatformName, token: fromToken },
    to: { platformName: toPlatformName, token: toToken },
  } = fromToData;

  const fromPlatform: Platform | undefined = enabledPlatforms.find(
    (platform) => platform.name === fromPlatformName
  );

  const toPlatform: Platform | undefined = enabledPlatforms.find(
    (platform) => platform.name === toPlatformName
  );

  const fromTokens = fromPlatform ? platformTokens(fromPlatform) : [];
  const toTokens = toPlatform ? platformTokens(toPlatform) : [];

  const handleFromPlatformChange = (platformName: string) => {
    const platform: Platform | undefined = enabledPlatforms.find(
      (platform) => platform.name === platformName
    );

    if (!platform) return;

    const newToken = platformTokens(platform).includes(fromToken)
      ? fromToken
      : platformTokens(platform)[0];

    setFromToData({
      ...fromToData,
      from: { token: newToken, platformName },
    });
  };

  const handleToPlatformChange = (platformName: string) => {
    const platform: Platform | undefined = enabledPlatforms.find(
      (platform) => platform.name === platformName
    );

    if (!platform) return;

    const newToken = platformTokens(platform).includes(fromToken)
      ? fromToken
      : platformTokens(platform)[0];

    setFromToData({
      ...fromToData,
      to: { token: newToken, platformName },
    });
  };
  const handleFromTokenChange = (token: Token) => {
    setFromToData({
      ...fromToData,
      from: { ...fromToData.from, token },
    });
  };
  const handleToTokenChange = (token: Token) => {
    setFromToData({
      ...fromToData,
      to: { ...fromToData.to, token },
    });
  };

  return (
    <div className="rounded p-5">
      <div>
        <select
          value={fromPlatformName}
          onChange={(e) => handleFromPlatformChange(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          {platformNames.map((platformName) => (
            <option key={platformName} value={platformName}>
              {platformName}
            </option>
          ))}
        </select>
        <select
          value={fromToken}
          onChange={(e) => handleFromTokenChange(e.target.value as Token)}
          className="select select-bordered w-full max-w-xs"
        >
          {fromTokens.map((token) => (
            <option key={token} value={token}>
              {token}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          value={toPlatformName}
          onChange={(e) => handleToPlatformChange(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          {platformNames.map((platformName) => (
            <option key={platformName} value={platformName}>
              {platformName}
            </option>
          ))}
        </select>
        <select
          value={toToken}
          onChange={(e) => handleToTokenChange(e.target.value as Token)}
          className="select select-bordered w-full max-w-xs"
        >
          {toTokens.map((token) => (
            <option key={token} value={token}>
              {token}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PlatformTokenInput;

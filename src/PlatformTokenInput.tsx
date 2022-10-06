import { platforms, platformTokens } from "./utils/platforms";
import { FromToData, Platform, Token } from "./utils/types";

type Props = {
  fromToData: FromToData;
  setFromToData: (fromToData: FromToData) => void;
};

const PlatformTokenInput = ({ fromToData, setFromToData }: Props) => {
  const platformNames = platforms.map((platform) => platform.name);

  const {
    from: { platformName: fromPlatformName, token: fromToken },
    to: { platformName: toPlatformName, token: toToken },
  } = fromToData;

  const fromPlatform: Platform | undefined = platforms.find(
    (platform) => platform.name === fromPlatformName
  );

  const toPlatform: Platform | undefined = platforms.find(
    (platform) => platform.name === toPlatformName
  );

  const fromTokens = fromPlatform ? platformTokens(fromPlatform) : [];
  const toTokens = toPlatform ? platformTokens(toPlatform) : [];

  const handleFromPlatformChange = (platformName: string) => {
    const platform: Platform | undefined = platforms.find(
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
    const platform: Platform | undefined = platforms.find(
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
    <div className="App">
      <div className="platforms">
        <div>
          <select
            value={fromPlatformName}
            onChange={(e) => handleFromPlatformChange(e.target.value)}
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
          >
            {platformNames.map((platformName) => (
              <option key={platformName} value={platformName}>
                {platformName}
              </option>
            ))}
          </select>
          {/* dropdown of tokens */}

          <select
            value={toToken}
            onChange={(e) => handleToTokenChange(e.target.value as Token)}
          >
            {toTokens.map((token) => (
              <option key={token} value={token}>
                {token}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PlatformTokenInput;

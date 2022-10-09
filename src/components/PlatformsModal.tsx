import React from "react";
import { getPlatforms } from "../utils/platforms";

type Props = {
  enabledPlatformNames: string[];
  setEnabledPlatformNames: (enabledPlatformNames: string[]) => void;
};

export const PlatformsModal = ({
  enabledPlatformNames,
  setEnabledPlatformNames,
}: Props) => (
  <div>
    <label htmlFor="my-modal" className="btn modal-button">
      Filter Platforms
    </label>

    <input type="checkbox" id="my-modal" className="modal-toggle" />
    <div className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Filters</h3>
        {getPlatforms().map((platform, index) => {
          const checked = enabledPlatformNames.includes(platform.name);
          return (
            <div key={`${platform.name}-${index}`}>
              <label className="label cursor-pointer">
                <span className="label-text">{platform.name}</span>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    if (checked) {
                      setEnabledPlatformNames(
                        enabledPlatformNames.filter(
                          (platformName) => platformName !== platform.name
                        )
                      );
                    } else {
                      setEnabledPlatformNames([
                        ...enabledPlatformNames,
                        platform.name,
                      ]);
                    }
                  }}
                  className="toggle toggle-accent"
                />
              </label>
            </div>
          );
        })}
        <div className="modal-action">
          <label htmlFor="my-modal" className="btn">
            Close
          </label>
        </div>
      </div>
    </div>
  </div>
);

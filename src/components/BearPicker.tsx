import * as React from "react";
import { Bear, Bears } from "components/common";
import { getEmojiRepository } from "emoji";

type Props = {
  bear: Bear;
  onChange: (bear: Bear) => void;
};

const BEAR_EMOJI = "🐻";

const BearPicker = ({ bear, onChange }: Props) => {
  const [uploaded, setUploaded] = React.useState([] as Bear[]);
  const [bears, setBears] = React.useState([] as Bear[]);
  React.useEffect(() => {
    (async () => {
      const repository = await getEmojiRepository();
      const maybeEmoji = repository.getByEmoji(BEAR_EMOJI);
      if (maybeEmoji != null) {
        const pairings = maybeEmoji.getPairings();
        const bears = await Promise.all(
          Object.keys(pairings).flatMap((otherEmoji) => {
            const e = repository.getByEmoji(otherEmoji);
            if (e == null) {
              return [];
            } else {
              const pairing = pairings[otherEmoji];
              return [
                pairing.getImageURL().then((url) => ({
                  name: e.getEmoji(),
                  url: url as string,
                })),
              ];
            }
          })
        );
        setBears(bears);
      }
    })();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "start",
      }}
    >
      <div
        style={{
          maxWidth: 540,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {bears.concat(uploaded).map((bear, idx) => {
          return (
            <img
              width={100}
              height={100}
              src={bear.url}
              key={idx}
              alt={bear.name}
              onClick={() => onChange(bear)}
              style={{ cursor: "pointer" }}
            />
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
          alignItems: "start",
        }}
      >
        Upload custom emoji
        <input
          type="file"
          accept="image/png"
          onChange={(e) => {
            const file = (e.target.files ?? [])[0];
            if (file != null) {
              const fr = new FileReader();
              fr.readAsDataURL(file);
              fr.onload = () => {
                const result = fr.result;
                if (result != null && typeof result === "string") {
                  setUploaded((uploaded) => [
                    ...uploaded,
                    {
                      name: `Custom ${uploaded.length + 1}`,
                      url: result,
                    },
                  ]);
                }
              };
            }
          }}
        />
      </div>
    </div>
  );
};

export default BearPicker;

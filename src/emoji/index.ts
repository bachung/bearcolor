import { EmojiResponse, decodeEmojiResponse } from "emoji/proto/emoji";

const PAIR_URL =
  "https://www.google.com/logos/fnbx/emoji_kitchen/emoji_kitchen_pairs.10.pb";

const TENOR_API_KEY = "AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ";
const API_URL_PREFIX = `https://tenor.googleapis.com/v2/featured?key=${TENOR_API_KEY}&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=`;

const LOCAL_STORAGE_CACHE_KEY = "EMOJI_URL_CACHE";

const getEmojiUrl = (emoji: string) => {
  const codePoint = emoji.codePointAt(0)?.toString(16);
  if (codePoint == null) {
    return null;
  }
  return `https://fonts.gstatic.com/s/e/notoemoji/latest/${codePoint}/emoji.svg`;
};

const EMOJI_PAIRING_CACHE: Record<string, Promise<string | null> | undefined> =
  {};

const localStorageItem =
  window.localStorage.getItem(LOCAL_STORAGE_CACHE_KEY) ?? "{}";
let localStorageParsed = JSON.parse(localStorageItem) as Record<string, string>;

const getEmojiLocalStorage = (query: string) => {
  return localStorageParsed[query] ?? null;
};

const setLocalStorage = (query: string, url: string) => {
  localStorageParsed[query] = url;
  window.localStorage.setItem(
    LOCAL_STORAGE_CACHE_KEY,
    JSON.stringify(localStorageParsed)
  );
};

class EmojiPairing {
  emoji1: string;
  emoji2: string;

  constructor(emoji1: string, emoji2: string) {
    this.emoji1 = emoji1;
    this.emoji2 = emoji2;
  }

  async getImageURL() {
    const q = `${this.emoji1}_${this.emoji2}`;
    if (EMOJI_PAIRING_CACHE[q]) {
      return await EMOJI_PAIRING_CACHE[q];
    } else {
      const maybeLocalStorage = getEmojiLocalStorage(q);
      EMOJI_PAIRING_CACHE[q] = maybeLocalStorage
        ? Promise.resolve(maybeLocalStorage)
        : fetch(API_URL_PREFIX + q)
            .then((resp) => resp.json())
            .then((obj) => {
              const results = obj?.results;
              if (!Array.isArray(results) || results.length === 0) {
                return null;
              }
              const maybeResult =
                results[0]?.media_formats?.png_transparent?.url;
              if (maybeResult == null) {
                return null;
              }
              return maybeResult as string;
            });
      const url = await EMOJI_PAIRING_CACHE[q];
      if (getEmojiLocalStorage(q) == null && url != null) {
        setLocalStorage(q, url);
      }
      return url;
    }
  }
}

class Emoji {
  repository: EmojiRepository;
  id: number;
  emoji: string;
  category: string;
  pairings: number[];
  reversePairings: number[];
  pairingCache: Record<string, EmojiPairing> | undefined;
  url: string | null;

  constructor({
    repository,
    id,
    emoji,
    category,
    pairings,
    reversePairings,
  }: {
    repository: EmojiRepository;
    id: number;
    emoji: string;
    category: string;
    pairings: number[];
    reversePairings: number[];
  }) {
    this.repository = repository;
    this.id = id;
    this.emoji = emoji;
    this.category = category;
    this.pairings = pairings;
    this.reversePairings = reversePairings;
    this.url = getEmojiUrl(this.emoji);
  }

  getEmoji() {
    return this.emoji;
  }

  getURL() {
    return this.url;
  }

  getPairings(): Record<string, EmojiPairing> {
    if (this.pairingCache != null) {
      return this.pairingCache;
    }
    const thisPairing = this.pairings.map(
      (id) =>
        [
          id,
          new EmojiPairing(this.emoji, this.repository.getById(id).getEmoji()),
        ] as const
    );
    const reversePairing = this.reversePairings.map(
      (id) =>
        [
          id,
          new EmojiPairing(this.repository.getById(id).getEmoji(), this.emoji),
        ] as const
    );

    this.pairingCache = thisPairing
      .concat(reversePairing)
      .sort((a, b) => a[0] - b[0])
      .reduce((acc, cur) => {
        acc[this.repository.getById(cur[0]).getEmoji()] = cur[1];
        return acc;
      }, {} as Record<string, EmojiPairing>);
    return this.pairingCache;
  }
}

class EmojiRepository {
  byEmoji: Record<string, Emoji>;
  byId: Record<number, Emoji>;
  emojis: Emoji[];

  constructor(emojiResponse: EmojiResponse) {
    const categories = emojiResponse.categories
      ?.map((category) => ({
        name: category.name as string,
        startId: category.startId as number,
      }))
      .sort((a, b) => b.startId - a.startId);
    const emojis = emojiResponse.emojis
      ?.map((emoji) => ({
        emoji: emoji.emoji as string,
        id: emoji.id as number,
      }))
      .sort((a, b) => a.id - b.id);
    const pairings = emojiResponse?.pairings?.map((pairing) => ({
      id: pairing.id as number,
      pairings: pairing.pairings as number[],
    }));

    if (!categories || !emojis || !pairings) {
      throw new Error("Unable to parse emoji response");
    }

    const reversePairings = pairings
      .flatMap(({ id, pairings }) => pairings.map((id2) => [id2, id]))
      .reduce((acc, [id1, id2]) => {
        const arr = acc[id1] ?? [];
        arr.push(id2);
        acc[id1] = arr;
        return acc;
      }, {} as Record<number, number[]>);

    const emojiObjects = emojis.map(
      (emoji) =>
        new Emoji({
          repository: this,
          id: emoji.id,
          emoji: emoji.emoji,
          category:
            categories.find((cat) => cat.startId <= emoji.id)?.name ??
            "Unknown",
          pairings: pairings.find((c) => c.id === emoji.id)?.pairings ?? [],
          reversePairings: reversePairings[emoji.id] ?? [],
        })
    );

    this.emojis = emojiObjects;
    this.byId = emojiObjects.reduce(
      (acc, cur) => Object.assign(acc, { [cur.id]: cur }),
      {} as Record<number, Emoji>
    );
    this.byEmoji = emojiObjects.reduce(
      (acc, cur) => Object.assign(acc, { [cur.emoji]: cur }),
      {} as Record<string, Emoji>
    );
  }

  list(): Emoji[] {
    return this.emojis;
  }

  getById(id: number): Emoji {
    return this.byId[id];
  }

  getByEmoji(emoji: string): Emoji | undefined {
    return this.byEmoji[emoji];
  }
}

let cache: Promise<ArrayBuffer> | null = null;

export const getEmojiRepository = async () => {
  cache = cache ?? fetch(PAIR_URL).then((resp) => resp.arrayBuffer());
  const buffer = await cache;
  const decoded = decodeEmojiResponse(new Uint8Array(buffer));

  return new EmojiRepository(decoded);
};

# PF2E ReignMaker

![GitHub Downloads (all releases)](https://img.shields.io/github/downloads/rune-goblin/pf2e-reignmaker/total?include_prereleases&filter=*.zip)

Kingdom Building module for Foundry VTT / Pathfinder 2e.

## Install

Paste this manifest URL into Foundry's module installer:

```
https://github.com/rune-goblin/pf2e-reignmaker/releases/latest/download/module.json
```

## ⚠️ 0.14.0 — PF2e Trooper is now required

**Install [PF2e Trooper](https://github.com/rune-goblin/pf2e-trooper) before updating.**

```
https://github.com/rune-goblin/pf2e-trooper/releases/latest/download/module.json
```

All troop art — every portrait, tactical token and strategy-map piece — now ships from
PF2e Trooper instead of from ReignMaker. It changes on a different cadence than kingdom
code, and it was ~390 MB of every ReignMaker download.

Foundry will refuse to enable ReignMaker until Trooper is installed and enabled. Existing
worlds are repointed automatically the first time a GM loads in, so armies you already
recruited keep their art.

### Required modules

| Module | Why |
| --- | --- |
| [PF2e Trooper](https://github.com/rune-goblin/pf2e-trooper) | Troop art |
| PF2e Creature CRISPR | Troop and army statblock composition |
| World Explorer | Kingdom-map fog and hex reveal |

# Season System <Badge type="tip" text="Compatibility page" />

> Seasons, weather, environment, and TeaStory crop rules now live in the [TeaStory tea-garden section](/en/tutorial/Teastory#tea-garden). This page keeps the old URL and headings for bookmarks and external links; use the merged guide for current values.

<div class="teastory-figure-row" aria-label="Season page entry preview">
  <figure class="teastory-figure"><img src="/images/teastory/tea_seeds.png" alt="Tea seeds" /><figcaption>Plant the garden</figcaption></figure>
  <figure class="teastory-figure"><img src="/images/teastory/green_tea_leaf.png" alt="Green tea leaf" /><figcaption>Watch growth</figcaption></figure>
  <figure class="teastory-figure"><img src="/images/teastory/paddy_field.png" alt="Paddy field" /><figcaption>Shape the space</figcaption></figure>
  <figure class="teastory-figure"><img src="/images/teastory/green_tea_glass.png" alt="Glass of green tea" /><figcaption>Back to TeaStory</figcaption></figure>
</div>

## Season Overview

| Season | Duration | Base temperature | Base humidity | Growth | Yield |
|---|---:|---:|---:|---:|---:|
| Spring | 10 in-game days | 15.0 | 0.70 | ×1.2 | ×1.0 |
| Summer | 10 in-game days | 25.0 | 0.50 | ×1.1 | ×1.1 |
| Autumn | 10 in-game days | 10.0 | 0.60 | ×1.0 | ×1.2 |
| Winter | 10 in-game days | 0.0 | 0.40 | ×0.5 | ×0.8 |

Temperature is the NatureEngine configuration baseline; actual environment also adds vanilla world temperature and weather offsets. The yield multiplier is a season configuration hint and does not automatically multiply every CraftEngine loot table. See the [tea-garden section](/en/tutorial/Teastory#tea-garden) for crop targets and environment thresholds.

## Farming Guide

### Growth Factors

Growth combines season, weather, crop temperature/humidity targets, light, structure environment, and random-tick progress. A preferred season is a target range rather than a simple allowed/blocked switch. Most TeaStory crops require light level 9; a greenhouse improves stability but does not promise a fixed growth time for every crop.

### Crop Recommendations

Tea trees prefer Spring, Summer, and Autumn. Jasmine prefers Spring and Summer; osmanthus, roselle, and goji suit Summer and Autumn; chrysanthemum prefers Autumn; lotus and rice prefer Summer. The merged guide has the complete 14-crop table, tolerances, and registered trees.

### Environment Effects

| Environment | Stability | Progress adjustment | Classification |
|---|---:|---:|---|
| Greenhouse | 1.00 | ×1.02 | Closedness ≥ 0.60 |
| Indoor | 0.80 | ×0.98 | Openness < 0.25 |
| Semi-outdoor | 0.60 | ×1.00 | Intermediate state |
| Outdoor | 0.35 | ×1.00 | Openness ≥ 0.80 |

Scanning covers a radius of 4 blocks and checks up to 6 blocks upward for a roof. The nearby-water bonus is currently disabled. Thresholds and weather offsets are maintained in the merged guide.

## 24 Solar Terms

Solar terms change the selection weights for the **next weather event** only. They do not rewrite a weather profile's temperature, humidity, or growth multiplier. Current configuration trends toward more rain from Qingming to Guyu, slightly more storms in summer terms, more sun in autumn, and more snow with less rain from Lidong through Dahan. Percentages from the old page should not be treated as current fixed bonuses.

## Weather System

Weather is reselected every 90 seconds. Target durations are Sunny 300 seconds, Rain 240, Storm 180, and Snow 240.

| Weather | Temperature | Humidity | Soil | Growth |
|---|---:|---:|---:|---:|
| Sunny | +0.05 | -0.02 | -0.02 | ×1.00 |
| Rain | -0.03 | +0.05 | +0.20 | ×1.10 |
| Storm | -0.05 | +0.06 | +0.25 | ×0.93 |
| Snow | -0.12 | +0.02 | +0.10 | ×0.85 |

At the Bukkit weather layer, Snow currently maps to ordinary rain. Visible weather should not be read as a separately verified snow-cover system.

## Useful Commands

The NatureEngine root command requires OP.

| Command | What it does |
|---|---|
| `/ne season info` | Show the world's season, progress, and override state |
| `/ne debug` | Show a season, weather, and environment summary |
| `/ne debug crop [detail]` | Show crop growth summary or full data |
| `/ne sim crop` | Simulate crop calculations without changing blocks |
| `/ne season set <spring\|summer\|autumn\|winter>` | Set a manual season override |
| `/ne season clear` | Clear the manual override |
| `/ne season next` | Move to the next season |
| `/ne season apply` | Reapply season visuals |

See [TeaStory → NatureEngine commands](/en/tutorial/Teastory#tea-garden) for the complete command list and configuration boundaries.

## FAQ

::: details Q: Why is my crop not growing?
Run `/ne debug crop detail` and inspect light, temperature, humidity, season, weather, and environment. Then verify the base block and crop registration instead of inferring a fixed growth time from the season multiplier.
:::

::: details Q: Do I always need a greenhouse in Winter?
A greenhouse provides 1.00 stability and a ×1.02 progress adjustment, but the result still depends on crop targets, weather, and world temperature. Tea trees are marked as not easy to wither; other crops need their own checks.
:::

::: details Q: Where are the complete tea-tree and orchard rules?
See [TeaStory → tea garden](/en/tutorial/Teastory#tea-garden) and [garden, paddy, and orchard](/en/tutorial/Teastory#garden-orchard).
:::

---
title: FAQ & reference
description: Find tea room notes, harvest records, troubleshooting, season parameters and administrator commands.
aside: true
pageClass: teastory-page
---

<script setup>
import '../../../.vitepress/theme/teastory-guide.css'
</script>

# FAQ & reference

<p class="tea-lead">Keep tea-room setup, harvest records, troubleshooting and advanced configuration in one place for quick reference.</p>

[← Back to the TeaStory collection](/en/tutorial/Teastory)

## Tea rooms and harvest records {#tea-room}

Combine processing equipment and furniture to furnish a tea room. The Tea Pan, Frying Pan, Fermentation Barrel, Tea Stove and Tea Table are interactive machines. Decorative furniture does not gain processing behavior from its appearance.

<a id="records"></a>

`/me harvest menu` opens your harvest overview, products, tools and crops. `/me harvest stats` shows your own statistics.

Seeds, first planting and harvest, cumulative harvests, quality upgrades, processing, brewing, drinking and residue recycling have achievement milestones. New harvests participate in statistics and achievements; historical data is not guaranteed to be backfilled.

## Troubleshooting {#appendix}

<details class="tea-faq">
<summary>My tea is not growing. Is the season wrong?</summary>

Check the ground and light first, then consider season, temperature, humidity and nearby structures. Ask an administrator to run `/ne debug crop detail` beside the crop for a diagnosis. Ordinary players do not have permission for this command.

</details>
<details class="tea-faq">
<summary>Why did I get wet or burnt leaves?</summary>

Rain and thunderstorms turn fresh leaves into wet leaves. Rescue them in the Tea Pan in clear weather before frying. Putting wet leaves straight in the Frying Pan produces burnt leaves.

</details>
<details class="tea-faq">
<summary>The machine has ingredients but will not start.</summary>

Check fuel in the Frying Pan and Tea Stove; only fermentation powder works in the barrel. Use boiled water in the Tea Table and place every ingredient in its matching slot. Clear the output slot. Sneak-right-click a machine to retrieve misplaced contents.

</details>
<details class="tea-faq">
<summary>Fruit has not returned after 20 minutes.</summary>

Only eligible persistent fruiting leaves regrow. Offline time counts, but the chunk must load again. Removed leaves are not rebuilt, and non-persistent leaves do not automatically regrow fruit.

</details>

<details class="tea-reference">
<summary>Advanced reference: seasons, environment and crops</summary>

| Season | Base temperature | Base humidity | Growth multiplier | Configured yield multiplier |
|---|---:|---:|---:|---:|
| Spring | 15.0 | 0.70 | 1.2 | 1.0 |
| Summer | 25.0 | 0.50 | 1.1 | 1.1 |
| Autumn | 10.0 | 0.60 | 1.0 | 1.2 |
| Winter | 0.0 | 0.40 | 0.5 | 0.8 |

These are NatureEngine baselines. World, weather and seasonal offsets also affect actual temperature. Yield multipliers do not automatically multiply all CraftEngine loot. Seasons last 10 in-game days, with transition-title fade in / stay / fade out of 10 / 50 / 20 ticks.

| Crop | Mature age | Temperature ± tolerance | Humidity ± tolerance | Preferred seasons |
|---|---:|---:|---:|---|
| Tea | 6 | 1.20 ± 0.80 | 0.80 ± 0.60 | Spring, summer, autumn |
| Jasmine | 3 | 1.10 ± 0.75 | 0.85 ± 0.55 | Spring, summer |
| Rice nursery / rice | 3 / 7 | 1.20 ± 0.80 | 0.95 ± 0.55 | Summer |
| Osmanthus | 3 | 1.10 ± 0.75 | 0.75 ± 0.55 | Summer, autumn |
| Cassava | 4 | 1.30 ± 0.75 | 0.75 ± 0.55 | Summer |
| Mint | 3 | 0.75 ± 0.65 | 0.75 ± 0.50 | Spring, summer |
| Chrysanthemum | 3 | 0.80 ± 0.70 | 0.65 ± 0.50 | Autumn |
| Ginger | 4 | 1.15 ± 0.75 | 0.85 ± 0.50 | Summer |
| Lemongrass | 3 | 1.20 ± 0.75 | 0.80 ± 0.55 | Summer |
| Roselle | 3 | 1.20 ± 0.75 | 0.70 ± 0.55 | Summer, autumn |
| Goji | 3 | 0.90 ± 0.80 | 0.50 ± 0.55 | Summer, autumn |
| Mung bean | 3 | 1.10 ± 0.75 | 0.70 ± 0.55 | Summer |
| Lotus | 4 | 1.10 ± 0.75 | 0.95 ± 0.45 | Summer |

The seasonal sapling registry contains jujube, pomelo, orange, persimmon and peach, each with one stage and spring/summer preferences. Lemon resources exist but are not in those five seasonal registrations.

Environment scans use radius 4 and check roofs up to 6 blocks above. Enclosure 0.60 qualifies as greenhouse; openness below 0.25 is indoor, at least 0.80 is outdoor, otherwise semi-outdoor. Nearby-water bonuses are disabled.

| Environment | Stability | Progress modifier |
|---|---:|---:|
| Greenhouse | 1.00 | 1.02 |
| Indoor | 0.80 | 0.98 |
| Semi-outdoor | 0.60 | 1.00 |
| Outdoor | 0.35 | 1.00 |

Global progress threshold is 0.22, wither threshold 0.02, random tick speed 3 and environment mitigation 0.75. None can independently guarantee a maturity time.

Weather is redrawn every 90 seconds. Configured clear / rain / thunder / snow durations are 300 / 240 / 180 / 240 seconds, not guaranteed hold times. Solar terms adjust the next draw's weights; snow maps to ordinary precipitation in Bukkit.

</details>
<details class="tea-reference">
<summary>Administrator reference and sources</summary>

NatureEngine commands require OP. `/ne season info` inspects the season; `/ne season next` advances it; `/ne season set <spring|summer|autumn|winter>` sets an override; `/ne season clear` restores natural progression; `/ne season apply` reapplies visuals.

Use `/ne debug`, `/ne debug crop detail` and `/ne debug visual` to inspect state; `/ne sim crop` to simulate growth; `/ne crop randomTickSpeed [value]` to adjust ticking; `/ne reload [config|seasons|weather|growth|environment|crops|all]` to reload; `/ne metrics` for metrics.

`/me harvest stats [all|player|UUID] [all|today|week]` selects a statistics scope; ordinary players can only inspect themselves. Administrators use `/me harvest export ...` for CSV. Data is stored in `plugins/MateriaEngine/harvest_stats.db`, with exports in `plugins/MateriaEngine/exports/`. Days follow Asia/Shanghai; weeks start on Monday. Historical totals are not backfilled into daily records.

Recipes, names and item artwork come from CraftEngine resource configuration. Tea Table inputs come from MateriaEngine; environment rules from NatureEngine; achievements from BeaconEngine. This page describes local configuration. Deployment versions, chunk loading and other plugins can affect actual server behavior.

</details>

<p class="tea-credits">Derived from <a href="https://github.com/RoShioLeo/Tea-the-Story?tab=readme-ov-file#license-%E8%AE%B8%E5%8F%AF%E8%AF%81">Tea-the-Story</a> under its original license. The <a href="/en/tutorial/SeasonWiki">old seasons entry</a> remains available.</p>

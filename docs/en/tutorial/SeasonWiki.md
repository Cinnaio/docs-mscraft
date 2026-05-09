# Season System <Badge type="tip" text="Testing" />

> The server uses **NatureEngine** plugin for seasonal changes and weather cycles. Spring, Summer, Autumn, and Winter each offer different gameplay experiences.

## Season Overview

| Season | Temperature | Growth Speed | Yield | Notes |
|:---:|:---:|:---:|:---:|:---|
| 🌸 Spring | Moderate | ×1.2 | ×1.0 | More rain, great for planting |
| ☀️ Summer | Hot | ×1.1 | ×1.1 | Sunny, highest yield |
| 🍂 Autumn | Moderate | ×1.0 | ×1.2 | Harvest season |
| ❄️ Winter | Cold | ×0.5 | ×0.8 | Crops freeze easily, build greenhouses |

> Each season lasts 10 days, total 40 days per year.

## Farming Guide

### Growth Factors

```
Growth Speed = Season × Weather × Environment
```

| Factor | Effect |
|:---:|:---|
| Season | Fast in Spring/Summer/Autumn, slow in Winter |
| Weather | Rain +10%, Thunder -7%, Snow -15% |
| Environment | Greenhouse +5% > Indoor > Outdoor |

### Crop Recommendations

| Crop | Preferred Season | Best Time to Plant |
|:---:|:---:|:---|
| Wheat, Carrot, Potato | Spring, Summer | Spring is best |
| Melon, Cocoa | Summer | Summer |
| Pumpkin | Summer, Autumn | Late Summer |
| Nether Wart | Winter, Autumn | Greenhouse in Winter |
| Tea Tree | Spring, Summer, Autumn | Spring, greenhouse in Winter |

### Environment Effects

| Environment | Stability | Advance Boost | Description |
|:---:|:---:|:---:|:---|
| Greenhouse | 1.00 | ×1.05 | Enclosed on all sides + roof |
| Indoor | 0.70 | ×0.95 | Has roof but open on all sides |
| Outdoor | 0.00 | ×1.00 | Pure natural environment |

::: tip Tip
Build greenhouses in Winter to keep crops growing steadily and avoid freezing.
:::

## 24 Solar Terms

Solar terms mainly affect weather probability, not crop growth itself.

| Solar Term | Season | Weather Effect |
|:---:|:---:|:---|
| Qingming | Spring | Rain probability +30% |
| Guyu | Spring | Rain +50%, Thunder +10% |
| Dashu | Summer | Thunder +35%, Sunny -10% |
| Daxue~Dahan | Winter | Snow probability keeps rising, max +45% |

> No need to memorize, just play normally.

## Weather System

| Weather | Temperature | Soil Moisture | Crop Effect |
|:---:|:---:|:---:|:---:|
| ☀️ Sunny | +0.05 | -0.02 | Normal |
| 🌧️ Rain | -0.03 | +0.20 | **+10%** |
| ⛈️ Storm | -0.05 | +0.25 | -7% |
| 🌨️ Snow | -0.12 | +0.10 | -15% |

Weather changes every 90 seconds.

## Useful Commands

| Command | What it does |
|:---:|:---|
| `/ne season info` | Check current season, solar term, days remaining |
| `/ne debug` | View detailed season, weather, environment info |
| `/ne debug crop` | View detailed growth data for crops at your feet |
| `/ne season set <season>` | Manually switch season (admin) |

## FAQ

::: details Q: Why is my crop not growing?
- Winter outdoor temperature is too low, crops freeze
- Check if indoors/greenhouse, more stable environment
- Use `/ne debug crop` to see specific reasons
:::

::: details Q: How to prevent crops from freezing?
- Build a greenhouse (enclosed on all sides + roof)
- Plant indoors in Winter
- Watch weather, rain is better than snow for planting
:::

::: details Q: How to grow tea trees?
- Prefers warm & humid, grows in Spring, Summer, Autumn
- Must use greenhouse in Winter or it withers easily
- See [Teastory →](/en/tutorial/Teastory) for details
:::
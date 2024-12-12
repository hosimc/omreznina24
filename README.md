# Dynamic Energy Tariff Widget for iOS (Scriptable)

This [Scriptable](https://scriptable.app) script creates a customizable iOS widget to display the current and next energy tariff blocks based on dynamic time-based pricing. The widget uses Apple-inspired soft color themes and provides relevant information at a glance.

## Features

- Displays the **current tariff block** with name, time range, and a matching color.
- Shows the **next tariff block**, including its start time.
- Automatically adapts to **seasonal and daily variations**:
  - **High season**: November, December, January, February.
  - **Low season**: March to October.
  - Handles differences between **weekdays** and **weekends/holidays**.
- On widget tap, redirects to a specified image (e.g., tariff block overview chart).

## Requirements

- iOS device with **Scriptable** installed.
- iOS 14 or later (for widgets).
- Internet access to fetch the tariff block image (if using a URL).

## Installation

1. Install **Scriptable** from the [App Store](https://apps.apple.com/app/scriptable/id1405459188).
2. Copy the script from the repository and paste it into a new Scriptable script.
3. Replace the `imageUrl` variable with the URL of your desired tariff block image.
4. Add the script as a widget to your iOS home screen.

## Configuration

The script supports full customization of:
- **Time blocks**: Adjust the `blocks` object to match your tariff schedule.
- **Colors**: Easily modify colors to fit your theme or preferences.

### Example of Configurable Blocks:
```javascript
const blocks = {
  highSeason: {
    weekday: [
      { name: "Block 1", start: "07:00", end: "14:00", color: "#FF9500" },
      { name: "Block 1", start: "16:00", end: "20:00", color: "#FF9500" },
      { name: "Block 2", start: "06:00", end: "07:00", color: "#FFD60A" },
    ],
    weekend: [
      { name: "Block 3", start: "00:00", end: "06:00", color: "#34C759" },
      { name: "Block 3", start: "22:00", end: "24:00", color: "#34C759" },
    ],
  },
};
```

## Usage

1. Add the script as a medium-sized widget to your iOS home screen.
2. The widget will display:
   - The **current block** with its name and color.
   - The **next block** and its start time.
3. Tap the widget to open a URL (e.g., an overview chart or documentation).

## Screenshots

![image](https://github.com/user-attachments/assets/bc622c62-c3f9-41c5-9e08-c6aed53db376)





// URL do slike časovnih blokov
const imageUrl = "https://www.petrol.si/binaries/content/gallery/www/2023/znanje-in-podpora/clanki/omreznina-2024-prihaja-nova-metodologija-in-nove-tarife-za-uporabo-omrezja/casovni-bloki.png";

// Definicija blokov glede na sezono, dan in čas
const blocks = {
  highSeason: {
    weekday: [
      { name: "Blok 1 €€€", start: "07:00", end: "14:00", color: "#FF9500" },
      { name: "Blok 1 €€€", start: "16:00", end: "20:00", color: "#FF9500" },
      { name: "Blok 2 €€", start: "06:00", end: "07:00", color: "#FFD60A" },
      { name: "Blok 2 €€", start: "14:00", end: "16:00", color: "#FFD60A" },
      { name: "Blok 2 €€", start: "20:00", end: "22:00", color: "#FFD60A" },
      { name: "Blok 3 €", start: "00:00", end: "06:00", color: "#34C759" },
      { name: "Blok 3 €", start: "22:00", end: "24:00", color: "#34C759" },
    ],
    weekend: [
      { name: "Blok 2 €€", start: "07:00", end: "14:00", color: "#FFD60A" },
      { name: "Blok 2 €€", start: "16:00", end: "20:00", color: "#FFD60A" },
      { name: "Blok 3 €", start: "06:00", end: "07:00", color: "#34C759" },
      { name: "Blok 3 €", start: "14:00", end: "16:00", color: "#34C759" },
      { name: "Blok 3 €", start: "20:00", end: "22:00", color: "#34C759" },
      { name: "Blok 4", start: "00:00", end: "06:00", color: "#007AFF" },
      { name: "Blok 4", start: "22:00", end: "24:00", color: "#007AFF" },
    ],
  },
  lowSeason: {
    weekday: [
      { name: "Blok 2 €€", start: "07:00", end: "14:00", color: "#FFD60A" },
      { name: "Blok 2 €€", start: "16:00", end: "20:00", color: "#FFD60A" },
      { name: "Blok 3 €", start: "06:00", end: "07:00", color: "#34C759" },
      { name: "Blok 3 €", start: "14:00", end: "16:00", color: "#34C759" },
      { name: "Blok 3 €", start: "20:00", end: "22:00", color: "#34C759" },
      { name: "Blok 4", start: "00:00", end: "06:00", color: "#007AFF" },
      { name: "Blok 4", start: "22:00", end: "24:00", color: "#007AFF" },
    ],
    weekend: [
      { name: "Blok 3 €", start: "07:00", end: "14:00", color: "#34C759" },
      { name: "Blok 3 €", start: "16:00", end: "20:00", color: "#34C759" },
      { name: "Blok 4", start: "06:00", end: "07:00", color: "#007AFF" },
      { name: "Blok 4", start: "14:00", end: "16:00", color: "#007AFF" },
      { name: "Blok 4", start: "20:00", end: "22:00", color: "#007AFF" },
      { name: "Blok 5", start: "00:00", end: "06:00", color: "#8E8E93" },
      { name: "Blok 5", start: "22:00", end: "24:00", color: "#8E8E93" },
    ],
  },
};

// Funkcija za pridobitev trenutnega in naslednjega bloka
function getCurrentAndNextBlock() {
  const now = new Date();
  const isWeekend = now.getDay() === 0 || now.getDay() === 6; // 0 = nedelja, 6 = sobota
  const isHighSeason = [11, 0, 1].includes(now.getMonth()); // Visoka sezona: november, december, januar, februar

  const season = isHighSeason ? "highSeason" : "lowSeason";
  const dayType = isWeekend ? "weekend" : "weekday";

  const currentTime = now.getHours() * 60 + now.getMinutes(); // Trenutni čas v minutah
  const blocksForToday = blocks[season][dayType];

  let currentBlock = null;
  let nextBlock = null;
  let smallestGap = Infinity;

  for (let block of blocksForToday) {
    const startMinutes = parseTimeToMinutes(block.start);
    const endMinutes = parseTimeToMinutes(block.end);

    // Trenutni blok
    if (currentTime >= startMinutes && currentTime < endMinutes) {
      currentBlock = block;
    }

    // Naslednji blok (najbližji prihodnji čas)
    if (startMinutes > currentTime && startMinutes - currentTime < smallestGap) {
      smallestGap = startMinutes - currentTime;
      nextBlock = block;
    }
  }

  // Če ni naslednjega bloka, vzamemo prvega v dnevu
  if (!nextBlock && blocksForToday.length > 0) {
    nextBlock = blocksForToday[0];
  }

  return { currentBlock, nextBlock };
}

// Pretvori čas (HH:MM) v minute
function parseTimeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// Pridobi trenutni in naslednji blok
const { currentBlock, nextBlock } = getCurrentAndNextBlock();

// Priprava widgeta
const widget = new ListWidget();
widget.backgroundColor = new Color(currentBlock ? currentBlock.color : "#222222");

const title = widget.addText("Trenutni blok:");
title.font = Font.boldSystemFont(16);
title.textColor = Color.white();

const blockName = widget.addText(currentBlock ? currentBlock.name : "Ni podatkov");
blockName.font = Font.boldSystemFont(24);
blockName.textColor = Color.white();

widget.addSpacer(8);

const nextTitle = widget.addText("Naslednji blok:");
nextTitle.font = Font.boldSystemFont(16);
title.textColor = Color.white();

const nextBlockName = widget.addText(
  nextBlock ? `${nextBlock.name} (od ${nextBlock.start})` : "Ni podatkov"
);
nextBlockName.font = Font.boldSystemFont(24);
nextBlockName.textColor = Color.white();

// Dodaj povezavo na sliko ob kliku
widget.url = imageUrl; // Ob kliku odpre sliko v brskalniku

Script.setWidget(widget);
Script.complete();
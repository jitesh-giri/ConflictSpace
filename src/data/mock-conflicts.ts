export interface ConflictData {
  id: string;
  title: string;
  status: "Active" | "Completed";
  casualties: string;
  summary: string;
}

export const conflictData: ConflictData[] = [
  {
    id: "israel-iran",
    title: "Israel and Iran",
    status: "Active",
    casualties: "5,000+",
    summary: "A major regional war erupted in early 2026 following US and Israeli airstrikes on Iran. Iran has retaliated with missile strikes and closed the Strait of Hormuz, causing massive global economic disruption."
  },
  {
    id: "russia-ukraine",
    title: "Russia and Ukraine",
    status: "Active",
    casualties: "1.5 Million+",
    summary: "The grinding war of attrition continues, with Russia making very slow, costly territorial gains. Both sides continue heavy drone and missile exchanges, severely impacting civilian infrastructure."
  },
  {
    id: "pakistan-afghanistan",
    title: "Pakistan and Afghanistan",
    status: "Active",
    casualties: "500+",
    summary: "Intense cross-border fighting began in late February 2026 after Pakistan launched airstrikes against alleged TTP hideouts in Afghanistan. The Taliban responded with retaliatory fire, leading to hundreds of casualties and mass displacement."
  },
  {
    id: "india-sindoor",
    title: "India (Operation Sindoor)",
    status: "Completed",
    casualties: "100+ Terrorists",
    summary: "In May 2025, India executed a highly precise, non-escalatory air campaign targeting multiple terrorist training camps in Pakistan and PoJK in response to a terror attack in Pahalgam. The mission successfully neutralized the threats without crossing into civilian escalation."
  },
  {
    id: "usa-venezuela",
    title: "USA and Venezuela",
    status: "Completed",
    casualties: "Minimal (Political Decapitation)",
    summary: "In January 2026, the US executed 'Operation Absolute Resolve,' capturing Venezuelan President Nicolás Maduro and flying him to New York to face narco-terrorism charges, leading to the installation of an interim government."
  }
];
